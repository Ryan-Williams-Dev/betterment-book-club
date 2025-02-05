"use client";

import React, {
  ReactNode,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Book,
  LayoutDashboard,
  Library,
  MessageSquare,
  Search,
  Users,
  LogOutIcon,
  Settings,
} from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { signOut, useSession } from "@/lib/auth-client";
import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";

type SidebarWrapperProps = { children: ReactNode };

const PageContext = createContext({
  currentPage: "",
  setCurrentPage: (page: string) => {},
});

export const usePageContext = () => {
  return useContext(PageContext);
};

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
  const [currentPage, setCurrentPage] = useState("");
  const [open, setOpen] = useState(false);
  const { data: session, isPending, error } = useSession();
  const userName = session?.user?.name || "Default User";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPage(window.location.pathname);
    }
  }, [setCurrentPage]);

  useKeyboardShortcuts({ setCurrentPage });

  const iconStyles = "";

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className={iconStyles} />,
      keyboardShortcut: "D",
    },
    {
      label: "Search Books",
      href: "/search",
      icon: <Search className={iconStyles} />,
      keyboardShortcut: "S",
    },
    {
      label: "Library",
      href: "/library",
      icon: <Library className={iconStyles} />,
      keyboardShortcut: "L",
    },
    {
      label: "Community",
      href: "/community",
      icon: <MessageSquare className={iconStyles} />,
      keyboardShortcut: "C",
    },
    {
      label: "Groups",
      href: "/groups",
      icon: <Users className={iconStyles} />,
      keyboardShortcut: "G",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className={iconStyles} />,
      keyboardShortcut: "S",
    },
  ];

  const handleLinkClick = (pathName: string) => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }

    // set currentPage to whichever link was clicked
    setCurrentPage(pathName);
  };

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      <div className="flex flex-col md:flex-row max-w-screen flex-1 overflow-hidden h-screen bg-neutral-100 dark:bg-neutral-900">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    onClick={() => handleLinkClick(link.href)}
                    isCurrentPage={currentPage === link.href}
                  />
                ))}
                <SidebarLink
                  link={{
                    label: "Logout",
                    href: "/sign-in",
                    icon: <LogOutIcon className={iconStyles} />,
                    keyboardShortcut: "L",
                  }}
                  onClick={async () => {
                    await signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          window.location.assign("/sign-in");
                        },
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div
              className={`flex flex-row items-center w-full justify-between gap-2`}
            >
              <SidebarLink
                link={{
                  label: session?.user.name || "Profile",
                  href: "#",
                  icon: (
                    <Image
                      src={
                        session?.user?.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          userName.split(" ").join("+")
                        )}`
                      }
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
              {open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ModeToggle />
                </motion.div>
              )}
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex flex-1 overflow-y-auto rounded-tl-2xl border-t border-l border-neutral-200 dark:border-neutral-700 bg-background">
          {children}
        </div>
      </div>
    </PageContext.Provider>
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
