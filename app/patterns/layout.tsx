import PublicationShell from "@/components/publication/PublicationShell";

export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicationShell activeNav="patterns">{children}</PublicationShell>
  );
}
