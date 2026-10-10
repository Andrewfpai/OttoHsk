import type { MetadataRoute } from "next";

/**
 * The web app manifest: what makes OttoHSK installable ("Install app" in
 * Chrome, "Add to Home Screen" on a phone). Icons are drawn by
 * scripts/build-icons.py.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "OttoHSK",
    short_name: "OttoHSK",
    description: "HSK 5 and HSK 6 prep: words, flashcards, drills, writing and mock scores.",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0e0f17",
    theme_color: "#0e0f17",
    categories: ["education"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
