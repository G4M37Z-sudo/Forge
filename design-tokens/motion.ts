/**
 * Forge Motion Tokens
 * GSAP timing, easing, and animation constants
 * Derived from CONSTITUTION.md § IV
 */
import { motion } from '.';

export const motionTokens = motion;

// ─── PRE-BUILT GSAP DEFAULTS ─────────────────────────────
export const gsapDefaults = {
  duration: motion.duration.card,
  ease: motion.ease.standard,
  overwrite: 'auto' as const,
};

// ─── COMMON ANIMATION PRESETS ────────────────────────────
/** Fade in from transparent */
export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: motion.duration.card, ease: motion.ease.decelerate },
};

/** Rise up from below (most common scroll reveal) */
export const riseIn = {
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0, duration: motion.duration.panel, ease: motion.ease.decelerate },
};

/** Scale in from slightly smaller */
export const scaleIn = {
  from: { opacity: 0, scale: 0.95 },
  to: { opacity: 1, scale: 1, duration: motion.duration.panel, ease: motion.ease.decelerate },
};

/** Slide in from the right */
export const slideInRight = {
  from: { opacity: 0, x: 60 },
  to: { opacity: 1, x: 0, duration: motion.duration.panel, ease: motion.ease.decelerate },
};

/** Slide in from the left */
export const slideInLeft = {
  from: { opacity: 0, x: -60 },
  to: { opacity: 1, x: 0, duration: motion.duration.panel, ease: motion.ease.decelerate },
};

/** Blur in from unfocused */
export const blurIn = {
  from: { opacity: 0, filter: 'blur(8px)' },
  to: { opacity: 1, filter: 'blur(0px)', duration: motion.duration.hero, ease: motion.ease.decelerate },
};

// ─── INTERACTION PRESETS ─────────────────────────────────
/** Button hover lift */
export const buttonHover = {
  y: -1,
  scale: 1.02,
  boxShadow: '0 0 12px rgba(212,168,83,0.15)',
  duration: motion.duration.hover,
  ease: motion.ease.standard,
};

/** Button press compress */
export const buttonPress = {
  scale: 0.97,
  duration: 0.08,
  ease: motion.ease.standard,
};

/** Button release spring */
export const buttonRelease = {
  scale: 1,
  duration: 0.2,
  ease: 'back.out(1.2)' as const,
};

/** Card hover lift */
export const cardHover = {
  y: -2,
  borderColor: '#2A2A3E',
  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
  duration: motion.duration.hover,
  ease: motion.ease.standard,
};

/** Panel inner glow (active state) */
export const panelGlow = {
  boxShadow: 'inset 0 0 20px rgba(212,168,83,0.05)',
  duration: motion.duration.hover,
  ease: motion.ease.standard,
};

/** Error shake */
export const errorShake = {
  x: 0,
  duration: 0.3,
  ease: motion.ease.standard,
  keyframes: [
    { x: -4 },
    { x: 4 },
    { x: -4 },
    { x: 4 },
    { x: 0 },
  ],
};

/** Success pulse (border glow) */
export const successPulse = {
  borderColor: '#34D399',
  boxShadow: '0 0 8px rgba(52,211,153,0.3)',
  duration: 0.2,
  ease: motion.ease.standard,
};

// ─── WINDOW PRESETS ──────────────────────────────────────
/** Window opening */
export const windowOpen = {
  from: { opacity: 0, scale: 0.98, y: 12 },
  to: {
    opacity: 1,
    scale: 1,
    y: 0,
    boxShadow: '0 16px 32px rgba(0,0,0,0.5)',
    duration: 0.4,
    ease: 'back.out(1.4)' as const,
  },
};

/** Window closing */
export const windowClose = {
  to: {
    opacity: 0,
    scale: 0.97,
    y: -8,
    duration: 0.25,
    ease: motion.ease.accelerate,
  },
};

// ─── PAGE TRANSITION PRESETS ─────────────────────────────
/** Cross-fade for same-level navigation */
export const pageCrossFade = {
  outgoing: { opacity: 0, duration: 0.15, ease: motion.ease.accelerate },
  incoming: { opacity: 1, duration: 0.3, ease: motion.ease.decelerate },
};

/** Drill-down transition (list → detail) */
export const pageDrillDown = {
  outgoing: { opacity: 0, x: -30, duration: 0.2, ease: motion.ease.accelerate },
  incoming: { opacity: 0, x: 30, duration: 0, ease: motion.ease.standard },
  incomingReveal: { opacity: 1, x: 0, duration: 0.3, ease: motion.ease.decelerate },
};

/** Modal backdrop */
export const modalBackdrop = {
  overlay: { opacity: 1, duration: 0.15, ease: motion.ease.standard },
  content: {
    from: { opacity: 0, scale: 0.96, y: -8 },
    to: { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.4)' as const },
  },
};
