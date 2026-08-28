// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    base: "/silence-trim-finder",
    plugins: [tailwindcss()],
  },
});
