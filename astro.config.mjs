// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";

/** Content photos are often camera originals. Cap them before they ship. */
const capContentImages = {
  name: "cap-content-images",
  element: {
    filter: ["img"],
    visit(node, ctx) {
      const src = node.properties?.src;
      if (typeof src !== "string" || URL.canParse(src)) return;
      const width = Number(node.properties?.width);
      if (!Number.isFinite(width) || width > 1440) {
        ctx.setProperty(node, "width", 1440);
      }
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://robgibbens.github.io",
  base: "/hackbots",
  markdown: {
    processor: satteri({
      hastPlugins: [capContentImages],
    }),
  },
});
