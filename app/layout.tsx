import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import SidebarWrapper from "@/components/sidebar-wrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Betterment Book Club",
  description: "Betterment Book Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Switch this to test logged in vs not logged in for now
  const signedIn = true;

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class">
          {!signedIn && (
            <>
              <NavBar />
              <div>{children}</div>
            </>
          )}
          {signedIn && (
            <SidebarWrapper>
              <div>{children}</div>
            </SidebarWrapper>
          )}

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
