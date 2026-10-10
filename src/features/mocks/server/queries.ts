import { and, asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { type MockTest, mockTests } from "@/db/schema";
import { requireUser } from "@/lib/auth-guard";

export type MockRow = Pick<
  MockTest,
  "id" | "takenOn" | "label" | "listening" | "reading" | "writing"
>;

/** The learner's current level's mocks, oldest first: the order a trend reads in. */
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
    .where(and(eq(mockTests.userId, user.id), eq(mockTests.level, user.level)))
    .orderBy(asc(mockTests.takenOn), asc(mockTests.createdAt));
}
