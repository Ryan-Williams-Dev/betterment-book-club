"use client";

import BookCard from "@/components/BookCard";
import { TypographyH1, TypographyLarge } from "@/components/typography";
import { useSession } from "@/lib/auth-client";
import { Book } from "@/types/book";
import { useEffect, useState } from "react";
import fetchBooksByIsbn from "@/utils/fetchBooksByIsbn";

const LibraryPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session, isPending, error } = useSession();
  const userId = session?.user?.id;
  const [bookList, setBookList] = useState<Book[]>([]);
  const [userLibrary, setUserLibrary] = useState<any>();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || "";

  useEffect(() => {
    const fetchLibraryBooks = async () => {
      const response = await fetch(`/api/library?userId=${userId}`);
      if (!response.ok) {
        console.error("Failed to fetch library books:", response.statusText);
        return;
      }

      const data = await response.json();
      setUserLibrary(data);
    };

    fetchLibraryBooks();
  }, [userId]);

  useEffect(() => {
    if (userLibrary) {
      const isbnList = userLibrary.map((book: any) => book.isbn);
      try {
        fetchBooksByIsbn(isbnList, apiKey).then((books) => {
          setBookList(books);
        });
      } catch (error) {
        console.error("Failed to fetch books by ISBN:", error);
        throw new Error("Failed to fetch books by ISBN.");
      }
    }
  }, [userLibrary, apiKey]);

  useEffect(() => {
    if (bookList.length > 0) {
      setLoading(false);
    }
  }, [bookList]);

  // console.log(userLibrary);

  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      <TypographyH1>Library</TypographyH1>
      <div className="my-4 border-b"></div>
      {loading && <TypographyLarge>Loading...</TypographyLarge>}
      {!loading && (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-4">
          {bookList.map((book, idx) => (
            <BookCard
              key={book.id}
              userId={userId}
              book={book}
              primaryAction={
                userLibrary[idx]?.isReading ? "Add progress" : "Mark as reading"
              }
              secondaryAction="Remove from Library"
              isReading={userLibrary[idx]?.isReading}
              isFinished={userLibrary[idx]?.isFinished}
              currentPage={userLibrary[idx]?.currentPage}
              inLibrary
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default LibraryPage;
