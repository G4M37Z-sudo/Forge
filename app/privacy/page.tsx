import { ScrollReveal } from '@/components/tool/ScrollReveal';
import { Shield, Server, Cookie, Users, Scale, Mail } from 'lucide-react';

const sections = [
  {
    id: 'data-collection',
    title: 'Data Collection',
    icon: Shield,
    content:
      'Forge does not collect any personal data. All tool processing happens locally in your browser. We do not require account creation, and we do not store any information you input into our tools on our servers.',
  },
  {
    id: 'data-processing',
    title: 'Data Processing',
    icon: Server,
    content:
      'All computation is performed client-side using JavaScript running in your browser. Data you enter into any Forge tool never leaves your device. There are no server-side processing pipelines for user-provided content.',
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    icon: Cookie,
    content:
      'Forge does not use tracking cookies, analytics pixels, or third-party tracking scripts. We may use strictly necessary functional cookies to maintain session state within tools, but these contain no personal identifiers and expire when you close your browser.',
  },
  {
    id: 'third-parties',
    title: 'Third Parties',
    icon: Users,
    content:
      'We do not share, sell, or transmit any user data to third parties. Since we do not collect data in the first place, there is nothing to share. Our hosting provider (Vercel) has access only to standard server logs required for serving the application.',
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    icon: Scale,
    content:
      'Since we collect no personal data, there is no data to access, modify, or delete. If you have any questions about our privacy practices or believe your rights under GDPR, CCPA, or other privacy regulations have been affected, please contact us directly.',
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: Mail,
    content:
      'For privacy-related inquiries, please reach out via our GitHub discussions page or open an issue in our repository. We aim to respond to all inquiries within 48 hours.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F5]">
      {/* Hero */}
      <header className="border-b border-[#1E1E26]">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-purple-400" />
              <h1
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                Privacy Policy
              </h1>
            </div>
            <p className="text-lg text-[#A0A0B8]">
              Your privacy matters. Here is exactly how Forge handles (or rather, doesn&apos;t handle) your data.
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
