import { slugifyStr } from "@utils/slugify";
import FormatDate from "./FormatDate";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontMatter: CollectionEntry<"blog">["data"];
  body?: string;
}

export default function Card({ href, frontMatter, body = "" }: Props) {
  const { title, pubDate, modDate, description } = frontMatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <h2 {...headerProps}>{title}</h2>
      </a>
      <FormatDate pubDate={pubDate} modDate={modDate} />
      <p>{description}</p>
    </li>
  );
}
