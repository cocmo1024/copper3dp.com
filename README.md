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
- `/capabilities/` documents the copper LPBF equipment class, materials, finishing, inspection, and project-delivery model.
- `/rfq/` explains what to send for quotation.
- `/contact/` is the email-first contact route.
- `/materials/`, `/copper-cold-plates/`, and `/copper-heat-sinks/` support focused search and user intent.
- `/about/`, `/privacy/`, and `/terms/` should remain plain, restrained, and document-like.
- `/category/EngineeringGuide/` and `/posts/EngineeringGuide/.../` serve engineering content.

Consolidated legacy pages:

- `/applications/` is a curated application hub and should remain indexable.
- Legacy `/tags/.../` pages are static fallbacks with `noindex, follow`.
- Older heat-sink articles marked `draft: true` are preserved in source but consolidated by 301 into `/copper-heat-sinks/` or the stronger heat-sink feasibility guide.

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

Use the TITAN industrial visual logic for every new SEO article image. The goal is not decoration. Each image must help the reader understand a real copper AM decision, failure mode, process limit, RFQ input, inspection requirement, or application fit.

This protocol is the project-local version of the TITAN visual manifest workflow. Apply it before generating images for any new article.

### 1. Analyze The Article Before Prompting

Do not start with a generic product render. First extract:

- Primary constraint: cost, time, safety, precision, cleaning, pressure, thermal density, electrical current, RF performance, vacuum service, or manufacturing complexity.
- Audience role: engineer, buyer, operations team, R&D team, thermal engineer, electrical engineer, RF engineer, or semiconductor equipment team.
- Evidence level: physical part evidence, inspection data, process comparison, or RFQ guidance.
- Decision stage: research, comparison, feasibility review, implementation, troubleshooting, or quotation.

The image must support those signals. If the article is about RFQ inputs, show the hardware and review context. If the article is about failure, show the failure evidence. If the article is about process selection, show a comparison or route decision.

### 2. Select The Visual Narrative

Match image type to the article's narrative flow:

- Problem-first: show failure evidence first, then solution or corrected route.
- Gate-first: show inspection points, acceptance criteria, compliance surfaces, CT, leak, pressure, or cleanliness evidence.
- Cost-ledger: show cost drivers, process trade-offs, or comparative manufacturing routes.
- Process-window: show parameters, geometry limits, tolerances, process windows, or manufacturability boundaries.
- Comparison-ladder: show alternatives side by side, such as LPBF vs CNC, monolithic vs brazed, pure copper vs CuCrZr.
- Myth-buster: show the contrast between a common assumption and the real engineering constraint.

Avoid repeating the same visual structure across consecutive articles. Do not make every article a dark product hero with the same composition.

### 3. Decide The Visual Role

Choose only the visuals that are genuinely useful:

- Evidence visual: physical proof of a part, failure, inspection result, or successful geometry.
- Explanation visual: a mechanism, internal channel, thermal path, current path, RF cavity, cleaning path, build constraint, or process window.
- Data visual: a comparison, decision matrix, acceptance zone, or measurable trade-off.

Placement rules:

- Evidence visual goes immediately after the failure, success, or part scenario it proves.
- Explanation visual goes after the paragraph that introduces the complex mechanism.
- Data visual goes after the table, comparison, or quantitative claim it supports.

Image count:

- Under 1200 words: 1 to 2 visuals.
- 1200 to 2500 words: 2 to 4 visuals.
- Over 2500 words: 3 to 5 visuals.

Do not place visuals at the same percentage position in every article. Place them where they earn their space.

### 4. Build Every Prompt From The Same Engineering Checklist

Every generated article image prompt must define:

- Subject and engineering action.
- Camera or view: 100mm macro, 24mm tilt-shift overview, isometric, cross-section, exploded view, or three-quarter product view.
- Composition: rule of thirds, knolling, symmetry, cross-section, exploded view, compact hero cluster, or side-by-side comparison.
- Lighting: clean industrial product lighting, controlled reflections, readable geometry, no decorative smoke or theatrical effects.
- Material physics: copper or CuCrZr tone, LPBF texture, machined faces, sealing lands, datum pads, threads, ports, channels, tool marks, rough-to-polished contrast.
- Functional plausibility: every port, channel, seal, bolt pattern, contact pad, RF interface, or inspection feature must have an engineering reason.
- Text policy: no baked-in text for standard product covers or hero images. Allow concise readable labels only for article thumbnails, comparison diagrams, inspection visuals, or technical documentation style images.
- Render style: photorealistic, premium B2B engineering, physically plausible, not fantasy CGI.
- Aspect ratio and intended use.
- Negative prompt.
- SEO alt text.
- Engineering caption.

### 5. Camera, Composition, And Ratio Selection

Use the view that matches the visual role:

- 100mm macro: defects, porosity, surface roughness, seal faces, threads, contact pads, small inspection evidence.
- 24mm tilt-shift overview: machine setup, inspection bench, RFQ review desk, process route overview.
- Isometric: exploded views, cross-sections, internal channels, comparison diagrams.
- Three-quarter product view: blog cover images, application overviews, product clusters.
- Cross-section: internal channels, cooling paths, regenerative passages, wall thickness, blocked powder routes.

Composition:

- Rule of thirds: natural editorial product scene.
- Knolling: organized component display or RFQ package.
- Symmetry: balanced comparison or inspection view.
- Cross-section: internal structure explanation.
- Compact hero cluster: broad capability or application family cover.

Aspect ratio:

- 16:9: default article cover and wide engineering scene.
- 3:2: tighter process or inspection scene.
- 1:1: thumbnail or compact component cluster.
- Transparent PNG/WebP cutout: hero product subject only, with real alpha or verified clean background removal.

### 6. Copper AM Prompt Requirements

For `copper3dp.com`, prompts should make the copper AM value obvious:

- AI accelerator and server cooling: cold plates, microchannels, manifolds, sealing faces, O-ring grooves, leak/pressure/flow inspection context.
- Data center power and cooling: busbars, liquid-cooled conductors, manifolds, contact pads, insulation and mounting constraints.
- RF and vacuum hardware: waveguides, cavities, flanges, sealing surfaces, conductive internal geometry, leak and cleaning logic.
- Semiconductor equipment: cold plates, RF/vacuum copper parts, high-current conductors, clean interfaces, precision datums, cleanliness and leak-test context.
- High heat flux parts: heat sinks, regenerative cooling channels, lattice heat exchangers, CuCrZr or pure copper material choices.
- RFQ process visuals: CAD, drawings, quantity and inspection notes, but only when they support the inquiry logic.

Avoid images that could apply to any generic 3D printing site. A good image should immediately read as copper AM hardware for thermal, electrical, RF, vacuum, or fluid-system use.

### 7. Reusable Visual Manifest Format

Use this format when planning article visuals:

```text
--- VISUAL MANIFEST (COPY TO AI) ---

[Figure X]
Subject:
[One sentence describing the engineering scene, mechanism, comparison, or object.]

Prompt:
[Subject/Action]: A photorealistic [view type] of [specific copper AM subject], showing [functional geometry, interfaces, channels, ports, inspection points, failure evidence, or trade-off].
[Camera/Lens]: [100mm macro / 24mm tilt-shift / isometric / cross-section / three-quarter product view], deep focus, sharp readable details.
[Composition]: [rule of thirds / knolling / symmetry / cross-section / exploded view / compact hero cluster / side-by-side comparison], with the engineering feature as the visual priority.
[Lighting]: Clean industrial product lighting, controlled softbox reflections, crisp copper edge highlights, no dramatic smoke, no sparks, no decorative effects.
[Material Physics]: Realistic pure copper or CuCrZr, warm red-orange metallic tone, visible LPBF micro-pitted texture on as-built surfaces, CNC-machined sealing faces and datum pads, realistic threads, bolt holes, internal channels, contact pads, and functional ports.
[Functional Plausibility]: Every visible channel, port, seal, bolt pattern, RF interface, contact pad, or inspection feature must connect to a believable engineering purpose.
[Text Rendering]: [No text / concise readable technical labels only if this is a diagram or inspection visual].
[Render Style]: Ultra-realistic industrial product photography or high-end PBR render, 8k detail, premium B2B engineering website quality, physically plausible.
Aspect Ratio: [16:9 / 3:2 / 1:1 / transparent PNG cutout].
Negative Prompt: text artifacts, watermark, logo, fake checkerboard, generic factory, stock photo, decorative copper objects, fantasy machinery, impossible channels, disconnected ports, random holes, gold, brass, bronze, plastic, rust, patina, dirty surfaces, blurry render, shallow depth of field hiding details, cartoon, anime, low-poly, excessive bloom, lens flare, large empty margins, mismatched page topic.
Alt Text: [Search-friendly alt text tied to the article keyword and visible engineering subject.]
Caption: [Short engineering caption explaining what decision or requirement the image supports.]
```

### 8. Storage And Reuse Rules

Do not reuse existing article images for new SEO posts unless the same image is uniquely correct for that exact topic.

New SEO articles should normally receive new topic-specific images stored under:

```text
src/assets/images/generated/
```

Use descriptive kebab-case filenames, for example:

```text
semiconductor-copper-am-rfq-cover.webp
```

Optimize to a practical WebP size before commit. Build output should be checked for responsive variants and file size.

### 9. Example For The Latest Article

Article:

```text
Copper AM Parts for Semiconductor Equipment
```

Recommended visual role:

```text
Evidence + explanation visual.
```

Reason:

```text
The article connects semiconductor thermal management, RF/vacuum copper hardware, high-current conductors, cleanliness, leak testing, and precision interfaces. A single wide cover should show a credible group of semiconductor equipment copper AM parts rather than a generic copper object.
```

Copy-ready prompt:

```text
--- VISUAL MANIFEST (COPY TO AI) ---

[Figure 1]
Subject:
Semiconductor equipment copper AM RFQ review cover image showing functional copper cold plate, RF/vacuum hardware, high-current conductor, and clean precision interfaces.

Prompt:
[Subject/Action]: A photorealistic three-quarter product view of precision copper LPBF / copper additive manufacturing components for semiconductor equipment, arranged as a cohesive engineering RFQ review scene. Show a copper microchannel cold plate with CNC-machined sealing face, O-ring groove, bolt-hole pattern, threaded inlet and outlet ports, and a small visible internal channel cutaway; a compact copper RF waveguide or cavity part with rectangular ports, flange faces, bolt holes, and polished conductive internal surfaces; a vacuum-compatible copper manifold with clean threaded interfaces and sealing lands; and a high-current copper conductor/contact part with polished contact pads and rounded current-flow transitions.
[Camera/Lens]: Three-quarter product view with a slight top-down engineering angle, 50-70mm product lens feel, deep focus, all parts sharp and readable.
[Composition]: Compact hero cluster on a clean dark graphite engineering surface, controlled overlap, strong copper silhouette, the cold plate as the central anchor, RF/vacuum part on one side, high-current conductor in the foreground, enough negative space only around the cluster for a 16:9 article cover.
[Lighting]: Clean industrial product lighting, large softbox reflections, crisp copper edge highlights, subtle self-shadowing between parts, no dramatic smoke, no sparks, no flames, no decorative effects.
[Material Physics]: Realistic pure copper and CuCrZr, warm red-orange metallic tone, visible LPBF micro-pitted texture on as-built surfaces, CNC-machined sealing faces, datum pads, contact pads, thread details, bolt holes, internal channels, O-ring groove, and polished RF interface surfaces. Maintain clear contrast between matte printed surfaces and machined functional surfaces.
[Functional Plausibility]: Every port must align with a believable flow path. Every sealing face, RF flange, contact pad, bolt pattern, thread, and channel must have a practical engineering purpose. Avoid random decorative channels, impossible holes, disconnected interfaces, and nonfunctional geometry.
[Text Rendering]: No text, no labels, no annotations, no logo, no watermark.
[Render Style]: Ultra-realistic industrial product photography or high-end PBR render, 8k detail, premium B2B engineering website quality, physically plausible, serious semiconductor equipment tone.
Aspect Ratio: 16:9.
Negative Prompt: text, letters, numbers, labels, callouts, arrows, logo, watermark, fake UI, fake transparent checkerboard, generic factory background, stock photo, human, hands, tools dominating the scene, ordinary plumbing fittings, household pipes, decorative copper objects, jewelry, brass, gold, bronze, orange plastic, steampunk, fantasy machinery, weapons, missiles, impossible geometry, disconnected channels, random holes, broken fins, dirty rust, green patina, heavy oxidation, soot, oil stains, blurry render, shallow depth of field hiding details, cartoon, anime, low-poly, noisy render, excessive bloom, lens flare, large empty margins, subject too small, mismatched page topic.
Alt Text: Copper AM parts for semiconductor equipment including cold plate, RF vacuum component, manifold, and high-current conductor.
Caption: Semiconductor copper AM RFQs should separate thermal, RF/vacuum, electrical, cleanliness, and inspection requirements before quotation.
```

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
