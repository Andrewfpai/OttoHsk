"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const TABS = [
  { href: "/words", label: "Word list" },
  { href: "/words/flashcards", label: "Flashcards" },
  { href: "/words/history", label: "History" },
];

/** Tabs as links, so each tab has its own URL and the back button works. */
export function WordsTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Words" className="bg-muted inline-flex rounded-lg p-1">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "focus-visible:ring-ring rounded-md px-4 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
