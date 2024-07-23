import React from "react";
import { TypographyP } from "./typography";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Info, Mails, Menu, Newspaper, ShoppingBag } from "lucide-react";

const iconStyling = "mr-2 h-4 w-4";

const navLinks = [
  {
    text: "About",
    link: "/about",
    icon: <Info className={iconStyling} />,
  },
  {
    text: "Articles",
    link: "/articles",
    icon: <Newspaper className={iconStyling} />,
  },
  {
    text: "Plans",
    link: "/plans",
    icon: <ShoppingBag className={iconStyling} />,
  },
  {
    text: "Contact",
    link: "/contact",
    icon: <Mails className={iconStyling} />,
  },
];

const NavBar = () => {
  return (
    <header className="w-screen min-h-12">
      <div className="mx-auto flex space-between items-center py-4 px-4 md:px-8">
        <div className="flex flex-1 justify-start">
          <Link href="/landing-page">
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
          </Link>
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
        <div className="max-md:hidden flex gap-4 flex-1 justify-end">
          <Link href="/auth/sign-up">
            <Button>Sign Up</Button>
          </Link>
          <Link href="/auth/sign-in">
            <Button variant="secondary">Sign In</Button>
          </Link>

          <ModeToggle />
        </div>
        <div className="md:hidden flex gap-2">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="p-2">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mx-4">
              <DropdownMenuGroup>
                {navLinks.map((item) => (
                  <DropdownMenuItem>
                    <Link href={item.link} className="flex">
                      {" "}
                      {item.icon}
                      <span>{item.text}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex-grow">
                  <Button className="flex-1">Sign Up</Button>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex-grow">
                  <Button variant="secondary" className="flex-1">
                    Sign In
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
