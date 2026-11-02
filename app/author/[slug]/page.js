import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import {
  authors,
  getAuthor,
  getArticlesByAuthor,
  formatDate,
  articleHref,
} from "@/lib/content";
import { site, pageSocialMetadata } from "@/lib/site";

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: author.name,
    description: `${author.name}, ${author.role} at ${site.name}. ${author.bio}`,
    ...pageSocialMetadata(author.name, `${author.name}, ${author.role} at ${site.name}. ${author.bio}`, `/author/${slug}`),
    alternates: { canonical: `${site.url}/author/${slug}` },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  const stories = getArticlesByAuthor(slug);
  const lead = stories[0];

  return (
    <div>
      <section className="bg-[linear-gradient(110deg,#1a3a5c_0_68%,#152f4a_68%)] py-[58px] text-white max-[700px]:py-[35px]">
        <div className="mx-auto grid w-[min(calc(100%-48px),1390px)] grid-cols-[260px_minmax(0,1fr)] items-center gap-[52px] max-[1200px]:grid-cols-[230px_minmax(0,1fr)] max-[1200px]:gap-[35px] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[980px]:grid-cols-[230px_1fr] max-[700px]:w-[min(calc(100%-24px),1390px)] max-[700px]:grid-cols-[110px_1fr] max-[700px]:items-start max-[700px]:gap-5">
          <div className="relative aspect-square overflow-hidden rounded-full border border-gold-light/50">
            <Image src={author.image} alt={author.imageAlt || author.name} fill priority sizes="(max-width: 700px) 110px, 260px" />
          </div>
          <div className="max-[700px]:contents">
            <div>
              <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-gold">Author</span>
              <h1 className="mb-1 mt-[7px] text-[clamp(54px,6vw,88px)] font-normal leading-none tracking-[-.04em] max-[700px]:text-[43px]">{author.name}</h1>
              <p className="font-sans text-[13px] uppercase tracking-[.06em] text-gold-light">{author.role}</p>
            </div>
            <p className="max-w-[650px] text-[15px] leading-[1.55] text-[#d5dfd8] max-[700px]:col-span-full max-[700px]:text-[13px]">{author.bio}</p>
            <div className="mt-5 flex items-center gap-[18px] font-sans text-[10px] uppercase text-[#c9d4ce] max-[700px]:col-span-full max-[700px]:flex-wrap">
              <span className="flex items-center gap-1.5"><MapPin size={14} aria-hidden="true" /> {author.location}</span>
            </div>

          </div>

        </div>
      </section>

      <div className="mx-auto grid w-[min(calc(100%-48px),1390px)] grid-cols-[300px_1fr] items-start gap-20 pb-[100px] pt-[75px] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[980px]:grid-cols-[240px_1fr] max-[980px]:gap-[38px] max-[700px]:block max-[700px]:w-[min(calc(100%-24px),1390px)] max-[700px]:pt-[45px]">
        <aside className="sticky top-[25px] border-t-4 border-gold bg-paper-deep p-7 max-[700px]:static max-[700px]:mb-[45px]">
          <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">Biography</span>
          <h2 className="mb-[18px] mt-[9px] text-[27px] font-normal">About {author.name.split(" ")[0]}</h2>
          <p className="text-sm leading-[1.6] text-muted">{author.longBio}</p>
          <p className="mt-5 border-t border-line pt-4 text-[11px] leading-[1.6] text-muted">
            <strong>Disclosure:</strong> Authors do not accept gifts or paid travel from
            organizations they cover.
          </p>
        </aside>

        <section>
          <div>
            <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">Latest work</span>
            <h2 className="mb-7 mt-2 text-[41px] font-normal">Reporting by {author.name}</h2>
          </div>
          {lead ? (
            <article className="group grid grid-cols-[1.2fr_1fr] gap-8 border-b border-line pb-[34px] max-[980px]:grid-cols-1">
              <Link className="relative min-h-[310px] overflow-hidden max-[700px]:min-h-[250px]" href={articleHref(lead)}>
                <Image className="transition-transform duration-500 ease-out group-hover:scale-[1.035]" src={lead.image} alt="" fill sizes="(max-width: 800px) 100vw, 48vw" />
              </Link>
              <div className="self-center">
                <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">{lead.category}</span>
                <h3 className="mb-3.5 mt-[9px] text-[34px] font-normal leading-[1.05]"><Link className="hover:text-red" href={articleHref(lead)}>{lead.title}</Link></h3>
                <p className="leading-[1.45] text-muted">{lead.excerpt}</p>
                <small className="text-[10px] text-muted">{formatDate(lead.publishedAt)} · {lead.readingTime} min read</small>
              </div>
            </article>
          ) : null}
          <div>
            {stories.slice(1).map((article) => (
              <article className="group grid min-h-[180px] grid-cols-[1fr_210px] gap-7 border-b border-line-light py-6 max-[700px]:grid-cols-[1fr_110px] max-[700px]:gap-3.5" key={article.slug}>
                <div>
                  <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">{article.category}</span>
                  <h3 className="mb-[9px] mt-[7px] text-[25px] font-normal"><Link className="hover:text-red" href={articleHref(article)}>{article.title}</Link></h3>
                  <p className="leading-[1.45] text-muted max-[700px]:hidden">{article.excerpt}</p>
                  <small className="text-[10px] text-muted">{formatDate(article.publishedAt)}</small>
                </div>
                <Link className="relative block min-h-[136px] overflow-hidden" href={articleHref(article)}>
                  <Image className="transition-transform duration-500 ease-out group-hover:scale-[1.035]" src={article.image} alt="" fill sizes="200px" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
