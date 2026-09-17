import PublicationShell from "@/components/publication/PublicationShell";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicationShell activeNav="about">{children}</PublicationShell>;
}
