'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
  /** Use scale entrance instead of translate */
  scale?: boolean;
}

/**
 * Constitution-driven scroll reveal.
 * - Trigger: top 85% (enters viewport 15% from bottom)
 * - Re-triggers on scroll up: play none none reverse
 * - Respects prefers-reduced-motion
 * - Uses GSAP ScrollTrigger for 60fps performance
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  stagger = 0,
  scale = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration: 0.6,
      delay,
      ease: 'power2.out',
    };

    if (scale) {
      fromVars.scale = 0.95;
    } else {
      fromVars.y = y;
    }

    // If stagger is set, animate direct children
    const targets = stagger > 0 ? el.children : el;

    if (stagger > 0) {
      gsap.from(targets, {
        ...fromVars,
        stagger,
      });
    } else {
      const tween = gsap.from(el, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }
  }, [delay, y, stagger, scale]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
