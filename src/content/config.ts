import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(), // Title of the post
      pubDate: z.coerce.date(), // Published date time
      description: z.string(), // Description of the post. Used in post excerpt and site description of the post
      author: z.string().default(SITE.author), // Author of the post.
      modDate: z.coerce.date().optional().nullable(), // Modified date time  (only add this property when a blog post is modified)
      draft: z.boolean().optional(), // Mark this post 'unpublished'.
      tags: z.array(z.string()).default(["others"]), // Related keywords for this post. Written in array yaml format.
      ogImage: image()
        .refine((img) => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(), // OG image of the post. Useful for social media sharing and SEO.
      canonicalURL: z.string().url().optional(), // Canonical URL (absolute), in case the article already exists on other source.
    }),
});

export const collections = { blog };
