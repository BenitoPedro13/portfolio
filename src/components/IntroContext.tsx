"use client";

import * as React from "react";

/**
 * Tiny external store for "has the intro overlay finished?".
 *
 * Sections that animate on mount subscribe to this so their entrance plays
 * *after* the overlay lifts, instead of running invisibly behind it.
 *
 * A store beats context here: the overlay lives at the top of the body while
 * the consumers are scattered across server-rendered sections, so wrapping
 * everything in a client provider would push the whole tree client-side.
 */

let introDone = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

const getSnapshot = () => introDone;
// Must match the client's first render, otherwise React hydrates with "done",
// starts the entrance animations, then immediately re-renders with "not done"
// and strands them mid-flight. The <noscript> rule in globals.css covers the
// JS-disabled case instead.
const getServerSnapshot = () => false;

export function useIntroDone() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
