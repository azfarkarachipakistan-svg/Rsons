# R&Sons Enterprise Headwear & 3D Customizer — Next.js

A real Next.js App Router storefront in TypeScript. Light elegant theme only: Alabaster #FBF9F5, White #FFFFFF, Champagne Linen #F4F0EA, Travertine #EDE8DF, hairline #E5E0D8, Espresso #141312, Taupe #6E6A63, Champagne Gold #B89768, Sage #2E6F40, Terracotta #9E472A. No dark backgrounds.

## How to run (Windows, macOS, Linux)

```bash
npm install
npm run dev
# open http://localhost:3000
npm run build
npm start
```

## Project structure

- `app/` — App Router routes: `/` home (hero film + scroll-scrub), `/shop`, `/product/[slug]`, `/collections/[slug]`, `/custom-studio`, `/cap-finder`, `/b2b`, `/admin`
- `components/` — Header (two-tier, mega menu, cart drawer), ProductCard, Reveal, ScrollScrub, CapSimulator (Three.js)
- `lib/products.ts` — 36 R&Sons own-label products, collections, techniques, B2B tiers
- `lib/store.tsx` — cart context (localStorage) + GBP/EUR/USD/PKR currency conversion
- `public/media/` — original generated media only: `hero.mp4`, `craft.webp`, `lookbook.webp`, `community.webp`, `b2b.webp`

## What is real

- All routes, filters, search, sort, Cap Finder → shop filtering, cart (localStorage, shared across shop/product/studio/B2B), currency repricing, B2B tier calculator + editable roster, concierge form validation
- The 3D cap simulator: procedural Three.js geometry (six crown panels, brim, underbill, button, interior label), live silhouette / crown / visor / underbill / placement / technique / canvas-texture lettering with arch, spacing, thread colour and fonts, camera presets, drag orbit, 360° orbit, daylight/studio lighting, live itemised pricing, stitch telemetry, browser-generated tech-pack JSON download
- Scroll scrubbing: on the home page, scrolling scrubs `hero.mp4` currentTime; if video metadata is not yet loaded, the progress bar still tracks scroll and the hero film plays normally

## What is still an integration placeholder (NOT live)

| Feature | Status | Env names to set when wiring it |
|---|---|---|
| Stripe payments / checkout | TODO — checkout button is a demo label | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| Database / orders / inventory | TODO — demo data in code | `DATABASE_URL` |
| Search index (Meilisearch / Algolia) | TODO — in-browser filtering used instead | `MEILISEARCH_HOST`, `MEILISEARCH_API_KEY` / `NEXT_PUBLIC_ALGOLIA_APP_ID`, `ALGOLIA_API_KEY` |
| File storage (AWS S3 / Cloudflare R2) | TODO — uploads are browser previews only | `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` / `R2_*` equivalents |
| Email (Resend) | TODO — no email is sent | `RESEND_API_KEY` |
| Analytics (GA4 / Meta Pixel) | TODO — admin cards are previews | `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` |

No API keys are included in this repo. Do not commit secrets; use `.env.local` (git-ignored by the Next.js default pattern — add it if your setup needs it).

## Honesty notes

- All products are R&Sons own-label with original names. No Hatstore, CapsApparel, New Era, Mitchell & Ness, '47, Stetson, Goorin, Brixton or other licensed brand names, text or images are used.
- The reviews strip on the home page is labelled illustrative only. It is not real verified orders.
- The AR Mirror Try-On button is a placeholder; camera AR is not implemented.
- Production `.DST` embroidery files are not generated; the tech pack is a JSON summary.
