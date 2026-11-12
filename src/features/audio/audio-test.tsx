"use client";

import { Globe, Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { playClip, useSpeech } from "./use-speech";

export type AudioTestWord = {
  id: string;
  hanzi: string;
  pinyin: string;
  gloss: string;
  src: string;
  sentence: { zh: string; en: string; src: string } | null;
};

/**
 * Compare the two ways the app could speak: the browser's own voice, and
 * pre-made clips (Microsoft neural voices, made by scripts/build-audio.py).
 */
export function AudioTest({ words }: { words: AudioTestWord[] }) {
  const { voice, speak } = useSpeech();
  return (
    <div className="space-y-5">
      <div className="bg-card space-y-2 rounded-2xl border p-4 text-sm">
        <p className="flex flex-wrap items-center gap-2">
          <Pill tone="browser">Browser</Pill>
          {voice ? (
            <span>
              this device&apos;s voice: <span className="font-medium">{voice.name}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">
              no Mandarin voice found yet on this device (it may still be loading, or the device has none)
            </span>
          )}
        </p>
        <p className="flex flex-wrap items-center gap-2">
          <Pill tone="file">Recorded</Pill>
          <span>pre-made clips: words by Xiaoxiao (female), sentences by Yunyang (male), Microsoft neural voices</span>
        </p>
      </div>

      <ol className="space-y-3">
        {words.map((w, i) => (
          <li key={w.id} className="bg-card space-y-3 rounded-2xl border p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-muted-foreground font-numeric w-6 text-sm">{i + 1}</span>
              <span className="font-hanzi text-3xl">{w.hanzi}</span>
              <span className="min-w-0 flex-1 text-sm">
                <span className="text-primary font-medium">{w.pinyin}</span>{" "}
                <span className="text-muted-foreground">· {w.gloss}</span>
              </span>
              <PlayButtons label={w.hanzi} onBrowser={() => speak(w.hanzi, 0.8)} onFile={() => playClip(w.src)} />
            </div>
            {w.sentence ? (
              <div className="bg-muted/40 flex flex-wrap items-center gap-3 rounded-xl p-3">
                <p className="min-w-0 flex-1">
                  <span className="font-hanzi block text-lg">{w.sentence.zh}</span>
                  <span className="text-muted-foreground block text-sm">{w.sentence.en}</span>
                </p>
                <PlayButtons
                  label={`the sentence for ${w.hanzi}`}
                  onBrowser={() => speak(w.sentence!.zh)}
                  onFile={() => playClip(w.sentence!.src)}
                />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function PlayButtons({ label, onBrowser, onFile }: { label: string; onBrowser: () => void; onFile: () => void }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onBrowser}
        aria-label={`Play ${label} with the browser voice`}
        className="focus-visible:ring-ring hover:bg-muted inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
      >
        <Globe aria-hidden className="size-4" /> Browser
      </button>
      <button
        type="button"
        onClick={onFile}
        aria-label={`Play ${label}, recorded`}
        className="focus-visible:ring-ring border-primary/40 bg-primary/10 hover:bg-primary/15 inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
      >
        <Volume2 aria-hidden className="size-4" /> Recorded
      </button>
    </div>
  );
}

function Pill({ tone, children }: { tone: "browser" | "file"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        tone === "file" && "border-primary/40 bg-primary/10",
      )}
    >
      {children}
    </span>
  );
}
