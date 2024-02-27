import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";

export async function GET() {
  const blog = await getCollection("blog");
  const sortedPosts = getSortedPosts(blog);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, slug }) => ({
      link: `blog/${slug}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDate ?? data.pubDate),
    })),
  });
}
