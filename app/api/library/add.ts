// pages/api/library/add.ts
import { db } from "@/db";
import { userLibrary } from "@/db/schema";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, bookId, isbn } = req.body;

    try {
      await db.insert(userLibrary).values({
        id: crypto.randomUUID(),
        userId,
        bookId,
        isbn,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({ message: "Book added to library." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add book to library." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
