---
title: 'Proof Pressure, Helium Leak, or Flow Test: Choosing Copper AM Acceptance Methods'
publishDate: 2026-07-16
excerpt: 'Choose proof, helium leak, pressure-decay, bubble, flow, CT, and burst tests from the failure question each can answer, then define final-state conditions and acceptance.'
category: Engineering Guide
tags:
  [
    'copper-am-quality',
    'proof-pressure',
    'helium-leak-testing',
    'flow-testing',
    'pressure-boundary',
    'acceptance-testing',
    'cold-plates',
    'vacuum-hardware',
  ]
author: 'COPPER 3DP Engineering'
metadata:
  title: 'Choose Copper AM Proof, Leak, and Flow Tests'
  description: 'Select proof pressure, helium leak, pressure decay, bubble, flow, CT, and burst tests by failure mode and final delivered condition.'
  canonical: https://copper3dp.com/posts/EngineeringGuide/proof-pressure-helium-leak-flow-test-copper-am-acceptance/
---

> Proof pressure, helium leak, pressure decay, bubble, flow, CT, and burst tests are not interchangeable. Select each method from the failure question it answers, then define medium, pressure or flow, temperature, dwell, stabilization, fixture, orientation, sensitivity, uncertainty, sequence, sampling, and final-state pass/fail criteria.

"Leak test required" and "pressure tested" are not complete purchase requirements. A copper AM cold plate can survive proof pressure and still leak below the sensitivity of the chosen setup. It can be leak-tight and contain a blocked channel. It can pass CT and still leak through a defect below the effective resolution or along a path not identified by image review.

This guide closes the acceptance-method decision. Use the [quality and acceptance decision path](/knowledge/decision-guides/#quality-acceptance) for the wider evidence chain. For cold-plate-specific context, use the [CT and leak criteria guide](/posts/EngineeringGuide/ct-scan-leak-test-acceptance-criteria-copper-cold-plates/).

## Start with the Failure Question

| Failure question | Primary method | Complementary evidence |
| --- | --- | --- |
| Does the part survive an agreed load without unacceptable damage? | Proof-pressure test | Dimensional check, leak test, cycle test |
| Does gas or fluid cross a pressure boundary above an allowed rate? | Defined leak test | Proof test, CT/sectioning for cause |
| Is the intended passage open and hydraulically acceptable? | Flow and pressure-drop test | CT, cleaning record, branch-sensitive test |
| Where is an internal defect or wall deviation? | CT or destructive sectioning | Leak/proof/function test |
| What is the ultimate pressure margin? | Burst test on designated samples | Material and defect evidence, statistical plan |
| Does the part survive repeated service? | Pressure/thermal cycle test | Periodic leak, flow, dimensional, and teardown evidence |

The acceptance plan often combines methods because pressure-containing AM parts have more than one credible failure mode.

## Proof-Pressure Testing

Proof testing demonstrates that the part survives an agreed pressure for a defined duration and condition without specified damage, permanent deformation, or leakage indication.

Define:

- Test medium and compatibility.
- Test pressure and basis relative to operating/design requirements.
- Ramp rate, hold time, and depressurization.
- Temperature and stabilization.
- Port plugs, fixtures, restraints, and excluded assembly items.
- Visible leakage criterion and separate quantitative leak test if required.
- Allowable permanent deformation or post-test dimensional check.
- Safety controls and stored-energy management.
- Whether the part is tested before or after cycling, machining, coating, and final cleaning.

Hydrostatic testing may reduce stored energy relative to pneumatic testing, but fluid compatibility, drying, contamination, and trapped volumes need control. Pneumatic proof can serve particular requirements but requires a deliberate safety procedure.

Proof pressure does not provide a quantitative small-leak rate unless the setup includes an appropriate leak measurement.

## Helium Mass-Spectrometer Leak Testing

Helium testing is useful when a low leakage rate must be measured and the part can be configured for tracer-gas or vacuum testing.

The RFQ should define:

- Test mode and which volume is evacuated or pressurized.
- Helium concentration and exposure method.
- Test pressure or pressure differential.
- Maximum allowable leak rate and units.
- Background, stabilization, dwell, and calibration-leak procedure.
- Temperature and handling after cleaning or bake.
- Permeation, trapped helium, virtual leaks, and fixture leakage controls.
- Which seals, plugs, fittings, and ports are included in the acceptance boundary.

A helium result can be dominated by the test fixture or temporary seals if the boundary is not defined. For vacuum hardware, test the final sealing surfaces and relevant assembly state. For a liquid cold plate, ensure the selected criterion is connected to the actual consequence rather than copied from an unrelated vacuum specification.

## Pressure-Decay and Differential Methods

Pressure-decay testing can be practical for production screening, but sensitivity depends on part volume, fixture volume, pressure, temperature stability, stabilization time, instrumentation, and test duration.

Define:

- Initial pressure and gas.
- Combined internal and fixture volume.
- Fill, stabilization, measurement, and vent intervals.
- Temperature compensation.
- Allowed pressure change or calculated leakage.
- Reference standard and fixture baseline.
- Retest and failure-isolation procedure.

Do not state only "no pressure drop." Every real system has resolution, thermal drift, and a finite observation time.

## Bubble and Immersion Testing

Bubble testing can localize larger leaks and provide a simple screening method. It is operator-, pressure-, fluid-, time-, and visibility-dependent.

Use it when the required sensitivity and consequence fit the method. Define pressure, immersion fluid, dwell, observation, lighting, orientation, cleanliness, drying, and acceptance. Do not treat a bubble screen as equivalent to a quantified high-sensitivity leak method.

## Flow and Pressure-Drop Testing

Flow testing confirms that intended passages are open and within a hydraulic resistance envelope under defined fluid conditions.

Define:

- Fluid and temperature.
- Flow points or pressure-differential points.
- Flow direction, orientation, fill, vent, and stabilization.
- Pressure-tap positions and fixture losses.
- Filter, fluid cleanliness, and post-test drying.
- Instrument accuracy and correction.
- Acceptance band and reference-part logic.
- Whether total flow is sufficient or branch distribution also matters.

A blocked branch can hide behind acceptable total flow in a parallel network. Use the [multi-passage flow-distribution testing guide](/posts/EngineeringGuide/flow-distribution-acceptance-testing-multi-passage-copper-heat-exchangers/) when local distribution controls function.

## CT and Sectioning

CT can support internal-channel continuity, remaining-wall, pore morphology, location, and dimensional questions. Its effective capability depends on copper attenuation, part size, wall thickness, geometry, voxel size, contrast, scan setup, reconstruction, artifact control, and analysis method.

Define the region and question:

- Detect blockage above an agreed fraction of section.
- Verify a minimum wall in a port transition.
- Screen a critical pressure boundary for connected defect risk.
- Compare header or channel geometry with the model.
- Select a region for destructive confirmation.

Do not use "CT passed" as a leak statement unless a validated correlation and decision rule exist. A quantitative leak test remains the direct method for leakage.

## Burst and Cycle Testing

Burst testing is destructive and usually applies to development, qualification, or sampled parts. Define the medium, ramp, fixture, failure definition, data capture, location, and handling of censored results when the fixture reaches its limit first.

Cycle testing should represent the credible service pressure and temperature history, including dwell, ramp, coolant chemistry, assembly loads, and inspections at intervals. Define whether leakage, deformation, flow change, crack indication, or burst after cycling is the endpoint.

One burst result is not a statistical production allowable. Use a plan proportionate to risk, variability, and regulatory/customer requirements.

## Sequence the Tests in Final Manufacturing State

An effective sequence might be:

1. Internal cleaning and preliminary flow screen.
2. Dimensional and CT evidence before high-load testing where failure investigation value matters.
3. Proof pressure.
4. Quantitative leak test.
5. Flow and pressure-drop acceptance.
6. Thermal, RF, or other functional test.
7. Final clean/dry verification and packaging.

The actual order depends on whether test fluid affects cleanliness, whether proof can change the part, and whether a failed test must be investigated. State which operations occur after the last pressure or leak test.

[ISO/ASTM 52908:2023](https://www.iso.org/standard/81779.html) establishes a framework for customer-provider agreement on qualification, post-processing, inspection, and testing of PBF metal parts. It does not provide a universal proof factor, leak rate, CT resolution, or sampling plan for all copper AM hardware.

## Choose a Proportionate Acceptance Package

| Risk level | Example package |
| --- | --- |
| Low-risk development article | Visual/dimensional, cleaning, defined flow, practical leak screen |
| Electronics cold plate | Critical dimensions, proof, defined leak, flow/pressure drop, cleanliness, thermal correlation |
| Multi-circuit heat exchanger | Proof/leak by circuit, total and distribution-sensitive flow, CT/section development evidence |
| Vacuum/RF manifold | Critical dimensions/surfaces, final-state helium leak, cleaning/outgassing as required, RF/vacuum function |
| High-consequence pressure hardware | Formal material/process qualification, NDE, proof, leak, cycle/burst, traceability, approved plan |

The labels are examples, not automatic classifications. The customer and supplier should use actual failure consequences and governing requirements.

## RFQ Checklist for Pressure, Leak, and Flow Acceptance

Provide:

1. Operating, transient, design, proof, burst, and cycle pressures.
2. Service fluid/gas, temperature, corrosion, contamination, and drying constraints.
3. Pressure boundary, circuits, ports, temporary fixtures, and final seals included in test.
4. Leak method, mode, medium, pressure, threshold, units, dwell, and calibration.
5. Proof medium, ramp, pressure, hold, deformation/damage criterion, and safety responsibility.
6. Flow fluid, temperature, range, pressure drop, direction, venting, and distribution requirement.
7. CT or section region, feature/defect question, resolution/uncertainty basis, and acceptance.
8. Cycle or burst development and sampling requirements.
9. Test order, final clean/dry state, records, retest, and nonconformance rules.
10. Prototype, production quantity, sampling, and change triggers.

Submit these through the [secure RFQ form](/rfq/#rfq-form). COPPER 3DP coordinates supplier test scope and quotation; the customer remains responsible for selecting project-specific acceptance values and governing safety or regulatory requirements.
