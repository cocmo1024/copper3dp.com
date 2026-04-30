import type { PaginateFunction } from 'astro';
import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_BLOG } from 'astrowind:config';
import { cleanSlug, trimSlash, BLOG_BASE, POST_PERMALINK_PATTERN, CATEGORY_BASE, TAG_BASE } from './permalinks';

const uppercaseTerms = new Set(['3d', 'ai', 'am', 'cnc', 'ct', 'dfam', 'edm', 'gd&t', 'lpbf', 'rf', 'rfq']);
const DEFAULT_POST_AUTHOR = 'COPPER 3DP Engineering';

const normalizeTaxonomyTitle = (value: string): string =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part, index) => {
      const lower = part.toLowerCase();
      if (uppercaseTerms.has(lower)) return lower.toUpperCase();
      return index === 0 ? `${lower.charAt(0).toUpperCase()}${lower.slice(1)}` : lower;
    })
    .join(' ');

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (post: CollectionEntry<'post'>): Promise<Post> => {
  const { id, data } = post;
  const { Content, remarkPluginFrontmatter } = await render(post);

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  const slug = cleanSlug(id); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = Array.from(
    new Map(
      rawTags
        .map((tag: string) => ({
          slug: cleanSlug(tag),
          title: normalizeTaxonomyTitle(tag),
        }))
        .filter((tag) => tag.slug)
        .map((tag) => [tag.slug, tag])
    ).values()
  );

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category: category?.slug }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author || DEFAULT_POST_AUTHOR,

    draft: draft,

    metadata,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Post>> {
  const posts = await getCollection('post');
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _posts: Array<Post>;

/** */
export const isBlogEnabled = APP_BLOG.isEnabled;
export const isRelatedPostsEnabled = APP_BLOG.isRelatedPostsEnabled;
export const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
export const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_BLOG.category.isEnabled;
export const isBlogTagRouteEnabled = APP_BLOG.tag.isEnabled;

export const blogListRobots = APP_BLOG.list.robots;
export const blogPostRobots = APP_BLOG.post.robots;
export const blogCategoryRobots = APP_BLOG.category.robots;
export const blogTagRobots = APP_BLOG.tag.robots;

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

/** */
export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

/** */
export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPosts();

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    posts.some(function (post: Post) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (ids: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts();

  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({ count }: { count?: number }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchPosts();

  return posts ? posts.slice(0, _count) : [];
};

/** */
export const getStaticPathsBlogList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  return paginate(await fetchPosts(), {
    params: { blog: BLOG_BASE || undefined },
    pageSize: blogPostsPerPage,
  });
};

/** */
export const getStaticPathsBlogPost = async () => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      blog: post.permalink,
    },
    props: { post },
  }));
};

/** */
export const getStaticPathsBlogCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPosts();
  const categories = {};
  posts.map((post) => {
    if (post.category?.slug) {
      categories[post.category?.slug] = post.category;
    }
  });

  return Array.from(Object.keys(categories)).flatMap((categorySlug) =>
    paginate(
      posts.filter((post) => post.category?.slug && categorySlug === post.category?.slug),
      {
        params: { category: categorySlug, blog: CATEGORY_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { category: categories[categorySlug] },
      }
    )
  );
};

/** */
export const getStaticPathsBlogTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPosts();
  const tags = {};
  posts.map((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.map((tag) => {
        tags[tag?.slug] = tag;
      });
    }
  });

  return Array.from(Object.keys(tags)).flatMap((tagSlug) =>
    paginate(
      posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.slug === tagSlug)),
      {
        params: { tag: tagSlug, blog: TAG_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { tag: tags[tagSlug] },
      }
    )
  );
};

/** */
export async function getRelatedPosts(originalPost: Post, maxResults: number = 4): Promise<Post[]> {
  const allPosts = await fetchPosts();
  const originalTagsSet = new Set(originalPost.tags ? originalPost.tags.map((tag) => tag.slug) : []);
  const originalTokens = getPostTokens(originalPost);

  const postsWithScores = allPosts.reduce((acc: { post: Post; score: number }[], iteratedPost: Post) => {
    if (iteratedPost.slug === originalPost.slug) return acc;

    let score = 0;

    if (iteratedPost.tags) {
      iteratedPost.tags.forEach((tag) => {
        if (originalTagsSet.has(tag.slug)) {
          score += 12;
        }
      });
    }

    if (iteratedPost.category && originalPost.category && iteratedPost.category.slug === originalPost.category.slug) {
      score += 2;
    }

    score += getTopicFamilyOverlap(originalTokens, getPostTokens(iteratedPost)) * 4;
    score += Math.min(getTokenOverlap(originalTokens, getPostTokens(iteratedPost)), 10);
    score += Math.max(
      0,
      2 - Math.abs(iteratedPost.publishDate.valueOf() - originalPost.publishDate.valueOf()) / (1000 * 60 * 60 * 24 * 90)
    );

    acc.push({ post: iteratedPost, score });
    return acc;
  }, []);

  postsWithScores.sort((a, b) => b.score - a.score || b.post.publishDate.valueOf() - a.post.publishDate.valueOf());

  const selectedPosts: Post[] = [];
  let i = 0;
  while (selectedPosts.length < maxResults && i < postsWithScores.length) {
    selectedPosts.push(postsWithScores[i].post);
    i++;
  }

  return selectedPosts;
}

const ignoredRelatedTokens = new Set(['and', 'are', 'for', 'from', 'guide', 'into', 'the', 'this', 'with', 'your']);

const topicFamilies = [
  ['cold', 'plate', 'plates', 'leak', 'ct', 'channel', 'microchannel', 'brazed', 'monolithic'],
  ['heat', 'sink', 'sinks', 'thermal', 'interface', 'fin', 'fins', 'airflow'],
  ['rfq', 'specification', 'checklist', 'quote', 'acceptance', 'criteria'],
  ['electrode', 'electrodes', 'edm', 'voltage', 'wear', 'accuracy'],
  ['busbar', 'busbars', 'induction', 'coil', 'coils', 'electrical', 'current'],
  ['material', 'materials', 'copper', 'cucrzr', 'pure', 'lpbf'],
  ['process', 'selection', 'cnc', 'brazing', 'skiving', 'manufacturing'],
  ['test', 'inspection', 'failure', 'failures', 'porosity', 'density'],
];

const getPostTokens = (post: Post): Set<string> => {
  const text = [
    post.slug,
    post.title,
    post.excerpt,
    post.category?.slug,
    post.category?.title,
    ...(post.tags || []).flatMap((tag) => [tag.slug, tag.title]),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return new Set(
    text
      .split(/[^a-z0-9&]+/)
      .map((token) => token.trim())
      .filter((token) => token.length > 2 && !ignoredRelatedTokens.has(token))
  );
};

const getTokenOverlap = (left: Set<string>, right: Set<string>): number => {
  let score = 0;
  left.forEach((token) => {
    if (right.has(token)) score += 1;
  });
  return score;
};

const getTopicFamilyOverlap = (left: Set<string>, right: Set<string>): number =>
  topicFamilies.filter((family) => family.some((term) => left.has(term)) && family.some((term) => right.has(term)))
    .length;
