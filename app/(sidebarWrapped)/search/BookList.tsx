import BookInfoDialog from "@/components/BookInfoDialog";
import BookPreviewBlock from "@/components/BookPreviewBlock";
import { TypographyLarge } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book } from "@/types/book";
import React from "react";

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
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
            <Button className="flex-1">Add to Library</Button>
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
