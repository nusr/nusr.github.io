import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

interface Tag {
  tag: string;
  tagName: string;
  count: number;
}

const getUniqueTags = (blog: CollectionEntry<"blog">[]) => {
  const tagList = blog
    .filter(postFilter)
    .flatMap(post => post.data.tags)
    .map(tag => ({ tag: slugifyStr(tag), tagName: tag }));
  const record: Record<string, Tag> = {};
  for (const item of tagList) {
    if (record[item.tag]) {
      record[item.tag].count++;
    } else {
      record[item.tag] = {
        tagName: item.tag,
        tag: item.tag,
        count: 1,
      };
    }
  }
  const result = Object.values(record);
  result.sort((tagA, tagB) => tagB.count - tagA.count);
  return result;
};

export default getUniqueTags;
