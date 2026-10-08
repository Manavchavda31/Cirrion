import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationLd, websiteLd } from "@/lib/seo";

const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Digital product studio`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  // Search Console / Bing Webmaster ownership tags. Set the env vars; nothing is rendered when empty.
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF8F4",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/** Marks the page as JS-capable so reveal animations never hide content from visitors without JS. */
const bootScript = `document.documentElement.classList.add('js');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
        <Analytics />
        <CookieConsent />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
