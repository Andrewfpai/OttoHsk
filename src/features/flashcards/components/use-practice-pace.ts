"use client";

import { useSyncExternalStore } from "react";

import { DEFAULT_PACE_MS, clampPace } from "../lib/practice-pace";

/**
 * Practice seconds per card, kept in this browser only: it is a pace
 * preference, not study progress. Every storage access can throw (private
 * mode, blocked storage), and then the default applies.
 */
const KEY = "ottohsk.practice-pace-ms";
const listeners = new Set<() => void>();

function read(): number {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw === null ? DEFAULT_PACE_MS : clampPace(Number(raw));
  } catch {
    return DEFAULT_PACE_MS;
  }
}

export function savePace(ms: number) {
  try {
    window.localStorage.setItem(KEY, String(clampPace(ms)));
  } catch {
    // Not saved; the default applies next time.
  }
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function usePracticePace(): number {
  return useSyncExternalStore(subscribe, read, () => DEFAULT_PACE_MS);
}
