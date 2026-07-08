import fs from 'node:fs/promises';

const liveSitemapUrl = 'https://copper3dp.com/sitemap-0.xml';
const localSitemapPath = new URL('../dist/sitemap-0.xml', import.meta.url);
const urlPattern = /<loc>(https:\/\/copper3dp\.com\/[^<]+)<\/loc>/g;
const requestHeaders = { 'user-agent': 'copper3dp-production-check/1.0' };

const getUrls = (xml) => Array.from(xml.matchAll(urlPattern), (match) => match[1]).sort();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url, options = {}) => {
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await fetch(url, {
        redirect: 'follow',
        headers: requestHeaders,
        signal: AbortSignal.timeout(15000),
        ...options,
      });
    } catch (error) {
      lastError = error;

      if (attempt < 3) {
        await sleep(500 * attempt);
      }
    }
  }

  throw lastError;
};

const getStatus = async (url) => {
  try {
    const response = await fetchWithRetry(url, { method: 'HEAD' });
    return response.status;
  } catch {
    const response = await fetchWithRetry(url, { method: 'GET' });
    return response.status;
  }
};

const main = async () => {
  const localXml = await fs.readFile(localSitemapPath, 'utf8');
  const liveResponse = await fetchWithRetry(liveSitemapUrl);

  if (!liveResponse.ok) {
    throw new Error(`Live sitemap request failed: ${liveResponse.status} ${liveSitemapUrl}`);
  }

  const liveXml = await liveResponse.text();
  const localUrls = getUrls(localXml);
  const liveUrls = new Set(getUrls(liveXml));
  const missing = localUrls.filter((url) => !liveUrls.has(url));
  const criticalUrls = localUrls.filter(
    (url) =>
      url === 'https://copper3dp.com/' ||
      url === 'https://copper3dp.com/copper-heat-sinks/' ||
      url === 'https://copper3dp.com/copper-cold-plates/' ||
      url === 'https://copper3dp.com/rfq/' ||
      url.includes('/posts/EngineeringGuide/')
  );

  const sample = [...criticalUrls.slice(0, 12), ...missing.slice(0, 8)].filter(
    (url, index, urls) => urls.indexOf(url) === index
  );
  const statuses = await Promise.all(sample.map(async (url) => [url, await getStatus(url)]));
  const failing = statuses.filter(([, status]) => status >= 400);

  console.log(
    JSON.stringify(
      {
        localSitemapUrls: localUrls.length,
        liveSitemapUrls: liveUrls.size,
        missingFromLiveSitemap: missing.length,
        missingPreview: missing.slice(0, 20),
        checkedStatuses: Object.fromEntries(statuses),
      },
      null,
      2
    )
  );

  if (missing.length || failing.length) {
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
