"use client";

import React, { ReactNode, useState } from "react";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Book, LayoutDashboard } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";

type SidebarWrapperProps = { children: ReactNode };

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
  const [open, setOpen] = useState(false);

  const iconStyles = "";

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className={iconStyles} />,
    },
    {
      label: "Dashboard",
      href: "#",
      icon: <LayoutDashboard className={iconStyles} />,
    },
    {
      label: "Dashboard",
      href: "#",
      icon: <LayoutDashboard className={iconStyles} />,
    },
    {
      label: "Dashboard",
      href: "#",
      icon: <LayoutDashboard className={iconStyles} />,
    },
  ];
  return (
    <div className="flex flex-col md:flex-row max-w-screen flex-1 overflow-hidden h-screen">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div
            className={`flex flex-col justify-center ${
              open ? "items-start" : "items-center"
            } gap-2`}
          >
            <SidebarLink
              link={{
                label: "Username",
                href: "#",
                icon: (
                  <Image
                    src="/profile-pic-placeholder.jpg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />

            <ModeToggle />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">{children}</div>
    </div>
  );
};

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm dark:text-white py-1 relative z-20"
    >
      <Book className="h-5 w-6 flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-black whitespace-pre"
      >
        Betterment Book Club
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm dark:text-white py-1 relative z-20"
    >
      <Book className="h-5 w-6 flex-shrink-0" />
    </Link>
  );
};

export default SidebarWrapper;
