"use client";

import BookInfoDialog from "@/components/BookInfoDialog";
import BookPreviewBlock from "@/components/BookPreviewBlock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { Book } from "@/types/book";
import React from "react";

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const { data: session, isPending, error } = useSession();

  const handleAddToLibrary = async (book: Book) => {
    const response = await fetch("/api/library", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user.id,
        bookId: book.id,
        isbn: book.volumeInfo.industryIdentifiers.find(
          (identifier) => identifier.type === "ISBN_13"
        )?.identifier,
      }),
    });

    if (response.ok) {
      alert("Book added to library.");
    } else {
      alert("Failed to add book to library.");
    }
  };

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-4">
      {books.map((book) => (
        <Card
          key={book.id}
          className="min-w-[200px] min-h-24 pt-8 flex flex-col"
        >
          <CardContent className="flex flex-row">
            <BookPreviewBlock book={book} />
          </CardContent>
          <CardFooter className="gap-4 flex w-full mt-auto">
            <Button className="flex-1" onClick={() => handleAddToLibrary(book)}>
              Add to Library
            </Button>
            <div className="flex-1">
              <BookInfoDialog
                book={book}
                triggerButton={
                  <Button className="w-full" variant="outline">
                    More Info
                  </Button>
                }
                isReading
              />
            </div>
          </CardFooter>
        </Card>
      ))}
    </ul>
  );
};

export default BookList;
