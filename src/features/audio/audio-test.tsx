"use client";

import { Globe, Volume2 } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { playClip, useSpeech } from "./use-speech";

/** Clip paths by voice, then by speed. */
type Clips = Record<string, Record<string, string>>;

export type AudioTestData = {
  voices: { key: string; name: string; note: string }[];
  speeds: string[];
  words: {
    id: string;
    hanzi: string;
    pinyin: string;
    gloss: string;
    clips: Clips;
    sentence: { zh: string; en: string; clips: Clips } | null;
  }[];
};

const SPEED_LABEL: Record<string, string> = { normal: "Normal", slower: "Slower", slowest: "Slowest" };
/** The browser voice's rate for each speed, to compare like with like. */
const BROWSER_RATE: Record<string, number> = { normal: 0.95, slower: 0.8, slowest: 0.65 };

/**
 * Compare the ways the app could speak: pre-made clips in several voices and
 * speeds (Microsoft neural voices, made by scripts/build-audio.py), and the
 * browser's own voice.
 */
export function AudioTest({ data }: { data: AudioTestData }) {
  const { voice: browserVoice, speak } = useSpeech();
  const [voice, setVoice] = useState(data.voices[0].key);
  const [speed, setSpeed] = useState("slower");

  return (
    <div className="space-y-5">
      <section className="bg-card space-y-4 rounded-2xl border p-4">
        <div className="space-y-2">
          <h2 className="text-sm font-medium">Recorded voice</h2>
          <div role="radiogroup" aria-label="Voice" className="flex flex-wrap gap-2">
            {data.voices.map((v) => (
              <button
                key={v.key}
                type="button"
                role="radio"
                aria-checked={voice === v.key}
                onClick={() => setVoice(v.key)}
                className={cn(
                  "focus-visible:ring-ring cursor-pointer rounded-xl border px-3 py-2 text-left text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  voice === v.key ? "border-primary bg-primary/10" : "hover:bg-muted",
                )}
              >
                <span className="block font-medium">{v.name}</span>
                <span className="text-muted-foreground block text-xs">{v.note}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-medium">Speed</h2>
          <div role="radiogroup" aria-label="Speed" className="bg-muted flex w-fit gap-1 rounded-xl p-1">
            {data.speeds.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={speed === s}
                onClick={() => setSpeed(s)}
                className={cn(
                  "focus-visible:ring-ring min-h-9 cursor-pointer rounded-lg px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  speed === s ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {SPEED_LABEL[s] ?? s}
              </button>
            ))}
          </div>
        </div>
        <p className="text-muted-foreground text-xs">
          Browser button: this device&apos;s own voice,{" "}
          {browserVoice ? <span className="text-foreground">{browserVoice.name}</span> : "none found yet"}, at the
          same speed, for comparison.
        </p>
      </section>

      <ol className="space-y-3">
        {data.words.map((w, i) => (
          <li key={w.id} className="bg-card space-y-3 rounded-2xl border p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-muted-foreground font-numeric w-6 text-sm">{i + 1}</span>
              <span className="font-hanzi text-3xl">{w.hanzi}</span>
              <span className="min-w-0 flex-1 text-sm">
                <span className="text-primary font-medium">{w.pinyin}</span>{" "}
                <span className="text-muted-foreground">· {w.gloss}</span>
              </span>
              <PlayButtons
                label={w.hanzi}
                onFile={() => playClip(w.clips[voice][speed])}
                onBrowser={() => speak(w.hanzi, BROWSER_RATE[speed] * 0.9)}
              />
            </div>
            {w.sentence ? (
              <div className="bg-muted/40 flex flex-wrap items-center gap-3 rounded-xl p-3">
                <p className="min-w-0 flex-1">
                  <span className="font-hanzi block text-lg">{w.sentence.zh}</span>
                  <span className="text-muted-foreground block text-sm">{w.sentence.en}</span>
                </p>
                <PlayButtons
                  label={`the sentence for ${w.hanzi}`}
                  onFile={() => playClip(w.sentence!.clips[voice][speed])}
                  onBrowser={() => speak(w.sentence!.zh, BROWSER_RATE[speed])}
                />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function PlayButtons({ label, onFile, onBrowser }: { label: string; onFile: () => void; onBrowser: () => void }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onFile}
        aria-label={`Play ${label}, recorded`}
        className="focus-visible:ring-ring border-primary/40 bg-primary/10 hover:bg-primary/15 inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
      >
        <Volume2 aria-hidden className="size-4" /> Recorded
      </button>
      <button
        type="button"
        onClick={onBrowser}
        aria-label={`Play ${label} with the browser voice`}
        className="focus-visible:ring-ring hover:bg-muted inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
      >
        <Globe aria-hidden className="size-4" /> Browser
      </button>
    </div>
  );
}
