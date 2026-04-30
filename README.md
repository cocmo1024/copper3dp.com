# COPPER 3DP Website

Static Astro site for COPPER 3DP, focused on copper 3D printing RFQs, application pages, and engineering guide articles.

## Project Scope

- LPBF copper 3D printing service pages
- RFQ preparation and email-based inquiry flow
- Copper AM applications, materials, and capability pages
- Engineering guide articles with tags, related posts, RSS, sitemap, and structured data

## Local Development

```bash
npm install
npm run dev
```

Local preview runs at `http://localhost:4321/`.

## Quality Checks

```bash
npm run check
npm run build
```

`npm run check` runs Astro diagnostics, ESLint, and Prettier checks.

## Deployment

The site builds as static output in `dist/`.

```bash
npm run build
```

Primary domain: `https://copper3dp.com`

## Google Tracking

RFQ email clicks are tracked as the primary lead-intent event. Configure the public build variables in the hosting environment:

```bash
PUBLIC_GA_MEASUREMENT_ID=G-xxxx
PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-xxxx
PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-xxxx
PUBLIC_GOOGLE_ADS_RFQ_CONVERSION_LABEL=xxxx
PUBLIC_GOOGLE_SITE_VERIFICATION_ID=xxxx
```

`rfq_email_click` records every email CTA click. `generate_lead` and the Google Ads conversion event are deduplicated once per browser session.

## RFQ Contact

Customer RFQs are directed to email so drawings and requirements can be reviewed directly.

Email: `info@szcomo.com`
