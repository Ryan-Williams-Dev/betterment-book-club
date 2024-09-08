import React from "react";
import { TypographyH4, TypographyMuted, TypographySmall } from "./typography";
import Image from "next/image";
import { Book } from "@/types/book";

interface BookCardContentProps {
  book: Book;
}

const BookPreviewBlock: React.FC<BookCardContentProps> = ({ book }) => {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <TypographyH4>{book.volumeInfo.title}</TypographyH4>
          <TypographyMuted>
            by {book.volumeInfo.authors?.join(", ")}
          </TypographyMuted>
          <TypographySmall>
            {book.volumeInfo.description?.substring(0, 100)}...
          </TypographySmall>
        </div>
      </div>
      {book.volumeInfo.imageLinks?.thumbnail && (
        <div className="flex-shrink-0">
          <Image
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
            width={128}
            height={192}
            className="max-w-32 h-auto rounded-sm shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default BookPreviewBlock;
