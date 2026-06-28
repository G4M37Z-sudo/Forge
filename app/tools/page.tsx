import { getAllTools, categories, getToolsByCategory } from '@/lib/tools';

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-[#F0F0F5] tracking-tight mb-1" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
          All <span className="text-[#9333EA]">Tools</span>
        </h1>
        <p className="text-sm text-[#A3A3B3] mb-8">{tools.length} free developer utilities. Fast, private, client-side.</p>

        <div className="space-y-10">
          {categories.map((cat) => {
            const catTools = getToolsByCategory(cat.slug);
            return (
              <div key={cat.slug}>
                <h2 className="text-sm font-semibold text-[#F0F0F5] mb-4 flex items-center gap-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">{cat.icon}</span>
                  {cat.name}
                  <span className="text-xs text-[#5A5A6E] font-normal">{catTools.length} tools</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {catTools.map(tool => (
                    <a key={tool.slug} href={`/tools/${tool.slug}`} className="block p-4 rounded-xl bg-[#14141A] border border-[#1E1E26] hover:border-[#7C3AED]/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-150 group">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-sm font-medium text-[#F0F0F5] group-hover:text-[#22D3EE] transition-colors" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{tool.name}</h3>
                        <svg className="w-3.5 h-3.5 text-[#5A5A6E] group-hover:text-[#22D3EE] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </div>
                      <p className="text-xs text-[#5A5A6E] line-clamp-2 leading-relaxed">{tool.description}</p>
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
