import React from "react";
import { TypographyH4, TypographyMuted, TypographySmall } from "./typography";
import Image from "next/image";
import { Book } from "@/types/book";

interface BookCardContentProps {
  book: Book;
}

const BookPreviewBlock: React.FC<BookCardContentProps> = ({ book }) => {
  return (
    <div className="flex flex-row gap-6">
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
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <TypographyH4>{book.volumeInfo.title.length > 30 ? book.volumeInfo.title.substring(0, 30) + "..." : book.volumeInfo.title}</TypographyH4>
          <TypographyMuted>
            by {book.volumeInfo.authors?.join(", ")}
          </TypographyMuted>
          {/* I want to refactor the description substring adjust it's length based on the card size and screen size */}
          
          <TypographySmall>
            { book.volumeInfo.description ? book.volumeInfo.description?.substring(0, 100) + "..." : "No description available"}
          </TypographySmall>
        </div>
      </div>
    </div>
  );
};

export default BookPreviewBlock;