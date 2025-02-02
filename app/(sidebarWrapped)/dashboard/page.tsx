"use client";
import { TypographyH1, TypographyH2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BookCard from "@/components/BookCard";
import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import SkeletonBookCard from "@/components/SkeletonBookCard";
import { useSession } from "@/lib/auth-client";

const cardStyling = "flex-1 min-w-[200px]";

const DashboardPage = () => {
  const [lastRead, setLastRead] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session, isPending, error } = useSession();

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
    <div className="flex flex-1 flex-col max-w-7xl mx-auto py-6 px-8 gap-6">
      <TypographyH1>Dashboard</TypographyH1>
      <TypographyH2>
        Welcome back{session && ", " + session.user.name.split(" ")[0]} 👋
      </TypographyH2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto ">
        {loading ? (
          <>
            <SkeletonBookCard />
            <SkeletonBookCard />
            <SkeletonBookCard />
          </>
        ) : (
          lastRead && (
            <>
              <BookCard
                userId={session?.user.id}
                title="Last read"
                book={lastRead}
                primaryAction="Mark as reading"
                secondaryAction="More Details"
                currentPage={100}
              />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
