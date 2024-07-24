"use client";

import {
  TypographyH1,
  TypographyH3,
  TypographyLarge,
} from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { quotes } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-screen top-0 mx-auto flex justify-center ">
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="scroll-m-20 text-6xl font-extrabold tracking-tight mt-[74px] lg:text-8xl text-center py-4 px-6"
        >
          Read,
          <br className="md:hidden" /> Learn,
          <br className="md:hidden" /> Improve,
          <br />
          <Highlight className="text-black dark:text-white leading-normal">
            Together.
          </Highlight>
        </motion.h1>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="max-w-3xl mx-auto text-center py-4 px-6 text-zinc-800 dark:text-zinc-200"
        >
          <TypographyH3>
            Discover transformative books and engage in enriching conversations
            to boost your personal growth.
          </TypographyH3>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="max-w-7xl py-4 px-6 flex justify-center items-center gap-6 mx-auto"
        >
          <Link
            href="/auth/sign-up"
            className={buttonVariants({ variant: "default" })}
          >
            <TypographyLarge>Try Now For Free</TypographyLarge>
          </Link>
          <Link
            href="/auth/sign-in"
            className={buttonVariants({ variant: "outline" })}
          >
            <TypographyLarge>Sign In</TypographyLarge>
          </Link>
        </motion.div>

        <div className="w-screen relative overflow-hidden flex justify-center items-center mt-4">
          <InfiniteMovingCards items={quotes} speed="ultraslow" />
        </div>
      </HeroHighlight>
    </div>
  );
};

export default LandingPage;
