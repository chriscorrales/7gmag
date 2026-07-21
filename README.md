# Site 7G Mag — Revendedores

Landing page de captação de revendedores da 7G Mag (calçados magnéticos). Export do **Claude Design**, hospedado no **GitHub Pages**.

## Publicar / atualizar
- O arquivo servido é **`index.html`** (cópia do export `Site 7G Mag Revendedores.dc.html`).
- Ao **re-exportar** do Claude Design, copie o novo `.dc.html` por cima do `index.html`:
  ```sh
  cp "Site 7G Mag Revendedores.dc.html" index.html
  git add -A && git commit -m "atualiza conteúdo" && git push
  ```
- O **`.nojekyll`** é obrigatório: sem ele o GitHub Pages (Jekyll) ignora a pasta `_ds/` e o site quebra.

## Estrutura
- `index.html` — página (deploy)
- `support.js` — runtime do Claude Design (renderiza o `{{ }}`, FAQ, formulário)
- `_ds/` — design system (CSS + bundle)
- `uploads/` — imagens (logo + fotos dos produtos)

## ⚠️ Pontos de atenção
- **Depende de CDN (unpkg):** o `support.js` baixa React + Babel do `unpkg.com` em runtime. Precisa de internet e fica lento/frágil. **Recomendado depois:** re-plataformar num build estático de verdade (Astro/Eleventy) — resolve isso e abre caminho pro CMS (ver nota do cofre).
- **Formulário não envia:** o "Enviar cadastro" só mostra mensagem de sucesso, **não manda o lead pra lugar nenhum**. O canal real é o WhatsApp. Integrar depois (Formspree, ou o próprio WhatsApp).
- **WhatsApp:** `+55 83 99372-7554`.
