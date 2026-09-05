---
title: '3D Printed Copper Cold Plate RFQ Checklist'
publishDate: 2026-01-25
updateDate: 2026-09-05
excerpt: 'A practical RFQ checklist for custom 3D printed copper cold plates: leak test criteria, pressure drop specs, GD&T, materials, and documentation.'
category: Engineering Guide
tags: ['copper-cold-plates', 'rfq-specification', 'engineering-guide']
author: 'COPPER 3DP Engineering'
metadata:
  title: '3D Printed Copper Cold Plate RFQ Checklist'
  description: 'A practical RFQ checklist for custom 3D printed copper cold plates: leak test criteria, pressure drop specs, GD&T, materials, and documentation.'
  canonical: https://copper3dp.com/posts/EngineeringGuide/rfq-checklist-custom-3d-printed-copper-cold-plates/
---

A useful copper cold plate RFQ separates **what is known, what still needs engineering, and what the supplier is being asked to deliver**. You do not need a completed qualification plan before making first contact. You do need to prevent assumptions from becoming invisible quotation exclusions.

Use the [online RFQ form](/rfq/?project=heat-exchanger) for an initial inquiry. This checklist supports the follow-up technical handover; it is not another form or a requirement to fill every field before asking a question.



## Choose the right starting point

### Early feasibility review

Send the available CAD, sketch or envelope; the application; heat-source arrangement; coolant and operating conditions if known; expected quantity; and the main problem to solve. Identify fixed interfaces and whether design changes are allowed. Mark unknowns clearly.

The first deliverable may be a list of manufacturing risks, missing inputs and candidate routes, rather than a firm production price. The [thermal design support page](/thermal-design-validation/) explains the development path when the fluid architecture is not yet settled.

### Quotation against a controlled design

Provide the model and drawing revisions, finished-part requirements, acceptance scope, delivery state and commercial quantities. State which document controls if the model and drawing disagree. Agree how substitutions and design changes will be approved.

For general file preparation, reuse the [CAD preparation guide](/posts/EngineeringGuide/how-to-prepare-cad-files-for-copper-metal-3d-printing/) rather than creating another cold plate file format.

## Use a requirement register, not a list of hidden assumptions

The owner column below is a role to agree, not a statement that one party always carries the responsibility.

| Requirement | Information to hand over | Owner and open question |
| --- | --- | --- |
| Thermal duty | Heat map, inlet conditions, allowable temperatures and interface stack | System designer: which limits are fixed and which are targets? |
| Hydraulic duty | Coolant, flow range, pressure-loss budget, pressure and transient conditions | Cooling-system owner: which installed conditions govern? |
| Geometry and interfaces | Controlled CAD/drawing, datum scheme, contact faces, ports and seals | Design owner: may channels, wall sections or port transitions change? |
| Material and final state | Grade preference or functional need; required final-property evidence | Buyer and supplier: what must be verified after processing? |
| Cleanliness and compatibility | Permitted residues, cleaning constraints, fluid and mating-material compatibility | System owner: what evidence supports installation into the loop? |
| Acceptance | Critical dimensions, selected tests, limits, sampling and report requirements | Quality and engineering: which items remain undecided? |
| Delivery | Prototype and recurring quantities, required date, packaging and documentation | Purchasing: what is included, optional or excluded? |

Track each item as provided, proposed, awaiting approval, or out of scope. Avoid a field marked “standard” unless the exact document, revision and applicable requirement are identified.

## Define the finished state being purchased

An as-built body, a machined and cleaned part, and a tested assembly with connectors are different deliverables. List the applicable operations and who owns them.

For heat treatment, machining, HIP or plating, specify the reason and resulting acceptance state rather than treating every operation as mandatory. Do not assume that a process step can repair any defect or that coating replaces verification of the fluid boundary.

A material name alone is not a conductivity or strength guarantee. Use the [finished material specification guide](/posts/EngineeringGuide/writing-a-copper-am-material-specification-when-strength-and-conductivity-both-matter/) if both properties affect the design.

[ISO/ASTM 52908:2023](https://www.iso.org/standard/81779.html) provides a relevant qualification and finished-part inspection framework for metal PBF. The project still needs its own applicable requirements and agreed evidence; this checklist is not a declaration of compliance.

## Make quotations comparable

Ask each supplier to return the same inclusion matrix:

| Quote item | Clarification to request |
| --- | --- |
| Engineering and first article | Design review, proposed changes, trial parts and revision allowance |
| Recurring manufacture | Named route, material state, quantity basis and included operations |
| Interfaces | Contact-face finishing, port machining, connectors and sealing components |
| Cleaning | Internal and external cleaning, verification and preservation for shipment |
| Inspection and testing | Procedure development, fixtures, part coverage, reports and any external laboratory work |
| Documentation | Material/process traceability, dimensional results and agreed release records |
| Exceptions | Unresolved requirements, buyer-supplied items and assumptions that affect price or schedule |

Separate one-time costs from recurring unit costs. Request a lead-time basis tied to design approval, material availability, manufacturing and any external testing. This page does not promise a standard NRE amount, quote accuracy percentage or delivery interval.

## Turn “no leaks” into an agreed test requirement

At quotation stage, distinguish operating pressure, proof loading, leakage sensitivity and hydraulic performance. If limits are not yet defined, price the work needed to establish them instead of inserting a generic pressure multiplier or helium leak number.

For test selection, read the [proof, leak and flow guide](/posts/EngineeringGuide/proof-pressure-helium-leak-flow-test-copper-am-acceptance/). For CT coverage and ambiguous results, use the [cold plate inspection criteria guide](/posts/EngineeringGuide/ct-scan-leak-test-acceptance-criteria-copper-cold-plates/). For data-center projects, identify the applicable platform requirements through the [OCP cold plate workstream](https://www.opencompute.org/wiki/Cooling_Environments/Cold_Plate).

## Agree revision and release responsibilities

A changed channel, coolant, material state, joining route, machining operation or inspection method can alter the evidence required. Agree which changes trigger engineering review and what must be reverified. Do not silently ship a substituted route under the original approval.

Before the first article is released, reconcile every open requirement with a result, an approved concession, or an explicit hold. A pass/fail report with no part revision or test conditions is not a complete handover.

### Can I request a quote without choosing pure copper or CuCrZr?

Yes. State the operating needs and mark material selection as a review item. The quotation should identify the proposed grade, final state and verification scope before manufacture.

### Must CAD be uploaded at first contact?

An early description can start the discussion. Provide available files through the existing inquiry route when appropriate; restricted designs can first be discussed without disclosing confidential geometry. Detailed manufacturing commitments require adequate controlled information.

### What if the project is still a prototype?

Separate learning objectives from acceptance requirements. A prototype intended to evaluate routing is not automatically qualified for installed service.

[Start a cold plate inquiry](/rfq/?project=heat-exchanger), or use the optional email template on the same page.
