"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Plays clips one after another with pauses between, through one audio
 * element (so phones, which unlock audio on a tap, keep playing the chain).
 * `current` is the index playing, or null when stopped.
 */
export function usePlaylist() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const run = useRef(0);
  const [current, setCurrent] = useState<number | null>(null);

  function halt() {
    run.current++;
    const el = audio.current;
    if (el) {
      el.pause();
      // Let a clip that was waiting to end stop waiting.
      el.dispatchEvent(new Event("ended"));
    }
  }

  function stop() {
    halt();
    setCurrent(null);
  }

  /** Plays `srcs[from]` onward (or only it, with `once`), pausing `pauses[i]` ms after each. */
  async function play(srcs: string[], pauses: number[], from = 0, once = false) {
    halt();
    const id = run.current;
    const el = (audio.current ??= new Audio());
    for (let i = from; i < srcs.length; i++) {
      if (run.current !== id) return;
      setCurrent(i);
      el.src = srcs[i];
      const ended = new Promise<void>((resolve) => {
        el.onended = () => resolve();
        el.onerror = () => resolve();
      });
      try {
        await el.play();
      } catch {
        break;
      }
      await ended;
      if (once || run.current !== id) break;
      await new Promise((r) => setTimeout(r, pauses[i] ?? 0));
    }
    if (run.current === id) setCurrent(null);
  }

  // Leaving the page stops the sound.
  useEffect(() => {
    const r = run;
    const a = audio;
    return () => {
      r.current++;
      a.current?.pause();
    };
  }, []);

  return { current, play, stop };
}
