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
Light first, premium and product-focused. Everything lives in `src/app/globals.css` (tokens in the `@theme` block) and a few shared components.

- **Palette:** off-white `#FAFAF8` (page), white `#FFFFFF`, soft grey `#F4F6FA` (secondary bands), lavender `#F3F1FF` and light blue `#EAF2FF` (gradient bands: technology stage, closing CTA, mission), ink `#111318` (text), slate `#667085` (secondary text), border `#E6E8ED`. **Indigo `#6366F1`** is the one interaction colour: primary buttons (white text, hover `#4F54E5`), links, active states, focus rings. Small text on indigo uses `#4F54E5` so it passes AA. **Orange `#F47B20` is a micro-accent only**: the logo, eyebrow dots, the hero full stop, a node or two in drawings. The footer is ink `#10131A` with `#A7ADBA` text.
- **Type:** two families, self-hosted. **Manrope** (600–800) for the hero, headings, statements, CTA and footer wordmark (`font-display`, `.display`, `.h1-page`, `.h2-xl`, `.h2`, `.h3`). **Inter** (400–600) for body, navigation, buttons, forms and labels. Loaded in `app/layout.tsx` from `@fontsource-variable/*`; social images use the static `@fontsource/*` files.
- **Rhythm and spacing:** sections alternate off-white → white → soft grey → gradient, with `--section-y` of 88–144 px and a 1280 px container. Utilities: `.surface-white`, `.surface-soft` (alias `.band`), `.surface-gradient`, `.page-top` (clears the floating navbar).
- **Components:** `.btn-primary` / `.btn-ghost` (12–14 px radius, arrow nudges on hover), `.card` + `.card-hover` (20 px radius, indigo border and glow on hover), `.media` (frame whose image or scene zooms 3% on hover), `.eyebrow`, `.tag`, `.pill-soft`, `.icon-tile`.
- **Navigation:** `components/layout/Navbar.tsx` is a floating translucent bar that firms up on scroll, with mega menus for Services, Solutions and Industries and a compact Company menu (hover with a close delay, click/touch, Escape returns focus). Menu data is in `content/navigation.ts`; every item points at an existing route. `MobileMenu.tsx` is a full-screen sheet with accordion groups.
- **Imagery:** no stock photos and no dark grading. Product visuals are drawn in code so they stay crisp, light and tiny: the hero ecosystem (`components/home/HeroEcosystem.tsx`), service scenes (`visuals/ServiceVisual.tsx`), industry scenes (`visuals/IndustryScene.tsx`), article covers (`visuals/ArticleCover.tsx`) and the CTA drawing (`visuals/CtaVisual.tsx`), all built from the SVG kit in `visuals/kit.tsx` (shared filters render once via `<SvgDefs />`). **Industry photography** drops in over the scenes: see `docs/industry-photography.md` and `npm run photos`.
- **Home page:** hero (editorial headline + animated product ecosystem) → verified metrics → our position → services bento → selected work index → industries showcase → scroll-driven process journey → technology ecosystem (hover/focus/tap a layer to reveal its stack; logos from Simple Icons in `content/tech-icons.ts`) → insights (featured + two) → gradient CTA → footer with the giant wordmark.
- **Motion:** restrained. Content fades up once as it enters (`.reveal`, one IntersectionObserver in `ScrollReveal`); the hero ecosystem runs one seamless 12 s loop (chart draws, the assistant answers, packets travel the connections, cards float); the process line fills with scroll; the technology stage cycles slowly until someone interacts; the footer wordmark rises in. Interactions take 200–500 ms and use transform and opacity. Everything is off under `prefers-reduced-motion`, and content is fully visible without JavaScript.
- **Proof points:** `site.proof` in `content/site.ts`. Only `verified: true` entries render; the example figures (years, projects, clients, satisfaction) are present but unverified, so flip them only when the numbers are real.

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
