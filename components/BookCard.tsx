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
import Link from "next/link";
import { usePageContext } from "@/components/sidebar-wrapper";
import { BookCheck, BookMinus, EllipsisVertical, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

interface BookCardProps {
  userId: string;
  book: Book;
  title?: string;
  currentPage?: number;
  isReading?: boolean;
  isFinished?: boolean;
  inLibrary?: boolean;
  primaryAction:
    | "Mark as reading"
    | "Add to Library"
    | "Mark as finished"
    | "Add progress";
  secondaryAction: "More Details" | "Remove from Library";
}

function BookCard({
  userId,
  book,
  title,
  currentPage,
  isReading,
  inLibrary = false,
  primaryAction,
  secondaryAction,
}: BookCardProps) {
  const progressPercent =
    isReading && currentPage
      ? Math.round((currentPage / book.volumeInfo.pageCount) * 100)
      : null;
  const { toast } = useToast();
  const { setCurrentPage } = usePageContext();

  const handlePrimaryAction = async () => {
    switch (primaryAction) {
      case "Mark as reading":
        handleMarkAsReading(book, userId, toast);
        console.log("Marking as reading");
        break;
      case "Add to Library":
        handleAddToLibrary(book, userId, toast);
        console.log("Adding to library");
        break;
      case "Mark as finished":
        handleMarkAsFinished(book, userId, toast);
        console.log("Marking as read");
        break;
      case "Add progress":
        handleAddProgress(book, userId, toast);
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
    <Card
      key={book.id}
      className="min-w-[200px] min-h-24 flex flex-col justify-between"
    >
      {title && <CardHeader>{<CardTitle>{title}</CardTitle>}</CardHeader>}
      <CardContent className={title ? undefined : "pt-6 flex-grow"}>
        <BookPreviewBlock book={book} />
        {progressPercent !== null && (
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
        {/* <Button onClick={handlePrimaryAction}>{primaryAction}</Button> */}
        {inLibrary ? (
          isReading ? (
            <Button>Add Progress</Button>
          ) : (
            <Button>Mark as Reading</Button>
          )
        ) : (
          <Button>Add to Library</Button>
        )}
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="px-2">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <BookCheck />
              <span className="ml-2">Mark As Finished</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Info />
              <span className="ml-2">Book Details</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <BookMinus />
              <span className="ml-2">Remove From Library</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
      <Button className="mx-6 mb-6">
        <div onClick={() => setCurrentPage("/community")}>
          <Link
            href={`/community/${
              book.volumeInfo.industryIdentifiers.find(
                (identifier) => identifier.type === "ISBN_13"
              )?.identifier
            }`}
          >
            View Threads
          </Link>
        </div>
      </Button>
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

const handleMarkAsReading = async (book: Book, userId: string, toast: any) => {
  // Implement marking as reading
  const response = await fetch("/api/library", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      isbn: book.volumeInfo.industryIdentifiers.find(
        (identifier) => identifier.type === "ISBN_13"
      )?.identifier,
      markAsReading: true,
    }),
  });

  if (response.ok) {
    toast({
      title: "Book marked as reading",
    });
  } else {
    toast({
      title: "Error",
      description: (await response.json()).error,
    });
  }
};

const handleAddProgress = async (book: Book, userId: string, toast: any) => {
  // Implement adding progress
};

const handleMarkAsFinished = async (book: Book, userId: string, toast: any) => {
  // Implement marking as finished
};

export default BookCard;
