import { afterEach, describe, expect, it, vi } from "vitest";

import { DEFAULT_MODELS, aiConfig } from "../ai";

afterEach(() => vi.unstubAllEnvs());

describe("aiConfig", () => {
  it("is off without a key", () => {
    vi.stubEnv("AI_API_KEY", "");
    expect(aiConfig()).toBeNull();
  });

  it("strips a pasted 'Bearer ' prefix so the header is not doubled", () => {
    vi.stubEnv("AI_API_KEY", "  Bearer sk-test123  ");
    expect(aiConfig()?.apiKey).toBe("sk-test123");
  });

  it("uses the default model order unless AI_MODELS overrides it", () => {
    vi.stubEnv("AI_API_KEY", "sk-test");
    vi.stubEnv("AI_MODELS", "");
    expect(aiConfig()?.models).toEqual(DEFAULT_MODELS);
    vi.stubEnv("AI_MODELS", " b , a ,");
    expect(aiConfig()?.models).toEqual(["b", "a"]);
  });
});
