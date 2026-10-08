"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONSENT_KEY } from "@/lib/analytics";

const GA = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID;

/** Loads GA4 + Microsoft Clarity only when configured AND the visitor has accepted. */
export function Analytics() {
  const [ok, setOk] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const read = () => {
      try {
        setOk(localStorage.getItem(CONSENT_KEY) === "granted");
      } catch {
        setOk(false);
      }
    };
    read();
    window.addEventListener("vv-consent", read);
    return () => window.removeEventListener("vv-consent", read);
  }, []);

  useEffect(() => {
    if (ok && GA && window.gtag) window.gtag("config", GA, { page_path: pathname });
  }, [ok, pathname]);

  if (!ok) return null;
  return (
    <>
      {GA && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}',{send_page_view:false});`}</Script>
        </>
      )}
      {CLARITY && (
        <Script id="clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY}");`}</Script>
      )}
    </>
  );
}
