import React from "react";
import { TypographyLarge, TypographyMuted, TypographyP } from "./typography";

const Footer = () => {
  return (
    <footer className="mt-5 border-t">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-4 sm:px-16 px-6 py-10 items-center max-w-7xl mx-auto">
        <div>
          <TypographyLarge>Betterment Book Club 2024</TypographyLarge>
          <TypographyMuted>All rights reserved &copy;</TypographyMuted>
        </div>

        <div className="flex-1 w-full flex md:justify-end flex-wrap max-md:mt-10 gap-20">
          <TypographyP>Link 1</TypographyP>
          <TypographyP>Link 1</TypographyP>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
