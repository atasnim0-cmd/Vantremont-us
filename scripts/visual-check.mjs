#!/usr/bin/env node
/**
 * Visual and accessibility check against a running site.
 *
 *   npm run build && npm run start -- -p 3100
 *   node scripts/visual-check.mjs --base http://localhost:3100 [--shots] [--routes /,/careers]
 *
 * For every route in the sitemap (or the --routes list) it:
 *   - checks for horizontal overflow at 360, 390, 768, 1024 and 1440 px
 *   - runs axe (WCAG 2.0, 2.1 and 2.2 A and AA rules) at 390 and 1440 px
 *   - with --shots, saves full-page screenshots to shots/<width>/<route>.png
 * It exits with an error when any route overflows or has an axe violation.
 */
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const base = arg("base", "http://localhost:3100").replace(/\/$/, "");
const shots = args.includes("--shots");
const WIDTHS = (arg("widths", "360,390,768,1024,1440") ?? "").split(",").map(Number);
const AXE_WIDTHS = [390, 1440];

async function routeList() {
  const given = arg("routes");
  if (given) return given.split(",");
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

const routes = await routeList();
const browser = await chromium.launch();
const problems = [];

for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: width < 768 ? 844 : 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      if (doc.scrollWidth <= window.innerWidth) return null;
      const wide = [...document.querySelectorAll("body *")]
        .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
        .slice(0, 3)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(" ").slice(0, 3).join(".")}`);
      return { scrollWidth: doc.scrollWidth, wide };
    });
    if (overflow)
      problems.push(`${route} @${width}px overflows to ${overflow.scrollWidth}px: ${overflow.wide.join(", ")}`);

    if (AXE_WIDTHS.includes(width)) {
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      for (const v of result.violations) {
        problems.push(
          `${route} @${width}px axe ${v.id} (${v.impact}): ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target}`,
        );
      }
    }

    if (shots) {
      const dir = `shots/${width}`;
      mkdirSync(dir, { recursive: true });
      const name = route === "/" ? "home" : route.slice(1).replace(/\//g, "__");
      await page.screenshot({ path: `${dir}/${name}.png`, fullPage: true });
    }
  }
  await context.close();
}
await browser.close();

console.log(`Checked ${routes.length} routes at ${WIDTHS.join(", ")} px.`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log("No overflow and no axe violations.");
