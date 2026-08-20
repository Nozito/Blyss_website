import type { ReactNode } from "react";

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionContainer({ children, className = "" }: SectionContainerProps) {
  return (
    <div className={`relative mx-auto w-full max-w-(--container-page) px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
