import { ReactNode } from "react";

interface TypographyH1Props {
  children: ReactNode;
}

export default function TypographyMuted({ children }: TypographyH1Props) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
