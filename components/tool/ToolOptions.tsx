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
              <span className="text-xs text-[#A3A3B3]">{opt.label}:</span>
              <select value={String(options[opt.id] ?? opt.default)} onChange={(e) => onChange(opt.id, e.target.value)} className="bg-[#0B0B0F] border border-[#1E1E26] rounded-lg px-2.5 py-1.5 text-xs text-[#F0F0F5] focus:outline-none focus:border-sky-500">
                {opt.options?.map((o) => <option key={o.value} value={o.value} className="bg-[#14141A]">{o.label}</option>)}
              </select>
            </label>
          );
        }
        if (opt.type === 'toggle') {
          const checked = Boolean(options[opt.id] ?? opt.default);
          return (
            <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs text-[#A3A3B3]">{opt.label}:</span>
              <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(opt.id, !checked)} className={"relative w-9 h-5 rounded-full transition-colors " + (checked ? 'bg-sky-500/60' : 'bg-white/10')}>
                <span className={"absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow " + (checked ? 'translate-x-4' : '')} />
              </button>
            </label>
          );
        }
        if (opt.type === 'number') {
          return (
            <label key={opt.id} className="flex items-center gap-2">
              <span className="text-xs text-[#A3A3B3]">{opt.label}:</span>
              <input type="number" value={Number(options[opt.id] ?? opt.default)} onChange={(e) => onChange(opt.id, parseInt(e.target.value) || 0)} className="bg-[#0B0B0F] border border-[#1E1E26] rounded-lg px-2 py-1 text-xs text-[#F0F0F5] w-20 focus:outline-none focus:border-sky-500" />
            </label>
          );
        }
        return null;
      })}
    </div>
  );
}
