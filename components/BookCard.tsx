// I want to create a book card component that is reusable across the application. The component should start with an optional prop that will display a title at the top. Next will be the book preview block, this is not optional and will accept a book object. Next will be an optional progress bar, showing both a bar as a percentage completion and the page number out of the total pages. Next will be required footer block, which will show always two buttons, one with a call to action key that will be one of: "Mark as Reading", "Remove from Library", "Add to Library", "Mark as Read", "Add progress". The other button will be a secondary action, more info on the book, or take to book discussion hub.

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Book } from "@/types/book";
import BookPreviewBlock from "@/components/BookPreviewBlock";
import { Progress } from "@/components/ui/progress";
import { TypographyMuted } from "@/components/typography";
import { Button } from "@/components/ui/button";

interface BookCardProps {
  book: Book;
  title?: string;
  currentPage?: number;
  primaryAction:
    | "Mark as Reading"
    | "Remove from Library"
    | "Add to Library"
    | "Mark as Read"
    | "Add progress";
  secondaryAction: string;
}

function BookCard({
  book,
  title,
  currentPage,
  primaryAction,
  secondaryAction,
}: BookCardProps) {
  const progressPercent = currentPage
    ? Math.round((currentPage / book.volumeInfo.pageCount) * 100)
    : null;
  return (
    <Card key={book.id} className="min-w-[200px] min-h-24 pt-8 flex flex-col">
      {title && <CardHeader>{<CardTitle>{title}</CardTitle>}</CardHeader>}
      <CardContent>
        <BookPreviewBlock book={book} />
        {progressPercent && (
          <div className="mt-4">
            <div className="flex flex-row w-full space-between">
              <span className="flex-1">
                <TypographyMuted>
                  Page {currentPage} of {book.volumeInfo.pageCount}
                </TypographyMuted>
              </span>
              <span>
                <TypographyMuted>{progressPercent}%</TypographyMuted>
              </span>
            </div>

            <Progress value={progressPercent} className="w-full mt-1" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-row justify-between gap-4">
        <Button className="w-full">{primaryAction}</Button>
        <Button variant="outline" className="w-full">
          {secondaryAction}{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default BookCard;
