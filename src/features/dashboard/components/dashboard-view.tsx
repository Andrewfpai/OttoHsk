import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

import { PageContainer, PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import type { Dashboard } from "@/features/dashboard/server/queries";
import { percent, sectionsFor } from "@/features/mocks/lib/sections";
import { STATUS_DOT, STATUS_LABEL } from "@/features/words/components/status-badge";
import { formatDate } from "@/lib/dates";
import { EXAM_TIME_ZONE } from "@/lib/exam";
import { SECTION_MAX } from "@/lib/levels";
import { cn } from "@/lib/utils";

/** Pure presentation, so the dev preview can render it with sample data. */
export function DashboardView({ name, d }: { name: string | null; d: Dashboard }) {
  const days = d.daysLeft;
  const counts = d.words;
  const latest = d.latestMock;
  const firstName = name?.split(" ")[0];

  const TOTAL_WORDS = d.totalWords;
  const t = d.target;
  const SECTIONS = sectionsFor(d.level);
  const max = SECTION_MAX[d.level];
  const examLabel = d.examDate
    ? formatDate(new Date(`${d.examDate}T00:00:00Z`), "UTC", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <PageContainer>
      <PageHeader title={firstName ? `加油, ${firstName}` : "加油"} description={`Your HSK ${d.level} prep at a glance.`} />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Countdown */}
        <section className="bg-card flex flex-col justify-between gap-4 rounded-2xl border p-5">
          <h2 className="text-muted-foreground text-sm">Exam day</h2>
          {days === null ? (
            <>
              <p className="text-muted-foreground">No exam date set.</p>
              <Link href="/settings" className="text-primary text-sm hover:underline">
                Set one in Settings
              </Link>
            </>
          ) : (
            <>
              <div>
                <p className="font-numeric text-6xl font-semibold tracking-tight">{Math.max(0, days)}</p>
                <p className="text-muted-foreground">
                  {days > 1 ? "days to go" : days === 1 ? "day to go" : days === 0 ? "Today. 加油!" : "Exam done"}
                </p>
              </div>
              <p className="text-sm">{examLabel}</p>
            </>
          )}
        </section>

        {/* Words covered */}
        <section className="bg-card space-y-4 rounded-2xl border p-5 lg:col-span-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-muted-foreground text-sm">Words covered</h2>
            <Link href="/words" className="text-primary text-sm hover:underline">
              Word list
            </Link>
          </div>
          <p>
            <span className="font-numeric text-4xl font-semibold">{counts.known}</span>
            <span className="text-muted-foreground font-numeric text-lg"> / {TOTAL_WORDS} known</span>
          </p>
          <div
            className="bg-muted flex h-3 overflow-hidden rounded-full"
            role="img"
            aria-label={`${counts.known} known, ${counts.learning} learning, ${counts.new} not started`}
          >
            <div className="bg-success" style={{ width: `${(counts.known / TOTAL_WORDS) * 100}%` }} />
            <div className="bg-warning" style={{ width: `${(counts.learning / TOTAL_WORDS) * 100}%` }} />
          </div>
          <dl className="grid grid-cols-3 gap-3 text-sm">
            {(["known", "learning", "new"] as const).map((s) => (
              <div key={s}>
                <dt className="text-muted-foreground flex items-center gap-1.5">
                  <span aria-hidden className={cn("size-2 rounded-full", STATUS_DOT[s])} />
                  {STATUS_LABEL[s]}
                </dt>
                <dd className="font-numeric text-xl font-medium">{counts[s]}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Today */}
        <section className="bg-card space-y-4 rounded-2xl border p-5">
          <h2 className="text-muted-foreground text-sm">Today</h2>
          {t ? <TargetToday t={t} /> : null}
          <p className={cn(t && "text-sm")}>
            <span className={cn("font-numeric font-semibold", t ? "text-base" : "text-4xl")}>{d.due}</span>
            <span className="text-muted-foreground"> word{d.due === 1 ? "" : "s"} waiting for review</span>
          </p>
          {d.lockedUntil !== null ? (
            <p className="text-warning flex items-center gap-2 text-sm">
              <Lock aria-hidden className="size-4" />
              Tests locked until{" "}
              {new Date(d.lockedUntil).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: EXAM_TIME_ZONE,
              })}
              . Practice is open.
            </p>
          ) : null}
          <Button asChild size="lg" className="w-full cursor-pointer">
            <Link href="/words/flashcards">
              Go to flashcards <ArrowRight aria-hidden />
            </Link>
          </Button>
        </section>

        {/* Drills */}
        <section className="bg-card space-y-4 rounded-2xl border p-5">
          <h2 className="text-muted-foreground text-sm">Drills mastered</h2>
          <ul className="space-y-3">
            {d.drills.map((drill) => {
              const s = drill.summary;
              return (
                <li key={drill.kind}>
                  <Link href={drill.href} className="group block space-y-1.5">
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="group-hover:text-primary transition-colors">{drill.label}</span>
                      <span className="font-numeric text-muted-foreground">
                        {s.mastered}/{s.total}
                      </span>
                    </div>
                    <div className="bg-muted h-1.5 overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full"
                        style={{ width: `${s.total ? (s.mastered / s.total) * 100 : 0}%` }}
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Latest mock */}
        <section className="bg-card space-y-4 rounded-2xl border p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-muted-foreground text-sm">Latest mock</h2>
            <Link href="/mocks" className="text-primary text-sm hover:underline">
              {latest ? "All mocks" : "Add one"}
            </Link>
          </div>
          {latest ? (
            <ul className="space-y-3">
              {SECTIONS.map((s) => (
                <li key={s.key} className="space-y-1.5">
                  <div className="flex items-baseline justify-between text-sm">
                    <span>{s.label}</span>
                    <span className="font-numeric">
                      {latest[s.key]}
                      <span className="text-muted-foreground">/{max[s.key]}</span>
                    </span>
                  </div>
                  <div className="bg-muted h-1.5 overflow-hidden rounded-full">
                    <div
                      className="h-full"
                      style={{ width: `${percent(d.level, s.key, latest[s.key])}%`, background: s.color }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">
              No mock tests yet. Log your next paper to see which section needs the most work.
            </p>
          )}
        </section>
      </div>
    </PageContainer>
  );
}

/**
 * Today's place on the plan to know every word a week before the exam.
 * Progress: a known word counts 1, a learning word ¼–¾ by its strength.
 */
function TargetToday({ t }: { t: NonNullable<Dashboard["target"]> }) {
  const goal = formatDate(new Date(`${t.goalDate}T00:00:00Z`), "UTC", { day: "numeric", month: "short" });
  const pct = Math.min(100, Math.round((t.progress / Math.max(1, t.targetToday)) * 100));
  return (
    <div className="space-y-2">
      <p>
        {t.behind > 0 ? (
          <>
            <span className="font-numeric text-4xl font-semibold">{t.behind}</span>
            <span className="text-muted-foreground"> to go today</span>
          </>
        ) : (
          <span className="text-success text-2xl font-semibold">On track</span>
        )}
      </p>
      <div
        className="bg-muted h-2 overflow-hidden rounded-full"
        role="img"
        aria-label={`Progress ${t.progress} of today's target ${t.targetToday}`}
      >
        <div className={cn("h-full", t.behind > 0 ? "bg-warning" : "bg-success")} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-muted-foreground text-sm">
        Progress <span className="text-foreground font-numeric">{t.progress}</span> of today&apos;s{" "}
        <span className="text-foreground font-numeric">{t.targetToday}</span> (day{" "}
        <span className="font-numeric">{t.day}</span> × <span className="font-numeric">{t.perDay}</span>). A known
        word counts 1, a learning word ¼–¾ as it gets stronger. Every word by {goal}.
      </p>
    </div>
  );
}
