// Generates share-safe Open Graph / Twitter card images.
//
//   public/images/og/melonpost-global-news-og.jpg   <- from public/images/brand/melonpost-global-news-og.png
//   public/images/og/articles/<slug>.jpg            <- from each article's featured image
//
// Why: social crawlers (Facebook, WhatsApp, LinkedIn, X, Slack, Telegram) are picky.
// They want a real JPEG/PNG/WebP, a sensible file size and correct dimensions.
// The article files in /public/images/articles use a .webp extension but many of them
// are really JPEG / AVIF / PNG, some are 2 MB+, and the declared 1200x630 never matched.
// These derived files fix all of that without touching the originals.
//
// Run:  npm run og:generate       (also runs automatically before `npm run build`)
// Force a full rebuild of every card:  npm run og:generate -- --force
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const force = process.argv.includes("--force");

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[og] sharp is not installed - skipping OG image generation.");
  process.exit(0);
}

const pub = (...p) => path.join(root, "public", ...p);
const OUT_DIR = pub("images", "og");
const ART_DIR = path.join(OUT_DIR, "articles");
fs.mkdirSync(ART_DIR, { recursive: true });

const upToDate = (src, out) =>
  !force && fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;

const jpeg = (img) => img.jpeg({ quality: 82, mozjpeg: true, progressive: true });

// ---- 1. Global brand card: keep the artwork's own 16:9 shape, just make it light.
{
  const src = pub("images", "brand", "melonpost-global-news-og.png");
  const out = path.join(OUT_DIR, "melonpost-global-news-og.jpg");
  if (!fs.existsSync(src)) {
    console.warn(`[og] missing ${path.relative(root, src)}`);
  } else if (!upToDate(src, out)) {
    await jpeg(sharp(src).resize(1200, 675, { fit: "fill" }).flatten({ background: "#ffffff" })).toFile(out);
    console.log(`[og] brand card -> ${path.relative(root, out)} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
  }
}

// ---- 2. One 1200x630 card per article, built from its featured image.
const data = JSON.parse(fs.readFileSync(pub("data", "category", "categorypagedata.json"), "utf8"));
const articles = Object.values(data).flat();
const W = 1200, H = 630;
let made = 0;

for (const article of articles) {
  const src = pub(article.image.replace(/^\//, ""));
  const out = path.join(ART_DIR, `${article.slug}.jpg`);
  if (!fs.existsSync(src)) { console.warn(`[og] source image missing for ${article.slug}`); continue; }
  if (upToDate(src, out)) continue;

  const meta = await sharp(src).metadata();
  const ratio = meta.width / meta.height;
  const sharpEnough = meta.width >= 900 && ratio >= 1.65 && ratio <= 2.3;

  let pipeline;
  if (sharpEnough) {
    // Wide, large photo: a straight centre crop looks best.
    pipeline = sharp(src).resize(W, H, { fit: "cover", position: "attention" });
  } else {
    // Small / tall / squarish photo: never stretch or hard-crop it.
    // Show the whole photo over a blurred, darkened copy of itself.
    const bg = await sharp(src).resize(W, H, { fit: "cover" }).blur(28).modulate({ brightness: 0.7 }).toBuffer();
    const fg = await sharp(src).resize(W, H, { fit: "inside", withoutEnlargement: false }).toBuffer();
    pipeline = sharp(bg).composite([{ input: fg, gravity: "centre" }]);
  }
  await jpeg(pipeline.flatten({ background: "#ffffff" })).toFile(out);
  made++;
}
console.log(`[og] article cards: ${made} generated, ${articles.length - made} already up to date`);
