"use client";

import { set, z } from "zod";
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
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string(),
});

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
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
      className={cn(
        "min-h-screen",
        "max-w-7xl",
        "mx-auto",
        "gap-4",
        "flex",
        "flex-col",
        "md:flex-row",
        "justify-center",
        "md:justify-evenly",
        "md:items-center",
        "p-4",
        "pt-[74px]",
        "md:p-16"
      )}
    >
      <div className="dark:text-shadow">
        <TypographyH1>Check Back in with Betterment Book Club</TypographyH1>
      </div>

      <Card className={cn("min-w-[40%]")}>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
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
            </CardContent>
            <CardFooter className={cn("flex flex-col gap-4 items-start")}>
              <Button type="submit" className={cn("flex-1 w-full")}>
                {loading ? "Loading..." : "Sign In"}
              </Button>
              <Separator />
              <Button
                variant="outline"
                className={cn("w-full flex items-center justify-center gap-2")}
                onClick={async () => {
                  setLoading(true);
                  await signIn.social(
                    {
                      provider: "google",
                      callbackURL: "/dashboard",
                    },
                    {
                      onRequest: (ctx) => {
                        setLoading(true);
                      },
                      onSuccess: (ctx) => {
                        setLoading(false);
                        toast({
                          title: "Success",
                          description: "Redirecting to dashboard",
                        });
                      },
                      onError: (ctx) => {
                        setLoading(false);
                        toast({
                          title: "Error",
                          description: ctx.error.message,
                        });
                      },
                    }
                  );
                  setLoading(false);
                }}
              >
                <IconBrandGoogle size={24} />
                {loading ? "Loading..." : "Sign in with Google"}
              </Button>
              <Button
                variant="outline"
                className={cn("w-full flex items-center justify-center gap-2")}
                onClick={async () => {
                  setLoading(true);
                  await signIn.social(
                    {
                      provider: "github",
                      callbackURL: "/dashboard",
                    },
                    {
                      onRequest: (ctx) => {
                        setLoading(true);
                      },
                      onSuccess: (ctx) => {
                        setLoading(false);
                        toast({
                          title: "Success",
                          description: "Redirecting to dashboard",
                        });
                      },
                      onError: (ctx) => {
                        setLoading(false);
                        toast({
                          title: "Error",
                          description: ctx.error.message,
                        });
                      },
                    }
                  );
                  setLoading(false);
                }}
              >
                <Github size={24} />
                {loading ? "Loading..." : "Sign in with Github"}
              </Button>

              <TypographySmall>
                Forgotten your password?
                <Button
                  type="button"
                  variant="link"
                  className={cn("flex-1 text-foreground underline p-1")}
                >
                  Reset Password
                </Button>
              </TypographySmall>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignInPage;
