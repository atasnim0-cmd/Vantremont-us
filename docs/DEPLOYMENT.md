# Deployment

The site deploys to Vercel from GitHub. Pushes to `main` go to production; every pull request gets a preview URL.

## 1. GitHub

1. Create an empty private repository (the owner will provide it).
2. Push this project:

   ```bash
   git remote add origin https://github.com/<owner>/<repo>.git
   git push -u origin main
   ```

3. In the repository settings, protect `main`: require the CI check to pass before merging.

## 2. Vercel

1. In Vercel, choose **Add New, Project**, import the repository and keep the detected Next.js settings.
2. Under **Settings, Environment Variables**, add every variable from `.env.example` for Production and Preview. See the table in the README.
3. Under **Settings, Node.js Version**, choose 24.
4. Deploy. Until the domain is attached, production runs on a `vercel.app` address. That address is kept out of search engines, the launch check is not enforced, and forms log submissions instead of emailing them if email is not configured.

## 3. Domain

1. In Vercel, **Settings, Domains**, add `vantremont.com` and `www.vantremont.com`. Make the apex the primary domain and redirect `www` to it.
2. At the DNS provider, create the records Vercel shows (an A record for the apex and a CNAME for `www`).
3. Once the domain is attached, Vercel sets `VERCEL_PROJECT_PRODUCTION_URL` to it. That alone is a **soft launch**: the domain serves the site, but it stays out of search engines, forms log submissions if email is not configured, and the launch check is not enforced.
4. **Full launch:** when every item in the launch checklist is done, add `SITE_LAUNCHED=true` under **Settings, Environment Variables** (Production only) and redeploy. From then on:
   - `npm run check:launch` is enforced on every production build, so placeholders block the deploy;
   - the site is open to search engines;
   - forms fail visibly if email is not configured.

### DNS on Cloudflare

Create the records Vercel shows under **Settings, Domains** and set each one to **DNS only** (grey cloud). Vercel issues and renews the TLS certificate itself, and the Cloudflare proxy would get in the way. If the zone uses Cloudflare's SSL/TLS settings, keep them at **Full (strict)** in case a record is ever proxied.

## 4. Email (Resend)

1. In Resend, add `vantremont.com` as a domain and publish the SPF and DKIM records it gives you.
2. Publish a DMARC record, starting with `v=DMARC1; p=none; rua=mailto:<reports address>` and tightening to `quarantine` once reports are clean.
3. Create an API key with sending access only and set it as `RESEND_API_KEY`.
4. Set `FORMS_FROM_EMAIL` to an address on the verified domain, for example `Vantremont Website <website@vantremont.com>`.
5. Create the inboxes or aliases for `CONTACT_TO_EMAIL`, `RFP_TO_EMAIL`, `CAREERS_TO_EMAIL` and `NETWORK_TO_EMAIL`.

## 5. Cloudflare Turnstile

1. In Cloudflare, create a Turnstile widget in **Managed** mode.
2. Add `vantremont.com` (and the Vercel preview domain if you want the widget on previews) to its hostnames.
3. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in Vercel.

## 6. After the first production deploy

Work through [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md), section 7.
