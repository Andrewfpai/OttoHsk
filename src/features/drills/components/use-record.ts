"use client";

import { createContext, createElement, useContext } from "react";
import { toast } from "sonner";

import type { DrillKind } from "@/db/schema";

import { recordAttempt, recordAttempts } from "../server/actions";

type Record = (kind: DrillKind, itemId: string, correct: boolean) => void;
type RecordMany = (kind: DrillKind, results: { itemId: string; correct: boolean }[]) => void;

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

/** The same, for a whole paper at once. */
const saveMany: RecordMany = (kind, results) => {
  void recordAttempts({ kind, results })
    .then((res) => {
      if (!res.ok) toast.error(res.error);
    })
    .catch(() => toast.error("Could not save your answers. Check your connection."));
};

const RecordContext = createContext<Record>(save);
const RecordManyContext = createContext<RecordMany>(saveMany);

export function useRecord(): Record {
  return useContext(RecordContext);
}

export function useRecordMany(): RecordMany {
  return useContext(RecordManyContext);
}

/** Turns saving off, for the dev previews, which have no database or login. */
export function NoRecording({ children }: { children: React.ReactNode }) {
  return createElement(
    RecordContext.Provider,
    { value: () => {} },
    createElement(RecordManyContext.Provider, { value: () => {} }, children),
  );
}
