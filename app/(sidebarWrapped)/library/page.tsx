"use client";

import BookPreviewBlock from "@/components/BookPreviewBlock";
import { TypographyH1, TypographyLarge } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { Book } from "@/types/book";
import React from "react";

const LibraryPage: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const { data: session, isPending, error } = useSession();
  const userId = session?.user?.id;
  const [bookList, setBookList] = React.useState<Book[]>([]);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (bookList.length > 0) {
      setLoading(false);
    }
  }, [bookList]);

  const handleRemoveBook = async (isbn: string) => {
    const response = await fetch(`/api/library?userId=${userId}&isbn=${isbn}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to remove book from library:", response.statusText);
      return;
    }

    const updatedBookList = bookList.filter(
      (book) =>
        !book.volumeInfo.industryIdentifiers.some(
          (identifier) => identifier.identifier === isbn
        )
    );
    setBookList(updatedBookList);
  };

  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      <TypographyH1>Library</TypographyH1>
      <div className="my-4 border-b"></div>
      {loading && <TypographyLarge>Loading...</TypographyLarge>}
      {!loading && (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-4">
          {bookList.map((book) => (
            <Card
              key={book.id}
              className="min-w-[200px] min-h-24 pt-8 flex flex-col"
            >
              <CardContent>
                <BookPreviewBlock book={book} />
              </CardContent>

              <CardFooter className="flex justify-between gap-2">
                <Button className="flex-1 w-full">Mark as Reading</Button>
                <Button
                  className="flex-1 w-full"
                  variant="destructive"
                  onClick={() => handleRemoveBook(book.id)}
                >
                  Remove from Library
                </Button>
              </CardFooter>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LibraryPage;
