import { Shield, Server, Cookie, Users, Scale, Mail } from 'lucide-react';
import { ScrollReveal } from '@/components/tool/ScrollReveal';

const SECTIONS = [
  { icon: Shield, title: 'Data Collection', body: 'Forge processes all data entirely in your browser. We do not collect, store, or transmit any input you provide. Your data never leaves your device.' },
  { icon: Server, title: 'Data Processing', body: 'All tool operations execute client-side using JavaScript. No data is sent to any server for processing.' },
  { icon: Cookie, title: 'Cookies', body: 'Forge uses only essential technical cookies. No tracking cookies, advertising cookies, or analytics cookies.' },
  { icon: Users, title: 'Third Parties', body: 'Forge does not share any user data with third parties. No analytics, advertising, or tracking pixels.' },
  { icon: Scale, title: 'Your Rights', body: 'Because Forge does not collect any personal data, there is no data to access, modify, or delete.' },
  { icon: Mail, title: 'Contact', body: 'If you have questions about this privacy policy, reach us through our GitHub repository.' },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      <ScrollReveal>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-2 text-center" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
          <span className="text-purple-bright">Privacy</span> Policy
        </h1>
        <p className="text-sm text-text-secondary text-center mb-8">Your data stays in your browser. Always.</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="forge-card p-5 mb-6">
          <p className="text-sm text-text-secondary leading-relaxed">
            Last updated: June 2025. Forge is committed to protecting your privacy. The short version: <span className="text-cyan font-medium">we don&apos;t collect any of your data.</span>
          </p>
        </div>
      </ScrollReveal>

      {SECTIONS.map((section, i) => {
        const Icon = section.icon;
        return (
          <ScrollReveal key={section.title} delay={i * 50}>
            <div className="forge-card p-6 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-purple-bright" />
                </div>
                <h2 className="text-base font-semibold text-text-primary" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{section.title}</h2>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{section.body}</p>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
