# Cirrion website

Next.js 16 · TypeScript (strict) · Tailwind CSS 4 · MDX

## Run
```
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL, optional GA / Clarity IDs, LEAD_WEBHOOK_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Where things live
- `src/content/*`  all copy and data (services, projects, industries, team, articles). Swap for a headless CMS later; pages only depend on the types in `content/types.ts`.
- `src/content/site.ts`  company facts, proof points (only `verified: true` entries render), nav.
- `src/app/api/lead/route.ts`  lead endpoint. Leads are logged, and can be forwarded to any CRM via `LEAD_WEBHOOK_URL`, or stored with `LEAD_STORE=file`.
- `src/app/globals.css`  the whole design system: tokens, type scale, buttons, cards, motion.

## Design system
- **Palette:** Deep Navy `#0B1622` (text, footer, dark sections), Warm Off-White `#FBF8F4` (page background), Pure White `#FFFFFF` (cards, clean bands), Cirrion Orange `#F97316` (primary buttons and key highlights only), Soft Blue `#3E78B8` (secondary). Supporting neutrals: Slate `#5F6972` (secondary text), Light Gray `#E5E7EB` (borders), Warm Gray `#EDE6DF` (background shapes). Link and eyebrow text uses a slightly deeper blue (`--color-accent`, `#2E6AA6`) so it passes AA contrast on warm white; raw `#3E78B8` is for graphics. Primary buttons are orange with navy text (white on orange fails AA). Tokens live in the `@theme` block of `globals.css`.
- **Type:** Inter only, self-hosted (`@fontsource-variable/inter`, loaded in `app/layout.tsx`). Headings 700, hero 800, tight tracking.
- **Brand assets:** `public/brand/{mark,word}[-light].png` (logo; `-light` for navy backgrounds), `public/hero/world.svg` (dotted world map used by the hero and the closing call-to-action panel; generated from Natural Earth land data) and `components/home/HeroVisual.tsx` (hero artwork: map, route arcs, glass tiles), `public/hero/product.jpg` (product image, currently unused), `public/industries/<slug>.jpg` (industry photo cards and industry page headers), `public/services/<slug>.jpg` (service cards and service page headers, 4:3), `public/process/<stage>.jpg` (the six process stages, 4:3; stage title lowercased = file name), `app/icon.png`, `app/apple-icon.png`. Social images are generated in `app/opengraph-image.tsx` and `app/og/[kind]/[slug]/route.tsx` from `lib/og-assets.ts`.
- **Shape and depth:** 4 / 6 / 8 px radii. One shadow token (`--shadow-sm`), used only on card hover and dropdown menus.
- **Motion:** simple and optional. Content fades up 12px once as it scrolls into view (`.reveal`, one IntersectionObserver in `ScrollReveal`), the hero lines stagger in, pages fade in, cards lift 2px, photos zoom 3%, buttons and links change colour in 150-200ms, arrows nudge 3px. All of it is switched off under `prefers-reduced-motion`, and content is fully visible without JavaScript.
- **Navy sections:** wrap content in `.theme-navy` and the same components (`eyebrow`, `lead`, `link-u`) recolour themselves. Used by the closing CTA band and the About mission statement.
- **Photo allocation (no repeats on a page):** the home page shows four featured services (mobile, web, SaaS, AI) and four featured industries (healthcare, fintech, real estate, hospitality), each followed by an "All services" / "All industries" button, so no scene appears twice there. The six process photos on home and `/process` are scenes not used by the service or industry cards on the same page. Service and industry detail pages use one header photo and a text-only process (`<ProcessCompact photos={false} />`). To change the featured set edit the `only` prop in `app/page.tsx`. All photos are crops of the supplied generated posters, so some reuse across different pages is unavoidable until more pictures are added: drop 4:3 files into `public/services`, `public/process` or `public/industries` using the same file names.
- Industry cards use the generated photos. Project cards are text-only. A screenshot appears only when a real file exists; there are no placeholder drawings.

## Real screenshots and photos
- Projects (`content/projects.ts`) are real. Add real screenshots by putting `cover.png` and `shot-1.png` ... in `public/projects/<slug>/` (see the README there). They are picked up automatically: the cover shows on the card and case study, the rest in a gallery.
- Team photos: `public/team/<member-slug>.jpg` (for example `founder.jpg`).

## Replace before launch
- Team (`content/team.ts`): the founder is real; the other three are placeholders. Add real people, photos, LinkedIn.
- Testimonials (`content/team.ts`): empty, so the section stays hidden until real quotes exist.
- Metrics on case studies: add to `metrics` only with numbers the client has approved.
- Email, domain, social links, legal entity in `content/site.ts`; legal pages are drafts for counsel review. Check trademark and domain availability for "Cirrion" before launch.

## Make the enquiry form live (Vercel or any host)
Set these environment variables (names in `.env.example`): `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` (a domain you have verified in Resend), optionally `LEAD_AUTOREPLY=1`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` for spam protection, `NEXT_PUBLIC_BOOKING_URL` for a Cal.com / Calendly "Book a call" link, and `NEXT_PUBLIC_CONTACT_EMAIL`. In production the form will not claim "sent" unless at least one of email, webhook or file storage accepted the lead. Analytics (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`) only load after the visitor accepts the cookie banner.

## SEO launch checklist
Built in: unique title and description per page, canonical URLs, Open Graph/Twitter cards with a generated share image, JSON-LD (Organization, WebSite with site name, breadcrumbs, services, articles), `sitemap.xml`, `robots.txt` (search and AI-search bots allowed, `/api/` blocked), SVG favicon plus Apple touch icon, HSTS and security headers, GA4/Clarity behind cookie consent, a `redirects()` slot in `next.config.ts`. Nothing carries `noindex` except a project flagged `sample: true`.

You do after deploying (these need your accounts and a live domain):
1. Deploy on HTTPS (Vercel, Netlify or similar issue the certificate) and set `NEXT_PUBLIC_SITE_URL` to the real domain.
2. Google Search Console: add the property, put the token in `NEXT_PUBLIC_GSC_VERIFICATION`, submit `/sitemap.xml`, then request indexing for the home page and key pages.
3. Bing Webmaster Tools: same, with `NEXT_PUBLIC_BING_VERIFICATION` (or import from Search Console).
4. Google Analytics: create a GA4 property and set `NEXT_PUBLIC_GA_ID`.
5. Google Business Profile: create it in Google's own UI; it cannot be done from code.
6. Run PageSpeed Insights on the live URL and check on a real phone.
7. Old URLs: if a previous site existed on this domain, add its URLs to `redirects()` in `next.config.ts`.
