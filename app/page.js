import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import HomeLead from "@/components/HomeLead";
import {
  articles,
  getAuthor,
  formatDate,
  articleHref,
  categoryHref,
} from "@/lib/content";
import { absoluteUrl, site, pageSocialMetadata } from "@/lib/site";
import {
  CompactStory,
  SectionHeading,
  StoryCard,
} from "@/components/StoryCard";

// ---------------------------------------------------------------
// Which single category each "type" section pulls from.
// Change these three constants to reassign a section to a
// different category — the heading + "View all" link update
// automatically to match.
// ---------------------------------------------------------------
const TOP_STORIES_CATEGORY = "World";
const TRENDING_CATEGORY = "Technology";
const PHOTO_FEATURE_CATEGORY = "Health";

const marketRows = [
  ["S&P 500", "7,580.07", "−1.82%"],
  ["Dow Jones", "51,770.31", "−1.09%"],
  ["Nasdaq", "25,437.00", "−2.86%"],
  ["FTSE 100", "10,729.78", "+0.07%"],
  ["Nikkei 225", "63,081.90", "−0.33%"],
  ["Gold", "$3,900.90", "+0.70%"],
];

export const metadata = {
  title: { absolute: `${site.name} — Independent journalism and global perspectives` },
  ...pageSocialMetadata(`${site.name} — Independent journalism and global perspectives`, site.tagline),
  alternates: { canonical: site.url },
};

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------

/** Pull up to `count` articles for a category, skipping any slug already used. */
function pickByCategory(pool, category, usedSlugs, count) {
  const picked = [];
  for (const article of pool) {
    if (article.category !== category) continue;
    if (usedSlugs.has(article.slug)) continue;
    picked.push(article);
    if (picked.length === count) break;
  }
  return picked;
}

/** Pull up to `count` articles from any category, skipping used slugs. */
function pickAny(pool, usedSlugs, count) {
  const picked = [];
  for (const article of pool) {
    if (usedSlugs.has(article.slug)) continue;
    picked.push(article);
    if (picked.length === count) break;
  }
  return picked;
}

function markUsed(usedSlugs, items) {
  items.forEach((a) => usedSlugs.add(a.slug));
}

export default function HomePage() {
  const usedSlugs = new Set();

  // Newest-first ordering, driven by the real publishedAt timestamp
  // rather than array order. Used specifically for "Latest".
  const byPublishedDesc = [...articles].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  const getArticleByCategoryAndId = (category, id) => {
    return articles.find(
      article => article.category === category && article.id === id
    );
  };

  // ---- Lead ---------------------------------------------------------

  // const lead = getArticleByCategoryAndId("us", 1);
  // usedSlugs.add(lead.slug);
  // const leadAuthor = getAuthor(lead.authorSlug);

  const PINNED_CLIENT_SLUG = "trump-alina-habba-50-million-contract";
  const lead = articles.find(article => article.slug === PINNED_CLIENT_SLUG) || byPublishedDesc[0];
  usedSlugs.add(lead.slug);
  const leadAuthor = getAuthor(lead.authorSlug);

  // ---- Side-lead (top-right) — genuinely latest news, newest first ----
  const sideLead = pickAny(byPublishedDesc, usedSlugs, 4);
  markUsed(usedSlugs, sideLead);

  // ---- Top stories: single category ----------------------------------
  const topStories = pickByCategory(articles, TOP_STORIES_CATEGORY, usedSlugs, 4);
  markUsed(usedSlugs, topStories);

  // ---- Latest: stays genuinely "latest" — mixed across all categories,
  // ordered by real publishedAt, newest first --------------------------
  const latest = pickAny(byPublishedDesc, usedSlugs, 6);
  markUsed(usedSlugs, latest);

  // ---- Trending now: single category ----------------------------------
  const trending = pickByCategory(articles, TRENDING_CATEGORY, usedSlugs, 5);
  markUsed(usedSlugs, trending);

  // ---- Opinion column: single news card (replaces the old Authors list) ----
  const singleFeature = pickByCategory(articles, "Business", usedSlugs, 1)[0];
  if (singleFeature) usedSlugs.add(singleFeature.slug);

  const opinionFeature = pickByCategory(articles, "Politics", usedSlugs, 1)[0];
  if (opinionFeature) usedSlugs.add(opinionFeature.slug);

  // ---- Markets / Finance --------------------------------------------------
  const marketsFeature = pickByCategory(articles, "Finance", usedSlugs, 1)[0];
  if (marketsFeature) usedSlugs.add(marketsFeature.slug);

  // ---- Investigation ----------------------------------------------------------
  const investigationFeature = pickByCategory(articles, "Investigation", usedSlugs, 1)[0];
  if (investigationFeature) usedSlugs.add(investigationFeature.slug);

  // ---- Category ribbon strip: 5 articles, each keeping its own category ------
  const categoryFeatures = pickAny(articles, usedSlugs, 5);
  markUsed(usedSlugs, categoryFeatures);

  // ---- Photo feature: single category -----------------------------------------
  const photos = pickByCategory(articles, PHOTO_FEATURE_CATEGORY, usedSlugs, 6);
  markUsed(usedSlugs, photos);

  // ---- Editor's picks: curated, any leftover -----------------------------------
  const editorPicks = pickAny(articles, usedSlugs, 6);
  markUsed(usedSlugs, editorPicks);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: site.name,
    url: site.url,
    description: site.tagline,
    sameAs: Object.values(site.socials),
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className="mx-auto w-[min(calc(100%-48px),1390px)] pt-[22px] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[700px]:w-[min(calc(100%-24px),1390px)] max-[700px]:pt-3">
        <HomeLead lead={lead} author={leadAuthor} sideLead={sideLead} />

        {/* Heading renamed from "Top stories" to its assigned category */}
        <section className="mt-5">
          <SectionHeading title={TOP_STORIES_CATEGORY} href={categoryHref(TOP_STORIES_CATEGORY)} />
          <div className="grid grid-cols-4 gap-3.5 py-2.5 max-[980px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-5">
            {topStories.map((article) => (
              <StoryCard key={article.slug} article={article} showExcerpt titleClassName="text-lg" excerptClassName="text-[11px]" />
            ))}
          </div>
        </section>

        {/* Stays "Latest" — genuinely mixed across all categories */}
        <section className="mt-5">
          <SectionHeading title="Latest" href="/search" />
          <div className="grid grid-cols-6 gap-x-3.5 gap-y-5 pt-3 max-[1200px]:grid-cols-4 max-[980px]:grid-cols-3 max-[700px]:grid-cols-2 max-[700px]:gap-x-3">
            {latest.map((article) => (
              <StoryCard key={article.slug} article={article} variant="latest" imageClassName="aspect-[1.72/1]" />
            ))}
          </div>
        </section>

        {/* Heading renamed from "Trending now" to its assigned category */}
        <section className="mt-5">
          <SectionHeading title={TRENDING_CATEGORY} href={categoryHref(TRENDING_CATEGORY)} />
          <div className="grid grid-cols-5 gap-[18px] pb-1.5 pt-2.5 max-[980px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-5">
            {trending.map((article, index) => (
              <StoryCard
                key={article.slug}
                article={article}
                variant="trending"
                rank={index + 1}
                className={index === trending.length - 1 ? "max-[980px]:hidden max-[700px]:col-span-full max-[700px]:block max-[700px]:max-w-[50%]" : ""}
              />
            ))}
          </div>
        </section>

        <section className="mt-5 grid grid-cols-[1.2fr_1.45fr_1.2fr_1.35fr] border-b border-line max-[1200px]:grid-cols-[1fr_1.2fr_1fr] max-[980px]:grid-cols-2 max-[700px]:block" aria-label="Featured stories, markets, and investigations">
          {singleFeature && (
            <StoryCard article={singleFeature} variant="feature" showExcerpt className="pl-0 max-[700px]:mb-5" />
          )}

          {opinionFeature && (
            <StoryCard article={opinionFeature} variant="feature" showExcerpt className="max-[700px]:mt-5" />
          )}

          <div className="min-w-0 border-r border-line-light px-4 max-[980px]:border-r-0 max-[700px]:mb-[25px] max-[700px]:mt-5 max-[700px]:border-r-0 max-[700px]:p-0">
            <SectionHeading className="border-t-0" title="Markets snapshot" href={categoryHref("Finance")} linkLabel="See full markets" />
            <table className="my-2 mb-2.5 w-full border-collapse text-[10px] [&_td]:border-b [&_td]:border-line-light [&_td]:px-0.5 [&_td]:py-[5px] [&_td]:text-right [&_th]:border-b [&_th]:border-line-light [&_th]:px-0.5 [&_th]:py-[5px] [&_th]:text-right [&_th:first-child]:text-left [&_tbody_th]:font-normal">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Last</th>
                  <th>Move</th>
                </tr>
              </thead>
              <tbody>
                {marketRows.map(([name, value, move]) => (
                  <tr key={name}>
                    <th>{name}</th>
                    <td>{value}</td>
                    <td className={move.startsWith("−") ? "text-negative" : "text-positive"}>{move}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {marketsFeature && (
              <CompactStory article={marketsFeature} className="grid-cols-1" imageClassName="row-start-1" />
            )}
          </div>

          <div className="min-w-0 pl-4 max-[1200px]:hidden max-[700px]:mb-[25px] max-[700px]:p-0">
            <SectionHeading className="border-t-0" title="Investigation" href={categoryHref("Investigation")} />
            {investigationFeature && (
              <StoryCard article={investigationFeature} variant="feature" showExcerpt className="border-r-0 px-0 pb-4 pt-3" />
            )}
          </div>
        </section>

        <section className="mt-5 grid grid-cols-5 border-b border-line pb-4 max-[980px]:grid-cols-3 max-[980px]:gap-y-[25px] max-[700px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-5" aria-label="More sections">
          {categoryFeatures.map((article, index) => (
            <div className={`min-w-0 ${index === categoryFeatures.length - 1 ? "max-[700px]:hidden" : ""}`} key={article.slug}>
              <SectionHeading
                className={`${index ? "pl-[15px]" : ""} [&_a]:hidden`}
                title={article.category}
                href={categoryHref(article.category)}
                linkLabel="View all"
              />
              <StoryCard article={article} variant="ribbon" />
            </div>
          ))}
        </section>

        {/* Heading renamed from "Photo feature" to its assigned category */}
        <section className="mt-5">
          <SectionHeading title={PHOTO_FEATURE_CATEGORY} href={categoryHref(PHOTO_FEATURE_CATEGORY)} />
          <div className="grid grid-cols-6 gap-[13px] pb-[18px] pt-3 max-[980px]:grid-cols-3 max-[700px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-5">
            {photos.map((article) => (
              <article key={article.slug} className="group">
                <Link className="relative block aspect-[1.65/1] overflow-hidden" href={articleHref(article)}>
                  <Image className="transition-transform duration-500 ease-out group-hover:scale-[1.035]" src={article.image} alt="" fill sizes="(max-width: 700px) 50vw, 17vw" />
                </Link>
                <h3 className="mb-0.5 mt-[7px] text-xs font-normal leading-[1.12]">
                  <Link className="hover:text-red" href={articleHref(article)}>{article.title}</Link>
                </h3>
                <p className="text-[8px] text-muted">By {getAuthor(article.authorSlug).name}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid min-h-[100px] grid-cols-[115px_repeat(6,minmax(0,1fr))] items-center gap-3 border-t border-line px-2.5 py-3.5 max-[1200px]:grid-cols-[100px_repeat(3,1fr)] max-[700px]:grid-cols-[85px_1fr]" aria-label="Editor's picks">
          <h2 className="m-0 text-lg font-normal uppercase leading-[.95]">Editor&apos;s<br />picks</h2>
          {editorPicks.map((article, index) => (
            <Link className={`grid grid-cols-[42px_1fr] items-center gap-[9px] ${index >= 3 ? "max-[1200px]:hidden" : ""} ${index >= 2 ? "max-[700px]:hidden" : ""}`} key={article.slug} href={articleHref(article)}>
              <span className="flex h-[51px] w-[42px] items-center justify-center bg-green text-[22px] text-gold" aria-hidden="true">
                {index % 3 === 0 ? <BookOpen size={24} /> : index % 3 === 1 ? "◉" : "▤"}
              </span>
              <span>
                <strong className="block text-[10px] font-normal leading-[1.15]">{article.title}</strong>
                <small className="mt-[5px] block text-[8px] text-muted">{index % 2 ? "Read now" : "Read now"}</small>
              </span>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
