import type { ReactNode } from "react";
import SystemsMap from "@/components/SystemsMap";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export default function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <div className={`relative min-h-screen bg-slate-base ${className}`}>
      <SystemsMap />
      {children}
    </div>
  );
}
