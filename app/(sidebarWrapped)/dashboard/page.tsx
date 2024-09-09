"use client";
import { TypographyH1, TypographyH2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import LastReadCard from "@/components/dashboard/LastReadCard";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonBookCard from "@/components/SkeletonBookCard";

const cardStyling =
  "flex-1 min-w-[200px] dark:hover:bg-zinc-900 hover:shadow-md";

const DashboardPage = () => {
  const [lastRead, setLastRead] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
          setLastRead(originalBook);
        } else {
          console.log(
            "Original book not found, displaying an error message or alternative."
          );
          setLastRead(null);
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, []);

  return (
    <div className="flex flex-1 flex-col max-w-7xl mx-auto p-8 gap-6">
      <TypographyH1>Dashboard</TypographyH1>
      <TypographyH2>Welcome back, Ryan 👋</TypographyH2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {loading ? (
          <>
            <SkeletonBookCard />
            <SkeletonBookCard />
            <SkeletonBookCard />
          </>
        ) : (
          lastRead && (
            <>
              <LastReadCard book={lastRead} pageNumber={100} />
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
            </>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
