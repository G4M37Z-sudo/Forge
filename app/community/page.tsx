import { GitBranch, MessageCircle, Rss, GitPullRequest, Bug, Lightbulb, ArrowRight, Star, Users } from 'lucide-react';
import { ScrollReveal } from '@/components/tool/ScrollReveal';

export default function CommunityPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      <ScrollReveal>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
          Join the <span className="text-purple-bright">Forge</span> community
        </h1>
        <p className="text-sm text-text-secondary mb-8 max-w-lg">
          Forge is built by developers, for developers. Connect, contribute, and help shape the future of the workspace.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <ScrollReveal>
          <div className="forge-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center mx-auto mb-4">
              <GitBranch className="w-6 h-6 text-purple-bright" />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>GitHub</h3>
            <p className="text-xs text-text-tertiary leading-relaxed mb-4">
              Star the repo, report bugs, request features, or submit PRs. Forge lives on GitHub.
            </p>
            <a href="https://github.com" target="_blank" rel="noopener" className="btn-ghost text-xs py-2 px-4 inline-flex">
              View Repository <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <div className="forge-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-purple-bright" />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Discord</h3>
            <p className="text-xs text-text-tertiary leading-relaxed mb-4">
              Chat with other Forge users, get help, share workflows, and discuss features.
            </p>
            <a href="#" className="btn-ghost text-xs py-2 px-4 inline-flex">
              Join Server <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <div className="forge-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center mx-auto mb-4">
              <Rss className="w-6 h-6 text-purple-bright" />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Updates</h3>
            <p className="text-xs text-text-tertiary leading-relaxed mb-4">
              Follow for new tool releases, performance improvements, and feature announcements.
            </p>
            <a href="#" className="btn-ghost text-xs py-2 px-4 inline-flex">
              Follow <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="forge-card p-6 mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <Star className="w-5 h-5 text-purple mx-auto mb-1" />
              <p className="text-lg font-bold text-text-primary">2.4k+</p>
              <p className="text-[10px] text-text-tertiary">GitHub Stars</p>
            </div>
            <div>
              <GitPullRequest className="w-5 h-5 text-cyan mx-auto mb-1" />
              <p className="text-lg font-bold text-text-primary">180+</p>
              <p className="text-[10px] text-text-tertiary">Contributors</p>
            </div>
            <div>
              <Users className="w-5 h-5 text-purple-bright mx-auto mb-1" />
              <p className="text-lg font-bold text-text-primary">5k+</p>
              <p className="text-[10px] text-text-tertiary">Monthly Users</p>
            </div>
            <div>
              <MessageCircle className="w-5 h-5 text-cyan mx-auto mb-1" />
              <p className="text-lg font-bold text-text-primary">1.2k+</p>
              <p className="text-[10px] text-text-tertiary">Discord Members</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <h2 className="text-lg font-bold text-text-primary mb-4" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Contributing</h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
        <ScrollReveal>
          <div className="forge-card p-5">
            <GitPullRequest className="w-5 h-5 text-purple mb-2" />
            <h3 className="text-sm font-semibold text-text-primary mb-1" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Build Tools</h3>
            <p className="text-xs text-text-tertiary leading-relaxed">Add new tools or improve existing ones. Each tool is a self-contained module.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={60}>
          <div className="forge-card p-5">
            <Bug className="w-5 h-5 text-cyan mb-2" />
            <h3 className="text-sm font-semibold text-text-primary mb-1" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Report Bugs</h3>
            <p className="text-xs text-text-tertiary leading-relaxed">Found an edge case? Tool returning wrong output? Open an issue.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <div className="forge-card p-5">
            <Lightbulb className="w-5 h-5 text-purple-bright mb-2" />
            <h3 className="text-sm font-semibold text-text-primary mb-1" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Suggest Features</h3>
            <p className="text-xs text-text-tertiary leading-relaxed">Have an idea for a tool or workflow? Open a discussion.</p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="forge-card p-6 text-center">
          <h2 className="text-base font-semibold text-text-primary mb-2" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Ready to contribute?</h2>
          <p className="text-sm text-text-secondary mb-4">Fork the repo, pick an issue, and open a PR.</p>
          <a href="/docs" className="btn-primary text-xs py-2 px-4">Read the Docs</a>
        </div>
      </ScrollReveal>
    </div>
  );
}
