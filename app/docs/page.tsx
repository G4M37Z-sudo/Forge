import Link from 'next/link';
import { BookOpen, Search, Zap, Shield, Smartphone, Code2, Wifi, GitBranch } from 'lucide-react';
import { ScrollReveal } from '@/components/tool/ScrollReveal';

const quickStartSteps = [
  {
    step: 1,
    title: 'Browse Tools',
    description: 'Explore our collection of free developer tools organized by category.',
    icon: Search,
  },
  {
    step: 2,
    title: 'Select & Configure',
    description: 'Choose a tool, paste your data, and adjust settings to your needs.',
    icon: Zap,
  },
  {
    step: 3,
    title: 'Get Results',
    description: 'Instantly view, copy, or download your processed output.',
    icon: Code2,
  },
];

const architectureCards = [
  {
    title: 'Client-Side Processing',
    description: 'All tools run entirely in your browser. No data is sent to any server, ensuring complete privacy and instant results.',
    icon: Smartphone,
  },
  {
    title: 'Zero Dependencies',
    description: 'Built with pure JavaScript/TypeScript with no external API calls. Works offline and loads in milliseconds.',
    icon: Zap,
  },
  {
    title: 'Security First',
    description: 'No data leaves your machine. No cookies, no tracking, no storage. Your data is processed and discarded instantly.',
    icon: Shield,
  },
  {
    title: 'Modern Stack',
    description: 'Built with Next.js 16, React, and TypeScript for maximum performance, reliability, and developer experience.',
    icon: Wifi,
  },
];

const toolCategories = [
  { name: 'JSON Tools', description: 'Format, validate, minify, and transform JSON data with ease.', href: '/tools?category=json', icon: BookOpen },
  { name: 'Encoding', description: 'Encode and decode Base64, URL, HTML entities, and more.', href: '/tools?category=encoding', icon: Code2 },
  { name: 'Generators', description: 'Generate UUIDs, hashes, lorem ipsum, and random strings.', href: '/tools?category=generators', icon: Zap },
  { name: 'Converters', description: 'Convert between formats like YAML, TOML, XML, CSV, and JSON.', href: '/tools?category=converters', icon: GitBranch },
  { name: 'Formatters', description: 'Beautify and format code in multiple languages including SQL, CSS, and JS.', href: '/tools?category=formatters', icon: BookOpen },
  { name: 'Validators', description: 'Validate JSON schemas, regex patterns, email addresses, and URLs.', href: '/tools?category=validators', icon: Shield },
  { name: 'Crypto', description: 'Hash generators, encrypt/decrypt utilities, and random key creators.', href: '/tools?category=crypto', icon: Shield },
  { name: 'Text Tools', description: 'Case conversion, word count, diff checker, and text manipulation.', href: '/tools?category=text', icon: Search },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F5]">
      {/* Hero */}
      <header className="border-b border-[#1E1E26] bg-[#0A0A0F]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <ScrollReveal>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              Documentation
            </h1>
            <p className="text-lg text-[#A0A0B8] max-w-2xl">
              Everything you need to know about using Forge tools. Get started in seconds.
            </p>
          </ScrollReveal>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* Quick Start */}
        <section>
          <ScrollReveal>
            <h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              Quick Start
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {quickStartSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.step} delay={idx * 100}>
                  <div className="bg-[#14141A] border border-[#1E1E26] rounded-xl p-6 hover:border-purple-700/50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-700/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-sm font-medium text-purple-400">Step {item.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[#F0F0F5]">{item.title}</h3>
                    <p className="text-sm text-[#A0A0B8]">{item.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Architecture */}
        <section>
          <ScrollReveal>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              Architecture
            </h2>
            <p className="text-[#A0A0B8] mb-8">Forge is built for speed, privacy, and reliability.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {architectureCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={card.title} delay={idx * 100}>
                  <div className="bg-[#14141A] border border-[#1E1E26] rounded-xl p-6 hover:border-[#2A2A36] transition-colors">
                    <Icon className="w-8 h-8 text-purple-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-[#F0F0F5]">{card.title}</h3>
                    <p className="text-sm text-[#A0A0B8] leading-relaxed">{card.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Tool Categories */}
        <section>
          <ScrollReveal>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              Tool Categories
            </h2>
            <p className="text-[#A0A0B8] mb-8">Browse all available tools organized by category.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {toolCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <ScrollReveal key={cat.name} delay={idx * 50}>
                  <Link
                    href={cat.href}
                    className="block bg-[#14141A] border border-[#1E1E26] rounded-xl p-5 hover:border-purple-700/50 hover:bg-[#1A1A22] transition-all group"
                  >
                    <Icon className="w-6 h-6 text-purple-400 mb-3 group-hover:text-purple-300 transition-colors" />
                    <h3 className="text-sm font-semibold text-[#F0F0F5] mb-1">{cat.name}</h3>
                    <p className="text-xs text-[#A0A0B8]">{cat.description}</p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
