# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **StrataAI**, a Next.js 15 application for an AI-powered strata meeting minutes generation platform. The application is a marketing landing page showcasing features like compliant minutes generation, automatic motions & votes detection, and state-specific templates for Australian strata management.

## Tech Stack

- **Framework**: Next.js 15.5.5 with App Router
- **React**: v19.1.0
- **TypeScript**: v5
- **Styling**: Tailwind CSS v4 with PostCSS
- **Animations**: Framer Motion v12
- **Icons**: Lucide React
- **Build Tool**: Turbopack (via `--turbopack` flag)

## Repository Structure

```
/workspaces/strat/
├── strataai/              # Main Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx   # Main landing page (single-file component)
│   │   │   ├── layout.tsx # Root layout with fonts & metadata
│   │   │   └── globals.css
│   │   └── fonts/         # Local fonts (CalSans)
│   ├── public/            # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── eslint.config.mjs
└── tailwind.config.ts     # Root-level Tailwind config
```

## Development Commands

All commands should be run from the `strataai/` directory:

```bash
cd strataai

# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

The dev server runs on `http://localhost:3000`.

## Architecture Notes

### Single-File Landing Page Pattern

The main page (`src/app/page.tsx`) is intentionally designed as a single-file component containing all landing page sections. This includes:
- Navbar (with mobile menu)
- Hero section (with animated gradient sphere)
- Trust strip
- Feature grid (4 features)
- Product demo
- Integrations
- Security/compliance section
- Testimonials carousel
- CTA banner
- Footer

Each section is a self-contained React component defined in the same file.

### Styling Architecture

- **Tailwind v4** is configured at the root level (`/workspaces/strat/tailwind.config.ts`)
- Custom color palette with primary (indigo-based), accent colors (cyan, purple, pink)
- Custom font stack: Inter (variable) + CalSans (display font)
- Custom animations: fade-in, fade-in-up, scale-in, float, glow
- The application uses `@tailwindcss/postcss` plugin

### Brand Colors

Primary brand color: `#0B63E6` (blue) used for CTAs and accents.

### TypeScript Configuration

- **Module resolution**: `bundler`
- **Path alias**: `@/*` maps to `./src/*` (in `strataai/tsconfig.json`)
- **Target**: ES2017
- **Strict mode**: enabled

### Animation Strategy

- Framer Motion handles most animations
- Scroll-triggered animations use `whileInView` with `viewport={{ once: true }}`
- Testimonials auto-rotate every 5 seconds
- Hero gradient sphere has continuous rotation animation

## Key Dependencies

- `framer-motion`: Page animations and transitions
- `lucide-react`: Icon library (Menu, X icons for mobile nav)
- `next/font`: Font optimization (Inter, local CalSans font)

## Environment & Deployment

- The app is configured for **Australian strata management** context
- Metadata references "Nexus AI" in layout.tsx but page content is "StrataAI" - this may need alignment
- OpenGraph and Twitter card metadata configured in `layout.tsx`
- Tailwind content paths are correctly scoped to `src/` directory

## Testing & Type Checking

Currently no test framework is configured. To add tests, you would typically install:
- Jest + React Testing Library, or
- Vitest + React Testing Library

TypeScript type checking: `npx tsc --noEmit`

## Linting

ESLint configured with Next.js recommended config:
- `next/core-web-vitals`
- `next/typescript`
- Ignores: `node_modules/`, `.next/`, `out/`, `build/`, `next-env.d.ts`

## Working with this Codebase

1. **Adding new sections**: Extend `src/app/page.tsx` by creating new component functions following the existing pattern
2. **Styling changes**: Modify Tailwind config in `/workspaces/strat/tailwind.config.ts` (note: not in strataai/ directory)
3. **Metadata updates**: Edit `src/app/layout.tsx` metadata export
4. **Animation changes**: Use Framer Motion `motion.*` components and variants
5. **Font changes**: Update font imports in `src/app/layout.tsx`

## Known Inconsistencies

- Root README.md is minimal ("# strat")
- Metadata in layout.tsx refers to "Nexus AI" but the actual page is for "StrataAI"
- Some placeholder assets referenced in page.tsx may not exist in public/ directory:
  - `/logo.svg`
  - `/hero-anim.webm`
  - `/placeholder-1.png`
  - `/avatar-1.jpg`
  - Various icons in `/svgs/`
