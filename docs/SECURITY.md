# Security notes

## Headers

Every response carries the headers set in `next.config.ts`:

- **Content Security Policy.** Scripts, styles, images, fonts and connections are limited to our own origin, plus `challenges.cloudflare.com` for Turnstile and `va.vercel-scripts.com` for Vercel Web Analytics. Frames are limited to Turnstile. `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` and `frame-ancestors 'none'`.
- **Strict-Transport-Security** for two years, including subdomains.
- **X-Content-Type-Options: nosniff**, **X-Frame-Options: DENY**, **Referrer-Policy: strict-origin-when-cross-origin**, **Cross-Origin-Opener-Policy: same-origin** and a restrictive **Permissions-Policy**.

### Why `'unsafe-inline'` for scripts

Pages are prerendered at build time and served from Vercel's CDN. A nonce-based policy needs a fresh nonce on every request, which means rendering every page per request. That would give up static delivery (and `ensureStatic = "navigation"` would fail the build). Next.js needs inline scripts for its hydration payload, so the policy allows them. The risk is limited because the site has no user-generated content and no third-party scripts beyond the two listed.

If the site ever needs nonces, add a `proxy.ts` that sets a per-request nonce and remove `ensureStatic` from the root layout, accepting per-request rendering.

## Forms

All five forms (contact, meeting, RFP, membership, job application) run through Server Actions:

- Validation happens on the server with Zod. Client-side checks only improve the experience.
- Each form has a honeypot field and a Cloudflare Turnstile check. On the live domain, a missing Turnstile secret fails closed.
- Uploads (resumes and RFP documents) must be PDF or DOCX, at most 4 MB, and their first bytes must match the file type. Attachment names are reduced to safe characters. Files are forwarded by email and never stored on the web server.
- `serverActions.bodySizeLimit` is 4.4 MB, under Vercel's 4.5 MB request limit, so a large upload fails cleanly in the browser check before it reaches the server.
- Server Actions only accept requests whose `Origin` matches the site, which blocks cross-site form posts.

## Reporting

`public/.well-known/security.txt` publishes security@vantremont.com. It expires on October 31, 2027; the launch check fails within 30 days of that date.
