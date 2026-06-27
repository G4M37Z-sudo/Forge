import { ScrollReveal } from '@/components/tool/ScrollReveal';
import { Brain, Wrench, Zap, Shield, Activity, Folder, Server, Gauge } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      <ScrollReveal>
        <h1 className="text-3xl sm:text-5xl font-bold text-text-primary tracking-tight mb-3 text-center" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
          Built for the way you <span className="text-purple-bright">work</span>
        </h1>
        <p className="text-base text-text-secondary max-w-2xl mx-auto leading-relaxed text-center mb-12">
          Forge is a developer toolkit that runs entirely in your browser. No accounts, no servers, no limits.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {[
          { icon: Brain, title: 'AI-Powered Workflows', desc: 'Generate boilerplate, review code, and refactor with context-aware suggestions.', accent: 'Supports JavaScript, TypeScript, Python, Go & more' },
          { icon: Wrench, title: '30+ Developer Tools', desc: 'JSON formatters, regex testers, hash generators, text diffs, JWT decoders, and validators.', accent: 'Updated regularly with community-requested tools' },
          { icon: Zap, title: 'Instant & Offline', desc: 'Every tool runs locally. Your data never leaves your device. Zero server processing.', accent: 'Works completely offline after first load' },
          { icon: Shield, title: 'Privacy by Architecture', desc: 'No servers means no logs. No accounts means no tracking. Open source means verifiable.', accent: 'Your code never touches our infrastructure' },
        ].map((f, i) => {
          const Icon = f.icon;
          return (
            <ScrollReveal key={f.title} delay={i * 60}>
              <div className="forge-card p-6">
                <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-purple-bright" />
                </div>
                <h2 className="text-lg font-bold text-text-primary mb-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{f.title}</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">{f.desc}</p>
                <p className="text-xs text-cyan font-medium">{f.accent}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal>
        <div className="forge-card p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Activity className="w-5 h-5 text-purple mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-bright">30</p>
              <p className="text-xs text-text-tertiary">Tools</p>
            </div>
            <div>
              <Folder className="w-5 h-5 text-purple mx-auto mb-2" />
              <p className="text-2xl font-bold text-cyan">8</p>
              <p className="text-xs text-text-tertiary">Categories</p>
            </div>
            <div>
              <Server className="w-5 h-5 text-purple mx-auto mb-2" />
              <p className="text-2xl font-bold text-success">0</p>
              <p className="text-xs text-text-tertiary">Server Calls</p>
            </div>
            <div>
              <Gauge className="w-5 h-5 text-purple mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-bright">99.9%</p>
              <p className="text-xs text-text-tertiary">Uptime</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
