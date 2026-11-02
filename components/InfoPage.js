import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { infoPages, resourceLinks } from "@/lib/pages";
import { formatDate } from "@/lib/content";
import { site } from "@/lib/site";

const wrap =
  "mx-auto w-[min(calc(100%-48px),1390px)] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[700px]:w-[min(calc(100%-24px),1390px)]";

const linkClass = "text-green underline decoration-gold underline-offset-[3px] hover:text-red";

// Renders text with inline [[href|label]] links.
function Inline({ text }) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[\[([^|\]]+)\|([^\]]+)\]\]$/);
    if (!match) return part;
    const [, href, label] = match;
    return href.startsWith("/") ? (
      <Link className={linkClass} key={index} href={href}>{label}</Link>
    ) : (
      <a className={linkClass} key={index} href={href}>{label}</a>
    );
  });
}

export function PageHeader({ eyebrow, title, intro, updated }) {
  return (
    <section className="border-b border-line bg-paper-deep">
      <div className={`${wrap} py-[70px] max-[700px]:py-[42px]`}>
        <nav className="mb-6 font-sans text-[10px] uppercase tracking-[.08em] text-muted" aria-label="Breadcrumb">
          <Link className="hover:text-red" href="/">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span>{title}</span>
        </nav>
        <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">{eyebrow}</span>
        <h1 className="mb-5 mt-[14px] max-w-[900px] text-[clamp(40px,4.6vw,66px)] font-normal leading-[1.02] tracking-[-.03em]">{title}</h1>
        {intro ? <p className="max-w-[720px] text-xl leading-[1.45] text-muted max-[700px]:text-[17px]">{intro}</p> : null}
        {updated ? <p className="mt-6 font-sans text-[10px] uppercase tracking-[.08em] text-muted">Last updated {formatDate(updated)}</p> : null}
      </div>
    </section>
  );
}

function Block({ block }) {
  if (typeof block === "string") {
    return <p className="mb-4 text-[17px] leading-[1.75] text-[#343b36] max-[700px]:text-base"><Inline text={block} /></p>;
  }
  if (block.list) {
    return (
      <ul className="mb-5 list-disc space-y-2 pl-6 text-[17px] leading-[1.65] text-[#343b36] marker:text-gold max-[700px]:text-base">
        {block.list.map((item) => <li key={item}><Inline text={item} /></li>)}
      </ul>
    );
  }
  if (block.mail) {
    return (
      <div className="mb-4 divide-y divide-line-light border-y border-line-light">
        {block.mail.map((item) => (
          <div className="grid grid-cols-[1fr_auto] items-center gap-6 py-5 max-[700px]:grid-cols-1 max-[700px]:gap-3" key={item.label}>
            <div>
              <strong className="block text-xl font-normal">{item.label}</strong>
              <p className="mt-1.5 text-[15px] leading-[1.55] text-muted"><Inline text={item.text} /></p>
            </div>
            <a
              className="inline-flex items-center gap-2 border border-green px-4 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[.04em] text-green hover:bg-green hover:text-white"
              href={`mailto:${site.email}?subject=${encodeURIComponent(item.subject)}`}
            >
              <Mail size={15} aria-hidden="true" /> {site.email}
            </a>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function ResourceNav({ current }) {
  return (
    <nav aria-label="More from Melonpost">
      <h2 className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[.09em] text-red">More about {site.name}</h2>
      <ul className="border-t border-line-light">
        {resourceLinks.map((link) => (
          <li key={link.href}>
            <Link
              className={`flex items-center justify-between border-b border-line-light py-2.5 text-[15px] hover:text-red ${link.href === current ? "text-red" : ""}`}
              href={link.href}
              aria-current={link.href === current ? "page" : undefined}
            >
              {link.label}
              {link.href === current ? null : <ArrowRight size={13} aria-hidden="true" />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function InfoPage({ slug }) {
  const page = infoPages[slug];
  return (
    <div>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} updated={page.updated} />
      <div className={`${wrap} grid grid-cols-[280px_minmax(0,1fr)] items-start gap-[72px] pb-[100px] pt-[60px] max-[980px]:grid-cols-1 max-[980px]:gap-10 max-[700px]:pt-9`}>
        <aside className="sticky top-6 flex flex-col gap-10 max-[980px]:static max-[980px]:order-2">
          {page.sections.length > 2 ? (
            <nav aria-label="On this page" className="max-[980px]:hidden">
              <h2 className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[.09em] text-red">On this page</h2>
              <ol className="border-t border-line-light">
                {page.sections.map((section, index) => (
                  <li key={section.id}>
                    <a className="flex gap-3 border-b border-line-light py-2.5 text-[14px] leading-[1.3] hover:text-red" href={`#${section.id}`}>
                      <span className="w-5 flex-none text-gold">{String(index + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <ResourceNav current={`/${slug}`} />
        </aside>
        <article className="max-w-[780px] max-[980px]:order-1">
          {page.sections.map((section) => (
            <section className="mb-10 scroll-mt-6" id={section.id} key={section.id}>
              <h2 className="mb-4 border-t border-line pt-5 text-[29px] font-normal leading-[1.12] max-[700px]:text-[24px]">{section.title}</h2>
              {section.body.map((block, index) => <Block block={block} key={index} />)}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
