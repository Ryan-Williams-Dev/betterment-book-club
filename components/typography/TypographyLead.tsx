import { ReactNode } from "react";

interface TypographyH1Props {
  children: ReactNode;
}

export default function TypographyLead({ children }: TypographyH1Props) {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}

// A modal dialog that interrupts the user with important content and expects a response.
