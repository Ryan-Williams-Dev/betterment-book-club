// Implement a function that updates the book in the library to mark it as reading.

import { db } from "@/db/index";
import { userLibrary } from "@/db/schema";
import { eq, and } from "drizzle-orm";

const markBookAsReading = async (userId: string, isbn: string) => {
  try {
    const result = await db
      .update(userLibrary)
      .set({ isReading: true })
      .where(and(eq(userLibrary.userId, userId), eq(userLibrary.isbn, isbn)))
      .execute();

    return result;
  } catch (error) {
    console.error("Error marking book as reading:", error);
    throw new Error("Failed to mark book as reading.");
  }
};

export default markBookAsReading;
