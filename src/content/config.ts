import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const canonicalDefinition = z
  .string()
  .url()
  .refine(
    (value) => {
      try {
        const url = new URL(value);
        return (
          url.origin === 'https://copper3dp.com' &&
          (url.pathname === '/' || url.pathname.endsWith('/')) &&
          !url.search &&
          !url.hash
        );
      } catch {
        return false;
      }
    },
    {
      message: 'Canonical URLs must use the HTTPS apex domain, a trailing slash, and no query or fragment.',
    }
  );

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: canonicalDefinition.optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().url().optional(),
          site_name: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
                alt: z.string().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z
    .object({
      publishDate: z.date(),
      updateDate: z.date().optional(),
      draft: z.boolean().optional(),

      title: z.string(),
      excerpt: z.string(),
      image: z.string().optional(),

      category: z.string().optional(),
      tags: z.array(z.string()).optional(),
      author: z.string().optional(),

      metadata: metadataDefinition(),
    })
    .superRefine((data, context) => {
      if (data.updateDate && data.updateDate < data.publishDate) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['updateDate'],
          message: 'updateDate must be the same as or later than publishDate.',
        });
      }
    }),
});

export const collections = {
  post: postCollection,
};
