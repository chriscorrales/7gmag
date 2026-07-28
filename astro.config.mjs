import { defineConfig, fontProviders } from 'astro/config';
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
  // Auto-hospeda as fontes (sem CDN do Google) — a API é experimental, mas o
  // CI roda `npm ci`, que resolve pelo package-lock.json (Astro 5.18.2
  // pinado), então não muda sob nós sem alguém rodar `npm update` de propósito.
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Cormorant Garamond',
        cssVariable: '--font-heading',
        weights: [400, 600],
        styles: ['normal'], // default é ['normal','italic'] — sem isso entram ~45KB de itálico que o site nunca usa
        subsets: ['latin'],
        fallbacks: ['Georgia', 'serif'],
      },
      {
        provider: fontProviders.google(),
        name: 'Lora',
        cssVariable: '--font-body',
        weights: [400], // peso 600 nunca é usado no site (só heading usa 600)
        styles: ['normal'],
        subsets: ['latin'],
        fallbacks: ['Georgia', 'serif'],
      },
    ],
  },
});
