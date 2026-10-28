// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// `astro dev` should serve from /, prod is hosted under /silence-trim-finder/
const isDev = process.argv.includes("dev");

// https://astro.build/config
export default defineConfig({
  base: isDev ? "/" : "/silence-trim-finder",
  vite: {
    plugins: [tailwindcss()],
  },
});
