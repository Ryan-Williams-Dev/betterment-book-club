"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import fetchBooksByIsbn from "@/utils/fetchBooksByIsbn";

import ThreadPreview from "@/components/ThreadPreview";

export default function BookCommunityPage() {
  const { isbn } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // useffectfor fetching book data
  useEffect(() => {
    if (!isbn) return;
    const fetchBook = async () => {
      try {
        const books = await fetchBooksByIsbn(
          Array.isArray(isbn) ? isbn : [isbn],
          process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || ""
        );
        setBook(books[0]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch book by ISBN:", error);
      }
    };

    fetchBook();
  }, [isbn]);

  // Dummy data for now
  const threads = [
    {
      id: 1,
      title: "Favorite Quotes",
      content: "Share your favorite quotes from this book.",
    },
    {
      id: 2,
      title: "Key Takeaways",
      content:
        "What are the most impactful lessons you've learned? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.",
    },
    {
      id: 3,
      title: "Chapter Discussions",
      content: "Let's break down each chapter in detail.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Community Discussion for {loading ? "Loading" : book?.volumeInfo.title}
      </h1>
      {threads.length === 0 ? (
        <p className="text-gray-500">No discussions yet. Start one!</p>
      ) : (
        threads.map((thread) => (
          <ThreadPreview key={thread.id} thread={thread} />
        ))
      )}
      <Button className="mt-4 w-full">Start a New Discussion</Button>
      <div className="mt-4">
        <Link href="/community">
          <Button variant="link">Back to Community</Button>
        </Link>
      </div>
    </div>
  );
}
