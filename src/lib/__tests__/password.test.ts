import { describe, expect, it } from "vitest";

import { hashPassword, verifyPassword } from "../password";

describe("password hashing", () => {
  it("verifies the right password and rejects others", async () => {
    const stored = await hashPassword("belajar-hsk5");
    expect(stored).toMatch(/^scrypt\$\d+\$/);
    expect(stored).not.toContain("belajar-hsk5");
    expect(await verifyPassword("belajar-hsk5", stored)).toBe(true);
    expect(await verifyPassword("belajar-hsk6", stored)).toBe(false);
  });

  it("salts, so the same password hashes differently each time", async () => {
    expect(await hashPassword("same")).not.toBe(await hashPassword("same"));
  });

  it("rejects a malformed stored value instead of throwing", async () => {
    expect(await verifyPassword("x", "not-a-hash")).toBe(false);
  });
});
