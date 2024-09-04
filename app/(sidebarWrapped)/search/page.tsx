"use client";
import { useState } from "react";
import {
  TypographyH1,
  TypographyH4,
  TypographySmall,
} from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const SearchPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [books, setBooks] = useState<any[]>([]); // Adjust type if you have a specific type for books
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Construct the query string with the user's input
      const queryParams = new URLSearchParams({
        title,
        author,
        genre,
      }).toString();

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

      // Fetch books with the constructed query string
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${queryParams}&key=${apiKey}`
      );
      const data = await response.json();
      setBooks(data.items || []);
      console.log(data.items);
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
            // <Card
            //   key={book.id}
            //   className="shadow-md hover:shadow-lg transition-shadow"
            // >
            //   <CardHeader>
            //     <CardTitle>{book.title}</CardTitle>
            //   </CardHeader>
            //   <CardContent className="flex flex-col gap-2">
            //     <TypographyH4>{book.title}</TypographyH4>
            //     <TypographySmall>by {book.authors?.join(", ")}</TypographySmall>
            //     <p className="text-sm text-gray-600">
            //       {book.description?.substring(0, 100)}...
            //     </p>
            //     {book.imageLinks?.thumbnail && (
            //       <Image
            //         src={book.imageLinks.thumbnail}
            //         alt={book.title}
            //         width={128}
            //         height={192}
            //         className="w-full h-auto rounded-sm"
            //       />
            //     )}
            //   </CardContent>
            // </Card>

            <Card
              key={book.id}
              className="min-w-[200px] min-h-24 dark:hover:bg-zinc-900 hover:shadow-md"
            >
              <CardHeader>{book.volumeInfo.title}</CardHeader>
              <CardContent></CardContent>
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
