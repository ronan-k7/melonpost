import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck2, Scale, SearchCheck } from "lucide-react";
import { authors } from "@/lib/content";
import { categoryHref } from "@/lib/content";
import { navigation, site, pageSocialMetadata } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

export const metadata = {
  title: "About us",
  description: `About ${site.name}: who we are, what we cover and the editorial standards behind our reporting.`,
    ...pageSocialMetadata("About us", `About ${site.name}: who we are, what we cover and the editorial standards behind our reporting.`, "/about"),
};

const wrap =
  "mx-auto w-[min(calc(100%-48px),1390px)] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[700px]:w-[min(calc(100%-24px),1390px)]";

const principles = [
  {
    icon: SearchCheck,
    title: "Verified before published",
    text: "We check claims against primary sources and tell you when something cannot be confirmed.",
    href: "/source-methodology",
  },
  {
    icon: Scale,
    title: "Editorially independent",
    text: "Our editors make editorial decisions. Advertisers and partners do not influence our coverage.",
    href: "/editorial-policy",
  },
  {
    icon: CheckCircle2,
    title: "Corrected in the open",
    text: "When we get something wrong, we correct it promptly and say what changed.",
    href: "/corrections-policy",
  },
  {
    icon: FileCheck2,
    title: "Clearly labelled",
    text: "News, analysis, opinion and advertising are kept separate so you know what you are reading.",
    href: "/advertising-policy",
  },
];

export default function AboutPage() {
  return (
    <div>
      <JsonLd data={webPageJsonLd({ type: "AboutPage", name: "About us", description: `About ${site.name}: who we are, what we cover and the editorial standards behind our reporting.`, path: "/about" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About us", path: "/about" }])} />
      <section className={`${wrap} grid grid-cols-[1.15fr_.85fr] gap-[70px] border-b border-line py-[80px] max-[980px]:grid-cols-1 max-[980px]:gap-12 max-[980px]:py-[50px] max-[700px]:py-[35px]`}>
        <div className="flex flex-col items-start justify-center">
          <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">About {site.name}</span>
          <h1 className="mb-6 mt-[18px] max-w-[760px] text-[clamp(44px,5vw,76px)] font-normal leading-[.98] tracking-[-.04em] max-[700px]:text-[42px]">
            Independent reporting for readers who want the full picture.
          </h1>
          <p className="max-w-[620px] text-xl leading-[1.45] text-muted max-[700px]:text-[17px]">
            {site.name} is an online news publication covering the stories that shape
            the world, from politics and business to technology, health and in-depth
            investigations, with a focus on accuracy, clear explanation and context.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link className="inline-flex items-center gap-2 border border-green bg-green px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[.04em] text-cream hover:bg-green-2" href="/editorial-policy">
              Our editorial policy <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link className="inline-flex items-center gap-2 border border-green px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[.04em] text-green hover:bg-green hover:text-cream" href="/contact">
              Contact the newsroom
            </Link>
          </div>
        </div>

        <aside className="self-center border border-line bg-cream p-8 max-[700px]:p-5" aria-label="What we cover">
          <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">What we cover</span>
          <ul className="mt-4 border-t border-line-light">
            {navigation.map((item) => (
              <li key={item}>
                <Link className="flex items-center justify-between border-b border-line-light py-3 text-[19px] hover:text-red" href={categoryHref(item)}>
                  {item}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className={`${wrap} grid grid-cols-[.55fr_1.45fr] gap-[60px] px-[8%] py-[90px] max-[700px]:block max-[700px]:px-1 max-[700px]:py-[60px]`}>
        <div>
          <span className="block text-[64px] leading-none text-gold max-[700px]:text-[45px]">01</span>
          <h2 className="mt-[13px] text-[34px] font-normal">Our purpose</h2>
        </div>
        <div className="columns-2 gap-[52px] max-[700px]:mt-[30px] max-[700px]:columns-1">
          <p className="text-[17px] leading-[1.7] text-[#343b36] first-letter:float-left first-letter:mb-0 first-letter:mr-2 first-letter:mt-[5px] first-letter:text-[66px] first-letter:leading-[.72] first-letter:text-green">
            {site.name} reports across borders and disciplines because the most
            important stories rarely stay inside a single beat. A decision about energy
            prices becomes a business story; a new technology becomes a question of law
            and public policy; a local election can reshape an international alliance.
          </p>
          <p className="text-[17px] leading-[1.7] text-[#343b36]">
            Our aim is simple: report what happened, explain why it matters, and be
            clear about what is still unknown. We link to documents and sources where
            we can, keep news separate from analysis and opinion, and correct mistakes
            openly.
          </p>
        </div>
      </section>

      <section className="bg-green pb-[85px] pt-[78px] text-white" id="standards">
        <div className={wrap}>
          <div className="mb-11 grid grid-cols-[90px_1fr] items-end gap-5 max-[700px]:grid-cols-[60px_1fr]">
            <span className="block text-[64px] leading-none text-gold max-[700px]:text-[45px]">02</span>
            <div>
              <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-gold">Our standards</span>
              <h2 className="mt-[13px] text-[34px] font-normal text-white">Four promises to every reader</h2>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-7 max-[980px]:grid-cols-2 max-[700px]:grid-cols-1 max-[700px]:gap-5">
            {principles.map(({ icon: Icon, title, text, href }) => (
              <article className="flex flex-col border-t-4 border-gold bg-paper px-7 py-[30px] text-green max-[700px]:px-[18px] max-[700px]:py-[22px]" key={title}>
                <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
                <h3 className="mb-3 mt-[34px] text-[23px] font-normal max-[700px]:mt-[25px] max-[700px]:text-xl">{title}</h3>
                <p className="m-0 mb-5 text-[13px] leading-[1.55] text-muted">{text}</p>
                <Link className="mt-auto inline-flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[.06em] text-red" href={href}>
                  Read more <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${wrap} pb-[95px] pt-[85px]`} id="newsroom">
        <div className="mb-11 grid grid-cols-[90px_1fr_auto] items-end gap-5 max-[700px]:grid-cols-[60px_1fr]">
          <span className="block text-[64px] leading-none text-gold max-[700px]:text-[45px]">03</span>
          <div>
            <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">The newsroom</span>
            <h2 className="mt-[13px] text-[34px] font-normal">Editors and writers with distinct beats and a shared standard</h2>
          </div>
          <Link className="inline-flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[.06em] text-red max-[700px]:hidden" href="/authors">
            All authors <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-6 gap-[18px] max-[980px]:grid-cols-3 max-[700px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-5">
          {authors.map((author) => (
            <Link key={author.slug} href={`/author/${author.slug}`}>
              <span className="relative block aspect-[.88/1] overflow-hidden bg-paper-deep [filter:saturate(.78)]">
                <Image src={author.image} alt={author.name} fill sizes="(max-width: 700px) 50vw, 16vw" />
              </span>
              <span className="block pt-[11px]">
                <strong className="block text-[17px] font-normal">{author.name}</strong>
                <small className="mt-[5px] block font-sans text-[9px] uppercase text-red">{author.role}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper-deep py-[55px]">
        <div className={`${wrap} flex items-center justify-between gap-8 max-[700px]:flex-col max-[700px]:items-start`}>
          <div>
            <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">Get in touch</span>
            <h2 className="mb-2 mt-2.5 text-[32px] font-normal leading-[1.1]">Have a story tip, a correction or feedback?</h2>
            <p className="m-0 max-w-[620px] text-[15px] leading-[1.55] text-muted">
              Write to the newsroom at <a className="text-green underline decoration-gold underline-offset-[3px] hover:text-red" href={`mailto:${site.email}`}>{site.email}</a> and
              we will make sure it reaches the right editor.
            </p>
          </div>
          <Link className="inline-flex flex-none items-center gap-2 border border-green bg-green px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[.04em] text-cream hover:bg-green-2" href="/contact">
            Contact us <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
