import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { randomUUID } from 'node:crypto';
import ts from 'typescript';
import yaml from 'js-yaml';

// Exercise the same source module used by the templates, without a new test dependency.
const source = fs.readFileSync('src/utils/rfq-context.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
}).outputText;
const { projectApplications, getArticleRfqContext, getPageRfqContext } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`
);
const decode = (value) =>
  value
    .replaceAll('&quot;', '"')
    .replaceAll('&#34;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
const attr = (tag, name) => decode(tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`))?.[1] ?? '');
const formSource = fs.readFileSync('src/components/forms/RfqForm.astro', 'utf8');
const formScript = formSource.match(/<script is:inline>\s*([\s\S]*?)<\/script>/)?.[1];
assert.ok(formScript, 'RFQ inline script must be tested, not replaced with a test-only implementation');
const applicationOptions = formSource.match(/<select[\s\S]*?name="application"[\s\S]*?<\/select>/)?.[0] ?? '';
for (const value of Object.values(projectApplications))
  assert.ok(applicationOptions.includes(`value="${value}"`), `Unknown form option: ${value}`);

const intentCases = [
  ['Copper 3D Printing Service Capability Matrix for Thermal, Electrical, and RF Parts', 'general', '/capabilities/'],
  ['Liquid-Cooled Server Copper Hardware RFQ Guide', 'general', '/capabilities/'],
  ['3D Printed Copper Cold Plates for AI Accelerators', 'cold-plate', '/copper-cold-plates/'],
  ['Copper Cold Plate Clogging: Filtration and Cleaning', 'cold-plate', '/copper-cold-plates/'],
  ['3D Printed Copper RF Waveguide and Vacuum Parts', 'rf-vacuum', '/copper-rf-waveguides/'],
  ['3D Printed Copper Busbars and Induction Coils: RFQ Guide', 'general', '/capabilities/'],
  ['Copper Busbars and Cooling Manifolds for Data Centers', 'general', '/capabilities/'],
  ['Copper AM Conformal Cooling Mold Inserts', 'conformal-cooling', '/copper-conformal-cooling-inserts/'],
  ['3D Printed Copper EDM Electrode Failures', 'general', '/capabilities/'],
  ['Copper Heat Sink Fin Thickness and Spacing', 'heat-exchanger', '/copper-heat-sinks/'],
  ['Copper Microchannel Heat Exchangers', 'heat-exchanger', '/copper-heat-exchangers/'],
  ['Pure Copper vs CuCrZr Heat Sinks', 'heat-exchanger', '/copper-heat-sinks/'],
  ['Heat Treatment for CuCrZr Components', 'general', '/materials/'],
  ['Copper Metrology Components', 'general', '/copper-semiconductor-cooling/'],
  ['Releasing a Real Thermal Part', 'general', '/thermal-design-validation/'],
  ['Copper Induction Coil Quotation', 'induction-coil', '/copper-induction-coils/'],
  ['Cost Drivers in Copper Metal 3D Printing', 'general', '/capabilities/'],
  ['Design Rules for Copper Laser Powder Bed Fusion Parts', 'general', '/capabilities/'],
  ['Copper RF and Vacuum Manifold Cooling', 'rf-vacuum', '/copper-rf-waveguides/'],
  ['Copper Alloy Selection: Pure Cu vs CuCrZr vs CuCr1Zr', 'general', '/materials/'],
];
for (const [title, project, service] of intentCases) {
  const context = getArticleRfqContext({ title });
  assert.equal(context.project, project, title);
  assert.equal(context.service.href, service, title);
}

// The real form script runs in an isolated fake DOM. fetch is a local stub: no inquiries or Ads calls are sent.
function runForm({
  query = '',
  stored = {},
  selected = '',
  files = [],
  valid = true,
  response = { accepted: true, submissionId: 'local-test-only' },
  ok = true,
} = {}) {
  const listeners = {};
  const events = [];
  const classList = { add() {}, remove() {}, toggle() {} };
  const fields = Object.fromEntries(
    ['application', 'source_page', 'started_at', 'submission_id', 'attribution', 'material', 'timing'].map((name) => [
      name,
      { name, value: name === 'application' ? selected : '' },
    ])
  );
  const fileInput = {
    files,
    error: '',
    setCustomValidity(value) {
      this.error = value;
    },
    addEventListener(name, fn) {
      listeners[`file:${name}`] = fn;
    },
  };
  const button = { textContent: 'Submit secure RFQ', disabled: false };
  const reference = {};
  const status = { classList };
  const panel = { classList, querySelector: () => reference, scrollIntoView() {} };
  const elements = Object.values(fields);
  elements.namedItem = (name) => fields[name];
  const form = {
    dataset: { projectApplications: JSON.stringify(projectApplications) },
    elements,
    classList,
    action: '/api/rfq',
    parentElement: { querySelector: () => panel },
    querySelector: (selector) =>
      ({
        '[data-rfq-files]': fileInput,
        '[data-rfq-submit]': button,
        '[data-rfq-status]': status,
        '[data-rfq-file-help]': {},
      })[selector],
    addEventListener: (name, fn) => {
      listeners[name] = fn;
    },
    checkValidity: () => valid && !fileInput.error,
    reportValidity() {},
  };
  let requests = 0;
  const location = new URL(`https://local.test/rfq/${query}`);
  vm.runInNewContext(formScript, {
    document: { querySelector: () => form },
    window: {
      location,
      COPPER3DP_GET_ATTRIBUTION: () => stored,
      COPPER3DP_TRACK_EVENT: (...args) => events.push(args),
      addEventListener: (name, fn) => {
        listeners[name] = fn;
      },
    },
    crypto: { randomUUID },
    URLSearchParams,
    Date,
    Error,
    FormData: class {
      get() {
        return '';
      }
    },
    fetch: async () => {
      requests++;
      return { ok, json: async () => response };
    },
  });
  return {
    fields,
    listeners,
    events,
    button,
    reference,
    fileInput,
    get requests() {
      return requests;
    },
  };
}

for (const [project, application] of Object.entries(projectApplications)) {
  assert.equal(
    runForm({ query: `?project=${project}`, stored: { project: 'busbar' } }).fields.application.value,
    application
  );
  assert.equal(runForm({ stored: { project } }).fields.application.value, application);
  const manual = runForm({ query: `?project=${project}`, selected: 'Other copper AM part' });
  manual.listeners.load();
  assert.equal(manual.fields.application.value, 'Other copper AM part', 'Never overwrite a visitor selection');
}
assert.equal(runForm({ query: '?project=unknown', stored: { project: 'busbar' } }).fields.application.value, '');
assert.equal(runForm({ query: '?project=COLD-PLATE' }).fields.application.value, projectApplications['cold-plate']);
assert.equal(runForm().fields.application.value, '');

for (const files of [[1, 1, 1, 1], [6], [3, 3, 3]]) {
  const form = runForm({ files: files.map((mb) => ({ name: 'local.step', size: mb * 1024 * 1024 })) });
  await form.listeners.submit({ preventDefault() {} });
  assert.equal(form.requests, 0, 'Invalid attachments must not be submitted');
  assert.ok(form.events.some(([name]) => name === 'rfq_validation_error'));
}
const invalid = runForm({ valid: false });
await invalid.listeners.submit({ preventDefault() {} });
assert.equal(invalid.requests, 0);
for (const response of [{ accepted: false, submissionId: 'ignored' }, { accepted: true }, {}]) {
  const form = runForm({ response });
  await form.listeners.submit({ preventDefault() {} });
  assert.ok(
    !form.events.some(([name]) => name === 'rfq_form_submit_success'),
    'No false conversion on a rejected/incomplete response'
  );
  assert.equal(form.button.disabled, false);
}
const rejected = runForm({ ok: false });
await rejected.listeners.submit({ preventDefault() {} });
assert.ok(!rejected.events.some(([name]) => name === 'rfq_form_submit_success'));
const success = runForm({ query: '?project=cold-plate' });
await success.listeners.submit({ preventDefault() {} });
const successfulEvents = success.events.filter(([name]) => name === 'rfq_form_submit_success');
assert.equal(successfulEvents.length, 1);
assert.equal(successfulEvents[0][1].project_context, 'cold-plate');
assert.equal(successfulEvents[0][2].adsConversion, 'rfq_submit');
assert.equal(success.reference.textContent, 'Reference: local-test-only');

const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => (entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]));
let projectLinks = 0;
let renderedArticles = 0;
const articleContexts = [];
// Explicit expectations test the built template, not a duplicate title classifier.
const knowledgeEvidence = {
  '/capabilities/': '/knowledge/process-selection/',
  '/copper-cold-plates/': '/knowledge/applications/#heat-exchangers-cold-plates',
  '/copper-heat-exchangers/': '/knowledge/applications/#heat-exchangers-cold-plates',
  '/copper-heat-sinks/': '/knowledge/applications/#heat-exchangers-cold-plates',
  '/thermal-design-validation/': '/knowledge/applications/#heat-exchangers-cold-plates',
  '/copper-induction-coils/': '/knowledge/applications/#motors-drives-power-electronics',
  '/copper-busbars/': '/knowledge/applications/#motors-drives-power-electronics',
  '/copper-rf-waveguides/': '/knowledge/applications/#rf-waveguides-accelerators',
  '/copper-conformal-cooling-inserts/': '/knowledge/applications/#tooling-conformal-cooling',
  '/copper-semiconductor-cooling/': '/knowledge/applications/#semiconductor-advanced-packaging',
  '/materials/': '/knowledge/materials-and-properties/',
};
for (const file of walk('src/data/post').filter((name) => /\.mdx?$/.test(name))) {
  const frontmatter = fs.readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  const post = yaml.load(frontmatter);
  if (post.draft) continue;
  const context = getArticleRfqContext(post);
  articleContexts.push({ title: post.title, project: context.project, service: context.service.href });
}
for (const file of walk('dist').filter((name) => name.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  for (const tag of html.matchAll(/<a\b[^>]*>/g)) {
    const href = attr(tag[0], 'href');
    if (!href.startsWith('/rfq/?project=')) continue;
    const project = new URL(href, 'https://copper3dp.com').searchParams.get('project');
    assert.ok(Object.hasOwn(projectApplications, project), `Invalid inquiry parameter ${href} in ${file}`);
    projectLinks++;
  }
  if (html.includes('data-aw-cta-location="article_footer"')) {
    renderedArticles++;
    const title = decode(
      html
        .match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]
        .replace(/<[^>]*>/g, '')
        .trim() ?? ''
    );
    const context = getArticleRfqContext({ title });
    for (const location of ['article_intro', 'article_footer']) {
      const tag =
        [...html.matchAll(/<a\b[^>]*>/g)].find(([tag]) => attr(tag, 'data-aw-cta-location') === location)?.[0] ?? '';
      assert.equal(attr(tag, 'href'), context.href, `${file}: ${location}`);
    }
    assert.ok(html.includes(`href="${context.service.href}"`));
    const pathways =
      html.match(/<aside\b[^>]*aria-labelledby="knowledge-pathways-title"[^>]*>([\s\S]*?)<\/aside>/)?.[1] ?? '';
    const knowledgeLinks = [...pathways.matchAll(/<a\b[^>]*>/g)].map(([tag]) => attr(tag, 'href'));
    assert.ok(knowledgeEvidence[context.service.href], `Unknown evidence route: ${context.service.href}`);
    assert.deepEqual(
      knowledgeLinks,
      ['/knowledge/', context.service.href, knowledgeEvidence[context.service.href]],
      `${file}: knowledge pathways must match service intent`
    );
    assert.equal(new Set(knowledgeLinks).size, 3, `${file}: three distinct knowledge pathways`);
    assert.ok(html.includes('mailto:info@szcomo.com'));
  }
  if (html.includes('data-aw-cta-location="application_hero"')) {
    const pathname = '/' + path.relative('dist', path.dirname(file)).replaceAll('\\', '/') + '/';
    const context = getPageRfqContext(pathname);
    const tag =
      [...html.matchAll(/<a\b[^>]*>/g)].find(
        ([tag]) => attr(tag, 'data-aw-cta-location') === 'application_hero'
      )?.[0] ?? '';
    assert.equal(attr(tag, 'href'), context.href, pathname);
  }
}
assert.equal(renderedArticles, articleContexts.length, 'Every published article needs both inquiry entry points');
for (const page of ['dist/index.html', 'dist/rfq/index.html']) {
  const html = fs.readFileSync(page, 'utf8');
  const form = html.match(/<form\b[^>]*data-project-applications[^>]*>/)?.[0] ?? '';
  assert.deepEqual(JSON.parse(attr(form, 'data-project-applications')), projectApplications);
  const script = html.match(/<script\b[^>]*data-project-contexts[^>]*>/)?.[0] ?? '';
  assert.deepEqual(JSON.parse(attr(script, 'data-project-contexts')), Object.keys(projectApplications));
}
console.log(
  JSON.stringify(
    {
      result: 'PASS',
      renderedArticles,
      projectLinks,
      contextTypes: Object.keys(projectApplications).length,
      intentCases: intentCases.length,
      formRegression:
        'preselection, neutral/stored/invalid context, manual selection, file limits, validation, rejected/accepted responses',
      networkRequestsSent: 0,
      articleContexts,
    },
    null,
    2
  )
);
