import PublicationShell from "@/components/publication/PublicationShell";

export default function FrameworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicationShell activeNav="framework">{children}</PublicationShell>
  );
}
