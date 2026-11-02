import Link from "next/link";
import { Compass, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[650px] w-[min(calc(100%-48px),1390px)] flex-col items-center justify-center text-center max-[980px]:w-[min(calc(100%-32px),1390px)] max-[700px]:w-[min(calc(100%-24px),1390px)]">
      <Compass className="mb-5 text-gold" size={52} strokeWidth={1.1} aria-hidden="true" />
      <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-red">404 · Off the map</span>
      <h1 className="my-3 text-[58px] font-normal max-[700px]:text-[42px]">We couldn&apos;t find that page.</h1>
      <p className="text-muted">The story may have moved, or the address may be incomplete.</p>
      <div className="mt-5 flex gap-2.5">
        <Link className="inline-flex min-h-10 items-center justify-center gap-[7px] border border-green bg-green px-[17px] py-[9px] font-sans text-xs font-bold tracking-[.02em] text-cream" href="/">Return home</Link>
        <Link className="inline-flex min-h-10 items-center justify-center gap-[7px] border border-green bg-transparent px-[17px] py-[9px] font-sans text-xs font-bold tracking-[.02em] text-green" href="/search"><Search size={15} /> Search the archive</Link>
      </div>
    </div>
  );
}
