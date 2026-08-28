// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  base: "/silence-trim-finder",
  vite: {
    plugins: [tailwindcss()],
  },
});
