"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_KEY } from "@/lib/analytics";

const hasAnalytics = Boolean(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_CLARITY_ID);

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!hasAnalytics) return;
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setShow(true);
    } catch {
      /* storage blocked: stay silent, analytics stays off */
    }
  }, []);

  if (!show) return null;

  const choose = (v: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, v);
    } catch {}
    window.dispatchEvent(new Event("vv-consent"));
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-[520px] rounded-lg border border-line-2 bg-bg p-5 shadow-[var(--shadow-sm)] sm:right-5 sm:bottom-5 sm:left-auto sm:mx-0"
    >
      <p className="text-[0.9375rem] text-fg-2">
        We use privacy-respecting analytics to understand how the site is used. See our{" "}
        <Link href="/cookies" className="link-u">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => choose("granted")} className="btn btn-primary btn-sm">
          Accept
        </button>
        <button type="button" onClick={() => choose("denied")} className="btn btn-ghost btn-sm">
          Decline
        </button>
      </div>
    </div>
  );
}
