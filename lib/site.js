export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Melonpost",
  shortName: "Melonpost",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://melonpost.org").replace(/\/$/, ""),
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
  socials: {
    x: process.env.NEXT_PUBLIC_X_URL || "https://x.com/melonpost",
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ||
      "https://facebook.com/melonpost",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      "https://instagram.com/melonpost",
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

// Default share card for home, category, author and information pages.
// Article routes deliberately override it with the story's featured image.
export const globalShareImage = {
  url: absoluteUrl("/images/brand/melonpost-global-news-og.png"),
  width: 1672, height: 941,
  alt: "Melonpost — Independent news, in-depth analysis and global perspectives",
};

export function pageSocialMetadata(title, description, path = "/") {
  const socialTitle = title === site.name || title.includes(site.name) ? title : `${title} | ${site.name}`;
  return {
    openGraph: { type: "website", siteName: site.name, title: socialTitle, description,
      url: absoluteUrl(path), images: [globalShareImage] },
    twitter: { card: "summary_large_image", title: socialTitle, description,
      images: [globalShareImage.url] },
  };
}
