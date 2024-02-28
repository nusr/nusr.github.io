import { slugifyStr } from "@utils/slugify";
import FormatDate from "./FormatDate";
import type { CollectionEntry } from "astro:content";
// import { extractDescriptionFromContent } from "@utils/countReadTime";

export interface Props {
  href?: string;
  frontMatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
  body?: string;
}

export default function Card({
  href,
  frontMatter,
  secHeading = true,
  // body = "",
}: Props) {
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
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <FormatDate pubDate={pubDate} modDate={modDate} />
      <p>{description}</p>
    </li>
  );
}
