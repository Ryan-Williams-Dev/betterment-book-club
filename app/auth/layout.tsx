import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <div className="absolute w-screen h-screen top md:top-20 md:-left-44 pointer-events-none overflow-hidden">
        <Image
          className="-z-10 object-cover md:object-contain"
          src={"/blob.svg"}
          fill
          alt="blog image"
        />
      </div>

      {children}
    </section>
  );
}
