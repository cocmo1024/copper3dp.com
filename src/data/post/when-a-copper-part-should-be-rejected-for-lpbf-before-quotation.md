---
title: 'When a Copper Part Should Be Rejected for LPBF Before Quotation'
publishDate: 2026-07-17
excerpt: 'A pre-quotation go/no-go framework for rejecting, revising, conditionally quoting, or redirecting copper parts when LPBF cannot deliver a credible finished component.'
category: Engineering Guide
tags:
  [
    'copper-lpbf-feasibility',
    'pre-quotation-review',
    'copper-am-dfm',
    'process-selection',
    'supplier-qualification',
    'rfq-screening',
    'finished-part-acceptance',
    'buyer-guide',
  ]
author: 'COPPER 3DP Engineering'
metadata:
  title: 'When to Reject a Copper Part for LPBF'
  description: 'Use this copper LPBF pre-quotation framework to accept, conditionally quote, redesign, or redirect parts with material, geometry, finishing, or test gaps.'
  canonical: https://copper3dp.com/posts/EngineeringGuide/when-a-copper-part-should-be-rejected-for-lpbf-before-quotation/
---

> Reject a copper part for LPBF before quotation when the route has no meaningful geometry or consolidation value, the part cannot be depowdered or cleaned, critical surfaces cannot be finished, the required material state is unsupported, critical failure modes cannot be verified, or the available information is too incomplete for a responsible fixed scope. In most cases, reject the submitted route or design state, not the project: return it for missing inputs, redesign it, or redirect it to CNC, brazing, hybrid manufacture, another material, or another AM process.

"Rejected for LPBF" should not mean that a salesperson dislikes a difficult drawing. It should mean that a named engineering or commercial gate cannot close under the proposed route.

That distinction protects both buyer and supplier. It prevents a budgetary print price from being mistaken for a finished-component quotation, and it creates a useful next action instead of a vague "not printable" response.

This page owns the pre-quotation disposition. For general drawing inputs, use the [copper AM quotation checklist](/posts/EngineeringGuide/engineering-checklist-copper-3d-printed-part-quotation/). For geometry corrections, use [Common Design Mistakes in 3D Printed Copper Parts](/posts/EngineeringGuide/common-design-mistakes-in-3d-printed-copper-parts/).

## Use Four Outcomes, Not a Binary Yes or No

| Outcome | Use when | Commercial meaning |
| --- | --- | --- |
| Accept for quotation | The proposed route, assumptions, finishing, and acceptance basis are sufficiently defined | Prepare a scoped quotation |
| Quote with conditions | Feasibility is credible, but named inputs or design actions remain open | Price against an assumption register and revision gate |
| Return before quotation | The project may fit LPBF, but missing data or correctable geometry prevents a responsible scope | Request focused information or redesign |
| Reject LPBF and redirect | Another route offers lower technical, qualification, or commercial risk | Compare CNC, brazing, hybrid, another material, or another AM process |

The disposition should identify the failed gate, evidence, consequence, and next action. A rejection without that structure has little procurement value.

## Gate 1: Reject LPBF When AM Adds No Functional Value

Copper LPBF should not replace a strong conventional process without changing the functional result.

Redirect the part when it is primarily:

- A flat heat spreader, simple plate, spacer, or accessible copper block.
- A straight busbar or conductor with conventional bend and contact geometry.
- A part whose tight accessible surfaces dominate value and whose internal geometry is simple.
- A high-volume component that gains no measurable performance, consolidation, tooling, or supply advantage from additive manufacture.
- A geometry copied from CNC with no change except the production label.

LPBF becomes credible when it removes inaccessible drilling, multiple closures, brazed covers, complex manifolds, packaging compromises, or difficult low-volume tooling. The decision should compare finished routes, not printed and machined blanks.

Use the [copper AM versus CNC guide](/posts/EngineeringGuide/when-copper-3d-printing-is-better-than-cnc-machining/) to document this gate. A route redirect is especially important when the buyer is using AM only to pursue a shorter lead time; first-article build preparation, post-processing, inspection, and design clarification can make LPBF slower than a simple conventional route.

## Gate 2: Return or Reject an Undefined Material State

"Copper" is not a finished material specification.

Return the RFQ for clarification when the drawing requires conductivity, strength, hardness, heat-treatment condition, chemistry, or service-temperature performance but names no test method, specimen, direction, final state, or acceptance value. Reject the proposed LPBF route when no qualified material-process-post-processing combination can support the required state with proportionate evidence.

Separate three levels:

1. **Powder or feedstock identity:** useful for chemistry and traceability, but not proof of finished-part properties.
2. **Process or supplier data:** evidence that a defined route has produced reported properties under stated conditions.
3. **Project acceptance:** the coupon, part feature, or functional test agreed for the delivered geometry and final state.

[ISO/ASTM 52901](https://www.iso.org/standard/67288.html) organizes purchased AM parts around order information, part definition, feedstock, final characteristics, inspection, and acceptance. It supports a clear customer-provider agreement; it does not turn a generic alloy name into a property guarantee.

Use the [pure copper and CuCrZr decision center](/knowledge/decision-guides/materials-selection/) when conductivity and strength compete. If the requirement is finished conductivity, use the [finished-property specification guide](/posts/EngineeringGuide/specifying-pure-copper-lpbf-parts-by-finished-conductivity-not-powder-grade/).

## Gate 3: Reject Geometry Without a Credible Build and Depowdering Route

A part should be returned before quotation when critical internal geometry is hidden from the supplied files, when the longest enclosed route and access points are unknown, or when the proposed model contains volumes that cannot be emptied under any credible orientation and cleaning concept.

Hard-stop examples include:

- A sealed internal cavity that is not intended to retain powder and has no process opening.
- A critical channel network with blind branches and no defined removal, flushing, or verification path.
- Remaining wall near a port, seal, or machined feature that cannot survive the proposed finishing allowance.
- A required no-support surface that cannot be oriented, supported, or finished under the selected route.
- A topology that cannot fit the qualified build envelope with the required support and removal access.

Do not reject from one generic minimum-wall or minimum-channel number. [ISO/ASTM 52911-1:2019](https://www.iso.org/standard/72951.html) provides laser-PBF metal design guidance, but supplier capability still depends on material, machine, parameters, orientation, geometry, post-processing, and inspection.

For a staged review, use the [hidden-channel DFM workflow](/posts/EngineeringGuide/copper-am-dfm-review-workflow-for-parts-with-hidden-internal-channels/). For detailed cleaning logic, use the [copper AM internal-channel cleaning guide](/posts/EngineeringGuide/copper-am-cleaning-powder-removal-internal-channels/).

## Gate 4: Reject a Near-Net Shape That Cannot Become the Finished Part

LPBF may create the geometry and still fail the manufacturing route.

Return or redirect the part when:

- A sealing land, thermal face, contact pad, datum, thread, port, or RF interface needs machining but has no stock or tool access.
- Heat treatment can move a critical surface, but the sequence and recovery stock are not allowed.
- Supports cannot be removed without damaging a functional area.
- An internal surface requires polishing, plating, coating, or cleanliness that the selected route cannot reach or verify.
- A temporary process opening has no acceptable closure and inspection method.
- The finished tolerance depends on an inaccessible feature that cannot be measured with suitable capability.

The correct comparison is the finished accepted component. A quotation for an as-built body should not be accepted when the purchase requirement is a machined, cleaned, plated, leak-tight, or conductivity-verified assembly.

## Gate 5: Reject Acceptance Language That Cannot Detect the Failure

"CT pass," "fully dense," "pressure tested," and "high conductivity" are not complete acceptance requirements.

Reject or condition the quotation when the proposed evidence does not answer the credible failure mode.

| Requirement language | Why it is insufficient | Better decision input |
| --- | --- | --- |
| Fully dense | Density method, sensitivity, sampled volume, and defect criticality are undefined | Named method plus part-relevant defect or functional acceptance |
| CT pass | Region, resolution, artifact control, analysis, and decision rule are missing | Defined CT question, region, setup basis, and acceptance logic |
| Pressure tested | Medium, pressure, ramp, dwell, temperature, fixture, and damage criterion are missing | Complete proof procedure plus separate leak requirement if needed |
| No leaks | Method sensitivity, boundary, pressure differential, units, and final state are missing | Quantified leak method and pass/fail threshold |
| Channels open | Total flow may hide branch restriction | Flow/pressure-drop points and distribution evidence where needed |
| High conductivity | Test method, temperature, orientation, location, and final condition are missing | Finished-state conductivity or functional electrical requirement |
| Clean | Particle, residue, fluid compatibility, drying, and packaging basis are missing | Defined cleaning process and project-appropriate cleanliness evidence |

[ASTM F3637-23](https://store.astm.org/f3637-23.html) explains that density methods have different sensitivities and uncertainties and that internal channels can affect measurement. It also links flaw acceptance to size, location, and criticality. Therefore, one density value should not be used as a universal release criterion for every copper AM part.

[ISO/ASTM 52908:2023](https://www.iso.org/standard/81779.html) provides a framework for qualification, post-processing, inspection, and testing of metal PBF parts. Project-specific values still belong in the customer-provider agreement.

## Gate 6: Reject Supplier Evidence That Does Not Match the Proposed Route

A machine brochure, material data sheet, or public case can support feasibility screening. It does not qualify the supplier route for the submitted part.

Before quotation, confirm that the proposed supply scope can identify:

- The actual manufacturing supplier and qualified machine-material route.
- Powder or material specification and required traceability.
- Heat treatment, machining, cleaning, plating, and other subcontracted operations.
- Relevant process and property evidence with stated conditions.
- Inspection methods, external laboratories where used, report ownership, and acceptance responsibility.
- Change-control expectations between first article and repeat builds.

[ISO/ASTM 52920:2023](https://www.iso.org/standard/76911.html) addresses quality-assurance measures across industrial AM production activities. The practical screening point is simple: quality comes from an identified and controlled route, not from a machine model alone.

COPPER 3DP coordinates project evaluation and qualified supply options. It does not claim that public equipment, customer parts, or test results are owned results. A quotation must define the proposed production and acceptance scope for the project.

## Gate 7: Reject an Economically False Comparison

Some technically feasible parts should still be redirected before quotation because LPBF is solving the wrong commercial problem.

Compare:

- Printed blank versus finished accepted component.
- Build preparation, supports, powder removal, heat treatment, machining, finishing, inspection, and documentation.
- First-article learning, fixture needs, and possible design revision.
- Conventional route joints, plugs, brazes, tooling, scrap, leak testing, and assembly labor.
- Prototype quantity, repeat quantity, design volatility, and expected life of the part definition.
- Actual production schedule and material availability, not an assumed "3D printing is fast" lead time.

Redirect LPBF when conventional manufacture meets the same function with less total risk and no unacceptable geometry compromise. Keep LPBF in the comparison when it removes enough joints, fixtures, tool-access limits, or functional compromise to offset its process and evidence burden.

## Hard Stop, Missing Input, or Design Revision?

Use the right disposition so a correctable project is not discarded.

| Finding | Disposition | Example next action |
| --- | --- | --- |
| No functional reason for AM | Redirect route | Price CNC, brazing, or hybrid manufacture |
| Operating pressure or conductivity target unknown | Return for input or condition quote | Customer supplies value or accepts named assumption |
| Blind powder trap with a practical access redesign | Revise and resubmit | Add access, change topology, or split the part |
| Critical hidden volume cannot be cleaned or verified | Reject proposed LPBF design | Redesign geometry or choose another process |
| Material route plausible but test method undefined | Conditional quotation | Agree final-state method before release |
| Critical face lacks machining stock | Revise model | Define near-net blank, stock, datum, and remaining wall |
| Public data exists but proposed supplier evidence is absent | Hold quotation | Identify actual supplier route and evidence package |
| Simple high-volume geometry | Redirect route | Compare conventional scalable manufacture |

The word "reject" should be reserved for a route or design state that cannot close a gate. Missing customer input is usually a hold, not a technical impossibility.

## How to Write a Useful Pre-Quotation Rejection Note

A useful note contains six fields:

1. **Disposition:** return for information, revise, or reject LPBF and redirect.
2. **Failed gate:** route value, material, build, cleaning, finishing, verification, supplier evidence, or economics.
3. **Observed condition:** the exact feature, missing requirement, or scope mismatch.
4. **Consequence:** what cannot be produced, cleaned, measured, accepted, or priced responsibly.
5. **Evidence boundary:** whether the conclusion comes from a standard, supplier-specific capability, project requirement, or unresolved assumption.
6. **Next action:** the smallest change or comparison needed to reopen the decision.

Example:

> Return before quotation. The current model contains two blind cooling branches with no process access. Total-flow testing would not prove branch clearance, and no qualified cleaning route has been identified. Add removable access, revise the branch topology, or compare a split-and-braze design. Resubmit with section views and the required flow-distribution acceptance method.

This language is more useful than "channels too small" because it names the failure and the decision needed.

## Do Not Reject Too Early

A conservative review should not become an excuse to avoid engineering work.

Do not reject only because:

- The customer has not selected pure copper versus CuCrZr but has supplied functional priorities.
- A final leak rate or CT setup is still open and can be agreed before release.
- The first design needs a limited channel, port, stock, or tolerance revision.
- The project is a prototype intended to close a defined unknown.
- A supplier-specific capability must be checked against the model.

These conditions support a conditional quote or DFM stage. The assumption register should state what is open, who owns the decision, and how a change affects price, schedule, and qualification.

## Pre-Quotation Screening Checklist

Before accepting a copper LPBF part for quotation, confirm:

- AM removes a real geometry, assembly, tooling, or supply constraint.
- The exact material and final property state are defined or open under stated priorities.
- CAD, drawing, units, revisions, internal volumes, and critical features are complete.
- A plausible orientation, support, depowdering, cleaning, and drying route exists.
- Critical surfaces have stock, tool access, finishing, and measurement access.
- Temporary openings and closures have a controlled method.
- Acceptance methods answer the actual failure modes in the final delivered state.
- Supplier, machine-material route, subcontracted operations, and evidence responsibilities can be named.
- Quantity, schedule, documentation, and repeat-build intent are visible.
- Alternative routes are compared when LPBF is not clearly preferred.

Submit a screened package through the [secure RFQ form](/rfq/#rfq-form). The [capabilities page](/capabilities/) describes the coordinated manufacturing and inspection scope, while the [quality and qualification knowledge center](/knowledge/quality-and-qualification/) helps map requirements to evidence.

## FAQ

### Does rejecting LPBF mean the copper part cannot be manufactured?

No. It usually means the proposed LPBF route or current design state is unsuitable. CNC, EDM, brazing, a split design, hybrid manufacture, another material, or another AM process may be better.

### Can a part be quoted when requirements are incomplete?

Yes, as a conditional or budgetary quotation with visible assumptions. It should not be represented as a firm finished-part scope when pressure, material state, critical finishing, or acceptance remains undefined.

### Is a machine data sheet enough to accept a part for quotation?

No. It can support market feasibility, but the quotation must connect the actual supplier, machine-material route, geometry, post-processing, inspection, and acceptance requirements.

### Should every difficult internal-channel design be rejected?

No. Many should enter a focused DFM stage. Reject only when no credible build, cleaning, finishing, or verification route remains after practical revisions are considered.

### Who defines the final acceptance values?

The customer-provider agreement should identify the requirement owner. The supplier can propose methods and achievable evidence, but service pressure, leak consequence, conductivity need, cleanliness, and governing safety requirements remain project-specific.

## Decision

The purpose of pre-quotation rejection is not to reduce the number of difficult RFQs. It is to stop an undefined or unsuitable LPBF route from becoming an unreliable price and schedule promise.

A strong review produces one of four useful outcomes: quote the defined route, quote against visible conditions, revise the design or inputs, or redirect the part to a better process. That discipline improves supplier comparison, protects first-article learning, and keeps copper AM focused on parts where integrated geometry and conductivity create enough value to justify the manufacturing and evidence burden.
