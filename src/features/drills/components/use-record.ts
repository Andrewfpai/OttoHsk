"use client";

import { createContext, createElement, useContext } from "react";
import { toast } from "sonner";

import type { DrillKind } from "@/db/schema";

import { recordAttempt } from "../server/actions";

type Record = (kind: DrillKind, itemId: string, correct: boolean) => void;

/**
 * Saves a drill answer in the background. The drill never waits on it: the
 * feedback is already on screen, and a lost save only costs one stat.
 */
const save: Record = (kind, itemId, correct) => {
  void recordAttempt({ kind, itemId, correct })
    .then((res) => {
      if (!res.ok) toast.error(res.error);
    })
    .catch(() => toast.error("Could not save that answer. Check your connection."));
};

const RecordContext = createContext<Record>(save);

export function useRecord(): Record {
  return useContext(RecordContext);
}

/** Turns saving off, for the dev previews, which have no database or login. */
export function NoRecording({ children }: { children: React.ReactNode }) {
  return createElement(RecordContext.Provider, { value: () => {} }, children);
}
