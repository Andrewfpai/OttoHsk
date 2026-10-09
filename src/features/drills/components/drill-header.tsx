import type { DrillSummary } from "../lib/stats";

/** "This session: 7/9 · Mastered 23/60" above every drill. */
export function DrillHeader({
  summary,
  session,
}: {
  summary: DrillSummary;
  session: { answered: number; right: number };
}) {
  return (
    <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2 text-sm">
      <span>
        This session:{" "}
        <span className="text-foreground font-numeric">
          {session.right}/{session.answered}
        </span>{" "}
        right
      </span>
      <span>
        Mastered{" "}
        <span className="text-foreground font-numeric">
          {summary.mastered}/{summary.total}
        </span>
      </span>
    </div>
  );
}
