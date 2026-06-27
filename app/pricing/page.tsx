import { Check, ArrowRight, Zap, Shield, Building2 } from 'lucide-react';
import { ScrollReveal } from '@/components/tool/ScrollReveal';

const TIERS = [
  {
    name: 'Free', price: '$0', period: 'forever', description: 'Core tools for individual developers.',
    icon: Zap, accent: 'text-purple-bright',
    features: [
      { text: 'All 30+ developer tools', included: true },
      { text: 'Client-side processing', included: true },
      { text: 'Mobile & desktop support', included: true },
      { text: 'Open source community', included: true },
      { text: 'Tool chaining / pipelines', included: false },
      { text: 'Saved preferences', included: false },
      { text: 'Team sharing', included: false },
      { text: 'Custom tool builder', included: false },
    ],
    cta: 'Get Started', href: '/tools', featured: false,
  },
  {
    name: 'Pro', price: '$12', period: '/month', description: 'Advanced workflows for professionals.',
    icon: Shield, accent: 'text-cyan',
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Tool chaining (pipe output to input)', included: true },
      { text: 'Saved workspace preferences', included: true },
      { text: 'Command palette', included: true },
      { text: 'Batch processing mode', included: true },
      { text: 'Export history & sessions', included: true },
      { text: 'Priority community support', included: true },
      { text: 'Custom tool builder', included: false },
    ],
    cta: 'Start Pro Trial', href: '/tools', featured: true,
  },
  {
    name: 'Enterprise', price: 'Custom', period: '', description: 'For teams needing control and compliance.',
    icon: Building2, accent: 'text-purple-bright',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Self-hosted deployment', included: true },
      { text: 'SSO / SAML authentication', included: true },
      { text: 'Audit logging', included: true },
      { text: 'Custom tool development', included: true },
      { text: 'Team workspace management', included: true },
      { text: 'SLA & uptime guarantees', included: true },
      { text: 'Dedicated support channel', included: true },
    ],
    cta: 'Contact Sales', href: '/community', featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-2 text-center" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
            Simple pricing. <span className="text-purple-bright">Free forever</span> for core.
          </h1>
          <p className="text-sm text-text-secondary text-center mb-10 max-w-md mx-auto">
            Start free. Upgrade when you need advanced workflows.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {TIERS.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <ScrollReveal key={tier.name} delay={i * 80}>
                <div className={`forge-card p-6 flex flex-col ${tier.featured ? 'border-purple/30' : ''}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`w-5 h-5 ${tier.accent}`} />
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
                          <span className="w-3.5 h-3.5 text-text-tertiary/30 flex-shrink-0 mt-0.5 text-center text-xs">-</span>
                        )}
                        <span className={`text-xs ${f.included ? 'text-text-secondary' : 'text-text-tertiary/40'}`}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={tier.href} className={tier.featured ? 'btn-primary text-xs py-2.5 justify-center' : 'btn-ghost text-xs py-2.5 justify-center'}>
                    {tier.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
