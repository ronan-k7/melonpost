import { articles, authors, categorySlugs, getCategoryName, articleHref, categoryHref } from "@/lib/content";
import { site } from "@/lib/site";
import { resourceLinks } from "@/lib/pages";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.tagline}`,
    "",
    `${site.name} is an online news publication covering world affairs, U.S. news, business, finance, technology, politics, health and investigations.`,
    "",
    "## Core pages",
    `- [Home](${site.url}/)` ,
    ...resourceLinks.map((link) => `- [${link.label}](${site.url}${link.href})`),
    `- [Search](${site.url}/search)`,
    "",
    "## Sections",
    ...categorySlugs.map((slug) => `- [${getCategoryName(slug)}](${site.url}${categoryHref(slug)})`),
    "",
    "## Authors",
    ...authors.map((author) => `- [${author.name}](${site.url}/author/${author.slug}): ${author.role}`),
    "",
    "## Articles",
    ...articles.map((article) => `- [${article.title}](${site.url}${articleHref(article)}) — ${article.category}`),
    "",
    "## Machine-readable discovery",
    `- Sitemap: ${site.url}/sitemap.xml`,
    `- Robots: ${site.url}/robots.txt`,
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
