import { db } from "@/db/index";
import { userLibrary } from "@/db/schema";

export const addBookToLibrary = async (userId: string, isbn: string) => {
  try {
    const result = await db
      .insert(userLibrary)
      .values({
        id: crypto.randomUUID(),
        userId,
        isbn,
      })
      .returning({ id: userLibrary.id });

    return result;
  } catch (error) {
    console.error("Error adding book to library:", error);
    throw new Error("Failed to add book to library.");
  }
};
