"use client";

import { useSyncExternalStore } from "react";

/**
 * The browser's own Mandarin voice (Web Speech API). Free and instant, but
 * the voice depends on the device: phones have good ones, some computers
 * none. Voices load after the page, so they are watched as a store.
 */
const listeners = new Set<() => void>();
let cached: SpeechSynthesisVoice | null | undefined;

function supported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** The best Mandarin voice on this device, or null when it has none. */
function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const zh = voices.filter((v) => /^zh[-_](CN|Hans)/i.test(v.lang) || v.lang === "cmn-Hans-CN");
  // Neural/online voices sound far better than the old offline ones.
  const rank = (v: SpeechSynthesisVoice) =>
    (/natural|neural|online/i.test(v.name) ? 0 : 2) + (/xiaoxiao|google|tingting|yaoyao/i.test(v.name) ? 0 : 1);
  return [...zh].sort((a, b) => rank(a) - rank(b))[0] ?? null;
}

function subscribe(listener: () => void) {
  if (!supported()) return () => {};
  listeners.add(listener);
  const onChange = () => {
    cached = pickVoice();
    for (const l of listeners) l();
  };
  window.speechSynthesis.addEventListener("voiceschanged", onChange);
  return () => {
    listeners.delete(listener);
    window.speechSynthesis.removeEventListener("voiceschanged", onChange);
  };
}

function snapshot(): SpeechSynthesisVoice | null {
  if (!supported()) return null;
  if (cached === undefined) cached = pickVoice();
  return cached;
}

/** The Mandarin voice in use (null: none yet, or none on this device), and a way to speak. */
export function useSpeech() {
  const voice = useSyncExternalStore(subscribe, snapshot, () => null);
  function speak(text: string, rate = 0.9) {
    if (!supported()) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    if (voice) u.voice = voice;
    u.rate = rate;
    window.speechSynthesis.speak(u);
  }
  return { voice, speak, supported: supported() };
}

/** Plays a pre-made clip; a new one stops the last. */
let current: HTMLAudioElement | null = null;
export function playClip(src: string) {
  current?.pause();
  current = new Audio(src);
  void current.play().catch(() => {});
}
