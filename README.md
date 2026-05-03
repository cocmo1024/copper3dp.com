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
