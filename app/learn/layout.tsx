import PublicationShell from "@/components/publication/PublicationShell";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicationShell activeNav="learn">{children}</PublicationShell>;
}
