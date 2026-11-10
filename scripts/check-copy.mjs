#!/usr/bin/env node
/**
 * Copy style check.
 *
 * Fails if site copy contains punctuation or phrasing that reads as
 * machine-written or off-brand. Runs in CI and before every build.
 *
 *   npm run check:copy
 *
 * Scans everything under src, the docs folder (except docs/reference, which holds
 * third-party material kept verbatim) and the README.
 * Code comments are scanned too, on purpose: comments end up quoted in
 * reviews and pull requests, and the rule is simple to follow everywhere.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const DIRS = ["src", "docs"];
const FILES = ["README.md"];
const EXT = /\.(tsx?|mdx?|json|css|mjs)$/;
/** Third-party reference material kept verbatim, and generated map geometry. */
const SKIP = [join("docs", "reference"), join("src", "content", "us-map.ts")];

/** Characters that should never appear in copy. */
const BANNED_CHARS = [
  { re: /\u2014/g, why: "em dash (use a comma, period, colon or parentheses)" },
  { re: /\u2013/g, why: "en dash (write 'to' for ranges, or use a hyphen)" },
  { re: /\u2026/g, why: "ellipsis character" },
  { re: /[\u201C\u201D\u2018\u2019]/g, why: "curly quote (use straight quotes in source)" },
];

/** Words and phrases that read as generic marketing or machine-written. */
const BANNED_PHRASES = [
  "leverage",
  "leveraging",
  "seamless",
  "seamlessly",
  "robust",
  "delve",
  "elevate",
  "empower",
  "empowering",
  "unlock",
  "unleash",
  "cutting-edge",
  "cutting edge",
  "state-of-the-art",
  "best-in-class",
  "world-class",
  "game-changer",
  "game changing",
  "holistic",
  "synergy",
  "synergies",
  "ever-evolving",
  "ever-changing",
  "landscape",
  "navigate the",
  "navigating the",
  "tailored",
  "bespoke",
  "journey",
  "peace of mind",
  "in today's",
  "rest assured",
  "look no further",
  "at the end of the day",
  "it's not just",
  "not just",
  "more than just",
  "whether you're",
  "harness",
  "foster",
  "paramount",
  "pivotal",
  "realm",
  "tapestry",
  "testament",
  "underscore",
  "meticulous",
  "embark",
  "comprehensive",
  "cybersecurity solutions",
  "next-generation",
  "next-gen",
  "revolutionize",
  "supercharge",
  "turnkey",
  "one-stop",
  "dive into",
  "deep dive",
  "fast-paced",
  "digital age",
  "stay ahead of the curve",
  "trusted partner",
  "unparalleled",
  "dynamic world",
  "thought leadership",
  "unlocking",
  "elevating",
  "empowers",
  "leverages",
  "tailor-made",
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (SKIP.some((skip) => relative(ROOT, p) === skip)) continue;
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (EXT.test(name)) out.push(p);
  }
  return out;
}

const phraseRes = BANNED_PHRASES.map((ph) => ({
  ph,
  re: new RegExp(`(^|[^a-z])${ph.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s+")}(?![a-z])`, "gi"),
}));

let problems = 0;
const groups = [...DIRS.map((d) => () => walk(join(ROOT, d))), () => FILES.map((f) => join(ROOT, f))];
for (const list of groups) {
  let files;
  try {
    files = list();
  } catch {
    continue;
  }
  for (const file of files) {
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const { re, why } of BANNED_CHARS) {
        re.lastIndex = 0;
        if (re.test(line)) {
          problems++;
          console.log(`${relative(ROOT, file)}:${i + 1}  ${why}`);
        }
      }
      for (const { ph, re } of phraseRes) {
        re.lastIndex = 0;
        if (re.test(line)) {
          problems++;
          console.log(`${relative(ROOT, file)}:${i + 1}  banned phrase "${ph}"`);
        }
      }
    });
  }
}

if (problems > 0) {
  console.error(`\nCopy check failed: ${problems} problem(s). See scripts/check-copy.mjs for the rules.`);
  process.exit(1);
}
console.log("Copy check passed.");
