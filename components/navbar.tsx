import React from "react";
import { TypographyH4, TypographyP } from "./typography";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  {
    text: "About",
    link: "/",
  },
  {
    text: "Articles",
    link: "/",
  },
  {
    text: "Pricing",
    link: "/",
  },
  {
    text: "Contact",
    link: "/",
  },
];

const NavBar = () => {
  return (
    <header className="w-screen min-h-12">
      <div className="mx-auto flex space-between items-center p-4">
        <div className="flex flex-1 justify-start">
          <div className="dark:hidden">
            <Image
              src="/high-res-logo-transparent.svg"
              alt="logo"
              height={24}
              width={118}
              className="object-contain"
            />
          </div>
          <div className="hidden dark:block">
            <Image
              src="/high-res-logo-white-text-transparent.svg"
              alt="logo"
              height={24}
              width={118}
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-1 justify-center max-md:hidden">
          <ul className="flex gap-4">
            {navLinks.map((item) => (
              <li>
                <Link
                  href={item.link}
                  className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white hover:font-medium"
                >
                  <TypographyP>{item.text}</TypographyP>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4 flex-1 justify-end max-md-hidden">
          <Button>Sign Up</Button>
          <Button variant="secondary">Sign Up</Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
