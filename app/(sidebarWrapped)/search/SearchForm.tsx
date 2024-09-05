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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
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
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchForm;
