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
      <DialogContent className="w-4/5 md:w-auto max-h-[80vh] max-w-4xl mx-auto overflow-y-auto">
        <div className="flex flex-row gap-4 border-b-zinc-500">
          <Image
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

          <div className="flex flex-col gap-2">
            <TypographyH3>{book.volumeInfo.title}</TypographyH3>
            {book.volumeInfo.authors && (
              <TypographyMuted>
                by {book.volumeInfo.authors?.join(", ")}
              </TypographyMuted>
            )}
            {book.volumeInfo.categories && (
              <TypographyLarge>
                Genre: {book.volumeInfo.categories.join(", ")}
              </TypographyLarge>
            )}
            <TypographySmall>{book.volumeInfo.pageCount} Pages</TypographySmall>
          </div>
        </div>
        <div className="overflow-y-scroll">
          <TypographyP>
            {book.volumeInfo.description || "No description available"}
          </TypographyP>
        </div>
        <div>
          <Button className="w-full" variant="outline">
            Buy Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookInfoDialog;
