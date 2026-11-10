# Launch checklist

Work through this list before the domain points at production. Items marked **(blocks deploy)** are enforced by `npm run check:launch`, which runs before every build and starts blocking production deploys as soon as vantremont.com is attached to the Vercel project. Run `npm run check:launch` at any time to see every open item with its file and line.

The check looks for inline `LAUNCH-PLACEHOLDER` (a stand-in value) and `LAUNCH-CONFIRM` (a statement the owner must confirm) markers anywhere under `src`. Remove a marker only once the value is real or the statement is confirmed. If a statement is not true, change or delete it instead.

## 1. Licensing and independence (blocks deploy)

These decide how the site describes audit and certification work. Get them right first.

- [ ] **Is Vantremont, or a named member, a licensed CPA firm?** Who signs audit opinions and SOC reports? Set `licensing.vantremontIsCpaFirm` in `src/content/site.ts`. While it is `false`, the site says attest work is performed by licensed CPA member firms, and the footer and Legal page carry the disclosure. Large firms that split attest and advisory into separate entities (an alternative practice structure) disclose it the same way.
- [ ] Confirm the engagement types offered through CPA member firms (audits, reviews, compilations, nonprofit and Single Audits, agreed-upon procedures, SOC 1, 2 and 3) in `src/content/services.ts`. Single Audits need a firm that meets Government Auditing Standards and peer review requirements.
- [ ] Confirm which member firms are accredited certification bodies, by which accreditation body and for which standards. Add them to `src/content/members.ts` with a verification link.
- [ ] Confirm the independence rule stated across the site: advisory and certification for the same client and the same management system are kept separate within the network (ISO/IEC 17021-1).
- [ ] Confirm the governance commitments in `src/app/governance-and-independence/page.tsx` (annual member reviews, conflict checks, the concern process).
- [ ] Confirm the membership criteria and admission steps in `src/app/join-the-network/page.tsx`.

## 2. Company details (blocks deploy)

All in `src/content/site.ts`.

- [ ] Legal entity name (for example "Vantremont LLC"). It appears in the footer, Terms and structured data.
- [ ] Headquarters city and state, or leave hidden.
- [ ] Phone number, or leave hidden.
- [ ] Business hours.
- [ ] Mailboxes exist for contact@, rfp@, careers@, network@, privacy@ and security@ vantremont.com.
- [ ] LinkedIn URL (optional; leave empty to hide).

## 3. Member firms (blocks deploy)

In `src/content/members.ts`.

- [ ] **Ten cybersecurity members** (Praetorian, Raxis, Black Hills Information Security, TrustedSec, Bishop Fox, Expel, NetSPI, Coalfire, GuidePoint Security, Optiv): profiles were written from each firm's own website in November 2026. Each firm should check its profile, legal name and headquarters city, and add a contact email if it wants one shown.
- [ ] **Accreditations:** TrustedSec (CREST, penetration testing) and Coalfire (FedRAMP 3PAO, PCI QSA company) to confirm their status is current. Both are marked `LAUNCH-CONFIRM`.
- [ ] **Search-only directory:** the directory lists no firms until a visitor searches, the map names states but not firms, and member profiles are kept out of search engines and the sitemap. The member data still ships in the page code so the search works without a server, so a technical visitor could read the list from the page source.
- [ ] **Silver Fox:** confirm the profile text, and whether to list the related operation in Pakistan (and its city). It is stored but hidden until confirmed.
- [ ] Each member approves its own profile in writing before launch.
- [ ] Only list countries and cities where a member really operates. The map shades only confirmed US states.

## 4. Leadership (blocks deploy)

- [ ] Add leadership profiles to `src/content/leadership.ts` with each person's written approval, or remove Leadership from the navigation (`src/content/navigation.ts`), the footer and the About page. While the list is empty, the page shows a short notice and is kept out of search.

## 5. Careers (blocks deploy)

In `src/content/roles.ts` and `src/app/careers/page.tsx`.

- [ ] For each of the nine starter roles: confirm it is real and open, set location and work model, and set the pay range (`pay: { min, max }`). Delete roles that are not open. Several states (including California, Colorado, Illinois, New York and Washington) require a good-faith pay range in postings.
- [ ] Confirm which company employs the cybersecurity roles (Vantremont or Silver Fox) and adjust the role text.
- [ ] Benefits: replace the placeholder on the careers page with the confirmed package.
- [ ] Confirm the hiring steps and the commitments on the careers page and home page (pay ranges in every posting, a reply to every applicant).
- [ ] Have counsel review the Tax Attorney posting. It is written as a tax advisory role, not as providing legal services to clients.
- [ ] Set `CAREERS_TO_EMAIL` to an inbox only the recruiting team can read. Resumes arrive as attachments.

## 6. Other statements to confirm (blocks deploy)

- [ ] Inquiry reply time ("usually within two business days") in `src/components/forms/InquiryForm.tsx`.
- [ ] First meetings carry no fee, and proposals include scope, team, timeline and fee (`src/app/contact/request-a-meeting/page.tsx`).
- [ ] Applicant data retention period in the privacy policy.
- [ ] Governing law (Texas is the current draft) in the Terms.

## 7. Legal review

- [ ] Counsel reviews `/legal`, `/privacy` (including the applicant section), `/terms` and `/accessibility`. They describe how the site actually works (Vercel hosting and analytics without cookies, Cloudflare Turnstile, Resend), but they are not legal advice.
- [ ] Update `legalLastUpdated` in `src/content/site.ts` whenever those pages change.
- [ ] No testimonials, client names, case studies or statistics are published unless they are real and the client agreed in writing. The FTC's 2024 rule on fake reviews and testimonials allows civil penalties.

## 8. Environment variables in Vercel (blocks deploy)

For Production and Preview: `RESEND_API_KEY`, `FORMS_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `RFP_TO_EMAIL`, `CAREERS_TO_EMAIL`, `NETWORK_TO_EMAIL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`. See [DEPLOYMENT.md](DEPLOYMENT.md).

## 9. Brand

- [ ] Owner approves the palette, type and logo (see [BRAND.md](BRAND.md)).
- [ ] Replace stock photography with real photography of the team and member firms when available (see [PHOTO_CREDITS.md](PHOTO_CREDITS.md)).

## 10. After the first production deploy

- [ ] Send a test through every form (contact, meeting, RFP with an attachment, membership, job application with a resume) and confirm each email arrives at the right inbox with the right reply-to address and attachment.
- [ ] Check https://securityheaders.com, the MDN HTTP Observatory and SSL Labs.
- [ ] Run Lighthouse on the home page, a service page and a role page on mobile (targets: accessibility 100, performance 90 or higher).
- [ ] Verify the domain in Google Search Console and Bing Webmaster Tools and submit `https://vantremont.com/sitemap.xml`.
- [ ] Turn on Vercel Web Analytics.

## 11. Ongoing

- [ ] `public/.well-known/security.txt` expires on October 31, 2027. Renew it before then.
- [ ] Re-check the accuracy notes at the top of `src/content/services.ts` once a year (framework versions, CMMC rollout, tax law changes).
- [ ] Review Dependabot pull requests weekly.
