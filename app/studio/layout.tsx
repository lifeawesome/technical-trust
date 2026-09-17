import PublicationShell from "@/components/publication/PublicationShell";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicationShell activeNav="studio">{children}</PublicationShell>;
}
