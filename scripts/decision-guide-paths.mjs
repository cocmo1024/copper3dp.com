export const clusterPaths = [
  '/knowledge/decision-guides/',
  '/knowledge/decision-guides/materials-selection/',
  '/knowledge/decision-guides/cold-plates-heat-exchangers/',
  '/knowledge/decision-guides/rf-components/',
  '/knowledge/decision-guides/power-electronics/',
  '/knowledge/decision-guides/semiconductor-equipment/',
  '/knowledge/decision-guides/quality-acceptance/',
];

export const articleSlugs = [
  'specifying-pure-copper-lpbf-parts-by-finished-conductivity-not-powder-grade',
  'when-cucrzr-is-better-for-threaded-and-pressure-boundary-copper-am-parts',
  'port-seal-design-monolithic-3d-printed-copper-cold-plates',
  'flow-distribution-acceptance-testing-multi-passage-copper-heat-exchangers',
  'copper-am-waveguide-surface-finish-plating-frequency-band',
  'tolerance-planning-printed-copper-waveguide-bends-twists-cooling-paths',
  'coolant-chemistry-galvanic-risk-sic-module-copper-cold-plates',
  'electrical-isolation-fluid-routing-copper-am-charger-cooling-blocks',
  'co-designing-rf-current-paths-vacuum-channels-copper-plasma-hardware',
  'flatness-cleanliness-traceability-copper-metrology-components',
  'why-relative-density-alone-cannot-predict-copper-am-conductivity',
  'proof-pressure-helium-leak-flow-test-copper-am-acceptance',
];

export const articlePaths = articleSlugs.map((slug) => `/posts/EngineeringGuide/${slug}/`);
