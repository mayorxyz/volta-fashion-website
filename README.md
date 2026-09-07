# VOLTA — Fashion Editorial Website

A TypeScript + React Vite single-page app used as a blueprint for a fashion editorial site (lookbooks, collections, editorial imagery and static pages). Content is driven from src/data/content.ts so the site can be edited without a backend.

## What this is
VOLTA is a client-side editorial website template focused on showcasing collections and lookbooks. It’s intended for frontend developers and designers who want a polished, animated SPA that can be populated with curated editorial content.

### Stack
- **Language(s):** TypeScript (primary), JavaScript
- **Framework / runtime:** React (function components) + Vite (dev server & build)
- **Notable libraries:** react, react-router-dom, framer-motion, tailwindcss, @supabase/supabase-js

## How it's organized
Top-level files & folders:

```
src/
  main.tsx                 - app entry: mounts React app into #root
  App.tsx                  - top-level app; routing and shared layout
  index.css                - global styles (Tailwind + custom CSS)
  components/              - reusable UI components (Navbar, Footer, Hero, Cards, etc.)
  pages/                   - route views (Home, Lookbook, Collections, About, Contact, CollectionDetail)
  data/                    - content.ts: authoritative site content (collections, lookbook data)
  lib/                     - motion.ts: Framer Motion helpers
index.html                 - HTML shell with <div id="root">
package.json               - scripts and dependency list
vite.config.js             - Vite configuration
tsconfig.json              - TypeScript configuration
```

How it fits together: main.tsx mounts the React app; App.tsx sets up routes using react-router and the app-wide layout (Navbar, Footer). Each page imports content from `src/data/content.ts` and composes components from `src/components`. Animations and transitions are provided via `framer-motion` helpers in `src/lib/motion.ts` and used by components such as PageTransition, Reveal, and EditorialHero.

## How to run it
Prerequisites: Node.js (LTS recommended) and npm.

Commands:

```bash
# clone and install
git clone https://github.com/mayorxyz/volta-fashion-website.git
cd volta-fashion-website
npm install

# start development server (Vite)
npm run dev

# typecheck (TypeScript)
npm run typecheck

# build production bundle
npm run build
```

Notes:
- The site is a static SPA; content is bundled at build time. There is no backend required to run the prototype.
- Tailwind is present as a dev dependency; index.css contains the Tailwind directives. The project uses the Tailwind Vite plugin — if you customize PostCSS or Tailwind config, ensure the relevant config files are added.
- Supabase appears in dependencies but is not configured out-of-the-box. If you enable Supabase features (e.g., newsletter signup), add `SUPABASE_URL` and `SUPABASE_ANON_KEY` and initialize the client where needed.

## Where to edit content
- `src/data/content.ts` — the authoritative content file. Add or modify collections, lookbook entries, editorial body text, and image references here.
- `src/components/*` — UI components used across pages. Add new components for new patterns.
- `src/pages/*` — route-level pages. Add a new page and register a route in `App.tsx` to expose it.

## Development tips
- For layout/CSS tweaks, edit `src/index.css` and component-level classNames. Tailwind utility classes are used heavily.
- For animation changes, check `src/lib/motion.ts` and the motion props applied in components such as `PageTransition.tsx`, `Reveal.tsx`, and `EditorialHero.tsx`.
- To add images, either host them remotely and reference absolute URLs in `content.ts` or add an `assets/` folder and reference relative paths (ensure Vite serves them correctly).

## Troubleshooting
- If the dev server fails to start: ensure you have a Node version compatible with the project and that `npm install` completed successfully.
- If TypeScript errors block you, run `npm run typecheck` to see the list; fix types in files reported by tsc.

## Try asking
- How is content shaped in `src/data/content.ts` and what fields do pages expect when rendering a collection or lookbook item?
- Where are images referenced for the lookbook pages — are they remote URLs or expected to live in a repo assets folder?
- Does any component initialize Supabase (for example, NewsletterCTA.tsx); if I want newsletter signups working, what env vars and code changes are required?

---

_This README was generated and added to the repository to provide an overview and developer onboarding instructions._
