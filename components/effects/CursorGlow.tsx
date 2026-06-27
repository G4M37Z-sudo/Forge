'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    // Disable on touch devices / small screens
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768;
    if (isTouchDevice) return;

    // Target position (where the mouse actually is)
    const target = { x: 0, y: 0 };

    // Current position (lerped toward target)
    const current = { x: 0, y: 0 };

    // Initialize position offscreen so it doesn't flash on mount
    gsap.set(glow, { x: -9999, y: -9999 });

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // GSAP ticker for smooth lerp
    const ticker = gsap.ticker.add(() => {
      const lerpFactor = 0.12;
      current.x += (target.x - current.x) * lerpFactor;
      current.y += (target.y - current.y) * lerpFactor;

      gsap.set(glow, {
        x: current.x - 200,
        y: current.y - 200,
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0"
      style={{
        width: 400,
        height: 400,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(124,58,237,0.07) 0%, rgba(34,211,238,0.03) 40%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}
