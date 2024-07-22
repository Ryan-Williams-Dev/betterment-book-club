import { ReactNode } from "react";

interface TypographyH1Props {
  children: ReactNode;
}

export default function TypographyH2({ children }: TypographyH1Props) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
