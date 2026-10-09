/**
 * The AI endpoint's configuration, from the environment. Server-only: the
 * key must never reach the browser, so nothing here is NEXT_PUBLIC_.
 */
export const DEFAULT_BASE_URL = "https://api.cosmoshub.tech/v1";

/** Tried in this order; the first usable answer wins. */
export const DEFAULT_MODELS = ["deepseek-v4-pro", "gpt-6-sol", "claude-opus-4.8", "glm-5.2"];

/** Each check is a paid API call; this keeps a runaway day bounded. */
export const DAILY_ESSAY_LIMIT = 30;

export type AiConfig = { baseUrl: string; apiKey: string; models: string[] };

export function aiConfig(): AiConfig | null {
  // Tolerate a key pasted together with its header prefix ("Bearer sk-…"):
  // sent as-is it would become "Bearer Bearer sk-…" and every model would 401.
  const apiKey = process.env.AI_API_KEY?.trim().replace(/^bearer\s+/i, "");
  if (!apiKey) return null;
  const models = (process.env.AI_MODELS ?? "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  return {
    baseUrl: process.env.AI_BASE_URL?.trim() || DEFAULT_BASE_URL,
    apiKey,
    models: models.length ? models : DEFAULT_MODELS,
  };
}
