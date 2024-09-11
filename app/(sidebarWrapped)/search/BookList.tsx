import BookInfoDialog from "@/components/BookInfoDialog";
import BookPreviewBlock from "@/components/BookPreviewBlock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Book } from "@/types/book";
import { Plus } from "lucide-react";
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
          className="min-w-[200px] min-h-24 dark:hover:bg-zinc-900 hover:shadow-md pt-8 flex flex-col"
        >
          <CardContent className="flex flex-row">
            <BookPreviewBlock book={book} />
          </CardContent>
          <CardFooter className="gap-4 mt-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button className="">
                    <Plus size={24} />
                  </Button>
                </TooltipTrigger>

                <TooltipContent sideOffset={8}>Add to Bookshelf</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <BookInfoDialog
              book={book}
              triggerButton={
                <Button className="w-full" variant="outline">
                  Read More
                </Button>
              }
            />
          </CardFooter>
        </Card>
      ))}
    </ul>
  );
};

export default BookList;
