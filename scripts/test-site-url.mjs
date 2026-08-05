/**
 * State-space test for the site URL resolver.
 * Runs the resolver under every meaningful env permutation in a child process,
 * since the module caches its result at import time.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const RESOLVER = new URL("./site-url-probe.mjs", import.meta.url).pathname;

const ENV_KEYS = [
  "NEXT_PUBLIC_SITE_URL",
  "SITE_URL",
  "VERCEL_ENV",
  "VERCEL_PROJECT_PRODUCTION_URL",
  "VERCEL_URL",
  "PORT",
];

function run(env) {
  const clean = { ...process.env };
  for (const key of ENV_KEYS) delete clean[key];
  const out = execFileSync(process.execPath, ["--no-warnings", RESOLVER], {
    env: { ...clean, ...env },
    encoding: "utf8",
  });
  return JSON.parse(out);
}

const cases = [
  {
    name: "no env at all -> localhost:3000",
    env: {},
    expect: { siteUrl: "http://localhost:3000", siteHost: "localhost:3000" },
  },
  {
    name: "PORT respected locally",
    env: { PORT: "3111" },
    expect: { siteUrl: "http://localhost:3111" },
  },
  {
    name: "explicit override with protocol wins over everything",
    env: {
      NEXT_PUBLIC_SITE_URL: "https://benitopedro.dev",
      VERCEL_ENV: "production",
      VERCEL_PROJECT_PRODUCTION_URL: "other.vercel.app",
      VERCEL_URL: "dep.vercel.app",
    },
    expect: { siteUrl: "https://benitopedro.dev", siteHost: "benitopedro.dev" },
  },
  {
    name: "explicit override without protocol gets https://",
    env: { NEXT_PUBLIC_SITE_URL: "benitopedro.dev" },
    expect: { siteUrl: "https://benitopedro.dev" },
  },
  {
    name: "explicit override strips trailing slash",
    env: { NEXT_PUBLIC_SITE_URL: "https://benitopedro.dev/" },
    expect: { siteUrl: "https://benitopedro.dev" },
  },
  {
    name: "explicit override tolerates whitespace",
    env: { NEXT_PUBLIC_SITE_URL: "  https://benitopedro.dev  " },
    expect: { siteUrl: "https://benitopedro.dev" },
  },
  {
    name: "empty override falls through, does not win",
    env: { NEXT_PUBLIC_SITE_URL: "", VERCEL_URL: "dep.vercel.app" },
    expect: { siteUrl: "https://dep.vercel.app" },
  },
  {
    name: "SITE_URL works as a non-public alias",
    env: { SITE_URL: "https://alias.dev" },
    expect: { siteUrl: "https://alias.dev" },
  },
  {
    name: "vercel production uses the production domain, not the deployment URL",
    env: {
      VERCEL_ENV: "production",
      VERCEL_PROJECT_PRODUCTION_URL: "benitopedro.dev",
      VERCEL_URL: "portfolio-abc123.vercel.app",
    },
    expect: { siteUrl: "https://benitopedro.dev" },
  },
  {
    name: "vercel preview uses the per-deployment URL",
    env: {
      VERCEL_ENV: "preview",
      VERCEL_PROJECT_PRODUCTION_URL: "benitopedro.dev",
      VERCEL_URL: "portfolio-git-feat-abc.vercel.app",
    },
    expect: { siteUrl: "https://portfolio-git-feat-abc.vercel.app" },
  },
  {
    name: "local next build with only the production host set still gets it",
    env: { VERCEL_PROJECT_PRODUCTION_URL: "benitopedro.dev" },
    expect: { siteUrl: "https://benitopedro.dev" },
  },
  {
    name: "NEXT_PUBLIC_ vercel mirrors work client side",
    env: {
      NEXT_PUBLIC_VERCEL_ENV: "production",
      NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: "benitopedro.dev",
    },
    expect: { siteUrl: "https://benitopedro.dev" },
  },
  {
    name: "absoluteUrl joins paths correctly",
    env: { NEXT_PUBLIC_SITE_URL: "https://benitopedro.dev" },
    expect: {
      absoluteRoot: "https://benitopedro.dev/",
      absoluteProject: "https://benitopedro.dev/projects/markado",
    },
  },
  {
    name: "metadataBase never throws on the resolved URL",
    env: {},
    expect: { urlParses: true },
  },
];

let failures = 0;
for (const testCase of cases) {
  const actual = run(testCase.env);
  const bad = Object.entries(testCase.expect).filter(
    ([key, want]) => actual[key] !== want
  );
  if (bad.length) {
    failures++;
    console.log(`FAIL  ${testCase.name}`);
    for (const [key, want] of bad) {
      console.log(`        ${key}: want ${JSON.stringify(want)}, got ${JSON.stringify(actual[key])}`);
    }
  } else {
    console.log(`ok    ${testCase.name}`);
  }
}

// Regression guard: the domain must never be hardcoded outside the resolver,
// otherwise a Vercel deploy would silently advertise the wrong host.
const SRC = new URL("../src", import.meta.url).pathname;
const RESOLVER_SRC = `${SRC}/lib/site-url.ts`;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

// Any literal mention of the personal domain or a *.vercel.app host outside the
// resolver means the value is no longer driven by the environment.
const HARDCODED = /benitopedro\.dev|[a-z0-9-]+\.vercel\.app/i;

const offenders = walk(SRC).filter(
  (file) =>
    file !== RESOLVER_SRC && HARDCODED.test(readFileSync(file, "utf8"))
);

if (offenders.length) {
  failures++;
  console.log("FAIL  no hardcoded site domain in src/");
  for (const file of offenders) {
    console.log(`        ${file.replace(SRC, "src")}`);
  }
} else {
  console.log("ok    no hardcoded site domain in src/");
}

const total = cases.length + 1;
console.log(
  failures === 0
    ? `\nAll ${total} site-url cases pass`
    : `\n${failures}/${total} FAILED`
);
process.exit(failures === 0 ? 0 : 1);
