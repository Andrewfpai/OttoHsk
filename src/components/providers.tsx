"use client";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * next-themes renders an inline script that applies the theme before first
 * paint; it only does anything in the server-rendered HTML. Typing it as data
 * in the browser stops React warning when it rebuilds the tree client-side.
 */
const themeScriptProps =
  typeof window === "undefined" ? undefined : { type: "application/json" };

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      scriptProps={themeScriptProps}
    >
      <TooltipProvider delayDuration={200}>
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </TooltipProvider>
    </ThemeProvider>
  );
}
