import { ReactNode } from "react";

interface TypographyH1Props {
  children: ReactNode;
}

export default function TypographySmall({ children }: TypographyH1Props) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}
