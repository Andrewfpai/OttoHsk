/**
 * Password hashing with scrypt, from Node's standard library.
 *
 * Stored as "scrypt$<N>$<salt>$<hash>" so the cost can be raised later
 * without breaking existing hashes: verification reads N from the string.
 */
import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb) as (
  password: string,
  salt: Buffer,
  keylen: number,
  options: { N: number; r: number; p: number; maxmem: number },
) => Promise<Buffer>;

const N = 2 ** 15;
const R = 8;
const P = 1;
const KEY_LENGTH = 32;
// scrypt needs 128 * N * r bytes; give it headroom above the 32 MiB that is.
const MAX_MEM = 64 * 1024 * 1024;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, KEY_LENGTH, { N, r: R, p: P, maxmem: MAX_MEM });
  return `scrypt$${N}$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, n, salt64, hash64] = stored.split("$");
  if (scheme !== "scrypt" || !n || !salt64 || !hash64) return false;
  const expected = Buffer.from(hash64, "base64");
  const actual = await scrypt(password, Buffer.from(salt64, "base64"), expected.length, {
    N: Number(n),
    r: R,
    p: P,
    maxmem: MAX_MEM,
  });
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
