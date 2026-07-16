# Copper AM High-Value Decision Clusters

Release date: 2026-07-16

## Purpose

Convert the most commercially useful records from the 78-record technical evidence layer into bounded engineering and procurement decisions. The release does not publish one URL per record. It groups evidence where the same decision owns the search intent and creates an independent page only where the specification, failure mode, or acceptance method is distinct.

The six cluster hubs live under `/knowledge/decision-guides/`. They are intentionally absent from the homepage. Commercial service pages remain the parent conversion paths; the knowledge center and engineering articles provide evidence and decision depth.

## Published cluster structure

| Cluster                          | Canonical hub                                             | Independent decision topics | Primary parent pages                                               |
| -------------------------------- | --------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------ |
| Pure copper and CuCrZr selection | `/knowledge/decision-guides/materials-selection/`         | T011, T014                  | `/materials/`, `/pure-copper-3d-printing/`, `/cucrzr-3d-printing/` |
| Cold plates and heat exchangers  | `/knowledge/decision-guides/cold-plates-heat-exchangers/` | T045, T060                  | `/copper-cold-plates/`, `/copper-heat-exchangers/`                 |
| RF components                    | `/knowledge/decision-guides/rf-components/`               | T101, T102                  | `/copper-rf-waveguides/`                                           |
| Power electronics                | `/knowledge/decision-guides/power-electronics/`           | T082, T088                  | `/copper-busbars/` plus existing SiC and electrical guides         |
| Semiconductor equipment          | `/knowledge/decision-guides/semiconductor-equipment/`     | T093, T096                  | `/copper-semiconductor-cooling/`                                   |
| Quality and acceptance           | `/knowledge/decision-guides/quality-acceptance/`          | T035, T038                  | `/knowledge/quality-and-qualification/`                            |

## Evidence-to-decision mapping

The release prioritizes these technical-record groups:

- Pure copper route-specific conductivity, heat treatment, oxygen/powder-use caveats, and test-method context.
- CuCrZr/CuCr1Zr composition and conductivity-versus-strength heat-treatment states.
- Printed minimum-feature references used only as route-specific starting evidence, not universal design limits.
- Internal-channel powder removal, remaining-wall, surface, distortion, and post-machining controls.
- Density, conductivity, NDE, pressure, leakage, flow, and finished-part qualification methods.
- RF and semiconductor application evidence with explicit supplier/public-case boundaries.

The remaining technical records continue to support the existing material, process, equipment, defect, source, and application knowledge pages. They are not automatically entitled to standalone URLs.

## Search-intent ownership

1. Service pages own `supplier`, `service`, `manufacturer`, and project-fit intent.
2. Cluster hubs own multi-step decision navigation and do not duplicate service claims.
3. Each decision page owns one bounded question from the 200-topic workbook.
4. Knowledge reference pages own terminology, broad comparison, evidence, defects, and standards context.
5. The secure online RFQ remains the conversion endpoint; email and WhatsApp remain parallel options.

## Internal-link model

- The knowledge-center overview links to all six cluster hubs.
- Every cluster hub links to its two independent decision pages and supporting commercial/evidence pages.
- Relevant commercial pages link back to their cluster hub.
- Article-level knowledge pathways select a matching decision cluster when the article context supports one.
- Every new decision article links to its cluster, adjacent service/evidence pages, one or more sibling decisions, and `/rfq/#rfq-form`.

## Publishing boundary

- T049 remains unpublished because its primary RFQ-checklist intent overlaps the existing cold-plate RFQ checklist. A future release should refresh or consolidate the existing URL instead of creating another page.
- Published supplier values remain named route references. They are not design allowables or COPPER 3DP capability guarantees.
- No generated image is required when a decision table and test/specification logic provide stronger user value.
- Future expansion requires a new failure mode, specification decision, acceptance method, or original evidence asset. A keyword variant is not sufficient.
