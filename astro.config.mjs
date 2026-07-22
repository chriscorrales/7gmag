import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site atual: GitHub Pages de projeto -> https://chriscorrales.github.io/7gmag/
// Ao configurar o domínio próprio: trocar `site` pela URL do domínio e `base` para '/'.
export default defineConfig({
  site: 'https://chriscorrales.github.io',
  base: '/7gmag',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
  },
});
