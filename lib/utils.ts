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
