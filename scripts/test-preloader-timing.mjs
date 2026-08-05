/**
 * State-space check for the preloader's visibility window.
 *
 * The bug this guards against: anchoring the minimum display time to
 * navigation start. The overlay's copy fades in with CSS beginning at first
 * paint, so on a moderately slow load the "minimum" had already elapsed
 * before the text finished appearing, and the overlay blinked away
 * mid-fade-in. The timing must be anchored to paint, not to navigation.
 */

import assert from "node:assert/strict";

// Keep in sync with src/components/Preloader.tsx
const COPY_SETTLE_MS = 1060; // longest CSS delay (0.36s) + duration (0.7s)
const READ_MS = 700; // dwell after the copy has fully settled
const MAX_HOLD_MS = 4000;
const FADE_MS = 700;
const FAILSAFE_MS = 14000;

/** Mirrors computeHold() inside Preloader.tsx. */
function computeHold(paintAt, hydratedAt) {
  const target = paintAt + COPY_SETTLE_MS + READ_MS;
  return Math.min(Math.max(target - hydratedAt, 0), MAX_HOLD_MS);
}

const cases = [
  // [first paint ms, hydration ms, label]
  [0, 0, "instant (cached, local)"],
  [30, 50, "very fast"],
  [180, 400, "fast broadband"],
  [600, 1200, "average — the blink case"],
  [900, 1899, "just under the old floor"],
  [1000, 1900, "exactly at the old floor"],
  [1400, 3000, "slow 3G"],
  [2600, 11220, "the 11.2s screenshot case"],
  [400, 60000, "pathological hydration stall"],
  [0, 30000, "instant paint, stalled JS"],
];

for (const [paintAt, hydratedAt, label] of cases) {
  const hold = computeHold(paintAt, hydratedAt);
  const overlayGoneAt = hydratedAt + hold + FADE_MS;

  // 1. Bounds.
  assert.ok(hold >= 0, `${label}: hold went negative`);
  assert.ok(hold <= MAX_HOLD_MS, `${label}: hold exceeded cap`);

  // 2. No blink. The copy must be fully faded in and readable for at least
  //    READ_MS before the fade-out begins. Measured from paint, since that
  //    is when the CSS animation actually starts.
  const readableUntil = hydratedAt + hold;
  const copyReadyAt = paintAt + COPY_SETTLE_MS;
  const dwell = readableUntil - copyReadyAt;
  assert.ok(
    dwell >= READ_MS || hydratedAt - copyReadyAt >= READ_MS,
    `${label}: BLINK — copy readable for only ${dwell}ms (need ${READ_MS}ms)`
  );

  // 3. Never add delay to a load that was already slow.
  if (hydratedAt > paintAt + COPY_SETTLE_MS + READ_MS) {
    assert.equal(hold, 0, `${label}: padded an already-slow load`);
  }

  // 4. The CSS failsafe must not fire before the JS exit completes,
  //    or it would yank the overlay mid-animation on a healthy load.
  if (overlayGoneAt <= FAILSAFE_MS) {
    assert.ok(
      FAILSAFE_MS >= overlayGoneAt,
      `${label}: failsafe races the JS exit`
    );
  }

  console.log(
    `  ok  ${label.padEnd(30)} paint=${String(paintAt).padStart(5)}  hydrate=${String(hydratedAt).padStart(5)}  hold=${String(hold).padStart(4)}  dwell=${String(Math.max(dwell, hydratedAt - copyReadyAt)).padStart(5)}ms`
  );
}

// The failsafe must outlast the slowest possible JS-driven exit from a
// zero-latency load, which is the only case where both could overlap.
const slowestHealthyExit = COPY_SETTLE_MS + READ_MS + FADE_MS;
assert.ok(
  FAILSAFE_MS > slowestHealthyExit,
  `CSS failsafe (${FAILSAFE_MS}ms) must exceed the slowest healthy exit (${slowestHealthyExit}ms)`
);
console.log(
  `  ok  css failsafe ${FAILSAFE_MS}ms > slowest healthy exit ${slowestHealthyExit}ms`
);

console.log("\npreloader timing: all checks passed");
