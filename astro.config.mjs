import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domínio próprio (GitHub Pages com custom domain) -> https://calcadosmagneticos.com.br/
// O antigo https://chriscorrales.github.io/7gmag/ redireciona pra cá automaticamente.
export default defineConfig({
  site: 'https://calcadosmagneticos.com.br',
  base: '/',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // O sitemap lista a home 2x (com e sem barra final) — vem de dois
      // caminhos internos independentes do @astrojs/sitemap, trailingSlash
      // não resolve isso sozinho. Mantém só a URL que o GitHub Pages serve.
      filter: (page) => page.endsWith('/'),
    }),
  ],
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
