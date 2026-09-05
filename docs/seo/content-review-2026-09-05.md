# Content review and incremental update register — 2026-09-05

## Scope and evidence limits

Reviewed the complete generated site inventory: 110 HTML pages, including 73 engineering articles and 37 fixed, knowledge, archive, legal or utility pages. The baseline includes 104 indexable sitemap URLs. Every article was inventoried by title, headings, topic, body links and potential claim risks; higher-risk and search-relevant pages received deeper editorial review. This is not a claim that all external sources or every engineering statement on all 73 articles have been independently requalified.

The supplied Search Console export was used as a prioritization signal, not proof of a ranking cause or of conversion performance. Page and query exports are separate dimensions; no query-to-page attribution was inferred. No private workbook or raw performance export is included in this release.

## Existing content ownership: do not rebuild these assets

| Existing asset                         | Buyer task it owns                                                     | Update decision                                                                   |
| -------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Homepage and application/service pages | Identify fit and start an inquiry                                      | Preserve structure; refine heat sink and thermal validation entry copy            |
| Thermal design validation              | Define, screen, model, reconstruct and validate an engineering concept | Keep the existing URL, layout and document-derived assets                         |
| General quotation and CAD guides       | Prepare a controlled part package                                      | Retain; link from application-specific handovers                                  |
| Cold plate RFQ checklist               | Assign requirements, quote inclusions and release responsibilities     | Refresh in place; do not create another form or checklist URL                     |
| General proof/leak/flow guide          | Select test methods by their distinct questions                        | Retain; link from narrower articles                                               |
| Cold plate CT criteria                 | Define critical regions, capability, uncertainty and disposition       | Refresh in place; remove unsupported universal acceptance classes                 |
| Monolithic versus brazed cold plates   | Compare actual construction and delivery risks                         | Correct LPBF, drilled/plugged and brazed-cover distinctions                       |
| Fin thickness and spacing              | Establish a qualified fin-array geometry                               | Replace generic minima with process- and geometry-specific decisions              |
| Microchannel and AI accelerator guides | Handover application constraints                                       | Add links to existing detailed decisions, not new overlapping pages               |
| EDM electrode failure guide            | Diagnose a shaped sinker electrode against the actual burn             | Replace numerical guarantees with a controlled comparison workflow                |
| Representative case pages              | Explain application-specific design trade-offs                         | Keep labeled scenarios; do not describe them as measured customer results         |
| Knowledge center and decision guides   | Trace evidence and navigate six existing decision pathways             | Retain architecture; exclude two internal operations sources from public evidence |

The 73-article primary-topic inventory spans thermal/fluid design, materials and conductivity, quality and acceptance, RF/semiconductor hardware, electrical/tooling applications, and DFM/procurement. Topic overlap is expected across these roles; shared terminology or template headings alone do not justify redirects or deletion.

## Implemented incremental changes

- No new article URL, no URL consolidation and no new imagery.
- Eleven existing articles receive substantive revisions: five acceptance/construction/geometry/EDM rewrites, the earlier microchannel thermal-management refresh, three targeted unsupported-case/claim corrections, and two application-specific decision handovers.
- Preserve titles where they still describe the page; retain every article's canonical and original publication date. Update modification dates only on edited articles.
- Remove numerical acceptance limits, cost/lead-time promises and apparent measured case outcomes where the page had no adequate supporting evidence. Proposed workflows and hypothetical reviews remain explicitly labeled.
- Remove obsolete inline illustrations from the five rewritten bodies. Visual review also found unsupported numeric limits in the CT, fin-array, RFQ and EDM covers; omit those four covers using the existing image-optional article template. Preserve all underlying image files. The retained construction-comparison cover is labeled as a concept illustration, not customer evidence.
- Add appropriately scoped primary references (NIST, ISO, EOS, OCP and Makino), useful decision tables, explicit limitations and existing RFQ links.
- Correct the legacy tolerance-tag route with a targeted 301 to the existing tolerance guide.
- Filter two NotebookLM operations-help sources from public engineering evidence while preserving imported records and identifiers. Public counts derive from the filtered list (194 sources); regression checks reject those operations titles in rendered content.
- Add a clear AI-assisted text/concept-image disclosure to the existing editorial policy. Do not invent expert credentials or imply software-generated content is validated evidence.
- Mark historical topic and daily-case plans as idea libraries subordinate to the current content update guide.
- Preserve RFQ API, analytics, Worker configuration, site-wide styling and navigation. Fix heat sink CTA application values using the existing supported parameter.
- Retain local lint-ignore correction for Wrangler-generated caches and strengthen production smoke-test coverage for the homepage and RFQ.

## Google guidance used

Follow [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): meaningful original analysis, clear sourcing, honest authorship/method and substantive updates. Avoid artificial freshness, arbitrary article length or page-count targets. Follow [spam policies](https://developers.google.com/search/docs/essentials/spam-policies), including the distinction between useful assistance and scaled content made primarily to manipulate rankings. Keep [title links](https://developers.google.com/search/docs/appearance/title-link) descriptive and consistent with visible page content.

These are editorial and technical alignment decisions, not Google certification or a promise of ranking, snippets, rich results or leads.

## Remaining review work and exit conditions

1. Revalidate volatile manufacturer data and the remaining external evidence register in bounded batches. Source dates and previously checked URLs are historical, not a statement of current vendor capacity.
2. Review remaining legacy numeric claims in their full context, prioritizing material-property tables, surface finishing and delivery schedules. Automated risk matches are review candidates, not proof of errors.
3. Replace or add measured customer results only when the underlying report, boundary conditions and publication authorization are available. Do not invent evidence to increase article volume.
4. Reassess performance after sufficient post-release observation, comparing equivalent time windows and segmented pages/markets. No Search Console lead count is available; inquiries require a separate verified conversion data source.
5. Add a new page only for a distinct buyer decision not already answered, with adequate evidence and a clear existing entry point. Stop expansion when it merely rephrases a current URL.

## Release controls

The user authorized commit, push and online deployment in this request. Validate source, build, SEO, links, knowledge/decision pages and Worker packaging before pushing to main. Use the established GitHub-to-Cloudflare Workers Builds chain only; do not add a second manual deployment. Confirm actual production content and read-only RFQ route behavior after deployment. Local evidence and the final deployment receipt are stored in the existing session directory, not mixed into website assets.
