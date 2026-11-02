import { slugify } from "./site";
import authorsData from "../public/data/authors.json";
import categoryPageData from "../public/data/category/categorypagedata.json";

// Data now lives in JSON files under /public/data, the same way the
// COURT NEWS project organizes its content:
//   /public/data/authors.json                   -> all author records
//   /public/data/category/categorypagedata.json -> { [categorySlug]: [article, ...] }
//
// This file just loads that JSON and exposes the same helper API the
// rest of the app already relies on, so nothing else needs to change.

export const authors = authorsData;

export const categorySlugs = Object.keys(categoryPageData);

// Flatten { [categorySlug]: [article, ...] } into one array.
export const articles = categorySlugs.flatMap((slug) =>
  categoryPageData[slug].map((article) => ({
    ...article,
    keyTakeaways: article.keyTakeaways || [],
  }))
);

export const getArticle = (slug) =>
  articles.find((article) => article.slug === slug);

export const getAuthor = (slug) =>
  authors.find((author) => author.slug === slug);

export const getArticlesByAuthor = (slug) =>
  articles.filter((article) => article.authorSlug === slug);

export const getCategoryName = (slug) =>
  articles.find((article) => slugify(article.category) === slug)?.category;

export const getArticlesByCategory = (slug) =>
  articles.filter((article) => slugify(article.category) === slug);

// Centralised URL builders. The site now uses a nested
// /[category]/[slug] route for article detail pages and a
// /[category] route for category listing pages, so every link in the
// app should be built from these two helpers instead of hardcoding
// "/article/..." or "/category/..." paths.
export const categoryHref = (categorySlugOrName) => {
  const slug = categorySlugs.includes(categorySlugOrName)
    ? categorySlugOrName
    : slugify(categorySlugOrName);
  return `/${slug}`;
};

export const articleHref = (article) =>
  `/${slugify(article.category)}/${article.slug}`;

export const formatDate = (value) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));

export const searchArticles = (query = "") => {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return articles.filter((article) => {
    const author = getAuthor(article.authorSlug);
    return [article.title, article.category, article.excerpt, ...(article.tags || []), author?.name]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });
};

// The article body (dropcap/paragraphs/sections) is now stored directly
// in categorypagedata.json under `body.sections`, the same way the
// COURT NEWS json stores its body content. This just reads it back
// instead of generating it on the fly.
export function articleSections(article) {
  return article.body?.sections || [];
}

export function articleWordCount(article) {
  if (typeof article.wordCount === "number") return article.wordCount;
  const words = [
    article.title,
    article.excerpt,
    article.summary,
    ...(article.keyTakeaways || []),
    article.quote?.text,
    ...articleSections(article).flatMap((section) => [
      section.title,
      ...section.paragraphs,
    ]),
  ]
    .filter(Boolean)
    .join(" ")
    .trim()
    .split(/\s+/);
  return words.length;
}
