import PublicationShell from "@/components/publication/PublicationShell";

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicationShell activeNav="newsletter">{children}</PublicationShell>
  );
}
