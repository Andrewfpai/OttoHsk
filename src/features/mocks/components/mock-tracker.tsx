"use client";

import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/dates";
import { SECTION_MAX } from "@/lib/exam";
import { cn } from "@/lib/utils";

import { SECTIONS, percent } from "../lib/sections";
import { deleteMock, saveMock } from "../server/actions";
import type { MockRow } from "../server/queries";

/** "7 Nov". A fixed locale, so the server and the browser print the same thing. */
function shortDate(iso: string) {
  return formatDate(new Date(`${iso}T00:00:00Z`), "UTC", { month: "short", day: "numeric" });
}

export function MockTracker({ mocks, today }: { mocks: MockRow[]; today: string }) {
  const [editing, setEditing] = useState<MockRow | null>(null);
  const [pending, startTransition] = useTransition();
  // Remounting the form resets its fields when switching what is edited.
  const formKey = editing?.id ?? "new";

  // onSubmit rather than <form action>: React resets an action form once the
  // action finishes, which would wipe the scores even when saving failed.
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const wasEditing = editing !== null;
    startTransition(async () => {
      try {
        const res = await saveMock(editing?.id ?? null, data);
        if (!res.ok) {
          toast.error(res.error);
          return;
        }
        toast.success(wasEditing ? "Mock test updated" : "Mock test saved");
        if (!wasEditing) form.reset();
        setEditing(null);
      } catch {
        toast.error("Couldn't reach the server. Your scores are still in the form; try again.");
      }
    });
  }

  function remove(id: string) {
    startTransition(async () => {
      try {
        const res = await deleteMock(id);
        if (!res.ok) toast.error(res.error);
        else if (editing?.id === id) setEditing(null);
      } catch {
        toast.error("Couldn't reach the server. Nothing was deleted; try again.");
      }
    });
  }

  const latest = mocks.at(-1);
  const previous = mocks.at(-2);
  const chartData = mocks.map((m) => ({
    name: shortDate(m.takenOn),
    listening: percent("listening", m.listening),
    reading: percent("reading", m.reading),
    writing: percent("writing", m.writing),
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
      <form
        key={formKey}
        onSubmit={submit}
        className="bg-card h-fit space-y-4 rounded-2xl border p-5"
        aria-label={editing ? "Edit mock test" : "Add mock test"}
      >
        <h2 className="font-medium">{editing ? "Edit mock test" : "Add a mock test"}</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="takenOn">Date</Label>
            <Input
              id="takenOn"
              name="takenOn"
              type="date"
              required
              max={today}
              defaultValue={editing?.takenOn ?? today}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="label">Paper (optional)</Label>
            <Input
              id="label"
              name="label"
              maxLength={60}
              placeholder="e.g. H51003"
              defaultValue={editing?.label ?? ""}
            />
          </div>
        </div>

        {SECTIONS.map((s) => (
          <div key={s.key} className="space-y-1.5">
            <Label htmlFor={s.key}>
              {s.label}
              {s.note ? <span className="text-muted-foreground font-normal">({s.note})</span> : null}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id={s.key}
                name={s.key}
                type="number"
                inputMode="numeric"
                required
                min={0}
                max={SECTION_MAX[s.key]}
                defaultValue={editing?.[s.key] ?? ""}
                className="font-numeric w-24"
              />
              <span className="text-muted-foreground font-numeric text-sm">
                / {SECTION_MAX[s.key]} correct
              </span>
            </div>
          </div>
        ))}

        <div className="flex gap-2 pt-1">
          {editing ? (
            <Button
              type="button"
              variant="outline"
              className="h-11 flex-1 cursor-pointer"
              onClick={() => setEditing(null)}
            >
              Cancel
            </Button>
          ) : null}
          <Button type="submit" className="h-11 flex-1 cursor-pointer text-sm" disabled={pending}>
            {pending ? <Loader2 aria-hidden className="animate-spin" /> : null}
            {editing ? "Save changes" : "Save mock test"}
          </Button>
        </div>
        <p className="text-muted-foreground text-xs">
          Writing counts the 8 sentence-ordering questions. The two essays have no answer key, so
          they are not scored here.
        </p>
      </form>

      <div className="min-w-0 space-y-6">
        {latest ? (
          <section aria-label="Latest mock" className="grid gap-3 sm:grid-cols-3">
            {SECTIONS.map((s) => {
              const value = latest[s.key];
              const delta = previous ? value - previous[s.key] : null;
              return (
                <div key={s.key} className="bg-card rounded-2xl border p-4">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <span aria-hidden className="size-2 rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </div>
                  <p className="font-numeric mt-1 text-3xl font-semibold">
                    {value}
                    <span className="text-muted-foreground text-lg font-normal">/{SECTION_MAX[s.key]}</span>
                  </p>
                  <p className="text-muted-foreground font-numeric text-sm">
                    {percent(s.key, value)}%
                    {delta !== null && delta !== 0 ? (
                      <span className={cn("ml-2", delta > 0 ? "text-success" : "text-destructive")}>
                        {delta > 0 ? "+" : ""}
                        {delta} vs last
                      </span>
                    ) : null}
                  </p>
                </div>
              );
            })}
          </section>
        ) : null}

        {mocks.length >= 2 ? (
          <section className="bg-card rounded-2xl border p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-medium">Trend (% correct)</h2>
              <div className="text-muted-foreground flex gap-4 text-xs">
                {SECTIONS.map((s) => (
                  <span key={s.key} className="flex items-center gap-1.5">
                    <span aria-hidden className="h-0.5 w-3 rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
            <ChartContainer config={{}} className="aspect-auto h-64 w-full">
              <LineChart data={chartData} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <Tooltip
                  cursor={{ stroke: "var(--border)" }}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(value, name) => [`${value}%`, String(name)]}
                />
                {SECTIONS.map((s) => (
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.label}
                    stroke={s.color}
                    strokeWidth={2}
                    dot={{ r: 3, fill: s.color }}
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ChartContainer>
          </section>
        ) : null}

        <section className="bg-card overflow-hidden rounded-2xl border">
          <h2 className="border-b px-5 py-3 font-medium">History</h2>
          {mocks.length === 0 ? (
            <p className="text-muted-foreground p-8 text-center text-sm">
              No mock tests yet. After your next paper, enter how many you got right in each section.
            </p>
          ) : (
            // relative: keeps the sr-only "Actions" label inside the scroll
            // box, so it cannot widen the page on a phone.
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-muted-foreground text-left text-xs">
                  <tr>
                    <th className="px-5 py-2 font-medium">Date</th>
                    <th className="px-3 py-2 font-medium">Paper</th>
                    {SECTIONS.map((s) => (
                      <th key={s.key} className="px-3 py-2 text-right font-medium">
                        {s.label}
                      </th>
                    ))}
                    <th className="px-5 py-2">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[...mocks].reverse().map((m) => (
                    <tr key={m.id} className={cn(editing?.id === m.id && "bg-primary/5")}>
                      <td className="px-5 py-2.5 whitespace-nowrap">{shortDate(m.takenOn)}</td>
                      <td className="text-muted-foreground px-3 py-2.5">{m.label ?? "—"}</td>
                      {SECTIONS.map((s) => (
                        <td key={s.key} className="font-numeric px-3 py-2.5 text-right whitespace-nowrap">
                          {m[s.key]}
                          <span className="text-muted-foreground">/{SECTION_MAX[s.key]}</span>
                        </td>
                      ))}
                      <td className="px-5 py-1.5">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer"
                            aria-label={`Edit mock from ${shortDate(m.takenOn)}`}
                            onClick={() => setEditing(m)}
                          >
                            <Pencil aria-hidden />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer"
                                aria-label={`Delete mock from ${shortDate(m.takenOn)}`}
                              >
                                <Trash2 aria-hidden />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete this mock test?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  The scores from {shortDate(m.takenOn)} will be removed from your
                                  history and trend. This cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer">Keep it</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive hover:bg-destructive/90 cursor-pointer text-white"
                                  onClick={() => remove(m.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
