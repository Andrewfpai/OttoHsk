"use client";

import { Star } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { OWN_PREFIX, type OwnWord } from "../lib/own-words";
import { setStar } from "../server/actions";

/** What starring an own word saves: the word as the page showed it. */
export type OwnWordInput = Omit<OwnWord, "id">;

type Stars = {
  starred: ReadonlySet<string>;
  /** Starred own words (in no list), with what they were saved with. */
  own: readonly OwnWord[];
  toggle: (wordId: string, own?: OwnWordInput) => void;
};

const StarsContext = createContext<Stars | null>(null);

/**
 * The learner's starred words for one page. A star shows at once and is
 * saved in the background; if the save fails it is taken back.
 * `offline` skips saving, for the dev previews, which have no database.
 */
export function StarsProvider({
  initial,
  initialOwn = [],
  offline = false,
  children,
}: {
  initial: readonly string[];
  initialOwn?: readonly OwnWord[];
  offline?: boolean;
  children: React.ReactNode;
}) {
  const [starred, setStarred] = useState<ReadonlySet<string>>(
    () => new Set([...initial, ...initialOwn.map((w) => w.id)]),
  );
  const [own, setOwn] = useState<readonly OwnWord[]>(initialOwn);

  function apply(wordId: string, on: boolean, word?: OwnWordInput) {
    setStarred((prev) => {
      const next = new Set(prev);
      if (on) next.add(wordId);
      else next.delete(wordId);
      return next;
    });
    if (word) {
      setOwn((prev) => (on ? [{ id: wordId, ...word }, ...prev.filter((w) => w.id !== wordId)] : prev.filter((w) => w.id !== wordId)));
    }
  }

  function toggle(wordId: string, word?: OwnWordInput) {
    const on = !starred.has(wordId);
    apply(wordId, on, word);
    if (offline) return;
    const request = word ? { own: word, starred: on } : { wordId, starred: on };
    void setStar(request)
      .then((res) => {
        if (res.ok) return;
        apply(wordId, !on, word);
        toast.error(res.error);
      })
      .catch(() => {
        apply(wordId, !on, word);
        toast.error("Could not save that star. Check your connection.");
      });
  }

  return <StarsContext.Provider value={{ starred, own, toggle }}>{children}</StarsContext.Provider>;
}

export function useStars(): Stars {
  const stars = useContext(StarsContext);
  if (!stars) throw new Error("useStars needs a <StarsProvider>");
  return stars;
}

/**
 * Star or unstar one word. `label` is what the button names, e.g. the hanzi.
 * For a word in no list, pass `own` (and no `wordId`): it is saved with it.
 */
export function StarButton({
  wordId,
  own,
  label,
  className,
}: {
  wordId?: string;
  own?: OwnWordInput;
  label: string;
  className?: string;
}) {
  const { starred, toggle } = useStars();
  const id = wordId ?? `${OWN_PREFIX}${own?.hanzi ?? label}`;
  const on = starred.has(id);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Unstar ${label}` : `Star ${label}: test it again soon`}
      title={on ? "Starred: you'll be tested on it" : "Star: test this again soon"}
      onClick={(e) => {
        e.stopPropagation();
        toggle(id, wordId ? undefined : own);
      }}
      className={cn(
        "focus-visible:ring-ring inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors focus-visible:ring-2 focus-visible:outline-none",
        on ? "text-warning hover:bg-warning/10" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      <Star aria-hidden className={cn("size-5", on && "fill-current")} />
    </button>
  );
}
