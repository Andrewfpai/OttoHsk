import { SECTION_MAX, type Section } from "@/lib/exam";

export const SECTIONS: { key: Section; label: string; color: string; note?: string }[] = [
  { key: "listening", label: "Listening", color: "var(--chart-1)" },
  { key: "reading", label: "Reading", color: "var(--chart-3)" },
  { key: "writing", label: "Writing", color: "var(--chart-5)", note: "Part 1 only" },
];

export function percent(section: Section, correct: number): number {
  return Math.round((correct / SECTION_MAX[section]) * 100);
}
