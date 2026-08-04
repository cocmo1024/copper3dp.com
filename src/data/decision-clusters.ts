export interface DecisionGuideLink {
  topicId: string;
  title: string;
  description: string;
  href: string;
}

export interface DecisionCluster {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  audience: string;
  decision: string;
  boundary: string;
  questions: Array<{ title: string; description: string }>;
  guides: DecisionGuideLink[];
  related: Array<{ title: string; description: string; href: string }>;
}

export const decisionClusters: DecisionCluster[] = [
  {
    slug: 'materials-selection',
    name: 'Pure Copper and CuCrZr Material Selection',
    shortName: 'Materials selection',
    eyebrow: 'Decision cluster 01',
    description:
      'Choose the delivered material state from conductivity, strength, pressure, temperature, joining, and inspection requirements rather than from an alloy name alone.',
    audience: 'Thermal, electrical, mechanical, design, and sourcing engineers',
    decision:
      'Use pure copper when the finished current or heat path dominates and mechanical loads can be controlled. Evaluate CuCrZr when threads, clamp load, pressure, thermal cycling, or resistance to softening become controlling requirements.',
    boundary:
      'Published values belong to a named machine-material-process-test combination. They are reference evidence, not universal design allowables or a promise for a new geometry.',
    questions: [
      {
        title: 'What property controls function?',
        description:
          'Separate bulk conductivity from contact resistance, interface flatness, pressure integrity, and service strength.',
      },
      {
        title: 'What is the delivered state?',
        description:
          'Lock heat treatment, machining, plating, cleaning, test temperature, direction, and specimen relationship.',
      },
      {
        title: 'Where can a softer alloy fail?',
        description:
          'Review threads, ports, clamps, thin pressure walls, fatigue locations, and elevated-temperature exposure.',
      },
      {
        title: 'What evidence closes the decision?',
        description:
          'Pair route-specific coupons with finished interfaces and a part-level functional test where needed.',
      },
    ],
    guides: [
      {
        topicId: 'T011',
        title: 'Specify Pure Copper LPBF by Finished Conductivity',
        description: 'Turn a vague high-conductivity request into a testable delivered-part specification.',
        href: '/posts/EngineeringGuide/specifying-pure-copper-lpbf-parts-by-finished-conductivity-not-powder-grade/',
      },
      {
        topicId: 'T014',
        title: 'When CuCrZr Fits Threaded and Pressure-Boundary Parts',
        description: 'Decide when added strength and heat-treatment control justify the conductivity trade-off.',
        href: '/posts/EngineeringGuide/when-cucrzr-is-better-for-threaded-and-pressure-boundary-copper-am-parts/',
      },
    ],
    related: [
      {
        title: 'Copper material services',
        description: 'Compare commercial pure-copper and copper-alloy routes.',
        href: '/materials/',
      },
      {
        title: 'Pure copper service path',
        description: 'Review pure-copper AM fit, evidence, and RFQ inputs.',
        href: '/pure-copper-3d-printing/',
      },
      {
        title: 'CuCrZr service path',
        description: 'Review CuCrZr applications, heat treatment, and delivery scope.',
        href: '/cucrzr-3d-printing/',
      },
      {
        title: 'Material evidence library',
        description: 'Trace material families and final-state caveats.',
        href: '/knowledge/materials-and-properties/',
      },
    ],
  },
  {
    slug: 'cold-plates-heat-exchangers',
    name: 'Copper Cold Plates and Heat Exchangers',
    shortName: 'Cold plates and heat exchangers',
    eyebrow: 'Decision cluster 02',
    description:
      'Connect heat load, coolant, pressure drop, channel distribution, cleanliness, corrosion, leakage, and thermal test conditions before geometry is released for copper AM.',
    audience: 'Thermal, fluid, reliability, packaging, and sourcing engineers',
    decision:
      'Use additive copper when integrated flow distribution or heat-transfer area creates measurable system value. Keep machined or brazed routes in the comparison when channels are simple, inspection access is critical, or production volume favors conventional manufacturing.',
    boundary:
      'A printable channel is not automatically cleanable, measurable, corrosion-compatible, or pressure-qualified. Acceptance must cover the finished hydraulic and thermal system.',
    questions: [
      {
        title: 'Is the duty fully defined?',
        description:
          'Provide heat map, heat load, inlet temperature, flow range, coolant properties, and ambient boundary.',
      },
      {
        title: 'Can every passage be fed and cleaned?',
        description: 'Review header balance, trapped powder, flush access, filtration, and residue limits.',
      },
      {
        title: 'Which pressure matters?',
        description: 'Separate operating, transient, design, proof, burst, and leakage requirements.',
      },
      {
        title: 'How is performance accepted?',
        description:
          'Define pressure-drop, flow-distribution, thermal-resistance, leak, cleanliness, and flatness methods.',
      },
    ],
    guides: [
      {
        topicId: 'T045',
        title: 'Port and Seal Design for Monolithic Copper Cold Plates',
        description: 'Coordinate machined ports, sealing lands, remaining wall, datums, and pressure acceptance.',
        href: '/posts/EngineeringGuide/port-seal-design-monolithic-3d-printed-copper-cold-plates/',
      },
      {
        topicId: 'T060',
        title: 'Flow-Distribution Testing for Multi-Passage Heat Exchangers',
        description: 'Choose a test architecture that can detect maldistribution hidden by total flow data.',
        href: '/posts/EngineeringGuide/flow-distribution-acceptance-testing-multi-passage-copper-heat-exchangers/',
      },
    ],
    related: [
      {
        title: 'Copper cold plate service',
        description: 'Review application fit, manufacturability, and quotation inputs.',
        href: '/copper-cold-plates/',
      },
      {
        title: 'Copper heat exchanger service',
        description: 'Review compact core, passage, and validation scope.',
        href: '/copper-heat-exchangers/',
      },
      {
        title: 'Internal-channel cleaning',
        description: 'Plan powder removal, flushing, and evidence for hidden passages.',
        href: '/posts/EngineeringGuide/copper-am-cleaning-powder-removal-internal-channels/',
      },
      {
        title: 'CT and leak criteria',
        description: 'Coordinate internal inspection with pressure integrity.',
        href: '/posts/EngineeringGuide/ct-scan-leak-test-acceptance-criteria-copper-cold-plates/',
      },
    ],
  },
  {
    slug: 'rf-components',
    name: 'Copper AM RF and Microwave Components',
    shortName: 'RF components',
    eyebrow: 'Decision cluster 03',
    description:
      'Translate electromagnetic sensitivity into manufacturable dimensions, surface zones, plating allowances, tuning stock, vacuum interfaces, and RF acceptance evidence.',
    audience: 'RF, microwave, vacuum, accelerator, manufacturing, and metrology engineers',
    decision:
      'Use copper AM when integrated bends, twists, cooling, cavities, or feed networks remove assemblies or unlock geometry. Do not accept bulk conductivity as proof of RF performance.',
    boundary:
      'Frequency band alone does not set a universal roughness or tolerance limit. The design team must identify electrically sensitive surfaces and use simulation plus measurement for the actual component.',
    questions: [
      {
        title: 'Which surfaces carry RF current?',
        description: 'Zone internal walls, corners, flanges, seams, transitions, and tuning features by sensitivity.',
      },
      {
        title: 'What state reaches those surfaces?',
        description: 'Define as-built, polished, plated, machined, or inaccessible internal areas separately.',
      },
      {
        title: 'How does finishing move geometry?',
        description: 'Budget stock, edge rounding, plating thickness, datum transfer, and frequency shift.',
      },
      {
        title: 'What proves the finished component?',
        description:
          'Coordinate dimensional metrology, surface evidence, coating records, leak tests, and VNA or resonant measurement.',
      },
    ],
    guides: [
      {
        topicId: 'T101',
        title: 'Waveguide Surface Finish and Plating by Frequency Band',
        description: 'Allocate finishing by electrical sensitivity instead of applying one cosmetic roughness callout.',
        href: '/posts/EngineeringGuide/copper-am-waveguide-surface-finish-plating-frequency-band/',
      },
      {
        topicId: 'T102',
        title: 'Tolerance Planning for Printed Waveguide Bends and Twists',
        description:
          'Build a tolerance budget across printed interiors, machined interfaces, cooling paths, and RF measurement.',
        href: '/posts/EngineeringGuide/tolerance-planning-printed-copper-waveguide-bends-twists-cooling-paths/',
      },
    ],
    related: [
      {
        title: 'Copper RF waveguide service',
        description: 'Review geometry, finishing, vacuum, and inspection scope.',
        href: '/copper-rf-waveguides/',
      },
      {
        title: 'RF and vacuum design guide',
        description: 'Screen part consolidation, interfaces, surfaces, and acceptance.',
        href: '/posts/EngineeringGuide/3d-printed-copper-rf-waveguide-vacuum-components/',
      },
      {
        title: 'RF public evidence',
        description: 'Review what public cases prove and what remains component-specific.',
        href: '/knowledge/applications/#rf-waveguides-accelerators',
      },
      {
        title: 'Quality planning',
        description: 'Connect dimensional, surface, coating, leak, and functional tests.',
        href: '/knowledge/quality-and-qualification/',
      },
    ],
  },
  {
    slug: 'power-electronics',
    name: 'Copper AM for Power Electronics',
    shortName: 'Power electronics',
    eyebrow: 'Decision cluster 04',
    description:
      'Coordinate current, heat, coolant, dielectric separation, galvanic compatibility, contact interfaces, pressure cycles, and environmental validation in one component decision.',
    audience: 'Power-electronics, EV, thermal, electrical-safety, reliability, and sourcing engineers',
    decision:
      'Use copper AM when current paths and cooling paths can be integrated without compromising isolation, serviceability, or fluid compatibility. Separate the conductive body from the complete insulation and cooling system qualification.',
    boundary:
      'Copper conductivity does not resolve creepage, clearance, dielectric, galvanic, corrosion, contamination, or coolant-aging requirements. Those remain system-level decisions.',
    questions: [
      {
        title: 'What is the loss map?',
        description:
          'Provide continuous and transient electrical losses, hot spots, duty cycle, and allowable junction or case temperature.',
      },
      {
        title: 'Where is electrical isolation?',
        description:
          'Identify barriers, coating or ceramic interfaces, creepage, clearance, assembly tolerance, and test voltage.',
      },
      {
        title: 'What fluid touches which metal?',
        description:
          'Define coolant chemistry, inhibitors, dissolved oxygen, mixed-metal loop, temperature, and maintenance.',
      },
      {
        title: 'What is tested after assembly?',
        description:
          'Plan resistance, temperature rise, dielectric, leak, pressure, vibration, and thermal-cycle evidence in final condition.',
      },
    ],
    guides: [
      {
        topicId: 'T082',
        title: 'Coolant Chemistry and Galvanic Risk in SiC Cold Plates',
        description: 'Screen the complete mixed-metal cooling loop before choosing copper material and surface state.',
        href: '/posts/EngineeringGuide/coolant-chemistry-galvanic-risk-sic-module-copper-cold-plates/',
      },
      {
        topicId: 'T088',
        title: 'Electrical Isolation and Fluid Routing in Charger Cooling Blocks',
        description:
          'Co-design dielectric barriers, fluid paths, datums, and final safety tests for OBC and DC-DC hardware.',
        href: '/posts/EngineeringGuide/electrical-isolation-fluid-routing-copper-am-charger-cooling-blocks/',
      },
    ],
    related: [
      {
        title: 'Copper busbar service',
        description: 'Review current paths, contact pads, cooling, and joining scope.',
        href: '/copper-busbars/',
      },
      {
        title: 'SiC cold plate review',
        description: 'Connect heat flux, interface control, fluid duty, and acceptance.',
        href: '/posts/EngineeringGuide/copper-3d-printed-cold-plate-case-study-sic-power-module-cooling/',
      },
      {
        title: 'Electrical conductivity guide',
        description: 'Separate bulk conductivity from contact and assembly resistance.',
        href: '/posts/EngineeringGuide/electrical-conductivity-in-3d-printed-copper-parts/',
      },
      {
        title: 'Electrical application map',
        description: 'Review power, motor, conductor, and cooling evidence.',
        href: '/knowledge/applications/#motors-drives-power-electronics',
      },
    ],
  },
  {
    slug: 'semiconductor-equipment',
    name: 'Copper AM for Semiconductor Equipment',
    shortName: 'Semiconductor equipment',
    eyebrow: 'Decision cluster 05',
    description:
      'Control thermal uniformity, RF current, vacuum boundaries, flatness, cleanability, contamination, metrology, and traceability for precision process and test equipment.',
    audience: 'Semiconductor equipment, plasma, vacuum, thermal, metrology, packaging, and sourcing engineers',
    decision:
      'Use copper AM where integrated thermal, RF, vacuum, or fluid geometry creates measurable tool value. Raise the evidence burden when hidden passages, UHV service, sensitive process zones, or precision datum networks are involved.',
    boundary:
      'A public copper AM capability or attractive sample does not establish fab compatibility, UHV suitability, cleanliness, outgassing, or process-tool qualification.',
    questions: [
      {
        title: 'Which function controls the design?',
        description:
          'Separate thermal uniformity, RF current, vacuum conductance, mechanical location, and service access.',
      },
      {
        title: 'Where are the contamination boundaries?',
        description:
          'Map wetted volumes, vacuum surfaces, trapped powder risks, plating, cleaning media, and packaging.',
      },
      {
        title: 'How are datums preserved?',
        description:
          'Plan stress relief, support removal, machining sequence, flatness, inspection temperature, and assembly loads.',
      },
      {
        title: 'What remains traceable?',
        description:
          'Define material lot, build route, thermal processing, machining, cleaning, inspection, deviation, and change records.',
      },
    ],
    guides: [
      {
        topicId: 'T093',
        title: 'Co-Design RF Current Paths and Vacuum Channels',
        description:
          'Avoid solving plasma RF, cooling, and vacuum constraints in separate and incompatible geometry loops.',
        href: '/posts/EngineeringGuide/co-designing-rf-current-paths-vacuum-channels-copper-plasma-hardware/',
      },
      {
        topicId: 'T096',
        title: 'Flatness, Cleanliness, and Traceability for Metrology Parts',
        description:
          'Create a release plan for precision copper components whose final value depends on controlled interfaces.',
        href: '/posts/EngineeringGuide/flatness-cleanliness-traceability-copper-metrology-components/',
      },
    ],
    related: [
      {
        title: 'Semiconductor cooling service',
        description: 'Review cooling blocks, precision interfaces, and quotation inputs.',
        href: '/copper-semiconductor-cooling/',
      },
      {
        title: 'Semiconductor equipment RFQ guide',
        description: 'Define thermal, RF, vacuum, electrical, and cleanliness inputs.',
        href: '/posts/EngineeringGuide/copper-am-semiconductor-equipment-rfq/',
      },
      {
        title: 'Vacuum manifold design review',
        description: 'Screen internal routing, sealing, cleaning, and verification.',
        href: '/posts/EngineeringGuide/copper-am-vacuum-manifold-case-study-rf-semiconductor-hardware/',
      },
      {
        title: 'Semiconductor evidence map',
        description: 'Trace public applications and evidence boundaries.',
        href: '/knowledge/applications/#semiconductor-advanced-packaging',
      },
    ],
  },
  {
    slug: 'quality-acceptance',
    name: 'Copper AM Quality and Acceptance',
    shortName: 'Quality and acceptance',
    eyebrow: 'Decision cluster 06',
    description:
      'Build a finished-part evidence chain that distinguishes material identity, process control, porosity, conductivity, dimensions, surfaces, pressure integrity, cleanliness, and functional performance.',
    audience: 'Quality, supplier development, test, reliability, design, and sourcing engineers',
    decision:
      'Choose tests from the part failure modes and delivered state. Do not treat density, a machine log, one coupon, or one pressure result as a complete acceptance package.',
    boundary:
      'Standards provide frameworks and methods. The drawing, specification, purchase order, and qualification plan still need project-specific acceptance values and responsibilities.',
    questions: [
      {
        title: 'What can actually fail?',
        description:
          'List leakage, blockage, conductivity loss, crack, distortion, contamination, interface, and functional failure modes.',
      },
      {
        title: 'Which evidence is material-level?',
        description:
          'Separate chemistry, density, conductivity, tensile, hardness, and heat-treatment evidence from part function.',
      },
      {
        title: 'Which tests are complementary?',
        description:
          'Use CT, sectioning, proof, leak, flow, dimensional, cleanliness, and functional tests for different questions.',
      },
      {
        title: 'What controls repeat builds?',
        description:
          'Lock essential variables, witness strategy, sampling, subcontractors, deviations, and change notification.',
      },
    ],
    guides: [
      {
        topicId: 'T099',
        title: 'Release a Copper LPBF Thermal Part with the Right Evidence',
        description:
          'Connect alloy, powder, representative geometry, cleaning, final material state, inspection, and functional tests in one risk-based release plan.',
        href: '/posts/EngineeringGuide/copper-lpbf-thermal-hardware-release-guide/',
      },
      {
        topicId: 'T035',
        title: 'Why Relative Density Cannot Predict Conductivity',
        description: 'Keep porosity evidence in its proper role and specify conductivity separately.',
        href: '/posts/EngineeringGuide/why-relative-density-alone-cannot-predict-copper-am-conductivity/',
      },
      {
        topicId: 'T038',
        title: 'Choose Proof, Helium Leak, or Flow Acceptance Tests',
        description: 'Match each pressure or flow test to the failure mode it can and cannot detect.',
        href: '/posts/EngineeringGuide/proof-pressure-helium-leak-flow-test-copper-am-acceptance/',
      },
    ],
    related: [
      {
        title: 'Quality and qualification library',
        description: 'Build the full material-to-release evidence chain.',
        href: '/knowledge/quality-and-qualification/',
      },
      {
        title: 'Supplier qualification',
        description: 'Qualify conductivity-critical routes and repeat-build controls.',
        href: '/posts/EngineeringGuide/copper-lpbf-supplier-qualification-conductivity-critical-parts/',
      },
      {
        title: 'Prototype build planning',
        description: 'Plan coupons, stock, datums, and first-build acceptance.',
        href: '/posts/EngineeringGuide/copper-am-prototype-build-planning/',
      },
      {
        title: 'Defect diagnosis',
        description: 'Connect observed evidence to bounded corrective actions.',
        href: '/knowledge/defects/',
      },
    ],
  },
];

export const decisionClusterBySlug = new Map(decisionClusters.map((cluster) => [cluster.slug, cluster]));
