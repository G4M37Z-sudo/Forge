import { Check, X, ArrowRight, Zap, Building2, Shield } from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/tool/ScrollReveal';

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For individual developers, students, and hobbyists. Core tools, no limits.',
    icon: Zap,
    accent: 'purple',
    features: [
      { text: 'All 30+ developer tools', included: true },
      { text: 'Client-side processing', included: true },
      { text: 'Mobile & desktop support', included: true },
      { text: 'Open source community', included: true },
      { text: 'Keyboard shortcuts', included: true },
      { text: 'Dark mode', included: true },
      { text: 'Saved tool preferences', included: false },
      { text: 'Tool chaining / pipelines', included: false },
      { text: 'Team sharing', included: false },
      { text: 'Custom tool builder', included: false },
    ],
    cta: 'Get Started',
    href: '/tools',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    description: 'For professional developers and small teams who need advanced workflows.',
    icon: Shield,
    accent: 'cyan',
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Tool chaining (pipe output → input)', included: true },
      { text: 'Saved workspace preferences', included: true },
      { text: 'Custom keyboard shortcuts', included: true },
      { text: 'Command palette (⌘K)', included: true },
      { text: 'Batch processing mode', included: true },
      { text: 'Export history & sessions', included: true },
      { text: 'Priority community support', included: true },
      { text: 'Team sharing', included: false },
      { text: 'Custom tool builder', included: false },
    ],
    cta: 'Start Pro Trial',
    href: '/tools',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams and organizations that need control, compliance, and support.',
    icon: Building2,
    accent: 'purple',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Self-hosted deployment', included: true },
      { text: 'SSO / SAML authentication', included: true },
      { text: 'Audit logging', included: true },
      { text: 'Custom tool development', included: true },
      { text: 'Team workspace management', included: true },
      { text: 'SLA & uptime guarantees', included: true },
      { text: 'Dedicated support channel', included: true },
      { text: 'On-premise option', included: true },
      { text: 'Custom integrations', included: true },
    ],
    cta: 'Contact Sales',
    href: '/community',
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-2 text-center" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            Simple pricing. <span className="purple-text">Free forever</span> for core.
          </h1>
          <p className="text-sm text-text-secondary text-center mb-10 max-w-md mx-auto">
            Start free. Upgrade when you need advanced workflows. No hidden fees, no surprises.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {TIERS.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <ScrollReveal key={tier.name} delay={i * 80}>
                <div className={`glass-card p-6 flex flex-col ${tier.featured ? 'inner-glow-purple border-purple/30' : ''}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`w-5 h-5 ${tier.accent === 'cyan' ? 'text-cyan' : 'text-purple-bright'}`} />
                    <h3 className="text-base font-semibold text-text-primary" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>{tier.name}</h3>
                  </div>
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-text-primary">{tier.price}</span>
                    {tier.period && <span className="text-sm text-text-tertiary ml-1">{tier.period}</span>}
                  </div>
                  <p className="text-xs text-text-tertiary mb-5 leading-relaxed">{tier.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.features.map(f => (
                      <li key={f.text} className="flex items-start gap-2">
                        {f.included ? (
                          <Check className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-text-tertiary/30 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-xs ${f.included ? 'text-text-secondary' : 'text-text-tertiary/40'}`}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={tier.href} className={tier.featured ? 'btn-primary text-xs py-2.5 justify-center' : 'btn-ghost text-xs py-2.5 justify-center'}>
                    {tier.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* FAQ */}
        <ScrollReveal>
          <div className="glass-card p-6">
            <h2 className="text-base font-semibold text-text-primary mb-4" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Pricing FAQ</h2>
            <div className="space-y-4">
              {[
                { q: 'Is Free really free?', a: 'Yes. All 30+ tools are free with no usage limits. No credit card required.' },
                { q: 'What does Tool Chaining do?', a: 'Pipe the output of one tool directly into another. Format JSON → Base64 encode → Hash — all in one flow.' },
                { q: 'Can I cancel Pro anytime?', a: 'Yes. Cancel from your account settings. You keep Pro access until the end of your billing period.' },
                { q: 'Do you offer student discounts?', a: 'Pro is free for verified students. Contact us from your .edu email.' },
                { q: 'What does Enterprise include?', a: 'Self-hosted deployment, SSO, audit logging, custom tool development, and a dedicated support channel.' },
              ].map(faq => (
                <div key={faq.q} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <p className="text-sm font-medium text-text-primary mb-1">{faq.q}</p>
                  <p className="text-xs text-text-tertiary leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
