// Central SEO helpers: article share cards, article metadata and every
// schema.org (JSON-LD) builder. Server-side only (reads the file system to
// find generated share cards) - do not import from "use client" components.
import fs from "node:fs";
import path from "node:path";
import { absoluteUrl, site, slugify, globalShareImage, pageSocialMetadata, twitterHandle, feedHref } from "./site";

// ---------------------------------------------------------------
// Share card for one article (its own featured image)
// ---------------------------------------------------------------
const publicFile = (rel) => path.join(process.cwd(), "public", rel.replace(/^\//, ""));

export function articleShareImage(article) {
  const generated = `/images/og/articles/${article.slug}.jpg`;
  const alt = article.imageAlt || article.title;
  if (fs.existsSync(publicFile(generated))) {
    return { url: absoluteUrl(generated), secureUrl: absoluteUrl(generated), type: "image/jpeg", width: 1200, height: 630, alt };
  }
  // Safety net if `npm run og:generate` has not been run for a brand-new story.
  return { url: absoluteUrl(article.image), width: article.imageWidth, height: article.imageHeight, alt };
}

export const articlePath = (article) => `/${slugify(article.category)}/${article.slug}`;
const trim = (value = "", max) => (value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value);

// ---------------------------------------------------------------
// Section + author + listing copy (search-friendly titles/descriptions)
// ---------------------------------------------------------------
const sectionTitles = {
  world: "World News",
  us: "U.S. News",
  business: "Business News",
  finance: "Finance and Markets News",
  technology: "Technology News",
  politics: "Politics News",
  health: "Health News",
  investigation: "Investigations",
};

export function categoryCopy(slug, category) {
  const title = sectionTitles[slug] || `${category} News`;
  const topic = category === "Investigation" ? "investigative reporting" : `${category} news`;
  return {
    title,
    description: `Latest ${topic}, analysis and expert perspective from ${site.name}. Independent reporting on the stories shaping ${category === "U.S." ? "the United States" : "the day"}.`,
  };
}

export function authorDescription(author) {
  const lead = `${author.name}, ${author.role} at ${site.name}. `;
  const room = 158 - lead.length;
  const sentences = author.bio.match(/[^.!?]+[.!?]+/g) || [author.bio];
  let body = "";
  for (const sentence of sentences) {
    if ((body + sentence).trim().length > room) break;
    body = `${body}${sentence}`;
  }
  return `${lead}${body.trim() || trim(author.bio, room)}`.trim();
}

// ---------------------------------------------------------------
// Article <head> metadata
// ---------------------------------------------------------------
export function articleMetadata(article, author) {
  const url = absoluteUrl(articlePath(article));
  const description = article.metaDescription || article.excerpt;
  const image = articleShareImage(article);
  const modified = article.updatedAt || article.publishedAt;
  const keywords = article.keywords || article.tags;
  const base = pageSocialMetadata(article.title, description, articlePath(article), image);
  return {
    title: article.title,
    description,
    keywords,
    authors: author ? [{ name: author.name, url: absoluteUrl(`/author/${author.slug}`) }] : undefined,
    category: article.category,
    alternates: base.alternates,
    openGraph: {
      ...base.openGraph,
      type: "article",
      title: article.title,
      publishedTime: article.publishedAt,
      modifiedTime: modified,
      authors: [absoluteUrl(`/author/${article.authorSlug}`)],
      section: article.category,
      tags: article.tags || [],
    },
    twitter: { ...base.twitter, title: article.title },
    // Lets Google/Discover use the large image preview and full snippets.
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

// ---------------------------------------------------------------
// JSON-LD builders
// ---------------------------------------------------------------
const CTX = "https://schema.org";
export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  person: (slug) => `${site.url}/author/${slug}#person`,
};

const logoObject = () => ({
  "@type": "ImageObject",
  url: absoluteUrl(site.logo.path),
  width: site.logo.width,
  height: site.logo.height,
});

// Full publisher block, repeated inline inside each NewsArticle because
// Google reads each JSON-LD block on its own.
export const publisherNode = () => ({
  "@type": "NewsMediaOrganization",
  "@id": ids.organization,
  name: site.name,
  url: site.url,
  logo: logoObject(),
});

// Home page: who publishes this site + the policies Google's news systems look for.
const orgRef = () => ({ "@type": "NewsMediaOrganization", "@id": ids.organization, name: site.name, url: site.url });
const websiteRef = () => ({ "@type": "WebSite", "@id": ids.website, name: site.name, url: site.url });

export function organizationJsonLd() {
  return {
    "@context": CTX,
    "@type": "NewsMediaOrganization",
    "@id": ids.organization,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: logoObject(),
    image: globalShareImage.url,
    description: site.tagline,
    slogan: site.tagline,
    email: site.email,
    sameAs: Object.values(site.socials).filter(Boolean),
    contactPoint: [{ "@type": "ContactPoint", contactType: "editorial", email: site.email, url: absoluteUrl("/contact") }],
    publishingPrinciples: absoluteUrl("/editorial-policy"),
    ethicsPolicy: absoluteUrl("/editorial-policy"),
    correctionsPolicy: absoluteUrl("/corrections-policy"),
    verificationFactCheckingPolicy: absoluteUrl("/source-methodology"),
    actionableFeedbackPolicy: absoluteUrl("/contact"),
    masthead: absoluteUrl("/about"),
  };
}

export function websiteJsonLd() {
  return {
    "@context": CTX,
    "@type": "WebSite",
    "@id": ids.website,
    name: site.name,
    url: site.url,
    description: site.tagline,
    inLanguage: site.language,
    publisher: publisherNode(),
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${site.url}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

// items: [{ name, path }]  (path "/" for home)
export function breadcrumbJsonLd(items) {
  return {
    "@context": CTX,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? site.url : absoluteUrl(item.path),
    })),
  };
}

export function newsArticleJsonLd(article, author, wordCount) {
  const url = absoluteUrl(articlePath(article));
  const card = articleShareImage(article);
  const images = [card.url, absoluteUrl(article.image), article.secondaryImage && absoluteUrl(article.secondaryImage)].filter(Boolean);
  const keywords = article.keywords || article.tags;
  return {
    "@context": CTX,
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: trim(article.title, 110),
    description: article.metaDescription || article.excerpt,
    image: [...new Set(images)],
    thumbnailUrl: card.url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    articleSection: article.category,
    keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords,
    wordCount,
    timeRequired: article.readingTime ? `PT${article.readingTime}M` : undefined,
    inLanguage: site.language,
    isAccessibleForFree: true,
    copyrightHolder: orgRef(),
    copyrightYear: new Date(article.publishedAt).getUTCFullYear(),
    citation: article.sources?.map((source) => source.url).filter(Boolean),
    author: author
      ? [{ "@type": author.type || "Person", "@id": ids.person(author.slug), name: author.name, url: absoluteUrl(`/author/${author.slug}`), jobTitle: author.role }]
      : undefined,
    publisher: publisherNode(),
  };
}

export function articleBreadcrumbs(article) {
  return breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: article.category, path: `/${slugify(article.category)}` },
    { name: article.title, path: articlePath(article) },
  ]);
}

// Section page: a CollectionPage that lists its stories.
export function collectionPageJsonLd({ name, description, path: pagePath, articles }) {
  const url = absoluteUrl(pagePath);
  return {
    "@context": CTX,
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: `${name} | ${site.name}`,
    description,
    inLanguage: site.language,
    isPartOf: websiteRef(),
    publisher: publisherNode(),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(articlePath(article)),
        name: article.title,
      })),
    },
  };
}

// Author page: Google "profile page" markup with a Person entity.
export function profilePageJsonLd(author, articles) {
  const url = absoluteUrl(`/author/${author.slug}`);
  return {
    "@context": CTX,
    "@type": "ProfilePage",
    "@id": `${url}#webpage`,
    url,
    name: `${author.name} | ${site.name}`,
    inLanguage: site.language,
    dateModified: articles.map((a) => a.updatedAt || a.publishedAt).sort().pop(),
    mainEntity: {
      "@type": author.type || "Person",
      "@id": ids.person(author.slug),
      name: author.name,
      url,
      jobTitle: author.role,
      description: author.bio,
      image: absoluteUrl(author.image),
      worksFor: orgRef(),
      homeLocation: author.location ? { "@type": "Place", name: author.location } : undefined,
    },
  };
}

// Information / policy / about / contact pages.
export function webPageJsonLd({ type = "WebPage", name, description, path: pagePath, dateModified }) {
  const url = absoluteUrl(pagePath);
  return {
    "@context": CTX,
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: `${name} | ${site.name}`,
    description,
    inLanguage: site.language,
    dateModified,
    isPartOf: websiteRef(),
    publisher: publisherNode(),
  };
}

export { twitterHandle, feedHref };
