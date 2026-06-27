'use client';
import type { ToolOption, ToolConfigSerializable } from '@/lib/types';

interface Props {
  toolData: ToolConfigSerializable;
  options: Record<string, string | boolean | number>;
  onChange: (id: string, value: string | boolean | number) => void;
}

export function ToolOptions({ toolData, options, onChange }: Props) {
  if (!toolData.options || toolData.options.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {toolData.options.map((opt: ToolOption) => {
        if (opt.type === 'select') {
          return (
            <label key={opt.id} className="flex items-center gap-2">
              <span className="text-xs text-text-secondary">{opt.label}:</span>
              <select value={String(options[opt.id] ?? opt.default)} onChange={(e) => onChange(opt.id, e.target.value)} className="bg-surface-elevated border border-border rounded-lg px-2.5 py-1.5 text-xs text-text-primary focus:outline-none focus:border-purple transition-colors duration-200">
                {opt.options?.map((o) => (<option key={o.value} value={o.value} className="bg-surface-elevated">{o.label}</option>))}
              </select>
            </label>
          );
        }
        if (opt.type === 'toggle') {
          const checked = Boolean(options[opt.id] ?? opt.default);
          return (
            <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs text-text-secondary">{opt.label}:</span>
              <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(opt.id, !checked)} className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${checked ? 'bg-purple/60' : 'bg-white/10'}`}>
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow-1 ${checked ? 'translate-x-4' : ''}`} />
              </button>
            </label>
          );
        }
        if (opt.type === 'number') {
          return (
            <label key={opt.id} className="flex items-center gap-2">
              <span className="text-xs text-text-secondary">{opt.label}:</span>
              <input type="number" value={Number(options[opt.id] ?? opt.default)} onChange={(e) => onChange(opt.id, parseInt(e.target.value) || 0)} className="bg-surface-elevated border border-border rounded-lg px-2 py-1 text-xs text-text-primary w-20 focus:outline-none focus:border-purple transition-colors duration-200" />
            </label>
          );
        }
        return null;
      })}
    </div>
  );
}
