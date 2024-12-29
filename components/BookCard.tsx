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
import BookInfoDialog from "./BookInfoDialog";

interface BookCardProps {
  userId: string;
  book: Book;
  title?: string;
  currentPage?: number;
  primaryAction:
    | "Mark as Reading"
    | "Remove from Library"
    | "Add to Library"
    | "Mark as Read"
    | "Add progress";
  secondaryAction: "More Details";
}

function BookCard({
  userId,
  book,
  title,
  currentPage,
  primaryAction,
  secondaryAction,
}: BookCardProps) {
  const progressPercent = currentPage
    ? Math.round((currentPage / book.volumeInfo.pageCount) * 100)
    : null;

  const handlePrimaryAction = async () => {
    switch (primaryAction) {
      case "Mark as Reading":
        // Implement the logic for marking the book as reading
        console.log("Marking as reading");
        break;
      case "Remove from Library":
        // Implement the logic for removing the book from the library
        console.log("Removing from library");
        break;
      case "Add to Library":
        // Implement the logic for adding the book to the library
        console.log("Adding to library");
        break;
      case "Mark as Read":
        // Implement the logic for marking the book as read
        console.log("Marking as read");
        break;
      case "Add progress":
        // Implement the logic for adding progress to the book
        console.log("Adding progress");
        break;
      default:
        break;
    }
  };

  return (
    <Card key={book.id} className="min-w-[200px] min-h-24">
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
        <Button className="w-full" onClick={handlePrimaryAction}>
          {primaryAction}
        </Button>
        {secondaryAction === "More Details" && (
          <BookInfoDialog
            book={book}
            triggerButton={
              <Button variant="outline" className="w-full">
                More Details
              </Button>
            }
          />
        )}
      </CardFooter>
    </Card>
  );
}

export default BookCard;
