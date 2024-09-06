"use client";
import { useState } from "react";
import { TypographyH1 } from "@/components/typography";
import { fetchBooks, filterBooksByLanguage } from "./api";
import SearchForm from "./SearchForm";
import BookList from "./BookList";

const SearchPage = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (title: string, author: string, genre: string) => {
    setLoading(true);
    try {
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

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || "";

      const fetchedBooks = await fetchBooks(queryParams, apiKey);
      const filteredBooks = filterBooksByLanguage(fetchedBooks, "en");

      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <TypographyH1>Search Books</TypographyH1>
      </div>

      <SearchForm onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : <BookList books={books} />}
    </div>
  );
};

export default SearchPage;
