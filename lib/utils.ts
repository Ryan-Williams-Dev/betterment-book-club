import React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Star, StarHalf } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        React.createElement(Star, {
          key: i,
          className: "w-4 h-4 fill-current text-yellow-500",
        })
      );
    } else {
      stars.push(
        React.createElement(Star, {
          key: i,
          className: "w-4 h-4 fill-current text-gray-400",
        })
      );
    }
  }
  return stars;
};

// Takes in a character as an arguement and makes a string to show the keyboard shortcut for that link, dpending on the OS, shift + cmd/ctrl + the character passed in

export const generateKeyboardShortcut = (character: string) => {
  let os = getOperatingSystem();

  if (os === "Mobile") {
    return "";
  }

  if (navigator.platform.includes("Mac")) {
    return `⇧⌘${character.toUpperCase()}`;
  } else {
    return `⇧Ctrl${character.toUpperCase()}`;
  }
};

const getOperatingSystem = () => {
  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();

  if (platform.includes("mac") || userAgent.includes("mac")) return "Mac";
  if (platform.includes("win") || userAgent.includes("win")) return "Windows";
  if (/android|iphone|ipad|ipod/i.test(userAgent)) return "Mobile";
  return "Other";
};
