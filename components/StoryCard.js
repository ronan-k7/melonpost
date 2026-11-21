import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAuthor, formatDate, articleHref, categoryHref } from "@/lib/content";

export function SectionHeading({ title, href, linkLabel = "View all", className = "" }) {
  return (
    <div className={`flex min-h-[43px] items-center justify-between border-y border-b-line-light border-t-line ${className}`}>
      <h2 className="m-0 text-[15px] font-normal uppercase tracking-[.02em] max-[700px]:text-[13px]">{title}</h2>
      {href ? (
        <Link className="inline-flex items-center gap-[5px] text-[10px] text-muted hover:text-red" href={href}>
          {linkLabel} <ArrowRight aria-hidden="true" size={13} />
        </Link>
      ) : null}
    </div>
  );
}

const variants = {
  standard: "pr-4 border-r border-line-light max-[700px]:border-r-0 max-[700px]:pr-0",
  latest: "pr-3 border-r border-line-light max-[700px]:border-r-0 max-[700px]:pr-0",
  trending: "pr-4 border-r border-line-light max-[700px]:border-r-0 max-[700px]:pr-0",
  feature: "px-4 pb-4 border-r border-line-light max-[700px]:border-r-0 max-[700px]:px-0",
  ribbon: "pt-3 pr-3.5",
};

const titleSizes = {
  standard: "text-xl",
  latest: "text-[17px]",
  trending: "text-[19px]",
  feature: "text-2xl",
  ribbon: "text-[17px]",
};

export function StoryCard({
  article,
  variant = "standard",
  rank,
  showExcerpt = false,
  priority = false,
  className = "",
  imageClassName = "",
  bodyClassName = "",
  titleClassName = "",
  excerptClassName = "",
}) {
  const author = getAuthor(article.authorSlug);
  return (
    <article className={`group min-w-0 ${variants[variant] || variants.standard} ${className}`}>
      <Link
        className={`relative block aspect-[1.65/1] overflow-hidden bg-paper-deep ${variant === "feature" ? "aspect-[1.47/1]" : ""} ${imageClassName}`}
        href={articleHref(article)}
      >
        <Image
          className="transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          src={article.image}
          alt={article.imageAlt || ""}
          fill
          priority={priority}
          sizes={variant === "lead" ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 700px) 50vw, 20vw"}
        />
        {rank ? <span className="absolute left-2.5 top-0.5 z-[1] text-[50px] leading-none text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,.35)]">{rank}</span> : null}
      </Link>
      <div className={`${variant === "ribbon" ? "grid grid-cols-[1fr_auto]" : ""} pt-2.5 ${bodyClassName}`}>
        <Link
          className={`${variant === "ribbon" ? "hidden" : "inline-flex"} items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red`}
          href={categoryHref(article.category)}
        >
          {article.category}
        </Link>
        <h3 className={`my-[5px] mb-[7px] font-normal leading-[1.08] ${titleSizes[variant] || titleSizes.standard} max-[700px]:text-[17px] ${titleClassName}`}>
          <Link className="hover:text-red" href={articleHref(article)}>{article.title}</Link>
        </h3>
        {showExcerpt ? <p className={`mb-2 text-[13px] leading-[1.38] text-muted max-[700px]:hidden ${excerptClassName}`}>{article.excerpt}</p> : null}
        <div className={`flex gap-[7px] text-[9px] text-muted ${variant === "ribbon" ? "self-end pb-2" : ""}`}>
          {variant === "feature" && author ? <span>By {author.name}</span> : null}
          {/* <span>{article.publishedAt}</span> */}
          <span className="text-[9px] text-muted">
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </article>
  );
}

export function CompactStory({ article, image = true, className = "", imageClassName = "" }) {
  return (
    <article className={`group grid min-h-24 grid-cols-[1fr_45%] items-center gap-[13px] border-b border-line-light py-2.5 ${className}`}>
      <div>
        <Link className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red" href={categoryHref(article.category)}>
          {article.category}
        </Link>
        <h3 className="my-1 text-[17px] font-normal leading-[1.05]">
          <Link className="hover:text-red" href={articleHref(article)}>{article.title}</Link>
        </h3>
        {/* <span className="text-[9px] text-muted">{article.publishedAt}</span> */}
        <span className="text-[9px] text-muted">
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      {image ? (
        <Link className={`relative block h-[74px] overflow-hidden ${imageClassName}`} href={articleHref(article)}>
          <Image className="transition-transform duration-500 ease-out group-hover:scale-[1.035]" src={article.image} alt={article.imageAlt || ""} fill sizes="160px" />
        </Link>
      ) : null}
    </article>
  );
}

export function Byline({ authorSlug, date, compact = false }) {
  const author = getAuthor(authorSlug);
  if (!author) return null;
  return (
    <div className="flex items-center gap-3 font-sans text-xs">
      <Link className={`relative block flex-none overflow-hidden rounded-full bg-paper-deep ${compact ? "size-10" : "size-[54px]"}`} href={`/author/${author.slug}`}>
        <Image src={author.image} alt={author.name} fill sizes="64px" />
      </Link>
      <div>
        <span>By </span>
        <Link className="font-bold" href={`/author/${author.slug}`}>{author.name}</Link>
        {date ? <small className="mt-[5px] block text-[10px] text-muted">{formatDate(date)}</small> : null}
      </div>
    </div>
  );
}
