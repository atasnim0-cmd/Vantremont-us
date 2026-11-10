#!/usr/bin/env node
/**
 * Pre-launch gate.
 *
 * Runs before every build. It only enforces on Vercel production deployments served
 * on the live domain (vantremont.com) with SITE_LAUNCHED=true. Local builds, previews,
 * the vercel.app address and the soft launch (domain attached, SITE_LAUNCHED not set)
 * keep working while placeholders are still in place. Run it manually with:
 *
 *   npm run check:launch
 *
 * It fails when:
 *   - any file under src carries an inline LAUNCH-PLACEHOLDER or LAUNCH-CONFIRM marker
 *     (company details, member accreditations, unconfirmed job roles, salary ranges,
 *     licensing statements, leadership)
 *   - fictional 555-01xx phone numbers remain
 *   - an environment variable needed by the forms is missing
 *   - public/.well-known/security.txt has expired or expires within 30 days
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const force = process.argv.includes("--force");
const LIVE_DOMAIN = "vantremont.com";
const onLiveDomain = (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "").replace(/^www\./, "") === LIVE_DOMAIN;
const launched = process.env.SITE_LAUNCHED === "true";
const enforce = force || (process.env.VERCEL_ENV === "production" && onLiveDomain && launched);

if (!enforce) {
  console.log(
    "Launch check skipped (not a launched production build: needs vantremont.com and SITE_LAUNCHED=true). Run `npm run check:launch` to check manually.",
  );
  process.exit(0);
}

const problems = [];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(tsx?|mdx?)$/.test(name)) out.push(p);
  }
  return out;
}

// Inline markers only: a marker right after a comment opener. Explanations in file
// headers mention the marker names without a comment opener directly before them.
const MARKER = /(\/\/|\/\*|\{\/\*)\s*LAUNCH-(PLACEHOLDER|CONFIRM)\b(.*)/;
for (const file of walk("src")) {
  readFileSync(file, "utf8")
    .split(/\r?\n/)
    .forEach((line, i) => {
      const m = line.match(MARKER);
      const where = `${relative(process.cwd(), file)}:${i + 1}`;
      if (m) {
        const kind = m[2] === "PLACEHOLDER" ? "placeholder" : "needs confirmation";
        const note = m[3]
          .replace(/\*\/|\}/g, "")
          .replace(/^[:\s]+/, "")
          .trim();
        problems.push(`${where} ${kind}${note ? `: ${note}` : ""}`);
      }
      if (/555-01\d\d|55501\d\d/.test(line)) problems.push(`${where} fictional 555 phone number`);
    });
}

const requiredEnv = [
  "RESEND_API_KEY",
  "FORMS_FROM_EMAIL",
  "CONTACT_TO_EMAIL",
  "RFP_TO_EMAIL",
  "CAREERS_TO_EMAIL",
  "NETWORK_TO_EMAIL",
  "TURNSTILE_SECRET_KEY",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
];
for (const key of requiredEnv) {
  if (!process.env[key]) problems.push(`missing environment variable ${key}`);
}

const sec = readFileSync("public/.well-known/security.txt", "utf8");
const expires = sec.match(/^Expires:\s*(.+)$/m)?.[1];
if (!expires) {
  problems.push("security.txt has no Expires field");
} else {
  const days = (new Date(expires).getTime() - Date.now()) / 86_400_000;
  if (Number.isNaN(days) || days < 30) problems.push(`security.txt Expires (${expires}) is past or within 30 days`);
}

if (problems.length > 0) {
  console.error(`Launch check failed with ${problems.length} item(s). Fix these before deploying to production:\n`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error("\nSee docs/LAUNCH_CHECKLIST.md.");
  process.exit(1);
}
console.log("Launch check passed.");
