---
title: 'Tolerance Stack-Up for Copper AM Parts with Printed Channels and Machined Ports'
publishDate: 2026-07-19
excerpt: 'A finished-part method for budgeting channel position, process movement, machining, and inspection when a copper AM port approaches a hidden flow path.'
category: Engineering Guide
tags:
  [
    'copper-lpbf',
    'tolerances',
    'internal-channels',
    'machined-ports',
    'cnc-machining',
    'inspection',
    'ct-scanning',
    'rfq-specification',
  ]
author: 'COPPER 3DP Engineering'
metadata:
  title: 'Copper AM Tolerance Stack-Up for Channels and Ports'
  description: 'Budget printed-channel position, process movement, port machining, remaining wall, and inspection uncertainty before quoting a copper AM part.'
  canonical: https://copper3dp.com/posts/EngineeringGuide/tolerance-stack-up-for-copper-am-parts-with-printed-channels-and-machined-ports/
---

> For a copper AM part with hidden channels and machined ports, build the tolerance stack around the minimum finished wall or required port-to-channel relationship. Separate physical variation from measurement uncertainty. Allocate physical variation to the printed channel, movement after thermal and support-removal operations, datum transfer, and port machining. Then choose an inspection route that can actually verify the controlling relationship. A tight port position measured by CMM does not prove safe remaining wall to an unseen channel.

Printed channels and machined ports belong to different manufacturing states. The channel is created during LPBF and can move with the surrounding body. The port is normally drilled, bored, tapped, counterbored, or finish-machined later from an accessible datum system. Their final relationship therefore depends on more than either feature's individual tolerance.

This guide owns that cross-process stack. The broader [copper AM dimensional tolerance guide](/posts/EngineeringGuide/tolerances-and-dimensional-accuracy-in-copper-metal-3d-printing/) explains which features should remain as-built, be machined, or be accepted functionally. The [drawing datum guide](/posts/EngineeringGuide/allocating-datums-and-inspection-features-on-copper-lpbf-drawings/) explains how to establish the reference system. Use this page when the unanswered decision is whether the proposed stack leaves enough wall, alignment, sealing margin, and inspectability after the complete route.

## Start with the Relationship That Can Fail

Do not begin by assigning a general tolerance to the whole model. Begin with the final relationship whose loss would make the part unacceptable.

| Controlling relationship | Typical failure if the stack closes | Evidence needed |
| --- | --- | --- |
| Machined port to hidden channel wall | Breakthrough, thin pressure boundary, leakage, or crack initiation | Port metrology plus channel-position or remaining-wall evidence |
| Port axis to channel inlet | Flow restriction, step, recirculation, or trapped powder | Registered internal inspection, section evidence, or qualified functional test |
| Counterbore or seal land to channel roof | Local wall loss, distortion, or seal-face movement | Finished depth/flatness plus channel-location evidence |
| Thread minor diameter to adjacent passage | Thread breakout or insufficient load-bearing section | Thread inspection plus minimum-wall verification |
| Two ports connected by one printed manifold | Assembly misalignment or unequal branch restriction | Port CMM plus flow-distribution or internal-geometry evidence |
| Machined thermal face to channel crown | Insufficient remaining wall or excessive thermal resistance | Face metrology plus channel depth or wall-thickness evidence |

A drawing can control the port perfectly and still miss the failure. If the risk is wall breakthrough, the accepted characteristic is the minimum wall after machining, not only the port location relative to an exterior edge.

## Build the Stack in the Finished State

For one critical section, define:

- `Wnom`: nominal material between the finished machined feature and the nominal channel boundary.
- `P`: allowed channel-location and channel-form variation under the proposed material-machine-process route.
- `D`: allowed change from thermal processing, build-plate removal, support removal, and relaxation before final datum establishment.
- `T`: uncertainty introduced when manufacturing datums are transferred to the final machining setup.
- `M`: allowed machining variation for the port, bore, thread, counterbore, or finished face.
- `Wreq`: minimum remaining wall required by structural, pressure, thermal, electrical, or service analysis.

For a conservative one-direction worst-case screen:

```text
Wnom - (P + D + T + M) >= Wreq
```

This is not a universal design equation. It is a bookkeeping model for the adverse directions that reduce remaining wall. The engineering drawing and supplier review must define the actual geometry, signs, material conditions, and applicable geometric controls.

Do not add measurement uncertainty as though it were another physical movement. Measurement uncertainty affects the conformity decision and any guard band; it does not physically make the wall thinner. [ISO 14253-1:2017](https://www.iso.org/standard/70137.html) addresses conformity decisions when measurement uncertainty matters near a specification limit. The buyer and supplier should agree how that decision rule will be applied before first-article acceptance.

## Assign Every Contributor to an Owner and Evidence Source

The stack becomes quotable only when each contributor has a route and evidence plan.

| Stack contributor | What can create it | How to bound it before release |
| --- | --- | --- |
| Printed channel location and form | Scan strategy, orientation, local section, down-facing geometry, material route, compensation | Supplier capability evidence on relevant features; representative artifact or first article where justified |
| Process movement | Residual stress, stress relief, solution/aging route, plate removal, support removal | Sequence-specific dimensional evidence; retained references measured before and after critical operations |
| Datum transfer | Sacrificial pad variation, inaccessible references, re-fixturing, removal of temporary features | Defined datum-transfer plan and inspection of the established machining references |
| Port machining | Tool access, fixture stiffness, wall compliance, drill walk, bore and thread sequence | CNC process plan, in-process probing where applicable, and final accessible-feature metrology |
| Hidden relationship | CT contrast/resolution, reconstruction, accessibility, section location, flow sensitivity | Agreed CT, section, borescope, flow, pressure, or other fit-for-purpose method |
| Acceptance decision | Measurement uncertainty and rule near the limit | Method, uncertainty statement where needed, reporting format, and agreed disposition rule |

[ISO/ASTM 52902:2023](https://www.iso.org/standard/79683.html) covers benchmarking artifacts and measurements for geometric capability assessment of AM systems. It can support process-capability work, but it does not prove that a particular hidden channel in a production part meets its drawing. Part geometry, build location, orientation, post-processing, and inspection accessibility still matter.

## Use Worst-Case and Statistical Stacks Deliberately

A worst-case stack is the safer starting point when a single adverse combination can open a pressure boundary, violate electrical clearance, expose a channel during machining, or create a safety-relevant failure. It is also appropriate when the supplier has little relevant process data.

A statistical stack may be useful for a stable repeat process when:

- Each contributor has enough representative data.
- The distributions and correlations are understood.
- The material, machine, parameter set, orientation, heat treatment, support strategy, and machining route are controlled.
- The buyer accepts the stated process capability and sampling plan.
- A nonconforming tail has a defined containment and disposition route.

Do not apply root-sum-square arithmetic merely because it produces a smaller number. Channel movement and datum transfer may be correlated because both respond to the same distortion field. A process change can also invalidate the assumed distribution.

For prototypes and first articles, a conservative stack plus targeted evidence is normally more defensible than an unsupported capability index.

## Freeze the Operation Sequence Before Allocating Tolerance

The same CAD can produce a different stack when the operation order changes.

1. Build the part with retained references and sufficient machining stock.
2. Apply the qualified thermal route at the specified stage.
3. Remove the build plate and accessible supports in a controlled sequence.
4. Clean and verify that channels are ready for the next operation.
5. Establish or machine the datum features used for port machining.
6. Rough-machine ports or faces when a second relaxation or check is needed.
7. Finish-machine seal lands, threads, bores, contact faces, and ports.
8. Inspect accessible external features in the final datum system.
9. Verify hidden relationships or function with the agreed method.
10. Perform leak, pressure, flow, cleanliness, or system tests required by the application.

If the port is machined before the final thermal operation, later movement belongs in the finished relationship. If the temporary datum tab is removed before final inspection, the drawing needs another way to re-establish the accepted datum reference frame.

The [prototype build-planning guide](/posts/EngineeringGuide/copper-am-prototype-build-planning/) explains how to use the first build to close these uncertainties rather than merely demonstrate that a shape can be printed.

## Do Not Confuse Channel Size, Position, Form, and Function

One local `+/-` note cannot describe every internal-channel requirement.

| Requirement | Better control question |
| --- | --- |
| Hydraulic opening | What minimum open area or local size must remain after printing and cleaning? |
| Channel location | Which external or internal reference establishes its position, and by what method? |
| Channel form | What profile deviation affects wall, pressure drop, or heat transfer? |
| Remaining wall | What minimum thickness must remain after all machining? |
| Continuity and cleanliness | What flow, borescope, CT, or cleanliness evidence proves an open path? |
| Pressure integrity | What proof-pressure and leak method applies to the finished part? |

Industrial CT can be valuable, but the inspection plan must state what it needs to resolve. [ISO 15708-3:2025](https://www.iso.org/standard/87455.html) covers operation and interpretation of industrial CT and relates performance parameters to system selection. Dense copper, part size, wall thickness, feature orientation, scan setup, reconstruction, and required uncertainty determine whether CT can support a dimensional acceptance decision. A generic request for "CT inspection" is not enough.

When CT cannot resolve the required characteristic economically, alternatives may include a representative sectioned artifact, retained witness geometry, borescope access, mass-flow and pressure-drop testing, or redesign for inspectability. Functional evidence can prove function, but it should not be mislabeled as a direct wall-thickness measurement.

For removal access and contamination risk, use the [hidden-channel cleaning guide](/posts/EngineeringGuide/copper-am-cleaning-powder-removal-internal-channels/). For seals and local pressure-boundary decisions, use the [port and seal design guide](/posts/EngineeringGuide/port-seal-design-monolithic-3d-printed-copper-cold-plates/).

## A Symbolic Drawing Review Example

Consider a machined threaded port that enters a printed manifold beside a curved cooling channel. The drawing currently controls the port from an exterior edge and gives the channel only a nominal CAD shape.

A stronger review would:

1. Identify the minimum finished wall between the thread root or counterbore and the nearest allowed channel boundary.
2. Define the functional datum system used after thermal processing and plate removal.
3. Allocate a channel-position/profile budget under the proposed LPBF route.
4. Allocate movement and datum-transfer budgets for the actual operation sequence.
5. Allocate the machined port position, size, and depth controls.
6. State how accessible port features will be measured.
7. State how the hidden channel relationship will be verified, or document why a functional test is the accepted substitute.
8. Define the disposition if the result enters the uncertainty guard band or misses the minimum wall.

This example is a review pattern, not a completed drawing callout. The responsible design authority must set `Wreq` from the component's loads, pressure, material state, fatigue or thermal cycle, corrosion allowance where relevant, and consequence of failure.

## When the Stack Says to Change the Route

Do not tighten every contributor until the arithmetic passes. Change the architecture when the remaining margin depends on capability the supplier cannot demonstrate.

| Stack result | Practical response |
| --- | --- |
| Port machining dominates | Increase boss size, move the port, improve tool access, or use a different port architecture |
| Channel-location variation dominates | Change orientation or channel section, add local wall, improve inspectability, or qualify a more relevant route |
| Datum transfer dominates | Retain better reference features, machine datums earlier, or redesign fixturing access |
| Process movement dominates | Revise stock, support, thermal sequence, geometry stiffness, or intermediate inspection |
| Inspection cannot resolve the relationship | Add inspectable features, use a justified surrogate or functional test, or redesign the pressure boundary |
| Margin only passes statistically | Require process-capability evidence and an accepted sampling/containment plan, or return to worst-case design |

A split and joined, CNC-machined, drilled-and-plugged, or conventionally brazed route can be better when the hidden relationship cannot be produced and verified with credible margin. The [AM versus CNC guide](/posts/EngineeringGuide/when-copper-3d-printing-is-better-than-cnc-machining/) helps compare the complete accepted routes.

## Acceptance Matrix for the Quotation

Add a compact matrix to the RFQ so scope does not disappear between design, manufacturing, and quality teams.

| Characteristic | Manufacturing state | Datum/reference | Method | Acceptance and report |
| --- | --- | --- | --- | --- |
| Finished port position and axis | After final machining | Functional drawing datum system | CMM or qualified alternative | Drawing limit plus agreed decision rule |
| Thread or bore size | After final machining and cleaning | Feature-specific | Gauge or dimensional method | Drawing requirement and report level |
| Channel-to-port relationship | Finished part | Registered internal/external reference | CT, section, or approved surrogate | Defined characteristic and method capability |
| Minimum remaining wall | Finished part | Defined section/volume | Qualified internal inspection or destructive qualification artifact | Minimum requirement and disposition |
| Passage function | Finished and cleaned part | Test setup | Flow and pressure-drop test | Medium, temperature, flow points, limit |
| Pressure boundary | Finished part | Test setup | Proof pressure and/or leak test | Pressure, dwell, medium, leak limit, retest rule |

The [proof, leak, and flow test selection guide](/posts/EngineeringGuide/proof-pressure-helium-leak-flow-test-copper-am-acceptance/) explains why these tests answer different questions.

## RFQ Inputs for a Defensible Stack

Send the following before asking a supplier to hold a hidden channel-to-port relationship:

- Native CAD or STEP with channel centerlines and section views.
- A drawing that identifies functional datums, critical port geometry, and minimum remaining wall.
- Material route and required delivered state, or permission for a supplier proposal.
- Working and proof pressure, medium, temperature, flow, pressure drop, and cycle requirements.
- Port and fitting standard, thread, seal type, installation torque, and assembly access.
- Machining stock, protected surfaces, temporary references, and allowed sacrificial features.
- Planned operation sequence, including thermal processing and build-plate removal.
- Required CMM, CT, section, flow, pressure, leak, cleanliness, or first-article evidence.
- Measurement decision rule and reporting expectations for critical characteristics.
- Quantity, development stage, target timing, and change-control expectations.

Submit that package through the [secure copper AM RFQ form](/rfq/#rfq-form). COPPER 3DP can coordinate a route and evidence review with qualified suppliers, but project-specific minimum walls, loads, test limits, and acceptance authority remain with the customer and selected manufacturing route.

## Decision

The correct tolerance stack is not "LPBF tolerance plus CNC tolerance." It is the finished relationship between a machined feature and a channel that was created, moved, referenced, cleaned, and inspected through a sequence.

Approve the route only when four statements are true:

1. The controlling failure relationship is explicit.
2. Every physical contributor has an allocated limit and evidence owner.
3. The measurement method can support the requested acceptance decision.
4. The remaining margin is adequate for the component's actual duty.

If any statement is missing, the quote should remain conditional or the design should change before production scope is fixed.
