import PublicationShell from "@/components/publication/PublicationShell";

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicationShell activeNav="lab">{children}</PublicationShell>;
}
