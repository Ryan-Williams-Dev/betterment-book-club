"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section>
      <div
        className={`absolute w-screen h-screen pointer-events-none overflow-hidden`}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800  pointer-events-none" />
        <motion.div
          className="pointer-events-none bg-dot-thick-yellow-500 dark:bg-dot-thick-yellow-500   absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
            maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          }}
        />
      </div>

      <div className={cn("relative z-20")}>{children}</div>
    </section>
  );
}
