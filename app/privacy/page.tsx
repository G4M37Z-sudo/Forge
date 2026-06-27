import { ScrollReveal } from '@/components/tool/ScrollReveal';
import { Shield, Server, Cookie, Users, Scale, Mail } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Hero */}
      <ScrollReveal>
        <section className="text-center mb-20">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 purple-text"
            style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Your privacy is the foundation of Forge. Here&apos;s exactly how we handle (or rather, don&apos;t handle) your data.
          </p>
          <p className="text-text-tertiary text-sm mt-4">Last updated: June 2026</p>
        </section>
      </ScrollReveal>

      {/* Data Collection */}
      <ScrollReveal delay={0.05}>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple" />
            </div>
            <h2
              className="text-2xl font-bold text-text-primary"
              style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
            >
              Data Collection
            </h2>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Forge does <strong className="text-text-primary">not collect any personal data</strong>. We don&apos;t
              require accounts, we don&apos;t track usage analytics, and we don&apos;t store your inputs.
              Every tool runs entirely in your browser using client-side JavaScript.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              When you visit the Forge website, your browser may send standard HTTP request headers
              (such as IP address and user agent) to our hosting provider for basic server logging.
              This is standard web infrastructure and is not used for tracking or identification.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Data Processing */}
      <ScrollReveal delay={0.1}>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
              <Server className="w-5 h-5 text-purple" />
            </div>
            <h2
              className="text-2xl font-bold text-text-primary"
              style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
            >
              Data Processing
            </h2>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Forge processes all data <strong className="text-text-primary">locally in your browser</strong>.
              When you use a tool — whether it&apos;s a JSON formatter, hash generator, or text converter —
              the computation happens on your device using JavaScript. No data is transmitted to any server.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Our servers only serve the static HTML, CSS, and JavaScript files needed to load the application.
              There is no backend API, no database, and no server-side processing of user data.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Cookies */}
      <ScrollReveal delay={0.15}>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
              <Cookie className="w-5 h-5 text-purple" />
            </div>
            <h2
              className="text-2xl font-bold text-text-primary"
              style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
            >
              Cookies
            </h2>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Forge does <strong className="text-text-primary">not use tracking cookies</strong>, marketing cookies,
              or any third-party cookies. We do not employ analytics platforms that track user behavior.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              The only cookies that may be set are essential session cookies required for basic site functionality,
              such as remembering your dark/light mode preference. These are stored locally and never shared.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Third Parties */}
      <ScrollReveal delay={0.2}>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple" />
            </div>
            <h2
              className="text-2xl font-bold text-text-primary"
              style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
            >
              Third Parties
            </h2>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Forge does <strong className="text-text-primary">not integrate with any third-party services</strong> that
              collect, process, or store user data. There are no embedded tracking scripts, no social media widgets,
              and no external analytics.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              The only third-party interaction is the hosting of the website itself (static file serving).
              Your tool usage never leaves your browser. We also provide links to GitHub, Discord, and Twitter
              for community engagement — these platforms have their own privacy policies.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Your Rights */}
      <ScrollReveal delay={0.25}>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-purple" />
            </div>
            <h2
              className="text-2xl font-bold text-text-primary"
              style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
            >
              Your Rights
            </h2>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Since Forge collects no personal data, there is nothing to access, modify, or delete.
              However, if you have questions about our privacy practices or believe your rights under
              GDPR, CCPA, or other privacy regulations may apply, we&apos;re happy to discuss.
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="cyan-text mt-0.5">•</span>
                <span>You have the right to know what data we collect (answer: none)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="cyan-text mt-0.5">•</span>
                <span>You have the right to opt out of data collection (already opted out by default)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="cyan-text mt-0.5">•</span>
                <span>You have the right to request deletion of your data (nothing exists to delete)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="cyan-text mt-0.5">•</span>
                <span>You have the right to lodge a complaint with a supervisory authority</span>
              </li>
            </ul>
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
              If you have any questions about this Privacy Policy or Forge&apos;s data practices,
              please reach out to us via:
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
