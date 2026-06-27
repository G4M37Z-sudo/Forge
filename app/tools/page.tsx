import { getAllTools, categories, getToolsByCategory } from '@/lib/tools';

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-1" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
          All <span className="text-purple-bright">Tools</span>
        </h1>
        <p className="text-sm text-text-secondary mb-8">{tools.length} free developer utilities. Fast, private, client-side.</p>

        <div className="space-y-10">
          {categories.map((cat) => {
            const catTools = getToolsByCategory(cat.slug);
            return (
              <div key={cat.slug}>
                <h2 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
                  <span className="pixel-badge">{cat.icon}</span>
                  {cat.name}
                  <span className="text-xs text-text-tertiary font-normal">{catTools.length}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {catTools.map(tool => (
                    <a key={tool.slug} href={`/tools/${tool.slug}`} className="forge-card block p-4 group">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-sm font-medium text-text-primary group-hover:text-cyan transition-colors duration-150" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{tool.name}</h3>
                        <svg className="w-3.5 h-3.5 text-text-tertiary group-hover:text-cyan group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </div>
                      <p className="text-xs text-text-tertiary line-clamp-2 leading-relaxed">{tool.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
