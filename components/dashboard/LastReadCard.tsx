import { Book } from "@/types/book";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TypographyMuted } from "../typography";
import BookPreviewBlock from "../BookPreviewBlock";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import BookInfoDialog from "../BookInfoDialog";

interface LastReadCardProps {
  book: Book;
  pageNumber: number;
}

const LastReadCard: React.FC<LastReadCardProps> = ({
  book,
  pageNumber = 0,
}) => {
  const progress = Math.round((pageNumber / book.volumeInfo.pageCount) * 100);

  return (
    <Card className="flex-1 min-w-[200px] dark:hover:bg-zinc-900 hover:shadow-md">
      <CardHeader>
        <CardTitle>Last Read</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <BookPreviewBlock book={book} />
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
      </CardContent>
      <CardFooter className="flex flex-row justify-between gap-4">
        <Button className="w-full">Add Progress</Button>
        <BookInfoDialog
          book={book}
          triggerButton={
            <Button variant="outline" className="w-full">
              More Details
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
};

export default LastReadCard;
