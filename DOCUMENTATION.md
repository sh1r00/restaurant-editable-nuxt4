# Savora Restaurant — restaurant-editable-nuxt4

> Category: Restaurant Template · Live: https://restaurant-editable.netlify.app

## Functionality

A fine-dining restaurant site with an **editable menu** and a lightweight admin area.

- **Public pages** — `pages/index.vue` (home), `pages/menu.vue`, `pages/gallery.vue`, `pages/about.vue`, `pages/contact.vue`.
- **Admin area** — `pages/admin/login.vue`, `pages/admin/index.vue`, `pages/admin/menu.vue` (password-protected menu editor).
- **Editable content** — the menu is loaded into a Pinia store (`stores/menu.ts`) and persisted to `localStorage` (simulating a headless CMS). Seed data lives in `data/menuItems.ts` (starters, mains, desserts, drinks, each with dietary tags).
- **Auth** — `stores/auth.ts` persists an admin session in `localStorage`.
- **Testimonials** — static data in `data/testimonials.ts`.
- **Also included** — dark mode (SSR-safe via Pinia + `useCookie`), PWA (offline + install prompt), i18n (3 locales), reservations/contact.

## Stack

- Nuxt 4 (`compatibilityVersion: 4`, `srcDir: '.'`), Vue 3 `<script setup>`, TypeScript
- Pinia (stores: `auth`, `menu`, `darkMode`, `pwaInstall`)
- Tailwind CSS (`@nuxtjs/tailwindcss`)
- `@nuxtjs/i18n` v10 — 3 locales (English, Español, አማርኛ), `strategy: 'prefix'`
- `@vite-pwa/nuxt` — service worker, offline caching, installable manifest
- `nuxt-security` — CSP (nonce-based), rate limiter, XSS validator (production only)
- Vitest + Vue Test Utils (unit), Playwright (e2e)

## Steps Taken

`git log --oneline` (newest first):

- `b57456f` fix(netlify): root `/` redirect to `/en/` (prefix strategy) + SPA fallback to `/200.html`
- `0eb2b19` fix(netlify): node 24 + legacy-peer-deps (nuxt-security@2.6.0 needs >=24)
- `2959fe7` fix(i18n+security): detectBrowserLanguage:false, `$t`→`t`, missing keys, CSP nonce, lazy i18n, branded PWA
- `e427a7a` fix README.md formatting
- `578ed58` convert README.txt to README.md with GitHub markdown formatting
- `bb6e5a1` add README.txt with deploy instructions + project overview
- `1dcb9a7` nuxt4 migration/creation + restaurant-editable-nuxt4

## Pitfalls & Fixes

### Shared pitfalls (all shiro Nuxt 4 templates)

- **`nuxt-security@2.6.0` needs Node ≥ 24** — Netlify's default Node version is too old and the build fails. Fix: `NODE_VERSION = "24"` in `netlify.toml`.
- **esbuild peer conflict** — a peer dependency conflict (esbuild/rollup) aborts `npm install`. Fix: `npm install --legacy-peer-deps`.
- **i18n v10 `detectBrowserLanguage`** — browser detection causes unpredictable 302s on first load. Fix: `detectBrowserLanguage: false` and generate links with `const localePath = useLocalePath()`.
- **`$t()` is banned in `<template>`** — i18n v10 drops the global `$t()` template helper. Fix: `const { t } = useI18n()` in `<script setup>` and call `t('key')`.
- **Component auto-import `pathPrefix: false`** — default path-prefixed auto-import names don't match the tags, producing a blank screen. Fix: declare each component dir with `pathPrefix: false` (or use explicit prefixes).
- **PWA `navigateFallback`** — a precached SPA fallback serves non-precached URLs as the app shell → blank screen. Fix: `navigateFallback: null` and exclude `.html` from precache globs.
- **i18n `prefix` strategy root redirect** — with `strategy: 'prefix'` there is no page at `/`; Netlify must 302 `/` → `/en/`.
- **`defineProps()` without `const props =`** — in `<script setup>` you must capture the return value (`const props = defineProps<...>()`); otherwise destructuring throws "props is not defined".
- **SSG vs SSR output dirs** — `nuxt build` (SSR) writes `.output/server` + `.output/public`; `nuxt generate` (SSG) writes the static site to `.output/public` only. Netlify `publish` must point at `.output/public`.

### Project-specific

- **Component prefixes instead of `pathPrefix: false`** — this template keeps auto-import prefixes (`A`/`M`/`O` for atoms/molecules/organisms) and a prefix-less `admin` dir. A blank screen occurs if a component is referenced by the wrong (or missing) prefix.
- **localStorage as a CMS** — menu/auth persistence is client-only; every `localStorage` read/write is guarded with `import.meta.client` so SSR/prerender does not crash.

## Deployment

Static site generation:

```bash
npm install --legacy-peer-deps
npm run generate   # → .output/public
```

Netlify (`netlify.toml`): `NODE_VERSION = "24"`, build command `npm install --legacy-peer-deps --no-audit --no-fund && npm run generate`, publish dir `.output/public`, redirects `/` → `/en/` (302) and `/*` → `/200.html` (200, SPA fallback).

Live: https://restaurant-editable.netlify.app

## TODO / Roadmap
- [ ] Point a custom domain (optional) — for client-facing work; a single wildcard domain can cover all sites.
