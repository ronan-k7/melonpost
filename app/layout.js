import "./globals.css";
import localFont from "next/font/local";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { absoluteUrl, site, pageSocialMetadata } from "@/lib/site";

const masthead = localFont({
  src: "./fonts/UnifrakturCook-Bold.woff2",
  variable: "--font-masthead",
  weight: "700",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Independent journalism and global perspectives`,
    template: `%s | ${site.name}`,
  },
  description:
    "Independent reporting and analysis across world affairs, politics, business, climate, science, investigations, health, and technology.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "news",
  // Canonical + social tags come from pageSocialMetadata() so every page gets its own.
  ...pageSocialMetadata(site.name, site.tagline),
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/melonpost-favicon.png", type: "image/png", sizes: "48x48" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  // max-image-preview:large is what lets Google show big thumbnails in Search, Top Stories and Discover.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Search Console / Bing Webmaster meta-tag verification (optional, set in the host's env vars).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a3a5c",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${masthead.variable} scroll-smooth scroll-pt-[90px]`}>
      <body className="m-0 bg-paper bg-[radial-gradient(rgba(30,34,27,0.04)_0.45px,transparent_0.45px)] [background-size:5px_5px] font-serif text-ink antialiased selection:bg-green selection:text-cream [&_img]:object-cover">
        <a className="fixed left-3 top-3 z-[1000] -translate-y-[160%] bg-green px-4 py-2.5 text-white focus:translate-y-0" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
