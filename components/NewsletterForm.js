"use client";

import { useId, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterForm({ actionUrl = "", compact = false }) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function subscribe(event) {
    event.preventDefault();
    if (!email) return;
    if (actionUrl) {
      const separator = actionUrl.includes("?") ? "&" : "?";
      window.open(
        `${actionUrl}${separator}email=${encodeURIComponent(email)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
    setSent(true);
  }

  if (sent) {
    return (
      <p className="mt-3.5 flex min-h-[42px] items-center gap-[7px] font-sans text-xs text-gold-light" role="status">
        <Check size={16} aria-hidden="true" /> You&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      className={`mt-3.5 grid ${compact ? "grid-cols-1" : "grid-cols-[1fr_auto]"}`}
      onSubmit={subscribe}
    >
      <label className="sr-only" htmlFor={inputId}>
        Email address
      </label>
      <input
        className={`h-[42px] min-w-0 border border-gold-light px-3.5 outline-none focus:border-gold ${compact ? "border-r" : "border-r-0"}`}
        id={inputId}
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        required
      />
      <button className={`inline-flex cursor-pointer items-center gap-1.5 border border-gold-light bg-gold-light px-3.5 text-[11px] font-bold text-green ${compact ? "min-h-10 justify-center" : ""}`} type="submit">
        Subscribe <ArrowRight size={14} aria-hidden="true" />
      </button>
    </form>
  );
}
