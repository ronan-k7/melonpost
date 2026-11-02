"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { articles, getAuthor, articleHref, categoryHref } from "@/lib/content";
import { navigation, site } from "@/lib/site";

const issueDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date());

export default function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => inputRef.current?.focus(), 30);
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return articles.slice(0, 5);
    return articles.filter((article) => {
      const author = getAuthor(article.authorSlug);
      return [article.title, article.category, article.excerpt, ...(article.tags || []), author?.name]
        .filter(Boolean).join(" ").toLowerCase().includes(needle);
    }).slice(0, 7);
  }, [query]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <>
      <header className="bg-paper/95">
        <div className="mx-auto flex min-h-[42px] w-[min(calc(100%-48px),1390px)] items-center justify-between border-b border-line text-[11px] max-[980px]:hidden">
          <span>{issueDate}</span>
          <nav className="flex items-center gap-4" aria-label="Publication links">
            <Link className="hover:text-red" href="/contact">Contact</Link>
            <Link className="hover:text-red" href="/about">About Us</Link>
            <Link className="inline-flex min-h-7 items-center justify-center border border-green bg-green px-[11px] py-[5px] font-sans text-[10px] font-bold tracking-[.02em] text-cream" href="#newsletter">Subscribe</Link>
          </nav>
        </div>

        <div className="relative mx-auto grid min-h-[104px] w-[min(calc(100%-48px),1390px)] grid-cols-[1fr_auto_1fr] items-center max-[980px]:flex max-[980px]:min-h-[84px] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[980px]:justify-center max-[700px]:min-h-[68px] max-[700px]:w-[min(calc(100%-24px),1390px)]">
          <div className="flex gap-5 max-[980px]:pointer-events-none max-[980px]:absolute max-[980px]:inset-x-0 max-[980px]:top-1/2 max-[980px]:z-[1] max-[980px]:-translate-y-1/2 max-[980px]:justify-between max-[980px]:gap-0 max-[700px]:gap-[3px]">
            <button className="hidden size-9 cursor-pointer items-center justify-center bg-transparent p-0 max-[980px]:pointer-events-auto max-[980px]:inline-flex" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
            <button className="inline-flex size-9 cursor-pointer items-center justify-center bg-transparent p-0 max-[980px]:pointer-events-auto" type="button" aria-label="Open search" onClick={() => setSearchOpen(true)}>
              <Search size={24} />
            </button>
          </div>

          <Link className="flex min-w-[580px] items-center justify-center text-center text-green max-[1200px]:min-w-[500px] max-[980px]:min-w-0" href="/" aria-label={`${site.name} home`}>
            <span className="font-masthead text-[clamp(52px,4.8vw,72px)] font-bold leading-[1.05] tracking-[.005em] max-[980px]:text-[48px] max-[700px]:text-[clamp(34px,10vw,44px)]">{site.name}</span>
          </Link>

          {/* weather widget removed; empty cell keeps the logo centred */}
          <div className="max-[980px]:hidden" aria-hidden="true" />
        </div>

        <nav className="flex min-h-[45px] items-center justify-center gap-[clamp(20px,3.1vw,48px)] border-y border-line max-[1200px]:gap-[21px] max-[980px]:hidden" aria-label="Primary navigation">
          <Link className="inline-flex items-center gap-[3px] text-[11px] uppercase tracking-[.025em] hover:text-red" href="/">Home</Link>
          {navigation.map((item) => <Link className="inline-flex items-center gap-[3px] text-[11px] uppercase tracking-[.025em] hover:text-red" key={item} href={categoryHref(item)}>{item}</Link>)}
        </nav>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Site menu">
          <button className="absolute inset-0 size-full cursor-pointer bg-[#091612]/65 p-0 backdrop-blur" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
          <div className="relative flex size-full flex-col overflow-y-auto bg-paper px-6 pb-[30px] pt-5 shadow-editorial max-[700px]:px-[18px] max-[700px]:pb-6 max-[700px]:pt-4">
            <div className="mb-1.5 flex items-center justify-between border-b border-line pb-[18px]">
              <Link className="flex min-w-0 flex-row items-center gap-2 text-green" href="/" onClick={() => setMenuOpen(false)}>
                <span className="font-masthead text-[30px] font-bold leading-none text-green max-[700px]:text-[26px]">{site.name}</span>
              </Link>
              <button className="inline-flex size-9 items-center justify-center bg-transparent p-0" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={26} /></button>
            </div>
            <nav className="flex flex-col gap-0.5 py-4" aria-label="Primary navigation">
              <Link className="border-b border-line-light px-0.5 py-3.5 font-sans text-[15px] uppercase tracking-[.02em] hover:text-red" href="/" onClick={() => setMenuOpen(false)}>Home</Link>
              {navigation.map((item) => <Link className="border-b border-line-light px-0.5 py-3.5 font-sans text-[15px] uppercase tracking-[.02em] hover:text-red" key={item} href={categoryHref(item)} onClick={() => setMenuOpen(false)}>{item}</Link>)}
            </nav>
            <div className="mt-auto flex flex-col items-start gap-3.5 border-t border-line pt-5 font-sans text-[11px] uppercase tracking-[.05em] text-muted">
              <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
              <Link className="inline-flex min-h-7 items-center justify-center border border-green bg-green px-[11px] py-[5px] text-[10px] font-bold normal-case tracking-[.02em] text-cream" href="#newsletter" onClick={() => setMenuOpen(false)}>Subscribe</Link>
            </div>
          </div>
        </div>
      ) : null}

      {searchOpen ? (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Search stories">
          <button className="absolute inset-0 size-full cursor-pointer bg-[#091612]/65 p-0 backdrop-blur" type="button" onClick={closeSearch} aria-label="Close search" />
          <div className="relative mx-auto my-[30px] max-h-[calc(100vh-60px)] w-[min(720px,calc(100%-32px))] overflow-y-auto bg-paper p-[30px] shadow-editorial max-[700px]:my-3 max-[700px]:p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">Search the archive</span>
              <button className="inline-flex size-9 items-center justify-center bg-transparent p-0" type="button" onClick={closeSearch} aria-label="Close search"><X size={24} /></button>
            </div>
            <form className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border border-green bg-cream px-4" action="/search" onSubmit={closeSearch}>
              <Search size={23} aria-hidden="true" />
              <input className="h-[58px] min-w-0 border-0 bg-transparent text-xl outline-none max-[700px]:h-[50px] max-[700px]:text-[15px]" ref={inputRef} name="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people, places, and topics" autoComplete="off" />
              <kbd className="rounded-[3px] border border-line-light bg-paper-deep px-[7px] py-1 font-sans text-[10px] text-muted max-[700px]:hidden">⌘ K</kbd>
            </form>
            <div>
              <p className="mb-2.5 mt-[22px] font-sans text-[11px] uppercase tracking-[.07em] text-muted">{query ? `${results.length} quick results` : "Latest stories"}</p>
              {results.map((article) => (
                <Link className="grid grid-cols-[90px_1fr] items-center gap-4 border-t border-line-light py-3" key={article.slug} href={articleHref(article)} onClick={closeSearch}>
                  <span className="relative block h-[58px]"><Image src={article.image} alt="" fill sizes="86px" /></span>
                  <span><small className="mb-1 block font-sans text-[9px] uppercase tracking-[.08em] text-red">{article.category}</small><strong className="block text-[17px] font-normal leading-[1.15]">{article.title}</strong></span>
                </Link>
              ))}
              {query && results.length === 0 ? <div className="py-7 text-muted">No quick matches. Try a broader phrase.</div> : null}
            </div>
            <Link className="block border-t border-ink pt-4 font-sans text-xs font-bold uppercase text-red" href={`/search?q=${encodeURIComponent(query)}`} onClick={closeSearch}>View all search results →</Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
