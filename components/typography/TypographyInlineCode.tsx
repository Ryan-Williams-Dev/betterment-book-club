import { ReactNode } from "react";

interface TypographyH1Props {
  children: ReactNode;
}

export default function TypographyInlineCode({ children }: TypographyH1Props) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}
