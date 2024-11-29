import React from "react";
import { TypographyH4, TypographyMuted, TypographySmall } from "./typography";
import Image from "next/image";
import { Book } from "@/types/book";
import htmlDecoder from "@/utils/htmlDecoder";

interface BookCardContentProps {
  book: Book;
}

const BookPreviewBlock: React.FC<BookCardContentProps> = ({ book }) => {
  return (
    <div className="flex flex-row flex-wrap gap-6">
      <div className="flex-shrink-0">
        <Image
          src={
            book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
              ? book.volumeInfo.imageLinks.thumbnail
              : "/book-placeholder.gif"
          }
          alt={book.volumeInfo.title}
          width={128}
          height={192}
          className="max-w-32 h-auto rounded-sm shadow-md"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-32">
        <div>
          <TypographyH4>
            {book.volumeInfo.title.length > 30
              ? book.volumeInfo.title.substring(0, 30) + "..."
              : book.volumeInfo.title}
          </TypographyH4>
          <TypographyMuted>
            by{" "}
            {book.volumeInfo.authors &&
            book.volumeInfo.authors.join(", ").length > 30
              ? book.volumeInfo.authors.join(", ").substring(0, 30) + "..."
              : book.volumeInfo.authors?.join(", ")}{" "}
          </TypographyMuted>

          {/* Create a new element that shows the books review score and shows the score out of 5 as stars. */}

          <div className="flex">
            <TypographyMuted>
              {book.volumeInfo.averageRating
                ? book.volumeInfo.averageRating + " / 5"
                : "No rating"}
            </TypographyMuted>
          </div>

          <TypographySmall>
            {book.searchInfo?.textSnippet
              ? htmlDecoder(book.searchInfo.textSnippet.substring(0, 70)) +
                "..."
              : "No description available"}
          </TypographySmall>
        </div>
      </div>
    </div>
  );
};

export default BookPreviewBlock;
