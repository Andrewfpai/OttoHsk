import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The brand mark: a white 汉 on an indigo-to-teal tile, with a small spark
 * for progress. The gradient appears here and nowhere else.
 * scripts/build-icons.py draws the same mark for the app icons.
 */
export function BrandMark({ className = "size-8 text-base" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "from-brand-from to-brand-to font-hanzi relative flex shrink-0 items-center justify-center rounded-[28%] bg-linear-to-br font-bold text-white shadow-sm",
        className,
      )}
    >
      <span className="translate-y-[2%]">汉</span>
      <svg viewBox="0 0 24 24" className="absolute top-[9%] right-[9%] size-[22%] fill-white/90">
        <path d="M12 0 C12.8 7 17 11.2 24 12 C17 12.8 12.8 17 12 24 C11.2 17 7 12.8 0 12 C7 11.2 11.2 7 12 0 Z" />
      </svg>
    </span>
  );
}

export function Brand({ level }: { level: number }) {
  return (
    <Link
      href="/dashboard"
      className="focus-visible:ring-ring flex items-center gap-2.5 rounded-lg px-1 py-1 focus-visible:ring-2 focus-visible:outline-none"
    >
      <BrandMark />
      <span className="text-sm font-semibold tracking-tight">
        OttoHSK <span className="text-muted-foreground font-normal">· HSK {level}</span>
      </span>
    </Link>
  );
}
