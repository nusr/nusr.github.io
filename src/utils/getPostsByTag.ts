import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { slugifyAll } from "./slugify";

const getPostsByTag = (blog: CollectionEntry<"blog">[], tag: string) =>
  getSortedPosts(
    blog.filter((post) => slugifyAll(post.data.tags).includes(tag)),
  );

export default getPostsByTag;
