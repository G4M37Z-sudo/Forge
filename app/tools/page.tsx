import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllTools, categories, getToolsByCategory } from '@/lib/tools';
import { ScrollReveal } from '@/components/tool/ScrollReveal';

export const metadata = { title: 'All Tools — Forge', description: 'Browse all 30+ free developer tools by category.' };

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-1" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
          All <span className="purple-text">Tools</span>
        </h1>
        <p className="text-sm text-text-secondary mb-8">{tools.length} free developer utilities. Fast, private, client-side.</p>

        <div className="space-y-10">
          {categories.map((cat, ci) => {
            const catTools = getToolsByCategory(cat.slug);
            return (
              <ScrollReveal key={cat.slug} delay={ci * 40}>
                <div>
                  <h2 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
                    <span className="pixel-badge">{cat.icon}</span>
                    {cat.name}
                    <span className="text-xs text-text-tertiary font-normal">{catTools.length}</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {catTools.map(tool => (
                      <Link key={tool.slug} href={`/tools/${tool.slug}`} className="glass-card-hover group block p-4">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-sm font-medium text-text-primary group-hover:text-cyan transition-colors duration-200" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{tool.name}</h3>
                          <ArrowRight className="w-3.5 h-3.5 text-text-tertiary group-hover:text-cyan transition-all duration-200 flex-shrink-0 ml-2" />
                        </div>
                        <p className="text-xs text-text-tertiary line-clamp-2 leading-relaxed">{tool.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
