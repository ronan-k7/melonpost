import { site } from "@/lib/site";

export default function manifest() {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#f8f5ee",
    theme_color: "#1a3a5c",
    icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
 