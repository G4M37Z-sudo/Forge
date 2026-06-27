'use client';
import { useState, useCallback } from 'react';

interface Props { output: string; error?: string; label?: string; }

export function OutputPanel({ output, error, label = 'Output' }: Props) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(output); } catch { /* */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  if (error) {
    return (
      <div className="rounded-lg border border-error/30 bg-error/5 p-4">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-error mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-error">{label} Error</p>
            <p className="text-sm text-error/70 mt-1 font-mono text-xs">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!output) {
    return <div className="flex items-center justify-center py-12 text-text-tertiary text-xs">Output will appear here</div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button onClick={handleCopy} className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${copied ? 'bg-success/20 text-success border border-success/30' : 'bg-white/5 text-text-secondary border border-border hover:bg-white/[0.06] hover:text-text-primary'}`}>
          {copied ? <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Copied!</> : <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>}
        </button>
        <button onClick={() => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([output], { type: 'text/plain' })); a.download = 'output.txt'; a.click(); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-text-secondary border border-border hover:bg-white/[0.06] hover:text-text-primary transition-all duration-200">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Download
        </button>
      </div>
      <pre className="text-sm text-text-primary font-mono leading-relaxed overflow-x-auto max-h-72 bg-void/80 rounded-lg p-3 border border-border">{output}</pre>
    </div>
  );
}
