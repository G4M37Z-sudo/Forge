import Link from 'next/link';
import { ScrollReveal } from '@/components/tool/ScrollReveal';
import { GitBranch, MessageCircle, Rss, Star, Users, GitPullRequest, Bug, Lightbulb } from 'lucide-react';

const connectionCards = [
  {
    title: 'GitHub',
    description: 'Star the repo, report issues, and contribute code. All development happens in the open.',
    icon: GitBranch,
    href: 'https://github.com/forge-dev/forge',
    cta: 'View on GitHub',
    accent: 'from-sky-700/20 to-sky-500/10',
  },
  {
    title: 'Discord',
    description: 'Join our community chat. Ask questions, share ideas, and connect with other developers.',
    icon: MessageCircle,
    href: 'https://discord.gg/forge',
    cta: 'Join Discord',
    accent: 'from-blue-700/20 to-blue-500/10',
  },
  {
    title: 'Updates',
    description: 'Stay informed about new tools, features, and improvements. Follow our changelog.',
    icon: Rss,
    href: '/changelog',
    cta: 'View Changelog',
    accent: 'from-green-700/20 to-green-500/10',
  },
];

const stats = [
  { label: 'GitHub Stars', value: '2.4k', icon: Star },
  { label: 'Contributors', value: '180', icon: Users },
  { label: 'Active Users', value: '5k', icon: GitBranch },
  { label: 'Discord Members', value: '1.2k', icon: MessageCircle },
];

const contributionWays = [
  {
    title: 'Submit Code',
    description: 'Fix bugs, add features, or improve performance. Every PR is welcome.',
    icon: GitPullRequest,
  },
  {
    title: 'Report Bugs',
    description: 'Found an issue? Open a bug report with steps to reproduce.',
    icon: Bug,
  },
  {
    title: 'Suggest Ideas',
    description: 'Have an idea for a new tool? Share it in discussions.',
    icon: Lightbulb,
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F5]">
      {/* Hero */}
      <header className="border-b border-[#1E1E26]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <ScrollReveal>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              Community
            </h1>
            <p className="text-lg text-[#A0A0B8] max-w-2xl">
              Forge is built by and for developers. Join our growing community and help shape the future of free developer tools.
            </p>
          </ScrollReveal>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {/* Connection Cards */}
        <section>
          <ScrollReveal>
            <h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              Connect With Us
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {connectionCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={card.title} delay={idx * 100}>
                  <Link
                    href={card.href}
                    className={`block bg-gradient-to-br ${card.accent} border border-[#1E1E26] rounded-xl p-6 hover:border-sky-500/50 transition-all group`}
                  >
                    <Icon className="w-8 h-8 text-sky-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-[#F0F0F5]">{card.title}</h3>
                    <p className="text-sm text-[#A0A0B8] mb-4">{card.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-sky-400 group-hover:text-sky-300 transition-colors">
                      {card.cta} &rarr;
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Stats */}
        <section>
          <ScrollReveal>
            <h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              By the Numbers
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={stat.label} delay={idx * 80}>
                  <div className="bg-[#14141A] border border-[#1E1E26] rounded-xl p-5 text-center">
                    <Icon className="w-6 h-6 text-sky-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-[#F0F0F5] mb-1">{stat.value}</div>
                    <div className="text-xs text-[#A0A0B8]">{stat.label}</div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Contributing */}
        <section>
          <ScrollReveal>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              How to Contribute
            </h2>
            <p className="text-[#A0A0B8] mb-8">There are many ways to help make Forge better.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {contributionWays.map((way, idx) => {
              const Icon = way.icon;
              return (
                <ScrollReveal key={way.title} delay={idx * 100}>
                  <div className="bg-[#14141A] border border-[#1E1E26] rounded-xl p-6 hover:border-[#2A2A36] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-sky-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[#F0F0F5]">{way.title}</h3>
                    <p className="text-sm text-[#A0A0B8]">{way.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
