import BookPreviewBlock from "@/components/BookPreviewBlock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Book } from "@/types/book";
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
          className="min-w-[200px] min-h-24 dark:hover:bg-zinc-900 hover:shadow-md pt-8"
        >
            <CardContent className="flex flex-row">
              <BookPreviewBlock book={book} />
            </CardContent>
            <CardFooter className="gap-4">
              <Button className="w-full">Add to List</Button>
              <Button className="w-full" variant="outline">Read More</Button>
            </CardFooter>
        </Card>
      ))}
    </ul>
  );
};

export default BookList;
