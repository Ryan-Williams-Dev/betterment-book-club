import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TypographyH4,
  TypographySmall,
  TypographyMuted,
} from "@/components/typography";
import Image from "next/image";
import { Book } from "@/types/book";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface BookCardProps {
  book: Book;
  cardTitle?: string;
  isReading?: boolean;
  pageNumber?: number;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  isReading = false,
  pageNumber = 0,
  cardTitle = "",
}) => {
  const progress = Math.round((pageNumber / book.volumeInfo.pageCount) * 100);

  return (
    <Card className="min-w-[200px] dark:hover:bg-zinc-900 hover:shadow-md">
      <CardHeader>{cardTitle && <CardTitle>{cardTitle}</CardTitle>}</CardHeader>
      <CardContent className="flex flex-col gap-4">
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
        {isReading && (
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
        )}
      </CardContent>
      <CardFooter className="flex flex-row justify-between gap-4">
        {isReading && <Button className="w-full">Add Progress</Button>}
        <Button variant="outline" className="w-full">
          More Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
