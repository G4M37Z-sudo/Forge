import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getToolDataBySlug, getAllTools, getRelatedTools } from '@/lib/tools';
import { generateToolMeta, generateJsonLd } from '@/lib/seo';
import { ToolShell } from '@/components/tool/ToolShell';
import { FAQSection } from '@/components/tool/FAQSection';
import { Breadcrumbs } from '@/components/tool/Breadcrumbs';
import { ScrollReveal } from '@/components/tool/ScrollReveal';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map(tool => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const toolData = getToolDataBySlug(slug);
  if (!toolData) return { title: 'Tool Not Found' };
  return generateToolMeta(toolData, slug);
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const toolData = getToolDataBySlug(slug);
  if (!toolData) notFound();

  const related = getRelatedTools(slug);
  const crumbs = [
    { name: 'Tools', href: '/tools' },
    { name: toolData.name, href: `/tools/${toolData.slug}` },
  ];

  const jsonLd = generateJsonLd(toolData, slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollReveal>
        <Breadcrumbs crumbs={crumbs} />
      </ScrollReveal>
      <div className="mt-6">
        <ToolShell toolData={toolData} slug={slug} relatedSlugs={related.map(r => r.slug)} />
      </div>
      {toolData.faqs && toolData.faqs.length > 0 && (
        <div className="mt-10">
          <ScrollReveal delay={300}>
            <FAQSection faqs={toolData.faqs} />
          </ScrollReveal>
        </div>
      )}
    </div>
  );
}
