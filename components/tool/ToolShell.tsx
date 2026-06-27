'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { ToolConfigSerializable } from '@/lib/types';
import { getTransform } from '@/lib/tools/transforms';
import { ScrollReveal } from './ScrollReveal';
import { ToolOptions } from './ToolOptions';
import { Copy, Download, AlertCircle, CheckCircle2 } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<Record<string, string | boolean | number>>(() => {
    const opts: Record<string, string | boolean | number> = {};
    toolData.options?.forEach(o => { opts[o.id] = o.default; });
    return opts;
  });
  const [showExamples, setShowExamples] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const transformFn = getTransform(slug);

  const process = useCallback((inputStr: string, opts: Record<string, string | boolean | number>) => {
    if (!inputStr.trim()) { setOutput(''); setError(''); setProcessing(false); return; }
    if (!transformFn) { setError('Transform not available'); return; }
    setProcessing(true);
    requestAnimationFrame(() => {
      try {
        const result = transformFn(inputStr, opts);
        setOutput(result.output);
        setError(result.error || '');
      } catch (e) {
        setOutput('');
        setError(e instanceof Error ? e.message : 'An error occurred');
      }
      setProcessing(false);
    });
  }, [transformFn]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => process(input, options), 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [input, options, process]);

  const inputLines = input ? input.split('\n').length : 0;
  const inputChars = input.length;
  const outputLines = output ? output.split('\n').length : 0;
  const outputChars = output.length;

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="space-y-2">
          <span className="pixel-badge">{toolData.category}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{toolData.name}</h1>
          <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">{toolData.description}</p>
        </div>
      </ScrollReveal>

      {toolData.options && toolData.options.length > 0 && (
        <ScrollReveal delay={50}>
          <div className="forge-card p-4">
            <ToolOptions toolData={toolData} options={options} onChange={(id, v) => setOptions(prev => ({ ...prev, [id]: v }))} />
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={100}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="forge-card overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-elevated/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Input</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-text-tertiary">{inputLines}L / {inputChars}ch</span>
                {toolData.examples && toolData.examples.length > 0 && (
                  <button onClick={() => toolData.examples && setInput(toolData.examples[0].input)} className="text-xs text-purple-bright/80 hover:text-purple-bright transition-colors duration-150">Example</button>
                )}
                <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="text-xs text-text-tertiary hover:text-text-secondary transition-colors duration-150">Clear</button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste your ${toolData.inputType || 'data'} here...`}
              rows={12}
              className="forge-input border-0 rounded-none bg-transparent focus:ring-0 focus:border-0 min-h-[240px] flex-1 resize-none font-mono text-sm"
              spellCheck={false}
            />
          </div>

          <div className="forge-card overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-elevated/50">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${processing ? 'bg-purple animate-pulse' : error ? 'bg-error' : output ? 'bg-success' : 'bg-text-tertiary/30'}`} />
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Output</span>
                {processing && <span className="text-[10px] text-purple animate-pulse">Processing...</span>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-text-tertiary">{outputLines}L / {outputChars}ch</span>
                {output && (
                  <>
                    <button onClick={async () => { try { await navigator.clipboard.writeText(output); } catch {} setCopied(true); setTimeout(() => setCopied(false), 2000); }} className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded transition-all duration-200 ${copied ? 'bg-success/20 text-success' : 'bg-white/5 text-text-tertiary hover:text-text-secondary'}`}>
                      {copied ? <><CheckCircle2 className="w-3 h-3" />Copied</> : <><Copy className="w-3 h-3" />Copy</>}
                    </button>
                    <button onClick={() => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([output], { type: 'text/plain' })); a.download = `${slug}-output.txt`; a.click(); }} className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded bg-white/5 text-text-tertiary hover:text-text-secondary transition-colors duration-150">
                      <Download className="w-3 h-3" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 min-h-[240px]">
              {error ? (
                <div className="p-4">
                  <div className="rounded-lg border border-error/30 bg-error/5 p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-error mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-error">Error</p>
                        <p className="text-sm text-error/70 mt-1 font-mono text-xs">{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : output ? (
                <pre className="p-4 text-sm text-text-primary font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap break-all h-full">{output}</pre>
              ) : (
                <div className="flex items-center justify-center h-full py-12 text-text-tertiary text-xs">
                  Output will appear here as you type...
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {toolData.examples && toolData.examples.length > 0 && (
        <ScrollReveal delay={200}>
          <div className="forge-card overflow-hidden">
            <button onClick={() => setShowExamples(!showExamples)} className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors duration-150">
              <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Examples ({toolData.examples.length})</span>
              <svg className={`w-3.5 h-3.5 text-purple transition-transform duration-200 ${showExamples ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showExamples && (
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
                    <button onClick={() => setInput(ex.input)} className="text-[10px] text-purple-bright hover:text-purple transition-colors duration-150">
                      Try this example
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      )}

      {relatedSlugs.length > 0 && (
        <ScrollReveal delay={250}>
          <div className="forge-card p-5">
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
