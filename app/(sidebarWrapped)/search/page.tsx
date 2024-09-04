"use client";
import { useState } from "react";
import {
  TypographyH1,
  TypographyH4,
  TypographyMuted,
  TypographySmall,
} from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    language: string;
  };
}

const SearchPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [books, setBooks] = useState<Book[]>([]); // Adjust type if you have a specific type for books
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Construct the query string with the user's input
      const titleQuery = title ? `intitle:${encodeURIComponent(title)}` : "";
      const authorQuery = author
        ? `inauthor:${encodeURIComponent(author)}`
        : "";
      const genreQuery = genre ? `subject:${encodeURIComponent(genre)}` : "";

      let queryParams = ["langRestrict=en", "printType=books"];

      const searchQuery = [titleQuery, authorQuery, genreQuery]
        .filter(Boolean)
        .join("+");

      if (searchQuery) {
        queryParams.push(`q=${searchQuery}`);
      }

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

      console.log(queryParams.join("&"));

      // Fetch books with the constructed query string
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?${queryParams.join(
          "&"
        )}&key=${apiKey}`
      );
      const data = await response.json();

      // Filter books to include only those with volumeInfo.language set to 'en'

      const filteredBooks: Book[] = (data.items || []).filter(
        (book: Book) => book.volumeInfo.language === "en"
      );

      setBooks(filteredBooks);
      console.log(filteredBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <TypographyH1>Search Books</TypographyH1>
      <div className="flex flex-col gap-4 mb-8">
        <TypographyH4>Search for Books</TypographyH4>
        <div className="flex flex-col gap-4 mb-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
          />
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
          />
          <Input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter genre"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <Card
              key={book.id}
              className="min-w-[200px] min-h-24 dark:hover:bg-zinc-900 hover:shadow-md"
            >
              <CardHeader>
                <TypographyH4>{book.volumeInfo.title}</TypographyH4>
                <TypographyMuted>
                  by {book.volumeInfo.authors?.join(", ")}
                </TypographyMuted>
              </CardHeader>
              <div className="flex flex-row space-between gap-6">
                <CardContent className="flex flex-row">
                  <TypographySmall>
                    {book.volumeInfo.description?.substring(0, 100)}...
                  </TypographySmall>
                </CardContent>
                <CardContent>
                  <Image
                    src={
                      book.volumeInfo.imageLinks?.thumbnail ||
                      "/book-placeholder.gif"
                    }
                    alt={book.volumeInfo.title}
                    width={128}
                    height={192}
                    className="max-w-32 h-auto rounded-sm shadow-md"
                  />
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No books found</p>
      )}
    </div>
  );
};

export default SearchPage;
