import { db } from "@/db";
import { userLibrary } from "@/db/schema";
import { eq, and } from "drizzle-orm";

const removeBookFromLibrary = async (userId: string, isbn: string) => {
  try {
    const result = await db
      .delete(userLibrary)
      .where(and(eq(userLibrary.userId, userId), eq(userLibrary.isbn, isbn)))
      .execute();

    return result;
  } catch (error) {
    console.error("Error removing book from library:", error);
    throw new Error("Failed to remove book from library.");
  }
};

export default removeBookFromLibrary;
