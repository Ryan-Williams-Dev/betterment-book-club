import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface SearchFormProps {
  onSearch: (title: string, author: string, genre: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(title, author, genre);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mb-8"
    >
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
      <Button type="submit" className="lg:col-span-1">
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
