import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const site = 'https://copper3dp.com';
const clusterPaths = [
  '/knowledge/decision-guides/',
  '/knowledge/decision-guides/materials-selection/',
  '/knowledge/decision-guides/cold-plates-heat-exchangers/',
  '/knowledge/decision-guides/rf-components/',
  '/knowledge/decision-guides/power-electronics/',
  '/knowledge/decision-guides/semiconductor-equipment/',
  '/knowledge/decision-guides/quality-acceptance/',
];
const articleSlugs = [
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
const articlePaths = articleSlugs.map((slug) => `/posts/EngineeringGuide/${slug}/`);

const read = (file) => fs.readFileSync(file, 'utf8');
const htmlPath = (urlPath) => path.join(root, urlPath.replace(/^\//, ''), 'index.html');
const sitemap = fs
  .readdirSync(root)
  .filter((name) => /^sitemap-\d+\.xml$/.test(name))
  .map((name) => read(path.join(root, name)))
  .join('\n');

const inspect = (urlPath, type) => {
  const file = htmlPath(urlPath);
  const html = fs.existsSync(file) ? read(file) : '';
  const canonicalTag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0] || '';
  const canonical = canonicalTag.match(/\bhref=["']([^"']+)["']/i)?.[1] || '';
  const descriptionTag = html.match(/<meta\b[^>]*\bname=["']description["'][^>]*>/i)?.[0] || '';

  return {
    path: urlPath,
    exists: fs.existsSync(file),
    h1: (html.match(/<h1\b/gi) || []).length,
    description: /\bcontent=["'][^"']+/i.test(descriptionTag),
    canonical,
    expectedCanonical: `${site}${urlPath}`,
    inSitemap: sitemap.includes(`<loc>${site}${urlPath}</loc>`),
    hasStructuredData: html.includes('application/ld+json'),
    hasBlogPosting: type === 'article' ? html.includes('"@type":"BlogPosting"') : undefined,
    linksToDecisionGuides: type === 'article' ? html.includes('/knowledge/decision-guides/') : undefined,
    linksToRfq: type === 'article' ? html.includes('/rfq/#rfq-form') : undefined,
  };
};

const pageChecks = [
  ...clusterPaths.map((urlPath) => inspect(urlPath, 'cluster')),
  ...articlePaths.map((urlPath) => inspect(urlPath, 'article')),
];

console.log(JSON.stringify({ clusterPages: clusterPaths.length, articles: articlePaths.length, pageChecks }, null, 2));

const invalidPage = pageChecks.some(
  (page) =>
    !page.exists ||
    page.h1 !== 1 ||
    !page.description ||
    page.canonical !== page.expectedCanonical ||
    !page.inSitemap ||
    !page.hasStructuredData ||
    page.hasBlogPosting === false ||
    page.linksToDecisionGuides === false ||
    page.linksToRfq === false
);

if (invalidPage) process.exitCode = 1;
