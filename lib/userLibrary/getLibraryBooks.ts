import { db } from "@/db";
import { userLibrary } from "@/db/schema";
import { eq, is } from "drizzle-orm";

const getLibraryBooks = async (userId: string) => {
  let books = [];

  try {
    books = await db
      .select({
        isbn: userLibrary.isbn,
        isReading: userLibrary.isReading,
        isFinished: userLibrary.isFinished,
        currentPage: userLibrary.currentPage,
        lastReadAt: userLibrary.lastReadAt,
      })
      .from(userLibrary)
      .where(eq(userLibrary.userId, userId))
      .execute();
  } catch (error) {
    console.error("Error fetching library books:", error);
    throw new Error("Failed to fetch library books.");
  }

  return books;
};

export default getLibraryBooks;
