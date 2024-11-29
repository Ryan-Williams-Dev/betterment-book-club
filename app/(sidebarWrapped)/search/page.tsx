"use client";
import { useState } from "react";
import { TypographyH1, TypographyH2 } from "@/components/typography";
import { fetchBooks, filterBooksByLanguage } from "./api";
import SearchForm from "./SearchForm";
import BookList from "./BookList";

const SearchPage = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (
    title: string,
    author: string,
    sortBy: string
  ) => {
    setLoading(true);
    try {
      const titleQuery = title ? `intitle:${encodeURIComponent(title)}` : "";
      const authorQuery = author
        ? `inauthor:${encodeURIComponent(author)}`
        : "";

      let queryParams = ["langRestrict=en", "printType=books", "maxResults=40"];

      const searchQuery = [titleQuery, authorQuery].filter(Boolean).join("+");

      if (searchQuery) {
        queryParams.push(`q=${searchQuery}`);
      }

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || "";

      const fetchedBooks = await fetchBooks(queryParams, apiKey);
      const filteredBooks = filterBooksByLanguage(fetchedBooks, "en");

      // Sort books by the selected option or relevance by default, prioritising self-help, business, and non-fiction genres
      if (sortBy) {
        filteredBooks.sort((a, b) => {
          if (sortBy === "Popularity") {
            return b.volumeInfo.ratingsCount - a.volumeInfo.ratingsCount;
          }

          if (sortBy === "Rating") {
            return b.volumeInfo.averageRating - a.volumeInfo.averageRating;
          }

          if (sortBy === "Newest") {
            return (
              new Date(b.volumeInfo.publishedDate).getTime() -
              new Date(a.volumeInfo.publishedDate).getTime()
            );
          }

          if (sortBy === "Oldest") {
            return (
              new Date(a.volumeInfo.publishedDate).getTime() -
              new Date(b.volumeInfo.publishedDate).getTime()
            );
          }

          return 0;
        });
      }

      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  books && console.log(books);

  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <TypographyH1>Search Books</TypographyH1>
      </div>

      <SearchForm onSearch={handleSearch} />
      <div className="mb-8 border-b"></div>

      {loading ? <p>Loading...</p> : <BookList books={books} />}
    </div>
  );
};

export default SearchPage;
