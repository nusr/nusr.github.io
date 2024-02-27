import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkToc],
    shikiConfig: {
      theme: "dracula",
      wrap: true,
      experimentalThemes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  scopedStyleStrategy: "where",
  devToolbar: {
    enabled: false,
  },
  image: {
    service: passthroughImageService(),
  },
});