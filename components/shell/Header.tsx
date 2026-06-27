'use client';
import { useState } from 'react';
import Link from 'next/link';
import { getAllTools } from '@/lib/tools';
import { ForgeLogo } from '@/components/brand/ForgeLogo';

const NAV_ITEMS = [
  { label: 'Features', href: '/features' },
  { label: 'Tools', href: '/tools' },
  { label: 'Docs', href: '/docs' },

  { label: 'Community', href: '/community' },
];

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const tools = getAllTools();
  const results = query.trim()
    ? tools.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.slug.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-void/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <ForgeLogo size={32} />
          <span className="text-base font-bold text-text-primary tracking-tight" style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Forge</span>
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map(item => (
            <Link key={item.label} href={item.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg bg-white/5 border border-border hover:border-border-hover hover:bg-white/[0.06] transition-all duration-200"
            aria-label="Search tools"
          >
            <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <Link href="/tools/json-formatter" className="hidden sm:inline-flex btn-primary text-xs py-2 px-4">
            Get Started
          </Link>

          {searchOpen && (
            <div className="absolute right-4 top-14 w-80 rounded-xl border border-border-hover bg-surface-elevated shadow-4 overflow-hidden z-50">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools... (json, encode, uuid)"
                autoFocus
                className="w-full px-4 py-3 bg-transparent text-sm text-text-primary placeholder-text-tertiary focus:outline-none border-b border-border"
              />
              {results.length > 0 && (
                <div className="max-h-64 overflow-y-auto">
                  {results.map(t => (
                    <Link key={t.slug} href={`/tools/${t.slug}`} onClick={() => { setSearchOpen(false); setQuery(''); }} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors duration-150">
                      <span className="pixel-badge">{t.category}</span>
                      <span className="text-sm text-text-secondary">{t.name}</span>
                    </Link>
                  ))}
                </div>
              )}
              {query.trim() && results.length === 0 && <p className="px-4 py-3 text-sm text-text-tertiary">No tools found</p>}
              {!query.trim() && <p className="px-4 py-3 text-xs text-text-tertiary">Type to search 30+ developer tools</p>}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
