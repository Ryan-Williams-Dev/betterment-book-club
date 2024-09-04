"use client";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

const cardStyling =
  "flex-1 min-w-[200px] dark:hover:bg-zinc-900 hover:shadow-md";

interface VolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  language?: string;
  imageLinks?: {
    thumbnail: string;
  };
}

interface Book {
  volumeInfo: VolumeInfo;
}

const DashboardPage = () => {
  const [bookData, setBookData] = useState<VolumeInfo | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const query = "intitle:Atomic+Habits+inauthor:James+Clear";
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en&printType=books&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();

        // Filter results to find the original book
        const originalBook = data.items.find((item: any) => {
          const { title, authors, language } = item.volumeInfo;
          return (
            title.toLowerCase() === "atomic habits" &&
            authors?.includes("James Clear") &&
            language === "en"
          );
        });

        if (originalBook) {
          setBookData(originalBook.volumeInfo);
        } else {
          console.log(
            "Original book not found, displaying an error message or alternative."
          );
          setBookData(null);
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, []);

  return (
    <div className="flex flex-1 flex-col p-8 gap-6">
      <TypographyH1>Dashboard</TypographyH1>
      <TypographyH2>Welcome back, Ryan 👋</TypographyH2>
      <div className="flex flex-wrap gap-4">
        {bookData ? (
          <Card className={cardStyling}>
            <CardHeader>
              <CardTitle>Last read</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <TypographyH4>{bookData.title}</TypographyH4>
                    <TypographyMuted>
                      by {bookData.authors?.join(", ")}
                    </TypographyMuted>
                    <TypographySmall>
                      {bookData.description?.substring(0, 100)}...
                    </TypographySmall>
                  </div>
                </div>
                {bookData.imageLinks?.thumbnail && (
                  <div className="flex-shrink-0">
                    <Image
                      src={bookData.imageLinks.thumbnail}
                      alt={bookData.title}
                      width={128}
                      height={192}
                      className="max-w-32 h-auto rounded-sm shadow-md"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col mt-2">
                <TypographyMuted>Page 33 of 100</TypographyMuted>
                <Progress value={33} className="w-full mt-1" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add Progress</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className={cardStyling}>
            <CardHeader>
              <CardTitle>Last read</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Loading book data...</p>
            </CardContent>
            <CardFooter>
              <Button>Log reading</Button>
            </CardFooter>
          </Card>
        )}
        <Card className={cardStyling}>
          <CardHeader>
            <CardTitle>Last read</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button>Log reading</Button>
          </CardFooter>
        </Card>
        <Card className={cardStyling}>
          <CardHeader>
            <CardTitle>Last read</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">Log reading</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
