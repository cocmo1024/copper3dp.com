---
title: 'Writing a Copper AM Material Specification When Strength and Conductivity Both Matter'
publishDate: 2026-07-18
excerpt: 'A procurement-ready method for specifying copper AM parts when minimum conductivity and mechanical properties must be achieved in the same delivered material state.'
category: Engineering Guide
tags:
  [
    'copper-am-material-specification',
    'cucrzr',
    'cucr1zr',
    'electrical-conductivity',
    'mechanical-properties',
    'heat-treatment',
    'qualification-coupons',
    'rfq-specification',
  ]
author: 'COPPER 3DP Engineering'
metadata:
  title: 'Copper AM Material Specification: Strength and Conductivity'
  description: 'Write a copper AM material specification that controls alloy route, final state, conductivity, strength, test methods, coupons, and change approval.'
  canonical: https://copper3dp.com/posts/EngineeringGuide/writing-a-copper-am-material-specification-when-strength-and-conductivity-both-matter/
---

> When strength and conductivity both matter, specify the copper AM part as one delivered material state with two measurable property gates. Name the allowed alloy route, final heat-treated and finished condition, minimum conductivity, minimum mechanical property, test methods, specimen orientation and location, coupon-to-part relationship, part-level functional tests, and changes that require approval. Do not combine the best conductivity from one heat treatment with the best strength from another data-sheet condition.

A request such as "CuCrZr, high strength, high conductivity" is not an acceptance specification. It identifies a material family and two desired outcomes, but it does not tell a supplier which balance is required or how the finished component will be judged.

This page closes that procurement decision. The [copper alloy selection guide](/posts/EngineeringGuide/copper-alloy-selection-metal-3d-printing-pure-cu-cucrzr-cucr1zr/) helps choose among pure Cu, CuCrZr, and CuCr1Zr. The [CuCrZr heat-treatment guide](/posts/EngineeringGuide/heat-treatment-cucrzr-3d-printed-components/) explains why different thermal routes produce different balances. This guide starts after that review: it turns the selected balance into drawing and RFQ language that can be quoted and tested.

## Start with Two Gates, Not Two Superlatives

"Maximum conductivity" and "maximum strength" are usually competing directions for precipitation-hardenable copper alloys. The specification should therefore separate non-negotiable limits from properties that may be optimized.

| Requirement role | Example | How to write it |
| --- | --- | --- |
| Functional gate | The current path must stay below a defined resistance or temperature rise | State the operating condition and part-level test |
| Material gate | Conductivity must not fall below an approved value | State value, units, temperature, method, specimen, and material state |
| Mechanical gate | Threads, pressure boundary, or clamp-loaded face needs a minimum property | State yield strength, tensile strength, hardness, or another justified property |
| Optimization target | Lower pressure drop, higher conductivity, lower mass, or shorter lead time is preferred | Mark it as an optimization, not an additional pass/fail limit |
| Evidence gate | The buyer needs traceability or qualification records | State coupon, report, lot, build, and change-control requirements |

If the component only needs conductivity, [specify the pure copper LPBF part by its finished conductivity](/posts/EngineeringGuide/specifying-pure-copper-lpbf-parts-by-finished-conductivity-not-powder-grade/). If threads, pressure, repeated assembly, or flatness retention create a real load path, review [when CuCrZr is the better starting route](/posts/EngineeringGuide/when-cucrzr-is-better-for-threaded-and-pressure-boundary-copper-am-parts/).

## Public Data Shows Why One Material Name Is Not Enough

Current supplier data sheets make the trade-off visible, but their values are route-specific evidence rather than universal design allowables.

The current [EOS CopperAlloy CuCrZr material data](https://www.eos.info/metal-solutions/data-sheets/all-processes-and-materials?id=eos-copperalloy-cucrzr) publishes separate conductivity-optimized and tensile-optimized aging routes for a named system, powder, parameter set, layer thickness, orientation, and test method. Its reported typical electrical conductivity changes with the selected route, as do tensile properties and hardness. That is direct evidence that "heat treated CuCrZr" is not one property condition.

The [3D Systems Certified CuCr1Zr(A) data sheet](https://www.3dsystems.com/sites/default/files/2023-07/3d-systems-certified-cucr1zra-material-datasheet-usen-2023-07-14-a-web_0.pdf) shows the same decision from another qualified route. Its published 500 C and 700 C conditions do not deliver the same balance: the condition reporting higher conductivity reports lower tensile and yield strength. The values belong to that supplier's named material-process route and test basis. They should not be copied into another supplier's quotation without route evidence.

Use those documents to frame the question, not to promise the answer. The supplier should identify the proposed machine-material-process route and provide evidence for the property combination being quoted.

## Write the Specification in Seven Linked Blocks

### 1. Define the function and controlling failure

State what the component must do before naming an alloy. Useful inputs include current, heat load, allowable temperature rise, working and proof pressure, clamp load, thread torque, thermal cycles, service temperature, vibration, wear, and required life.

Then identify the failure that the material requirement is intended to prevent:

- Excess electrical resistance or thermal resistance.
- Yielding around a threaded port or sealing land.
- Loss of flatness under clamp load or after thermal processing.
- Fatigue or distortion during pressure or temperature cycling.
- Softening during later brazing, soldering, or service exposure.

A tensile requirement is weak if the actual failure is thread stripping. A hardness requirement is weak if the actual failure is pressure leakage through a local defect. Keep the material property connected to the component failure.

### 2. Name the allowed material route

Use one of three approaches:

| Material-control approach | Use when | Required wording |
| --- | --- | --- |
| Exact designation | Drawing, standard, or qualification requires CuCr1Zr, C18150, CW106C, or another named route | Name the designation and substitution approval path |
| Approved alternatives | More than one copper-chromium-zirconium route may work | List acceptable designations and require supplier evidence for the proposed route |
| Performance-led selection | Prototype function is known but alloy is still open | State property and functional gates; ask the supplier to propose pure Cu, CuCrZr, CuCr1Zr, or another justified route |

CuCrZr, CuCr1Zr, C18150, and CW106C can overlap in chemistry and application language. They are not automatically interchangeable in a controlled program. Powder specification, machine, process parameters, heat treatment, test specimens, and customer approval still define the accepted route. The [CuCr1Zr industrial components guide](/posts/EngineeringGuide/cucr1zr-copper-alloy-3d-printing-industrial-components/) explains how to control that designation question.

### 3. Freeze the delivered material state

The acceptance state should include every operation that can affect the measured property or functional interface:

- As-built, stress-relieved, solution treated, aged, annealed, or supplier-qualified thermal state.
- Build-plate removal and support removal sequence.
- Rough and finish machining.
- Brazing, soldering, welding, hot isostatic pressing, or later thermal exposure.
- Polishing, plating, coating, cleaning, and final assembly condition.
- Test temperature and stabilization condition.

Do not accept a coupon tested before a later heat cycle as proof of the delivered state unless the transfer is justified. The requirement should say whether the supplier controls a qualified recipe or whether the buyer requires a named cycle. For most custom industrial RFQs, a qualified supplier route plus property evidence is safer than prescribing an unverified furnace recipe.

### 4. Define the conductivity gate completely

A conductivity line needs more than a number:

1. Minimum value and units, such as %IACS or MS/m.
2. Reference temperature, normally stated explicitly rather than assumed.
3. Test method.
4. Specimen form, surface preparation, and accessible test area.
5. Build orientation and build-platform location where relevant.
6. Final material state.
7. Sample count and acceptance rule.

[ASTM E1004-23](https://store.astm.org/e1004-23.html) covers eddy-current conductivity measurements on suitable nonmagnetic material surfaces and notes sensitivity to factors such as alloy, aging, deformation, heat treatment, and overheating. It is useful for appropriate flat or slightly curved specimens, but a rough, thin, inaccessible, or strongly curved feature may need another method or a representative coupon.

Bulk conductivity does not prove a bolted electrical interface, thermal contact face, or RF surface. Add a finished-part resistance, temperature-rise, thermal-resistance, or RF test when the interface controls performance. The [electrical conductivity guide](/posts/EngineeringGuide/electrical-conductivity-in-3d-printed-copper-parts/) separates bulk, contact, and component-level evidence.

### 5. Define the mechanical gate that represents the load

Use the property that is connected to the failure mode:

| Failure concern | Possible material evidence | Part-level evidence still needed |
| --- | --- | --- |
| Gross yielding | Yield and tensile properties | Proof load, pressure, or dimensional check where applicable |
| Thread or local bearing damage | Hardness plus geometry and material state | Thread gauge, torque or pull-out plan if critical |
| Flatness retention | Material state and dimensional stability evidence | CMM after final heat treatment and machining |
| Fatigue or thermal cycling | Program-specific fatigue evidence | Defined pressure or thermal-cycle test |
| Wear | Hardness and surface condition | Application-specific wear test where justified |

[ISO 6892-1:2019](https://www.iso.org/standard/78322.html), confirmed current in 2025, defines room-temperature tensile testing of metallic materials. [ISO 6507-1:2023](https://www.iso.org/standard/83898.html) defines Vickers hardness testing. Neither standard makes a remote witness coupon automatically representative of a complex copper AM part.

[ISO/ASTM 52909:2024](https://www.iso.org/standard/87956.html) specifically addresses reporting orientation and location dependence when evaluating mechanical properties of additively manufactured metal. Use that principle in the coupon plan: record orientation, location, whether the specimen was built separately or extracted, and the thermal history it shared with the part.

### 6. Connect coupons to the finished part

The specification should state what a coupon proves and what it does not.

| Transfer question | Stronger evidence | Weak evidence |
| --- | --- | --- |
| Same process route? | Same machine, released parameter set, powder control, and build | Generic supplier brochure |
| Same thermal state? | Coupon processed in the same furnace load or controlled equivalent route | Coupon tested before final aging or brazing |
| Same orientation and location? | Orientation and platform position reported and justified | Unidentified cube from another build |
| Same geometry risk? | Part-level test or representative feature coupon | Bulk bar used to infer a thin wall or pressure channel |
| Same acceptance temperature? | Test temperature stated and corrected as required | Context-free %IACS value |

[ISO/ASTM 52920:2023](https://www.iso.org/standard/76911.html) defines quality-relevant controls across industrial AM production processes. For an RFQ, the practical application is traceability: connect the accepted result to the powder, machine, build record, post-processing route, inspection record, and approved deviations.

### 7. Define change control

Require review before changing any variable that could invalidate the property balance:

- Material designation or powder source.
- Machine family or released parameter set.
- Layer thickness, build orientation, or coupon location strategy.
- Heat-treatment route or furnace subcontractor.
- Machining, brazing, plating, or cleaning sequence.
- Conductivity, tensile, hardness, or functional test method.
- Geometry that changes section thickness, thermal mass, pressure boundary, or load path.

The change list should be proportional to the project. A one-off feasibility prototype does not need the same controls as repeat semiconductor, aerospace, RF, or power-electronics hardware. It still needs the quoted assumptions to be visible.

## A Procurement-Ready Requirement Pattern

The following structure is a template, not a universal material specification. Replace bracketed fields with project requirements and obtain design-authority approval.

> Material route: [exact designation / approved alternatives / supplier proposal]. Supplier shall identify powder designation, machine-material-process route, final heat treatment, and any proposed substitution. The delivered material state includes all thermal processing, machining, joining, plating, and cleaning operations listed in the quotation.

> Conductivity: minimum [value and units] at [temperature], measured by [method] on [coupon or part location] in the final delivered material state. Report specimen orientation, build relationship, surface preparation, sample count, and result.

> Mechanical property: minimum [yield strength / tensile strength / hardness / other justified property] by [method] on [specimen] in the same final material state. Report orientation and whether the specimen was co-built, separately built, or extracted.

> Component acceptance: [pressure, leak, flow, resistance, temperature-rise, flatness, torque, cycle, or other functional test] under [boundary conditions]. Coupon compliance does not replace the listed component tests.

> Change control: changes to material designation, powder source, machine family, released process, heat treatment, post-processing sequence, test method, or approved geometry require notification and approval before manufacture.

This format avoids false precision. It defines the result and evidence while allowing a qualified supplier to propose a route that has actually been validated.

## When the Proposed Specification Should Be Returned

Return the specification for engineering clarification when:

- It combines the highest strength from one condition with the highest conductivity from another.
- It names CuCrZr or CuCr1Zr but omits the final heat-treated state.
- It specifies a property value without a method, temperature, specimen, or orientation.
- It relies on a coupon that does not share the final thermal sequence.
- It treats hardness as proof of pressure integrity or conductivity as proof of contact performance.
- It requires an exact alloy but allows undocumented substitution.
- It requires tight finished-part performance but prices only a printed blank.
- It provides no operating load or acceptance condition from which a supplier can judge the target.

These are not reasons to reject copper AM. They are reasons to stop an untestable contract requirement from reaching production.

## RFQ Inputs for a Strength-and-Conductivity Specification

Send the following for a focused project review:

1. Native CAD or STEP plus a controlled drawing revision.
2. Material designation, allowed alternatives, and governing standard if applicable.
3. Current, heat load, allowable temperature rise, pressure, clamp load, torque, cycles, and service temperature as relevant.
4. Minimum conductivity and mechanical property targets, including methods and test temperature.
5. Critical surfaces, threads, pressure boundaries, internal channels, and required machining stock.
6. Final heat treatment, joining, plating, cleaning, and assembly state.
7. Coupon orientation, location, sample count, and traceability expectations.
8. Part-level functional tests and acceptance limits.
9. Quantity, first-article scope, repeat-build expectations, and required records.
10. Open assumptions that the supplier must resolve in the quotation.

Use the [materials decision cluster](/knowledge/decision-guides/materials-selection/) to review the alloy route, or send the package through the [secure RFQ form](/rfq/#rfq-form) for supplier coordination and a scoped manufacturing review.

## FAQ

### Should a drawing specify both minimum conductivity and minimum strength?

Yes, when both are necessary to prevent defined component failures. State both in the same delivered material condition and identify which property is the hard gate if the supplier cannot meet both targets with a qualified route.

### Can a supplier data-sheet value be copied directly into the drawing?

Only when the proposed supplier route, material, machine, process condition, heat treatment, specimen, orientation, and test method support the transfer. A public data sheet is a route reference, not a guarantee for another geometry or supplier.

### Is hardness an acceptable substitute for tensile testing?

Not automatically. Hardness can be a practical process-control indicator, but its relationship to tensile behavior must be justified for the material route. Use the property and test that represent the controlling failure and program requirement.

### Must the buyer prescribe the exact heat-treatment temperature and time?

Not in every project. When the supplier owns a qualified route, it is often better to specify the required final state and evidence while requiring disclosure of the proposed route. Prescribe an exact cycle when a governing drawing, standard, or qualification plan requires it.

## Decision

A strong copper AM material specification does not ask for the best possible properties. It asks for a defensible property balance in one final state, supported by named tests and connected to the finished component's failure modes.

Freeze the material route, final thermal and finishing state, conductivity gate, mechanical gate, coupon relationship, part-level tests, and change controls before comparing quotations. That makes supplier responses comparable and prevents a material keyword from becoming a false acceptance claim.
