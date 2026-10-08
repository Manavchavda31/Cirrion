import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Terms of Use", description: "The terms that apply when you use the Cirrion website.", path: "/terms" });

export default function Terms() {
  return (
    <LegalPage
      title="Terms"
      path="/terms"
      updated="September 2026"
      intro={`These terms govern your use of the ${site.name} website. Client engagements are covered by a separate written agreement.`}
      sections={[
        { h: "Use of the site", p: ["You may browse and share this website for lawful purposes. Please do not attempt to disrupt it, probe it for vulnerabilities without permission, or submit unlawful or misleading content."] },
        { h: "Content", p: [`Unless stated otherwise, the text, design and code of this website belong to ${site.name}. Sample projects are illustrative and do not represent real client work.`] },
        { h: "No advice or guarantee", p: ["Information on this website is general in nature. Nothing here is a quotation, contract or guarantee of results. Any engagement begins only when both parties sign a written agreement."] },
        { h: "Third-party links", p: ["We link to other sites for convenience and are not responsible for their content or practices."] },
        { h: "Liability", p: ["To the extent permitted by law, we are not liable for losses arising from your use of this website."] },
        { h: "Contact", p: [`Questions about these terms: ${site.email}.`] },
      ]}
    />
  );
}
