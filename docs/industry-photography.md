# Industry photography brief

The eight industry cards and industry page headers are built to show real photographs. Until those exist, each
industry shows a bright, code-built scene (`src/components/visuals/IndustryScene.tsx`), never the old dark posters.
Dropping a photo in replaces the scene for that industry automatically.

## Add the photos

1. Save the originals as `assets/industry-photos/<slug>.jpg` (this folder is git-ignored; keep originals elsewhere).
   Slugs: `healthcare`, `fintech`, `real-estate`, `education`, `retail`, `hospitality`, `logistics`, `professional-services`.
2. Run `npm run photos`. Each image is cropped to 16:10 around its subject, capped at 2400 px wide and written to
   `public/industries/<slug>.webp` (typically 150–350 KB).
3. Check the alt text in `src/content/industry-photos.ts` matches what is actually in each final photo.

`next/image` then serves responsive AVIF/WebP sizes, lazy-loaded everywhere except the industry page header.
Commit the `.webp` files in `public/industries/`.

## The look (all eight)

Real, premium, editorial commercial photography that reads as one family.

- Natural daylight, bright exposure, soft contrast. No dark or cinematic grading, no navy cast.
- Palette: white, off-white and light grey environments with blue, indigo and soft lavender in the set dressing
  (clothing, screens, glass, furniture). Orange only as a tiny realistic detail.
- Real people with natural hands and expressions; modern but lived-in spaces, not over-perfect renders.
- Screens show clean, generic UI with no readable text and no logos.
- No holograms, no floating UI, no robots or brains, no sci-fi lighting, no stock-photo posing.
- Landscape, composed for a 16:10 crop with the subject slightly off-centre and breathing room on all sides
  (cards crop tighter on phones).
- Similar brightness and contrast across the set; each industry still clearly distinct.

## Shot list

| Slug | Brief |
| --- | --- |
| `healthcare` | Bright modern private clinic. A real doctor using a tablet or reviewing a patient interface. Natural daylight, white and light-grey room, subtle cyan and indigo accents. Calm, professional, trustworthy. |
| `fintech` | A professional holding a smartphone showing a clean, generic finance dashboard. Bright modern office, daylight, white/light-grey surroundings, subtle blue, indigo and lavender accents. Realistic hand and phone. |
| `real-estate` | Premium contemporary home: large glass windows, clean architecture, warm off-white stone, light wood, subtle blue/indigo accents. Daylight architectural photography, no sunset colours. |
| `education` | Bright learning space. A student on a laptop or tablet, a mentor subtly present. White/pale-grey interior, very subtle lavender and indigo accents. Premium education campaign feel. |
| `retail` | Premium modern store. A fashion or sneaker product and a customer using a smartphone. Off-white and soft-grey interior, subtle indigo/blue accents, one tiny controlled orange detail. |
| `hospitality` | Bright modern resort, late morning: pool, palms, modern architecture, warm off-white stone, light wood, blue water, subtle indigo/lavender accents. Luxury but believable. No dark sunset. |
| `logistics` | Modern logistics operation in daylight: truck or container yard with blue containers and a white/light-grey truck, subtle cyan/indigo accents. Professional corporate photography. |
| `professional-services` | Consultants in discussion in a glass-walled office. Natural daylight, white and cool-grey palette, subtle blue/indigo accents. Premium corporate editorial. |

## Prompt starter (for an image model)

> Editorial commercial photograph, natural daylight, bright and airy, soft contrast, shot on a full-frame camera with
> a 35mm lens, shallow depth of field, white and light-grey environment with subtle indigo and lavender accents,
> realistic people and hands, generic UI on screens with no readable text, no logos, no text, no holograms,
> 16:10 landscape. Subject: <shot brief above>.

Review every result at 100%: hands, faces, screens and reflections are where generated images fail. Reject anything
that looks rendered.
