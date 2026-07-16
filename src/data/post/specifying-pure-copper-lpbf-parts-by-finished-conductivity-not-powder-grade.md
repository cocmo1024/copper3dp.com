---
title: 'Specifying Pure Copper LPBF Parts by Finished Conductivity, Not Powder Grade'
publishDate: 2026-07-16
excerpt: 'Specify pure copper LPBF as a delivered material and functional state: test method, temperature, direction, specimen relationship, interfaces, finishing, and part-level acceptance.'
category: Engineering Guide
tags:
  [
    'pure-copper',
    'copper-lpbf',
    'material-selection',
    'electrical-conductivity',
    'thermal-conductivity',
    'conductivity-testing',
    'rfq-specification',
  ]
author: 'COPPER 3DP Engineering'
metadata:
  title: 'Specify Pure Copper LPBF by Finished Conductivity'
  description: 'Define pure copper LPBF conductivity by final state, test method, temperature, direction, interfaces, and finished-part acceptance.'
  canonical: https://copper3dp.com/posts/EngineeringGuide/specifying-pure-copper-lpbf-parts-by-finished-conductivity-not-powder-grade/
---

> Specify a pure copper LPBF part by the conductivity and function required in its delivered state, not by powder purity alone. The purchase requirement should name the final heat treatment and finishing state, test method, temperature, direction, specimen relationship, interface condition, and any part-level electrical or thermal acceptance test.

"Pure copper" is a material-family description. It is not a complete component specification.

Two suppliers may start with powders carrying similar copper-purity statements and still deliver parts with different oxygen exposure, density, thermal history, surface condition, machining, and measured conductivity. Even a valid coupon result may not represent the current neck, thermal interface, plated surface, or internal feature that controls the real component.

This page closes one decision: **how to convert a high-conductivity request into a quotable and testable pure-copper LPBF requirement**. It belongs to the [pure copper and CuCrZr material-selection cluster](/knowledge/decision-guides/materials-selection/). For a broad application overview, use the [pure copper 3D printing service path](/pure-copper-3d-printing/).

## Start with the Function, Not the IACS Number

First identify where conductivity affects performance. That determines what a bulk material test can prove and where a finished-part test remains necessary.

| Functional requirement | What may control it | Appropriate evidence |
| --- | --- | --- |
| Bulk current carrying | Alloy state, oxide content, porosity, section area, temperature | Defined resistivity or conductivity test on a representative specimen |
| Bolted electrical joint | Pad geometry, flatness, roughness, plating, oxidation, clamp load | Finished-interface resistance and temperature-rise test |
| Bulk heat spreading | Thermal conductivity, section thickness, temperature | Thermal-property evidence in the final material state |
| Mounted thermal interface | Face flatness, roughness, mounting load, TIM, heat-source footprint | Assembly thermal-resistance or temperature-map test |
| RF current path | Internal dimensions, surface roughness, plating, seams, frequency | RF metrology plus dimensional and surface evidence |
| Liquid-cooled conductor | Bulk conductivity, current necks, flow, contact pads, channel integrity | Electrical, hydraulic, leak, and temperature-rise acceptance |

A high coupon value can support the first and third rows. It cannot by itself close the other four.

## Define the Delivered Material State

The specification should describe the condition in which the result is required. At minimum, freeze:

- Exact grade or permitted chemistry range, including any oxygen limit that matters to the project.
- Qualified machine, material, and released process route proposed by the supplier.
- Build orientation and test direction where property direction could matter.
- Stress relief, anneal, or other thermal exposure.
- Support removal, cut-off, machining, polishing, plating, and cleaning sequence.
- Condition at test: as-built, heat treated, machined, plated, or fully assembled.
- Test temperature, method, units, locations, sample count, and acceptance rule.

The current [EOS Copper CuCP process data sheet](https://www.eos.info/metal-solutions/data-sheets/copper/pds-eos-copper-cucp-eos-m-290-1kw-40um) illustrates why these qualifiers matter. It reports a typical vertical electrical conductivity of 100.7% IACS for its named 1 kW system and 40 micrometre route using ASTM E1004-17. The same document states that conductivity and defect percentage depend on powder use level and build-platform position, and that heat treatment can maximize conductivity. This is useful route-specific evidence. It is not a general promise for every pure-copper machine, geometry, powder lot, or finished part.

The data sheet also states a minimum wall value for its specific process. That value is a process reference, not permission to apply the same wall to a long pressure channel, an unsupported roof, a machined sealing land, or an inaccessible RF surface.

## Choose a Conductivity Test That Fits the Specimen

Do not copy a target before deciding how it can be measured.

### Eddy-current conductivity

[ASTM E1004](https://store.astm.org/e1004-23.html) is commonly used for eddy-current conductivity of nonmagnetic materials. Probe access, surface roughness, curvature, local thickness, calibration, and temperature correction affect suitability. A flat witness coupon may be straightforward; a small curved port, rough as-built wall, or thin lattice is not equivalent.

### Direct resistance or resistivity

[ASTM B193](https://store.astm.org/standards/b193) addresses resistivity of electrical conductor materials. A prepared bar, current path, or component-specific fixture may better represent an electrical part when dimensions and contact arrangements are controlled. The test plan should state how lead resistance, contact resistance, temperature, and effective section area are handled.

### Thermal-property evidence

Electrical and thermal conductivity are related in metals, but one should not be used as an automatic purchase substitute for the other. For thermal acceptance, state whether thermal conductivity is measured directly or derived from measured diffusivity, heat capacity, and density. [ASTM E1461](https://store.astm.org/e1461-13.html) describes flash-method thermal diffusivity; the result still needs specimen, final-state, and temperature context.

For a cold plate or heat spreader, a part-level test with defined heat input, coolant, mounting pressure, interface material, sensor positions, and stabilization rule may be more relevant than an additional coupon decimal place.

## Decide How Coupon Evidence Transfers to the Part

Use a same-build witness only after documenting what it represents.

| Transfer question | Better requirement | Weak requirement |
| --- | --- | --- |
| Build relationship | Same build, location recorded, same released route | Historic coupon from an unspecified build |
| Material state | Same heat treatment and relevant finishing sequence | Coupon tested before the part's final heat exposure |
| Direction | Build orientation and measurement direction recorded | One value with no orientation |
| Measurement surface | Method-compatible surface and thickness | Rough or curved part measured without suitability review |
| Functional relevance | Bulk test plus interface or system test where needed | Coupon used as proof of contact or thermal performance |
| Repeat production | Sampling and change triggers defined | First result assumed valid forever |

The [copper LPBF supplier qualification guide](/posts/EngineeringGuide/copper-lpbf-supplier-qualification-conductivity-critical-parts/) explains how to extend this transfer argument into repeat-build controls.

## Write the Specification as an Evidence Chain

A practical drawing or purchase specification can use this structure:

1. **Material identity:** permitted pure-copper grade or chemistry range and required delivered condition.
2. **Process boundary:** approved machine-material-process route or supplier proposal subject to evidence review.
3. **Bulk property:** conductivity or resistivity target, method, temperature, direction, specimen, and sample count.
4. **Critical interfaces:** machined pads or faces, flatness, roughness, plating, cleaning, and protection from oxidation.
5. **Part-level performance:** resistance, temperature rise, thermal resistance, RF response, or another functional result under defined boundary conditions.
6. **Records:** material traceability, build identity, heat-treatment record, machining/plating record, test report, and deviations.
7. **Change control:** powder source, process revision, machine family, thermal cycle, finishing, test method, and geometry changes that require review.

If the design team cannot yet set a conductivity threshold, state the operating current, allowable temperature rise, heat load, interface, and service temperature. A supplier can then propose a measurable route rather than guess at an isolated IACS value.

## When Pure Copper Is the Wrong Starting Point

Do not select pure copper automatically when the part contains:

- Highly loaded threads or ports with limited engagement length.
- Thin pressure walls exposed to repeated pressure and thermal cycles.
- High clamp loads around a sealing or thermal interface.
- Elevated-temperature exposure where softening or creep matters.
- Wear, impact, fatigue, or handling loads that dominate conductivity.
- A geometry that can be machined from wrought copper with fewer qualification steps.

In those cases, compare CuCrZr, another copper alloy, a wrought-and-machined route, or a hybrid assembly. The companion guide explains [when CuCrZr is a stronger candidate for threaded and pressure-boundary copper AM parts](/posts/EngineeringGuide/when-cucrzr-is-better-for-threaded-and-pressure-boundary-copper-am-parts/).

## RFQ Inputs for a Pure-Copper Conductivity Requirement

Send these inputs with the CAD and drawing:

1. Continuous and peak current, heat load, or RF frequency band.
2. Operating and acceptance-test temperatures.
3. Maximum temperature rise, thermal resistance, electrical resistance, or conductivity target.
4. Contact pads, thermal faces, current necks, and other critical regions marked on the drawing.
5. Material grade or permission to compare pure copper and CuCrZr.
6. Required heat treatment, machining, polishing, plating, cleaning, and assembly state.
7. Proposed conductivity or resistivity method and reporting units.
8. Coupon relationship, test locations, sampling, and documentation.
9. Part-level electrical, thermal, hydraulic, RF, or interface test.
10. Prototype quantity, repeat quantity, schedule, and change-control expectation.

The resulting requirement should read as a chain:

**function -> delivered material state -> representative measurement -> finished interface -> part-level evidence**

That chain is more useful to a buyer and supplier than a powder-purity line or a context-free conductivity target.

Submit the project through the [secure RFQ form](/rfq/#rfq-form) with the CAD, drawing, quantity, operating duty, material direction, and intended acceptance method. COPPER 3DP coordinates supplier-route and quotation review; final feasibility and acceptance remain specific to the selected process and component.
