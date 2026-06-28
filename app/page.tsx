'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Brain, Zap, ArrowRight, Cpu, Layers, Shield, Smartphone, Code2, Lock, GitBranch, Sparkles } from 'lucide-react';
import { getAllTools, categories } from '@/lib/tools';
import { ScrollReveal } from '@/components/tool/ScrollReveal';
import { ForgeLogo } from '@/components/brand/ForgeLogo';

const PILLARS = [
  { icon: Brain, title: 'AI Powered', desc: 'Intelligent code generation, review assistance, and refactoring.' },
  { icon: Cpu, title: 'Local-First Processing', desc: 'Every tool runs in your browser. Zero server calls.' },
  { icon: Layers, title: 'Composable Toolchain', desc: '30+ tools that work together. Chain operations seamlessly.' },
  { icon: Lock, title: 'Privacy by Architecture', desc: 'No servers means no logs. Open source means verifiable.' },
  { icon: Smartphone, title: 'Works Everywhere', desc: 'Desktop, tablet, phone. No install. Works offline.' },
  { icon: Code2, title: 'Open Source Core', desc: 'Inspect, extend, contribute. Your workspace.' },
];

const STATS = [
  { label: 'Tools', value: '30+', accent: 'text-[#06B6D4]' },
  { label: 'Latency', value: '<50ms', accent: 'text-[#22D3EE]' },
  { label: 'Privacy', value: '100%', accent: 'text-[#34D399]' },
  { label: 'Cost', value: '$0', accent: 'text-[#06B6D4]' },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.from(hero.querySelector('.hero-logo'), { opacity: 0, scale: 0.6, duration: 0.6, ease: 'back.out(1.7)' }, 0)
      .from(hero.querySelector('.hero-badge'), { opacity: 0, y: -10, duration: 0.3 }, 0.15)
      .from(hero.querySelector('.hero-title'), { opacity: 0, y: 30, duration: 0.5 }, 0.2)
      .from(hero.querySelector('.hero-sub'), { opacity: 0, duration: 0.4 }, 0.4)
      .from(hero.querySelector('.hero-cta'), { opacity: 0, y: 20, duration: 0.3, ease: 'back.out(1.4)' }, 0.5);
    return () => { tl.kill(); };
  }, []);

  return (
    <div className="min-h-screen">
      <section ref={heroRef} className="relative overflow-hidden py-20 sm:py-28 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/8 via-transparent to-cyan-400/4 pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-3xl text-center space-y-6">
          <div className="hero-logo flex justify-center mb-3">
            <ForgeLogo size={72} showText={false} />
          </div>
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/25 bg-sky-500/8 text-sky-400 text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            Build. Test. Ship.
          </div>
          <h1 className="hero-title text-4xl sm:text-6xl font-bold text-[#F0F0F5] leading-[1.05] tracking-tight" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            Your AI workspace<br />
            <span className="text-[#06B6D4]">for building software</span>
          </h1>
          <p className="hero-sub text-base text-[#A3A3B3] max-w-md mx-auto leading-relaxed">
            Forge is where developers think, build, and ship. 30+ tools, AI workflows, and zero compromises on privacy.
          </p>
          <div className="hero-cta flex items-center justify-center gap-3">
            <Link href="/tools" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-sky-700 to-sky-500 text-white font-medium text-sm rounded-lg hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all">
              Open Workspace <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/docs" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1E1E26] text-[#A3A3B3] font-medium text-sm rounded-lg hover:bg-white/[0.04] hover:text-[#F0F0F5] hover:border-[#2A2A3E] transition-all">
              Read the Docs
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-[#F0F0F5] mb-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            What is <span className="text-[#06B6D4]">Forge</span>?
          </h2>
          <p className="text-sm text-[#A3A3B3] max-w-2xl mb-8 leading-relaxed">
            Forge is a developer workspace that lives in your browser. It combines instant, client-side tools with AI-powered workflows in a single interface. No servers. No accounts. No compromises.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <ScrollReveal key={p.title} delay={i * 50}>
                <div className="p-5 rounded-xl bg-[#14141A] border border-[#1E1E26] hover:border-sky-500/40 hover:-translate-y-0.5 transition-all">
                  <Icon className="w-8 h-8 text-sky-400 mb-3" />
                  <h3 className="text-sm font-semibold text-[#F0F0F5] mb-1.5" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{p.title}</h3>
                  <p className="text-xs text-[#5A5A6E] leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <ScrollReveal>
        <div className="mx-auto max-w-3xl px-4 mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map(s => (
              <div key={s.label} className="p-4 rounded-xl bg-[#14141A] border border-[#1E1E26] text-center">
                <p className={`text-xl font-bold ${s.accent}`}>{s.value}</p>
                <p className="text-xs font-medium text-[#F0F0F5] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto max-w-5xl px-4 pb-20 text-center">
          <h2 className="text-xl font-bold text-[#F0F0F5] mb-3" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            Ready to <span className="text-[#06B6D4]">ship</span>?
          </h2>
          <p className="text-sm text-[#A3A3B3] mb-5">No sign-up. No install. Just open and build.</p>
          <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-sky-700 to-sky-500 text-white font-medium text-sm rounded-lg hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all">
            Launch Forge <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </ScrollReveal>
    </div>
  );
}
