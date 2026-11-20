# Katharine Ringo · Portfolio

Cat-themed, blue, responsive portfolio built with **React + TypeScript + Vite**, featuring an interactive **Three.js** cat (follows your cursor, blinks, swishes its tail, hops when petted). Light/dark themes, project filtering, accessible markup, and SVG fallback when WebGL isn't available.

## Edit your content

All text lives in **`src/data.ts`** — name, about, email, links, skills, projects, experience. Colors live at the top of **`src/styles.css`**.

Add a photo: put `photo.jpg` in `public/`, then set `photo: '/photo.jpg'` in `src/data.ts`.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm test` | Unit tests (Vitest + Testing Library) |
| `npm run test:e2e` | End-to-end tests (Playwright, desktop + mobile). First time: `npx playwright install chromium` |
| `npm run build` | Type-check + production build into `dist/` |
| `npm run preview` | Serve the production build |

## Deploy

**GitHub Pages** — `.github/workflows/deploy.yml` tests, builds, and deploys on every push to `main`.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

**Vercel** — `vercel.json` is included. Import the repo at vercel.com/new (auto-detects Vite), or run `npx vercel`.

## Project layout

```
src/
  data.ts              ← edit me
  styles.css           ← colors & layout
  App.tsx
  hooks.ts             theme, reduced-motion, WebGL detection
  components/
    CatScene.tsx       Three.js cat (lazy-loaded)
    CatFallback.tsx    SVG cat for no-WebGL
    Nav / Hero / About / Projects / Experience / Contact
  App.test.tsx         Vitest unit tests
e2e/site.spec.ts       Playwright tests
```

Originally based on the [INIT FGCU](https://www.weareinit.org) portfolio template.
