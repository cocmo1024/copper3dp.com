---
title: 'CT and Leak Test Criteria for Copper Cold Plates'
publishDate: 2026-02-01
updateDate: 2026-09-05
excerpt: 'Specify copper cold plate CT inspection by critical region, detection capability, uncertainty, and disposition, then separate leak, proof, and flow acceptance.'
category: Engineering Guide
tags: ['copper-cold-plates', 'quality-inspection', 'engineering-guide']
author: 'COPPER 3DP Engineering'
metadata:
  title: 'CT and Leak Test Criteria for Copper Cold Plates'
  description: 'Specify copper cold plate CT inspection by critical region, detection capability, uncertainty, and disposition, then separate leak, proof, and flow acceptance.'
  canonical: https://copper3dp.com/posts/EngineeringGuide/ct-scan-leak-test-acceptance-criteria-copper-cold-plates/
---

CT and leak testing answer different questions. CT can investigate hidden geometry and detectable internal indications; a leak test measures leakage under a defined setup. Neither a clean-looking scan nor a high relative-density result establishes that a finished cold plate meets its operating requirements.

This guide focuses on writing the **CT inspection and disposition portion** of a cold plate acceptance plan. For the broader choice between proof, helium leak, and flow tests, use the [test-method selection guide](/posts/EngineeringGuide/proof-pressure-helium-leak-flow-test-copper-am-acceptance/).



## Start with a feature and failure consequence

Do not purchase “CT inspection” without identifying the question it must resolve. A thin pressure boundary, a restricted branch, and a machined port breaking into a channel need different regions of interest and reporting.

| Feature or concern | What to define before scanning | Evidence to request |
| --- | --- | --- |
| Wall between coolant and electronics | Critical region, final-state wall requirement, loading basis, and agreed decision rule | Registered sections and local wall measurements with uncertainty relevant to the feature |
| Port-to-channel transition | Finished port geometry, machining datum, and required remaining material | Model-to-scan registration and measurements at the actual transition |
| Narrow or branching passage | Critical cross-sections, permissible geometric deviation, and accessible inspection route | Local section measurements and a separate functional flow result |
| Internal indication near a sealing land | Location, morphology, size descriptors, and escalation responsibility | Annotated indication map and disposition, not only an overall porosity percentage |

The engineering owner sets the acceptance limits from the design and applicable requirements. A supplier should not invent a generic “production class” that silently substitutes for those limits. Read the [printed-channel and machined-port tolerance guide](/posts/EngineeringGuide/tolerance-stack-up-for-copper-am-parts-with-printed-channels-and-machined-ports/) before fixing the inspection region.

## Voxel size is not a guaranteed detection limit

Ask the inspection provider to explain whether the selected setup can answer the specific feature question through the relevant copper section. Record acquisition settings, reconstruction and segmentation approach, part orientation, and any region that cannot be evaluated confidently.

Nominal voxel size alone is not a dimensional uncertainty statement or a guarantee that every defect of that size will be found. NIST research shows that acquisition parameters affect image noise and the probability of detecting simulated AM defects. It does not establish a universal copper cold plate threshold. [NIST study on CT acquisition and detection](https://www.nist.gov/publications/influence-x-ray-computed-tomography-acquisition-parameters-image-quality-and).

For dimensional acceptance, agree how the measurement result and its uncertainty enter the decision. The need for traceability and quantitative uncertainty is discussed in [NIST work on dimensional CT traceability](https://www.nist.gov/publications/charting-course-towards-dimensional-measurement-traceability-x-ray-computed-tomography). Do not replace that discussion with an unsupported rule such as “three voxels always passes.”

## Define pass, fail, and indeterminate before the first article

A useful acceptance plan allows an **indeterminate** result. If an artifact obscures the critical wall, reporting “no defect detected” without that limitation is not a defensible release decision.

- **Pass:** the agreed method adequately evaluates the required region and the result satisfies the stated decision rule.
- **Fail:** the evaluated result violates a controlled requirement. Record the feature, evidence, and disposition authority.
- **Indeterminate:** coverage, contrast, uncertainty, or an ambiguous indication prevents a reliable decision. Hold release of the affected requirement while the owner agrees another scan setup, another method, a representative section, or a design change.

These are proposed workflow states, not standardized cold plate quality classes. Rework, impregnation, local repair, or changed acceptance limits require explicit engineering approval and a revised verification plan. They are not automatic remedies for a thin pressure boundary.

## Keep CT, leak, proof, and flow results separate

A leak result must identify the test method, medium, pressure reference, temperature or stabilization controls, fixture boundary, limit and units, instrument capability, and tested part state. Fixture leakage must be distinguished from part leakage. “Helium tested” without these fields cannot be compared across suppliers.

Proof testing addresses the agreed pressure-loading requirement; it is not the same as measuring leakage sensitivity. Define the pressure and sequence through the responsible engineering process, not a multiplier copied from a general article. Testing pressure systems also requires a suitable safety procedure.

Flow testing can reveal a restriction but may not identify its location. Total flow can also conceal unequal branches. Where distribution matters, use the [multi-passage flow acceptance guide](/posts/EngineeringGuide/flow-distribution-acceptance-testing-multi-passage-copper-heat-exchangers/). Cleaning verification remains a separate requirement; see [internal-channel powder removal](/posts/EngineeringGuide/copper-am-cleaning-powder-removal-internal-channels/).

## A release record that a buyer can actually review

For each critical requirement, request:

1. Part identifier, drawing revision, material and final processing state.
2. Feature or region of interest and the controlled requirement reference.
3. Inspection procedure, equipment identity, coverage and relevant capability limitations.
4. Result, units, uncertainty or detection qualification where applicable, and supporting images or data.
5. Pass, fail, or indeterminate disposition with the approving role and any open concession.

For metal powder-bed-fusion parts, [ISO/ASTM 52908:2023](https://www.iso.org/standard/81779.html) addresses qualification, quality assurance, post-processing, inspection and testing. The public scope does not supply the part-specific wall, pore, proof-pressure or leakage limits for this checklist.

## Common procurement questions

### Does every cold plate need a full-volume CT scan?

No universal requirement is established here. Select coverage according to inaccessible features, failure consequences, process evidence, contractual requirements and demonstrated inspection capability. Accessible dimensions may be better measured directly.

### Can a low porosity percentage replace a leak test?

No. An overall percentage does not describe every indication's location, connectivity, or relationship to the finished pressure boundary. Keep the functional leakage requirement and its evidence.

### What should be sent before the inspection plan is settled?

Send the available CAD, critical regions, coolant and operating requirements, and the consequence of leakage or blockage. Mark unresolved limits as open questions. The [cold plate RFQ checklist](/posts/EngineeringGuide/rfq-checklist-custom-3d-printed-copper-cold-plates/) helps separate early review from released acceptance.

[Request a cold plate manufacturing and inspection review](/rfq/?project=heat-exchanger).
