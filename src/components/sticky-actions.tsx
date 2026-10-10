import { cn } from "@/lib/utils";

/**
 * The buttons after an answer (Next, Finish). On a phone they stay pinned to
 * the bottom of the screen, so a long explanation never pushes them out of
 * reach; from `sm` up they sit in the flow as usual.
 *
 * Sticky only works inside its parent's box, so render this as a direct
 * child of the element that holds the whole question, not inside a small
 * feedback block. `surface` matches the background it sits on.
 */
export function StickyActions({
  children,
  surface = "background",
  className,
}: {
  children: React.ReactNode;
  surface?: "background" | "card";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "sticky bottom-0 z-10 border-t pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:static sm:border-0 sm:p-0",
        surface === "card" ? "bg-card" : "bg-background",
        className,
      )}
    >
      {children}
    </div>
  );
}
