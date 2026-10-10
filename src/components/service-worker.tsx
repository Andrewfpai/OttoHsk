"use client";

import { useEffect } from "react";

/** Registers /sw.js, which makes the app installable. Renders nothing. */
export function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        // Not installable this time; the app works the same without it.
      });
    }
  }, []);
  return null;
}
