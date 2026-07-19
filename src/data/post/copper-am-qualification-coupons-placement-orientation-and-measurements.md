---
title: 'Copper AM Qualification Coupons: Placement, Orientation, and Measurements'
publishDate: 2026-07-20
excerpt: 'Plan copper AM qualification coupons by the risk they represent, their build location and orientation, final processing state, measurement method, and relationship to part-level acceptance.'
category: Engineering Guide
tags:
  [
    'copper-am',
    'qualification-coupons',
    'witness-coupons',
    'build-orientation',
    'electrical-conductivity',
    'cucrzr',
    'quality-inspection',
    'rfq-specification',
  ]
author: 'COPPER 3DP Engineering'
metadata:
  title: 'Copper AM Qualification Coupon Planning'
  description: 'Plan copper AM coupon placement, orientation, final state, conductivity, density, hardness, tensile testing, traceability, and acceptance.'
  canonical: https://copper3dp.com/posts/EngineeringGuide/copper-am-qualification-coupons-placement-orientation-and-measurements/
---

> A copper AM qualification coupon is useful only when it represents a named risk in the delivered part. Define what the coupon must prove, where and how it is built, its orientation, the complete heat-treatment and finishing state, the measurement method, and the decision that follows a pass or fail. A convenient coupon placed anywhere on the build plate is evidence of that coupon, not automatic proof of the part.

Copper LPBF projects often request density, electrical conductivity, hardness, tensile, microstructure, or chemistry evidence. The weak version of that request is simply "include coupons." It does not say whether the coupon is intended to qualify a material route, monitor a build, support first-article acceptance, or investigate a local feature.

That ambiguity creates two commercial risks. The buyer may pay for tests that do not close the actual failure mode. The supplier may also report a good coupon result while the finished component remains unverified at a thin pressure wall, machined contact pad, threaded port, or hidden channel.

This guide owns the coupon-allocation decision. The broader [copper AM prototype build plan](/posts/EngineeringGuide/copper-am-prototype-build-planning/) connects coupons to machining stock, part tests, and first-article disposition. The [quality and qualification center](/knowledge/quality-and-qualification/) explains the complete evidence chain. Use this page when the open question is exactly where coupons belong, which direction they represent, what to measure, and how far the result can be transferred to the part.

## Start With the Decision, Not the Coupon Shape

Write one sentence for every proposed specimen:

```text
This coupon will determine whether [identified material or process state]
meets [requirement] when measured by [method] after [complete process state],
and the result will trigger [release, review, additional evidence, or rejection].
```

If that sentence cannot be completed, the coupon probably has no controlled job.

| Engineering question | Coupon can support | Coupon cannot prove by itself |
| --- | --- | --- |
| Did the qualified route reach the required conductivity state? | Conductivity or resistivity from a defined specimen in the final thermal state | Contact resistance, current crowding, coating performance, or temperature rise in the assembly |
| Is the CuCrZr heat treatment in the intended property window? | Hardness, conductivity, tensile, or microstructure evidence tied to the same cycle | Thread load, sealing-face stability, or pressure integrity in the actual geometry |
| Is the build producing acceptable internal material? | Density, metallography, chemistry, or CT on a traceable specimen | Local minimum wall, channel blockage, or a defect at a part-specific stress concentration |
| Does build direction affect a required mechanical property? | Directionally identified tensile or other mechanical specimens | Every multiaxial load path in a complex part |
| Is a geometric feature repeatable? | A representative feature artifact with defined orientation and measurement | A different feature at another scale, surface angle, or post-process state |

[ISO/ASTM 52927:2024](https://www.iso.org/standard/81802.html) identifies AM quality characteristics, corresponding test procedures, specimen-building procedures, and the content of test and supply agreements. Its framework is useful for coupon planning. Its published scope also notes that electrical and thermal characteristics are intended for future inclusion, so a copper project still needs a specific, agreed electrical or thermal test method rather than treating the standard as a complete conductivity specification.

## Choose the Evidence Class Before the Location

Not every coupon serves the same purpose.

### Route-development specimen

Use this to compare process or heat-treatment options before a production baseline is released. It can be built in a designed experiment and does not need to travel with every customer part. Its result should not be presented as lot acceptance for later production unless the qualification plan establishes that link.

### Qualification specimen

Use this to establish capability for a defined material-machine-process-post-process route. The specimen set, locations, orientations, measurements, and repetition should reflect the qualification objective. [ISO/ASTM 52920:2023](https://www.iso.org/standard/76911.html) addresses quality-relevant factors and assurance measures across industrial AM production; a coupon is one element in that controlled system, not a substitute for it.

### Co-built witness coupon

Use this to monitor a named build or lot. It should remain traceable to the build layout, powder and route records, thermal processing load, and test report. Co-built does not automatically mean representative: location, height, orientation, local scan conditions, and post-processing still need review.

### Part-extracted specimen

Use this when the material state at a part location must be measured and sacrificial hardware or an approved prolongation is available. This can improve location relevance but may change local heat flow, require destructive removal, or leave a nonrepresentative specimen after machining. The extraction plan belongs in the released definition.

### Geometry or process-monitoring artifact

Use this for dimensional capability, surface, channel, distortion, or inspection-method questions. [ISO/ASTM 52902:2023](https://www.iso.org/standard/79683.html) covers test artifacts for geometric capability assessment. A system artifact can support process capability; it does not prove every hidden feature in a customer part.

## Place Coupons to Test a Hypothesis

There is no universally correct edge, center, corner, or part-adjacent location. Placement should test a process-risk hypothesis or follow an approved baseline.

| Placement choice | What it can investigate | Limitation to record |
| --- | --- | --- |
| Near the part | Similar plate region and local build timing | Part geometry can change local heat flow and gas/recoater exposure; adjacency alone does not prove equivalence |
| Build-plate center and perimeter | Spatial variation across the qualified build area | Additional specimens and tests add cost; one build does not establish long-term capability |
| Upstream and downstream relative to gas flow | Sensitivity to process-zone position under the qualified layout | The relevant direction is machine and route specific; do not generalize to another platform |
| Across recoater travel | Potential layout or recoater-direction sensitivity | The result is meaningful only with the actual layout and machine coordinates retained |
| At different build heights | Height-dependent thermal or atmosphere history | Short plate coupons do not sample the upper layers of a tall part |
| In a sacrificial part feature | Local material near a critical region | The added feature can alter support, heat flow, machining, or part function |

The build-layout record should identify machine coordinates, build direction, gas-flow and recoater references where relevant, part and specimen IDs, and any approved layout restrictions. "Coupon A was on the left" is not transferable evidence.

Do not add locations merely to create more data. If edge-to-center variation is already bounded by a released process qualification and the current build remains inside that baseline, one agreed witness strategy may be enough. If the part uses a new tall geometry, fills a previously unused build zone, or changes thermal loading substantially, the previous placement strategy may need review.

## Match Orientation to the Property Direction

Orientation has at least three separate meanings:

1. The specimen axis relative to the AM build direction.
2. The specimen's position and rotation in the machine coordinate system.
3. The direction in which the finished property is measured or loaded.

Record all three where they affect interpretation.

[ISO/ASTM 52909:2024](https://www.iso.org/standard/87956.html) provides guidance for measuring and reporting orientation- and location-dependent mechanical properties of AM metal specimens. It is directly relevant to tensile and other mechanical evidence. It does not justify applying a mechanical orientation rule automatically to electrical conductivity, thermal conductivity, hardness, density, or a geometry artifact; those measurements need their own specimen and method logic.

For a copper component, ask:

- Is the critical service load parallel, transverse, or multiaxial relative to the build direction?
- Is current flow through a contact pad, a long conductor, or a complex three-dimensional path?
- Does the selected conductivity method require a flat surface, a defined gauge length, or a machined bar?
- Will the coupon be tested as-built, machined, polished, plated, or after assembly-like thermal exposure?
- Does the part include thin walls or local scan lengths that a bulk coupon cannot represent?

A vertical tensile bar and a flat conductivity coupon can belong to the same build while answering different questions. They should not be grouped under one vague "material coupon" line.

## Measure the Final State That the Requirement Names

The coupon traveler should follow every operation that can change the reported result.

| Measurement | State and method questions to close | Transfer limit |
| --- | --- | --- |
| Electrical conductivity or resistivity | Alloy, heat treatment, test temperature, geometry, surface preparation, direction, calibration, unit | Does not establish contact or assembly resistance |
| Relative density | Method, specimen preparation, open versus closed porosity sensitivity, sampling region, reporting basis | A bulk value can miss local pore morphology or part-specific defects |
| Hardness | Scale, load, surface preparation, location, thickness, heat-treatment condition | Local hardness is not a complete strength or fatigue qualification |
| Tensile properties | Specimen standard, axis, extraction/build method, surface state, strain measurement, temperature | Selected specimens do not fully represent every part location or service load |
| Metallography | Section plane, preparation, etch, fields examined, magnification, pore and microstructure reporting | A small section samples only the examined volume |
| Chemistry or oxygen | Sampling method, laboratory method, contamination control, reporting unit | A coupon result may not localize surface oxide or trapped contamination in a channel |
| Geometric feature | Nominal geometry, orientation, surface type, measurement system, uncertainty | Capability for one feature does not transfer automatically to another size or angle |

For nonmagnetic copper materials, [ASTM E1004-23](https://store.astm.org/e1004-23.html) covers eddy-current electrical conductivity measurements on flat or slightly curved surfaces. The method's geometry and surface assumptions matter. [ASTM B193](https://store.astm.org/standards/b193) is a resistivity method for electrical conductor materials and may require a different specimen approach. The RFQ should name the selected method or allow the supplier and test laboratory to propose one for approval.

The public [3D Systems CuCr1Zr material data sheet](https://es.3dsystems.com/sites/default/files/2023-07/3d-systems-certified-cucr1zra-material-datasheet-usen-2023-07-14-a-web_0.pdf) is a useful example of evidence boundaries: it identifies the conductivity method, specimen orientation for reported mechanical data, heat-treatment conditions, and limited sample populations. Those disclosures support market feasibility for that named route. They are not guaranteed acceptance values for another supplier, machine, geometry, or coupon plan.

## Preserve Coupon Pedigree Through Post-Processing

A good as-built coupon can become irrelevant if it does not share the delivered state.

The record should connect:

- Material designation and powder lot or controlled powder history.
- Machine, released process route, build ID, layout, location, and orientation.
- Plate removal and support-removal sequence.
- Stress relief, solution treatment, aging, or other thermal cycles.
- Whether the coupon shared the same furnace load and fixture condition as the part.
- Machining, grinding, polishing, coating, and cleaning before testing.
- Specimen extraction and final dimensions.
- Test laboratory, method revision, equipment, calibration status, temperature, and uncertainty where relevant.
- Raw result, corrected result if applicable, acceptance limit, and disposition.

If a CuCrZr coupon is aged separately from the part, the qualification plan must explain why it still represents the delivered state. If conductivity is measured before plating but the failure mode is a plated contact, keep the bulk-material result and add the interface evidence; do not relabel one as the other.

## Separate Coupon Acceptance From Part Acceptance

Use a two-column acceptance plan.

| Coupon or process evidence | Finished-part evidence |
| --- | --- |
| Material identity and route traceability | Correct part and drawing revision |
| Conductivity, hardness, tensile, density, or microstructure as required | Critical dimensions, datums, flatness, roughness, and remaining wall |
| Heat-treatment response | Machined interfaces and threads in final state |
| Build-location or orientation comparison | Channel continuity, cleanliness, flow, pressure, and leak evidence |
| Process-monitoring or geometric artifact | Contact resistance, thermal, RF, vacuum, or assembly function where required |

Release only when the required columns are closed. A passing coupon should not overrule a failed leak test, blocked passage, thin wall, damaged contact pad, or out-of-tolerance sealing face. A failed coupon also needs a defined disposition: quarantine the build, retest only if the procedure allows it, investigate traceability or method error, add part evidence, or reject the route.

## Scale the Plan to Production Maturity

### Development build

Use enough specimens to compare the variables that remain open. Record the experiment and do not present development values as routine production capability.

### First article

Use the released route, agreed witness strategy, final-state testing, complete part inspection, and functional evidence. Confirm that the coupon-to-part relationship is defensible before approving repeat builds.

### Controlled repeat production

Define which evidence is required every build, every lot, by sampling, or after a change event. Changes to powder source, machine family, parameter set, build zone, orientation, layout, heat treatment, test method, or critical geometry should trigger a documented review rather than an automatic reuse of old coupon data.

## RFQ Checklist for Copper AM Coupons

Provide or resolve:

1. Part function, material route, and consequence of the property missing its target.
2. Each coupon's decision purpose: development, qualification, witness, monitoring, or investigation.
3. Coupon geometry, applicable test method, quantity or sampling rationale.
4. Build location, machine coordinate references, build direction, and specimen axis.
5. Relationship to critical part features and any known transfer limitation.
6. Complete heat treatment, machining, surface, coating, and cleaning state at test.
7. Conductivity, density, hardness, tensile, metallography, chemistry, or geometry measurements required.
8. Test temperature, units, uncertainty or guard-band rule where relevant.
9. Traceability records and report content.
10. Part-level inspections and functional tests that remain mandatory.
11. Pass, fail, retest, concession, quarantine, and change-control rules.
12. Prototype quantity, repeat-build plan, and target delivery date.

Submit the drawing, requirement list, and proposed evidence plan through the [secure RFQ form](/rfq/#rfq-form), email [info@szcomo.com](mailto:info@szcomo.com), or use WhatsApp from the site header. COPPER 3DP coordinates the proposed material, supplier, post-processing, and inspection route; the customer and qualified provider must agree the project-specific acceptance values and governing requirements.

## FAQ

### How many qualification coupons should a copper AM build contain?

There is no universal number. The count follows the test method, qualification objective, sampling rationale, process maturity, build layout, and consequence of failure. Every specimen should close a named decision.

### Must a witness coupon be next to the part?

Not automatically. Part-adjacent placement can improve local relevance, but geometry, heat flow, gas flow, recoater direction, build height, and post-processing can still differ. Use the approved qualification logic rather than distance alone.

### Can one coupon support density, conductivity, and tensile acceptance?

Sometimes material from one parent coupon can support several tests, but specimen geometry, preparation, location, direction, and method requirements may conflict. Plan the extraction and sequence before the build and retain traceability for each result.

### Does a passing conductivity coupon prove a liquid-cooled busbar is acceptable?

No. It supports the bulk material state. The finished busbar may still require contact-surface inspection, resistance or temperature-rise evidence, channel cleanliness, pressure integrity, and flow acceptance.
