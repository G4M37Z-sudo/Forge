import { BookOpen, Search, Zap, Shield, Smartphone, Code2, Wifi, GitBranch, Terminal, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/tool/ScrollReveal';

export default function DocsPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            <span className="purple-text">Documentation</span>
          </h1>
          <p className="text-sm text-text-secondary mb-8">Everything you need to use, understand, and contribute to Forge.</p>
        </ScrollReveal>

        {/* Quick Start */}
        <ScrollReveal>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            <Zap className="w-5 h-5 text-cyan" /> Quick Start
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {[
            { step: '1', title: 'Pick a tool', desc: 'Browse 30+ tools organized by category. Each tool does one thing well.', icon: Search },
            { step: '2', title: 'Paste your input', desc: 'Drop your JSON, text, code, or data into the input field. Instant.', icon: Terminal },
            { step: '3', title: 'Get your output', desc: 'Results appear in under 50ms. Copy, download, or chain to another tool.', icon: Zap },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={s.step} delay={i * 60}>
                <div className="glass-card p-5">
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

        {/* Architecture */}
        <ScrollReveal>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            <Code2 className="w-5 h-5 text-purple-bright" /> Architecture
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {[
            { icon: Shield, title: 'Client-Side Only', desc: 'Every tool runs in your browser using JavaScript. No server processes your data. No API calls for tool operations. Your code never leaves your device.' },
            { icon: Smartphone, title: 'Responsive Design', desc: 'Works on desktop, tablet, and mobile. Touch-friendly controls, adaptive layouts, and full keyboard support on desktop.' },
            { icon: Wifi, title: 'Offline Capable', desc: 'After first load, Forge works without an internet connection. All tool logic is cached locally in your browser.' },
            { icon: GitBranch, title: 'Open Source', desc: 'MIT licensed. Every tool is inspectable. Found a bug? Fix it. Need a tool? Build it. The codebase is modular and documented.' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 50}>
                <div className="glass-card p-5">
                  <Icon className="w-5 h-5 text-purple mb-2" />
                  <h3 className="text-sm font-semibold text-text-primary mb-1" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{item.title}</h3>
                  <p className="text-xs text-text-tertiary leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Tool Categories */}
        <ScrollReveal>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            <BookOpen className="w-5 h-5 text-cyan" /> Tool Categories
          </h2>
        </ScrollReveal>
        <div className="space-y-3 mb-10">
          {[
            { name: 'JSON', desc: 'Format, validate, minify, and prettify JSON data. Configurable indentation, key sorting, and syntax validation with error positioning.' },
            { name: 'Encoding', desc: 'Base64 encode/decode, URL encode/decode, HTML entity encoding. Handle special characters and binary data safely.' },
            { name: 'Generators', desc: 'UUID v4 generation, secure password creation, hash digests (MD5, SHA-1, SHA-256, SHA-512), Lorem Ipsum text, random numbers.' },
            { name: 'Text', desc: 'Case conversion (camelCase, snake_case, PascalCase), text diff comparison, word/character counting, slug generation, text reversal.' },
            { name: 'Formatters', desc: 'XML and YAML formatting with configurable indentation. Syntax highlighting and validation.' },
            { name: 'Crypto', desc: 'JWT token decoding with header and payload inspection. JSON escape/unescape utilities.' },
            { name: 'Validation', desc: 'Email format validation, URL validation, real-time regex testing with match highlighting.' },
            { name: 'Converters', desc: 'Hex to RGB color conversion, Unix timestamp to human-readable date, JSON to CSV transformation.' },
          ].map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 30}>
              <Link href={`/tools?category=${cat.name.toLowerCase()}`} className="glass-card-hover group block p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-cyan transition-colors duration-200" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{cat.name}</h3>
                    <p className="text-xs text-text-tertiary leading-relaxed mt-0.5">{cat.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-cyan transition-all duration-200 flex-shrink-0 ml-3 mt-1" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* FAQ */}
        <ScrollReveal>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            <Search className="w-5 h-5 text-purple-bright" /> FAQ
          </h2>
        </ScrollReveal>
        <div className="space-y-3">
          {[
            { q: 'Is my data safe?', a: 'Completely. All processing happens in your browser. No data is sent to any server. Your code, text, and files never leave your device.' },
            { q: 'Does Forge work offline?', a: 'Yes. After the first page load, all tools are cached and work without an internet connection.' },
            { q: 'How fast are the tools?', a: 'Most tools complete in under 50ms. There is no network latency because everything runs locally.' },
            { q: 'Can I use Forge on mobile?', a: 'Yes. The interface is fully responsive and touch-friendly. All tools work on mobile browsers.' },
            { q: 'Are the hash functions real?', a: 'Forge uses synchronous fallback algorithms for demonstration. For production cryptographic hashing, use SubtleCrypto API or Node.js crypto.' },
            { q: 'How do I contribute?', a: 'Fork the repository, create a branch, add your tool or fix, and open a PR. See the Contributing section for details.' },
          ].map((faq, i) => (
            <ScrollReveal key={faq.q} delay={i * 40}>
              <div className="glass-card p-4">
                <p className="text-sm font-medium text-text-primary mb-1">{faq.q}</p>
                <p className="text-xs text-text-tertiary leading-relaxed">{faq.a}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
