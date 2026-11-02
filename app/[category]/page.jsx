import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  articles,
  categorySlugs,
  getArticlesByCategory,
  getCategoryName,
  getAuthor,
  articleHref,
} from "@/lib/content";
import { site, pageSocialMetadata } from "@/lib/site";
import { Byline, StoryCard } from "@/components/StoryCard";
import NewsletterForm from "@/components/NewsletterForm";

export function generateStaticParams() {
  return categorySlugs.map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = getCategoryName(slug);
  if (!category) return {};
  return {
    title: category,
    description: `Latest ${category.toLowerCase()} reporting, analysis, and perspective from ${site.name}.`,
    ...pageSocialMetadata(category, `Latest ${category.toLowerCase()} reporting, analysis, and perspective from ${site.name}.`, `/${slug}`),
    alternates: { canonical: `${site.url}/${slug}` },
  };
}

export default async function CategoryPage({ params }) {
  const { category: slug } = await params;
  const category = getCategoryName(slug);
  if (!category) notFound();

  const categoryArticles = getArticlesByCategory(slug);
  const lead = categoryArticles[0];
  const secondary = categoryArticles.slice(1, 4);
  const more = categoryArticles.slice(4);
  const editorsPicks = articles
    .filter((article) => article.category !== category)
    .slice(6, 10);
  const author = getAuthor(lead.authorSlug);

  return (
    <div>
      <header className="relative overflow-hidden bg-green py-12 pb-[48px] text-white after:absolute after:-bottom-[120px] after:-right-[7vw] after:size-[400px] after:rounded-full after:border after:border-gold/40 after:content-[''] after:[box-shadow:0_0_0_40px_rgba(198,166,106,.05),0_0_0_90px_rgba(198,166,106,.04)] max-[700px]:py-10">
        <div className="mx-auto w-[min(calc(100%-48px),1390px)] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[700px]:w-[min(calc(100%-24px),1390px)]">
          <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-gold">Section</span>
          <h1 className="mb-2 mt-1.5 text-[clamp(58px,7vw,100px)] font-normal leading-none tracking-[-.04em] text-white max-[700px]:text-6xl">{category}</h1>
          <p className="m-0 max-w-[550px] text-base leading-[1.45] text-[#cdd8d2]">
            Reporting that connects the day&apos;s developments with the forces shaping what
            comes next.
          </p>
        </div>
      </header>

      <div className="mx-auto w-[min(calc(100%-48px),1390px)] pb-[90px] pt-[42px] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[700px]:w-[min(calc(100%-24px),1390px)]">
        <section className="grid min-h-[470px] grid-cols-[1.35fr_.8fr] border-b border-line max-[980px]:grid-cols-1">
          <Link className="relative min-h-[440px] overflow-hidden max-[700px]:min-h-[320px]" href={articleHref(lead)}>
            <Image src={lead.image} alt={lead.imageAlt || lead.title} fill priority sizes="(max-width: 850px) 100vw, 58vw" />
          </Link>
          <div className="flex flex-col items-start justify-center px-[30px] py-[38px] pl-[45px] max-[980px]:pl-[15px] max-[700px]:px-1 max-[700px]:py-7">
            <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">Today&apos;s lead</span>
            <h2 className="mb-[18px] mt-[13px] text-[clamp(38px,4vw,60px)] font-normal leading-[1.02] tracking-[-.03em] max-[700px]:text-[40px]"><Link className="hover:text-red" href={articleHref(lead)}>{lead.title}</Link></h2>
            <p className="text-base leading-[1.48] text-muted">{lead.excerpt}</p>
            <div className="mt-4"><Byline authorSlug={lead.authorSlug} date={lead.publishedAt} compact /></div>
          </div>
        </section>

        {secondary.length ? (
          <section className="grid grid-cols-3 gap-[26px] border-b border-line py-[30px] pb-[45px] max-[700px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-5" aria-label={`More ${category} stories`}>
            {secondary.map((article) => (
              <StoryCard key={article.slug} article={article} showExcerpt titleClassName="text-[27px] max-[700px]:text-[17px]" />
            ))}
          </section>
        ) : null}

        {more.length ? (
          <section className="pt-[68px]">
            <div className="mb-[25px]">
              <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">Latest in {category}</span>
              <h2 className="mb-0 mt-2 text-[38px] font-normal">More reporting</h2>
            </div>
            <div className="max-w-[920px]">
              {more.map((article) => (
                <article className="group grid grid-cols-[280px_1fr] gap-7 border-t border-line-light py-[23px] max-[700px]:grid-cols-[125px_1fr] max-[700px]:gap-[15px]" key={article.slug}>
                  <Link className="relative block min-h-[175px] overflow-hidden max-[700px]:min-h-[105px]" href={articleHref(article)}>
                    <Image className="transition-transform duration-500 ease-out group-hover:scale-[1.035]" src={article.image} alt="" fill sizes="260px" />
                  </Link>
                  <div>
                    <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">{article.category}</span>
                    <h3 className="mb-[9px] mt-[7px] text-[27px] font-normal leading-[1.08] max-[700px]:text-[19px]"><Link className="hover:text-red" href={articleHref(article)}>{article.title}</Link></h3>
                    <p className="mb-[13px] leading-[1.4] text-muted max-[700px]:hidden">{article.excerpt}</p>
                    <small className="text-[10px] text-muted">By {getAuthor(article.authorSlug).name} · {article.timeAgo}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <aside className="mt-[72px] grid grid-cols-[1fr_minmax(320px,520px)] items-center gap-[50px] bg-green px-11 py-[38px] text-white max-[980px]:grid-cols-1 max-[700px]:px-[22px] max-[700px]:py-7">
          <div>
            <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-gold">The {category} briefing</span>
            <h2 className="my-2 text-[30px] font-normal">One sharp email. Every weekday.</h2>
            <p className="m-0 text-[13px] text-[#cdd8d2]">Context, essential links, and the questions our editors are following.</p>
          </div>
          <div className="[&_form]:mt-0"><NewsletterForm actionUrl={site.newsletterUrl} /></div>
        </aside>

        <section className="pt-[68px]">
          <div className="mb-[25px]">
            <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">Selected by {author.name}</span>
            <h2 className="mb-0 mt-2 text-[38px] font-normal">From across the review</h2>
          </div>
          <div className="mb-[30px] grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-5">
            {editorsPicks.map((article) => (
              <StoryCard key={article.slug} article={article} />
            ))}
          </div>
          <Link className="inline-flex items-center gap-[7px] font-sans text-xs font-bold uppercase tracking-[.04em] text-red" href="/search">
            Explore the full archive <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
