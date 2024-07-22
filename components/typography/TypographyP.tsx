import { ReactNode } from "react";

interface TypographyH1Props {
  children: ReactNode;
}

export default function TypographyP({ children }: TypographyH1Props) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}
