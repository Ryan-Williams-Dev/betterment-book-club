import { TypographyH1, TypographyH3 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="max-w-5xl flex flex-col gap-2 m-8">
        <TypographyH1>Whoops... 404</TypographyH1>
        <TypographyH3>Looks like this page doesn&apos;t exist yet</TypographyH3>
        <TypographyH3>
          Please check back in soon, we&apos;re always adding new features
        </TypographyH3>
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
