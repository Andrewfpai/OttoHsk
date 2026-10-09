import type { Metadata, Viewport } from "next";
import { Fira_Code, Fira_Sans, Noto_Sans_SC } from "next/font/google";

import { Providers } from "@/components/providers";

import "./globals.css";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Every number that updates in place: countdowns, scores, counters.
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Hanzi. Google serves CJK fonts in unicode-range slices, so a page only
// downloads the slices for characters it actually shows; preloading would
// fetch slices up front for nothing.
const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "OttoHSK",
    template: "%s · OttoHSK",
  },
  description: "HSK 5 prep: words, flashcards, confusables, fill-in passages, sentence order, essays and mock scores.",
  applicationName: "OttoHSK",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfe" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f17" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${firaSans.variable} ${firaCode.variable} ${notoSansSC.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
