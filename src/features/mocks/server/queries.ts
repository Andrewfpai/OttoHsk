import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { type MockTest, mockTests } from "@/db/schema";
import { requireUser } from "@/lib/auth-guard";

export type MockRow = Pick<
  MockTest,
  "id" | "takenOn" | "label" | "listening" | "reading" | "writing"
>;

/** Oldest first, the order a trend reads in. */
export async function getMocks(): Promise<MockRow[]> {
  const user = await requireUser();
  return db
    .select({
      id: mockTests.id,
      takenOn: mockTests.takenOn,
      label: mockTests.label,
      listening: mockTests.listening,
      reading: mockTests.reading,
      writing: mockTests.writing,
    })
    .from(mockTests)
    .where(eq(mockTests.userId, user.id))
    .orderBy(asc(mockTests.takenOn), asc(mockTests.createdAt));
}
