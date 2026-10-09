"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/** Any page in the app that throws lands here, inside the normal layout. */
export default function AppError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md space-y-4 py-16 text-center">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground text-sm">
        Usually a dropped connection or a new version of the app. Try again, or reload the page.
      </p>
      <Button className="cursor-pointer" onClick={() => retry()}>
        Try again
      </Button>
    </div>
  );
}
