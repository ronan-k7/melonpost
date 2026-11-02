#!/usr/bin/env node
// SEO + social-card audit for every page.
//
//   npm run build && npm run seo:check              -> audits the built site in .next/ (no server needed)
//   npm run seo:check -- https://www.melonpost.org  -> audits the LIVE site (reads its sitemap.xml)
//
// Exit code is 1 when any ERROR is found, so it can gate a deploy.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const liveBase = process.argv.slice(2).find((a) => /^https?:\/\//.test(a))?.replace(/\/$/, "");
const SITE = (liveBase || process.env.NEXT_PUBLIC_SITE_URL || "https://www.melonpost.org").replace(/\/$/, "");
let sharp = null;
try { sharp = (await import("sharp")).default; } catch {}

const GLOBAL_CARD = "/images/og/melonpost-global-news-og.jpg";
const ARTICLE_CARD = /^\/images\/og\/articles\/[a-z0-9-]+\.jpg$/;
const results = []; // { url, errors[], warns[] }
const seen = { title: new Map(), description: new Map() };

// ------------------------------------------------------------------ helpers
const decode = (s = "") => s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const metaAll = (head, attr, key) =>
  [...head.matchAll(new RegExp(`<meta\\s[^>]*?${attr}="${key}"[^>]*?>`, "gi"))].map((m) => decode((m[0].match(/content="([^"]*)"/i) || [])[1] ?? ""));
const meta = (head, attr, key) => metaAll(head, attr, key)[0];
const link = (head, rel) => decode((head.match(new RegExp(`<link\\s[^>]*?rel="${rel}"[^>]*?>`, "i"))?.[0].match(/href="([^"]*)"/i) || [])[1] || "");

function jsonLd(html) {
  const out = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { out.push(JSON.parse(m[1])); } catch (e) { out.push({ __invalid: e.message }); }
  }
  return out;
}
const types = (nodes) => nodes.flatMap((n) => (Array.isArray(n["@type"]) ? n["@type"] : [n["@type"]])).filter(Boolean);

async function readBinary(url) {
  const rel = url.startsWith(SITE) ? url.slice(SITE.length) : new URL(url).pathname;
  if (liveBase) {
    const res = await fetch(url, { redirect: "manual" });
    if (res.status >= 300 && res.status < 400) return { redirected: res.status, to: res.headers.get("location") };
    if (!res.ok) return { status: res.status };
    const buf = Buffer.from(await res.arrayBuffer());
    return { status: res.status, buf, contentType: res.headers.get("content-type") || "" };
  }
  const file = path.join(root, "public", decodeURIComponent(rel.split("?")[0]));
  if (!fs.existsSync(file)) return { status: 404 };
  return { status: 200, buf: fs.readFileSync(file), contentType: "" };
}

async function checkImage(url, declared, errors, warns, label) {
  if (!/^https:\/\//.test(url)) return errors.push(`${label} must be an absolute https URL (got ${url || "nothing"})`);
  if (!url.startsWith(SITE)) warns.push(`${label} is on another host (${new URL(url).host})`);
  const img = await readBinary(url);
  if (img.redirected) return errors.push(`${label} redirects (${img.redirected} -> ${img.to}); crawlers often drop redirected images`);
  if (img.status !== 200) return errors.push(`${label} returns ${img.status}: ${url}`);
  const kb = Math.round(img.buf.length / 1024);
  if (img.buf.length > 5 * 1024 * 1024) errors.push(`${label} is ${kb} KB - over the 5 MB limit of X/LinkedIn`);
  else if (img.buf.length > 600 * 1024) warns.push(`${label} is ${kb} KB - WhatsApp/Slack may skip images over ~300-600 KB`);
  const b = img.buf;
  const kind = b.slice(0, 3).toString("hex") === "ffd8ff" ? "jpeg" : b.slice(0, 4).toString("hex") === "89504e47" ? "png"
    : b.slice(0, 4).toString() === "RIFF" && b.slice(8, 12).toString() === "WEBP" ? "webp" : b.slice(4, 12).toString().includes("ftypavif") ? "avif" : "unknown";
  if (kind === "avif" || kind === "unknown") errors.push(`${label} is really ${kind.toUpperCase()} data - Facebook, X and LinkedIn cannot show it`);
  const ext = (url.split("?")[0].match(/\.(\w+)$/) || [])[1]?.toLowerCase();
  if (kind !== "unknown" && ext && !(ext === kind || (ext === "jpg" && kind === "jpeg"))) errors.push(`${label} has a .${ext} extension but contains ${kind.toUpperCase()} data`);
  if (img.contentType && !img.contentType.startsWith("image/")) errors.push(`${label} is served as ${img.contentType}`);
  if (sharp) {
    const m = await sharp(b).metadata();
    if (m.width < 600 || m.height < 315) errors.push(`${label} is ${m.width}x${m.height} - too small for a large card (min 600x315)`);
    else if (m.width < 1200) warns.push(`${label} is only ${m.width}px wide; 1200px+ is recommended`);
    if (declared.width && (declared.width !== m.width || declared.height !== m.height))
      errors.push(`${label} declared as ${declared.width}x${declared.height} but the file is ${m.width}x${m.height}`);
  }
}

async function getHtml(url, file) {
  if (liveBase) {
    const res = await fetch(url, { redirect: "manual", headers: { "User-Agent": "facebookexternalhit/1.1 (seo-check)" } });
    return { status: res.status, html: res.ok ? await res.text() : "", location: res.headers.get("location") };
  }
  return fs.existsSync(file) ? { status: 200, html: fs.readFileSync(file, "utf8") } : { status: 404, html: "" };
}

// ------------------------------------------------------------------ page list
async function listPages() {
  if (liveBase) {
    const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    return urls.map((url) => ({ url: url.replace(/\/$/, "") || SITE, file: null }));
  }
  const appDir = path.join(root, ".next", "server", "app");
  if (!fs.existsSync(appDir)) { console.error("No build found. Run `npm run build` first (or pass a live URL)."); process.exit(2); }
  const out = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html") && !/^(_not-found|_global-error|404|500)\.html$/.test(entry.name)) {
        const rel = path.relative(appDir, full).replace(/\.html$/, "").replace(/\\/g, "/");
        out.push({ url: rel === "index" ? SITE : `${SITE}/${rel}`, file: full });
      }
    }
  })(appDir);
  return out.sort((a, b) => a.url.localeCompare(b.url));
}

// ------------------------------------------------------------------ per-page audit
function pageKind(url) {
  const p = url.slice(SITE.length) || "/";
  if (p === "/") return "home";
  if (/^\/author\//.test(p)) return "author";
  if (/^\/[^/]+\/[^/]+$/.test(p) && !/^\/(author)\//.test(p)) return "article";
  if (/^\/(world|us|business|finance|technology|politics|health|investigation)$/.test(p)) return "category";
  return "info";
}

async function audit({ url, file }) {
  const errors = [], warns = [];
  const { status, html, location } = await getHtml(url, file);
  if (status !== 200) { errors.push(`page returned ${status}${location ? ` -> ${location}` : ""}`); return results.push({ url, errors, warns }); }
  const head = html.split("</head>")[0];
  const kind = pageKind(url);

  // --- basics
  if (!/<html[^>]*\slang="[a-z-]+"/i.test(html)) errors.push("<html lang> is missing");
  if (!/<meta name="viewport"/i.test(head)) errors.push("viewport meta tag is missing");
  const title = decode((head.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "");
  if (!title) errors.push("<title> is missing");
  else {
    if (title.length > 70) warns.push(`title is ${title.length} chars (Google shows ~60)`);
    if (title.length < 15) warns.push(`title is only ${title.length} chars`);
    (seen.title.get(title) || seen.title.set(title, []).get(title)).push(url);
  }
  const description = meta(head, "name", "description");
  if (!description) errors.push("meta description is missing");
  else {
    if (description.length > 170) warns.push(`description is ${description.length} chars (Google shows ~155)`);
    if (description.length < 70) warns.push(`description is only ${description.length} chars`);
    (seen.description.get(description) || seen.description.set(description, []).get(description)).push(url);
  }

  // --- canonical + indexing
  const canonical = link(head, "canonical");
  if (!canonical) errors.push("canonical link is missing");
  else if (canonical.replace(/\/$/, "") !== url.replace(/\/$/, "")) errors.push(`canonical is ${canonical}, expected ${url}`);
  const robots = (meta(head, "name", "robots") || "").toLowerCase();
  if (/noindex/.test(robots)) errors.push("page is noindex but is listed as indexable");
  if (!/max-image-preview:large/.test(metaAll(head, "name", "googlebot").join(",").toLowerCase()))
    warns.push("googlebot max-image-preview:large is missing (needed for big thumbnails / Discover)");
  if (!/rel="alternate"[^>]*application\/rss\+xml|application\/rss\+xml[^>]*rel="alternate"/i.test(head)) warns.push("RSS <link rel=alternate> missing");

  // --- Open Graph + Twitter
  const og = (k) => meta(head, "property", `og:${k}`);
  for (const k of ["title", "description", "url", "type", "site_name", "image", "image:width", "image:height", "image:alt", "locale"])
    if (!og(k)) errors.push(`og:${k} is missing`);
  if (og("url") && og("url").replace(/\/$/, "") !== url.replace(/\/$/, "")) errors.push(`og:url (${og("url")}) does not match the page URL`);
  if (og("type") && og("type") !== (kind === "article" ? "article" : "website")) errors.push(`og:type is "${og("type")}" on a ${kind} page`);
  const tw = (k) => meta(head, "name", `twitter:${k}`);
  if (tw("card") !== "summary_large_image") errors.push(`twitter:card is "${tw("card") || "missing"}"`);
  for (const k of ["title", "description", "image"]) if (!tw(k)) errors.push(`twitter:${k} is missing`);
  if (og("image") && tw("image") && og("image") !== tw("image")) warns.push("twitter:image differs from og:image");

  // --- the card policy: articles use their own card, everything else the brand card
  const img = og("image") || "";
  const imgPath = img.startsWith(SITE) ? img.slice(SITE.length) : img;
  if (kind === "article") {
    if (!ARTICLE_CARD.test(imgPath)) errors.push(`article card should be /images/og/articles/<slug>.jpg, got ${imgPath}`);
    else if (!imgPath.includes(url.split("/").pop())) errors.push(`article card does not belong to this story (${imgPath})`);
  } else if (imgPath !== GLOBAL_CARD) errors.push(`${kind} page must use ${GLOBAL_CARD}, got ${imgPath}`);
  if (img) await checkImage(img, { width: +og("image:width"), height: +og("image:height") }, errors, warns, "og:image");

  // --- body
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) errors.push(`expected exactly one <h1>, found ${h1s}`);
  const noAlt = (html.match(/<img\b(?![^>]*\balt=)[^>]*>/g) || []).length;
  if (noAlt) errors.push(`${noAlt} <img> tag(s) without alt text`);

  // --- structured data
  const nodes = jsonLd(html);
  nodes.filter((n) => n.__invalid).forEach((n) => errors.push(`invalid JSON-LD: ${n.__invalid}`));
  const t = types(nodes);
  const need = (type) => !t.includes(type) && errors.push(`JSON-LD ${type} is missing`);
  if (kind === "home") { need("NewsMediaOrganization"); need("WebSite"); }
  if (kind === "category") { need("CollectionPage"); need("BreadcrumbList"); }
  if (kind === "author") { need("ProfilePage"); need("BreadcrumbList"); }
  if (kind === "info") { need("BreadcrumbList"); if (!t.some((x) => /Page$/.test(x))) errors.push("JSON-LD WebPage is missing"); }
  if (kind === "article") {
    need("NewsArticle"); need("BreadcrumbList");
    const a = nodes.find((n) => n["@type"] === "NewsArticle");
    if (a) {
      for (const k of ["headline", "image", "datePublished", "dateModified", "author", "publisher", "mainEntityOfPage", "description"]) if (!a[k]) errors.push(`NewsArticle.${k} is missing`);
      if (a.headline && a.headline.length > 110) errors.push(`NewsArticle.headline is ${a.headline.length} chars (max 110)`);
      if (a.publisher && !a.publisher.logo) errors.push("NewsArticle.publisher.logo is missing");
      if (a.author && !(Array.isArray(a.author) ? a.author[0] : a.author).name) errors.push("NewsArticle.author.name is missing");
      if (a.datePublished && Number.isNaN(Date.parse(a.datePublished))) errors.push("NewsArticle.datePublished is not a valid date");
    }
  }
  results.push({ url, errors, warns });
}

// ------------------------------------------------------------------ site-level files
async function auditSiteFiles() {
  const errors = [], warns = [];
  const fetchText = async (p) => {
    if (liveBase) { const r = await fetch(`${SITE}${p}`); return r.ok ? await r.text() : null; }
    const map = { "/robots.txt": "robots.txt.body", "/sitemap.xml": "sitemap.xml.body", "/feed.xml": "feed.xml.body", "/manifest.webmanifest": "manifest.webmanifest.body" };
    const f = map[p] && path.join(root, ".next", "server", "app", map[p]);
    return f && fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null;
  };
  const robots = await fetchText("/robots.txt");
  if (!robots) errors.push("robots.txt not found");
  else {
    if (!/Sitemap:\s*\S+\/sitemap\.xml/i.test(robots)) errors.push("robots.txt does not list sitemap.xml");
    if (!/Sitemap:\s*\S+\/news-sitemap\.xml/i.test(robots)) warns.push("robots.txt does not list news-sitemap.xml");
    if (/Disallow:\s*\/\s*$/m.test(robots)) errors.push("robots.txt blocks the whole site");
  }
  const sm = await fetchText("/sitemap.xml");
  if (!sm) errors.push("sitemap.xml not found");
  else {
    const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (!locs.length) errors.push("sitemap.xml is empty");
    if (locs.some((l) => !l.startsWith(SITE))) errors.push(`sitemap.xml has URLs outside ${SITE}`);
    if (locs.some((l) => /\/search/.test(l))) errors.push("sitemap.xml lists /search, which is noindex");
    if (new Set(locs).size !== locs.length) errors.push("sitemap.xml has duplicate URLs");
  }
  const feed = await fetchText("/feed.xml");
  if (!feed) warns.push("feed.xml not found");
  else if (!/<rss[\s>]/.test(feed) || !/<item>/.test(feed)) errors.push("feed.xml is not a valid RSS feed with items");
  results.unshift({ url: `${SITE}  (robots.txt, sitemap.xml, feed.xml)`, errors, warns });
}

// ------------------------------------------------------------------ run
const pages = await listPages();
console.log(`Auditing ${pages.length} pages ${liveBase ? `on ${SITE}` : "from the local build"}...\n`);
for (const page of pages) {
  try { await audit(page); } catch (e) { results.push({ url: page.url, errors: [`audit crashed: ${e.message}`], warns: [] }); }
}
await auditSiteFiles();
for (const [label, map] of Object.entries(seen))
  for (const [value, urls] of map) if (urls.length > 1) urls.forEach((u) => results.find((r) => r.url === u)?.warns.push(`duplicate ${label} shared by ${urls.length} pages`));

let errs = 0, warnCount = 0;
for (const r of results) {
  errs += r.errors.length; warnCount += r.warns.length;
  const rel = r.url.startsWith(SITE) ? r.url.slice(SITE.length) || "/" : r.url;
  const status = r.errors.length ? "FAIL" : r.warns.length ? "warn" : "ok  ";
  console.log(`${status}  ${rel}`);
  r.errors.forEach((e) => console.log(`        ✗ ${e}`));
  r.warns.forEach((w) => console.log(`        ! ${w}`));
}
const failing = results.filter((r) => r.errors.length).length;
console.log(`\n${results.length} checked · ${results.length - failing} passing · ${failing} failing · ${errs} errors · ${warnCount} warnings`);
process.exit(errs ? 1 : 0);
