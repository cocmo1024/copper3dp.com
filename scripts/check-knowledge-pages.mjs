import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const site = 'https://copper3dp.com';
const knowledgePaths = [
  '/knowledge/',
  '/knowledge/materials-and-properties/',
  '/knowledge/process-selection/',
  '/knowledge/applications/',
  '/knowledge/equipment/',
  '/knowledge/case-library/',
  '/knowledge/quality-and-qualification/',
  '/knowledge/defects/',
  '/knowledge/glossary/',
  '/knowledge/sources/',
];

const read = (file) => fs.readFileSync(file, 'utf8');
const htmlPath = (urlPath) => path.join(root, urlPath.replace(/^\//, ''), 'index.html');
const listHtmlFiles = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return listHtmlFiles(file);
    return entry.isFile() && entry.name.endsWith('.html') ? [file] : [];
  });
const sitemap = fs
  .readdirSync(root)
  .filter((name) => /^sitemap-\d+\.xml$/.test(name))
  .map((name) => read(path.join(root, name)))
  .join('\n');

const pageChecks = knowledgePaths.map((urlPath) => {
  const file = htmlPath(urlPath);
  const html = fs.existsSync(file) ? read(file) : '';
  const canonicalTag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0] || '';
  const canonical = canonicalTag.match(/\bhref=["']([^"']+)["']/i)?.[1] || '';
  const descriptionTag = html.match(/<meta\b[^>]*\bname=["']description["'][^>]*>/i)?.[0] || '';
  const visibleText = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

  return {
    path: urlPath,
    exists: fs.existsSync(file),
    h1: (html.match(/<h1\b/gi) || []).length,
    description: /\bcontent=["'][^"']+/i.test(descriptionTag),
    canonical,
    expectedCanonical: `${site}${urlPath}`,
    inSitemap: sitemap.includes(`<loc>${site}${urlPath}</loc>`),
    hasStructuredData: html.includes('application/ld+json'),
    hasCjkVisibleText: /[\u3400-\u9fff]/u.test(visibleText),
  };
});

const articleRoot = path.join(root, 'posts', 'EngineeringGuide');
const articleFiles = fs
  .readdirSync(articleRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(articleRoot, entry.name, 'index.html'));
const articlePathwayCount = articleFiles.filter((file) => read(file).includes('Related knowledge pathways')).length;
const rfqHtml = read(path.join(root, 'rfq', 'index.html'));
const allHtml = listHtmlFiles(root)
  .map((file) => read(file))
  .join('\n');
const robots = read(path.join(root, 'robots.txt'));

const result = {
  pageChecks,
  articles: articleFiles.length,
  articlesWithKnowledgePathways: articlePathwayCount,
  rfqFormPresent: rfqHtml.includes('id="rfq-form"') && rfqHtml.includes('<form'),
  custom404Present: fs.existsSync(path.join(root, '404.html')),
  robotsReferencesSitemap: robots.includes('sitemap-index.xml'),
  forbiddenContent: {
    zblog: /zblog/i.test(allHtml),
    imagePrompt: /image prompt/i.test(allHtml),
    bracketedPlaceholder: /\[placeholder\]/i.test(allHtml),
  },
};

console.log(JSON.stringify(result, null, 2));

const invalidPage = pageChecks.some(
  (page) =>
    !page.exists ||
    page.h1 !== 1 ||
    !page.description ||
    page.canonical !== page.expectedCanonical ||
    !page.inSitemap ||
    !page.hasStructuredData ||
    page.hasCjkVisibleText
);
const forbidden = Object.values(result.forbiddenContent).some(Boolean);

if (
  invalidPage ||
  articleFiles.length !== articlePathwayCount ||
  !result.rfqFormPresent ||
  !result.custom404Present ||
  !result.robotsReferencesSitemap ||
  forbidden
) {
  process.exitCode = 1;
}
