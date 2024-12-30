"use client";

import BookInfoDialog from "@/components/BookInfoDialog";
import BookPreviewBlock from "@/components/BookPreviewBlock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";
import { Book } from "@/types/book";
import React from "react";
import BookCard from "@/components/BookCard";

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const { data: session, isPending, error } = useSession();

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(310px,1fr))] gap-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          userId={session?.user?.id}
          book={book}
          primaryAction="Add to Library"
          secondaryAction="More Details"
        />
      ))}
    </ul>
  );
};

export default BookList;
