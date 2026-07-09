import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-600/20 bg-slate-panel/70 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
