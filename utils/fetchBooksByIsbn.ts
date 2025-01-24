async function fetchBooksByIsbn(isbnList: string[], apiKey: string) {
  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  const books = [];

  for (const isbn of isbnList) {
    const response = await fetch(`${baseUrl}?q=isbn:${isbn}&key=${apiKey}`);
    if (!response.ok) {
      console.error(
        `Failed to fetch book with ISBN ${isbn}:`,
        response.statusText
      );
      continue;
    }

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      books.push(data.items[0]);
    }
  }

  return books;
}

export default fetchBooksByIsbn;
