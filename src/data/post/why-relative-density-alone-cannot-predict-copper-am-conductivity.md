---
title: 'Why Relative Density Alone Cannot Predict Copper AM Conductivity'
publishDate: 2026-07-16
excerpt: 'Use relative density to characterize material continuity, not as a substitute for copper AM electrical or thermal conductivity. Specify independent methods, states, specimens, and acceptance.'
category: Engineering Guide
tags:
  [
    'copper-am-quality',
    'relative-density',
    'electrical-conductivity',
    'thermal-conductivity',
    'porosity',
    'material-testing',
    'quality-assurance',
  ]
author: 'COPPER 3DP Engineering'
metadata:
  title: 'Why Copper AM Density Cannot Predict Conductivity'
  description: 'Keep relative density and copper AM conductivity as separate acceptance characteristics with defined methods, material states, specimens, and limits.'
  canonical: https://copper3dp.com/posts/EngineeringGuide/why-relative-density-alone-cannot-predict-copper-am-conductivity/
---

> Relative density and conductivity are related material-quality indicators, but one does not determine the other. Accept density with a defined method for continuity or porosity risk, and accept electrical or thermal conductivity with its own method, temperature, direction, specimen, final state, and functional context.

A copper AM supplier may report a high relative density and a buyer may infer high conductivity. That inference can fail even when both numbers were measured correctly.

This guide closes the test-selection decision. Use the [quality and acceptance decision path](/knowledge/decision-guides/#quality-acceptance) for the wider evidence chain. For the broader property discussion, use the [electrical conductivity guide](/posts/EngineeringGuide/electrical-conductivity-in-3d-printed-copper-parts/).

## Density and Conductivity Ask Different Questions

Relative density asks how much measured material density approaches a selected theoretical or reference density, or how much void content is detected by a specified method.

Conductivity asks how readily the final material carries electrical current or heat under stated conditions.

| Characteristic | Strong use | Cannot establish by itself |
| --- | --- | --- |
| Relative density | Bulk material continuity, process comparison, porosity screening | Electrical conductivity, thermal conductivity, interface resistance, leak tightness |
| Porosity morphology | Distinguishing irregular lack-of-fusion from rounded pores and assessing location | Bulk conductivity value or part function |
| Electrical conductivity/resistivity | Bulk electrical material state under stated method and temperature | Thermal-system performance, contact resistance, leak integrity |
| Thermal diffusivity/conductivity | Heat transport in a defined specimen and state | Contact flatness, coolant flow, thermal resistance of an assembly |
| Leak test | Through-boundary leakage under stated conditions | Total porosity, conductivity, or burst strength |

The correct acceptance package may include several rows because the part has several failure modes.

## Why Two Dense Parts Can Conduct Differently

Conductivity can change with:

- Alloying additions and solute state.
- Precipitation and heat-treatment condition.
- Oxygen and other impurities.
- Oxide films and contamination at powder or melt-track boundaries.
- Pore shape, connectivity, size, and orientation.
- Microstructure, residual strain, and thermal history.
- Test temperature and direction.
- Surface condition and method suitability.
- Sampling location and build-platform position.

A density method may not detect or weight all of these contributors in the same way. A part can show similar measured relative density before and after a thermal treatment while its CuCrZr conductivity changes substantially because precipitation state changes.

The current [EOS CuCrZr material and process data](https://www.eos.info/metal-solutions/data-sheets/all-processes-and-materials?id=eos-copperalloy-cucrzr) provides a clear route-specific example. For a named EOS process, the reported average defect percentage remains a process characteristic while typical electrical conductivity differs greatly between as-manufactured, conductivity-optimized, and tensile-optimized heat-treated conditions. The lesson is not to transfer those exact values to another supplier. The lesson is that density alone cannot identify the final precipitation and conductivity state.

## Why Conductive Parts Can Still Fail with Small Defect Populations

An average bulk result can hide a critical local condition.

Examples:

- A connected pore path intersects a pressure wall.
- Lack of fusion sits at a high-current neck.
- A defect reaches a machined sealing face or threaded port.
- A thin RF wall contains local roughness or geometry error.
- A thermal interface distorts after heat treatment.
- One internal channel retains powder while the surrounding bulk is dense.

The acceptance method should therefore consider defect location and morphology, not only an average percentage. [ASTM F3637-23](https://store.astm.org/f3637-23.html) is a guide to relative-density measurement methods for metal AM finished parts. Its value is methodological consistency; it does not turn one density result into proof of every finished-part property.

## Select and Report the Density Method

Possible routes include geometric density, Archimedes-type methods, metallographic image analysis, X-ray CT, and other qualified techniques. Each has different sample, resolution, surface, access, uncertainty, and defect-sensitivity limitations.

The report should state:

- Method and governing procedure.
- Theoretical/reference density used.
- Specimen geometry and final state.
- Build orientation and specimen location.
- Surface preparation.
- Number of specimens or fields.
- Measurement uncertainty or method limitations.
- Whether results are bulk averages, local sections, or CT-derived values.
- Acceptance rule and handling of outliers.

Do not compare an Archimedes result from one route with image-analysis or CT output from another as if they were identical metrics.

## Specify Conductivity Independently

Electrical acceptance should define:

- Conductivity or resistivity target and unit.
- Test method, such as an agreed eddy-current or direct-resistance method.
- Test temperature and correction.
- Specimen or part location.
- Build and measurement direction.
- Final heat-treated and finished state.
- Surface requirements for the instrument.
- Sample count and lot rule.

Thermal acceptance should define whether thermal conductivity is measured directly or derived from diffusivity, heat capacity, and density, and at which temperature. For a finished thermal part, add the relevant assembly or fluid-system test.

The [pure copper finished-conductivity specification guide](/posts/EngineeringGuide/specifying-pure-copper-lpbf-parts-by-finished-conductivity-not-powder-grade/) provides a complete requirement structure.

## Use a Property-and-Function Matrix

| Part type | Material evidence | Local/geometry evidence | Functional evidence |
| --- | --- | --- | --- |
| Busbar or conductor | Conductivity/resistivity and material state | Current neck, contact pad, dimensions | Resistance and temperature rise |
| Cold plate | Material identity and selected property data | Walls, channels, ports, seal faces | Leak, proof, flow, thermal response |
| RF waveguide | Bulk conductivity and final surface route | Internal profile, roughness, plating | Insertion/return loss or resonant response |
| Induction coil | Material state and conductivity | Turn spacing, cooling path, contact interfaces | Electrical, thermal, flow, and life test |
| Pressure manifold | Material and mechanical-state evidence | Defect location, remaining wall, threads | Proof, leak, flow, cycle evidence |

Density may support the material or local column. It does not replace the functional column.

## Distinguish Process Qualification from Part Acceptance

### Process qualification

Use density, conductivity, tensile or hardness, chemistry, and microstructure on representative specimens to establish a controlled material-process-final-state route. Include orientation and build-location strategy where relevant.

### First article

Connect route evidence to the actual geometry with internal inspection or sectioning where justified, critical dimensions, finished interfaces, and part-level functional tests.

### Repeat production

Use frozen process controls, witness strategy, sampling, part-level acceptance, and change notification. The exact mix should reflect process maturity and failure consequence.

NIST's [powder-bed-fusion measurement research](https://www.nist.gov/additive-manufacturing/research-areas/technologies/powder-bed-fusion) highlights powder spreading, in-process measurement, modeling, and control as distinct measurement challenges. A high final density number does not eliminate the need for the process and finished-part evidence chain.

## Avoid These Procurement Errors

- Writing "99.9% dense" with no method or reference density.
- Treating density as a guaranteed conductivity value.
- Comparing supplier values measured by different methods and states.
- Accepting CuCrZr conductivity before the property-setting heat treatment.
- Using one flat coupon as proof of a current neck or thermal interface.
- Accepting CT as proof of leak tightness.
- Using a data-sheet typical value as a drawing minimum.
- Omitting test temperature, direction, and final finishing state.

## RFQ Checklist for Density and Conductivity Evidence

Provide:

1. Exact material or permitted alternatives.
2. Part function and controlling electrical, thermal, pressure, or RF requirement.
3. Required final heat treatment, machining, polishing, plating, and cleaning state.
4. Relative-density or porosity question and selected method.
5. Conductivity/resistivity target, method, temperature, direction, and specimen.
6. Critical defect locations, walls, channels, ports, interfaces, and contact pads.
7. Same-build witness relationship and sampling plan.
8. Part-level resistance, temperature rise, thermal, RF, proof, leak, or flow test.
9. Reports, calibration, uncertainty, laboratory, and traceability expectations.
10. Repeat-build and change-control requirements.

Submit these through the [secure RFQ form](/rfq/#rfq-form). COPPER 3DP coordinates supplier evidence and quotation scope; project-specific acceptance values remain the responsibility of the customer and selected manufacturing route.
