import { FileText, Scale, BookOpen, AlertTriangle, RefreshCw, Mail } from 'lucide-react';
import { ScrollReveal } from '@/components/tool/ScrollReveal';

const SECTIONS = [
  { icon: FileText, title: 'Acceptance of Terms', body: 'By accessing Forge, you accept these Terms of Service.' },
  { icon: Scale, title: 'Use of Service', body: 'Forge provides free client-side developer tools. You may use them for any lawful purpose.' },
  { icon: BookOpen, title: 'Intellectual Property', body: 'Forge is open-source under MIT License. The Forge name and logo are trademarks.' },
  { icon: AlertTriangle, title: 'Limitation of Liability', body: 'Forge is provided "as is" without warranties. We are not liable for any damages from use.' },
  { icon: RefreshCw, title: 'Changes to Terms', body: 'We reserve the right to modify these terms at any time.' },
  { icon: Mail, title: 'Contact', body: 'For questions, open an issue on our GitHub repository.' },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      <ScrollReveal>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-2 text-center" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
          Terms of <span className="text-purple-bright">Service</span>
        </h1>
        <p className="text-sm text-text-secondary text-center mb-8">Clear, fair, and developer-friendly.</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="forge-card p-5 mb-6">
          <p className="text-sm text-text-secondary leading-relaxed">
            Last updated: June 2025. These terms govern your use of Forge, a free and open-source developer tool platform.
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
