import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Privacy Policy", description: "How Cirrion collects, uses and protects personal information.", path: "/privacy" });

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated="September 2026"
      intro={`This policy explains what personal information ${site.name} collects through this website, why, and the choices you have.`}
      sections={[
        { h: "What we collect", p: ["Information you send us through the contact form: your name, company, email, phone number, country, project details, budget and timeline.", "With your consent only, anonymous usage data through analytics tools (page views, device type, country and referring source)."] },
        { h: "How we use it", p: ["To reply to your enquiry, prepare a proposal and manage our relationship with you. We do not sell personal information and we do not use enquiries for unrelated marketing without your agreement."] },
        { h: "Who sees it", p: ["Our team and the service providers that host the website, deliver email and store enquiries on our behalf. Providers may only use your data to provide their service to us."] },
        { h: "Retention", p: ["We keep enquiries for as long as needed to respond and to maintain a reasonable business record, then delete or anonymise them."] },
        { h: "Your rights", p: [`Depending on where you live you may have the right to access, correct, delete or export your personal information, and to object to or restrict certain processing. Email ${site.email} and we will respond promptly.`] },
        { h: "Contact", p: [`Questions about this policy: ${site.email}.`] },
      ]}
    />
  );
}
