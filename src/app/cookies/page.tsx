import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Cookie Policy", description: "How Cirrion uses cookies and similar technologies.", path: "/cookies" });

export default function Cookies() {
  return (
    <LegalPage
      title="Cookie Policy"
      path="/cookies"
      updated="September 2026"
      intro={`This page explains the cookies and similar storage used on the ${site.name} website and how to control them.`}
      sections={[
        { h: "Essential storage", p: ["We store a small flag in your browser session so the brand introduction only plays once per visit, and a record of your cookie choice. These do not identify you."] },
        { h: "Analytics (only with consent)", p: ["If enabled, Google Analytics 4 and Microsoft Clarity measure how the site is used so we can improve it. They load only after you accept. If you decline, they never load."] },
        { h: "Changing your mind", p: ["Clear this site's data in your browser settings to reset your choice. You will be asked again on your next visit."] },
        { h: "Contact", p: [`Questions: ${site.email}.`] },
      ]}
    />
  );
}
