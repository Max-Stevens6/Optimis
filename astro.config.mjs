import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sv-optimis.nl',
  output: 'static',
  trailingSlash: 'ignore',
  vite: { plugins: [tailwindcss()] },
});