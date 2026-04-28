import { SITE } from 'astrowind:config';
import type { ImageMetadata } from 'astro';
import type { JsonLdNode, Post } from '~/types';

const siteUrl = String(SITE.site).replace(/\/$/, '');
const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

export const toAbsoluteUrl = (url: string | URL | undefined): string | undefined => {
  if (!url) return undefined;

  const value = String(url);
  if (value.startsWith('http://') || value.startsWith('https://')) return value;

  return String(new URL(value.startsWith('/') ? value : `/${value}`, `${siteUrl}/`));
};

export const createBreadcrumbSchema = (items: Array<{ name: string; item?: string | URL }>): JsonLdNode => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(({ name, item }, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    ...(item ? { item: toAbsoluteUrl(item) } : {}),
  })),
});

export const createCopperServiceSchema = (): JsonLdNode => ({
  '@type': 'Service',
  '@id': `${siteUrl}/#copper-additive-manufacturing-service`,
  name: 'Copper 3D Printing Services',
  serviceType: 'Copper additive manufacturing and LPBF copper 3D printing',
  provider: { '@id': organizationId },
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Engineering, purchasing, thermal, electrical, RF, aerospace, and semiconductor teams',
  },
  description:
    'Industrial copper additive manufacturing support for custom cold plates, heat sinks, busbars, induction coils, RF waveguide parts, and function-critical copper components.',
  url: toAbsoluteUrl('/'),
});

export const createCopperApplicationServiceSchema = ({
  id,
  name,
  serviceType,
  description,
  url,
  audienceType,
}: {
  id: string;
  name: string;
  serviceType: string;
  description: string;
  url: string | URL;
  audienceType: string;
}): JsonLdNode => ({
  '@type': 'Service',
  '@id': `${siteUrl}/${id.replace(/^\/|\/$/g, '')}#service`,
  name,
  serviceType,
  provider: { '@id': organizationId },
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  audience: {
    '@type': 'Audience',
    audienceType,
  },
  description,
  url: toAbsoluteUrl(url),
});

export const createItemListSchema = (
  name: string,
  items: Array<{ name: string; description?: string; url: string | URL }>
): JsonLdNode => ({
  '@type': 'ItemList',
  name,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: toAbsoluteUrl(item.url),
    item: {
      '@type': 'Thing',
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      url: toAbsoluteUrl(item.url),
    },
  })),
});

export const createArticleSchema = ({
  post,
  url,
  image,
}: {
  post: Post;
  url: string | URL;
  image?: ImageMetadata | string;
}): JsonLdNode => {
  const imageUrl = typeof image === 'string' ? toAbsoluteUrl(image) : toAbsoluteUrl(image?.src);

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: {
      '@id': `${url}#webpage`,
    },
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(imageUrl ? { image: [imageUrl] } : {}),
    datePublished: post.publishDate.toISOString(),
    dateModified: (post.updateDate || post.publishDate).toISOString(),
    author: {
      '@type': 'Organization',
      name: post.author || SITE.name,
      url: siteUrl,
    },
    publisher: { '@id': organizationId },
    ...(post.category?.title ? { articleSection: post.category.title } : {}),
    ...(post.tags?.length ? { keywords: post.tags.map((tag) => tag.title).join(', ') } : {}),
  };
};

export const structuredDataIds = {
  organization: organizationId,
  website: websiteId,
};
