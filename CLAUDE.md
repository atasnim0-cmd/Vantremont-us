# Vantremont website: project brief and working rules

Read this whole file before doing anything. It carries the decisions made with the owner in an earlier session, so nothing needs to be asked twice.

## 1. What Vantremont is

- **Name:** Vantremont. **Domain:** vantremont.com. Always written "Vantremont" (one word, capital V only).
- **What it does:** a professional services firm in the mold of Grant Thornton (grantthornton.com): **advisory, audit and assurance, and tax**, for clients in the United States and internationally. Helping companies reach certification and compliance is a core part of the advisory work.
- **Network model:** Vantremont lists **registered member firms** (independent firms in its network). Some members are accredited certification bodies and audit firms. Silver Fox (cybersecurity, Texas, with a related operation in Pakistan) is one member. A second member will be named later; leave a clearly marked slot for it.
- **Reference site:** https://www.grantthornton.com for structure and depth only. **Do not copy** its design, copy, purple color, images, layout signatures or wording. Vantremont must look like its own company.
- **Owner's quality bar:** more professional and more beautiful than the Silver Fox site (`C:\Users\Silver Fox\Projects\silver-fox-us`), and it must not look AI-generated or templated. It should feel built in 2026.

## 2. Hard rules (non-negotiable)

1. **No em dashes, en dashes, ellipsis characters or curly quotes** anywhere in copy, code comments or docs.
2. **No AI phrasing:** no "leverage, seamless, robust, delve, elevate, empower, unlock, cutting-edge, holistic, landscape, tailored, journey, comprehensive, in today's, not just X but Y", and avoid the "It's not X. It's Y." rhythm and stacks of three-word fragments. Plain, specific American business English.
3. **American English** spelling throughout (organization, defense, analyze, center).
4. **No gradients.** Flat color only. No purple or violet anywhere. **No green** as a brand color.
5. **None of the obvious AI-site tells:** no glassmorphism cards, no glowing blobs, no gradient text, no emoji icons, no generic bento grids, no "trusted by" logo walls of companies that are not clients, no fake stats, no stock "team high-five" photos.
6. **Never invent facts.** No fake clients, testimonials, case studies, statistics, office locations, awards, accreditations, partner logos or leadership names. The FTC's 2024 rule on fake reviews and testimonials applies. Where real content is missing, build the slot and mark it for the launch checklist.
7. **Copy is written fresh**, never paraphrased from Grant Thornton.

## 3. Legal and credibility guardrails (US)

Get these right in the copy. They are the difference between "professional" and "liability".

- **Audit and attest work** (financial statement audits, SOC reports) can only be performed and signed by a **licensed CPA firm**. Large firms use an "alternative practice structure" (a licensed CPA firm for attest work, a separate company for advisory and tax) and disclose it. Until the owner confirms Vantremont's licensing, describe attest services as delivered **through licensed member firms**, and add a disclosure in the footer and legal pages. Make this a launch checklist item.
- **Certification independence:** under ISO/IEC 17021-1, a certification body must not certify a client that received consulting from a related body. The site must state that advisory and certification for the same client are kept separate within the network.
- **Network disclaimer:** each member firm is a separate legal entity, responsible only for its own work; Vantremont does not provide services on behalf of members or vice versa unless stated. Put this in the footer and a legal page.
- **Tax law roles:** a non-law-firm cannot practice law for clients in most US states. Position the "Tax Attorney" job as a tax advisory role that values a JD or LL.M. (as large accounting firms do), not as providing legal services to clients.
- **Job postings:** must be real roles the owner confirms. Several states (including California, Colorado, New York, Washington and Illinois) require **pay ranges** in postings. Every posting carries a salary range field (placeholder until HR confirms) and an Equal Employment Opportunity statement. Asking whether a candidate is authorized to work in the US and whether they need sponsorship is fine; do not ask age, race, religion or other protected characteristics.
- **Global presence:** show only countries and cities where a member firm really operates. A small real network beats a fake global map.

## 4. Information architecture

Keep it focused; trim Grant Thornton's depth to what matters.

**Main navigation (mega menus on desktop, full-screen menu on mobile):**

- **What we do**
  - **Advisory:** Advisory services (overview), Certification and compliance advisory (core offer: ISO, SOC, CMMC, HIPAA, PCI DSS readiness), Cyber and risk advisory (delivered with Silver Fox), Artificial intelligence (AI governance, ISO/IEC 42001, AI risk), Technology modernization, Transaction advisory (due diligence, including cyber and compliance diligence)
  - **Audit and assurance:** Financial statement audits, Enterprise assurance (SOC 1, SOC 2, SOC 3, internal audit support), Certification audits (through accredited member certification bodies)
  - **Tax:** Federal tax, State and local tax, International tax
  - **Industries:** pick about 8 that fit: Technology, Financial services, Healthcare, Manufacturing, Energy, Government contractors, Private equity, Nonprofit
- **Who we are:** About Vantremont, Leadership (slot, no invented names), Member firms (directory), Join the network, Governance and independence
- **Careers:** overview plus role listings and application (see section 6)
- **Contact:** Request a meeting, Submit an RFP, general contact

**Persistent actions:** "Request a meeting" (primary) and "Contact us". A small region or country selector only if there is more than one real country site.

**Home page, in order (one idea per screen):**
1. Hero: one plain headline naming what Vantremont is and for whom, one primary action.
2. What we do: Advisory, Audit and assurance, Tax, each with its key offers.
3. Certification pathway: how a client goes from gap assessment to certification, and who does what (advisory versus member certification bodies).
4. Member network: map of real member locations plus a few member cards (Silver Fox first), link to the directory.
5. Industries.
6. Careers band: real photography, link to open roles.
7. Closing call to action.

Skip an Insights or blog section at launch unless the owner supplies real articles.

## 5. Member firm directory

- Directory page with filters for country, service and accreditation, plus a search box.
- Each member gets a profile page: overview, services, countries, accreditations held (real ones only), contact, link to their website.
- **Silver Fox** profile: cybersecurity consulting, Texas (and its Pakistan operation if the owner confirms). Website silver-fox-consulting.us. Pull facts from the Silver Fox project's `src/content` files.
- **Second member:** placeholder entry marked `LAUNCH-PLACEHOLDER`.
- "Join the network" page: membership criteria and an application form for firms.
- Structured data (schema.org Organization for Vantremont, each member as an Organization with `memberOf`).

## 6. Careers

- One careers page: why work here (real, modest claims), benefits slot, hiring process steps, and the open roles list with filters (practice, location, level).
- Each role has its own page: summary, responsibilities, qualifications, nice-to-haves, location and work model, salary range field, EEO statement, and the application form.
- **Starter roles** (owner asked for 4 to 5 in audit, tax and law, plus 3 to 4 in cybersecurity). Every role is a placeholder until HR confirms it is real and open:
  - Audit Senior (CPA or CPA-eligible)
  - Audit Manager (CPA)
  - Tax Senior (CPA or EA)
  - Tax Attorney, Tax Advisory (JD required, LL.M. in Taxation preferred; advisory role, see section 3)
  - Risk and Compliance Consultant (ISO 27001, SOC 2, NIST)
  - Penetration Tester
  - GRC and CMMC Consultant
  - Security Operations (SOC) Analyst, Tier 2
  - Cloud Security Consultant
- **Application form:** name, email, phone, city and state, LinkedIn URL (optional), role, resume upload (PDF or DOCX, **4 MB maximum** because Vercel limits request bodies to 4.5 MB), cover note (optional), US work authorization yes or no, sponsorship needed yes or no, privacy consent. Server-side Zod validation, Cloudflare Turnstile, honeypot field. Deliver by email through Resend with the resume attached, to a careers inbox from an environment variable. Raise `serverActions.bodySizeLimit` in `next.config.ts` to match. Add an applicant privacy section to the privacy policy.

## 7. Brand (proposed, owner approved "propose and create")

Create the logo and design system in the new chat. Starting proposal:

- **Palette: Claret and Ivory** (recommended). Distinct from Silver Fox navy, Grant Thornton purple, and green.
  - Claret `#7A1F2B` (brand), deep claret `#5A1520` (hover and dark bands)
  - Ink `#14110F` (warm near-black text and dark sections)
  - Ivory `#F7F3EC` (page ground), paper white `#FFFFFF` (cards)
  - Stone `#E4DDD1` (lines), slate `#5E6470` (secondary text)
  - Optional brass `#A9875A` for very small details only
  - All flat. Check every text pair for WCAG AA contrast (claret on ivory is roughly 10:1).
  - Fallback options if the owner dislikes claret: Graphite and Saffron (`#23262B` with `#D9A23A`), or Ink and Cobalt (avoid if it looks too close to Silver Fox).
- **Typography:** a display serif with real character for headings (for example Newsreader with optical sizes) and a clean grotesk for body text (for example Hanken Grotesk). Self-host through `next/font`. Do not reuse Silver Fox's Source Serif 4 and Public Sans pairing.
- **Logo idea:** a "V" mark drawn as two converging strokes that read as a summit (vantage plus mont), with a tracked uppercase wordmark. Simple geometry, works at 16 px, one flat color. Provide SVG, favicon, apple icon and share image.
- **Imagery:** real photography of people working, boardrooms, US city skylines and member firm cities (Unsplash free license only, never Unsplash+, downloaded into the repo, credited in `docs/PHOTO_CREDITS.md`). No AI-generated imagery.

## 8. Motion

Reuse what was built for Silver Fox; read those files first:

- `C:\Users\Silver Fox\Projects\silver-fox-us\src\components\motion-primitives\` (AnimatedNumber, Spotlight, ScrollProgress, WordReveal) and `src\components\sections\CapabilityTabs.tsx`, `src\components\compliance\CategoryJumpNav.tsx`
- `C:\Users\Silver Fox\Projects\silver-fox-us\src\components\home\HeroNetwork.tsx` (anime.js 4 pattern: lazy import, `createScope`, pause button, pauses off screen, static under reduced motion)
- Original Motion Primitives sources are in `docs/reference/motion-primitives/` (MIT, credit in file headers).

Rules (from `docs/reference/vercel-web-interface-guidelines.md` and `docs/reference/taste-skill.md`, read both):
- Content is never hidden waiting for JavaScript or scroll. No fade-in-on-scroll reveals.
- Motion only where it carries meaning: hover lift (2 px), photo zoom (1.02 to 1.03), button press, sliding tab indicators, counters on real numbers only, one signature anime.js piece (for example the member network map drawing its connections, with a pause control).
- Animate only `transform` and `opacity` (plus `box-shadow` and `border-color` on hover). Never `transition: all`. Respect `prefers-reduced-motion`.

## 9. Stack and engineering standards

Mirror the Silver Fox project (read its `README.md`, `next.config.ts`, `scripts/`, `.github/`):

- Next.js 16 App Router with Cache Components, TypeScript, Tailwind CSS 4, `motion`, `animejs` 4, `zod`, `resend`, `lucide-react`. Install with exact versions and `--before` a date at least two weeks back.
- **Important:** this Next.js version has breaking changes. Read `node_modules/next/dist/docs/` before writing code (proxy instead of middleware, async params, `ensureStatic`, `next typegen`).
- `create-next-app` refuses a folder with existing files: scaffold into a temporary subfolder and move the files up, keeping this `CLAUDE.md` and `docs/`.
- Fully static pages with `ensureStatic = "navigation"` in the root layout.
- Security headers and CSP in `next.config.ts`, `security.txt`, honeypot plus Turnstile on every form.
- SEO: metadata per page, sitemap, robots (index only on the live domain), JSON-LD, Open Graph image.
- Accessibility: WCAG 2.1 AA, keyboard support, 16 px inputs, 44 px touch targets on phones, skip link, visible focus.
- Quality gates copied from Silver Fox and adapted: `scripts/check-copy.mjs` (scan `src`, `docs` excluding `docs/reference`, and `README.md`) and `scripts/check-launch.mjs` (placeholders, unconfirmed roles and salary ranges, missing secrets; enforce only on the live domain). GitHub Actions CI, Dependabot.
- Verify with Playwright screenshots at 360, 390, 768, 1024 and 1440 px, an overflow check on every route, Lighthouse and axe. Targets: accessibility 100, zero axe violations, mobile performance 90 or higher.
- Deployment: new GitHub repo and Vercel project (owner will provide), push to `main` deploys to production.

## 10. Open items for the owner

- Second member firm: name, country, services, accreditations.
- Licensing: is Vantremont (or a member) a licensed CPA firm for attest work? Who signs audits and SOC reports?
- Countries and offices to show.
- Leadership names and bios (or keep the section hidden).
- Which job roles are real and open, with pay ranges and locations.
- Contact details, careers inbox, RFP inbox.
- Approval of the brand proposal (palette, type, logo).
