"use client";

import * as React from "react";
import { markIntroDone } from "./IntroContext";

/**
 * Full-screen intro overlay.
 *
 * It is rendered on the server so it paints on the very first frame, which
 * covers the window where framer-motion's `initial` styles keep the page
 * invisible and web fonts have not swapped in yet.
 *
 * Timing is anchored to **first paint**, not to navigation start. The copy
 * fades in with CSS starting at paint, so anchoring to navigation meant a
 * moderately slow load could satisfy the "minimum" before the text had even
 * finished appearing, producing the blink. See scripts/test-preloader-timing.mjs.
 *
 * Exit rules:
 *  - the copy is always fully faded in, then held READ_MS so it is readable
 *  - never longer than MAX_HOLD_MS, so a slow chunk can't trap the user
 *  - an already-slow load gets zero added delay
 *  - a CSS failsafe clears the overlay even if JS never executes
 */

/** Longest CSS fade-in delay (0.36s) plus its duration (0.7s). */
const COPY_SETTLE_MS = 1060;
/** Dwell time after the copy has fully settled. */
const READ_MS = 700;
const MAX_HOLD_MS = 4000;
const FADE_MS = 700;

/** How long to keep the overlay up, given when it painted and hydrated. */
function computeHold(paintAt: number, hydratedAt: number) {
  const target = paintAt + COPY_SETTLE_MS + READ_MS;
  return Math.min(Math.max(target - hydratedAt, 0), MAX_HOLD_MS);
}

export default function Preloader() {
  const [phase, setPhase] = React.useState<"visible" | "exiting" | "done">(
    "visible"
  );
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      setCount(100);
      setPhase("done");
      markIntroDone();
      return;
    }

    let raf = 0;
    let exitTimer = 0;
    let doneTimer = 0;
    let cancelled = false;

    // Anchor to when the overlay actually became visible. The Paint Timing
    // API gives us the real number; fall back to hydration time if the
    // browser hasn't recorded a paint entry yet.
    const paintEntry = performance
      .getEntriesByType("paint")
      .find((e) => e.name === "first-contentful-paint");
    const hydratedAt = performance.now();
    const paintAt = paintEntry ? paintEntry.startTime : hydratedAt;

    const hold = computeHold(paintAt, hydratedAt);
    const start = performance.now();
    const total = Math.max(hold, 1);

    const tick = () => {
      if (cancelled) return;
      const t = Math.min((performance.now() - start) / total, 1);
      // easeOutCubic so the counter decelerates into 100 instead of snapping
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    exitTimer = window.setTimeout(() => {
      setCount(100);
      setPhase("exiting");
      // Hand off to the page one beat into the fade so the hero entrance is
      // already underway as the overlay clears, rather than after it.
      markIntroDone();
      doneTimer = window.setTimeout(() => setPhase("done"), FADE_MS);
    }, hold);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Lock scroll while the overlay covers the page.
  React.useEffect(() => {
    if (phase === "done") return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      data-state={phase}
      className="preloader fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-[#050505] px-6"
    >
      {/* soft orange bloom behind the mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[42rem] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_#F9731626_0%,_transparent_65%)]"
      />

      <div className="relative flex flex-col items-center text-center">
        <span className="preloader-line text-[10px] uppercase tracking-[0.42em] text-[#FB923C]">
          Benito Pedro Xavier
        </span>

        <h1 className="preloader-line preloader-line-2 mt-5 max-w-xl text-balance bg-gradient-to-br from-white to-white/45 bg-clip-text text-2xl font-medium leading-tight tracking-tight text-transparent sm:text-4xl">
          Full stack, concept to cloud
        </h1>

        <p className="preloader-line preloader-line-3 mt-4 max-w-sm text-sm leading-relaxed text-white/40">
          Interfaces, APIs, and the infrastructure underneath them.
        </p>
      </div>

      <div className="preloader-line preloader-line-4 relative flex w-full max-w-sm flex-col gap-3">
        <div className="h-px w-full overflow-hidden bg-white/[0.08]">
          <div
            className="h-full bg-gradient-to-r from-[#F97316] to-[#FB923C] shadow-[0_0_10px_#F97316] transition-[width] duration-150 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/30">
          <span>Loading experience</span>
          <span className="tabular-nums text-white/55">
            {String(count).padStart(3, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
