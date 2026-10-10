import { type Level, SECTION_MAX, type Section, WRITING_NOTE } from "@/lib/levels";

export type SectionInfo = { key: Section; label: string; color: string; note?: string };

export function sectionsFor(level: Level): SectionInfo[] {
  return [
    { key: "listening", label: "Listening", color: "var(--chart-1)" },
    { key: "reading", label: "Reading", color: "var(--chart-3)" },
    { key: "writing", label: "Writing", color: "var(--chart-5)", note: WRITING_NOTE[level] },
  ];
}

export function percent(level: Level, section: Section, value: number): number {
  return Math.round((value / SECTION_MAX[level][section]) * 100);
}
