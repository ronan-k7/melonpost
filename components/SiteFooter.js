import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { BookOpen } from "lucide-react";
import NewsletterForm from "./NewsletterForm";
import CopyrightYear from "./CopyrightYear";
import { navigation, site } from "@/lib/site";
import { categoryHref } from "@/lib/content";
import { resourceLinks } from "@/lib/pages";

const socialLinks = [
  ["X", site.socials.x, FaXTwitter],
  ["Facebook", site.socials.facebook, FaFacebookF],
  ["Instagram", site.socials.instagram, FaInstagram],
  ["YouTube", site.socials.youtube, FaYoutube],
  ["LinkedIn", site.socials.linkedin, FaLinkedinIn],
];

export default function SiteFooter() {
  return (
    <footer className="mt-0 bg-green text-[#f6f1e6]" id="newsletter">
      <div className="mx-auto grid min-h-[270px] w-[min(calc(100%-48px),1390px)] grid-cols-[1.35fr_.65fr_.75fr_1.55fr_1fr] gap-[30px] py-[35px] pb-7 max-[1200px]:grid-cols-[1.2fr_.7fr_.8fr_1.4fr] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[980px]:grid-cols-[1.2fr_.8fr_1.4fr] max-[700px]:w-[min(calc(100%-24px),1390px)] max-[700px]:grid-cols-1">
        <div className="border-r border-gold-light/20 pr-6 max-[700px]:border-b max-[700px]:border-r-0 max-[700px]:pb-5 max-[700px]:pr-0">
          <span className="block font-masthead text-[44px] font-bold leading-none text-white">{site.name}</span>
          <p className="my-[17px] max-w-[230px] text-[11px] leading-[1.45] text-[#d5d8cf]">
            {site.name} is an independent global newsroom pursuing facts, depth,
            context, and integrity.
          </p>
          <div className="flex gap-[7px]" aria-label="Social media">
            {socialLinks.map(([label, href, Icon]) => (
              <a className="inline-flex size-[30px] items-center justify-center rounded-full border border-current text-xs" key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-1.5 border-r border-gold-light/20 pr-6 max-[700px]:hidden">
          <h2 className="mb-[7px] text-sm font-normal uppercase tracking-[.08em] text-gold-light">Sections</h2>
          {navigation.slice(0, 8).map((item) => (
            <Link className="text-[10px] text-[#d5d8cf] hover:text-white" key={item} href={categoryHref(item)}>
              {item}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-start gap-1.5 border-r border-gold-light/20 pr-6 max-[700px]:border-b max-[700px]:border-r-0 max-[700px]:pb-5 max-[700px]:pr-0">
          <h2 className="mb-[7px] text-sm font-normal uppercase tracking-[.08em] text-gold-light">Resources</h2>
          {resourceLinks.map((link) => (
            <Link className="text-[10px] text-[#d5d8cf] hover:text-white" key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="border-r border-gold-light/20 pr-6 max-[980px]:col-span-full max-[980px]:border-r-0 max-[980px]:border-t max-[980px]:pr-0 max-[980px]:pt-5 max-[700px]:border-b max-[700px]:border-t-0 max-[700px]:pb-5 max-[700px]:pt-0">
          <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase leading-[1.2] tracking-[.09em] text-gold">Stay informed</span>
          <h2 className="mb-[7px] mt-[9px] max-w-[300px] text-[17px] font-normal leading-tight text-white">Get the stories that matter, delivered to your inbox.</h2>
          <NewsletterForm actionUrl={site.newsletterUrl} />
          <small className="mt-2 block text-[8px] text-[#aebdb4]">No spam. Unsubscribe at any time.</small>
        </div>

        <div className="flex items-center gap-[15px] max-[1200px]:hidden">
          <div className="flex h-[95px] w-[75px] flex-none rotate-[4deg] items-center justify-center border-[3px] border-double border-gold bg-paper-deep text-green" aria-hidden="true">
            <BookOpen size={45} strokeWidth={1.2} />
          </div>
          <div>
            <span className="text-xs uppercase text-gold-light">Today&apos;s paper</span>
            <p className="my-[7px] text-[10px] leading-[1.3] text-[#d5d8cf]">Read today&apos;s edition of {site.name}.</p>
            <Link className="text-[10px]" href="/">Read now →</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex min-h-[43px] w-[min(calc(100%-48px),1390px)] items-center justify-between border-t border-gold-light/25 text-[9px] text-[#aebdb4] max-[980px]:w-[min(calc(100%-32px),1390px)] max-[700px]:w-[min(calc(100%-24px),1390px)] max-[700px]:flex-col max-[700px]:gap-2 max-[700px]:py-3">
        <span className="flex items-center gap-[5px]">© <CopyrightYear initial={new Date().getFullYear()} /> {site.name}. All rights reserved.</span>
      </div>
    </footer>
  );
}
