---
title: 'Allocating Datums and Inspection Features on Copper LPBF Drawings'
publishDate: 2026-07-19
excerpt: 'How to separate functional datums, temporary manufacturing references, and inspection features so a copper LPBF drawing remains measurable through finishing.'
category: Engineering Guide
tags:
  [
    'copper-lpbf',
    'datums',
    'gd&t',
    'inspection',
    'cmm',
    'ct-scanning',
    'machining',
    'rfq-specification',
  ]
author: 'COPPER 3DP Engineering'
metadata:
  title: 'Copper LPBF Drawing Datums and Inspection Features'
  description: 'Allocate functional datums, machining references, sacrificial pads, CMM access, and CT registration features on copper LPBF drawings.'
  canonical: https://copper3dp.com/posts/EngineeringGuide/allocating-datums-and-inspection-features-on-copper-lpbf-drawings/
---

> A copper LPBF drawing should establish acceptance from functional surfaces that still exist in the delivered part. Temporary build tabs, sacrificial pads, and rough-machining references may support manufacturing, but they should not silently replace the functional datum system. Define the final datum reference frame first, identify how it will be created after thermal and support-removal operations, add only the inspection features needed to realize or register that frame, and state a measurable acceptance method for every critical external or hidden characteristic.

Datums are not labels added after the geometry is complete. They define how the part is oriented for specification and verification. On a copper LPBF component, they also determine whether the supplier can transfer the design intent across the printed blank, thermal processing, plate removal, machining, cleaning, and final inspection.

The broader [copper AM tolerance guide](/posts/EngineeringGuide/tolerances-and-dimensional-accuracy-in-copper-metal-3d-printing/) separates as-built, machined, and functionally tested requirements. The [channel-to-port tolerance stack guide](/posts/EngineeringGuide/tolerance-stack-up-for-copper-am-parts-with-printed-channels-and-machined-ports/) budgets variation across those states. This page owns a different decision: which references and inspection features belong on the drawing so the specified characteristics can be established and verified.

## Separate Three Reference Jobs

One feature can sometimes serve more than one job, but the jobs should be reviewed separately.

| Reference job | Purpose | Typical copper AM example | Main risk |
| --- | --- | --- | --- |
| Functional datum | Represents assembly, sealing, thermal contact, electrical connection, RF interface, or installed location | Final thermal face, flange, mounting pattern, pilot diameter | Choosing an easy-to-print surface that does not represent use |
| Manufacturing reference | Locates the blank for support removal, rough machining, or later datum creation | Sacrificial pad, machining tab, retained boss, build-plate relation | Removing it before the datum transfer is verified |
| Inspection or registration feature | Lets the measurement system realize a frame or register internal and external data | Accessible target pad, tooling sphere, reference bore, CT-visible feature | Adding a feature the selected method cannot measure reliably |

The functional datum system belongs to the product definition. Manufacturing references belong to the process plan. Inspection features belong to the verification plan. Putting all three in one undifferentiated callout can make the drawing impossible to interpret after temporary features are removed.

## Choose Functional Datums from the Installed Part

Start with the way the customer assembles and uses the component.

| Functional constraint | Candidate primary reference | Secondary and tertiary references to review |
| --- | --- | --- |
| Heat sink or cold plate clamped to a device | Final machined thermal contact plane | Mounting-hole or pilot pattern, then clocking feature |
| Fluid manifold joined through a flange | Final sealing or flange plane when functionally appropriate | Pilot/bore or fastener pattern, then angular clocking feature |
| Busbar or cooled conductor bolted at contact pads | Accepted contact plane or mounting interface | Hole pattern and a feature that controls rotation |
| RF or vacuum component joined at a flange | Qualified mating interface | Bore/axis or pattern, then clocking feature |
| Tooling insert located in a mold | Final seating plane | Side locators, pilot, or mounting pattern |
| Semiconductor thermal-control part located in equipment | Installed mounting interface | Precision locating features and assembly clocking feature |

These are review patterns, not universal datum prescriptions. The responsible design authority must choose datums from actual constraint, assembly sequence, and function.

[ISO 5459:2024](https://www.iso.org/standard/87855.html) specifies terminology, rules, and methodology for datums and datum systems in technical product documentation. It also distinguishes the specification operator from the possible physical or mathematical verification operators. That distinction matters in copper AM: the drawing can define the functional datum concept, while the CMM, fixture, or other verification plan must still realize it credibly on the finished geometry.

## Do Not Use the Build Plate as the Product Datum by Default

The build coordinate system is useful for manufacturing records, orientation, compensation, coupon traceability, and location-dependent evidence. It is not automatically the datum system of the installed component.

Between exposure and delivery, the part may undergo:

- Stress relief, solution treatment, aging, or another qualified thermal route.
- Build-plate removal and support removal.
- Relaxation or movement after restraint is released.
- Rough machining that creates more stable references.
- Finish machining of thermal, sealing, electrical, RF, and mounting interfaces.
- Cleaning, surface treatment, plating, or assembly.

If the final functional face is created after these operations, a build-plate reference cannot by itself establish its finished relationship to every feature. Use the build coordinates as process evidence and define a controlled transfer to accessible retained or machined references.

## Design the Datum Transfer Before Releasing CAD

A robust transfer plan can be written as a sequence:

1. Identify the final functional datum reference frame.
2. Decide which as-built features can survive thermal processing and plate removal with enough stock and access.
3. Add temporary reference pads or tabs only where they can be printed, supported, probed, clamped, and later removed safely.
4. Define which temporary references establish the first machining setup.
5. Create the final functional datums in a stable sequence.
6. Inspect the final datums before removing any temporary feature still needed for registration.
7. Transfer remaining machining and inspection operations to the final frame.
8. Remove sacrificial references and verify any affected surface or pressure boundary.

The drawing should make the final product requirements unambiguous. A manufacturing drawing, model-based definition, or supplier process plan can carry approved temporary-feature details where the customer's document-control system permits.

For thin walls and enclosed channels, coordinate this transfer with the [copper AM support strategy](/posts/EngineeringGuide/support-strategy-for-copper-am-parts-with-thin-walls-and-enclosed-flow-paths/). A datum pad that requires damaging support removal or clamps over a channel roof is not a robust reference.

## Give the Measurement System Physical Access

Critical characteristics fail inspection planning when the nominal datum exists in CAD but cannot be contacted, imaged, or registered in the finished part.

### CMM and tactile inspection

Review:

- Probe approach and stylus clearance.
- Minimum usable target area after edge exclusions and surface finish.
- Part stability and fixture access.
- Whether the surface is as-built, rough-machined, or finished.
- Temperature control and part stabilization for precision measurements.
- Whether the datum feature is interrupted, flexible, porous, plated, or damaged by support removal.
- Whether enough points and distribution can realize the specified feature.

A small rough pad is not automatically a high-quality datum merely because a probe can touch it. Its form, accessibility, stiffness, and relationship to the final functional frame determine its value.

### Optical inspection

Review line of sight, surface reflectivity, finish, target contrast, calibration, and whether the method can establish the required 3D relationship. Shiny copper, rough as-built surfaces, deep recesses, and thin edges can change method suitability. A coating or temporary target used for optical measurement should be controlled if it affects the result or surface condition.

### CT registration

For hidden channels, CT data may need registration to external features that also exist in the drawing model. Suitable candidates can include accessible reference bores, pads, or deliberately designed registration geometry, subject to method review.

[ISO 15708-3:2025](https://www.iso.org/standard/87455.html) addresses operation and interpretation of industrial CT and the selection of suitable parameters. It does not make every copper part dimensionally measurable by CT. Copper attenuation, part size, surrounding wall, feature scale, scan setup, reconstruction, surface determination, and uncertainty must be evaluated for the requested characteristic.

Do not specify a generic "CT to CAD" alignment and leave the acceptance result dependent on best fit. Best-fit alignment can distribute error and hide the functional relationship that the datum system was intended to expose. State the registration features or accepted alignment rule and the characteristic to report.

## Match the Control to the Characteristic

Use size tolerances for size, and use geometrical controls for form, orientation, and location when those relationships control function.

[ISO 1101:2017](https://www.iso.org/standard/66777.html) defines the symbol language and interpretation rules for geometrical tolerancing. [ISO 14405-1:2025](https://www.iso.org/standard/14405-1) specifies requirements for indicating linear sizes. These standards provide the specification language; they do not decide which characteristic your copper component needs.

| Design need | Weak instruction | Stronger review direction |
| --- | --- | --- |
| Port must assemble to a mating line | General `+/-` dimensions from part edges | Position/orientation controlled from functional datums, with port size controlled separately |
| Thermal face must contact a device | Flatness implied by thickness | Explicit form requirement plus relationship to mounting features where function requires it |
| Channel must remain safely below a machined face | Nominal CAD and exterior thickness only | Minimum remaining wall or channel profile/location related to a defined frame and method |
| Flange axis must align with internal route | Independent bore and envelope dimensions | Defined axis relationship plus internal-registration or functional evidence |
| Bolt pattern must clock the part | Chain dimensions between holes | Pattern control from the selected datum reference frame |
| As-built freeform surface is noncritical | Dense coordinate dimensions | Profile or a bounded envelope only where necessary, leaving noncritical geometry economical |

Do not copy these directions as completed feature-control frames. Datum precedence, modifiers, material requirements, basic dimensions, tolerance values, and verification method depend on the actual design and the applicable drawing standard.

## Add Inspection Features Only When They Close a Named Gap

Every added target, pad, boss, tab, or reference artifact adds build area, support, cleaning, machining, inspection, and removal scope. It should answer a specific question.

| Inspection feature | Useful when | Required release decision |
| --- | --- | --- |
| Sacrificial planar pads | The as-built blank needs a stable first machining or measurement setup | Number, location, stock, removal stage, and affected surface disposition |
| Retained tooling bores or bosses | Repeated machining setups or CMM registration need accessible references | Whether they remain in the delivered part and how they relate to functional datums |
| CT registration features | Hidden geometry must be related to an external frame | CT method can resolve them and the alignment rule is defined |
| Witness geometry | A local channel, wall, or process feature needs destructive or high-resolution evidence | Representativeness, build location, orientation, material state, and traceability |
| In-process measurement targets | Movement must be checked between thermal, plate-removal, or machining stages | Measurement stage, decision threshold, and action after movement |
| Handling or fixturing tabs | Thin or complex geometry cannot be clamped safely | Loads, removal method, stock, and final inspection after removal |

The [prototype build-planning guide](/posts/EngineeringGuide/copper-am-prototype-build-planning/) explains how to link each witness or inspection feature to a release decision. Do not add generic coupons and targets that produce reports no one uses.

## Define Stage-Specific Inspection without Changing Product Intent

The final drawing owns finished-part acceptance. The quality plan can add stage checks that protect the route.

| Stage | Reference available | Useful decision |
| --- | --- | --- |
| On build plate | Build coordinates, plate, retained targets | Screen gross movement, build location, and process anomalies |
| After thermal processing | Plate or retained references | Decide whether stock and geometry remain adequate for plate removal and machining |
| After plate/support removal | Temporary pads, rough envelope | Confirm movement, damage, access, and datum-creation feasibility |
| After rough machining | Established datum features | Decide whether finish stock and hidden-wall margin remain adequate |
| After finish machining | Functional datum reference frame | Accept external size, form, orientation, location, and surface requirements |
| After cleaning and final treatment | Delivered condition | Accept hidden geometry/function, cleanliness, leak/pressure, and final interfaces |

If a stage check can reject the part, define the characteristic, method, limit, authority, and disposition. An undocumented screening measurement should not silently become a new product requirement.

## Control Measurement Uncertainty and Decision Rules

For critical dimensions near a limit, the drawing value, measurement result, and uncertainty are not interchangeable.

[ISO 14253-1:2017](https://www.iso.org/standard/70137.html) establishes rules for verifying conformity or nonconformity with specifications while taking measurement uncertainty into account. Before quotation, identify characteristics where uncertainty could consume a meaningful share of the tolerance or create disagreement at acceptance.

Ask the inspection provider to state:

- The measurand and datum realization.
- The measurement method and relevant setup.
- The reporting resolution and uncertainty where required.
- The decision rule near specification limits.
- Environmental and surface-condition controls.
- Sampling, repeat measurement, and dispute route.

For CT, CMM, and mixed-method inspection, do not assume two systems will report the same characteristic from the same nominal CAD. Alignment, filtering, surface extraction, sampling strategy, and datum realization must be compatible with the requirement.

## A Practical Drawing Package

The quotation package should separate product requirements from proposed manufacturing aids.

### Product definition

- CAD and controlled drawing or model-based definition.
- Final functional datum system.
- Critical size, form, orientation, location, surface, and material requirements.
- Hidden-geometry or functional acceptance requirements.
- Delivered material and surface state.
- Applicable drawing and inspection standards.

### Supplier planning inputs

- Allowed or prohibited build orientations where function requires them.
- Protected surfaces and machining stock expectations.
- Permission and approval route for sacrificial pads, tabs, bores, or coupons.
- Operation sequence and datum-transfer proposal.
- CMM, optical, CT, gauge, section, flow, pressure, leak, or cleanliness methods.
- First-article report and change-control expectations.

### Illustrative general note pattern

```text
Functional datum system and finished-part requirements are defined on this drawing.
Temporary AM, fixturing, and machining references require approval and shall not
replace the functional datum system. The supplier shall identify the operation
at which final datums are established and the method used to verify each critical
characteristic. Hidden-channel conformance shall use the approved inspection or
functional method; exterior CMM results alone do not establish hidden geometry.
```

This is an engineering communication pattern, not a substitute for a standards-compliant drawing prepared and approved by the design authority.

## When to Redesign the Reference Scheme

Change the design or route when:

- The primary datum is an unstable as-built surface but function requires a finished interface.
- Temporary references disappear before the final frame can be transferred.
- A probe, fixture, scanner, or cutting tool cannot access the specified feature.
- The datum feature sits on a thin wall or channel roof that deforms under clamping or probing.
- CT alignment relies on best fit when the function depends on a specific interface.
- Measurement uncertainty is too large for the acceptance decision.
- Inspection features create support, cleaning, pressure-boundary, or removal risks greater than the problem they solve.
- The product cannot be re-established in the same frame after repair, plating, or final treatment.

The [hidden-channel DFM workflow](/posts/EngineeringGuide/copper-am-dfm-review-workflow-for-parts-with-hidden-internal-channels/) is the right upstream review when datum access, cleaning, machining, and internal inspection need to be solved together.

## RFQ Checklist

Send these inputs for a datum and inspection review:

- CAD and drawing with the proposed functional datum system.
- Assembly model, mating interfaces, and installed constraint description.
- Critical characteristics and the failure each one prevents.
- Material route and delivered heat-treated/finished state.
- Build-orientation restrictions, protected surfaces, and machining stock.
- Proposed temporary references and whether they may remain on the part.
- Machining and thermal-processing sequence.
- CMM, optical, CT, gauge, section, flow, pressure, leak, RF, electrical, or thermal test requirements.
- Required reports, sampling, measurement uncertainty, and decision rules.
- Quantity, development stage, target date, and change-approval requirements.

Submit the package through the [secure copper AM RFQ form](/rfq/#rfq-form). COPPER 3DP can coordinate the supplier's datum-transfer, machining, and inspection proposal, while the customer retains authority for product function, drawing approval, tolerance values, and acceptance criteria.

## Decision

A datum scheme is ready for copper LPBF quotation only when it survives the complete manufacturing route and still represents the installed part.

Approve it when:

1. The functional datum system follows assembly and use.
2. Temporary manufacturing references have a controlled creation, transfer, and removal plan.
3. The selected measurement method can physically realize or register the required features.
4. Hidden geometry has a defined evidence route rather than an assumption.
5. Measurement uncertainty and acceptance decisions are agreed for critical characteristics.

If one condition is missing, add an inspection feature, change the operation sequence, relax a nonfunctional requirement, or redesign the geometry before fixing the production quote.
