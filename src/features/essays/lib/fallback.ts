/**
 * Ask an OpenAI-compatible chat endpoint, trying models in order until one
 * gives a usable answer.
 *
 * "Usable" means the HTTP call succeeded AND `parse` accepted the reply. A
 * model that answers with something we cannot read is as unhelpful as one
 * that is down, so both move on to the next model. Every attempt is
 * recorded, so the learner can see which model answered and which failed.
 */
export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type Attempt = { model: string; ok: boolean; ms: number; error?: string };

export class AllModelsFailed extends Error {
  constructor(readonly attempts: Attempt[]) {
    super(
      "No model answered: " + attempts.map((a) => `${a.model} (${a.error ?? "failed"})`).join(", "),
    );
    this.name = "AllModelsFailed";
  }
}

export type FallbackOptions<T> = {
  baseUrl: string;
  apiKey: string;
  models: readonly string[];
  messages: ChatMessage[];
  /** Turn the reply text into a value; throw if it is unusable. */
  parse: (content: string) => T;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  now?: () => number;
};

export type FallbackResult<T> = { value: T; model: string; attempts: Attempt[] };

function describe(error: unknown): string {
  if (error instanceof Error) {
    if (error.name === "TimeoutError" || error.name === "AbortError") return "timed out";
    return error.message.slice(0, 120);
  }
  return "failed";
}

export async function completeWithFallback<T>(opts: FallbackOptions<T>): Promise<FallbackResult<T>> {
  const fetchImpl = opts.fetchImpl ?? fetch;
  const now = opts.now ?? Date.now;
  const url = `${opts.baseUrl.replace(/\/+$/, "")}/chat/completions`;
  const attempts: Attempt[] = [];

  for (const model of opts.models) {
    const started = now();
    try {
      const res = await fetchImpl(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${opts.apiKey}`,
        },
        body: JSON.stringify({ model, messages: opts.messages, temperature: 0.3 }),
        signal: AbortSignal.timeout(opts.timeoutMs ?? 55_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = (await res.json()) as { choices?: { message?: { content?: unknown } }[] };
      const content = json.choices?.[0]?.message?.content;
      if (typeof content !== "string" || !content.trim()) throw new Error("empty reply");

      let value: T;
      try {
        value = opts.parse(content);
      } catch {
        throw new Error("unreadable reply");
      }
      attempts.push({ model, ok: true, ms: now() - started });
      return { value, model, attempts };
    } catch (error) {
      attempts.push({ model, ok: false, ms: now() - started, error: describe(error) });
    }
  }

  throw new AllModelsFailed(attempts);
}
