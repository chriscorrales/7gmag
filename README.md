# Site 7G Mag — Revendedores

Landing page de captação de revendedores da 7G Mag (calçados magnéticos). Build estático em **Astro 5**, hospedado no **GitHub Pages** (`https://chriscorrales.github.io/7gmag/`).

## Stack
- **Astro 5** (`astro:assets` — `<Image>`/`<Picture>` com WebP/AVIF automático, sem framework de UI, zero JS no output exceto o script inline do formulário)
- **Sveltia CMS** em `/admin`, editando `src/data/content.json` (backend GitHub, relay OAuth via Cloudflare Worker — ver `7G Mag projeto/sveltia-cms-auth`)
- **@astrojs/sitemap** + fontes auto-hospedadas via `experimental.fonts` (sem CDN do Google)

## Rodar localmente
```sh
npm install
npm run dev        # http://localhost:4321/7gmag/
npm run build       # gera dist/
npm run preview     # serve dist/ localmente
```

## Deploy
Automático via GitHub Actions (`.github/workflows/deploy.yml`) a cada push na branch **`main`**. Não existe deploy manual — `astro build` + `upload-pages-artifact` + `deploy-pages`.

⚠️ Se estiver trabalhando numa branch de feature (ex.: `astro-rebuild`), o deploy só dispara depois do merge pra `main`.

## Editar conteúdo (sem mexer em código)
Painel em `/admin` (Sveltia CMS) edita hero, vantagens, catálogo, passos, depoimentos e FAQ — tudo em `src/data/content.json`. Login via GitHub (relay OAuth no Cloudflare Worker).

**Não é editável pelo CMS** (fica hardcoded em `src/pages/index.astro`): número do WhatsApp, o formulário de cadastro, os links do menu, os títulos das seções "Como funciona"/"Depoimentos"/"Dúvidas", o rodapé, e todo o SEO/JSON-LD em `src/layouts/Base.astro`.

## Formulário de cadastro — sem backend
O botão "Enviar cadastro por e-mail" abre o app de e-mail do lead com nome/e-mail/telefone/cidade já preenchidos (via `mailto:`, com um script inline de ~20 linhas montando a mensagem; funciona sem JS também, só menos bonito). **Não há Formspree nem qualquer serviço de terceiros** — decisão consciente pra não depender de backend.

Trade-off aceito: converte pior que um form com backend de verdade (o lead sai do site, precisa ter app de e-mail configurado, e ainda aperta "enviar" de novo lá). Por isso o WhatsApp continua como CTA principal ao lado.

**⚠️ Trocar o e-mail de destino**: hoje `EMAIL_LEADS` em `src/pages/index.astro` aponta pro e-mail pessoal do desenvolvedor, só pra testar o fluxo. Assim que a Shirley/Edmilson definirem o e-mail oficial da 7G Mag, trocar essa única constante — de preferência um alias (`revenda@...`), não uma caixa pessoal, já que o endereço fica exposto em HTML estático (não tem como evitar scraping num link `mailto:` sem quebrar o funcionamento sem JS).

## Fontes
`experimental.fonts` (astro.config.mjs) auto-hospeda Cormorant Garamond + Lora a partir do Google Fonts, sem CDN externo e com fallbacks de métrica casada (evita layout shift na troca de fonte). É uma API experimental do próprio Astro — mas o CI roda `npm ci`, que resolve pelo `package-lock.json` (Astro `5.18.2` pinado), então não muda sozinha sem alguém rodar `npm update` de propósito.

## Checklist ao migrar pro domínio próprio
Hoje tudo está preso ao path de projeto `/7gmag` do GitHub Pages. Ao configurar um domínio:
1. `astro.config.mjs` — trocar `site` pela URL do domínio e `base` para `'/'`.
2. `public/admin/config.yml` — atualizar `public_folder`.
3. `public/robots.txt` — atualizar a linha `Sitemap:`.
4. Adicionar um arquivo `CNAME` em `public/` com o domínio.
5. `Base.astro`, `favicon`, `og:image` e o `logo` do JSON-LD já resolvem sozinhos via `comBase()` (usa `import.meta.env.BASE_URL`) — não precisa tocar neles.

## Pontos de atenção conhecidos
- **WhatsApp:** `+55 83 99372-7554` (constante `WA` em `index.astro`, 3 lugares).
- **`EMAIL_LEADS`** ainda é o e-mail pessoal do desenvolvedor (ver seção "Formulário" acima) — pendente de troca.
- O JSON-LD `Organization.logo` aponta pra `og.jpg` (card social 1200×630), que tecnicamente não é um logo quadrado — funciona, mas não é o ideal pra rich results do Google. Se algum dia sobrar tempo, vale trocar por uma imagem quadrada dedicada.
