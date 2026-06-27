'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import {
  Brain, Zap, ArrowRight,
  Cpu, Layers, Shield, Smartphone, Code2, Lock, GitBranch, Sparkles, Workflow, Box
} from 'lucide-react';
import { ScrollReveal } from '@/components/tool/ScrollReveal';
import { ForgeLogo } from '@/components/brand/ForgeLogo';

const WORKSPACE_FEATURES = [
  {
    icon: Workflow,
    title: 'AI-Powered Workflows',
    desc: 'Code generation, intelligent review, refactoring assistance. Forge doesn\'t just run tools — it understands your code and suggests what to do next.',
  },
  {
    icon: Cpu,
    title: 'Local-First Processing',
    desc: 'Every tool runs in your browser. Zero server calls, zero latency, zero data leaving your machine. Your code never touches our infrastructure.',
  },
  {
    icon: Layers,
    title: 'Composable Toolchain',
    desc: '30+ purpose-built tools that work together. Format JSON, encode it, hash it, validate the output — chain operations without copy-paste.',
  },
  {
    icon: Lock,
    title: 'Privacy by Architecture',
    desc: 'Not privacy by policy — privacy by design. No servers means no logs. No accounts means no tracking. Open source means verifiable.',
  },
  {
    icon: Smartphone,
    title: 'Works Everywhere',
    desc: 'Desktop, tablet, phone. No install. No setup. Open a browser and your workspace is ready. Even works offline after first load.',
  },
  {
    icon: Code2,
    title: 'Open Source Core',
    desc: 'Every tool is inspectable. Found a bug? Fix it. Need a tool? Build it. Forge grows because developers make it grow.',
  },
];

const STATS = [
  { label: 'Tools', value: '30+', detail: 'Client-side utilities', accent: 'text-purple-bright' },
  { label: 'Latency', value: '<50ms', detail: 'Average response', accent: 'text-cyan' },
  { label: 'Privacy', value: '100%', detail: 'No server processing', accent: 'text-success' },
  { label: 'Cost', value: '$0', detail: 'Free forever', accent: 'text-purple-bright' },
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
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative overflow-hidden py-20 sm:py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple/8 via-transparent to-cyan/4 pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-3xl text-center space-y-6">
          <div className="hero-logo flex justify-center mb-3">
            <ForgeLogo size={72} showText={false} />
          </div>
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple/25 bg-purple/8 text-purple-bright text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            Build. Test. Ship.
          </div>
          <h1 className="hero-title text-4xl sm:text-6xl font-bold text-text-primary leading-[1.05] tracking-tight" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            Your AI workspace<br />
            <span className="purple-text">for building software</span>
          </h1>
          <p className="hero-sub text-base text-text-secondary max-w-md mx-auto leading-relaxed">
            Forge is where developers think, build, and ship. 30+ tools, AI workflows, and zero compromises on privacy.
          </p>
          <div className="hero-cta flex items-center justify-center gap-3">
            <Link href="/tools" className="btn-primary py-2.5 px-5">
              Open Workspace <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/docs" className="btn-ghost py-2.5 px-5">Read the Docs</Link>
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS FORGE ═══ */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            What is <span className="purple-text">Forge</span>?
          </h2>
          <p className="text-sm text-text-secondary max-w-2xl mb-8 leading-relaxed">
            Forge is a developer workspace that lives in your browser. It combines instant, client-side tools with AI-powered workflows in a single interface. No servers. No accounts. No compromises. Open a tab and start building.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {WORKSPACE_FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <ScrollReveal key={f.title} delay={i * 50}>
                <div className="glass-card-hover p-5 group">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-purple-bright" />
                    </div>
                    <h3 className="text-sm font-semibold text-text-primary" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{f.title}</h3>
                  </div>
                  <p className="text-xs text-text-tertiary leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <ScrollReveal>
        <div className="mx-auto max-w-3xl px-4 mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map(s => (
              <div key={s.label} className="glass-card p-4 text-center">
                <p className={`text-xl font-bold ${s.accent}`}>{s.value}</p>
                <p className="text-xs font-medium text-text-primary mt-0.5">{s.label}</p>
                <p className="text-[10px] text-text-tertiary">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ═══ WORKSPACE PREVIEW ═══ */}
      <ScrollReveal>
        <section className="mx-auto max-w-5xl px-4 pb-16">
          <div className="glass-card p-6 inner-glow-purple">
            <div className="flex items-center gap-2 mb-4">
              <Box className="w-5 h-5 text-purple" />
              <h2 className="text-base font-semibold text-text-primary" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>The Forge Workspace</h2>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Imagine opening your browser and finding every developer tool you need, organized and ready. No installations. No accounts. No API keys. Just tools that work instantly, powered by AI when you need it, silent when you don&apos;t.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2 p-3 rounded-lg bg-void/50">
                <Zap className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-text-primary">Instant tools</p>
                  <p className="text-text-tertiary">Paste input. Get output. Under 50ms.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-void/50">
                <Brain className="w-4 h-4 text-purple-bright flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-text-primary">AI assistance</p>
                  <p className="text-text-tertiary">Context-aware suggestions and automation.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-void/50">
                <Shield className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-text-primary">Privacy-first</p>
                  <p className="text-text-tertiary">Your data never leaves your browser.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-void/50">
                <GitBranch className="w-4 h-4 text-purple-bright flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-text-primary">Open source</p>
                  <p className="text-text-tertiary">Inspect, extend, contribute. Your workspace.</p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Link href="/tools" className="btn-primary text-xs py-2 px-4">
                Explore all 30 tools <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══ CTA ═══ */}
      <ScrollReveal>
        <section className="mx-auto max-w-3xl px-4 pb-20 text-center">
          <h2 className="text-xl font-bold text-text-primary mb-3" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            Ready to <span className="purple-text">ship</span>?
          </h2>
          <p className="text-sm text-text-secondary mb-5">No sign-up. No install. Just open and build.</p>
          <Link href="/tools" className="btn-primary py-2.5 px-6">
            Launch Forge <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </ScrollReveal>
    </div>
  );
}
