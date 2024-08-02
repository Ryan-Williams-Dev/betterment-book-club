"use client";

import NavBar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImageStyle = useMotionTemplate`
    radial-gradient(
      200px circle at ${mouseX}px ${mouseY}px,
      black 0%,
      transparent 100%
    )
  `;

  return (
    <>
      <NavBar />
      <div
        className={cn(
          `relative min-h-screen flex items-start bg-white dark:bg-background justify-center w-full group`
          // Adjust the classes here as needed
        )}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 pointer-events-none" />
        <motion.div
          className="pointer-events-none bg-dot-thick-yellow-500 dark:bg-dot-thick-yellow-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            WebkitMaskImage: maskImageStyle,
            maskImage: maskImageStyle,
          }}
        />

        <div className={cn("relative z-20")}>{children}</div>
      </div>
    </>
  );
}
