import { Search } from "lucide-react";
import { articles, searchArticles } from "@/lib/content";
import { site, pageSocialMetadata } from "@/lib/site";
import { StoryCard } from "@/components/StoryCard";

export const metadata = {
  title: "Search",
  description: `Search reporting and analysis from ${site.name}.`,
    ...pageSocialMetadata("Search", `Search reporting and analysis from ${site.name}.`, "/search"),
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q.trim() : "";
  const results = query ? searchArticles(query) : articles;

  return (
    <div className="mx-auto min-h-[800px] w-[min(calc(100%-48px),1390px)] pb-[100px] pt-[70px] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[700px]:w-[min(calc(100%-24px),1390px)] max-[700px]:pt-[45px]">
      <header className="max-w-[900px] pb-10">
        <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">The archive</span>
        <h1 className="mb-7 mt-2.5 text-[clamp(46px,6vw,76px)] font-normal leading-none tracking-[-.04em] max-[700px]:text-[47px]">{query ? `Search results for “${query}”` : "Search every story"}</h1>
        <form action="/search" className="grid max-w-[760px] grid-cols-[auto_1fr_auto] items-center border border-green">
          <Search className="ml-4" size={22} aria-hidden="true" />
          <input className="h-14 min-w-0 border-0 bg-transparent px-[13px] text-lg outline-none" name="q" defaultValue={query} placeholder="Try climate, markets, investigations…" autoFocus />
          <button className="h-14 cursor-pointer bg-green px-6 font-sans text-[11px] font-bold uppercase text-white" type="submit">Search</button>
        </form>
        <p className="mt-[15px] font-sans text-[10px] uppercase text-muted">{results.length} {results.length === 1 ? "story" : "stories"}</p>
      </header>
      {results.length ? (
        <div className="grid grid-cols-4 gap-x-[22px] gap-y-[34px] max-[980px]:grid-cols-2 max-[700px]:gap-x-3 max-[700px]:gap-y-5">
          {results.map((article) => (
            <StoryCard key={article.slug} article={article} showExcerpt titleClassName="text-2xl max-[700px]:text-[17px]" />
          ))}
        </div>
      ) : (
        <div className="border-t border-line py-[70px]">
          <h2 className="text-[34px] font-normal">No stories matched that phrase.</h2>
          <p>Try a shorter topic, a category, or an author&apos;s name.</p>
        </div>
      )}
    </div>
  );
}
