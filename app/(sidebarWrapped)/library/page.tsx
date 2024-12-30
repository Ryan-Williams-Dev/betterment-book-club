"use client";

import BookCard from "@/components/BookCard";
import BookPreviewBlock from "@/components/BookPreviewBlock";
import { TypographyH1, TypographyLarge } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { Book } from "@/types/book";
import { useEffect, useState } from "react";

const LibraryPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session, isPending, error } = useSession();
  const userId = session?.user?.id;
  const [bookList, setBookList] = useState<Book[]>([]);

  useEffect(() => {
    const fetchLibraryBooks = async () => {
      const response = await fetch(`/api/library?userId=${userId}`);
      if (!response.ok) {
        console.error("Failed to fetch library books:", response.statusText);
        return;
      }

      const data = await response.json();
      setBookList(data);
    };

    fetchLibraryBooks();
  }, [userId]);

  useEffect(() => {
    if (bookList.length > 0) {
      setLoading(false);
    }
  }, [bookList]);

  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      <TypographyH1>Library</TypographyH1>
      <div className="my-4 border-b"></div>
      {loading && <TypographyLarge>Loading...</TypographyLarge>}
      {!loading && (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-4">
          {bookList.map((book) => (
            <BookCard
              key={book.id}
              userId={userId}
              book={book}
              primaryAction="Add progress"
              secondaryAction="Remove from Library"
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default LibraryPage;
