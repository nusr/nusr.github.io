import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { SITE } from "./src/config";
import readingTime from "reading-time";

export function remarkReadingTime() {
  return function (_: any, frontMatter: any) {
    const result = readingTime(frontMatter.value);
    frontMatter.data.astro.frontmatter.readingSeconds = Math.ceil(
      result.minutes
    );
    frontMatter.data.astro.frontmatter.readingWords = result.words;
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
  scopedStyleStrategy: "where",
  image: {
    service: passthroughImageService(),
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  experimental: {
    contentCollectionCache: true,
    clientPrerender: true,
  },
});
