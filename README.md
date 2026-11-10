# Vantremont

Source code for [vantremont.com](https://vantremont.com), the website of Vantremont, a professional services firm and network of independent member firms providing advisory, audit and assurance, and tax services.

The site covers three practices and eleven services, eight industries, a member firm directory with profiles, careers with role pages and an application form, contact, meeting and RFP forms, and the legal pages. Every page is statically generated and served from Vercel's edge network.

## Contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [Quality gates](#quality-gates)
- [Design and accessibility](#design-and-accessibility)
- [Security](#security)
- [Deployment](#deployment)
- [License](#license)

## Tech stack

| Area      | Choice                                                                                      |
| --------- | ------------------------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Cache Components, fully static output)                              |
| Language  | TypeScript 5                                                                                |
| UI        | React 19, Tailwind CSS 4, Newsreader and Hanken Grotesk through `next/font`                 |
| Motion    | CSS transitions, and anime.js 4 loaded only where the certification pathway animates        |
| Forms     | Server Actions with Zod validation, Cloudflare Turnstile, honeypot fields, Resend for email |
| Hosting   | Vercel                                                                                      |
| CI        | GitHub Actions and Dependabot                                                               |

Requires Node.js 20.9 or later (CI and Vercel use Node 24) and npm 10 or later.

## Getting started

```bash
npm ci
npm run dev
```

The site runs at http://localhost:3000. The forms work locally without any keys: submissions, including attachment names and sizes, are printed to the terminal instead of being emailed. To test the full flow, copy `.env.example` to `.env.local` and fill it in.

## Environment variables

Set these in Vercel for Production and Preview. Locally they live in `.env.local`, which git ignores.

| Variable                         | Purpose                                             |
| -------------------------------- | --------------------------------------------------- |
| `RESEND_API_KEY`                 | Sends form submissions through Resend               |
| `FORMS_FROM_EMAIL`               | Sender address on a domain verified in Resend       |
| `CONTACT_TO_EMAIL`               | Receives general messages and meeting requests      |
| `RFP_TO_EMAIL`                   | Receives RFPs and their attachments                 |
| `CAREERS_TO_EMAIL`               | Receives job applications and resumes               |
| `NETWORK_TO_EMAIL`               | Receives network membership applications            |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key, used by the browser  |
| `TURNSTILE_SECRET_KEY`           | Cloudflare Turnstile secret key, used by the server |

Each inbox variable accepts several addresses separated by commas. Cloudflare's always-pass Turnstile test keys are listed in `.env.example`.

## Available scripts

| Command                | Description                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| `npm run dev`          | Start the development server                                               |
| `npm run build`        | Production build. Runs the copy check and launch check first.              |
| `npm run start`        | Serve the production build                                                 |
| `npm run lint`         | ESLint                                                                     |
| `npm run typecheck`    | Generate route types and run the TypeScript compiler                       |
| `npm run format`       | Format with Prettier                                                       |
| `npm run check:copy`   | Check copy and docs against the writing rules                              |
| `npm run check:launch` | List every placeholder, unconfirmed statement and missing secret           |
| `npm run check:visual` | Overflow and axe check of every route against a running server (see below) |
| `npm run ci`           | The same checks as CI, in the same order                                   |

## Project structure

```
.
|-- .github/              CI workflow and Dependabot
|-- docs/                 Brand, deployment, launch, security and photo credit notes
|   `-- reference/        Third-party reference material, kept verbatim
|-- public/               Logo files and /.well-known/security.txt
|-- scripts/              Copy check, launch check and visual check
`-- src/
    |-- app/              Routes, metadata, sitemap, robots, icons and share image
    |-- assets/           Photographs and the font files used for the share image
    |-- components/
    |   |-- brand/        Logo
    |   |-- careers/      Role list with filters
    |   |-- forms/        Inquiry and application forms, fields, Turnstile
    |   |-- home/         Certification pathway and industry index
    |   |-- layout/       Header and footer
    |   |-- network/      Member directory, cards and map
    |   |-- pages/        Practice and service page templates
    |   |-- sections/     Reusable page sections
    |   |-- seo/          Structured data
    |   `-- ui/           Buttons and breadcrumbs
    |-- content/          All site copy, company details, members, roles, photos
    `-- lib/              SEO, schema.org builders, form helpers and topics
```

## Editing content

Almost all copy lives in `src/content`.

| File            | What it controls                                                                          |
| --------------- | ----------------------------------------------------------------------------------------- |
| `site.ts`       | Company details, email addresses, and the licensing and network disclosures               |
| `services.ts`   | The three practices and eleven service pages                                              |
| `industries.ts` | The eight industry pages                                                                  |
| `members.ts`    | Member firm profiles, locations and accreditations (the map and directory read from here) |
| `roles.ts`      | Job postings, pay ranges and the EEO statement                                            |
| `leadership.ts` | Leadership profiles                                                                       |
| `photos.ts`     | Photo imports and alt text                                                                |
| `navigation.ts` | Menu structure                                                                            |

To add a service, add an entry to `services.ts`. Its page, menu entry, sitemap entry and form topic are created from there. To add a member firm, add an entry to `members.ts`; set `confirmed: true` only on locations the firm has confirmed.

## Quality gates

**Copy check** (`scripts/check-copy.mjs`). Copy, code comments and docs must not contain em dashes, en dashes, ellipsis characters, curly quotes or the stock marketing phrases listed in the script. Copy is written in American English.

**Launch check** (`scripts/check-launch.mjs`). Lists every inline `LAUNCH-PLACEHOLDER` and `LAUNCH-CONFIRM` marker under `src`, any missing environment variable, and a `security.txt` close to expiry. It is enforced only on production builds served on vantremont.com with `SITE_LAUNCHED=true`, so previews and the soft launch keep working while content is still being confirmed. See [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md).

**Static rendering.** The root layout sets `ensureStatic = "navigation"`, so the build fails if any page would render per request.

**Visual check** (`scripts/visual-check.mjs`). With a production server running (`npm run build && npm run start -- -p 3100`), `npm run check:visual` loads every route in the sitemap at 360, 390, 768, 1024 and 1440 px, fails on horizontal overflow, and runs axe at 390 and 1440 px. Add `-- --shots` to save full-page screenshots to `shots/`.

CI runs the copy check, ESLint, the TypeScript compiler, the build and `npm audit` on production dependencies.

## Design and accessibility

See [docs/BRAND.md](docs/BRAND.md) for the logo, palette and type.

- Flat claret, ink and ivory, with hairline rules and numbered sections. No gradients.
- Content is never hidden waiting for JavaScript or scroll. Motion is limited to hover and press feedback, sliding underlines and the certification pathway, which draws itself on wide screens, has a pause button and stops off screen. Everything respects `prefers-reduced-motion`.
- Only `transform`, `opacity`, `box-shadow` and `border-color` are animated.
- WCAG 2.1 AA: skip link, visible focus, keyboard support, 16 px inputs, 44 px touch targets on phones, errors next to fields with focus moved to the first one.

## Security

Content Security Policy, HSTS and the other headers are set in `next.config.ts`. Every form validates on the server and uses a honeypot and Turnstile. Uploads are limited to PDF and DOCX files of 4 MB or less and are checked by file signature. See [docs/SECURITY.md](docs/SECURITY.md). Report vulnerabilities to security@vantremont.com.

## Deployment

Pushes to `main` deploy to production through the Vercel GitHub integration; pull requests get preview URLs. Search engines are blocked everywhere except the live domain. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## License

Copyright 2026 Vantremont. All rights reserved. This repository is proprietary.

Photographs are used under the [Unsplash License](https://unsplash.com/license) and credited in [docs/PHOTO_CREDITS.md](docs/PHOTO_CREDITS.md). Newsreader and Hanken Grotesk are used under the SIL Open Font License. The original Motion Primitives sources (MIT) are kept for reference in `docs/reference/motion-primitives/`.
