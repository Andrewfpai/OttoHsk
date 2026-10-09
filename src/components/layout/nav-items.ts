import {
  BookOpenText,
  ClipboardCheck,
  GitCompareArrows,
  LayoutDashboard,
  ListOrdered,
  PenLine,
  TextCursorInput,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  // Covers both tabs: the word list and /words/flashcards.
  { href: "/words", label: "Words", icon: BookOpenText },
  { href: "/confusables", label: "Confusables", icon: GitCompareArrows },
  { href: "/cloze", label: "Fill in", icon: TextCursorInput },
  { href: "/ordering", label: "Sentence order", icon: ListOrdered },
  { href: "/essays", label: "Essays", icon: PenLine },
  { href: "/mocks", label: "Mock tests", icon: ClipboardCheck },
];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** The sibling app. Unset hides the link rather than pointing nowhere. */
export const OTTOLABS_URL = process.env.NEXT_PUBLIC_OTTOLABS_URL ?? "";
