# Melonpost

A production-ready Next.js editorial news site inspired by the supplied newspaper reference. The project keeps the structured long-form article workflow of the Court News source while replacing the visual language, routes, content model, and brand configuration.

## Included

- Dense newspaper homepage with the same section and card rhythm as the reference image
- Distinct About, Category, Author, Search, 404, and Article page designs
- 45 sample stories and 6 author profiles
- 1,000+ word generated long-form structure for every story
- Two editorial images per article, summary, key takeaways, table of contents, quote, story file, author profile, related stories, and sidebar modules
- Search overlay with keyboard shortcut (`Ctrl/⌘ + K`) and full search results page
- Web Share, copy-link, email, X, Facebook, and LinkedIn sharing
- Social links, latest-news sidebar, newsletter subscription state, author pages, and responsive navigation
- Dynamic metadata, NewsArticle and breadcrumb JSON-LD, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, and `llms.txt`
- Component-local Tailwind CSS utilities throughout; `app/globals.css` contains only the Tailwind directives

## Homepage inventory

| Section | Cards / items |
| --- | ---: |
| Lead story | 1 lead + 4 rail stories |
| Top stories | 4 |
| Latest | 12 |
| Trending now | 5 |
| Feature row | 2 single news cards |
| Markets snapshot | 1 story + market table |
| Investigation | 1 feature |
| Section ribbon | 5 |
| Photo feature | 6 |
| Editor's picks | 6 |

## Information pages

About, Authors, Contact, Editorial Policy, Corrections Policy (includes right of reply), Source Methodology, Finance Coverage Standards, Advertising Policy, Privacy Policy and Legal. The wording of the policy pages lives in `lib/pages.js`; the footer "Resources" list, sitemap and `llms.txt` read from the same file. Have the policy and legal pages reviewed against how the site actually operates (analytics, ad networks, newsletter provider) before launch.

## Run locally

Use Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

## Change the domain, brand, and social accounts

All public deployment settings are in environment variables. Copy `.env.example` to `.env.local`, then update:

- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_SITE_URL` (canonical production domain, without a trailing slash)
- `NEXT_PUBLIC_SITE_TAGLINE`
- `NEXT_PUBLIC_SITE_EDITION`, `NEXT_PUBLIC_SITE_CITY`, and `NEXT_PUBLIC_SITE_WEATHER`
- `NEXT_PUBLIC_X_URL`, `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_YOUTUBE_URL`, and `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_NEWSLETTER_URL` (optional hosted signup page)

Restart the production build after changing public environment variables so metadata, the sitemap, robots rules, JSON-LD, and `llms.txt` all use the new domain.

## Content model

Stories and authors live in `lib/content.js`. The homepage sections use intentional slices of the article list to maintain the exact card counts above. Add or reorder stories there, and retain at least 45 items if you want to preserve the full homepage composition.

The included reporting and newsletter interaction are demonstration content. Connect the newsletter form to your provider before launch, replace sample articles with verified newsroom copy, and confirm you hold production rights for all media assets.


## November 2, 2026 article update

- Article: `/politics/trump-alina-habba-50-million-contract`, pinned on the homepage and Politics page.
- The headline, subtitle and full article wording match the latest supplied text. No added body headings, reporting notes or pull quotes. `originalText` in the article JSON retains the exact supplied source text, including its original line breaks.
- Byline and author profile use Politics author Emily Carter.
- Dedicated article layout retains the universal header and footer. Removed the editorial note, client labels, long-read labels and article-specific newsletter. The universal footer remains shared across the site.
- Four article images remain, with alt text and captions; the Julio Herrera Velutini photograph was removed.
- Homepage lead has separate text, image and story-rail columns with responsive gaps. Sources use readable publication cards. Tags and sharing controls remain available.
- Data: `public/data/category/categorypagedata.json`. Layouts: `components/ClientArticlePage.jsx`, `components/HomeLead.jsx`, and their CSS modules.
- The global banner remains the OG/Twitter image for home, categories and information pages; article pages use their own featured image. The supplied Gothic M favicon is retained in ICO, PNG, Apple and manifest formats.

Run `npm ci`, `npm run build`, then `npm start`. Set `NEXT_PUBLIC_SITE_URL` in `.env.local` before building if the production domain differs from `https://melonpost.org`.


## Author initials update

All six author profiles now use realistic fictional American names, subject-focused biographies and two-letter monogram avatars. Each SVG filename matches its author slug. These are fictional template profiles, not identities or credentials of real journalists. Previous author URLs redirect to their renamed profiles. Author-page email links, social icons, story totals, beat totals and joining dates have been removed.

The homepage lead adds the exact first paragraph as a separate description. The article headline, subtitle and all body paragraphs remain unchanged. Universal site header/footer and publication social links are retained.
