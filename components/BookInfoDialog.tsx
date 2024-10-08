import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Book } from "@/types/book";
import Image from "next/image";
import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLarge,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from "./typography";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface BookInfoDialogProps {
  triggerButton: ReactNode;
  book: Book;
}

// This is a dialog that displays information about a book, I want this coponent to recieve the book object as a prop and display the book title, author, and genre in the dialog content. I want this component to take in a TriggerButton prop that will be used to open the dialog when clicked. The TriggerButton prop should be a ReactNode and will be a button component from my button component in the ui folder.

const BookInfoDialog = ({ book, triggerButton }: BookInfoDialogProps) => {
  console.log(book.volumeInfo.categories);
  return (
    <Dialog>
      <DialogTrigger className="w-full">{triggerButton}</DialogTrigger>
      <DialogContent className="w-4/5 md:w-auto max-w-4xl mx-auto rounded-md max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex flex-row gap-4 border-b-zinc-500">
            <Image
              className="rounded-md shadow-md max-w-100% h-auto"
              height={300}
              width={200}
              src={
                book.volumeInfo.imageLinks?.extraLarge ||
                book.volumeInfo.imageLinks?.large ||
                book.volumeInfo.imageLinks?.thumbnail ||
                "/book-placeholder.gif"
              }
              alt={book.volumeInfo.title}
            />

            <div className="flex flex-col gap-2 text-left">
              <TypographyH3>{book.volumeInfo.title}</TypographyH3>
              {book.volumeInfo.authors && (
                <TypographyMuted>
                  by {book.volumeInfo.authors?.join(", ")}
                </TypographyMuted>
              )}
              {book.volumeInfo.categories && (
                <TypographyLarge>
                  {"Topics: "}
                  {book.volumeInfo.categories.join(", ")}
                </TypographyLarge>
              )}
              <TypographySmall>
                {book.volumeInfo.pageCount} Pages
              </TypographySmall>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription className="flex-grow overflow-y-auto max-h-80">
          <TypographyP>
            {book.volumeInfo.description || "No description available"}
          </TypographyP>
        </DialogDescription>

        <div className="flex-shrink-0">
          <Button className="w-full" variant="outline">
            Buy Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookInfoDialog;
