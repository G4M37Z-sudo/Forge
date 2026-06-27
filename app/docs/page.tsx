import { BookOpen, Search, Zap, Shield, Smartphone, Code2, Wifi, GitBranch } from 'lucide-react';
import { ScrollReveal } from '@/components/tool/ScrollReveal';

export default function DocsPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            <span className="text-purple-bright">Documentation</span>
          </h1>
          <p className="text-sm text-text-secondary mb-8">Everything you need to use, understand, and contribute to Forge.</p>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            <Zap className="w-5 h-5 text-cyan" /> Quick Start
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {[
            { step: '1', title: 'Pick a tool', desc: 'Browse 30+ tools organized by category.', icon: Search },
            { step: '2', title: 'Paste your input', desc: 'Drop your data into the input field.', icon: BookOpen },
            { step: '3', title: 'Get your output', desc: 'Results appear in under 50ms.', icon: Zap },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={s.step} delay={parseInt(s.step) * 60}>
                <div className="forge-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-purple/10 flex items-center justify-center text-xs font-bold text-purple-bright">{s.step}</div>
                    <Icon className="w-4 h-4 text-purple" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{s.title}</h3>
                  <p className="text-xs text-text-tertiary leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            <Code2 className="w-5 h-5 text-purple-bright" /> Architecture
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {[
            { icon: Shield, title: 'Client-Side Only', desc: 'Every tool runs in your browser. No server processes your data.' },
            { icon: Smartphone, title: 'Responsive Design', desc: 'Works on desktop, tablet, and mobile with touch-friendly controls.' },
            { icon: Wifi, title: 'Offline Capable', desc: 'After first load, all tools work without an internet connection.' },
            { icon: GitBranch, title: 'Open Source', desc: 'MIT licensed. Every tool is inspectable and modular.' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 50}>
                <div className="forge-card p-5">
                  <Icon className="w-5 h-5 text-purple mb-2" />
                  <h3 className="text-sm font-semibold text-text-primary mb-1" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{item.title}</h3>
                  <p className="text-xs text-text-tertiary leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            <BookOpen className="w-5 h-5 text-cyan" /> Tool Categories
          </h2>
        </ScrollReveal>
        <div className="space-y-3">
          {[
            { name: 'JSON', desc: 'Format, validate, minify, and prettify JSON data.' },
            { name: 'Encoding', desc: 'Base64, URL, and HTML entity encoding/decoding.' },
            { name: 'Generators', desc: 'UUID, password, hash, Lorem Ipsum, random numbers.' },
            { name: 'Text', desc: 'Case conversion, diff, word count, slug generation.' },
            { name: 'Formatters', desc: 'XML and YAML formatting with configurable indentation.' },
            { name: 'Crypto', desc: 'JWT decoding, JSON escape/unescape utilities.' },
            { name: 'Validation', desc: 'Email, URL, and regex testing with match highlighting.' },
            { name: 'Converters', desc: 'Color, timestamp, and JSON to CSV conversion.' },
          ].map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 30}>
              <a href={`/tools?category=${cat.name.toLowerCase()}`} className="forge-card block p-4 group">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-cyan transition-colors" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{cat.name}</h3>
                    <p className="text-xs text-text-tertiary leading-relaxed mt-0.5">{cat.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-text-tertiary group-hover:text-cyan transition-all flex-shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
