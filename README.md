# Blue Premoldados

Landing page institucional desenvolvida com Next.js, React, Tailwind CSS e GSAP ScrollTrigger.

## Executar

```bash
npm install
npm run dev
```

Para validar a versão de produção:

```bash
npm run lint
npm run build
npm run start
```

## Conteúdo configurável

- WhatsApp, e-mail, redes sociais e URL pública: `lib/site.ts`
- Textos e seções principais: `components/LandingPage.tsx`
- Perguntas frequentes: `components/Faq.tsx`
- Imagens editoriais e marca: `public/images/`
- Fotos e legendas da galeria: `components/Gallery.tsx` e `public/gallery/`

O campo `whatsapp` permanece vazio de propósito. Use somente números, incluindo país e DDD, por exemplo: `5583999999999`.

As fotografias editoriais das seções de apresentação e serviços foram geradas para ambientação. A galeria utiliza as fotos reais fornecidas pela Blue Premoldados.
