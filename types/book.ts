export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
    language: string;
    pageCount: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    publisher: string;
    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
  };
  searchInfo: {
    textSnippet: string;
  };
}
