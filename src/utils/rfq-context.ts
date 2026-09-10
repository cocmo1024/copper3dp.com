// These values must match the existing application options in RfqForm.
// A neutral context deliberately clears a previously stored application hint.
export const projectApplications = {
  general: '',
  'cold-plate': 'Cold plate or liquid cooling',
  'heat-exchanger': 'Heat sink or heat exchanger',
  busbar: 'Busbar or electrical conductor',
  'induction-coil': 'Induction coil',
  'rf-vacuum': 'RF, waveguide, or vacuum component',
  'conformal-cooling': 'Conformal cooling insert',
} as const;

export type ProjectKey = keyof typeof projectApplications;
export const getRfqHref = (project: ProjectKey = 'general') => `/rfq/?project=${project}#rfq-form`;

type ServiceLink = { title: string; description: string; href: string };
type RfqContext = { project: ProjectKey; heading: string; brief: string; service: ServiceLink; href: string };

const contexts = {
  general: {
    project: 'general',
    heading: 'Is copper AM a fit for your part?',
    brief:
      'Describe the part, its job, and the question holding up your decision. Add quantity and critical requirements if known; CAD can follow.',
    service: {
      title: 'Copper AM capabilities and review scope',
      description: 'Check manufacturing, finishing, inspection, and quotation scope before committing to a route.',
      href: '/capabilities/',
    },
  },
  coldPlate: {
    project: 'cold-plate',
    heading: 'Review a copper cold plate or cooling part',
    brief:
      'Describe the cooling problem and available space. Add a sketch or CAD, coolant, heat load, and flow or pressure limits where known; leave open requirements for review.',
    service: {
      title: 'Custom copper cold plate service',
      description: 'Connect the cooling duty to channel design, manufacturing, cleaning, and acceptance.',
      href: '/copper-cold-plates/',
    },
  },
  heatExchanger: {
    project: 'heat-exchanger',
    heading: 'Discuss a copper heat exchanger project',
    brief:
      'Start with the heat-transfer duty and the part envelope. Include fluids, temperatures, flow limits, and a drawing where available; unknown inputs can be clarified.',
    service: {
      title: 'Copper heat exchanger service',
      description: 'Compare integrated passages with conventional routes and define the evidence needed for release.',
      href: '/copper-heat-exchangers/',
    },
  },
  heatSink: {
    project: 'heat-exchanger',
    heading: 'Review a copper heat sink design',
    brief:
      'Share the heat source, available envelope, and cooling conditions. Add an interface sketch, CAD, or quantity if available; a complete specification is not needed to start.',
    service: {
      title: 'Custom copper heat sink service',
      description: 'Compare fin geometry, interfaces, finishing, and the thermal verification scope.',
      href: '/copper-heat-sinks/',
    },
  },
  busbar: {
    project: 'busbar',
    heading: 'Review a copper conductor or busbar',
    brief:
      'Describe the current path, connection layout, and packaging constraint. Add current, duty cycle, contact requirements, and CAD when known.',
    service: {
      title: 'Custom copper busbar service',
      description: 'Review current paths, contact surfaces, insulation interfaces, cooling, and inspection.',
      href: '/copper-busbars/',
    },
  },
  coil: {
    project: 'induction-coil',
    heading: 'Discuss a copper induction coil project',
    brief:
      'Share the workpiece, heating task, and coil envelope. Add frequency, power, cooling conditions, and a sketch where available.',
    service: {
      title: 'Copper induction coil service',
      description: 'Connect coil geometry, cooling passages, connection details, and functional acceptance.',
      href: '/copper-induction-coils/',
    },
  },
  rf: {
    project: 'rf-vacuum',
    heading: 'Review an RF, waveguide, or vacuum part',
    brief:
      'Describe the component function and critical interfaces. Add frequency, surface, vacuum, and inspection requirements if known, with CAD or a drawing when available.',
    service: {
      title: 'Copper RF and waveguide service',
      description: 'Plan RF surfaces, tolerances, cooling, vacuum interfaces, and final measurement.',
      href: '/copper-rf-waveguides/',
    },
  },
  tooling: {
    project: 'conformal-cooling',
    heading: 'Review a copper cooling insert',
    brief:
      'Share the tooling hot spot, insert envelope, and available coolant conditions. Add cavity interfaces, wear requirements, and CAD if available.',
    service: {
      title: 'Copper conformal cooling insert service',
      description: 'Review channel routing, material state, cavity finishing, and validation with the tooling duty.',
      href: '/copper-conformal-cooling-inserts/',
    },
  },
  semiconductor: {
    project: 'general',
    heading: 'Discuss a copper semiconductor-equipment part',
    brief:
      'Describe the part function and its interfaces. Add thermal, cleanliness, vacuum, or dimensional requirements where relevant; no application type is assumed for you.',
    service: {
      title: 'Copper semiconductor equipment service',
      description: 'Coordinate thermal, RF, vacuum, cleanliness, metrology, and traceability requirements.',
      href: '/copper-semiconductor-cooling/',
    },
  },
  materials: {
    project: 'general',
    heading: 'Need to choose a copper material for a part?',
    brief:
      'Describe the part, operating environment, and properties that matter. State the material preference only if decided; material state and acceptance can be reviewed together.',
    service: {
      title: 'Copper materials and delivered condition',
      description: 'Compare pure copper and copper alloys against conductivity, strength, temperature, and load.',
      href: '/materials/',
    },
  },
  thermal: {
    project: 'general',
    heading: 'Turn a thermal requirement into a reviewable brief',
    brief:
      'Describe the heat source, cooling constraints, and decision you need to make. Share existing calculations, sketches, or CAD if available; detailed design and validation scope must be agreed separately.',
    service: {
      title: 'Thermal design and validation support',
      description: 'Define inputs, compare architectures, reconstruct usable geometry, and plan validation.',
      href: '/thermal-design-validation/',
    },
  },
} satisfies Record<string, Omit<RfqContext, 'href'>>;

type ContextName = keyof typeof contexts;

function withHref(name: ContextName): RfqContext {
  const context = contexts[name];
  return { ...context, href: getRfqHref(context.project) };
}

export function getArticleRfqContext(post: { title: string }): RfqContext {
  // Use the article's primary subject, not generic category/tag labels or an old slug.
  const title = post.title.toLowerCase().replaceAll('-', ' ');
  if (/capability matrix|server copper hardware/.test(title)) return withHref('general');
  const busbar = /\bbusbars?\b/.test(title);
  const coil = /\binduction coils?\b/.test(title);
  const cooling = /cold plate|cooling (plate|block|manifold|jacket)/.test(title);
  if (busbar && (coil || cooling)) return withHref('general');
  if (/conformal|mold|mould|tooling/.test(title)) return withHref('tooling');
  if (coil) return withHref('coil');
  if (busbar) return withHref('busbar');
  if (/\brf\b|waveguide|microwave|vacuum|plasma hardware/.test(title)) return withHref('rf');
  if (cooling) return withHref('coldPlate');
  if (/heat exchangers?/.test(title)) return withHref('heatExchanger');
  if (/heat sinks?/.test(title)) return withHref('heatSink');
  if (/semiconductor|wafer|metrology|lithography|photonics/.test(title)) return withHref('semiconductor');
  if (/thermal|heat transfer/.test(title)) return withHref('thermal');
  if (/pure copper|cucrzr|cucr1zr|alloy|material specification|conductivity/.test(title)) return withHref('materials');
  return withHref('general');
}

const pageContexts: Record<string, ContextName> = {
  '/copper-cold-plates/': 'coldPlate',
  '/copper-heat-sinks/': 'heatSink',
  '/copper-heat-exchangers/': 'heatExchanger',
  '/copper-busbars/': 'busbar',
  '/copper-induction-coils/': 'coil',
  '/copper-rf-waveguides/': 'rf',
  '/copper-conformal-cooling-inserts/': 'tooling',
  '/copper-semiconductor-cooling/': 'semiconductor',
  '/pure-copper-3d-printing/': 'materials',
  '/cucrzr-3d-printing/': 'materials',
};

export const getPageRfqContext = (pathname: string): RfqContext =>
  withHref(pageContexts[`${pathname.replace(/\/$/, '')}/`] ?? 'general');
