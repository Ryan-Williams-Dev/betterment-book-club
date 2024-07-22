import { ReactNode } from "react";

interface TypographyH1Props {
  children: ReactNode;
}

export default function TypographyH3({ children }: TypographyH1Props) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}
