const fetchBooks = async (queryParams: string[], apiKey: string) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?${queryParams.join(
      "&"
    )}&key=${apiKey}`
  );
  const data = await response.json();
  return data.items || [];
};

const filterBooksByLanguage = (books: any[], language: string) => {
  return books.filter((book) => book.volumeInfo.language === language);
};

export { fetchBooks, filterBooksByLanguage };
