import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Statische output: ideaal voor Git-backed content (PagesCMS commit -> nieuwe build).
export default defineConfig({
  site: 'https://sv-optimis.nl',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  vite: { plugins: [tailwindcss()] },
});
