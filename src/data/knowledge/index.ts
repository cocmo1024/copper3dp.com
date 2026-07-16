import applicationsRaw from './generated/applications.json';
import casesRaw from './generated/cases.json';
import defectsRaw from './generated/defects.json';
import equipmentRaw from './generated/equipment.json';
import glossaryRaw from './generated/glossary.json';
import manifestRaw from './generated/manifest.json';
import sourcesRaw from './generated/sources.json';
import technicalRaw from './generated/technical.json';
import topicsRaw from './generated/topics.json';

export type EvidenceTier = 'A' | 'B' | 'C' | 'D' | 'U';
export type KnowledgeRecord = Record<string, string>;

export const knowledgeManifest = manifestRaw;
export const knowledgeSources = sourcesRaw as KnowledgeRecord[];
export const knowledgeEquipment = equipmentRaw as KnowledgeRecord[];
export const knowledgeApplications = applicationsRaw as KnowledgeRecord[];
export const knowledgeCases = casesRaw as KnowledgeRecord[];
export const technicalEvidence = technicalRaw as KnowledgeRecord[];
export const contentCandidates = topicsRaw as KnowledgeRecord[];

export const knowledgeSections = [
  { title: 'Overview', href: '/knowledge/' },
  { title: 'Materials', href: '/knowledge/materials-and-properties/' },
  { title: 'Processes', href: '/knowledge/process-selection/' },
  { title: 'Applications', href: '/knowledge/applications/' },
  { title: 'Equipment', href: '/knowledge/equipment/' },
  { title: 'Case library', href: '/knowledge/case-library/' },
  { title: 'Quality', href: '/knowledge/quality-and-qualification/' },
  { title: 'Defects', href: '/knowledge/defects/' },
  { title: 'Glossary', href: '/knowledge/glossary/' },
  { title: 'Sources', href: '/knowledge/sources/' },
] as const;

export const evidenceLabels: Record<EvidenceTier, { label: string; description: string }> = {
  A: {
    label: 'Tier A',
    description: 'Standards, government or research institutions, or peer-reviewed primary research.',
  },
  B: {
    label: 'Tier B',
    description: 'Official manufacturer data, product documentation, or a named supplier/customer application.',
  },
  C: {
    label: 'Tier C',
    description: 'Adjacent benchmark or secondary context that must not be presented as direct copper AM proof.',
  },
  D: {
    label: 'Tier D',
    description: 'Unverified lead retained for research only.',
  },
  U: {
    label: 'Unclassified',
    description: 'The source is retained, but its evidence class needs manual review before external use.',
  },
};

export const splitKnowledgeList = (value = ''): string[] =>
  value
    .split(/[;；]/)
    .map((item) => item.trim())
    .filter(Boolean);

export const sourceById = new Map(knowledgeSources.map((source) => [source.source_id, source]));
export const getSource = (sourceId: string | undefined): KnowledgeRecord | undefined =>
  sourceId ? sourceById.get(sourceId) : undefined;

const priorityOrder: Record<string, number> = { 'A+': 0, A: 1, 'A-': 2, 'B+': 3, B: 4, 'B-': 5 };
export const applicationsByPriority = [...knowledgeApplications].sort(
  (a, b) => (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99)
);

export const casesByApplication = new Map(
  knowledgeApplications.map((application) => [
    application.id,
    knowledgeCases.filter((item) => item.application_id === application.id),
  ])
);

export const equipmentByProcess = new Map<string, KnowledgeRecord[]>();
for (const item of knowledgeEquipment) {
  const family = item.process || 'Other process';
  const current = equipmentByProcess.get(family) ?? [];
  current.push(item);
  equipmentByProcess.set(family, current);
}

const classifyEquipmentProcess = (process: string): string => {
  const value = process.toLowerCase();
  if (value.includes('electron-beam')) return 'Electron-beam powder bed fusion';
  if (value.includes('lpbf') || value.includes('dmls') || value.includes('dmp')) return 'Laser powder bed fusion';
  if (value.includes('binder')) return 'Binder jetting and sintering';
  if (value.includes('cold spray') || value.includes('kinetic')) return 'Cold-spray additive manufacturing';
  if (value.includes('ultrasonic')) return 'Ultrasonic additive manufacturing';
  if (value.includes('electrochemical')) return 'Electrochemical and micro-additive manufacturing';
  if (value.includes('lithography')) return 'Lithography-based metal manufacturing';
  if (value.includes('waam') || value.includes('wire additive')) return 'Wire-arc and wire additive manufacturing';
  if (value.includes('ded')) return 'Laser directed energy deposition';
  if (value.includes('extrusion') || value.includes('fff') || value.includes('paste')) {
    return 'Bound-metal extrusion and sintering';
  }
  return 'Other copper additive routes';
};

export const equipmentProcessGroups = new Map<string, KnowledgeRecord[]>();
for (const item of knowledgeEquipment) {
  const family = classifyEquipmentProcess(item.process || '');
  const current = equipmentProcessGroups.get(family) ?? [];
  current.push(item);
  equipmentProcessGroups.set(family, current);
}

export const applicationPrimaryLinks: Record<string, { title: string; href: string }> = {
  'APP-01': { title: 'Review high-temperature material paths', href: '/materials/' },
  'APP-02': { title: 'Open copper cold plate guide', href: '/copper-cold-plates/' },
  'APP-03': { title: 'Open copper heat exchanger guide', href: '/copper-heat-exchangers/' },
  'APP-04': { title: 'Open copper RF waveguide guide', href: '/copper-rf-waveguides/' },
  'APP-05': { title: 'Open copper induction coil guide', href: '/copper-induction-coils/' },
  'APP-06': { title: 'Open conformal cooling guide', href: '/copper-conformal-cooling-inserts/' },
  'APP-07': { title: 'Open copper busbar guide', href: '/copper-busbars/' },
  'APP-08': {
    title: 'Review power-electronics cooling evidence',
    href: '/posts/EngineeringGuide/copper-3d-printed-cold-plate-case-study-sic-power-module-cooling/',
  },
  'APP-09': { title: 'Compare process routes', href: '/knowledge/process-selection/' },
  'APP-10': { title: 'Build a qualification plan', href: '/knowledge/quality-and-qualification/' },
  'APP-11': { title: 'Review heat exchanger constraints', href: '/copper-heat-exchangers/' },
  'APP-12': { title: 'Review evidence boundaries', href: '/knowledge/case-library/' },
  'APP-13': { title: 'Open semiconductor cooling guide', href: '/copper-semiconductor-cooling/' },
};

export const sourceCategories = [...new Set(knowledgeSources.map((source) => source.category_en))].sort();

export const materialFamilies = [
  {
    name: 'Pure copper and high-conductivity copper',
    designations: 'Cu-OF / OFHC, Cu-ETP, commercially pure copper, system-specific grades such as CuCP',
    chooseWhen: 'Thermal or electrical conductivity dominates and structural loads can be controlled.',
    watch: 'Oxygen content, final density, annealed strength, sealing surfaces, and conductivity after all finishing.',
    links: [
      { title: 'Pure copper service path', href: '/pure-copper-3d-printing/' },
      {
        title: 'Conductivity guide',
        href: '/posts/EngineeringGuide/electrical-conductivity-in-3d-printed-copper-parts/',
      },
    ],
  },
  {
    name: 'CuCrZr / CuCr1Zr',
    designations: 'CuCrZr, CuCr1Zr, C18150, CW106C',
    chooseWhen: 'Threads, clamp loads, pressure boundaries, thermal cycling, or softening resistance matter.',
    watch:
      'Composition range, solution and ageing route, machining sequence, and the final strength-conductivity state.',
    links: [
      { title: 'CuCrZr service path', href: '/cucrzr-3d-printing/' },
      {
        title: 'Heat-treatment guide',
        href: '/posts/EngineeringGuide/heat-treatment-cucrzr-3d-printed-components/',
      },
    ],
  },
  {
    name: 'GRCop-42 and GRCop-84',
    designations: 'NASA-developed Cu-Cr-Nb alloy families',
    chooseWhen: 'High-temperature, high-heat-flux propulsion hardware justifies a specialized qualification route.',
    watch:
      'Powder specification, alloy-specific process data, heat treatment, bimetallic interfaces, NDE, and hot-fire evidence.',
    links: [{ title: 'Materials overview', href: '/materials/' }],
  },
  {
    name: 'CuNi and marine copper alloys',
    designations: 'CuNi30 / 70-30 CuNi and application-specific marine grades',
    chooseWhen:
      'Seawater corrosion resistance and replacement of long-lead castings matter more than maximum conductivity.',
    watch:
      'Grade approval, corrosion qualification, NDE, repair boundaries, and the difference between cold spray, DED, and LPBF.',
    links: [{ title: 'Marine application evidence', href: '/knowledge/applications/#marine-naval-offshore' }],
  },
  {
    name: 'Other functional copper alloys',
    designations: 'CuNi2SiCr, CuSn10, brass and application-specific copper alloys',
    chooseWhen:
      'Wear, strength, corrosion, casting replacement, or another functional requirement controls the choice.',
    watch: 'Do not substitute a generic copper label for the exact alloy, state, standard, or qualification basis.',
    links: [{ title: 'Technical evidence sources', href: '/knowledge/sources/' }],
  },
] as const;

export const processRoutes = [
  {
    name: 'Near-infrared LPBF',
    scale: 'Fine to medium precision parts',
    bestFor: 'Qualified pure-copper or copper-alloy parts when a proven material parameter set exists.',
    limits:
      'Copper reflectivity, rapid heat conduction, machine configuration, powder control, support removal, and residual stress.',
    proof:
      'Exact machine/material combination, density method, conductivity method, orientation, post-processing, and part-level inspection.',
  },
  {
    name: 'Green- or blue-laser LPBF',
    scale: 'Fine channels, walls, coils, RF and thermal hardware',
    bestFor: 'Improved optical coupling in pure copper and high-conductivity copper routes.',
    limits: 'Shorter wavelength does not remove geometry, gas-flow, powder, surface, or process-window constraints.',
    proof:
      'Qualified wavelength, beam profile, layer range, material grade, build envelope, and final-property evidence.',
  },
  {
    name: 'Electron-beam PBF',
    scale: 'Research to production parts in vacuum',
    bestFor: 'Copper routes where electron-beam coupling and vacuum processing are useful.',
    limits:
      'Surface condition, powder charging, dimensional resolution, vacuum workflow, and equipment availability differ from LPBF.',
    proof:
      'Material-specific build evidence, surface and dimensional data, powder reuse controls, and final conductivity.',
  },
  {
    name: 'Laser DED',
    scale: 'Medium to large near-net parts, repair and local addition',
    bestFor: 'Large thermal structures, bimetallic jackets, repair, and local material placement.',
    limits:
      'Coarser geometry, dilution, heat input, interface metallurgy, machining allowance, and application-specific development.',
    proof: 'Feedstock, deposition head, dilution, interface sections, heat treatment, NDE, and machining plan.',
  },
  {
    name: 'WAAM / wire-arc AM',
    scale: 'Large structural copper-alloy parts',
    bestFor: 'Large near-net copper-alloy hardware where deposition rate outweighs fine resolution.',
    limits:
      'Public evidence is often copper-alloy rather than high-conductivity pure copper; thermal distortion and machining are substantial.',
    proof: 'Exact wire grade, interpass control, mechanical/corrosion data, NDE, and final machining.',
  },
  {
    name: 'Cold-spray additive manufacturing',
    scale: 'Large near-net parts, repair and coatings',
    bestFor: 'Rapid solid-state deposition, corrosion-resistant alloys, field repair, and large shapes.',
    limits: 'Resolution, bonding, porosity, heat treatment, anisotropy, and machining differ from fusion routes.',
    proof: 'Powder grade, gas/process conditions, deposition efficiency, bonding tests, heat treatment, and NDE.',
  },
  {
    name: 'Binder jetting',
    scale: 'Potential batch production of small and medium parts',
    bestFor: 'Toolless batch production when sintering shrinkage and final density can be qualified.',
    limits:
      'Green-part handling, debinding, shrinkage, distortion, residual porosity, furnace loading, and supplier continuity.',
    proof:
      'Sintered chemistry, shrink compensation, lot capability, final density/conductivity, and dimensional evidence.',
  },
  {
    name: 'Bound-metal extrusion and sintering',
    scale: 'Prototype and low-volume parts',
    bestFor: 'Lower-entry workflows and shape validation where LPBF-level density or precision is not assumed.',
    limits: 'Debinding, shrinkage, support strategy, furnace uniformity, final density, surface, and conductivity.',
    proof: 'Feedstock lot, green density, debinding/sintering record, shrink map, final properties, and inspection.',
  },
  {
    name: 'Electrochemical and micro-additive routes',
    scale: 'Micron-scale features and direct-on-substrate structures',
    bestFor: 'Microprobes, coils, interconnects, RF helices, and localized copper structures.',
    limits:
      'Build envelope, throughput, array yield, substrate compatibility, contamination, and long-term reliability.',
    proof:
      'Qualified feature dimensions, adhesion, electrical performance, array yield, cleanliness, and substrate testing.',
  },
  {
    name: 'Ultrasonic additive manufacturing',
    scale: 'Layered foil structures and embedded functions',
    bestFor: 'Low-temperature foil bonding, embedded sensing, and selected multi-material assemblies.',
    limits: 'It is a foil-lamination route, not evidence for a monolithic powder-fused copper part.',
    proof: 'Foil grade, bond quality, interface testing, leak or structural evidence, and final machining.',
  },
] as const;

export const qualityGates = [
  {
    title: 'Material identity and feedstock',
    description:
      'Lock the grade, chemistry, powder or wire lot, oxygen limits, reuse rules, storage, and traceability.',
  },
  {
    title: 'Build and process control',
    description:
      'Record the qualified machine, configuration, parameter revision, atmosphere, calibration, build layout, and witness coupons.',
  },
  {
    title: 'Post-processing and dimensional state',
    description:
      'Define stress relief, solution/ageing, HIP, support removal, machining, surface treatment, cleaning, and plating before testing.',
  },
  {
    title: 'Finished-part acceptance',
    description:
      'Specify dimensional inspection, CT or sectioning, conductivity or thermal testing, pressure/leak testing, cleanliness, and documentation.',
  },
] as const;

export const rfqInputs = [
  ['Geometry', 'STEP or Parasolid model, drawing revision, units, and permission to modify the design'],
  ['Critical dimensions', 'GD&T, datums, sealing faces, machined features, and acceptance state'],
  ['Material', 'Exact copper grade or the operating requirements needed to select one'],
  [
    'Thermal or electrical target',
    'Conductivity, thermal resistance, current, temperature rise, test method, direction, and temperature',
  ],
  ['Mechanical and temperature duty', 'Loads, pressure, clamp force, cycling, fatigue, creep, and service temperature'],
  ['Internal passages', 'Minimum sections, length, turns, powder exits, cleanliness, flushing, and inspection access'],
  [
    'Fluid duty',
    'Medium, flow, inlet conditions, pressure drop, design/proof pressure, leakage limit, and corrosion constraints',
  ],
  [
    'Post-processing',
    'Heat treatment, HIP, machining, polishing, plating, prohibited media, and final surface requirements',
  ],
  [
    'Inspection',
    'CT region/resolution, density method, dimensional report, conductivity, leak/pressure method, coupons, and sampling',
  ],
  [
    'Commercial scope',
    'Prototype and annual quantities, milestones, target date, packaging, shipping, confidentiality, and documentation',
  ],
] as const;

export const defectGuides = [
  {
    id: 'optical-coupling',
    title: 'Insufficient optical coupling',
    mechanism:
      'Copper reflects much of the energy from common near-infrared lasers, which can destabilize energy coupling.',
    evidence: 'Variable melt-pool size or brightness, lack of fusion, and spatter.',
    controls:
      'Use a qualified wavelength and beam configuration, then establish power density, spot, scan and layer strategy through machine-specific DOE.',
    boundary:
      'A shorter wavelength improves coupling; it does not automatically guarantee density or finished-part performance.',
  },
  {
    id: 'rapid-heat-conduction',
    title: 'Rapid heat conduction',
    mechanism: 'Heat leaves the melt pool quickly, reducing the margin for continuous and stable fusion.',
    evidence: 'Interrupted tracks, lack of fusion, and edge defects.',
    controls: 'Evaluate preheat, contour/fill separation, scan order, dwell and geometry-specific thermal management.',
    boundary: 'The process window changes with geometry, support, section thickness and substrate temperature.',
  },
  {
    id: 'keyhole-porosity',
    title: 'Keyhole porosity',
    mechanism: 'Excessive local energy can drive vapor recoil and deep unstable pools that collapse into pores.',
    evidence: 'Rounded internal pores and strongly fluctuating melt-pool behavior.',
    controls: 'Adjust local energy input, speed, focus and path after identifying the pore morphology.',
    boundary: 'Volumetric energy density alone cannot explain the defect.',
  },
  {
    id: 'lack-of-fusion',
    title: 'Lack-of-fusion porosity',
    mechanism: 'Insufficient melting, poor powder spreading, inadequate overlap or oxide films leave irregular voids.',
    evidence: 'Angular pores, interlayer gaps and incomplete track overlap.',
    controls:
      'Check the powder layer, hatch overlap, layer thickness, oxygen level and optical condition before changing one parameter.',
    boundary: 'Classify the defect morphology before choosing a corrective action.',
  },
  {
    id: 'balling-and-spatter',
    title: 'Balling and spatter',
    mechanism: 'Poor wetting, unstable pools, gas flow and recoil can eject material and disturb later layers.',
    evidence: 'Surface particles, contaminated powder beds and local powder depletion.',
    controls: 'Review scan strategy, gas flow, layer thickness, powder size distribution and spatter redeposition.',
    boundary: 'A surface photograph cannot establish internal quality.',
  },
  {
    id: 'oxidation-contamination',
    title: 'Oxidation and contamination',
    mechanism:
      'Copper powder has high surface area; reuse, handling and atmosphere can increase oxygen and contamination.',
    evidence: 'Color change, brittle behavior, lower conductivity and impaired sintering.',
    controls:
      'Use controlled atmosphere, closed handling, batch/reuse tracking, storage controls and chemistry testing.',
    boundary: 'Record the virgin/reused powder ratio and do not infer chemistry from appearance alone.',
  },
  {
    id: 'residual-stress-distortion',
    title: 'Residual stress and distortion',
    mechanism:
      "Large thermal gradients and mechanical restraint can accumulate stress despite copper's high conductivity.",
    evidence: 'Build-plate distortion, cracking and dimensional drift.',
    controls: 'Coordinate orientation, supports, preheat, scan islands, stress relief and cut-off sequence.',
    boundary: 'High thermal conductivity does not mean residual stress is absent.',
  },
  {
    id: 'conductivity-strength-tradeoff',
    title: 'Conductivity-strength trade-off',
    mechanism: 'Alloying and precipitation strengthening improve strength but generally reduce conductivity.',
    evidence: 'Conflicting material-selection requirements.',
    controls: 'Select material from service temperature, loads, conductivity and heat-transfer targets together.',
    boundary: 'Pure copper, CuCrZr and GRCop are different engineering systems.',
  },
  {
    id: 'trapped-powder',
    title: 'Powder trapped in internal channels',
    mechanism: 'Long, narrow, curved or closed passages restrict powder evacuation and later cleaning.',
    evidence: 'Unexpected pressure drop, contamination, residual mass and blocked passages.',
    controls:
      'Provide powder exits, validate channel and bend limits, and confirm removal with CT, mass, flow or cleanliness evidence.',
    boundary: 'Printable does not mean cleanable or inspectable.',
  },
  {
    id: 'thin-wall-overhang-instability',
    title: 'Thin-wall and overhang instability',
    mechanism: 'Local heat flow, powder support and accumulated scan heat vary with direction and geometry.',
    evidence: 'Edge collapse, roughness and dimensional drift.',
    controls: 'Qualify orientation, compensation, contour strategy, local support and representative samples.',
    boundary: 'Minimum feature claims require orientation and surface-condition qualifiers.',
  },
  {
    id: 'roughness-flow-effects',
    title: 'Surface roughness changes heat transfer and flow',
    mechanism: 'Partially fused particles and layer texture alter friction, pressure drop and local heat transfer.',
    evidence: 'Higher-than-expected pressure drop or variable thermal performance.',
    controls:
      'Separate useful texture from defects; assess abrasive-flow, chemical or parameter-based finishing where accessible.',
    boundary: 'Roughness may improve local heat transfer while making pressure drop or cleanliness unacceptable.',
  },
  {
    id: 'heat-treatment-window',
    title: 'Incorrect heat-treatment window',
    mechanism:
      'CuCrZr and GRCop depend on alloy-specific solution, ageing or HIP routes; pure copper follows different logic.',
    evidence: 'Unexpected strength, elongation, hardness or conductivity.',
    controls: 'Build a material-specific heat-treatment, microstructure and property map for the actual AM condition.',
    boundary: 'Do not transfer a wrought-alloy heat treatment without validating the AM microstructure.',
  },
  {
    id: 'test-method-mismatch',
    title: 'Inconsistent performance test methods',
    mechanism:
      'Density, IACS, thermal conductivity, orientation and temperature are often reported by different methods.',
    evidence: 'Supplier numbers that appear comparable but are not.',
    controls: 'Align the ASTM/ISO method, temperature, direction, specimen location, final condition and uncertainty.',
    boundary: 'Relative density is not a substitute for electrical, thermal or mechanical evidence.',
  },
  {
    id: 'batch-machine-drift',
    title: 'Batch and machine drift',
    mechanism: 'Powder, optics, gas flow, screens, calibration and maintenance change over time.',
    evidence: 'Different results from nominally identical parameters or builds.',
    controls:
      'Use witness coupons, trend data, calibration, powder lot traceability, maintenance records and change control.',
    boundary: 'A validated parameter set still requires ongoing process control.',
  },
  {
    id: 'dissimilar-metal-interface',
    title: 'Dissimilar-metal interface failure',
    mechanism: 'Thermal-property and metallurgical incompatibility can create brittle phases, dilution or high stress.',
    evidence: 'Cracks, delamination, brittle zones and nonuniform dilution.',
    controls:
      'Design the interface and transition, control heat input, and qualify it with sections, mechanical tests and NDE.',
    boundary: 'A graded-material case cannot be copied to a new alloy combination without qualification.',
  },
] as const;

const glossaryDefinitions: Record<string, string> = {
  AM: 'Manufacturing by adding material from digital geometry, usually layer by layer or bead by bead.',
  PBF: 'The powder-bed-fusion process family, including laser- and electron-beam routes.',
  'LPBF / PBF-LB/M': 'Laser beam powder bed fusion of metals.',
  'E-PBF / PBF-EB/M': 'Electron beam powder bed fusion of metals.',
  DED: 'Material is delivered into a focused energy source and deposited while melting.',
  WAAM: 'Large-format directed energy deposition using wire feedstock and an electric arc.',
  'Binder Jetting': 'A binder forms a green part in a powder bed before debinding and sintering.',
  'Cold Spray': 'Solid-state deposition by accelerating particles onto a substrate at high velocity.',
  UAM: 'Solid-state joining of metal foils using ultrasonic plastic deformation.',
  'Cu-ETP': 'Electrolytic tough-pitch copper; oxygen content and hydrogen-embrittlement risk must be considered.',
  'Cu-OF / OFHC': 'Oxygen-free high-conductivity copper; confirm the exact grade, purity and specification.',
  CuCrZr: 'A precipitation-strengthened copper-chromium-zirconium alloy balancing strength and conductivity.',
  'GRCop-42': 'A NASA-developed Cu-Cr-Nb alloy family for high-temperature, high-heat-flux structures.',
  'GRCop-84': 'A Cu-Cr-Nb alloy with higher chromium and niobium content than GRCop-42.',
  IACS: 'Conductivity expressed relative to the International Annealed Copper Standard; report temperature and method.',
  PSD: 'Particle-size distribution, commonly described with D10, D50 and D90.',
  'Hatch spacing': 'Center-to-center spacing between adjacent fill scan tracks.',
  'Layer thickness': 'Nominal thickness of each deposited or spread layer.',
  'Scan speed': 'Beam travel speed; it must be interpreted with power, spot, path and layer conditions.',
  VED: 'A simplified volumetric-energy-density term, often P/(v x h x t), that does not capture the full process physics.',
  Keyhole: 'A deep vapor cavity formed in a high-energy melt regime; collapse can create pores.',
  'Lack of fusion': 'Irregular defects caused by incomplete melting or insufficient overlap.',
  Recoater: 'The mechanism that spreads a fresh powder layer across a powder-bed system.',
  'Build plate': 'The substrate that supports initial layers and provides thermal and mechanical restraint.',
  'As-built': 'The condition directly after printing and before post-processing.',
  'Stress relief': 'Heat treatment intended to reduce residual stress.',
  HIP: 'Hot isostatic pressing uses high-pressure gas and heat to reduce internal porosity.',
  CT: 'Industrial X-ray computed tomography used to examine internal defects and channels.',
  'Witness coupon': 'A sample built with the part to support process or property verification.',
  'Relative density':
    'Density relative to a theoretical reference; the method and acceptance threshold must be stated.',
};

export const glossary = (glossaryRaw as KnowledgeRecord[]).map((item) => ({
  term: item.term,
  english: item.english,
  definition: glossaryDefinitions[item.term] || item.english,
}));

export const defectSourceCount = (defectsRaw as KnowledgeRecord[]).length;
