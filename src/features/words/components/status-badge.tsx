import type { WordStatus } from "@/features/flashcards/lib/schedule";
import { cn } from "@/lib/utils";

export const STATUS_LABEL: Record<WordStatus, string> = {
  new: "Not started",
  learning: "Learning",
  known: "Known",
};

export const STATUS_DOT: Record<WordStatus, string> = {
  new: "bg-muted-foreground/40",
  learning: "bg-warning",
  known: "bg-success",
};

export function StatusBadge({ status, className }: { status: WordStatus; className?: string }) {
  return (
    <span
      className={cn(
        "text-muted-foreground inline-flex items-center gap-1.5 text-xs whitespace-nowrap",
        className,
      )}
    >
      <span aria-hidden className={cn("size-2 rounded-full", STATUS_DOT[status])} />
      {STATUS_LABEL[status]}
    </span>
  );
}
