'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ToolFAQ } from '@/lib/types';

export function FAQSection({ faqs }: { faqs: ToolFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-text-primary flex items-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
        <span className="mr-2">FAQ</span>
      </h3>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="forge-card overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-white/[0.02] transition-colors duration-150"
            >
              <span className="text-sm font-medium text-text-secondary pr-4">{faq.question}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-purple flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-sm text-text-tertiary leading-relaxed border-t border-border pt-3">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
