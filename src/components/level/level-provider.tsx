"use client";

import { createContext, use, useEffect } from "react";

import type { WordBank } from "@/content/word-types";
import { DEFAULT_LEVEL, type Level } from "@/lib/levels";

/**
 * The learner's HSK level, for client components, and that level's words.
 *
 * Each level's word list is its own chunk, loaded the first time it is
 * needed and kept: HSK 6 alone is twice the size of HSK 5, so nobody
 * downloads a level they do not study.
 */
const LevelContext = createContext<Level>(DEFAULT_LEVEL);

const LOADERS: Record<Level, () => Promise<WordBank>> = {
  5: () => import("@/content/words-hsk5").then((m) => m.bankHsk5),
  6: () => import("@/content/words-hsk6").then((m) => m.bankHsk6),
};

const banks = new Map<Level, Promise<WordBank>>();

/** One promise per level for the whole session, as `use()` requires. */
function loadWordBank(level: Level): Promise<WordBank> {
  let bank = banks.get(level);
  if (!bank) {
    bank = LOADERS[level]();
    banks.set(level, bank);
  }
  return bank;
}

export function LevelProvider({ level, children }: { level: Level; children: React.ReactNode }) {
  // Start loading as soon as the app mounts, before any page asks.
  useEffect(() => {
    void loadWordBank(level);
  }, [level]);
  return <LevelContext value={level}>{children}</LevelContext>;
}

export function useLevel(): Level {
  return use(LevelContext);
}

/** The learner's level's words. Suspends until they have loaded. */
export function useWordBank(): WordBank {
  return use(loadWordBank(useLevel()));
}
