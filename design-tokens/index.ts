/**
 * Forge Design Tokens — Source of Truth
 * Derived from CONSTITUTION.md
 * Every visual, spatial, and motion value in Forge starts here.
 */

// ─── COLOR ──────────────────────────────────────────────
export const color = {
  // Foundations
  void: '#06060C',
  surface: '#0C0C14',
  surfaceElevated: '#12121C',
  surfaceSubtle: '#181824',

  // Primary accents
  gold: '#D4A853',
  goldDim: '#A68B3C',
  goldBright: '#E8C468',
  purple: '#7C3AED',
  purpleDim: '#5B21B6',

  // Text
  textPrimary: '#F0F0F5',
  textSecondary: '#A0A0B0',
  textTertiary: '#5A5A6E',

  // Borders
  border: '#1E1E2E',
  borderHover: '#2A2A3E',

  // Semantic
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',

  // Alpha variants (for glows, overlays)
  alpha: {
    goldGlow: 'rgba(212,168,83,0.15)',
    goldGlowStrong: 'rgba(212,168,83,0.3)',
    purpleGlow: 'rgba(124,58,237,0.15)',
    errorGlow: 'rgba(248,113,113,0.2)',
    overlay: 'rgba(6,6,12,0.6)',
  },
} as const;

// ─── SPACING ────────────────────────────────────────────
export const space = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const;

// ─── TYPOGRAPHY ─────────────────────────────────────────
export const font = {
  family: {
    display: "'Inter', 'Geist', sans-serif",
    body: "'Inter', 'Geist', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  size: {
    display: '3.5rem',   // 56px
    h1: '2.5rem',        // 40px
    h2: '1.75rem',       // 28px
    h3: '1.25rem',       // 20px
    h4: '1.125rem',      // 18px
    body: '1rem',        // 16px
    bodySm: '0.875rem',  // 14px
    caption: '0.75rem',  // 12px
    mono: '0.875rem',    // 14px
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.1,
    snug: 1.2,
    normal: 1.4,
    relaxed: 1.5,
    loose: 1.6,
  },
  letterSpacing: {
    tighter: '-0.03em',
    tight: '-0.02em',
    snug: '-0.015em',
    narrow: '-0.01em',
    normal: '0',
    wide: '0.02em',
  },
} as const;

// ─── RADIUS ─────────────────────────────────────────────
export const radius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

// ─── ELEVATION ──────────────────────────────────────────
export const elevation = {
  0: 'none',
  1: '0 1px 2px rgba(0,0,0,0.3)',
  2: '0 4px 8px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
  3: '0 8px 16px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2)',
  4: '0 16px 32px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)',
} as const;

// ─── MOTION ─────────────────────────────────────────────
export const motion = {
  duration: {
    micro: 0.12,       // 80–180ms center
    hover: 0.18,       // 120–220ms center
    card: 0.25,        // 200–300ms center
    panel: 0.35,       // 300–450ms center
    dialog: 0.4,       // 350–500ms center
    page: 0.55,        // 450–700ms center
    hero: 1.5,         // 1.2–2s center
  },
  ease: {
    standard: 'power2.out',
    decelerate: 'power3.out',
    accelerate: 'power3.in',
    spring: 'back.out(1.4)',
    bounce: 'elastic.out(1, 0.3)',
    smooth: 'power2.inOut',
    sharp: 'power4.inOut',
  },
  stagger: {
    fast: 0.04,        // Dense lists
    default: 0.06,     // Standard groups
    relaxed: 0.08,     // Feature cards, sections
  },
  scroll: {
    offset: 'top 85%',           // Default reveal trigger
    offsetEarly: 'top 80%',     // Earlier reveal for key sections
    toggleActions: 'play none none reverse',  // Re-triggers on scroll up
  },
} as const;

// ─── BREAKPOINTS ────────────────────────────────────────
export const breakpoint = {
  mobile: 0,
  tablet: 768,
  desktop: 1280,
  wide: 1536,
} as const;

// ─── GRID ───────────────────────────────────────────────
export const grid = {
  columns: { mobile: 4, tablet: 8, desktop: 12 },
  gutter: { mobile: '16px', tablet: '20px', desktop: '24px' },
  margin: { mobile: '16px', tablet: '40px', desktop: '64px' },
  maxWidth: '1280px',
} as const;

// ─── COMPONENT SIZES ────────────────────────────────────
export const sizing = {
  button: {
    sm: { height: '32px', paddingX: '16px' },
    md: { height: '40px', paddingX: '20px' },
    lg: { height: '48px', paddingX: '24px' },
  },
  input: {
    sm: { height: '32px' },
    md: { height: '40px' },
  },
  sidebar: {
    expanded: '240px',
    collapsed: '64px',
  },
  commandPalette: {
    width: '560px',
    maxResults: 8,
  },
  toast: {
    width: '320px',
    maxVisible: 3,
    gap: '12px',
  },
} as const;

// ─── AGGREGATE EXPORT ───────────────────────────────────
export const tokens = {
  color,
  space,
  font,
  radius,
  elevation,
  motion,
  breakpoint,
  grid,
  sizing,
} as const;

export default tokens;
