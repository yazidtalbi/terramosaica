# Terra Mosaica

A responsive, light Next.js landing page inspired by the supplied reference. Built with the App Router, TypeScript, and Lenis smooth scrolling. Image locations use neutral grey placeholders; the hero uses `public/hero.mp4`.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:3000.

The hero is full bleed; section content is centered with a 1280px maximum width and full-width backgrounds. To override the hero video and replace the WhatsApp placeholders, copy `.env.example` to `.env.local`, set the video URL (or a path to a video inside `public/`) and both international phone numbers, then restart the dev server. The secondary WhatsApp button opens two contact options. Background video respects reduced-motion preferences and includes a pause control.

## Validation

```sh
npm run typecheck
npm run build
```

The page includes responsive navigation, collection preview dialogs, anchor links, and reduced-motion support. Contact links currently use `contact@terramosaica.com`; confirm the address before launch. The newsletter is a preview only and does not store or send email addresses. Typography uses Google Fonts with local serif and sans-serif fallbacks. Replace the `Placeholder` instances in `app/page.tsx` with real assets when available.
# terramosaica
