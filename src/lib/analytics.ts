/**
 * Thin analytics facade. Call track() anywhere; it forwards to GA4 and Clarity when loaded.
 * Nothing loads until the visitor consents (see components/layout/Analytics).
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
    window.clarity?.("event", event);
  } catch {
    /* analytics must never break the site */
  }
}

export const CONSENT_KEY = "vv-consent";
