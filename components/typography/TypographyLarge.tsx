import { ReactNode } from "react";

interface TypographyH1Props {
  children: ReactNode;
}

export default function TypographyLarge({ children }: TypographyH1Props) {
  return <div className="text-lg font-semibold">{children}</div>;
}
