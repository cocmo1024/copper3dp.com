import { articlePaths, clusterPaths } from './decision-guide-paths.mjs';

const site = 'https://copper3dp.com';
const requestHeaders = { 'user-agent': 'copper3dp-decision-guide-production-check/1.0' };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url) => {
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await fetch(url, {
        redirect: 'follow',
        headers: requestHeaders,
        signal: AbortSignal.timeout(15000),
      });
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(500 * attempt);
    }
  }

  throw lastError;
};

const inspect = async (urlPath, type) => {
  const url = `${site}${urlPath}`;
  const response = await fetchWithRetry(url);
  const html = await response.text();
  const canonicalTag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0] || '';
  const canonical = canonicalTag.match(/\bhref=["']([^"']+)["']/i)?.[1] || '';

  return {
    path: urlPath,
    status: response.status,
    h1: (html.match(/<h1\b/gi) || []).length,
    canonical,
    expectedCanonical: url,
    hasStructuredData: html.includes('application/ld+json'),
    hasBlogPosting: type === 'article' ? /"@type"\s*:\s*"BlogPosting"/.test(html) : undefined,
    linksToDecisionGuides: type === 'article' ? html.includes('/knowledge/decision-guides/') : undefined,
    linksToRfq: type === 'article' ? html.includes('/rfq/#rfq-form') : undefined,
  };
};

const pageChecks = await Promise.all([
  ...clusterPaths.map((urlPath) => inspect(urlPath, 'cluster')),
  ...articlePaths.map((urlPath) => inspect(urlPath, 'article')),
]);

console.log(JSON.stringify({ clusterPages: clusterPaths.length, articles: articlePaths.length, pageChecks }, null, 2));

const invalidPage = pageChecks.some(
  (page) =>
    page.status !== 200 ||
    page.h1 !== 1 ||
    page.canonical !== page.expectedCanonical ||
    !page.hasStructuredData ||
    page.hasBlogPosting === false ||
    page.linksToDecisionGuides === false ||
    page.linksToRfq === false
);

if (invalidPage) process.exitCode = 1;
