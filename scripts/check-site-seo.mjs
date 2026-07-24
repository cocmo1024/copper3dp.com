import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const siteOrigin = 'https://copper3dp.com';
const sitemapPath = path.join(root, 'sitemap-0.xml');
const robotsPath = path.join(root, 'robots.txt');
const errors = [];

if (!fs.existsSync(root) || !fs.existsSync(sitemapPath)) {
  throw new Error('Missing dist output. Run npm run build before npm run check:seo.');
}

const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`(?:^|\\s)${escapeRegExp(name)}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match ? (match[1] ?? match[2] ?? match[3] ?? '') : undefined;
};

const getTags = (html, tagName) => html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || [];

const getMetaContent = (html, attribute, value) =>
  getTags(html, 'meta')
    .filter((tag) => getAttribute(tag, attribute)?.toLowerCase() === value.toLowerCase())
    .map((tag) => getAttribute(tag, 'content') ?? '');

const routeFromFile = (file) => {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  if (relative === 'index.html') return '/';
  if (relative === '404.html') return '/404/';
  return `/${relative.replace(/\/index\.html$/, '/').replace(/\.html$/, '/')}`;
};

const report = (route, message) => errors.push(`${route}: ${message}`);

const normalizeText = (value) =>
  value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, ' ')
    .trim();

const visibleText = (html) =>
  normalizeText(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<template\b[\s\S]*?<\/template>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  );

const stableStringify = (value) => {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
};

const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
const sitemapEntries = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
  const block = match[1];
  return {
    loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1],
    lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
  };
});
const sitemapUrls = sitemapEntries.map((entry) => entry.loc).filter(Boolean);
const sitemapSet = new Set(sitemapUrls);

if (sitemapUrls.length !== sitemapSet.size) {
  report('/sitemap-0.xml', 'contains duplicate URLs');
}

for (const { loc, lastmod } of sitemapEntries) {
  if (!loc) {
    report('/sitemap-0.xml', 'contains a URL entry without loc');
    continue;
  }

  const url = new URL(loc);
  if (url.origin !== siteOrigin || (url.pathname !== '/' && !url.pathname.endsWith('/')) || url.search || url.hash) {
    report('/sitemap-0.xml', `contains a non-canonical URL: ${loc}`);
  }

  if (lastmod) {
    const parsed = Date.parse(lastmod);
    if (Number.isNaN(parsed)) {
      report('/sitemap-0.xml', `contains an invalid lastmod for ${loc}: ${lastmod}`);
    } else if (parsed > Date.now() + 24 * 60 * 60 * 1000) {
      report('/sitemap-0.xml', `contains a future lastmod for ${loc}: ${lastmod}`);
    }
  }
}

const htmlFiles = walk(root).filter((file) => file.endsWith('.html'));
const indexableUrls = new Set();
const titleOwners = new Map();
const descriptionOwners = new Map();
const entityDefinitions = new Map();
let articlePages = 0;
let faqPages = 0;

for (const file of htmlFiles) {
  const route = routeFromFile(file);
  const expectedCanonical = `${siteOrigin}${route}`;
  const html = fs.readFileSync(file, 'utf8');

  const htmlTags = getTags(html, 'html');
  if (htmlTags.length !== 1 || getAttribute(htmlTags[0], 'lang') !== 'en') {
    report(route, 'must contain exactly one <html lang="en">');
  }

  const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((match) => normalizeText(match[1]));
  if (titles.length !== 1 || !titles[0]) report(route, 'must contain exactly one non-empty title');

  const descriptions = getMetaContent(html, 'name', 'description');
  if (descriptions.length !== 1 || !descriptions[0]) {
    report(route, 'must contain exactly one non-empty meta description');
  }

  const robots = getMetaContent(html, 'name', 'robots');
  if (robots.length !== 1) {
    report(route, 'must contain exactly one robots meta tag');
  }
  const robotsContent = robots[0]?.toLowerCase() || '';
  const indexable = !robotsContent.includes('noindex');
  if (!robotsContent.includes('follow') || !robotsContent.includes('max-snippet:-1')) {
    report(route, 'robots directives must include follow and max-snippet:-1');
  }
  if (!robotsContent.includes('max-image-preview:large')) {
    report(route, 'robots directives must include max-image-preview:large');
  }

  const canonicalTags = getTags(html, 'link').filter((tag) => getAttribute(tag, 'rel')?.toLowerCase() === 'canonical');
  const canonical = canonicalTags.length === 1 ? getAttribute(canonicalTags[0], 'href') : undefined;
  if (canonicalTags.length !== 1) report(route, 'must contain exactly one canonical link');
  if (canonical !== expectedCanonical) {
    report(route, `canonical must be ${expectedCanonical}, found ${canonical || 'missing'}`);
  }

  const viewport = getMetaContent(html, 'name', 'viewport');
  if (viewport.length !== 1 || !viewport[0].includes('width=device-width')) {
    report(route, 'must contain one responsive viewport declaration');
  }

  if ((html.match(/<h1\b/gi) || []).length !== 1) report(route, 'must contain exactly one H1');
  if ((html.match(/<main\b/gi) || []).length !== 1) report(route, 'must contain exactly one main landmark');
  if (!/\bid=["']main-content["']/i.test(html) || !/\bhref=["']#main-content["']/i.test(html)) {
    report(route, 'must expose a working skip link to #main-content');
  }

  const openGraphType = getMetaContent(html, 'property', 'og:type');
  const openGraphUrl = getMetaContent(html, 'property', 'og:url');
  const openGraphLocale = getMetaContent(html, 'property', 'og:locale');
  const openGraphSiteName = getMetaContent(html, 'property', 'og:site_name');
  const openGraphImages = getMetaContent(html, 'property', 'og:image');
  const openGraphImageAlts = getMetaContent(html, 'property', 'og:image:alt');

  for (const [name, values] of [
    ['og:title', getMetaContent(html, 'property', 'og:title')],
    ['og:description', getMetaContent(html, 'property', 'og:description')],
    ['og:type', openGraphType],
    ['og:url', openGraphUrl],
    ['og:locale', openGraphLocale],
    ['og:site_name', openGraphSiteName],
  ]) {
    if (values.length !== 1 || !values[0]) report(route, `must contain exactly one non-empty ${name}`);
  }

  if (!['website', 'article'].includes(openGraphType[0])) {
    report(route, `uses unsupported og:type ${openGraphType[0] || 'missing'}`);
  }
  if (openGraphUrl[0] !== canonical) report(route, 'og:url must match canonical');
  if (!/^[a-z]{2}_[A-Z]{2}$/.test(openGraphLocale[0] || '')) {
    report(route, `og:locale must use language_TERRITORY format, found ${openGraphLocale[0] || 'missing'}`);
  }
  if (!openGraphImages.length || openGraphImages.length !== openGraphImageAlts.length) {
    report(route, 'every og:image must have a matching og:image:alt');
  }

  const twitterCards = getMetaContent(html, 'name', 'twitter:card');
  if (twitterCards.length !== 1 || !twitterCards[0]) report(route, 'must contain exactly one twitter:card');

  const jsonLdMatches = [
    ...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ];
  if (jsonLdMatches.length !== 1) {
    report(route, 'must contain exactly one JSON-LD script');
  }

  let graph = [];
  if (jsonLdMatches.length === 1) {
    try {
      const jsonLd = JSON.parse(jsonLdMatches[0][1]);
      if (jsonLd['@context'] !== 'https://schema.org' || !Array.isArray(jsonLd['@graph'])) {
        report(route, 'JSON-LD must use a schema.org @context and @graph array');
      } else {
        graph = jsonLd['@graph'];
      }
    } catch (error) {
      report(route, `contains invalid JSON-LD: ${error.message}`);
    }
  }

  const requiredGraphTypes = ['Organization', 'WebSite', 'WebPage'];
  for (const type of requiredGraphTypes) {
    if (graph.filter((node) => node?.['@type'] === type).length !== 1) {
      report(route, `JSON-LD must contain exactly one ${type} node`);
    }
  }

  const webPage = graph.find((node) => node?.['@type'] === 'WebPage');
  if (webPage && (webPage.url !== canonical || webPage['@id'] !== `${canonical}#webpage`)) {
    report(route, 'WebPage URL and @id must match canonical');
  }

  const topLevelIds = graph.map((node) => node?.['@id']).filter(Boolean);
  if (topLevelIds.length !== new Set(topLevelIds).size) {
    report(route, 'JSON-LD contains duplicate top-level @id values');
  }

  for (const node of graph.filter((item) => item?.['@id'])) {
    const id = node['@id'];
    const definition = stableStringify(node);
    const existing = entityDefinitions.get(id);
    if (existing && existing.definition !== definition) {
      report(route, `redefines ${id} differently from ${existing.route}`);
    } else if (!existing) {
      entityDefinitions.set(id, { definition, route });
    }
  }

  const faqNodes = graph.filter((node) => node?.['@type'] === 'FAQPage');
  if (faqNodes.length) faqPages += 1;
  const pageText = visibleText(html);
  for (const faqNode of faqNodes) {
    for (const question of faqNode.mainEntity || []) {
      const questionText = normalizeText(String(question?.name || ''));
      const answerText = normalizeText(String(question?.acceptedAnswer?.text || ''));
      if (!questionText || !pageText.includes(questionText)) {
        report(route, `FAQ question is not visible in the page body: ${questionText || 'missing question'}`);
      }
      if (!answerText || !pageText.includes(answerText)) {
        report(route, `FAQ answer is not visible in the page body: ${questionText || 'missing question'}`);
      }
    }
  }

  const blogPosting = graph.find((node) => node?.['@type'] === 'BlogPosting');
  const brokenArticleTags = getTags(html, 'meta').filter((tag) =>
    getAttribute(tag, 'property')?.toLowerCase().startsWith('og:article:')
  );
  if (brokenArticleTags.length) report(route, 'contains invalid og:article:* properties');

  const articleProperties = ['published_time', 'modified_time', 'author'];
  if (blogPosting) {
    articlePages += 1;
    if (openGraphType[0] !== 'article') report(route, 'BlogPosting pages must use og:type=article');
    for (const property of articleProperties) {
      const values = getMetaContent(html, 'property', `article:${property}`);
      if (!values.length || values.some((value) => !value)) {
        report(route, `BlogPosting pages must contain article:${property}`);
      }
      if (property === 'author' && values.some((value) => !value.startsWith(`${siteOrigin}/`))) {
        report(route, 'article:author must reference a first-party profile URL');
      }
    }
    if (
      Number.isNaN(Date.parse(blogPosting.datePublished)) ||
      Number.isNaN(Date.parse(blogPosting.dateModified)) ||
      Date.parse(blogPosting.dateModified) < Date.parse(blogPosting.datePublished)
    ) {
      report(route, 'BlogPosting publication dates are missing, invalid, or chronologically inconsistent');
    }
  } else if (getTags(html, 'meta').some((tag) => getAttribute(tag, 'property')?.startsWith('article:'))) {
    report(route, 'non-article page contains article Open Graph properties');
  }

  for (const imageTag of getTags(html, 'img')) {
    if (getAttribute(imageTag, 'alt') === undefined) report(route, 'contains an image without alt');
    if (!getAttribute(imageTag, 'width') || !getAttribute(imageTag, 'height')) {
      report(route, 'contains an image without intrinsic width and height');
    }
  }

  for (const iframeTag of getTags(html, 'iframe')) {
    if (!getAttribute(iframeTag, 'title')) report(route, 'contains an iframe without title');
    if (!getAttribute(iframeTag, 'loading')) report(route, 'contains an iframe without explicit loading behavior');
  }

  if (indexable) {
    indexableUrls.add(canonical);
    if (!sitemapSet.has(canonical)) report(route, 'is indexable but absent from sitemap');

    const titleKey = titles[0]?.toLowerCase();
    const descriptionKey = descriptions[0]?.toLowerCase();
    if (titleKey) {
      const owner = titleOwners.get(titleKey);
      if (owner) report(route, `duplicates the title used by ${owner}`);
      else titleOwners.set(titleKey, route);
    }
    if (descriptionKey) {
      const owner = descriptionOwners.get(descriptionKey);
      if (owner) report(route, `duplicates the meta description used by ${owner}`);
      else descriptionOwners.set(descriptionKey, route);
    }
  } else if (sitemapSet.has(canonical)) {
    report(route, 'is noindex but appears in sitemap');
  }

  if (route === '/404/' && indexable) report(route, 'must remain noindex');
}

for (const sitemapUrl of sitemapSet) {
  if (!indexableUrls.has(sitemapUrl)) report('/sitemap-0.xml', `lists a URL that is not indexable HTML: ${sitemapUrl}`);
}

const robots = fs.readFileSync(robotsPath, 'utf8');
const allowsPublicSite = /^Allow:[ \t]*\/[ \t]*$/im.test(robots) || /^Disallow:[ \t]*$/im.test(robots);
if (!/^User-agent:[ \t]*\*/im.test(robots) || !allowsPublicSite) {
  report('/robots.txt', 'must explicitly allow the public site');
}
if (!/^Sitemap:\s*https:\/\/copper3dp\.com\/sitemap-index\.xml$/im.test(robots)) {
  report('/robots.txt', 'must declare the canonical sitemap index');
}

const summary = {
  htmlPages: htmlFiles.length,
  indexablePages: indexableUrls.size,
  sitemapUrls: sitemapSet.size,
  articlePages,
  faqPages,
  uniqueTitles: titleOwners.size,
  uniqueDescriptions: descriptionOwners.size,
  errors,
};

console.log(JSON.stringify(summary, null, 2));

if (errors.length) process.exitCode = 1;
