/**
 * Live browser check for the preloader.
 *
 * Verifies what the timing unit test cannot: that the overlay is actually
 * visible on first paint, that its copy is rendered at a readable opacity for
 * a meaningful window (the "blink" regression), and that it fully clears so
 * the page underneath becomes interactive.
 *
 * Sampling runs *inside the page* on requestAnimationFrame via an init
 * script, rather than polling over CDP. Polling from Node misses frames
 * whenever the driver is busy (notably on the first browser launch), which
 * made the readable-window measurement flaky.
 *
 * Usage: BASE_URL=http://localhost:3222 node scripts/verify-preloader.mjs
 *
 * Playwright is intentionally NOT a project dependency: installing it here
 * trips the pre-existing react-day-picker/React 19 peer conflict. Run this
 * from a scratch directory that has playwright installed, e.g.
 *   mkdir -p /tmp/pw && cd /tmp/pw && npm i playwright && npx playwright install chromium
 *   cp <repo>/scripts/verify-preloader.mjs . && BASE_URL=... node verify-preloader.mjs
 */

import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3222";
const MIN_READABLE_MS = 600;
const MAX_CLEAR_MS = 12000;
const READABLE_OPACITY = 0.85;

let failures = 0;
function check(label, ok, detail = "") {
  if (!ok) failures++;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}${detail ? ` — ${detail}` : ""}`);
}

// Runs in the page before any app code. Records one sample per frame.
const RECORDER = () => {
  window.__preloaderSamples = [];
  const tick = () => {
    const el = document.querySelector(".preloader");
    if (el) {
      const cs = getComputedStyle(el);
      const h = el.querySelector("h1");
      window.__preloaderSamples.push({
        t: performance.now(),
        opacity: parseFloat(cs.opacity),
        hidden: cs.visibility === "hidden" || cs.display === "none",
        headingOpacity: h ? parseFloat(getComputedStyle(h).opacity) : 0,
        headingText: h ? h.textContent : "",
      });
    } else if (window.__preloaderSamples.length) {
      // Overlay existed and is now gone; stop recording.
      window.__preloaderGoneAt ??= performance.now();
      return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

async function run(networkLabel, throttle) {
  console.log(`\n── ${networkLabel} ──`);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.addInitScript(RECORDER);
  const page = await context.newPage();

  if (throttle) {
    const client = await context.newCDPSession(page);
    await client.send("Network.enable");
    await client.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: throttle.latency,
      downloadThroughput: throttle.download,
      uploadThroughput: throttle.upload,
    });
  }

  await page.goto(BASE, { waitUntil: "load" });

  const cleared = await page
    .waitForFunction(() => !document.querySelector(".preloader"), null, {
      timeout: MAX_CLEAR_MS,
      polling: 50,
    })
    .then(() => true)
    .catch(() => false);

  const { samples, goneAt } = await page.evaluate(() => ({
    samples: window.__preloaderSamples ?? [],
    goneAt: window.__preloaderGoneAt ?? null,
  }));

  // --- assertions -------------------------------------------------------

  check("overlay rendered at all", samples.length > 0, `${samples.length} frames`);

  const withCopy = samples.find((s) => s.headingText);
  check(
    "overlay copy present",
    Boolean(withCopy),
    withCopy ? JSON.stringify(withCopy.headingText) : "no heading"
  );

  // The regression guard: the copy must sit at a readable opacity, with the
  // overlay still opaque behind it, for a window a human can actually read.
  const readable = samples.filter(
    (s) =>
      !s.hidden &&
      s.opacity > READABLE_OPACITY &&
      s.headingOpacity > READABLE_OPACITY
  );
  const window_ = readable.length
    ? readable[readable.length - 1].t - readable[0].t
    : 0;
  check(
    "copy readable long enough (no blink)",
    window_ >= MIN_READABLE_MS,
    `${Math.round(window_)}ms readable (need >= ${MIN_READABLE_MS}ms)`
  );

  check(
    "overlay cleared",
    cleared,
    cleared
      ? goneAt
        ? `at ${Math.round(goneAt)}ms`
        : "confirmed absent from the DOM"
      : `still present after ${MAX_CLEAR_MS}ms`
  );

  const after = await page.evaluate(() => {
    const hero = document.querySelector("#hero");
    const h1 = hero?.querySelector("h1");
    const cs = h1 ? getComputedStyle(h1) : null;
    return {
      heroVisible: Boolean(h1) && parseFloat(cs.opacity) > 0.9,
      heroOpacity: cs?.opacity ?? null,
      scrollLocked: getComputedStyle(document.body).overflow === "hidden",
    };
  });
  check("hero visible after intro", after.heroVisible, `h1 opacity ${after.heroOpacity}`);
  check("scroll unlocked", !after.scrollLocked);

  await browser.close();
}

await run("fast (no throttle)", null);
await run("slow 3G", {
  latency: 400,
  download: (400 * 1024) / 8,
  upload: (400 * 1024) / 8,
});

console.log(
  failures === 0 ? "\nPRELOADER OK" : `\nPRELOADER FAILED — ${failures} check(s)`
);
process.exit(failures === 0 ? 0 : 1);
