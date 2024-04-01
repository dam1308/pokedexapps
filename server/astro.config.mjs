import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  port: 5432, //no funciono... :( se sigue levantando en 4321
  output: 'server',
  integrations: [tailwind()]
});
