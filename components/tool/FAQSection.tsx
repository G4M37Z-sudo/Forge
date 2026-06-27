'use client';
import { useState } from 'react';
import { ToolFAQ } from '@/lib/types';

export function FAQSection({ faqs }: { faqs: ToolFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
        <svg className="w-5 h-5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        FAQ
      </h3>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="glass-card overflow-hidden">
            <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-white/[0.02] transition-colors duration-200">
              <span className="text-sm font-medium text-text-secondary pr-4">{faq.question}</span>
              <svg className={`w-3.5 h-3.5 text-purple flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-5 pb-4 text-sm text-text-tertiary leading-relaxed border-t border-border pt-3">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
