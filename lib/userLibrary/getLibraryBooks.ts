import { db } from "@/db";
import { userLibrary } from "@/db/schema";
import { eq } from "drizzle-orm";

const getLibraryBooks = async (userId: string) => {
  let isbnList = [];

  try {
    const books = await db
      .select({
        isbn: userLibrary.isbn,
      })
      .from(userLibrary)
      .where(eq(userLibrary.userId, userId))
      .execute();

    isbnList = books.map((book) => book.isbn);
  } catch (error) {
    console.error("Error fetching library books:", error);
    throw new Error("Failed to fetch library books.");
  }

  // Fetch books from google books API
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || "";
  const fetchedBooks = await fetchBooksByIsbn(isbnList, apiKey);

  return fetchedBooks;
};

export default getLibraryBooks;

async function fetchBooksByIsbn(isbnList: string[], apiKey: string) {
  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  const books = [];

  for (const isbn of isbnList) {
    const response = await fetch(`${baseUrl}?q=isbn:${isbn}&key=${apiKey}`);
    if (!response.ok) {
      console.error(
        `Failed to fetch book with ISBN ${isbn}:`,
        response.statusText
      );
      continue;
    }

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      books.push(data.items[0]);
    }
  }

  return books;
}
