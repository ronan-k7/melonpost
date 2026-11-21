import { articles, articleHref, getAuthor } from "@/lib/content";
import { articleShareImage } from "@/lib/seo";
import { site, absoluteUrl, feedHref } from "@/lib/site";

// RSS 2.0 feed of the 50 newest stories. Helps Google News, Discover, Feedly,
// Apple News and other aggregators find new stories quickly.
export const dynamic = "force-static";

const esc = (value = "") =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function GET() {
  const latest = [...articles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 50);
  const built = latest.length ? new Date(latest[0].updatedAt || latest[0].publishedAt) : new Date();

  const items = latest
    .map((article) => {
      const link = absoluteUrl(articleHref(article));
      const author = getAuthor(article.authorSlug);
      const card = articleShareImage(article);
      const tags = [article.category, ...(article.tags || [])];
      return `    <item>
      <title>${esc(article.title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <dc:creator>${esc(author?.name || site.name)}</dc:creator>
${tags.map((tag) => `      <category>${esc(tag)}</category>`).join("\n")}
      <description>${esc(article.metaDescription || article.excerpt)}</description>
      <media:content url="${esc(card.url)}" medium="image" type="${card.type || "image/jpeg"}"${card.width ? ` width="${card.width}"` : ""}${card.height ? ` height="${card.height}"` : ""}>
        <media:title>${esc(card.alt)}</media:title>
      </media:content>
      <media:thumbnail url="${esc(card.url)}"/>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${esc(site.url)}</link>
    <description>${esc(site.tagline)}</description>
    <language>${site.language}</language>
    <lastBuildDate>${built.toUTCString()}</lastBuildDate>
    <atom:link href="${esc(absoluteUrl(feedHref))}" rel="self" type="application/rss+xml"/>
    <image>
      <url>${esc(absoluteUrl(site.logo.path))}</url>
      <title>${esc(site.name)}</title>
      <link>${esc(site.url)}</link>
    </image>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
    },
  });
}
