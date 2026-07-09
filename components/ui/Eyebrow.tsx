import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase ${className}`}
    >
      {children}
    </p>
  );
}
