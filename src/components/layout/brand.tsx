import Link from "next/link";

/** A seal stamp (印章) mark. Seal red appears here and nowhere else. */
export function SealMark({ className = "size-8 text-base" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`bg-seal font-hanzi flex shrink-0 items-center justify-center rounded-md font-bold text-white ${className}`}
    >
      汉
    </span>
  );
}

export function Brand() {
  return (
    <Link
      href="/dashboard"
      className="focus-visible:ring-ring flex items-center gap-2.5 rounded-lg px-1 py-1 focus-visible:ring-2 focus-visible:outline-none"
    >
      <SealMark />
      <span className="text-sm font-semibold tracking-tight">
        OttoHSK <span className="text-muted-foreground font-normal">· HSK 5</span>
      </span>
    </Link>
  );
}
