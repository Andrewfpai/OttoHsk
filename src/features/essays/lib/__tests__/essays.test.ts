import { describe, expect, it } from "vitest";

import { countChars, lengthState, wordsUsed } from "../checks";
import { AllModelsFailed, completeWithFallback } from "../fallback";
import { buildMessages, parseFeedback } from "../feedback";

const GOOD = {
  score: 72,
  summary: "Clear and on task.",
  wordUse: [{ word: "坚持", ok: true, note: "" }],
  corrections: [{ original: "我很努力学习", corrected: "我学习很努力", why: "Degree adverbs go before adjectives." }],
  corrected: "……",
  modelAnswer: "……",
  tips: ["Use a connector."],
};

function reply(content: string, status = 200): Response {
  return new Response(JSON.stringify({ choices: [{ message: { content } }] }), { status });
}

describe("parseFeedback", () => {
  it("reads JSON wrapped in prose or code fences", () => {
    const wrapped = "Here you go:\n```json\n" + JSON.stringify(GOOD) + "\n```";
    expect(parseFeedback(wrapped).score).toBe(72);
  });

  it("fills optional fields and rounds the score", () => {
    const f = parseFeedback(JSON.stringify({ score: "71.6", summary: "ok", modelAnswer: "范文" }));
    expect(f).toMatchObject({ score: 72, wordUse: [], corrections: [], tips: [] });
  });

  it("throws on replies it cannot use", () => {
    expect(() => parseFeedback("Sorry, I can't help with that.")).toThrow();
    expect(() => parseFeedback(JSON.stringify({ score: 50 }))).toThrow();
  });
});

describe("completeWithFallback", () => {
  const base = {
    baseUrl: "https://api.example.test/v1/",
    apiKey: "test-key",
    models: ["a", "b", "c"],
    messages: buildMessages("q99", "坚持、成果、交流、显然、至今", "……"),
    parse: parseFeedback,
  };

  it("uses the first model when it works", async () => {
    const calls: string[] = [];
    const fetchImpl: typeof fetch = async (url, init) => {
      calls.push(JSON.parse(String(init?.body)).model);
      expect(url).toBe("https://api.example.test/v1/chat/completions");
      return reply(JSON.stringify(GOOD));
    };
    const res = await completeWithFallback({ ...base, fetchImpl });
    expect(res.model).toBe("a");
    expect(calls).toEqual(["a"]);
    expect(res.attempts).toEqual([expect.objectContaining({ model: "a", ok: true })]);
  });

  it("moves on after an HTTP error and after an unreadable reply", async () => {
    const fetchImpl: typeof fetch = async (_url, init) => {
      const model = JSON.parse(String(init?.body)).model;
      if (model === "a") return reply("", 503);
      if (model === "b") return reply("I think it is quite good!");
      return reply(JSON.stringify(GOOD));
    };
    const res = await completeWithFallback({ ...base, fetchImpl });
    expect(res.model).toBe("c");
    expect(res.attempts.map((a) => [a.model, a.ok, a.error])).toEqual([
      ["a", false, "HTTP 503"],
      ["b", false, "unreadable reply"],
      ["c", true, undefined],
    ]);
  });

  it("moves on after a network error", async () => {
    const fetchImpl: typeof fetch = async (_url, init) => {
      if (JSON.parse(String(init?.body)).model === "a") throw new TypeError("fetch failed");
      return reply(JSON.stringify(GOOD));
    };
    const res = await completeWithFallback({ ...base, fetchImpl });
    expect(res.model).toBe("b");
    expect(res.attempts[0]).toMatchObject({ model: "a", ok: false, error: "fetch failed" });
  });

  it("reports every attempt when all models fail", async () => {
    const fetchImpl: typeof fetch = async () => reply("", 500);
    await expect(completeWithFallback({ ...base, fetchImpl })).rejects.toSatisfy(
      (e) => e instanceof AllModelsFailed && e.attempts.length === 3,
    );
  });
});

describe("checks", () => {
  it("counts characters as the answer grid does", () => {
    expect(countChars("我 喜欢\n学习。")).toBe(6);
  });

  it("calls about 80 good", () => {
    expect([40, 60, 80, 110, 130].map(lengthState)).toEqual(["short", "good", "good", "good", "long"]);
  });

  it("finds which given words appear", () => {
    expect(wordsUsed("我一直坚持锻炼", ["坚持", "成果"])).toEqual({ 坚持: true, 成果: false });
  });
});
