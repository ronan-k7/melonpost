export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Melonpost",
  shortName: "Melonpost",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.melonpost.org").replace(/\/$/, ""),
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE ||
    "Independent journalism. Global perspectives.",
  edition: process.env.NEXT_PUBLIC_SITE_EDITION || "International",
  city: process.env.NEXT_PUBLIC_SITE_CITY || "London, UK",
  weather: process.env.NEXT_PUBLIC_SITE_WEATHER || "16°C",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    "desk@melonpost.org",
  newsletterUrl: process.env.NEXT_PUBLIC_NEWSLETTER_URL || "",
  // Square publisher logo used in Organization / NewsArticle structured data.
  logo: { path: "/icon-512.png", width: 512, height: 512 },
  language: "en",
  socials: {
    x: process.env.NEXT_PUBLIC_X_URL || "https://x.com/melonpost77",
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ||
      "https://www.facebook.com/profile.php?id=61595153027938",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      "https://www.instagram.com/melon__post/",
    youtube:
      process.env.NEXT_PUBLIC_YOUTUBE_URL ||
      "https://youtube.com/@melonpost",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      "https://linkedin.com/company/melonpost",
  },
};

export const navigation = [
  "World",
  "U.S.",
  "Business",
  "Finance",
  "Technology",
  "Politics",
  "Investigation",
  "Health"
];

export const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/\./g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const absoluteUrl = (path = "") =>
  `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

// ---------------------------------------------------------------
// Social share cards (Open Graph + Twitter/X)
//
//  * Home, category, author and information pages  -> the brand card below.
//  * Article pages                                 -> that story's own card,
//    see articleShareImage() in lib/seo.js.
//
// Both are share-safe JPEGs generated from the originals by
// `npm run og:generate` (scripts/generate-og-images.mjs). The brand card is
// built from public/images/brand/melonpost-global-news-og.png, which stays
// untouched (it is 1.7 MB - too heavy for WhatsApp/Slack/etc. to fetch).
// ---------------------------------------------------------------
export const globalShareImage = {
  url: absoluteUrl("/images/og/melonpost-global-news-og.jpg"),
  secureUrl: absoluteUrl("/images/og/melonpost-global-news-og.jpg"),
  type: "image/jpeg",
  width: 1200,
  height: 675,
  alt: "Melonpost — Independent news, in-depth analysis and global perspectives",
};

export const feedHref = "/feed.xml";

// "https://x.com/melonpost" -> "@melonpost"
const xHandle = (site.socials.x.match(/(?:x|twitter)\.com\/@?([A-Za-z0-9_]+)/i) || [])[1];
export const twitterHandle = xHandle ? `@${xHandle}` : undefined;

export function pageSocialMetadata(title, description, path = "/", image = globalShareImage) {
  const socialTitle = title === site.name || title.includes(site.name) ? title : `${title} | ${site.name}`;
  const url = path === "/" ? site.url : absoluteUrl(path);
  return {
    // Every page gets a self-referencing canonical + the RSS discovery link.
    // (A page that defines `alternates` replaces the parent's, so it lives here.)
    alternates: { canonical: url, types: { "application/rss+xml": [{ url: absoluteUrl(feedHref), title: `${site.name} — latest news` }] } },
    openGraph: { type: "website", siteName: site.name, locale: "en_US", title: socialTitle, description,
      url, images: [image] },
    twitter: { card: "summary_large_image", site: twitterHandle, creator: twitterHandle,
      title: socialTitle, description, images: [{ url: image.url, alt: image.alt, width: image.width, height: image.height }] },
  };
}
