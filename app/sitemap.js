import { articles, authors, categorySlugs, articleHref, categoryHref } from "@/lib/content";
import { site } from "@/lib/site";
import { infoPagePaths } from "@/lib/pages";

export default function sitemap() {
  const staticPages = ["", "/search", ...infoPagePaths].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-08-12T12:00:00.000Z"),
    changeFrequency: path === "" ? "hourly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));

  const categoryPages = categorySlugs.map((slug) => ({
    url: `${site.url}${categoryHref(slug)}`,
    lastModified: new Date("2026-08-12T12:00:00.000Z"),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const authorPages = authors.map((author) => ({
    url: `${site.url}/author/${author.slug}`,
    lastModified: new Date("2026-08-12T12:00:00.000Z"),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articlePages = articles.map((article) => ({
    url: `${site.url}${articleHref(article)}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${site.url}${article.image}`, `${site.url}${article.secondaryImage}`],
  }));

  return [...staticPages, ...categoryPages, ...authorPages, ...articlePages];
}
