'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Wrench, BookOpen, CreditCard, Users,
  Braces, Binary, Wand2, Type, FileCode, Shield, CheckCircle, ArrowRightLeft,
  Search, Menu, X, ChevronDown, Zap
} from 'lucide-react';
import { ForgeLogo } from '@/components/brand/ForgeLogo';

const MAIN_NAV = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Features', href: '/features', icon: Zap },
  { label: 'Tools', href: '/tools', icon: Wrench },
  { label: 'Docs', href: '/docs', icon: BookOpen },
  { label: 'Pricing', href: '/pricing', icon: CreditCard },
  { label: 'Community', href: '/community', icon: Users },
];

const TOOL_CATEGORIES = [
  { label: 'JSON', href: '/tools?category=json', icon: Braces },
  { label: 'Encoding', href: '/tools?category=encoding', icon: Binary },
  { label: 'Generators', href: '/tools?category=generators', icon: Wand2 },
  { label: 'Text', href: '/tools?category=text', icon: Type },
  { label: 'Formatters', href: '/tools?category=formatters', icon: FileCode },
  { label: 'Crypto', href: '/tools?category=crypto', icon: Shield },
  { label: 'Validation', href: '/tools?category=validation', icon: CheckCircle },
  { label: 'Converters', href: '/tools?category=converters', icon: ArrowRightLeft },
];

const LEGAL_NAV = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(true);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const NavLink = ({ item, indent = false }: { item: { label: string; href: string; icon?: React.ComponentType<{ className?: string }> }; indent?: boolean }) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    return (
      <Link
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
          indent ? 'pl-9' : ''
        } ${
          active
            ? 'bg-purple/10 text-purple-bright border border-purple/20'
            : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04] border border-transparent'
        }`}
      >
        {Icon && <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-purple-bright' : ''}`} />}
        <span className="truncate">{item.label}</span>
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-border flex-shrink-0">
        <ForgeLogo size={28} />
        <span className="text-base font-bold text-text-primary tracking-tight" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Forge</span>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-2 flex-shrink-0">
        <Link
          href="/tools"
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-border text-text-tertiary text-sm hover:border-border-hover hover:text-text-secondary transition-all duration-150"
        >
          <Search className="w-4 h-4" />
          <span>Search tools...</span>
          <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-border text-text-tertiary">⌘K</kbd>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {MAIN_NAV.map(item => (
          <NavLink key={item.href} item={item} />
        ))}

        {/* Tools section (collapsible) */}
        <div className="pt-3">
          <button
            onClick={() => setToolsOpen(!toolsOpen)}
            className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-semibold text-text-tertiary uppercase tracking-wider hover:text-text-secondary transition-colors duration-150"
          >
            <span>Tools</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
          </button>
          {toolsOpen && (
            <div className="mt-1 space-y-0.5">
              {TOOL_CATEGORIES.map(item => (
                <NavLink key={item.href} item={item} indent />
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Legal + Version */}
      <div className="px-3 pb-4 pt-2 border-t border-border flex-shrink-0 space-y-1">
        {LEGAL_NAV.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-text-tertiary hover:text-text-secondary transition-colors duration-150"
          >
            {item.label}
          </Link>
        ))}
        <div className="px-3 pt-1">
          <span className="text-[10px] text-text-tertiary/40">v0.1.0 · BETA</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 flex-col border-r border-border bg-void flex-shrink-0 fixed top-0 left-0 h-full z-40">
        {sidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-void/90 backdrop-blur-xl border-b border-border z-50 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <ForgeLogo size={24} />
          <span className="text-sm font-bold text-text-primary" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Forge</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-150"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5 text-text-primary" /> : <Menu className="w-5 h-5 text-text-primary" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 bg-void/60 z-40" onClick={() => setMobileOpen(false)} />
          <aside className="lg:hidden fixed top-0 left-0 w-64 h-full bg-void border-r border-border z-50 overflow-y-auto">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
