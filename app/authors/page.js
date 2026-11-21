import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { authors } from "@/lib/content";
import { PageHeader, ResourceNav } from "@/components/InfoPage";
import { site, pageSocialMetadata } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

const DESCRIPTION = `Meet the editors, correspondents and writers behind ${site.name}\u2019s independent reporting on world affairs, politics, business, technology and health.`;

export const metadata = {
  title: "Authors",
  description: DESCRIPTION,
    ...pageSocialMetadata("Authors", DESCRIPTION, "/authors"),
};

export default function AuthorsPage() {
  return (
    <div>
      <JsonLd data={webPageJsonLd({ type: "CollectionPage", name: "Authors", description: DESCRIPTION, path: "/authors" })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Authors", path: "/authors" }])} />
      <PageHeader
        eyebrow="The newsroom"
        title="Authors"
        intro={`The editors and writers behind ${site.name}. Select a name to read their profile and latest work.`}
      />
      <div className="mx-auto grid w-[min(calc(100%-48px),1390px)] grid-cols-[280px_minmax(0,1fr)] items-start gap-[72px] pb-[100px] pt-[60px] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[980px]:grid-cols-1 max-[980px]:gap-10 max-[700px]:w-[min(calc(100%-24px),1390px)] max-[700px]:pt-9">
        <aside className="sticky top-6 max-[980px]:static max-[980px]:order-2">
          <ResourceNav current="/authors" />
        </aside>
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 max-[1200px]:grid-cols-1 max-[980px]:order-1">
          {authors.map((author) => {
            return (
              <article className="grid grid-cols-[130px_1fr] gap-6 border-t border-line pt-6 max-[700px]:grid-cols-[90px_1fr] max-[700px]:gap-4" key={author.slug}>
                <Link className="relative block aspect-[.88/1] overflow-hidden bg-paper-deep [filter:saturate(.8)]" href={`/author/${author.slug}`}>
                  <Image src={author.image} alt={author.imageAlt || author.name} fill sizes="130px" />
                </Link>
                <div>
                  <span className="font-sans text-[9px] font-bold uppercase tracking-[.09em] text-red">{author.role}</span>
                  <h2 className="mb-1 mt-1.5 text-[26px] font-normal leading-[1.1]">
                    <Link className="hover:text-red" href={`/author/${author.slug}`}>{author.name}</Link>
                  </h2>
                  <p className="mb-2 flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[.06em] text-muted">
                    <MapPin size={12} aria-hidden="true" /> {author.location}
                  </p>
                  <p className="text-[14px] leading-[1.55] text-muted">{author.bio}</p>
                  <Link className="mt-3 inline-flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[.06em] text-red" href={`/author/${author.slug}`}>
                    View profile <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
