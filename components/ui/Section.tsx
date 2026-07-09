import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  label?: string;
};

export default function Section({ children, className = "", id, label }: SectionProps) {
  return (
    <section
      id={id}
      data-screen-label={label}
      className={`relative z-10 px-5 py-16 sm:px-8 md:py-24 lg:px-16 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
