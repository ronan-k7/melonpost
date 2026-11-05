// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import {
//   ArrowRight,
//   Bookmark,
//   CalendarDays,
//   Check,
//   Clock3,
//   List,
//   Quote,
// } from "lucide-react";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaXTwitter,
//   FaYoutube,
// } from "react-icons/fa6";
// import {
//   articleSections,
//   articles,
//   articleWordCount,
//   formatDate,
//   getArticle,
//   getAuthor,
//   articleHref,
//   categoryHref,
// } from "@/lib/content";
// import { site, slugify } from "@/lib/site";
// import JsonLd from "@/components/JsonLd";
// import { articleBreadcrumbs, articleMetadata, newsArticleJsonLd } from "@/lib/seo";
// import { Byline, StoryCard } from "@/components/StoryCard";
// import ShareTools from "@/components/ShareTools";
// import NewsletterForm from "@/components/NewsletterForm";
// import ClientArticlePage from "@/components/ClientArticlePage";
// import ClientArticlePageTwo from "@/components/ClientArticlePageTwo";

// export function generateStaticParams() {
//   return articles.map((article) => ({
//     category: slugify(article.category),
//     slug: article.slug,
//   }));
// }

// export async function generateMetadata({ params }) {
//   const { category, slug } = await params;
//   const article = getArticle(slug);
//   if (!article || slugify(article.category) !== category) return {};
//   // The story's own featured image is its share card (see lib/seo.js).
//   return articleMetadata(article, getAuthor(article.authorSlug));
// }

// const socialLinks = [
//   ["X", FaXTwitter, "x"],
//   ["Facebook", FaFacebookF, "facebook"],
//   ["Instagram", FaInstagram, "instagram"],
//   ["YouTube", FaYoutube, "youtube"],
//   ["LinkedIn", FaLinkedinIn, "linkedin"],
// ];

// export default async function ArticlePage({ params }) {
//   const { category, slug } = await params;
//   const article = getArticle(slug);
//   if (!article || slugify(article.category) !== category) notFound();

//   const author = getAuthor(article.authorSlug);
//   const sections = articleSections(article);
//   const wordCount = articleWordCount(article);
//   const articleUrl = `${site.url}${articleHref(article)}`;
//   const latest = articles.filter((item) => item.slug !== article.slug).slice(0, 4);
//   const related = articles
//     .filter((item) => item.category === article.category && item.slug !== article.slug)
//     .slice(0, 4);
//   const fallbackRelated = [
//     ...related,
//     ...articles.filter(item => item.slug !== article.slug && !related.some(story => story.slug === item.slug)),
//   ].slice(0, 4);

//   const newsArticleSchema = newsArticleJsonLd(article, author, wordCount);
//   const breadcrumbJsonLd = articleBreadcrumbs(article);

//   if (article.template === "client-long-read") {
//     return <ClientArticlePage article={article} author={author} related={fallbackRelated} schema={newsArticleSchema} breadcrumbs={breadcrumbJsonLd} />;
//   }

//   if (article.template === "client-long-read-2") {
//     return <ClientArticlePageTwo article={article} author={author} related={fallbackRelated} schema={newsArticleSchema} breadcrumbs={breadcrumbJsonLd} />;
//   }

//   return (
//     <article>
//       <JsonLd data={newsArticleSchema} />
//       <JsonLd data={breadcrumbJsonLd} />

//       <header className="mx-auto w-[min(calc(100%-48px),1120px)] pb-[38px] pt-[45px] max-[980px]:w-[min(calc(100%-32px),1120px)] max-[700px]:w-[min(calc(100%-24px),1120px)] max-[700px]:pt-7">
//         <nav className="mb-[38px] flex items-center gap-2 font-sans text-[9px] uppercase tracking-[.08em] text-muted max-[700px]:mb-[25px] [&_a:hover]:text-red" aria-label="Breadcrumb">
//           <Link href="/">Home</Link><span>/</span>
//           <Link href={categoryHref(slugify(article.category))}>{article.category}</Link>
//         </nav>
//         <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">{article.category}</span>
//         <h1 className="mb-[22px] mt-3 max-w-[1050px] text-[clamp(48px,6.1vw,84px)] font-normal leading-[.98] tracking-[-.045em] max-[700px]:text-[47px]">{article.title}</h1>
//         <p className="mb-[30px] max-w-[870px] text-[21px] leading-[1.4] text-[#4b514c] max-[700px]:text-[17px]">{article.excerpt}</p>
//         <div className="flex items-center justify-between max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-[18px]">
//           <Byline authorSlug={article.authorSlug} date={article.publishedAt} />
//           <div className="flex items-center gap-[18px] font-sans text-[10px] text-muted">
//             <span className="flex items-center gap-[5px]"><Clock3 size={14} aria-hidden="true" /> {article.readingTime} min read</span>
//             <span className="flex items-center gap-[5px]"><Bookmark size={14} aria-hidden="true" /> Save</span>
//           </div>
//         </div>
//       </header>

//       <figure className="mx-auto w-[min(calc(100%-48px),1260px)] max-[980px]:w-[min(calc(100%-32px),1260px)] max-[700px]:w-[min(calc(100%-24px),1260px)]">
//         <div className="relative h-[min(68vw,700px)] max-h-[700px] min-h-[390px] overflow-hidden max-[700px]:min-h-[300px]">
//           <Image src={article.image} alt={article.title} fill priority sizes="(max-width: 900px) 100vw, 1200px" />
//         </div>
//         <figcaption className="pt-[9px] font-sans text-[9px] leading-[1.45] text-muted">
//           Melonpost&apos;s visual desk illustrates the places, institutions, and
//           people at the center of this report.
//         </figcaption>
//       </figure>

//       <div className="mx-auto grid w-[min(calc(100%-48px),1390px)] grid-cols-[58px_minmax(0,760px)_310px] items-start justify-center gap-[45px] pb-[85px] pt-12 max-[1200px]:grid-cols-[48px_minmax(0,720px)_270px] max-[1200px]:gap-[26px] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[980px]:grid-cols-[48px_minmax(0,760px)] max-[700px]:block max-[700px]:w-[min(calc(100%-24px),1390px)] max-[700px]:pt-7">
//         <aside className="sticky top-[25px] max-[700px]:static max-[700px]:mb-5" aria-label="Article sharing tools">
//           <ShareTools title={article.title} url={articleUrl} vertical />
//         </aside>

//         <div className="min-w-0">

//           <section className="mt-[22px] border border-gold-light px-[30px] py-[26px] max-[700px]:px-[18px] max-[700px]:py-[22px]" aria-labelledby="takeaways-title">
//             <div className="flex items-center gap-[9px] text-green">
//               <Check size={20} aria-hidden="true" />
//               <h2 className="m-0 text-[22px] font-normal" id="takeaways-title">Key takeaways</h2>
//             </div>
//             <ul className="mb-0 mt-[17px] list-none p-0">
//               {article.keyTakeaways.map((takeaway) => (
//                 <li className="relative border-t border-line-light py-2.5 pl-6 text-sm leading-[1.5] text-[#444b46] before:absolute before:left-0.5 before:top-3 before:size-3 before:font-sans before:text-[10px] before:text-positive before:content-['✓']" key={takeaway}>{takeaway}</li>
//               ))}
//             </ul>
//           </section>



//           <div className="pt-[15px]">
//             {sections.map((section, sectionIndex) => (
//               <section className="scroll-mt-7" key={section.id} id={section.id}>
//                 <h2 className="mb-[18px] mt-[50px] text-[37px] font-normal tracking-[-.02em] max-[700px]:text-[31px]">{section.title}</h2>
//                 {section.paragraphs.map((paragraph, paragraphIndex) => (
//                   <p
//                     key={paragraph}
//                     className={`mb-[22px] text-lg leading-[1.75] text-[#2d332f] max-[700px]:text-[17px] max-[700px]:leading-[1.7] ${sectionIndex === 0 && paragraphIndex === 0 ? "first-letter:float-left first-letter:pr-[9px] first-letter:pt-[5px] first-letter:text-[85px] first-letter:leading-[.68] first-letter:text-green" : ""}`}
//                   >
//                     {paragraph}
//                   </p>
//                 ))}

//                 {sectionIndex === 1 ? (
//                   <figure className="mb-[43px] mt-[38px]">
//                     <div className="relative h-[440px] overflow-hidden max-[700px]:h-[300px]">
//                       <Image
//                         src={article.secondaryImage}
//                         alt={`Additional context for ${article.title}`}
//                         fill
//                         sizes="(max-width: 750px) 100vw, 720px"
//                       />
//                     </div>
//                     <figcaption className="pt-[9px] font-sans text-[9px] leading-[1.45] text-muted">
//                       A second view adds geographic and institutional context to the
//                       developing story.
//                     </figcaption>
//                   </figure>
//                 ) : null}

//                 {sectionIndex === 2 ? (
//                   <blockquote className="relative my-[42px] bg-green pb-[38px] pl-[70px] pr-10 pt-[42px] text-white max-[700px]:px-6 max-[700px]:pb-[30px] max-[700px]:pt-[52px]">
//                     <Quote className="absolute left-[26px] top-[31px] text-gold" size={32} strokeWidth={1.2} aria-hidden="true" />
//                     <p className="mb-3.5 text-[27px] italic leading-[1.35] text-white max-[700px]:text-[22px]">{article.quote.text}</p>
//                     <cite className="font-sans text-[10px] not-italic uppercase tracking-[.07em] text-gold-light">— {article.quote.author}</cite>
//                   </blockquote>
//                 ) : null}
//               </section>
//             ))}
//           </div>

//           <div className="mt-5 border-y border-line py-7">
//             <ShareTools title={article.title} url={articleUrl} />
            
//           </div>

//           <section className="mt-[35px] grid grid-cols-[125px_1fr] items-center gap-[26px] bg-paper-deep p-[35px] max-[700px]:grid-cols-[80px_1fr] max-[700px]:items-start max-[700px]:px-[18px] max-[700px]:py-6">
//             <Link className="relative block size-[125px] overflow-hidden rounded-full max-[700px]:size-20" href={`/author/${author.slug}`}>
//               <Image src={author.image} alt={author.name} fill sizes="120px" />
//             </Link>
//             <div>
//               <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">Written by</span>
//               <h2 className="mb-2.5 mt-[5px] text-[27px] font-normal"><Link href={`/author/${author.slug}`}>{author.name}</Link></h2>
//               <p className="mb-3.5 text-[13px] leading-[1.5] text-muted">{author.bio}</p>
//               <Link className="inline-flex items-center gap-[7px] font-sans text-xs font-bold uppercase tracking-[.04em] text-red" href={`/author/${author.slug}`}>
//                 More from {author.name.split(" ")[0]} <ArrowRight size={14} aria-hidden="true" />
//               </Link>
//             </div>
//           </section>
//         </div>

//         <aside className="sticky top-[25px] flex min-w-0 flex-col gap-[25px] max-[980px]:static max-[980px]:col-start-2 max-[980px]:grid max-[980px]:grid-cols-2 max-[700px]:mt-[35px] max-[700px]:block">
//            <nav className="border border-line-light bg-cream px-[30px] py-[25px] max-[700px]:px-[18px] max-[700px]:py-[22px]" aria-labelledby="toc-title">
//             <div className="flex items-center gap-[9px] text-green">
//               <List size={20} aria-hidden="true" />
//               <h2 className="m-0 text-[22px] font-normal" id="toc-title">Table of contents</h2>
//             </div>
//             <ol className="mb-0 mt-[17px] grid list-none grid-cols-1 gap-[9px] p-0">
//               {sections.map((section, index) => (
//                 <li className="text-xs text-muted" key={section.id}><span className="mr-[7px] font-sans text-[9px] text-gold">{String(index + 1).padStart(2, "0")}</span><a className="hover:text-red" href={`#${section.id}`}>{section.title}</a></li>
//               ))}
//             </ol>
//           </nav>
//           <section className="border-t-[3px] border-green bg-cream p-[23px] max-[700px]:mb-5">
//             <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">Follow {site.shortName}</span>
//             <h2 className="mb-[15px] mt-[7px] text-[23px] font-normal">Stay with the story</h2>
//             <div className="flex gap-[7px]">
//               {socialLinks.map(([label, Icon, key]) => (
//                 <a className="inline-flex size-[30px] items-center justify-center rounded-full border border-current text-xs text-green" key={label} href={site.socials[key]} target="_blank" rel="noreferrer" aria-label={label}>
//                   <Icon aria-hidden="true" />
//                 </a>
//               ))}
//             </div>
//           </section>


//           <section className="border-t-[3px] border-green bg-cream p-[23px] max-[700px]:mb-5">
//             <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">Latest news</span>
//             <h2 className="mb-[15px] mt-[7px] text-[23px] font-normal">Just published</h2>
//             {latest.map((item, index) => (
//               <Link className="grid grid-cols-[28px_1fr] gap-2.5 border-t border-line-light py-[13px]" key={item.slug} href={articleHref(item)}>
//                 <span className="text-lg text-gold">{String(index + 1).padStart(2, "0")}</span>
//                 <span>
//                   <strong className="block text-sm font-normal leading-[1.2]">{item.title}</strong>
//                   <small className="mt-[5px] block text-[8px] text-muted">{item.timeAgo}</small>
//                 </span>
//               </Link>
//             ))}
//           </section>

//           <section className="border-t-[3px] border-gold bg-green p-[23px] text-white max-[700px]:mb-5">
//             <CalendarDays className="mb-3.5 text-gold" size={27} strokeWidth={1.3} aria-hidden="true" />
//             <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-gold">{site.name}</span>
//             <h2 className="mb-[15px] mt-[7px] text-[23px] font-normal text-white">Start informed.</h2>
//             <p className="text-xs leading-[1.45] text-[#cdd8d2]">Our editors&apos; concise morning briefing, delivered every weekday.</p>
//             <NewsletterForm actionUrl={site.newsletterUrl} compact />
//           </section>
//         </aside>
//       </div>

//       <section className="mx-auto w-[min(calc(100%-48px),1390px)] border-t border-line pb-[90px] pt-[60px] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[700px]:w-[min(calc(100%-24px),1390px)]">
//         <div>
//           <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">Continue reading</span>
//           <h2 className="mb-[26px] mt-2 text-[40px] font-normal">Related stories</h2>
//         </div>
//         <div className="grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-5">
//           {fallbackRelated.slice(0, 4).map((item) => (
//             <StoryCard key={item.slug} article={item} />
//           ))}
//         </div>
//       </section>
//     </article>
//   );
// }


import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  FileText,
  List,
  Quote,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import {
  articleSections,
  articles,
  articleWordCount,
  getArticle,
  getAuthor,
  articleHref,
  categoryHref,
} from "@/lib/content";
import { site, slugify } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { articleBreadcrumbs, articleMetadata, newsArticleJsonLd } from "@/lib/seo";
import { Byline, StoryCard } from "@/components/StoryCard";
import ShareTools from "@/components/ShareTools";
import NewsletterForm from "@/components/NewsletterForm";
import ClientArticlePage from "@/components/ClientArticlePage";
import ClientArticlePageTwo from "@/components/ClientArticlePageTwo";

export function generateStaticParams() {
  return articles.map((article) => ({
    category: slugify(article.category),
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const article = getArticle(slug);
  if (!article || slugify(article.category) !== category) return {};
  // The story's own featured image is its share card (see lib/seo.js).
  return articleMetadata(article, article.authorSlug ? getAuthor(article.authorSlug) : null);
}

const socialLinks = [
  ["X", FaXTwitter, "x"],
  ["Facebook", FaFacebookF, "facebook"],
  ["Instagram", FaInstagram, "instagram"],
  ["YouTube", FaYoutube, "youtube"],
  ["LinkedIn", FaLinkedinIn, "linkedin"],
];

/* ---------- safe helpers: missing JSON fields never crash the page ---------- */

function safeSections(article) {
  try {
    const result = articleSections(article);
    if (!Array.isArray(result)) return [];
    return result
      .filter((section) => section && section.title)
      .map((section, index) => ({
        ...section,
        id: section.id || `section-${index + 1}`,
        paragraphs: Array.isArray(section.paragraphs)
          ? section.paragraphs.filter(Boolean)
          : [],
      }));
  } catch {
    return [];
  }
}

function safeWordCount(article) {
  try {
    const count = articleWordCount(article);
    if (typeof count === "number" && !Number.isNaN(count)) return count;
  } catch {}
  return Number(article.wordCount) || 0;
}

function safeUrl(value) {
  if (typeof value !== "string") return "";
  const url = value.trim();
  return /^https?:\/\//i.test(url) ? url : "";
}

function hostnameOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// Accepts: ["Outlet: headline"], [{ title, url }], [{ name, url }], [{ label, href }]
function normalizeSources(sources) {
  if (!Array.isArray(sources)) return [];
  return sources
    .map((source) => {
      if (!source) return null;
      if (typeof source === "string") {
        const text = source.trim();
        return text ? { title: text, url: "", host: "" } : null;
      }
      const url = safeUrl(source.url || source.href || source.link);
      const title = source.title || source.name || source.label || url;
      if (!title) return null;
      return { title, url, host: url ? hostnameOf(url) : "" };
    })
    .filter(Boolean);
}

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const article = getArticle(slug);
  if (!article || slugify(article.category) !== category) notFound();

  const author = article.authorSlug ? getAuthor(article.authorSlug) : null;
  const sections = safeSections(article);
  const wordCount = safeWordCount(article);
  const articleUrl = `${site.url}${articleHref(article)}`;
  const latest = articles.filter((item) => item.slug !== article.slug).slice(0, 4);
  const related = articles
    .filter((item) => item.category === article.category && item.slug !== article.slug)
    .slice(0, 4);
  const fallbackRelated = [
    ...related,
    ...articles.filter(
      (item) =>
        item.slug !== article.slug && !related.some((story) => story.slug === item.slug)
    ),
  ].slice(0, 4);

  const newsArticleSchema = newsArticleJsonLd(article, author, wordCount);
  const breadcrumbJsonLd = articleBreadcrumbs(article);

  if (article.template === "client-long-read") {
    return (
      <ClientArticlePage
        article={article}
        author={author}
        related={fallbackRelated}
        schema={newsArticleSchema}
        breadcrumbs={breadcrumbJsonLd}
      />
    );
  }

  if (article.template === "client-long-read-2") {
    return (
      <ClientArticlePageTwo
        article={article}
        author={author}
        related={fallbackRelated}
        schema={newsArticleSchema}
        breadcrumbs={breadcrumbJsonLd}
      />
    );
  }

  /* ---------- optional pieces: each one shows only if present ---------- */
  const takeaways = Array.isArray(article.keyTakeaways)
    ? article.keyTakeaways.filter(Boolean)
    : [];
  const quote =
    article.quote && typeof article.quote === "object" && article.quote.text
      ? article.quote
      : null;
  const sources = normalizeSources(article.sources);
  const hasSecondaryImage = Boolean(article.secondaryImage);

  // Inline image / quote go after section 2 / 3, or after the last section if fewer exist
  const lastIndex = sections.length - 1;
  const imageIndex = Math.min(1, lastIndex);
  const quoteIndex = Math.min(2, lastIndex);

  const tocItems = [
    ...sections.map((section) => ({ id: section.id, title: section.title })),
    ...(sources.length ? [{ id: "sources", title: "Sources" }] : []),
  ];

  return (
    <article>
      <JsonLd data={newsArticleSchema} />
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mx-auto w-[min(calc(100%-48px),1120px)] pb-[38px] pt-[45px] max-[980px]:w-[min(calc(100%-32px),1120px)] max-[700px]:w-[min(calc(100%-24px),1120px)] max-[700px]:pt-7">
        <nav
          className="mb-[38px] flex items-center gap-2 font-sans text-[9px] uppercase tracking-[.08em] text-muted max-[700px]:mb-[25px] [&_a:hover]:text-red"
          aria-label="Breadcrumb"
        >
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={categoryHref(slugify(article.category))}>{article.category}</Link>
        </nav>
        <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">
          {article.category}
        </span>
        <h1 className="mb-[22px] mt-3 max-w-[1050px] text-[clamp(48px,6.1vw,84px)] font-normal leading-[.98] tracking-[-.045em] max-[700px]:text-[47px]">
          {article.title}
        </h1>
        {article.excerpt ? (
          <p className="mb-[30px] max-w-[870px] text-[21px] leading-[1.4] text-[#4b514c] max-[700px]:text-[17px]">
            {article.excerpt}
          </p>
        ) : null}
        <div className="flex items-center justify-between max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-[18px]">
          {article.authorSlug && author ? (
            <Byline authorSlug={article.authorSlug} date={article.publishedAt} />
          ) : (
            <span />
          )}
          <div className="flex items-center gap-[18px] font-sans text-[10px] text-muted">
            {article.readingTime ? (
              <span className="flex items-center gap-[5px]">
                <Clock3 size={14} aria-hidden="true" /> {article.readingTime} min read
              </span>
            ) : null}
            <span className="flex items-center gap-[5px]">
              <Bookmark size={14} aria-hidden="true" /> Save
            </span>
          </div>
        </div>
      </header>

      {article.image ? (
        <figure className="mx-auto w-[min(calc(100%-48px),1260px)] max-[980px]:w-[min(calc(100%-32px),1260px)] max-[700px]:w-[min(calc(100%-24px),1260px)]">
          <div className="relative h-[min(68vw,700px)] max-h-[700px] min-h-[390px] overflow-hidden max-[700px]:min-h-[300px]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 1200px"
            />
          </div>
          {/* <figcaption className="pt-[9px] font-sans text-[9px] leading-[1.45] text-muted">
            Melonpost&apos;s visual desk illustrates the places, institutions, and
            people at the center of this report.
          </figcaption> */}
        </figure>
      ) : null}

      <div className="mx-auto grid w-[min(calc(100%-48px),1390px)] grid-cols-[58px_minmax(0,760px)_310px] items-start justify-center gap-[45px] pb-[85px] pt-12 max-[1200px]:grid-cols-[48px_minmax(0,720px)_270px] max-[1200px]:gap-[26px] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[980px]:grid-cols-[48px_minmax(0,760px)] max-[700px]:block max-[700px]:w-[min(calc(100%-24px),1390px)] max-[700px]:pt-7">
        <aside
          className="sticky top-[25px] max-[700px]:static max-[700px]:mb-5"
          aria-label="Article sharing tools"
        >
          <ShareTools title={article.title} url={articleUrl} vertical />
        </aside>

        <div className="min-w-0">
          {takeaways.length > 0 ? (
            <section
              className="mt-[22px] border border-gold-light px-[30px] py-[26px] max-[700px]:px-[18px] max-[700px]:py-[22px]"
              aria-labelledby="takeaways-title"
            >
              <div className="flex items-center gap-[9px] text-green">
                <Check size={20} aria-hidden="true" />
                <h2 className="m-0 text-[22px] font-normal" id="takeaways-title">
                  Key takeaways
                </h2>
              </div>
              <ul className="mb-0 mt-[17px] list-none p-0">
                {takeaways.map((takeaway, index) => (
                  <li
                    className="relative border-t border-line-light py-2.5 pl-6 text-sm leading-[1.5] text-[#444b46] before:absolute before:left-0.5 before:top-3 before:size-3 before:font-sans before:text-[10px] before:text-positive before:content-['✓']"
                    key={`takeaway-${index}`}
                  >
                    {takeaway}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="pt-[15px]">
            {sections.map((section, sectionIndex) => (
              <section className="scroll-mt-7" key={section.id} id={section.id}>
                <h2 className="mb-[18px] mt-[50px] text-[37px] font-normal tracking-[-.02em] max-[700px]:text-[31px]">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${section.id}-${paragraphIndex}`}
                    className={`mb-[22px] text-lg leading-[1.75] text-[#2d332f] max-[700px]:text-[17px] max-[700px]:leading-[1.7] ${
                      sectionIndex === 0 && paragraphIndex === 0
                        ? "first-letter:float-left first-letter:pr-[9px] first-letter:pt-[5px] first-letter:text-[85px] first-letter:leading-[.68] first-letter:text-green"
                        : ""
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}

                {hasSecondaryImage && sectionIndex === imageIndex ? (
                  <figure className="mb-[43px] mt-[38px]">
                    <div className="relative h-[440px] overflow-hidden max-[700px]:h-[300px]">
                      <Image
                        src={article.secondaryImage}
                        alt={`Additional context for ${article.title}`}
                        fill
                        sizes="(max-width: 750px) 100vw, 720px"
                      />
                    </div>
                    {/* <figcaption className="pt-[9px] font-sans text-[9px] leading-[1.45] text-muted">
                      A second view adds geographic and institutional context to the
                      developing story.
                    </figcaption> */}
                  </figure>
                ) : null}

                {quote && sectionIndex === quoteIndex ? (
                  <blockquote className="relative my-[42px] bg-green pb-[38px] pl-[70px] pr-10 pt-[42px] text-white max-[700px]:px-6 max-[700px]:pb-[30px] max-[700px]:pt-[52px]">
                    <Quote
                      className="absolute left-[26px] top-[31px] text-gold"
                      size={32}
                      strokeWidth={1.2}
                      aria-hidden="true"
                    />
                    <p className="mb-3.5 text-[27px] italic leading-[1.35] text-white max-[700px]:text-[22px]">
                      {quote.text}
                    </p>
                    {quote.author ? (
                      <cite className="font-sans text-[10px] not-italic uppercase tracking-[.07em] text-gold-light">
                        — {quote.author}
                      </cite>
                    ) : null}
                  </blockquote>
                ) : null}
              </section>
            ))}
          </div>

          {sources.length > 0 ? (
            <section
              className="mt-[50px] scroll-mt-7 border-t-[3px] border-green bg-cream px-[30px] py-[26px] max-[700px]:px-[18px] max-[700px]:py-[22px]"
              id="sources"
              aria-labelledby="sources-title"
            >
              <div className="flex items-center gap-[9px] text-green">
                <FileText size={20} aria-hidden="true" />
                <h2 className="m-0 text-[22px] font-normal" id="sources-title">
                  Sources
                </h2>
              </div>
              <ol className="mb-0 mt-[17px] list-none p-0">
                {sources.map((source, index) => (
                  <li
                    className="grid grid-cols-[26px_1fr] gap-2 border-t border-line-light py-3 text-sm leading-[1.45] text-[#444b46]"
                    key={`source-${index}`}
                  >
                    <span className="font-sans text-[10px] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      {source.url ? (
                        <a
                          className="inline-flex items-start gap-1.5 break-words hover:text-red"
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{source.title}</span>
                          <ExternalLink
                            className="mt-[3px] shrink-0"
                            size={12}
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        <span className="break-words">{source.title}</span>
                      )}
                      {source.host ? (
                        <small className="mt-[3px] block font-sans text-[9px] uppercase tracking-[.06em] text-muted">
                          {source.host}
                        </small>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <div className="mt-5 border-y border-line py-7">
            <ShareTools title={article.title} url={articleUrl} />
          </div>

          {author ? (
            <section className="mt-[35px] grid grid-cols-[125px_1fr] items-center gap-[26px] bg-paper-deep p-[35px] max-[700px]:grid-cols-[80px_1fr] max-[700px]:items-start max-[700px]:px-[18px] max-[700px]:py-6">
              {author.image ? (
                <Link
                  className="relative block size-[125px] overflow-hidden rounded-full max-[700px]:size-20"
                  href={`/author/${author.slug}`}
                >
                  <Image src={author.image} alt={author.name} fill sizes="120px" />
                </Link>
              ) : (
                <span />
              )}
              <div>
                <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">
                  Written by
                </span>
                <h2 className="mb-2.5 mt-[5px] text-[27px] font-normal">
                  <Link href={`/author/${author.slug}`}>{author.name}</Link>
                </h2>
                {author.bio ? (
                  <p className="mb-3.5 text-[13px] leading-[1.5] text-muted">{author.bio}</p>
                ) : null}
                <Link
                  className="inline-flex items-center gap-[7px] font-sans text-xs font-bold uppercase tracking-[.04em] text-red"
                  href={`/author/${author.slug}`}
                >
                  More from {String(author.name || "").split(" ")[0]}{" "}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="sticky top-[25px] flex min-w-0 flex-col gap-[25px] max-[980px]:static max-[980px]:col-start-2 max-[980px]:grid max-[980px]:grid-cols-2 max-[700px]:mt-[35px] max-[700px]:block">
          {tocItems.length > 0 ? (
            <nav
              className="border border-line-light bg-cream px-[30px] py-[25px] max-[700px]:px-[18px] max-[700px]:py-[22px]"
              aria-labelledby="toc-title"
            >
              <div className="flex items-center gap-[9px] text-green">
                <List size={20} aria-hidden="true" />
                <h2 className="m-0 text-[22px] font-normal" id="toc-title">
                  Table of contents
                </h2>
              </div>
              <ol className="mb-0 mt-[17px] grid list-none grid-cols-1 gap-[9px] p-0">
                {tocItems.map((item, index) => (
                  <li className="text-xs text-muted" key={item.id}>
                    <span className="mr-[7px] font-sans text-[9px] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <a className="hover:text-red" href={`#${item.id}`}>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <section className="border-t-[3px] border-green bg-cream p-[23px] max-[700px]:mb-5">
            <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">
              Follow {site.shortName}
            </span>
            <h2 className="mb-[15px] mt-[7px] text-[23px] font-normal">Stay with the story</h2>
            <div className="flex gap-[7px]">
              {socialLinks.map(([label, Icon, key]) =>
                site.socials?.[key] ? (
                  <a
                    className="inline-flex size-[30px] items-center justify-center rounded-full border border-current text-xs text-green"
                    key={label}
                    href={site.socials[key]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                ) : null
              )}
            </div>
          </section>

          {latest.length > 0 ? (
            <section className="border-t-[3px] border-green bg-cream p-[23px] max-[700px]:mb-5">
              <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">
                Latest news
              </span>
              <h2 className="mb-[15px] mt-[7px] text-[23px] font-normal">Just published</h2>
              {latest.map((item, index) => (
                <Link
                  className="grid grid-cols-[28px_1fr] gap-2.5 border-t border-line-light py-[13px]"
                  key={item.slug}
                  href={articleHref(item)}
                >
                  <span className="text-lg text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <strong className="block text-sm font-normal leading-[1.2]">
                      {item.title}
                    </strong>
                    {item.timeAgo ? (
                      <small className="mt-[5px] block text-[8px] text-muted">
                        {item.timeAgo}
                      </small>
                    ) : null}
                  </span>
                </Link>
              ))}
            </section>
          ) : null}

          <section className="border-t-[3px] border-gold bg-green p-[23px] text-white max-[700px]:mb-5">
            <CalendarDays
              className="mb-3.5 text-gold"
              size={27}
              strokeWidth={1.3}
              aria-hidden="true"
            />
            <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-gold">
              {site.name}
            </span>
            <h2 className="mb-[15px] mt-[7px] text-[23px] font-normal text-white">
              Start informed.
            </h2>
            <p className="text-xs leading-[1.45] text-[#cdd8d2]">
              Our editors&apos; concise morning briefing, delivered every weekday.
            </p>
            <NewsletterForm actionUrl={site.newsletterUrl} compact />
          </section>
        </aside>
      </div>

      {fallbackRelated.length > 0 ? (
        <section className="mx-auto w-[min(calc(100%-48px),1390px)] border-t border-line pb-[90px] pt-[60px] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[700px]:w-[min(calc(100%-24px),1390px)]">
          <div>
            <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">
              Continue reading
            </span>
            <h2 className="mb-[26px] mt-2 text-[40px] font-normal">Related stories</h2>
          </div>
          <div className="grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-5">
            {fallbackRelated.slice(0, 4).map((item) => (
              <StoryCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}