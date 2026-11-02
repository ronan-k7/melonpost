import { articles, authors, categorySlugs, getArticlesByCategory, getArticlesByAuthor, articleHref, categoryHref } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";
import { infoPagePaths, infoPages } from "@/lib/pages";

const modified = (article) => new Date(article.updatedAt || article.publishedAt);
const newest = (list) => (list.length ? new Date(Math.max(...list.map((a) => modified(a).getTime()))) : undefined);

// Only real, indexable URLs belong here (the noindex /search page is left out on purpose).
// lastModified comes from the content itself - Google ignores sitemaps whose dates are always "now".
export default function sitemap() {
  const home = [{ url: site.url, lastModified: newest(articles), changeFrequency: "hourly", priority: 1 }];

  const staticPages = infoPagePaths.map((path) => {
    const slug = path.replace(/^\//, "");
    const updated = infoPages[slug]?.updated;
    return {
      url: absoluteUrl(path),
      ...(updated ? { lastModified: new Date(updated) } : {}),
      changeFrequency: "monthly",
      priority: 0.5,
    };
  });

  const categoryPages = categorySlugs.map((slug) => ({
    url: absoluteUrl(categoryHref(slug)),
    lastModified: newest(getArticlesByCategory(slug)),
    changeFrequency: "hourly",
    priority: 0.8,
  }));

  const authorPages = authors.map((author) => ({
    url: absoluteUrl(`/author/${author.slug}`),
    lastModified: newest(getArticlesByAuthor(author.slug)),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const articlePages = articles.map((article) => ({
    url: absoluteUrl(articleHref(article)),
    lastModified: modified(article),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [article.image, article.secondaryImage].filter(Boolean).map((src) => absoluteUrl(src)),
  }));

  return [...home, ...categoryPages, ...articlePages, ...authorPages, ...staticPages];
}
