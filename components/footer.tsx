import React from "react";
import { TypographyLarge, TypographyMuted } from "./typography";
import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

const iconSize = 36;

const socials = [
  {
    url: "/",
    icon: <Instagram size={iconSize} />,
  },
  {
    url: "/",
    icon: <Facebook size={iconSize} />,
  },
  {
    url: "/",
    icon: <Linkedin size={iconSize} />,
  },
  {
    url: "/",
    icon: <Github size={iconSize} />,
  },
];

const Footer = () => {
  return (
    <footer className="mt-5 border-t">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-4 px-6 sm:px-16 py-10 md:items-center max-w-7xl mx-auto">
        <div>
          <TypographyLarge>Betterment Book Club 2024</TypographyLarge>
          <TypographyMuted>All rights reserved &copy;</TypographyMuted>
          <div className="mt-4 md:gap-20 flex gap-4 space-between">
            <Link href="/" className="hover:font-medium">
              Terms
            </Link>
            <Link href="/" className="hover:font-medium">
              Privacy
            </Link>
          </div>
        </div>

        <div className="flex gap-2">
          {socials.map((item) => (
            <Link
              className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md"
              href={item.url}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
