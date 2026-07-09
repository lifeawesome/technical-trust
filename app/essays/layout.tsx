import PublicationShell from "@/components/publication/PublicationShell";

export default function EssaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicationShell activeNav="essays">{children}</PublicationShell>;
}
