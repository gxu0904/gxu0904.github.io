import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://gracexu.dev',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
    mdx(),
  ],
  output: 'static',
  outDir: './out',
  build: {
    assets: 'assets'
  },
  vite: {
    optimizeDeps: {
      exclude: ['gsap']
    }
  }
});