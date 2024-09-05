import {
  TypographyH4,
  TypographyMuted,
  TypographySmall,
} from "@/components/typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Book } from "@/types/book";
import Image from "next/image";
import React from "react";

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <Card
          key={book.id}
          className="min-w-[200px] min-h-24 dark:hover:bg-zinc-900 hover:shadow-md"
        >
          <CardHeader>
            <TypographyH4>{book.volumeInfo.title}</TypographyH4>
            <TypographyMuted>
              by {book.volumeInfo.authors?.join(", ")}
            </TypographyMuted>
          </CardHeader>
          <div className="flex flex-row space-between gap-6">
            <CardContent className="flex flex-row">
              <TypographySmall>
                {book.volumeInfo.description?.substring(0, 100)}...
              </TypographySmall>
            </CardContent>
            <CardContent>
              <Image
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "/book-placeholder.gif"
                }
                alt={book.volumeInfo.title}
                width={128}
                height={192}
                className="max-w-32 h-auto rounded-sm shadow-md"
              />
            </CardContent>
          </div>
        </Card>
      ))}
    </ul>
  );
};

export default BookList;
