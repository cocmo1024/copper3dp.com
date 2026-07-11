import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import astrowind from './vendor/integration';

import {
  readingTimeRemarkPlugin,
  stripRepeatedSeoBoilerplateRemarkPlugin,
  responsiveTablesRehypePlugin,
  lazyImagesRehypePlugin,
} from './src/utils/frontmatter';

import cloudflare from "@astrojs/cloudflare";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const siteUrl = 'https://copper3dp.com';
const normalizeCleanUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const isInternalUrl = parsedUrl.origin === siteUrl;
  const isCleanPath =
    parsedUrl.pathname !== '/' && !parsedUrl.pathname.endsWith('/') && !/\.[^/]+$/.test(parsedUrl.pathname);

  if (isInternalUrl && isCleanPath) {
    parsedUrl.pathname = `${parsedUrl.pathname}/`;
  }

  return parsedUrl.toString();
};
const getPostLastmodByUrl = () => {
  const postDirectory = path.resolve(__dirname, './src/data/post');
  const lastmodByUrl = new Map<string, string>();

  if (!fs.existsSync(postDirectory)) {
    return lastmodByUrl;
  }

  for (const fileName of fs.readdirSync(postDirectory)) {
    if (!fileName.endsWith('.md') && !fileName.endsWith('.mdx')) {
      continue;
    }

    const content = fs.readFileSync(path.join(postDirectory, fileName), 'utf8');
    const frontmatter = content.match(/^---\s*([\s\S]*?)\s*---/)?.[1] ?? '';
    const canonical = frontmatter.match(/canonical:\s*(https?:\/\/[^\s]+)/)?.[1];
    const updateDate = frontmatter.match(/^updateDate:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/m)?.[1];
    const publishDate = frontmatter.match(/^publishDate:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/m)?.[1];
    const lastmod = updateDate || publishDate;

    if (canonical && lastmod) {
      lastmodByUrl.set(normalizeCleanUrl(canonical), new Date(`${lastmod}T00:00:00.000Z`).toISOString());
    }
  }

  return lastmodByUrl;
};

const postLastmodByUrl = getPostLastmodByUrl();
const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];
const shouldIndexSitemapPage = (page: string) => {
  const pathname = new URL(page).pathname.replace(/\/$/, '') || '/';
  const isPaginatedArchive = /^\/(?:blog|category\/EngineeringGuide)(?:\/category\/[^/]+)?\/\d+$/.test(pathname);
  const isStaticLegacyFallback = pathname.startsWith('/tags/');

  return (
    !pathname.startsWith('/blog/tag') &&
    !pathname.startsWith('/blog/category') &&
    !isPaginatedArchive &&
    !isStaticLegacyFallback
  );
};

export default defineConfig({
  output: 'static',

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: shouldIndexSitemapPage,
      serialize: (item: { url: string; [key: string]: unknown }) => {
        const normalizedUrl = normalizeCleanUrl(item.url);
        const lastmod = postLastmodByUrl.get(normalizedUrl);

        return lastmod ? { ...item, url: normalizedUrl, lastmod } : { ...item, url: normalizedUrl };
      },
    }),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      config: './src/config.yaml',
    }),
  ],

  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    remarkPlugins: [
      remarkGfm,
      [remarkMath, { singleDollarTextMath: false }],
      stripRepeatedSeoBoilerplateRemarkPlugin,
      readingTimeRemarkPlugin,
    ],
    rehypePlugins: [rehypeKatex, responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },

  adapter: cloudflare()
});