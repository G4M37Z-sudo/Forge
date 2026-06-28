import { ScrollReveal } from '@/components/tool/ScrollReveal';
import { FileText, Scale, BookOpen, AlertTriangle, RefreshCw, Mail } from 'lucide-react';

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: FileText,
    content:
      'By accessing or using Forge, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service. These terms constitute a legally binding agreement between you and Forge.',
  },
  {
    id: 'use-of-service',
    title: 'Use of Service',
    icon: Scale,
    content:
      'Forge provides free developer tools for personal and commercial use. You may use any tool for any lawful purpose. You agree not to misuse the service, attempt to reverse-engineer the codebase beyond what is permitted by the open-source license, or use the tools for any illegal activity.',
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    icon: BookOpen,
    content:
      'Forge is open-source software released under the MIT License. You are free to use, modify, and distribute the code in accordance with the license terms. The Forge name, logo, and branding are trademarks and may not be used without permission.',
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    icon: AlertTriangle,
    content:
      'Forge is provided "as is" without warranty of any kind. We are not liable for any damages arising from the use of our tools, including but not limited to data loss, business interruption, or any other consequential damages. You use all tools at your own risk.',
  },
  {
    id: 'changes',
    title: 'Changes to Terms',
    icon: RefreshCw,
    content:
      'We reserve the right to modify these terms at any time. Material changes will be communicated through our GitHub repository or website. Continued use of Forge after changes constitutes acceptance of the new terms.',
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: Mail,
    content:
      'For questions about these Terms of Service, please open an issue on our GitHub repository or reach out through our community channels. We are committed to transparency and will address all inquiries promptly.',
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F5]">
      {/* Hero */}
      <header className="border-b border-[#1E1E26]">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-purple-400" />
              <h1
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                Terms of Service
              </h1>
            </div>
            <p className="text-lg text-[#A0A0B8]">
              The rules and guidelines for using Forge. Please read them carefully.
            </p>
            <p className="text-sm text-[#6A6A80] mt-4">Last updated: June 2026</p>
          </ScrollReveal>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <ScrollReveal key={section.id} delay={idx * 80}>
              <section id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-700/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2
                    className="text-xl font-bold"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  >
                    {section.title}
                  </h2>
                </div>
                <div className="pl-13">
                  <p className="text-[#A0A0B8] leading-relaxed">{section.content}</p>
                </div>
              </section>
            </ScrollReveal>
          );
        })}
      </main>
    </div>
  );
}
