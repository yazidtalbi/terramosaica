# Terra Mosaica

A responsive, light Next.js landing page inspired by the supplied reference. Built with the App Router, TypeScript, and Lenis smooth scrolling. Collections use the four product photos from `app/public`. Other image locations use neutral grey placeholders. The hero source is `app/public/hero.mp4`, served through a symbolic link at `public/hero.mp4`.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:3000.

The hero is full bleed; the page runs full bleed with centered section content and shared inner side margins. To override the hero video and replace the WhatsApp placeholders, copy `.env.example` to `.env.local`, set the video URL (or a path to a video inside `public/`) and both international phone numbers, then restart the dev server. The secondary WhatsApp button opens two contact options. Background video respects reduced-motion preferences.

## Validation

```sh
npm run typecheck
npm run build
```

The page includes responsive navigation, collection preview dialogs, anchor links, and reduced-motion support. Contact links currently use `contact@terramosaica.com`; confirm the address before launch. Facebook and Instagram icons are placeholders until profile URLs are provided; the email icon opens the contact address. Typography uses Google Fonts with local serif and sans-serif fallbacks. Replace the `Placeholder` instances in `app/page.tsx` with real assets when available.
# terramosaica

The FAQ uses native keyboard-accessible disclosures. The contact form validates required fields and prepares an email in the visitor’s mail app; no backend submission or storage is configured. Confirm the contact address before launch.
