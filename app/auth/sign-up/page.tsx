"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TypographyH1 } from "@/components/typography";
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

import { signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name Must be at least 3 characters." })
      .max(30, { message: "Name must be less than 30 characters" }),
    email: z.string().email({ message: "Please eneter a valid email address" }),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    // call the sign up function from better-auth
    const { data, error } = await signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        image: undefined,
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          setLoading(false);
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setLoading(false);
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div
      className={`min-h-screen max-w-7xl mx-auto gap-4 flex flex-col md:flex-row justify-center md:justify-evenly md:items-center p-4 pt-[74px] md:p-16`}
    >
      <div className="dark:text-shadow">
        <TypographyH1>Grow together with Betterment Book Club</TypographyH1>
      </div>

      <Card className={cn("min-w-[40%]")}>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Join the growing community of people gorwing together with the power
            of reading and discussion!
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className={cn("flex flex-col gap-2")}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Name"}</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Password must be between 8 to 16 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className={cn("flex flex-col gap-4")}>
              <div className="flex flex-1 w-full gap-4">
                <Button type="submit" className={cn("flex-1")}>
                  {loading ? "Loading..." : "Sign Up"}
                </Button>
                <Button variant="outline" className={cn("flex-1")}>
                  Sign In
                </Button>
              </div>
              {/* <Button
                variant="outline"
                className={cn("w-full")}
                onClick={async () => {
                  await signIn.social({
                    provider: "github",
                    callbackURL: "/dashboard",
                  });
                }}
              >
                Sign up with GitHub
              </Button> */}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
