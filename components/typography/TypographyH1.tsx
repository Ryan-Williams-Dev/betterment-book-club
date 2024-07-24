import { ReactNode } from "react";

interface TypographyH1Props {
  children: ReactNode;
  className?: string;
}

export default function TypographyH1({
  children,
  className,
}: TypographyH1Props) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
    >
      {children}
    </h1>
  );
}
