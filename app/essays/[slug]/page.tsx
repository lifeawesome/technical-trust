import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EssayHeader from "@/components/essays/EssayHeader";
import articleStyles from "@/components/essays/EssayArticle.module.css";
import {
  getEssayModule,
  getPublishedEssays,
  isEssayPublished,
} from "@/lib/essays";

type EssayPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const essays = await getPublishedEssays();
  return essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params,
}: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const mod = await getEssayModule(slug);

  if (!mod || !isEssayPublished(mod.meta)) {
    return {};
  }

  return {
    title: mod.meta.title,
    description: mod.meta.description,
    openGraph: {
      title: mod.meta.title,
      description: mod.meta.description,
      type: "article",
      publishedTime: mod.meta.publishedAt,
    },
  };
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const mod = await getEssayModule(slug);

  if (!mod || !isEssayPublished(mod.meta)) {
    notFound();
  }

  const Content = mod.default;

  return (
    <>
      <EssayHeader meta={mod.meta} />
      <article className={articleStyles.article}>
        <div className={articleStyles.prose}>
          <Content />
        </div>
      </article>
    </>
  );
}
