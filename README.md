# COPPER 3DP Website

Official Astro static site for `copper3dp.com`.

This repository is the operating manual for a B2B lead-generation website focused on copper additive manufacturing RFQs. The site is built to support two channels at the same time:

- Google Ads traffic that needs a fast, clear inquiry path.
- Long-term Google SEO traffic that needs reliable technical content, clean metadata, structured data, and stable URLs.

The commercial goal is simple: qualified visitors should understand that COPPER 3DP professionally reviews copper 3D printing projects, then send drawings, quantity, and requirements to `info@szcomo.com`.

## Business Positioning

COPPER 3DP should not sound like a generic instant-quote platform or an overpromising manufacturer.

Use this stance across pages, ads, and articles:

- We specialize in copper additive manufacturing review and quotation.
- The customer should send CAD, drawings, quantity, material preference if known, lead time, and critical requirements.
- Simple projects can receive a basic quote.
- Complex projects may need focused clarification before quotation.
- Quote content depends on the part, requirements, and information provided.

Avoid language that promises universal feasibility, instant pricing, guaranteed lead times, fixed engineering deliverables, or unnecessary consulting before the drawing is reviewed.

## Stack

- Astro 5 static output
- Astrowind-based template structure
- Tailwind CSS
- MD/MDX engineering articles
- Astro content collections
- RSS, sitemap, JSON-LD structured data
- Google Analytics / Google Ads conversion hooks

## Key Commands

```bash
npm install
npm run dev
npm run check
npm run build
```

Local dev server:

```text
http://localhost:4321/
```

`npm run check` runs Astro diagnostics, ESLint, and Prettier. Run it before any commit that changes pages, components, metadata, structured data, scripts, or content.

## Project Map

```text
src/pages/                 Fixed pages and route entrypoints
src/data/post/             Engineering guide articles
src/components/            UI components and shared widgets
src/layouts/               Page, blog, and document layouts
src/utils/                 SEO, permalink, image, blog, and structured-data helpers
src/navigation.ts          Header, footer, external links, RFQ actions
src/config.yaml            Site identity, global metadata, blog config, theme
src/assets/images/         Source images processed by Astro
public/                    Static files, redirects, robots base files
astro.config.ts            Build integrations, sitemap filtering, markdown plugins
```

## Page Architecture

Primary public pages:

- `/` is the main landing page for SEO and Google Ads.
- `/rfq/` explains what to send for quotation.
- `/contact/` is the email-first contact route.
- `/materials/`, `/copper-cold-plates/`, and `/copper-heat-sinks/` support focused search and user intent.
- `/about/`, `/privacy/`, and `/terms/` should remain plain, restrained, and document-like.
- `/category/EngineeringGuide/` and `/posts/EngineeringGuide/.../` serve engineering content.

Consolidated legacy pages:

- `/applications/` and `/capabilities/` are kept for compatibility but are redirected on production and excluded from sitemap indexing.
- Legacy `/tags/.../` pages are static fallbacks with `noindex, follow`.

## SEO Rules

These rules are deliberate. Do not weaken them casually.

- Keep `site.trailingSlash: true` in `src/config.yaml`.
- Internal links to fixed pages should use trailing slashes, for example `/rfq/`, not `/rfq`.
- Every indexable page should have a title, meta description, canonical URL, and one clear H1.
- Keep JSON-LD valid and internally consistent. Use helpers in `src/utils/structured-data.ts`.
- Do not add low-value keyword pages just to increase page count.
- Do not index tag pages or weak archive pages unless they become genuinely useful landing pages.
- Do not publish duplicate fixed pages that repeat the homepage with only minor wording changes.
- Use sitemap only for pages that should be crawled and evaluated as primary content.
- Article `lastmod` in sitemap is generated only from real frontmatter dates.

Before publishing SEO-sensitive changes, build and inspect the generated `dist/` output, not only source files.

## Content Rules

Articles should help engineers or buyers make a decision before sending an RFQ.

Good article topics:

- RFQ preparation
- Copper AM process selection
- Cold plate, heat sink, busbar, induction coil, RF, vacuum, semiconductor, and thermal hardware requirements
- Material trade-offs: pure copper, CuCrZr, GRCop-42
- Inspection, CT, leak testing, pressure testing, cleaning, and post-processing

Avoid:

- Thin keyword pages
- Rewritten versions of the same topic
- Claims without practical RFQ value
- Generic 3D printing content not tied to copper AM decisions

Article frontmatter should include:

```yaml
title:
publishDate:
excerpt:
category:
tags:
author:
image:
metadata:
  title:
  description:
  canonical:
```

Keep title tags concise enough for search results. A good target is under 60 characters before the site suffix where practical.

## Images

Use images as evidence of copper AM capability, not decoration.

Preferred image types:

- Transparent copper AM product cutouts for hero sections
- Realistic copper parts with functional geometry
- RFQ review workspace images for quotation/process sections
- Application-specific images for cold plates, heat sinks, busbars, coils, RF, and inspection topics

Avoid:

- Text baked into hero product images unless it is an article thumbnail
- Generic factory or stock imagery
- Decorative images that do not match the module text
- Large unoptimized uploads

Astro processes source images from `src/assets/images/`. Build output should be checked for file size and responsive variants.

## Image Prompt Protocol

For new SEO articles, reuse the accepted TITAN industrial visual logic instead of writing casual prompts. The goal is not decoration. Each image should help the reader understand a real copper AM decision, failure mode, process limit, RFQ input, inspection requirement, or application fit.

Start by deciding the visual role:

- Evidence visual: physical proof of a part, failure, inspection result, or successful geometry.
- Explanation visual: a mechanism, internal channel, build constraint, thermal path, electrical path, or process window.
- Data visual: a comparison, decision matrix, acceptance zone, or measurable trade-off.

Choose image count by article length and actual need:

- Under 1200 words: 1 to 2 images.
- 1200 to 2500 words: 2 to 4 images.
- Over 2500 words: 3 to 5 images.

Do not place images in the same percentage position in every article. Insert each image where it helps: after the failure or success it proves, after the concept it explains, or after the table/comparison it supports.

Every generated article image prompt should include:

- Subject and engineering action.
- Camera or view: macro, tilt-shift overview, isometric, cross-section, or product cutout.
- Composition: rule of thirds, knolling, symmetry, cross-section, exploded view, or compact hero cluster.
- Lighting: clean industrial product lighting, controlled reflections, readable geometry.
- Material physics: copper or CuCrZr tone, LPBF texture, machined faces, sealing lands, threads, ports, channels, tool marks, rough-to-polished contrast.
- Text policy: avoid baked-in text for hero/product cutouts; allow concise readable labels only when the image is explicitly an article thumbnail, comparison diagram, or technical documentation visual.
- Render style: photorealistic, premium B2B engineering, physically plausible, not fantasy CGI.
- Aspect ratio and intended usage.
- Negative prompt.
- SEO alt text.
- Engineering caption.

Use this reusable manifest format when planning article visuals:

```text
--- VISUAL MANIFEST (COPY TO AI) ---

[Figure X]
Subject:
[One sentence describing the engineering scene or object.]

Prompt:
[Subject/Action]: A photorealistic [view type] of [specific copper AM subject], showing [functional geometry, interfaces, channels, ports, inspection points, or failure evidence].
[Camera/Lens]: [100mm macro / 24mm tilt-shift / isometric / three-quarter product view], deep focus, sharp readable details.
[Composition]: [rule of thirds / knolling / symmetry / cross-section / exploded view / compact hero cluster], with the engineering feature as the visual priority.
[Lighting]: Clean industrial product lighting, controlled softbox reflections, crisp edge highlights, no dramatic smoke or decorative effects.
[Material Physics]: Realistic copper or CuCrZr, warm red-orange metallic tone, visible LPBF micro-pitted texture on as-built surfaces, CNC-machined sealing faces and datum pads, realistic threads, bolt holes, internal channels, and functional ports.
[Text Rendering]: [No text / concise readable technical labels only if needed].
[Render Style]: Ultra-realistic industrial product photography or high-end PBR render, 8k detail, premium B2B engineering website quality.
Aspect Ratio: [16:9 / 3:2 / 1:1 / transparent PNG cutout].
Negative Prompt: text artifacts, watermark, logo, fake checkerboard, generic factory, stock photo, decorative copper objects, fantasy machinery, impossible channels, disconnected ports, gold, brass, bronze, plastic, rust, patina, dirty surfaces, blurry render, shallow depth of field, cartoon, anime, low-poly, excessive bloom, lens flare, large empty margins, mismatched page topic.
Alt Text: [Search-friendly alt text tied to the article keyword and visible engineering subject.]
Caption: [Short engineering caption explaining what decision or requirement the image supports.]
```

For `copper3dp.com`, prefer prompts that show copper AM value clearly:

- AI accelerator and server cooling: cold plates, microchannels, manifolds, sealing faces, O-ring grooves, leak/pressure/flow inspection context.
- Data center power and cooling: busbars, liquid-cooled conductors, manifolds, contact pads, insulation and mounting constraints.
- RF and vacuum hardware: waveguides, cavities, flanges, sealing surfaces, conductive internal geometry.
- High heat flux parts: heat sinks, regenerative cooling channels, lattice heat exchangers, CuCrZr or pure copper material choices.
- RFQ process visuals: CAD, drawings, quantity and inspection notes, but only when they support the article's inquiry logic.

Do not reuse existing article images for new SEO posts unless the same image is uniquely correct for that exact topic. New articles should normally receive new topic-specific images stored under `src/assets/images/generated/`, optimized to a practical WebP size before commit.

## Google Tracking

Public build variables belong in the hosting environment, not source control.

```bash
PUBLIC_GOOGLE_TAG_ID=
PUBLIC_GOOGLE_TAG_MANAGER_ID=
PUBLIC_GA_MEASUREMENT_ID=
PUBLIC_GOOGLE_ADS_CONVERSION_ID=
PUBLIC_GOOGLE_ADS_RFQ_CONVERSION_LABEL=
PUBLIC_GOOGLE_SITE_VERIFICATION_ID=
```

Current primary measurement:

- GA4 stream: `G-6HD15CRLMQ`
- Main conversion intent: email RFQ click
- Main event names: `rfq_email_click`, `generate_lead`

The site intentionally uses email-first RFQ actions because CAD and requirement files are the natural qualification mechanism.

## Google Ads Landing Page Notes

The homepage is also the primary trial Ads landing page.

Keep the first screen focused on:

- LPBF copper 3D printing for custom copper parts
- Send drawings, quantity, and requirements
- Email RFQ CTA
- Clear fit / not-a-fit guidance

Do not introduce forms, chat widgets, lead popups, or extra claims unless they are proven to improve qualified RFQs without increasing low-quality leads.

## Deployment

Production build output is static and generated in:

```text
dist/
```

Build command:

```bash
npm run build
```

Primary domain:

```text
https://copper3dp.com
```

Related domains:

```text
https://copper3dprint.com
https://szcomo.com
https://titanium3dp.com
https://ceramiccnc.com
```

`copper3dprint.com` is intended as a supporting redirected domain, not a separate duplicated site.

## Redirects

Current static redirects live in `public/_redirects`.

Keep redirects simple and relative. Cloudflare rejects incompatible `_redirects` rules such as absolute destinations and duplicate path rules.

Important production redirects:

```text
/applications/ -> /
/capabilities/ -> /
```

If a page is consolidated into the homepage, either redirect it or mark it `noindex, follow`; do not leave both pages competing in search.

## Pre-Launch Checklist

Run:

```bash
npm run check
npm run build
```

Then confirm:

- The homepage CTA opens `mailto:info@szcomo.com`.
- Email clicks still fire the RFQ tracking event.
- `dist/sitemap-0.xml` contains only intended indexable URLs.
- `dist/robots.txt` references `sitemap-index.xml`.
- No primary internal link points to a redirecting URL such as `/rfq` instead of `/rfq/`.
- JSON-LD parses cleanly.
- Mobile header, footer, and CTAs remain usable.
- Dark mode is the default visual experience.

## Maintenance Principles

- Minimum necessary change first.
- Keep the homepage strong; do not fragment the same message across many weak fixed pages.
- Add content only when it answers a real buyer or engineering decision.
- Preserve email-first inquiry flow unless data proves another route is better.
- Prefer stable URL structure over frequent renaming.
- Do not change tracking event names casually; Ads and GA learning depend on continuity.
- Do not change deployment settings without a build and redirect check.

## RFQ Contact

```text
info@szcomo.com
```

Use this address consistently in CTAs, footer, contact copy, Ads conversion testing, and structured inquiry guidance.
