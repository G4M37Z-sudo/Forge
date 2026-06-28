'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ToolFAQ } from '@/lib/types';

export function FAQSection({ faqs }: { faqs: ToolFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-[#F0F0F5]" style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}>FAQ</h3>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-xl bg-[#14141A] border border-[#1E1E26] overflow-hidden">
            <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-white/[0.02] transition-colors">
              <span className="text-sm font-medium text-[#A3A3B3] pr-4">{faq.question}</span>
              <ChevronDown className={"w-3.5 h-3.5 text-sky-400 flex-shrink-0 transition-transform " + (openIndex === index ? 'rotate-180' : '')} />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-sm text-[#A3A3B3] leading-relaxed border-t border-[#1E1E26] pt-3">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
