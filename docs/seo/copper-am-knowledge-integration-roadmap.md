# Copper AM Knowledge Integration Roadmap

Version: 2026-07-16

## Objective

Convert the complete 36-file Copper AM Industry Knowledge Base into a durable, evidence-led website system without publishing duplicate, mechanically generated, or unsupported pages. The long-term objective is to make copper3dp.com a globally useful copper additive manufacturing decision resource that earns qualified search traffic and project inquiries.

This release establishes the on-site architecture and evidence layer. Search leadership still depends on continued source maintenance, genuinely new engineering content, real project evidence where permission exists, relevant external references, and measured iteration using Google Search Console and inquiry quality.

## Baseline frozen before implementation

- Existing indexable site: 72 URLs, including 52 engineering articles and 20 fixed pages.
- Existing publishing backlog: 200 net-new SEO topics in `docs/seo/copper-am-seo-content-topics-200.xlsx`.
- Existing keyword research: 1,000 non-duplicate long-tail terms in `docs/seo/copper-am-long-tail-keywords-1000.xlsx`.
- Knowledge-base content candidates: 104 records, consisting of 26 deep-article concepts, 39 LinkedIn concepts, and 39 YouTube/Shorts concepts.
- Rule: the 104 knowledge-base candidates do not replace the 200-topic SEO backlog and are not published one URL per row.

## Public knowledge architecture

| Destination                             | Evidence absorbed                                             | Search and user job                                                     |
| --------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `/knowledge/`                           | Scope, evidence policy, full library counts                   | Orient an engineer or buyer from requirement to evidence and RFQ        |
| `/knowledge/materials-and-properties/`  | Material lineage, powder, properties, final-state caveats     | Select pure copper, CuCrZr/CuCr1Zr, GRCop or another copper alloy route |
| `/knowledge/process-selection/`         | Process map, DfAM and route-selection evidence                | Compare LPBF, E-PBF, DED, WAAM, cold spray, sinter and micro-AM routes  |
| `/knowledge/applications/`              | 13 applications, buyer roles, parts and qualification context | Match an operating duty to a defensible copper AM application path      |
| `/knowledge/equipment/`                 | 51 platform records from 29 manufacturers                     | Screen public market capability without implying equipment ownership    |
| `/knowledge/case-library/`              | 41 named public evidence records                              | Separate what a public case proves from what remains project-specific   |
| `/knowledge/quality-and-qualification/` | Quality, testing, post-processing and 18 RFQ fields           | Build a finished-part acceptance chain and a complete quotation scope   |
| `/knowledge/defects/`                   | 15 defect pathways                                            | Move from observed evidence to a bounded corrective action              |
| `/knowledge/glossary/`                  | 30 terms                                                      | Establish consistent engineering and procurement language               |
| `/knowledge/sources/`                   | 196 unique source URLs                                        | Trace claims to public evidence and revalidate volatile records         |

## Complete source-file disposition

| Source group                              | Files | Disposition                                                                                                                     |
| ----------------------------------------- | ----: | ------------------------------------------------------------------------------------------------------------------------------- |
| Master manifest and delivery instructions |     2 | Version, scope and operating rules are represented in the generated manifest and this roadmap.                                  |
| Master workbook                           |     1 | Structured records are imported from its 12 lossless CSV exports; workbook duplication is not served publicly.                  |
| Master DOCX and PDF                       |     2 | Narrative synthesis is decomposed into the public decision architecture; duplicate long-form bundles are not copied into pages. |
| CSV data exports                          |    12 | Every row and original field is preserved in committed generated JSON.                                                          |
| NotebookLM research modules               |    16 | Mapped below to public pages, existing articles, or internal publishing assets.                                                 |
| Research briefs                           |     3 | Used as source synthesis and boundary context; underlying evidence is represented through the source register.                  |

Every file is recorded by path, byte size and SHA-256 in `src/data/knowledge/generated/manifest.json`. This preserves provenance without shipping the desktop source archive or duplicating Chinese working documents as indexable content.

## NotebookLM module coverage

| Module                                               | Public or operational destination                                        |
| ---------------------------------------------------- | ------------------------------------------------------------------------ |
| 00 Usage and import guide                            | Import script, manifest, evidence policy and this roadmap                |
| 01 Scope, terminology and evidence grading           | Knowledge overview, glossary and evidence badges                         |
| 02 Copper materials, powders and properties          | Materials and properties page plus existing material articles            |
| 03 Process map and selection                         | Process selection and equipment pages                                    |
| 04 Parameter windows, DOE and DfAM                   | Process selection, defect diagnosis and existing design guides           |
| 05 Defects and diagnostic routes                     | Defect diagnosis page                                                    |
| 06 Equipment, materials and supplier evidence        | Equipment reference and source index                                     |
| 07 Applications, buyer roles and cases               | Application decision map and public case library                         |
| 08 Quality, standards, testing and qualification     | Quality and qualification page                                           |
| 09 Post-processing, surfaces, joining and inspection | Quality page plus existing post-processing, finish, CT and leak articles |
| 10 Commercial inquiry development and quotation      | Existing secure RFQ form, quotation checklist and quality page           |
| 11 LinkedIn topic library                            | Internal distribution plan; no automatic indexable pages                 |
| 12 YouTube and Shorts topic library                  | Internal distribution plan; no automatic indexable pages                 |
| 13 Twelve-week publication plan                      | Internal cadence reference reconciled against the 200-topic backlog      |
| 14 Lead magnets and conversion assets                | Future conversion-asset backlog; no unsupported downloadable claims      |
| 15 Source index and refresh list                     | Public source index and dated revalidation policy                        |

## Canonical ownership and anti-duplication rules

1. Fixed application and material service pages own commercial service intent.
2. The knowledge center owns reference, comparison, terminology, evidence and diagnostic intent.
3. Engineering articles own one bounded design, test, procurement or application decision.
4. A knowledge-base content candidate is published only when it adds a distinct decision not already satisfied by a fixed page, knowledge page, existing article, or scheduled 200-topic page.
5. LinkedIn, video and lead-magnet rows are distribution formats, not automatic SEO URLs.
6. Public third-party cases are never described as COPPER 3DP customer projects.
7. Public equipment evidence is never presented as equipment ownership. The production supplier, machine, material and inspection scope are confirmed in the quotation.

## Internal-link model

- Header and footer provide one restrained knowledge-center entry.
- Materials and applications fixed pages link to their deeper evidence maps.
- Every engineering article receives three contextual knowledge paths selected from its title, category and tags.
- Knowledge pages link back to commercial application pages, material services, detailed engineering articles and the secure RFQ form.
- The RFQ path remains `/rfq/#rfq-form`; email and WhatsApp remain parallel contact options.

## Publishing governance

The daily automation continues to select two qualified topics from the 200-topic workbook. Before publishing, it must compare the topic against all fixed pages, 52 existing articles, the public knowledge center and the publication log. A topic is skipped when the search intent is already adequately covered or primary evidence is insufficient.

## Refresh cadence

- Monthly: broken sources, equipment status, standards links and volatile product data.
- Quarterly: GSC query/page review, internal-link gaps, cannibalization, inquiry quality and priority changes.
- Per publication: source freshness, distinct decision, parent-page link, sibling links, canonical, structured data, sitemap, 404 and RFQ conversion path.
- Annually: full evidence-tier review and knowledge-base version release.

## Regeneration

```powershell
python scripts/import-copper-am-knowledge.py `
  --source "C:\Users\79211\Desktop\铜3D打印行业知识库_2026-07-16" `
  --output "src/data/knowledge/generated" `
  --version "2026-07-16"
```

Production builds consume the committed JSON and do not depend on the desktop path.
