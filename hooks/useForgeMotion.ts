'use client';

/**
 * Forge GSAP Setup Hook
 * Initializes GSAP defaults, registers plugins, and provides
 * reduced-motion-aware animation utilities.
 *
 * Usage:
 *   useForgeMotion(); // Call once at app root
 *   const { animateIn, scrollReveal } = useForgeMotion();
 */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from '../design-tokens';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Set project defaults
gsap.defaults({
  duration: motion.duration.card,
  ease: motion.ease.standard,
  overwrite: 'auto',
});

// ─── TYPES ──────────────────────────────────────────────
interface ScrollRevealConfig {
  trigger?: string;
  start?: string;
  stagger?: number;
  y?: number;
  duration?: number;
}

interface AnimateInConfig {
  targets: string | Element;
  y?: number;
  opacity?: number;
  scale?: number;
  x?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
}

// ─── HOOK ───────────────────────────────────────────────
export function useForgeMotion() {
  const mmRef = useRef<gsap.MatchMedia | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mmRef.current = mm;

    // Detect reduced motion preference
    mm.add({
      reduceMotion: '(prefers-reduced-motion: reduce)',
      normal: '(prefers-reduced-motion: no-preference)',
    }, (context) => {
      setIsReducedMotion((context.conditions as Record<string, boolean>).reduceMotion);
    });

    return () => {
      mm.revert();
    };
  }, []);

  /**
   * Standard scroll-triggered reveal animation
   * Respects reduced-motion — instant appearance when preferred
   */
  const scrollReveal = (selector: string, config: ScrollRevealConfig = {}) => {
    const {
      start = motion.scroll.offset,
      stagger = motion.stagger.default,
      y = 40,
      duration = motion.duration.panel,
    } = config;

    if (isReducedMotion) {
      gsap.set(selector, { opacity: 1, y: 0 });
      return;
    }

    gsap.from(selector, {
      scrollTrigger: {
        trigger: config.trigger || selector,
        start,
        toggleActions: motion.scroll.toggleActions,
      },
      y,
      opacity: 0,
      duration,
      ease: motion.ease.decelerate,
      stagger,
    });
  };

  /**
   * Standard entrance animation (no scroll trigger)
   */
  const animateIn = (config: AnimateInConfig) => {
    const {
      targets,
      y = 20,
      opacity = 0,
      scale,
      x,
      stagger = 0,
      duration = motion.duration.card,
      delay = 0,
    } = config;

    if (isReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    const fromVars: gsap.TweenVars = { opacity, y, duration, delay, ease: motion.ease.decelerate, stagger };
    if (scale !== undefined) fromVars.scale = scale;
    if (x !== undefined) fromVars.x = x;

    gsap.from(targets, fromVars);
  };

  /**
   * Staggered children reveal (for lists, grids)
   */
  const staggerReveal = (parent: string, children: string) => {
    if (isReducedMotion) {
      gsap.set(`${parent} ${children}`, { opacity: 1, y: 0 });
      return;
    }

    gsap.from(`${parent} ${children}`, {
      y: 30,
      opacity: 0,
      duration: motion.duration.card,
      ease: motion.ease.decelerate,
      stagger: motion.stagger.default,
    });
  };

  return {
    scrollReveal,
    animateIn,
    staggerReveal,
    isReducedMotion: isReducedMotion,
  };
}

export default useForgeMotion;
