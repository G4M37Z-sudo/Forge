'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { ToolConfigSerializable } from '@/lib/types';
import { getTransform } from '@/lib/tools/transforms';
import { ScrollReveal } from './ScrollReveal';
import { OutputPanel } from './OutputPanel';
import { ToolOptions } from './ToolOptions';

interface Props {
  toolData: ToolConfigSerializable;
  slug: string;
  relatedSlugs?: string[];
}

export function ToolShell({ toolData, slug, relatedSlugs = [] }: Props) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [options, setOptions] = useState<Record<string, string | boolean | number>>(() => {
    const opts: Record<string, string | boolean | number> = {};
    toolData.options?.forEach(o => { opts[o.id] = o.default; });
    return opts;
  });
  const [showExamples, setShowExamples] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const transformFn = getTransform(slug);

  const process = useCallback((inputStr: string, opts: Record<string, string | boolean | number>) => {
    if (!inputStr.trim()) { setOutput(''); setError(''); return; }
    if (!transformFn) { setError('Transform not available'); return; }
    setProcessing(true);
    try {
      const result = transformFn(inputStr, opts);
      setOutput(result.output);
      setError(result.error || '');
    } catch (e) {
      setOutput('');
      setError(e instanceof Error ? e.message : 'An error occurred');
    }
    setProcessing(false);
  }, [transformFn]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => process(input, options), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [input, options, process]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <ScrollReveal>
        <div className="space-y-2">
          <span className="pixel-badge">{toolData.category}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mt-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{toolData.name}</h1>
          <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">{toolData.description}</p>
        </div>
      </ScrollReveal>

      {/* Options */}
      {toolData.options && toolData.options.length > 0 && (
        <ScrollReveal delay={50}>
          <div className="glass-card p-4 inner-glow-purple">
            <ToolOptions toolData={toolData} options={options} onChange={(id, v) => setOptions(prev => ({ ...prev, [id]: v }))} />
          </div>
        </ScrollReveal>
      )}

      {/* Input/Output Grid */}
      <ScrollReveal delay={100}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input */}
          <div className="glass-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-elevated/50">
              <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">{toolData.inputLabel || 'Input'}</span>
              <div className="flex items-center gap-2">
                {toolData.examples && toolData.examples.length > 0 && (
                  <button onClick={() => toolData.examples && setInput(toolData.examples[0].input)} className="text-xs text-purple-bright/80 hover:text-purple-bright transition-colors duration-200">Load example</button>
                )}
                <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="text-xs text-text-tertiary hover:text-text-secondary transition-colors duration-200">Clear</button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste your ${toolData.inputType || 'text'} here...`}
              rows={10}
              className="forge-input border-0 rounded-none bg-transparent focus:ring-0 focus:border-0 min-h-[200px]"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="glass-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-elevated/50">
              <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">{toolData.outputLabel || 'Output'}</span>
              {processing && (
                <span className="text-xs text-cyan animate-pulse flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-cyan animate-pulse" />
                  Processing
                </span>
              )}
            </div>
            <div className="p-4">
              <OutputPanel output={output} error={error} label={toolData.outputLabel || 'Output'} />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Examples */}
      {toolData.examples && toolData.examples.length > 0 && (
        <ScrollReveal delay={200}>
          <div className="glass-card overflow-hidden">
            <button onClick={() => setShowExamples(!showExamples)} className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors duration-200">
              <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Examples ({toolData.examples.length})</span>
              <svg className={`w-3.5 h-3.5 text-purple transition-transform duration-200 ${showExamples ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-out ${showExamples ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-5 pb-4 space-y-3 border-t border-border pt-3">
                {toolData.examples.map((ex, i) => (
                  <div key={i} className="rounded-lg border border-border bg-void/50 p-3 space-y-2">
                    <p className="text-xs font-medium text-cyan">{ex.title}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-text-tertiary uppercase">Input</span>
                        <pre className="text-xs text-text-secondary font-mono mt-0.5 bg-void/80 rounded p-2 overflow-x-auto">{ex.input}</pre>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-tertiary uppercase">Output</span>
                        <pre className="text-xs text-success/80 font-mono mt-0.5 bg-void/80 rounded p-2 overflow-x-auto">{ex.output}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Related */}
      {relatedSlugs.length > 0 && (
        <ScrollReveal delay={250}>
          <div className="glass-card p-5 inner-glow-purple">
            <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">Related Tools</h3>
            <div className="flex flex-wrap gap-2">
              {relatedSlugs.map(s => (
                <a key={s} href={`/tools/${s}`} className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-border text-text-secondary hover:bg-white/[0.06] hover:text-cyan hover:border-border-hover transition-all duration-200">
                  {s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
