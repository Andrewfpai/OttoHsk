"use client";

import { Star } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { setStar } from "../server/actions";

type Stars = {
  starred: ReadonlySet<string>;
  toggle: (wordId: string) => void;
};

const StarsContext = createContext<Stars | null>(null);

/**
 * The learner's starred words for one page. A star shows at once and is
 * saved in the background; if the save fails it is taken back.
 * `offline` skips saving, for the dev previews, which have no database.
 */
export function StarsProvider({
  initial,
  offline = false,
  children,
}: {
  initial: readonly string[];
  offline?: boolean;
  children: React.ReactNode;
}) {
  const [starred, setStarred] = useState<ReadonlySet<string>>(() => new Set(initial));

  function apply(wordId: string, on: boolean) {
    setStarred((prev) => {
      const next = new Set(prev);
      if (on) next.add(wordId);
      else next.delete(wordId);
      return next;
    });
  }

  function toggle(wordId: string) {
    const on = !starred.has(wordId);
    apply(wordId, on);
    if (offline) return;
    void setStar({ wordId, starred: on })
      .then((res) => {
        if (res.ok) return;
        apply(wordId, !on);
        toast.error(res.error);
      })
      .catch(() => {
        apply(wordId, !on);
        toast.error("Could not save that star. Check your connection.");
      });
  }

  return <StarsContext.Provider value={{ starred, toggle }}>{children}</StarsContext.Provider>;
}

export function useStars(): Stars {
  const stars = useContext(StarsContext);
  if (!stars) throw new Error("useStars needs a <StarsProvider>");
  return stars;
}

/** Star or unstar one word. `label` is what the button names, e.g. the hanzi. */
export function StarButton({
  wordId,
  label,
  className,
}: {
  wordId: string;
  label: string;
  className?: string;
}) {
  const { starred, toggle } = useStars();
  const on = starred.has(wordId);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Unstar ${label}` : `Star ${label}: test it again soon`}
      title={on ? "Starred: comes back in your next test" : "Star: test this again soon"}
      onClick={(e) => {
        e.stopPropagation();
        toggle(wordId);
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
