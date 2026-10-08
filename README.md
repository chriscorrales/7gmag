# Site Calçados Magnéticos — Revendedores

Landing page de captação de revendedores da **Calçados Magnéticos** (antiga 7G Mag — o repositório e as pastas ainda carregam o nome antigo). Build estático em **Astro 5**, hospedado no **GitHub Pages** com domínio próprio: **https://calcadosmagneticos.com.br/** (o antigo `chriscorrales.github.io/7gmag/` redireciona pra lá).

## Stack
- **Astro 5** (`astro:assets` — `<Image>`/`<Picture>` com WebP/AVIF automático, sem framework de UI, zero JS no output exceto o script inline do formulário)
- **Sveltia CMS** em `/admin`, editando `src/data/content.json` (backend GitHub, relay OAuth via Cloudflare Worker — ver `7G Mag projeto/sveltia-cms-auth`)
- **@astrojs/sitemap** + fontes auto-hospedadas via `experimental.fonts` (sem CDN do Google)

## Rodar localmente
```sh
npm install
npm run dev        # http://localhost:4321/
npm run build       # gera dist/
npm run preview     # serve dist/ localmente
```

## Deploy
Automático via GitHub Actions (`.github/workflows/deploy.yml`) a cada push na branch **`main`**. Não existe deploy manual — `astro build` + `upload-pages-artifact` + `deploy-pages`.

⚠️ Se estiver trabalhando numa branch de feature (ex.: `astro-rebuild`), o deploy só dispara depois do merge pra `main`.

## Editar conteúdo (sem mexer em código)
Painel em `/admin` (Sveltia CMS) edita número do WhatsApp, hero, vantagens, catálogo, passos, depoimentos e FAQ (incluindo qual pergunta ganha o destaque "Mais perguntada") — tudo em `src/data/content.json`. Login via GitHub (relay OAuth no Cloudflare Worker).

**Não é editável pelo CMS** (fica hardcoded em `src/pages/index.astro`): o formulário de cadastro, o modal "+ novidades", os links do menu, os títulos das seções "Como funciona"/"Depoimentos"/"Dúvidas", o rodapé, e todo o SEO/JSON-LD em `src/layouts/Base.astro`.

## Formulário de cadastro — sem backend
O botão "Enviar cadastro por e-mail" abre o app de e-mail do lead com nome/e-mail/telefone/cidade já preenchidos (via `mailto:`, com um script inline de ~20 linhas montando a mensagem; funciona sem JS também, só menos bonito). **Não há Formspree nem qualquer serviço de terceiros** — decisão consciente pra não depender de backend.

Trade-off aceito: converte pior que um form com backend de verdade (o lead sai do site, precisa ter app de e-mail configurado, e ainda aperta "enviar" de novo lá). Por isso o WhatsApp continua como CTA principal ao lado.

**⚠️ Trocar o e-mail de destino**: hoje `EMAIL_LEADS` em `src/pages/index.astro` aponta pro e-mail pessoal do desenvolvedor, só pra testar o fluxo. Assim que a Shirley/Edmilson definirem o e-mail oficial da empresa, trocar essa única constante — de preferência um alias (`revenda@...`), não uma caixa pessoal, já que o endereço fica exposto em HTML estático (não tem como evitar scraping num link `mailto:` sem quebrar o funcionamento sem JS).

## Fontes
`experimental.fonts` (astro.config.mjs) auto-hospeda Cormorant Garamond + Lora a partir do Google Fonts, sem CDN externo e com fallbacks de métrica casada (evita layout shift na troca de fonte). É uma API experimental do próprio Astro — mas o CI roda `npm ci`, que resolve pelo `package-lock.json` (Astro `5.18.2` pinado), então não muda sozinha sem alguém rodar `npm update` de propósito.

## Domínio próprio (calcadosmagneticos.com.br)
- **DNS** (registro.br): 4 registros `A` no domínio raiz → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` → `CNAME chriscorrales.github.io` (o GitHub redireciona www → raiz).
- **GitHub → Settings → Pages**: Custom domain `calcadosmagneticos.com.br` + "Enforce HTTPS". Como o deploy é por GitHub Actions, **não existe arquivo `CNAME`** no repo — o GitHub ignora esse arquivo nesse modo; o domínio vive só nessa configuração.
- **Código**: `site`/`base` em `astro.config.mjs`, linha `Sitemap:` em `public/robots.txt`, `public_folder` em `public/admin/config.yml`. Todo o resto (links internos, favicon, og:image, JSON-LD) passa por `comBase()` em `src/lib/site.ts`, que usa `import.meta.env.BASE_URL`.
- **Login do /admin**: o Worker `sveltia-cms-auth` só aceita os domínios em `ALLOWED_DOMAINS` (`wrangler.toml`). Se trocar de domínio de novo, atualizar ali e rodar `npx wrangler deploy` — senão o login do painel falha com `UNSUPPORTED_DOMAIN`.

## Pontos de atenção conhecidos
- **WhatsApp:** `+55 83 99372-7554` — editável no CMS ("Contato"); `src/lib/site.ts` monta o link `wa.me` e o telefone do JSON-LD a partir dele.
- **`EMAIL_LEADS`** ainda é o e-mail pessoal do desenvolvedor (ver seção "Formulário" acima) — pendente de troca.
- **Modal "+ novidades"** está escondido (`MODAL_NOVIDADES_ATIVO = false` em `index.astro`) porque as specs eram placeholder. Quando chegarem fotos/dados reais, atualizar o conteúdo do modal e virar a flag pra `true`.
- **Logo:** `src/assets/brand/logo.png` (monograma CM, quadrado, fundo transparente — gerado a partir de `Logo monograma elegante em dourado e azul.png` na raiz do projeto, com a margem branca cortada). Dele saem no build o logo da nav/rodapé, o favicon (64×64) e o `Organization.logo` do JSON-LD (512×512).
- **Instagram:** o link do rodapé e o `sameAs` do JSON-LD ainda apontam pra `@oficial7gmag` — trocar quando a conta for renomeada.
