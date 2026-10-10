import {
  BookOpenText,
  FileWarning,
  ClipboardCheck,
  GitCompareArrows,
  LayoutDashboard,
  ListOrdered,
  PenLine,
  Settings,
  TextCursorInput,
  type LucideIcon,
} from "lucide-react";

import type { Level } from "@/lib/levels";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

/**
 * The menu for a level. HSK 6 has no sentence ordering; its reading opens
 * with 病句 (find the error) instead, and its writing is a retelling (缩写).
 */
export function navItems(level: Level): NavItem[] {
  return [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    // Covers both tabs: the word list and /words/flashcards.
    { href: "/words", label: "Words", icon: BookOpenText },
    { href: "/cloze", label: "Fill in", icon: TextCursorInput },
    level === 5
      ? { href: "/ordering", label: "Sentence order", icon: ListOrdered }
      : { href: "/errors", label: "Find the error", icon: FileWarning },
    { href: "/essays", label: level === 5 ? "Essays" : "Retelling", icon: PenLine },
    { href: "/mocks", label: "Mock tests", icon: ClipboardCheck },
    { href: "/confusables", label: "Confusables", icon: GitCompareArrows },
  ];
}

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  { href: "/settings", label: "Settings", icon: Settings },
];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** The sibling app. Unset hides the link rather than pointing nowhere. */
export const OTTOLABS_URL = process.env.NEXT_PUBLIC_OTTOLABS_URL ?? "";
