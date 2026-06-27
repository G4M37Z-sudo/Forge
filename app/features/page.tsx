import { ScrollReveal } from '@/components/tool/ScrollReveal';
import { Brain, Wrench, Puzzle, Zap, Activity, Folder, Server, Gauge } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Hero */}
      <ScrollReveal>
        <section className="text-center mb-20">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 purple-text"
            style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
          >
            Built for the way you work
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Forge is a developer toolkit that runs entirely in your browser.
            No accounts, no servers, no limits — just tools that work as fast as you think.
          </p>
        </section>
      </ScrollReveal>

      {/* Feature Grid */}
      <ScrollReveal delay={0.1}>
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card-hover p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center mb-5">
                <Brain className="w-6 h-6 text-purple" />
              </div>
              <h2
                className="text-2xl font-bold mb-3 text-text-primary"
                style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
              >
                AI-Powered Workflows
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-4">
                Generate boilerplate, review existing code, and refactor entire functions
                with context-aware suggestions tuned to your stack.
              </p>
              <p className="cyan-text text-sm font-medium">
                Supports JavaScript, TypeScript, Python, Go & more
              </p>
            </div>

            <div className="glass-card-hover p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center mb-5">
                <Wrench className="w-6 h-6 text-purple" />
              </div>
              <h2
                className="text-2xl font-bold mb-3 text-text-primary"
                style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
              >
                30+ Developer Tools
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-4">
                JSON formatters, regex testers, hash generators, text diffs, JWT decoders,
                and validators — all in one place, always ready.
              </p>
              <p className="cyan-text text-sm font-medium">
                Updated regularly with community-requested tools
              </p>
            </div>

            <div className="glass-card-hover p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center mb-5">
                <Puzzle className="w-6 h-6 text-purple" />
              </div>
              <h2
                className="text-2xl font-bold mb-3 text-text-primary"
                style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
              >
                Extensible by Design
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-4">
                Built on a modular architecture. Fork the repo, add your own tools,
                and submit a PR. The community shapes what Forge becomes.
              </p>
              <p className="cyan-text text-sm font-medium">
                MIT licensed — use it, ship it, make it yours
              </p>
            </div>

            <div className="glass-card-hover p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center mb-5">
                <Zap className="w-6 h-6 text-purple" />
              </div>
              <h2
                className="text-2xl font-bold mb-3 text-text-primary"
                style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
              >
                Instant & Offline
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-4">
                Every tool runs locally in your browser. Your code, data, and inputs
                never leave your device. Zero server processing, ever.
              </p>
              <p className="cyan-text text-sm font-medium">
                Works completely offline after first load
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Stats Row */}
      <ScrollReveal delay={0.2}>
        <section className="glass-card p-10 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple/10 flex items-center justify-center mx-auto mb-3">
                <Activity className="w-5 h-5 text-purple" />
              </div>
              <p className="text-3xl md:text-4xl font-bold purple-bright mb-1">30</p>
              <p className="text-text-tertiary text-sm">Tools</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple/10 flex items-center justify-center mx-auto mb-3">
                <Folder className="w-5 h-5 text-purple" />
              </div>
              <p className="text-3xl md:text-4xl font-bold purple-bright mb-1">8</p>
              <p className="text-text-tertiary text-sm">Categories</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple/10 flex items-center justify-center mx-auto mb-3">
                <Server className="w-5 h-5 text-purple" />
              </div>
              <p className="text-3xl md:text-4xl font-bold purple-bright mb-1">0</p>
              <p className="text-text-tertiary text-sm">Server Calls</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple/10 flex items-center justify-center mx-auto mb-3">
                <Gauge className="w-5 h-5 text-purple" />
              </div>
              <p className="text-3xl md:text-4xl font-bold purple-bright mb-1">99.9%</p>
              <p className="text-text-tertiary text-sm">Uptime</p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
