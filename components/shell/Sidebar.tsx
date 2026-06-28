'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Wrench, BookOpen, Users,
  Braces, Binary, Wand2, Type, FileCode, Shield, CheckCircle, ArrowRightLeft,
  Search, Menu, X, ChevronDown, Zap
} from 'lucide-react';
import { ForgeMark } from '@/components/brand/ForgeMark';

const MAIN_NAV = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Features', href: '/features', icon: Zap },
  { label: 'Tools', href: '/tools', icon: Wrench },
  { label: 'Docs', href: '/docs', icon: BookOpen },
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

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(true);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const NavLink = ({ item, indent = false }: { item: { label: string; href: string; icon?: any }; indent?: boolean }) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    return (
      <Link
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${indent ? 'pl-9' : ''} ${active ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-[#A3A3B3] hover:text-[#F0F0F5] hover:bg-white/[0.04] border border-transparent'}`}
      >
        {Icon && <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-sky-400' : ''}`} />}
        <span className="truncate">{item.label}</span>
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-[#1E1E26] flex-shrink-0">
        <ForgeMark size={28} />
        <span className="text-base font-bold text-[#F0F0F5] tracking-tight" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Forge</span>
      </div>

      <div className="px-3 pt-3 pb-2 flex-shrink-0">
        <Link href="/tools" className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-[#1E1E26] text-[#5A5A6E] text-sm hover:border-[#2A2A3E] hover:text-[#A3A3B3] transition-all">
          <Search className="w-4 h-4" />
          <span>Search tools...</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {MAIN_NAV.map(item => <NavLink key={item.href} item={item} />)}

        <div className="pt-3">
          <button onClick={() => setToolsOpen(!toolsOpen)} className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-semibold text-[#5A5A6E] uppercase tracking-wider hover:text-[#A3A3B3] transition-colors">
            <span>Tools</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
          </button>
          {toolsOpen && (
            <div className="mt-1 space-y-0.5">
              {TOOL_CATEGORIES.map(item => <NavLink key={item.href} item={item} indent />)}
            </div>
          )}
        </div>
      </nav>

      <div className="px-3 pb-4 pt-2 border-t border-[#1E1E26] flex-shrink-0 space-y-1">
        <Link href="/privacy" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-[#5A5A6E] hover:text-[#A3A3B3] transition-colors">Privacy</Link>
        <Link href="/terms" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-[#5A5A6E] hover:text-[#A3A3B3] transition-colors">Terms</Link>
        <div className="px-3 pt-1"><span className="text-[10px] text-[#5A5A6E]/40">v0.1.0</span></div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-60 flex-col border-r border-[#1E1E26] bg-[#0B0B0F] flex-shrink-0 fixed top-0 left-0 h-full z-40">
        {sidebarContent}
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0B0B0F]/90 backdrop-blur-xl border-b border-[#1E1E26] z-50 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <ForgeMark size={24} />
          <span className="text-sm font-bold text-[#F0F0F5]" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Forge</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label="Toggle menu">
          {mobileOpen ? <X className="w-5 h-5 text-[#F0F0F5]" /> : <Menu className="w-5 h-5 text-[#F0F0F5]" />}
        </button>
      </div>

      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 bg-[#0B0B0F]/60 z-40" onClick={() => setMobileOpen(false)} />
          <aside className="lg:hidden fixed top-0 left-0 w-64 h-full bg-[#0B0B0F] border-r border-[#1E1E26] z-50 overflow-y-auto">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
