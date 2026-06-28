'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { ToolConfigSerializable } from '@/lib/types';
import { getTransform } from '@/lib/tools/transforms';
import { ScrollReveal } from './ScrollReveal';
import { ToolOptions } from './ToolOptions';
import { Copy, Download, AlertCircle, CheckCircle2, Upload } from 'lucide-react';

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
  const [dragOver, setDragOver] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const transformFn = getTransform(slug);
  const isJson = toolData.category === 'json';

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
    debounceRef.current = setTimeout(() => process(input, options), 100);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [input, options, process]);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(output); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = isJson ? 'json' : 'txt';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([output], { type: 'application/json' }));
    a.download = slug + '-output.' + ext;
    a.click();
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setInput(e.target?.result as string);
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const inputLines = input ? input.split('\n').length : 0;
  const inputChars = input.length;
  const outputLines = output ? output.split('\n').length : 0;
  const outputChars = output.length;
  const sizeDiff = inputChars > 0 && outputChars > 0 ? Math.round((1 - outputChars / inputChars) * 100) : 0;

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="space-y-2">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">{toolData.category}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F0F0F5] tracking-tight" style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}>{toolData.name}</h1>
          <p className="text-sm text-[#A3A3B3] leading-relaxed max-w-2xl">{toolData.description}</p>
        </div>
      </ScrollReveal>

      {toolData.options && toolData.options.length > 0 && (
        <ScrollReveal delay={50}>
          <div className="p-4 rounded-xl bg-[#14141A] border border-[#1E1E26]">
            <ToolOptions toolData={toolData} options={options} onChange={(id, v) => setOptions(prev => ({ ...prev, [id]: v }))} />
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={100}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={"rounded-xl bg-[#14141A] border overflow-hidden flex flex-col transition-colors " + (dragOver ? 'border-sky-500/50 bg-sky-500/5' : 'border-[#1E1E26]')} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1E1E26] bg-[#1E1E26]/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                <span className="text-xs font-medium text-[#A3A3B3] uppercase tracking-wider">Input</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#5A5A6E]">{inputLines}L / {inputChars}ch</span>
                <button onClick={() => fileInputRef.current?.click()} className="p-1 rounded hover:bg-white/5 text-[#5A5A6E] hover:text-[#A3A3B3] transition-colors" title="Upload file"><Upload className="w-3.5 h-3.5" /></button>
                {toolData.examples && toolData.examples.length > 0 && (
                  <button onClick={() => toolData.examples && setInput(toolData.examples[0].input)} className="text-xs text-sky-400/80 hover:text-sky-400 transition-colors">Example</button>
                )}
                <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="text-xs text-[#5A5A6E] hover:text-[#A3A3B3] transition-colors">Clear</button>
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept=".json,.txt,.js,.ts" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={isJson ? 'Paste JSON here or drag & drop a .json file...' : 'Paste your ' + (toolData.inputType || 'data') + ' here...'} rows={14} className="w-full p-4 bg-transparent text-[#F0F0F5] font-mono text-sm placeholder-[#5A5A6E] focus:outline-none min-h-[280px] flex-1 resize-none" spellCheck={false} />
          </div>

          <div className="rounded-xl bg-[#14141A] border border-[#1E1E26] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1E1E26] bg-[#1E1E26]/50">
              <div className="flex items-center gap-2">
                <div className={"w-2 h-2 rounded-full " + (processing ? 'bg-sky-500 animate-pulse' : error ? 'bg-red-400' : output ? 'bg-emerald-400' : 'bg-[#5A5A6E]/30')} />
                <span className="text-xs font-medium text-[#A3A3B3] uppercase tracking-wider">Output</span>
                {processing && <span className="text-[10px] text-sky-400 animate-pulse">Processing...</span>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#5A5A6E]">{outputLines}L / {outputChars}ch</span>
                {output && (
                  <>
                    <button onClick={handleCopy} className={"inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded transition-all " + (copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-[#5A5A6E] hover:text-[#A3A3B3]')}>
                      {copied ? <><CheckCircle2 className="w-3 h-3" />Copied</> : <><Copy className="w-3 h-3" />Copy</>}
                    </button>
                    <button onClick={handleDownload} className="p-1 rounded hover:bg-white/5 text-[#5A5A6E] hover:text-[#A3A3B3] transition-colors" title="Download"><Download className="w-3.5 h-3.5" /></button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 min-h-[280px]">
              {error ? (
                <div className="p-4">
                  <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-400">Error</p>
                        <p className="text-sm text-red-400/70 mt-1 font-mono text-xs">{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : output ? (
                <pre className="p-4 text-sm text-[#F0F0F5] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap break-all h-full">{output}</pre>
              ) : (
                <div className="flex items-center justify-center h-full py-12 text-[#5A5A6E] text-xs">Output will appear here as you type...</div>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {isJson && output && !error && (
        <ScrollReveal delay={150}>
          <div className="p-4 rounded-xl bg-[#14141A] border border-[#1E1E26]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center p-2 rounded-lg bg-[#0B0B0F]/50">
                <p className="text-lg font-bold text-sky-400">{inputChars}</p>
                <p className="text-[10px] text-[#5A5A6E]">Input chars</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-[#0B0B0F]/50">
                <p className="text-lg font-bold text-[#22D3EE]">{outputChars}</p>
                <p className="text-[10px] text-[#5A5A6E]">Output chars</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-[#0B0B0F]/50">
                <p className={"text-lg font-bold " + (sizeDiff > 0 ? 'text-emerald-400' : sizeDiff < 0 ? 'text-red-400' : 'text-[#A3A3B3]')}>
                  {sizeDiff > 0 ? '-' + sizeDiff + '%' : sizeDiff < 0 ? '+' + Math.abs(sizeDiff) + '%' : '0%'}
                </p>
                <p className="text-[10px] text-[#5A5A6E]">Size change</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-[#0B0B0F]/50">
                <p className="text-lg font-bold text-sky-400">{outputLines}</p>
                <p className="text-[10px] text-[#5A5A6E]">Lines</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {toolData.examples && toolData.examples.length > 0 && (
        <ScrollReveal delay={200}>
          <div className="rounded-xl bg-[#14141A] border border-[#1E1E26] overflow-hidden">
            <button onClick={() => setShowExamples(!showExamples)} className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
              <span className="text-xs font-medium text-[#5A5A6E] uppercase tracking-wider">Examples ({toolData.examples.length})</span>
              <svg className={"w-3.5 h-3.5 text-sky-400 transition-transform " + (showExamples ? 'rotate-180' : '')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showExamples && (
              <div className="px-5 pb-4 space-y-3 border-t border-[#1E1E26] pt-3">
                {toolData.examples.map((ex, i) => (
                  <div key={i} className="rounded-lg border border-[#1E1E26] bg-[#0B0B0F]/50 p-3 space-y-2">
                    <p className="text-xs font-medium text-[#22D3EE]">{ex.title}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-[#5A5A6E] uppercase">Input</span>
                        <pre className="text-xs text-[#A3A3B3] font-mono mt-0.5 bg-[#0B0B0F]/80 rounded p-2 overflow-x-auto max-h-24">{ex.input}</pre>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#5A5A6E] uppercase">Output</span>
                        <pre className="text-xs text-emerald-400/80 font-mono mt-0.5 bg-[#0B0B0F]/80 rounded p-2 overflow-x-auto max-h-24">{ex.output}</pre>
                      </div>
                    </div>
                    <button onClick={() => setInput(ex.input)} className="text-[10px] text-sky-400 hover:text-sky-300 transition-colors">Try this example</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      )}

      {relatedSlugs.length > 0 && (
        <ScrollReveal delay={250}>
          <div className="p-5 rounded-xl bg-[#14141A] border border-[#1E1E26]">
            <h3 className="text-xs font-medium text-[#5A5A6E] uppercase tracking-wider mb-3">Related Tools</h3>
            <div className="flex flex-wrap gap-2">
              {relatedSlugs.map(s => (
                <a key={s} href={'/tools/' + s} className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-[#1E1E26] text-[#A3A3B3] hover:bg-white/[0.06] hover:text-[#22D3EE] hover:border-[#2A2A3E] transition-all">
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
