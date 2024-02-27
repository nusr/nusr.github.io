import getSortedPosts from "./getSortedPosts";
import type { CollectionEntry } from "astro:content";

type PostItem = {
  url: string;
  title: string;
  pubDate: Date;
  modDate: Date | null | undefined;
};

function getPostArchives(blog: CollectionEntry<"blog">[]) {
  const sortPosts = getSortedPosts(blog);
  const postList: PostItem[] = sortPosts.map(post => ({
    url: post.slug,
    title: post.data.title,
    pubDate: post.data.pubDate,
    modDate: post.data.modDate,
  }));

  const postData = new Map<number, PostItem[]>();
  for (const item of postList) {
    const year = item.pubDate.getFullYear();
    if (postData.has(year)) {
      postData.get(year)!.push(item);
    } else {
      postData.set(year, [item]);
    }
  }

  return {
    postData,
    total: sortPosts.length
  };
}

export default getPostArchives;
