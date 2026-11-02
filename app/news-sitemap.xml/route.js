import { articles, articleHref } from "@/lib/content";
import { site, absoluteUrl } from "@/lib/site";

// Google News sitemap: only stories published in the last 48 hours, as Google requires.
// Rendered per request (cached for 5 minutes) so the 48-hour window is always current.
export const dynamic = "force-dynamic";

const WINDOW_MS = 48 * 60 * 60 * 1000;
const esc = (value = "") =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function GET() {
  const cutoff = Date.now() - WINDOW_MS;
  const recent = articles
    .filter((article) => new Date(article.publishedAt).getTime() >= cutoff)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 1000);

  const entries = recent
    .map((article) => `  <url>
    <loc>${esc(absoluteUrl(articleHref(article)))}</loc>
    <news:news>
      <news:publication>
        <news:name>${esc(site.name)}</news:name>
        <news:language>${site.language}</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.publishedAt).toISOString().replace(/\.\d{3}Z$/, "Z")}</news:publication_date>
      <news:title>${esc(article.title)}</news:title>
    </news:news>
  </url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${entries}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
