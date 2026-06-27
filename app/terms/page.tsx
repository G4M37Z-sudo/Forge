import { ScrollReveal } from '@/components/tool/ScrollReveal';
import { FileText, Scale, BookOpen, AlertTriangle, RefreshCw, Mail } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Hero */}
      <ScrollReveal>
        <section className="text-center mb-20">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 purple-text"
            style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
          >
            Terms of Service
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The rules for using Forge. Short version: be cool, don&apos;t abuse it, and have fun building.
          </p>
          <p className="text-text-tertiary text-sm mt-4">Last updated: June 2026</p>
        </section>
      </ScrollReveal>

      {/* Acceptance */}
      <ScrollReveal delay={0.05}>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple" />
            </div>
            <h2
              className="text-2xl font-bold text-text-primary"
              style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
            >
              Acceptance of Terms
            </h2>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              By accessing or using Forge, you agree to be bound by these Terms of Service.
              If you do not agree with any part of these terms, please do not use Forge.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              These terms apply to all visitors, users, and contributors of Forge.
              We may update these terms from time to time — continued use after changes constitutes acceptance.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Use of Service */}
      <ScrollReveal delay={0.1}>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple" />
            </div>
            <h2
              className="text-2xl font-bold text-text-primary"
              style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
            >
              Use of Service
            </h2>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Forge is a free, open-source developer toolkit that runs entirely in your browser.
              You may use it for personal, educational, or commercial purposes without restriction.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              When using Forge, agree that you will:
            </p>
            <ul className="space-y-2 text-text-secondary text-sm mb-4">
              <li className="flex items-start gap-2">
                <span className="cyan-text mt-0.5">•</span>
                <span>Use the service in compliance with all applicable laws</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="cyan-text mt-0.5">•</span>
                <span>Not attempt to reverse-engineer, decompile, or exploit the application</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="cyan-text mt-0.5">•</span>
                <span>Not use the service to process illegal content or facilitate harm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="cyan-text mt-0.5">•</span>
                <span>Respect other community members in all interactions</span>
              </li>
            </ul>
            <p className="text-text-secondary text-sm leading-relaxed">
              Since all processing happens client-side, you are solely responsible for the data
              you input into Forge. We cannot access, moderate, or be liable for your inputs or outputs.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Intellectual Property */}
      <ScrollReveal delay={0.15}>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-purple" />
            </div>
            <h2
              className="text-2xl font-bold text-text-primary"
              style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
            >
              Intellectual Property
            </h2>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Forge is released under the <strong className="text-text-primary">MIT License</strong>. The source code
              is freely available on GitHub for anyone to view, fork, modify, and redistribute.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              You retain all rights to the content you create using Forge. The MIT license grants you
              permission to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the software without restriction.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              The Forge name, logo, and branding are trademarks of the Forge project. You may reference
              Forge in your projects or content, but please do not imply official endorsement without permission.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Limitation of Liability */}
      <ScrollReveal delay={0.2}>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-purple" />
            </div>
            <h2
              className="text-2xl font-bold text-text-primary"
              style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
            >
              Limitation of Liability
            </h2>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Forge is provided <strong className="text-text-primary">&quot;as is&quot; and &quot;as available&quot;</strong> without
              any warranties of any kind, either express or implied. We do not guarantee that the
              service will be uninterrupted, error-free, or that results will be accurate for your specific use case.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              In no event shall the Forge team, contributors, or maintainers be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your use
              of the service or reliance on its outputs.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              You acknowledge that tool outputs (hash values, formatted code, converted data, etc.)
              are generated algorithmically and may not account for all edge cases. Always verify
              critical results independently before using them in production systems.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Changes */}
      <ScrollReveal delay={0.25}>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-purple" />
            </div>
            <h2
              className="text-2xl font-bold text-text-primary"
              style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
            >
              Changes to Terms
            </h2>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              We reserve the right to modify these Terms of Service at any time. Changes will be
              effective immediately upon posting to the website. We will make reasonable efforts to
              notify users of significant changes via our community channels.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Your continued use of Forge after any changes constitutes acceptance of the new terms.
              If you do not agree with the updated terms, your sole remedy is to discontinue use of the service.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Contact */}
      <ScrollReveal delay={0.3}>
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple" />
            </div>
            <h2
              className="text-2xl font-bold text-text-primary"
              style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
            >
              Contact
            </h2>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please reach out to us via:
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="cyan-text mt-0.5">•</span>
                <span>Open an issue on our GitHub repository</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="cyan-text mt-0.5">•</span>
                <span>Join our Discord server and ask in the #general channel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="cyan-text mt-0.5">•</span>
                <span>Send a direct message on Twitter/X to @forge</span>
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
