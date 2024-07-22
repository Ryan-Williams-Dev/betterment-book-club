import { TypographyH1, TypographyH3 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row justify-evenly items-center p-4 md:p-16">
      <TypographyH3>Sign up Now and explore all the benefits</TypographyH3>
      <Card className={cn("max-w-2xl")}>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Don't miss out on all of the Betterment Book Club benefits.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className={cn("flex gap-4")}>
          <Button className={cn("flex-1")}>Sign Up</Button>
          <Button variant="outline" className={cn("flex-1")}>
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
