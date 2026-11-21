import { site } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Internal search result pages are endless thin URLs - keep crawlers out of them.
        // (/search itself stays crawlable so its noindex tag is seen.)
        disallow: ["/api/", "/search?"],
      },
    ],
    sitemap: [`${site.url}/sitemap.xml`, `${site.url}/news-sitemap.xml`],
  };
}
