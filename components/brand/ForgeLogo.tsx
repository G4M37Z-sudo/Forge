'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ForgeLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Voxel layout – a stylised anvil / forge hammer                     */
/*                                                                    */
/*  Each block is { col, row, layer } where:                           */
/*    col   = x position (0 = left)                                   */
/*    row   = y position (0 = top)                                    */
/*    layer = 'top' | 'front' | 'side'  (determines shading)         */
/*                                                                    */
/*  The design is a 12×12 grid.                                       */
/* ------------------------------------------------------------------ */

interface VoxelBlock {
  col: number;
  row: number;
  layer: 'top' | 'front' | 'side';
  accent?: boolean; // cyan highlight blocks
}

function buildVoxelLayout(): VoxelBlock[] {
  const blocks: VoxelBlock[] = [];

  // ---- Anvil base (wide bottom) ----
  for (let c = 2; c <= 9; c++) {
    blocks.push({ col: c, row: 9, layer: 'front' });
    blocks.push({ col: c, row: 10, layer: 'front' });
  }
  // base top face
  for (let c = 2; c <= 9; c++) {
    blocks.push({ col: c, row: 8, layer: 'top' });
  }

  // ---- Anvil body (narrower middle) ----
  for (let c = 3; c <= 8; c++) {
    blocks.push({ col: c, row: 6, layer: 'front' });
    blocks.push({ col: c, row: 7, layer: 'front' });
  }
  for (let c = 3; c <= 8; c++) {
    blocks.push({ col: c, row: 5, layer: 'top' });
  }

  // ---- Anvil top horn (the curved pointy part) ----
  // center top
  for (let c = 4; c <= 7; c++) {
    blocks.push({ col: c, row: 4, layer: 'top' });
  }
  // horn tip (left extension)
  blocks.push({ col: 2, row: 4, layer: 'top' });
  blocks.push({ col: 1, row: 5, layer: 'top' });
  blocks.push({ col: 1, row: 6, layer: 'front' });

  // right flat end
  blocks.push({ col: 8, row: 4, layer: 'top' });
  blocks.push({ col: 9, row: 5, layer: 'top' });
  blocks.push({ col: 9, row: 6, layer: 'front' });

  // ---- 3D depth – right side face ----
  for (let r = 6; r <= 10; r++) {
    blocks.push({ col: 10, row: r, layer: 'side' });
  }
  blocks.push({ col: 9, row: 11, layer: 'side' });
  blocks.push({ col: 10, row: 11, layer: 'side' });

  // ---- Cyan accent highlights (forge glow spots) ----
  blocks.push({ col: 5, row: 5, layer: 'top', accent: true });
  blocks.push({ col: 6, row: 5, layer: 'top', accent: true });
  blocks.push({ col: 3, row: 7, layer: 'front', accent: true });
  blocks.push({ col: 8, row: 7, layer: 'front', accent: true });

  return blocks;
}

/* ------------------------------------------------------------------ */
/*  Colour helpers                                                     */
/* ------------------------------------------------------------------ */

const COLORS = {
  void: '#0B0B0F',
  purple: '#0EA5E9',
  purpleDim: '#0284C7',
  purpleBright: '#06B6D4',
  cyan: '#22D3EE',
  cyanDim: '#06B6D4',
};

function getBlockColor(layer: 'top' | 'front' | 'side', accent?: boolean): string {
  if (accent) return COLORS.cyan;
  switch (layer) {
    case 'top':
      return COLORS.purpleBright;
    case 'front':
      return COLORS.purple;
    case 'side':
      return COLORS.purpleDim;
    default:
      return COLORS.purple;
  }
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const GRID = 12; // 12×12 logical grid
const DEFAULT_SIZE = 40;
const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/*  SVG Voxel sub-component                                            */
/* ------------------------------------------------------------------ */

interface VoxelSVGProps {
  blocks: VoxelBlock[];
  pixelSize: number;
  svgSize: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
  glowRef: React.RefObject<SVGGElement | null>;
  particlesRef: React.RefObject<SVGGElement | null>;
  pulseRef: React.RefObject<SVGCircleElement | null>;
}

function VoxelSVG({
  blocks,
  pixelSize,
  svgSize,
  svgRef,
  glowRef,
  particlesRef,
  pulseRef,
}: VoxelSVGProps) {
  // Center the 12×12 grid inside the svg
  const offset = (svgSize - GRID * pixelSize) / 2;

  return (
    <svg
      ref={svgRef}
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      {/* Glow filter */}
      <defs>
        <filter id="forge-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Voxel blocks group */}
      <g ref={glowRef} filter="url(#forge-glow)">
        {blocks.map((b, i) => (
          <rect
            key={`${b.col}-${b.row}-${b.layer}-${i}`}
            x={offset + b.col * pixelSize}
            y={offset + b.row * pixelSize}
            width={pixelSize}
            height={pixelSize}
            fill={getBlockColor(b.layer, b.accent)}
            rx={pixelSize * 0.15}
            ry={pixelSize * 0.15}
            data-voxel-index={i}
          />
        ))}
      </g>

      {/* Orbiting particles */}
      <g ref={particlesRef}>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={`particle-${i}`}
            x={svgSize / 2 - 1}
            y={svgSize / 2 - 1}
            width={2}
            height={2}
            fill={i % 2 === 0 ? COLORS.cyan : COLORS.purpleBright}
            rx={0.5}
            data-particle-index={i}
          />
        ))}
      </g>

      {/* Click pulse ring */}
      <circle
        ref={pulseRef}
        cx={svgSize / 2}
        cy={svgSize / 2}
        r={svgSize * 0.3}
        fill="none"
        stroke={COLORS.cyan}
        strokeWidth={2}
        opacity={0}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main ForgeLogo component                                           */
/* ------------------------------------------------------------------ */

export function ForgeLogo({
  size = DEFAULT_SIZE,
  className = '',
  showText = false,
}: ForgeLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<SVGGElement>(null);
  const particlesRef = useRef<SVGGElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const blocks = buildVoxelLayout();

  // pixel size: we want the 12-grid to fit inside `size` with some padding
  const pixelSize = Math.max(2, Math.floor(size / 14));
  const svgSize = pixelSize * GRID + 8; // 8px padding for glow

  /* ---- Animation setup ---- */
  useEffect(() => {
    if (REDUCED_MOTION) return;
    if (!glowRef.current || !particlesRef.current || !pulseRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Idle breathing glow
      gsap.to(glowRef.current, {
        opacity: 0.7,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. Orbiting particles
      const particles = particlesRef.current!.children;
      const cx = svgSize / 2;
      const cy = svgSize / 2;
      const radius = svgSize * 0.38;

      Array.from(particles).forEach((particle, i) => {
        const angleOffset = (i / particles.length) * Math.PI * 2;

        gsap.to(particle, {
          duration: 8 + i * 1.5,
          repeat: -1,
          ease: 'none',
          onUpdate() {
            const t = this.progress() * Math.PI * 2 + angleOffset;
            const x = cx + Math.cos(t) * radius - 1;
            const y = cy + Math.sin(t) * radius - 1;
            gsap.set(particle, { x, y });
          },
        });
      });

      // 3. Hover interactions
      const el = containerRef.current!;
      el.style.cursor = 'pointer';

      el.addEventListener('mouseenter', () => {
        gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
        gsap.to(svgRef.current, { scale: 1.03, duration: 0.3, ease: 'power2.out' });
        // Speed up particles
        Array.from(particles).forEach((p) => {
          const tl = gsap.getTweensOf(p)[0];
          if (tl) tl.timeScale(3);
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(glowRef.current, { opacity: 0.7, duration: 0.4 });
        gsap.to(svgRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
        Array.from(particles).forEach((p) => {
          const tl = gsap.getTweensOf(p)[0];
          if (tl) tl.timeScale(1);
        });
      });

      // 4. Click pulse
      el.addEventListener('click', () => {
        gsap.fromTo(
          pulseRef.current,
          { attr: { r: svgSize * 0.2 }, opacity: 0.8, scale: 0.5 },
          {
            attr: { r: svgSize * 0.7 },
            opacity: 0,
            scale: 1.2,
            duration: 0.6,
            ease: 'power2.out',
            onComplete() {
              gsap.set(pulseRef.current, { opacity: 0 });
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [svgSize]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center gap-2 select-none ${className}`}
      style={{ width: svgSize, height: svgSize }}
    >
      <VoxelSVG
        blocks={blocks}
        pixelSize={pixelSize}
        svgSize={svgSize}
        svgRef={svgRef}
        glowRef={glowRef}
        particlesRef={particlesRef}
        pulseRef={pulseRef}
      />
      {showText && (
        <span
          ref={textRef}
          className="font-bold tracking-tight"
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontSize: size * 0.9,
            color: COLORS.purple,
            textShadow: `0 0 12px ${COLORS.purple}88`,
          }}
        >
          Forge
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading variant – scatter / reassemble animation                   */
/* ------------------------------------------------------------------ */

export function ForgeLogoLoading({
  size = DEFAULT_SIZE,
  className = '',
}: Omit<ForgeLogoProps, 'showText'>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const blocks = buildVoxelLayout();
  const pixelSize = Math.max(2, Math.floor(size / 14));
  const svgSize = pixelSize * GRID + 8;
  const offset = (svgSize - GRID * pixelSize) / 2;

  const playFormation = useCallback(() => {
    if (REDUCED_MOTION) return;
    if (!svgRef.current) return;

    const rects = svgRef.current.querySelectorAll('[data-voxel-index]');

    // Scatter outward
    const scatterTl = gsap.timeline();

    rects.forEach((rect, i) => {
      const block = blocks[i];
      const targetX = offset + block.col * pixelSize;
      const targetY = offset + block.row * pixelSize;

      // Random scatter position
      const scatterX = targetX + (Math.random() - 0.5) * svgSize * 0.8;
      const scatterY = targetY + (Math.random() - 0.5) * svgSize * 0.8;
      const rotation = (Math.random() - 0.5) * 180;

      // Start scattered
      gsap.set(rect, {
        x: scatterX - targetX,
        y: scatterY - targetY,
        rotation,
        opacity: 0,
        scale: 0.3,
      });

      // Animate to final position
      scatterTl.to(
        rect,
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        i * 0.02
      );
    });

    return scatterTl;
  }, [blocks, pixelSize, svgSize, offset]);

  useEffect(() => {
    if (REDUCED_MOTION) return;
    const tl = playFormation();

    // Loop: after assembly, wait then scatter again
    const interval = setInterval(() => {
      if (tl) tl.kill();
      playFormation();
    }, 4000);

    return () => {
      clearInterval(interval);
      if (tl) tl.kill();
    };
  }, [playFormation]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: svgSize, height: svgSize }}
    >
      <svg
        ref={svgRef}
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <filter id="forge-loading-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#forge-loading-glow)">
          {blocks.map((b, i) => (
            <rect
              key={`loading-${b.col}-${b.row}-${b.layer}-${i}`}
              x={offset + b.col * pixelSize}
              y={offset + b.row * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={getBlockColor(b.layer, b.accent)}
              rx={pixelSize * 0.15}
              ry={pixelSize * 0.15}
              data-voxel-index={i}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export default ForgeLogo;
