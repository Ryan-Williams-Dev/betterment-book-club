"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TypographyH1, TypographySmall } from "@/components/typography";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z.object({
  email: z.string().email({ message: "Please eneter a valid email address" }),
  password: z.string(),
});

const SignInPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto gap-4 flex flex-col md:flex-row justify-center md:justify-evenly md:items-center p-4 md:p-16">
      <div className="dark:text-shadow">
        <TypographyH1>Check Back in with Betterment Book Club</TypographyH1>
      </div>

      <Card className={cn("min-w-[40%]")}>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className={cn("flex flex-col gap-2")}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className={cn("flex-1")}>
                Sign In
              </Button>
            </CardContent>
            <CardFooter className={cn("flex-col gap-2")}>
              <TypographySmall>Forgotten your password?</TypographySmall>
              <div className="w-full flex">
                <Button variant="outline" className={cn("flex-1")}>
                  Reset Password
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignInPage;
