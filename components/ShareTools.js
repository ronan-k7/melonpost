"use client";

import { useState } from "react";
import { Check, Copy, Mail, Share2 } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function ShareTools({ title, url, vertical = false }) {
  const [copied, setCopied] = useState(false);

  function openShare(target) {
    window.open(target, "share", "width=680,height=520,noopener,noreferrer");
  }

  async function writeClipboard(value) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      const input = document.createElement("textarea");
      input.value = value;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
  }

  async function nativeShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await writeClipboard(url);
    } catch {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function copyLink() {
    await writeClipboard(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className={`relative flex items-center gap-2 ${vertical ? "flex-col max-[700px]:flex-row max-[700px]:flex-wrap" : ""}`}>
      {/* <span className={`font-sans text-[9px] font-bold uppercase tracking-[.12em] text-muted ${vertical ? "mb-1.5 [writing-mode:vertical-rl] rotate-180 max-[700px]:mb-0 max-[700px]:mr-1 max-[700px]:rotate-0 max-[700px]:[writing-mode:initial]" : ""}`}>Share</span> */}
      {!vertical && (
          <span className="font-sans text-[9px] font-bold uppercase tracking-[.12em] text-muted">
            Share
          </span>
        )}
      <button className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-paper transition hover:border-green hover:bg-green hover:text-white" type="button" onClick={nativeShare} aria-label="Share this article">
        <Share2 size={17} aria-hidden="true" />
      </button>
      <button className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-paper transition hover:border-green hover:bg-green hover:text-white"
        type="button"
        onClick={() => openShare(`https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`)}
        aria-label="Share on X"
      >
        <FaXTwitter aria-hidden="true" />
      </button>
      <button className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-paper transition hover:border-green hover:bg-green hover:text-white"
        type="button"
        onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)}
        aria-label="Share on Facebook"
      >
        <FaFacebookF aria-hidden="true" />
      </button>
      <button className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-paper transition hover:border-green hover:bg-green hover:text-white"
        type="button"
        onClick={() => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)}
        aria-label="Share on LinkedIn"
      >
        <FaLinkedinIn aria-hidden="true" />
      </button>
      <a
        className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-paper transition hover:border-green hover:bg-green hover:text-white"
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        aria-label="Share by email"
      >
        <Mail size={17} aria-hidden="true" />
      </a>
      <button className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-paper transition hover:border-green hover:bg-green hover:text-white" type="button" onClick={copyLink} aria-label="Copy article link">
        {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
      </button>
      {copied ? <span className="absolute left-full ml-2 rounded bg-green px-2 py-1 font-sans text-[9px] text-white max-[700px]:left-auto max-[700px]:right-0">Copied</span> : null}
    </div>
  );
}
