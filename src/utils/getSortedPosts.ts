import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (blog: CollectionEntry<"blog">[]) => {
  return blog
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDate ?? b.data.pubDate).getTime() / 1000,
        ) -
        Math.floor(new Date(a.data.modDate ?? a.data.pubDate).getTime() / 1000),
    );
};

export default getSortedPosts;
