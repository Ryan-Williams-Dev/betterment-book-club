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
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";

interface BookCardProps {
  userId: string;
  book: Book;
  title?: string;
  currentPage?: number;
  primaryAction:
    | "Mark as Reading"
    | "Add to Library"
    | "Mark as Read"
    | "Add progress";
  secondaryAction: "More Details" | "Remove from Library";
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
  const { toast } = useToast();

  const handlePrimaryAction = async () => {
    switch (primaryAction) {
      case "Mark as Reading":
        console.log("Marking as reading");
        break;
      case "Add to Library":
        handleAddToLibrary(book, userId, toast);
        console.log("Adding to library");
        break;
      case "Mark as Read":
        console.log("Marking as read");
        break;
      case "Add progress":
        console.log("Adding progress");
        break;
      default:
        break;
    }
  };

  const handleSecondaryAction = async () => {
    switch (secondaryAction) {
      case "More Details":
        console.log("Showing more details");
        break;
      case "Remove from Library":
        handleRemoveFromLibrary(book, userId, toast);
        console.log("Removing from library");
        break;
      default:
        break;
    }
  };

  return (
    <Card key={book.id} className="min-w-[200px] min-h-24">
      {title && <CardHeader>{<CardTitle>{title}</CardTitle>}</CardHeader>}
      <CardContent className={title ? undefined : "pt-6"}>
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
        {secondaryAction === "Remove from Library" && (
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSecondaryAction}
          >
            Remove from Library
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

const handleAddToLibrary = async (book: Book, userId: string, toast: any) => {
  const response = await fetch("/api/library", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      isbn: book.volumeInfo.industryIdentifiers.find(
        (identifier) => identifier.type === "ISBN_13"
      )?.identifier,
    }),
  });

  if (response.ok) {
    toast({
      title: "Book added to library",
      action: (
        <ToastAction
          altText="Go to library"
          onClick={() => {
            // Navigate to library
          }}
        >
          View Library
        </ToastAction>
      ),
    });
  } else {
    toast({
      title: "Error",
      description: (await response.json()).error,
    });
  }
};

const handleRemoveFromLibrary = async (
  book: Book,
  userId: string,
  toast: any
) => {
  const response = await fetch("/api/library", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      isbn: book.volumeInfo.industryIdentifiers.find(
        (identifier) => identifier.type === "ISBN_13"
      )?.identifier,
    }),
  });

  if (response.ok) {
    toast({
      title: "Book removed from library",
    });
  } else {
    toast({
      title: "Error",
      description: (await response.json()).error,
    });
  }
};

export default BookCard;
