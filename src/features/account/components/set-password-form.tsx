"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PASSWORD_MIN } from "@/lib/password-rules";

import { setPassword } from "../server/actions";

/**
 * New password, twice. `then` is where to go after saving: the dashboard for
 * a first-time setup, or nowhere (stay put) when changing it in Settings.
 */
export function SetPasswordForm({ then, submitLabel }: { then?: string; submitLabel: string }) {
  const router = useRouter();
  const [password, setPasswordValue] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await setPassword({ password, confirm });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setPasswordValue("");
      setConfirm("");
      toast.success("Password saved.");
      if (then) router.replace(then);
      else router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="new-password">New password</Label>
        <Input
          id="new-password"
          type="password"
          autoComplete="new-password"
          minLength={PASSWORD_MIN}
          required
          value={password}
          onChange={(e) => setPasswordValue(e.target.value)}
          className="h-11"
        />
        <p className="text-muted-foreground text-xs">At least {PASSWORD_MIN} characters.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Type it again</Label>
        <Input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="h-11"
        />
      </div>
      {error ? (
        <p
          role="alert"
          className="border-destructive/30 bg-destructive/10 text-destructive rounded-lg border px-3 py-2 text-sm"
        >
          {error}
        </p>
      ) : null}
      <Button type="submit" className="h-11 w-full cursor-pointer" disabled={pending}>
        {pending ? <Loader2 aria-hidden className="animate-spin" /> : null}
        {submitLabel}
      </Button>
    </form>
  );
}
