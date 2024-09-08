import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyMuted } from "@/components/typography";
import { Book } from "@/types/book";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import BookPreviewBlock from "./BookPreviewBlock";

interface BookCardProps {
  book: Book;
  cardTitle?: string;
  isReading?: boolean;
  pageNumber?: number;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  isReading = false,
  pageNumber = 0,
  cardTitle = "",
}) => {
  const progress = Math.round((pageNumber / book.volumeInfo.pageCount) * 100);

  return (
    <Card className="min-w-[200px] dark:hover:bg-zinc-900 hover:shadow-md">
      <CardHeader>{cardTitle && <CardTitle>{cardTitle}</CardTitle>}</CardHeader>
      <CardContent className="">
        <BookPreviewBlock book={book} />
        {isReading && (
          <div className="mt-4">
            <div className="flex flex-row w-full space-between">
              <span className="flex-1">
                <TypographyMuted>
                  Page {pageNumber} of {book.volumeInfo.pageCount}
                </TypographyMuted>
              </span>
              <span>
                <TypographyMuted>{progress}%</TypographyMuted>
              </span>
            </div>

            <Progress value={progress} className="w-full mt-1" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-row justify-between gap-4">
        {isReading && <Button className="w-full">Add Progress</Button>}
        <Button variant="outline" className="w-full">
          More Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
