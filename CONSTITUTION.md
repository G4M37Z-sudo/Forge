# FORGE DESIGN CONSTITUTION

**Version:** 1.0  
**Status:** Permanent source of truth  
**Authority:** All design decisions, animations, layouts, components, interactions, and experiences derive from this document.

---

## PREAMBLE

Forge is a digital workshop — an AI workspace where developers think, build, ship, and experiment.

This Constitution defines Forge's permanent design DNA. It is not a style guide. It is not a component catalog. It is the philosophical and practical foundation from which every visual, interactive, and motion decision will be derived for the life of the product.

Every principle here exists because it improves the developer experience. No rule is arbitrary. No preference is aesthetic alone. If a principle cannot be justified against the question *"Does this make Forge better for developers?"*, it does not belong here.

---

## I. BRAND PHILOSOPHY

### 1.1 Identity

Forge is not a dashboard.  
Forge is not a playground.  
Forge is a workshop.

The metaphor is deliberate. A workshop is where craftspeople think with their hands — where raw material becomes finished work through skilled, intentional effort. Forge should feel like that place: quiet enough to think, powerful enough to build anything, organized enough to find what you need, alive enough to stay interesting.

### 1.2 Personality

| Trait | Expression | Anti-pattern |
|-------|-----------|-------------|
| **Calm** | Motion is soft, colors are restrained, space is generous | Flashy, loud, attention-seeking |
| **Intelligent** | Hierarchy is clear, feedback is precise, states are unambiguous | Vague, ambiguous, over-simplified |
| **Engineered** | Components feel constructed, interactions feel tested, nothing is accidental | Random, inconsistent, fragile |
| **Alive** | The interface breathes, responds, breathes again | Static, frozen, dead |
| **Purposeful** | Every pixel earns its place, every animation communicates | Decorative, superfluous, trend-chasing |

### 1.3 Voice

Forge speaks in first person plural when describing capability.  
Forge speaks directly to the developer when guiding action.  
Forge never raises its voice.  
Forge never wastes a word.

### 1.4 The Premium Test

Before approving any design decision, ask:

- Would this still feel premium after 1,000 interactions?
- Would removing this make Forge feel diminished?
- Does this communicate something, or merely occupy space?
- Would an experienced developer trust this interface?

If any answer is unsatisfactory, redesign.

---

## II. COLOPHONY — Why the Best Works

This Constitution derives its principles from studying why world-class developer tools earn lasting trust:

**Why developers love Linear** — Speed. Every interaction is instant. The interface never makes you wait. Keyboard-first. Opinionated hierarchy.  
**Why developers trust Stripe** — Clarity. Every state is explicit. The documentation is the product. Nothing is ambiguous.  
**Why developers admire Vercel** — Restraint. The design does more with less. White space is structural, not lazy. Animations have purpose.  
**Why developers stay in VS Code** — Power. The tool scales from beginner to expert. Configuration is progressive, never overwhelming.  
**Why developers enjoy Arc** — Personality. The product has character without being childish. Delight is earned, not forced.  
**Why developers respect Apple** — Craft. Every detail is considered. Motion is physics-based. Nothing ships unfinished.

Forge does not imitate these products. Forge shares their philosophy while expressing its own identity: a workshop that thinks alongside you.

---

## III. VISUAL IDENTITY

### 3.1 Color Philosophy

Color in Forge is architectural. It structures space, communicates state, and establishes hierarchy. It does not decorate.

#### Primary Palette

| Token | Value | Role |
|-------|-------|------|
| `void` | `#06060C` | The deepest background — the workshop floor |
| `surface` | `#0C0C14` | Primary surfaces — cards, panels |
| `surface-elevated` | `#12121C` | Elevated surfaces — modals, dropdowns |
| `surface-subtle` | `#181824` | Subtle distinction within surfaces |
| `gold` | `#D4A853` | Primary accent — the forge's fire |
| `gold-dim` | `#A68B3C` | Secondary gold — for less prominent accents |
| `gold-bright` | `#E8C468` | Hover/active gold — the hottest point |
| `purple` | `#7C3AED` | Secondary accent — energy, AI presence |
| `purple-dim` | `#5B21B6` | Subdued purple — backgrounds, glows |

#### Semantic Palette

| Token | Value | Role |
|-------|-------|------|
| `text-primary` | `#F0F0F5` | Primary content text |
| `text-secondary` | `#A0A0B0` | Supporting text, descriptions |
| `text-tertiary` | `#5A5A6E` | Hint text, placeholders |
| `border` | `#1E1E2E` | Default borders |
| `border-hover` | `#2A2A3E` | Hover state borders |
| `success` | `#34D399` | Positive states |
| `warning` | `#FBBF24` | Caution states |
| `error` | `#F87171` | Destructive / error states |
| `info` | `#60A5FA` | Informational states |

#### Color Rules

1. Gold is the forge's fire — use it sparingly for maximum impact. Primary actions, active states, key highlights only.
2. Purple represents AI presence — thinking indicators, generated content, AI affordances.
3. Semantic colors are never used decoratively. They communicate state.
4. Text hierarchy is enforced through value only. Red `error` text at `text-secondary` lightness, not `text-primary`.
5. Gradients are directional and purposeful — they suggest light source or depth, never randomness.

### 3.2 Typography

Typography is the primary carrier of hierarchy and personality.

#### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Display | 3.5rem (56px) | 700 | 1.1 | -0.03em |
| H1 | 2.5rem (40px) | 600 | 1.2 | -0.02em |
| H2 | 1.75rem (28px) | 600 | 1.3 | -0.015em |
| H3 | 1.25rem (20px) | 500 | 1.4 | -0.01em |
| H4 | 1.125rem (18px) | 500 | 1.4 | 0 |
| Body | 1rem (16px) | 400 | 1.6 | 0 |
| Body Small | 0.875rem (14px) | 400 | 1.5 | 0 |
| Caption | 0.75rem (12px) | 400 | 1.5 | 0.02em |
| Mono | 0.875rem (14px) | 400 | 1.6 | 0 |

#### Typeface Selection

- **Display / Headings:** A geometric sans-serif with personality — sharp enough for code culture, warm enough for a workshop. Consider Inter, Geist, or Sora.
- **Body:** The same family as headings for cohesion, or a paired humanist sans (e.g., Source Sans 3) if the heading face is too rigid for long reading.
- **Monospace:** A code-optimized face for terminal, code blocks, and data. JetBrains Mono or Fira Code with ligatures enabled.

#### Typography Rules

1. Headlines never wrap more than two lines. Reformulate the content before breaking to three.
2. Line length for body text: 60–75 characters. Never exceed 80.
3. Never use font-weight below 400. Thin type on dark backgrounds fails accessibility.
4. Letter spacing on headings compensates for large size — it tightens, never expands.
5. Monospace is reserved for code, data, and terminal content — never for prose.

### 3.3 Spacing

Spacing communicates grouping, separation, and rhythm.

#### Scale

The spacing system uses a 4px base unit with a geometric progression for larger values:

| Token | Value | Use |
|-------|-------|-----|
| `space-1` | 4px | Tight internal padding (icon gaps, inline elements) |
| `space-2` | 8px | Compact padding (badge, chip, small button) |
| `space-3` | 12px | Default internal padding (input, button) |
| `space-4` | 16px | Component padding (card, panel) |
| `space-5` | 20px | Comfortable padding |
| `space-6` | 24px | Section internal padding |
| `space-8` | 32px | Section separation |
| `space-10` | 40px | Major section separation |
| `space-12` | 48px | Page-level vertical rhythm |
| `space-16` | 64px | Hero-level separation |

#### Spacing Rules

1. Use values from the scale exclusively. Never use arbitrary pixel values.
2. Vertical rhythm between sections is always `space-12` or `space-16`.
3. Related elements use `space-2` or `space-3`. Unrelated elements use `space-6` or `space-8`.
4. Padding is symmetric unless the design demands directional weight (e.g., more bottom padding for cards to create visual gravity).

### 3.4 Grid

- **Desktop (≥1280px):** 12-column, 80px columns, 24px gutters, 64px outer margins.
- **Tablet (768–1279px):** 8-column, flexible columns, 20px gutters, 40px margins.
- **Mobile (<768px):** 4-column, flexible columns, 16px gutters, 16px margins.
- **Max content width:** 1280px. Beyond this, margins expand; content does not.

### 3.5 Elevation

Elevation communicates depth and interaction layer.

| Level | Shadow | Use |
|-------|--------|-----|
| `0` | none | Flat surfaces, background |
| `1` | `0 1px 2px rgba(0,0,0,0.3)` | Cards, list items |
| `2` | `0 4px 8px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)` | Elevated cards, dropdowns |
| `3` | `0 8px 16px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2)` | Modals, popovers |
| `4` | `0 16px 32px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)` | Floating windows, command palette |

Elevation may also be expressed through `surface` color values rather than shadow alone — lighter surface values feel elevated on dark backgrounds.

### 3.6 Borders

- Default width: `1px`
- Default color: `border` (`#1E1E2E`)
- Hover color: `border-hover` (`#2A2A3E`)
- Active/focus: `gold` with `1px` solid border + `2px` gold glow offset
- Radius system:
  - `radius-sm`: 6px — small elements (badges, chips)
  - `radius-md`: 8px — inputs, buttons
  - `radius-lg`: 12px — cards, panels
  - `radius-xl`: 16px — modals, large containers
  - `radius-full`: 9999px — pills, avatars

### 3.7 Iconography

- **Style:** Outline (stroke-weight 1.5–2px). Not filled, not duotone as default.
- **Size scale:** 16px, 20px, 24px, 32px
- **Default size:** 20px (matches body text line-height rhythm)
- **Color:** Inherits from parent text color. Explicit color only for semantic purpose.
- **Source:** Lucide or Phosphor — clean, consistent, open-source.

### 3.8 The Pixel Language

Pixels are Forge's signature visual element. They are not Minecraft. They are not retro. They are the atomic units of digital creation — the smallest indivisible elements from which everything in Forge is built.

#### Pixel Roles

| Role | Expression | Frequency |
|------|-----------|-----------|
| Identity | Logo construction/deconstruction | Rare — brand moments |
| Thinking | Pixels assembling during AI processing | Moderate — during waits |
| Ambient | Slow floating particles in background | Very slow — subliminal |
| Energy | Pulse or flow on state changes | Brief — transitions |
| Notification | Brief pixel scatter on new events | Brief — alerts only |

#### Pixel Rules

1. Pixels are precious. They are never spam.
2. Pixel animations are always subtle. Maximum opacity: 0.6 for ambient, 0.8 for active states.
3. Pixel size: 2–4px. Never larger. They are atoms, not blocks.
4. Pixel count: ambient (< 20), active (< 50), identity-only events (up to 100).
5. Pixels never obscure content. They live in background layers.
6. Pixel color: gold and purple primarily. White at lower opacity for subtle sparkle.

---

## IV. MOTION SYSTEM

### 4.1 Motion Philosophy

Motion is communication. Every movement answers one question: **"What changed?"**

If nothing changed, nothing moves.

Animation exists to:
- **Guide attention** — toward what matters now
- **Explain hierarchy** — what contains what, what came from where
- **Provide feedback** — confirm that an action was received
- **Reinforce interaction** — the interface responds to the user
- **Create delight** — earned, never forced
- **Establish personality** — Forge is calm, intelligent, alive

Never animate for decoration. If an animation communicates nothing, remove it.

### 4.2 The Forge Motion Personality

Forge's motion feels natural, confident, soft, purposeful, responsive, and fluid.

It never feels robotic, exaggerated, childish, or distracting.

The metaphor: a well-made physical object. A quality camera shutter. A precision tool drawer. Things move with the confidence of engineering — not the hesitation of uncertainty, not the showmanship of performance.

### 4.3 Timing Tokens

| Token | Duration | Use |
|-------|----------|-----|
| `micro` | 80–180ms | Micro-interactions: toggle, checkbox, switch |
| `hover` | 120–220ms | Hover states, focus rings |
| `card` | 200–300ms | Card entrance, list item reflow |
| `panel` | 300–450ms | Panel slide, sidebar expand |
| `dialog` | 350–500ms | Modal entrance, overlay reveal |
| `page` | 450–700ms | Full page transition, route change |
| `hero` | 1200–2000ms | Hero entrance sequence |

#### Timing Rules

1. Overlap naturally. Avoid rigid sequential delays. Elements should feel like they are **invited onto the page**, not **queued in a list**.
2. Faster is almost always better than slower for interactive elements. Users perceive speed as quality.
3. Slower is appropriate for first impressions (hero, page load) — but never exceed 2 seconds for any single element.
4. Stagger between related elements: 40–80ms. This creates a natural flow without perceptible delay.

### 4.4 Easing Tokens

| Token | Value | Character | Use |
|-------|-------|-----------|-----|
| `ease-standard` | `power2.out` | Natural deceleration | Default for most animations |
| `ease-decelerate` | `power3.out` | Strong slowdown then stop | Elements entering (from off-screen, from 0 opacity) |
| `ease-accelerate` | `power3.in` | Slow start then quick departure | Elements exiting, leaving the page |
| `ease-spring` | `back.out(1.4)` | Subtle overshoot and settle | Windows opening, objects finding rest |
| `ease-bounce` | `elastic.out(1, 0.3)` | Playful overshoot | Reserved for success celebrations, never errors |
| `ease-smooth` | `power2.inOut` | Symmetric ease | Continuous motion (rotation, position changes) |
| `ease-sharp` | `power4.inOut` | Crisp start and end | State indicators, loading bars |

#### Easing Rules

1. Never use `none` (linear) for visible motion. Even minimal easing makes motion feel 10x more natural.
2. Entrance: use `ease-decelerate`. The element arrives and settles.
3. Exit: use `ease-accelerate`. The element accelerates away — it has somewhere to be.
4. Overshoot: `ease-spring` is for **settling**, not **bouncing**. The overshoot should be barely perceptible.
5. Never use bounce or elastic easing for task-critical feedback. They feel playful, which undermines seriousness.

### 4.5 GSAP Implementation Standards

GSAP is Forge's motion engine. All animation code follows these standards:

#### Setup Pattern (React / Next.js)

```tsx
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.from('.element', {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.06
    });
  }, { scope: containerRef });
  
  return <div ref={containerRef}>...</div>;
};
```

#### Defaults

```ts
gsap.defaults({
  duration: 0.3,
  ease: 'power2.out',
  overwrite: 'auto'
});
```

#### Reduced Motion

Every animation must respect `prefers-reduced-motion`:

```ts
const mm = gsap.matchMedia();

mm.add({
  reduceMotion: '(prefers-reduced-motion: reduce)',
  normal: '(prefers-reduced-motion: no-preference)'
}, (context) => {
  const { reduceMotion } = context.conditions;
  
  gsap.from('.element', {
    opacity: reduceMotion ? 1 : 0,
    y: reduceMotion ? 0 : 20,
    duration: reduceMotion ? 0 : 0.3,
    ease: 'power2.out'
  });
});
```

When reduced motion is preferred:
- All `x`, `y` transforms become `0`
- All durations become `0` (instant) or `0.01` (prevents layout issues)
- Opacity changes may persist for state communication (fade at 0.15s max)
- ScrollTrigger animations are disabled

### 4.6 Page Load Sequence

Never reveal everything instantly. Build anticipation through choreography.

**Sequence (with overlap):**

```
Background          ← immediate
  ↓ +60ms
Navigation          ← slide from top, 400ms
  ↓ +80ms
Logo                ← fade + subtle scale, 300ms
  ↓ +100ms
Headline            ← fade + translate up, 400ms
  ↓ +60ms
Supporting text     ← fade, 300ms
  ↓ +80ms
Primary button      ← fade + translate up, 300ms
  ↓ +120ms
Hero illustration   ← fade + scale from 0.95, 600ms
  ↓ +200ms
Feature cards       ← staggered, each 300ms, 60ms between
  ↓ +100ms
Secondary content   ← fade, 400ms
```

**Implementation pattern:**

```ts
const tl = gsap.timeline({
  defaults: { ease: 'power2.out' }
});

tl.from('.background', { opacity: 0, duration: 0 })
  .from('.nav', { y: -20, opacity: 0, duration: 0.4 }, '+=0.06')
  .from('.logo', { scale: 0.8, opacity: 0, duration: 0.3 }, '-=0.3')
  .from('.headline', { y: 30, opacity: 0, duration: 0.4 }, '-=0.2')
  .from('.subtitle', { opacity: 0, duration: 0.3 }, '-=0.3')
  .from('.cta', { y: 20, opacity: 0, duration: 0.3 }, '-=0.2')
  .from('.hero-visual', { scale: 0.95, opacity: 0, duration: 0.6 }, '-=0.2')
  .from('.feature-card', { 
    y: 40, opacity: 0, duration: 0.3, stagger: 0.06 
  }, '-=0.4')
  .from('.secondary', { opacity: 0, duration: 0.4 }, '-=0.3');
```

### 4.7 Scroll-Triggered Motion

Scrolling should feel cinematic. Sections emerge naturally.

#### Scroll Reveal Pattern

```ts
gsap.from('.reveal-section > *', {
  scrollTrigger: {
    trigger: '.reveal-section',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  },
  y: 40,
  opacity: 0,
  duration: 0.6,
  ease: 'power2.out',
  stagger: 0.08
});
```

#### Available Scroll Effects (choose one or combine)

| Effect | From | Implementation |
|--------|------|---------------|
| Fade | `opacity: 0` | Universal — every scroll reveal includes this |
| Rise | `y: 40` | Default for most content |
| Scale | `scale: 0.95` | Subtle — for images, featured cards |
| Blur | `filter: 'blur(8px)'` | Sparse — hero images, backgrounds only |
| Slide | `x: ±60` | Directional — for alternating content |

#### Scroll Rules

1. Every element that enters viewport on scroll must have scroll-triggered animation. This is a hard requirement.
2. Animations must re-trigger on scroll-up (toggleActions: `play none none reverse`).
3. Never use excessive parallax. The user is reading. Never interrupt reading.
4. Scroll offset: `start: 'top 85%'` as default. `top 80%` for elements that should reveal earlier.
5. Stagger: 60–80ms between sibling elements within a section.
6. Never animate `width`, `height`, `top`, `left` on scroll — use transforms only.

### 4.8 Component Motion Specifications

#### Windows (Floating Workspace)

Windows have physical weight.

**Opening:**
```ts
gsap.fromTo(window, 
  { opacity: 0, scale: 0.98, y: 12, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  { opacity: 1, scale: 1, y: 0, boxShadow: '0 16px 32px rgba(0,0,0,0.5)', duration: 0.4, ease: 'back.out(1.4)' }
);
```

**Closing:**
```ts
gsap.to(window, { 
  opacity: 0, scale: 0.97, y: -8, duration: 0.25, ease: 'power3.in' 
});
```

**Settling:** An extremely subtle bounce (0.5px, 60ms) after the window reaches rest. Barely perceptible but adds physicality.

#### Panels

Panels feel magnetic.

**Hover:**
```ts
gsap.to(panel, { 
  y: -2, borderColor: '#2A2A3E', boxShadow: '0 8px 16px rgba(0,0,0,0.3)', duration: 0.2, ease: 'power2.out' 
});
```

**Leave:** All hover properties return to default with `duration: 0.3, ease: 'power2.out'`.

**Active (inner glow):** A `boxShadow: inset 0 0 20px rgba(212,168,83,0.05)` appears on the active panel. Just enough warmth to notice.

#### Buttons

Buttons respond. They never simply change color.

**Hover:**
- Slight Y elevation: `-1px`
- Light sweep: a pseudo-element gradient slides across the button (left to right, 400ms)
- Soft glow: `boxShadow: 0 0 12px rgba(212,168,83,0.15)`
- Cursor attraction: the button subtly scales to `1.02` when the cursor is within 20px (via proximity detection)

**Press:**
- Scale compresses to `0.97`
- Shadow tightens toward the button
- Duration: 80ms
- Release: spring back to 1.0 over 200ms with `back.out(1.2)`

**Success state:**
- Brief green pulse on the border (200ms)
- Checkmark icon draws itself (300ms, stroke-dashoffset)

**Error state:**
- Gentle shake: `x: ±4px`, 3 oscillations, 300ms total
- No red flash. A soft red glow appears: `boxShadow: 0 0 8px rgba(248,113,113,0.2)`

#### Inputs

**Focus:**
- Border transitions to gold over 200ms
- Glow appears: `boxShadow: 0 0 0 3px rgba(212,168,83,0.15)`
- Cursor fades in smoothly (if custom cursor)

**Validation success:**
- Green border sweep from left to right (300ms, clip-path animation)
- Check icon fades in (200ms)

**Validation error:**
- Red pulse on border (opacity 0.6 → 0.3 → 0.6, 600ms, 2 repeats)
- Error text fades in below (200ms)
- Never flash. Never jarring.

#### Navigation

Navigation feels anchored.

**Active tab:**
- Underline slides to new position (transform: translateX, 300ms, ease-smooth)
- Active text lightens to text-primary
- Subtle gold glow appears under the active tab

**Tab switch:**
- Content cross-fades: outgoing at 200ms, incoming at 300ms
- Underline glides — never jumps

#### Command Palette (⌘K)

**Opening:**
```ts
// Overlay
gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.15 });
// Palette
gsap.fromTo(palette, 
  { opacity: 0, scale: 0.96, y: -8 },
  { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: 'power2.out' }
);
```

**Results appear:** Each result fades in with stagger 30ms.
**Closing:** Reverse of opening, 150ms total.

#### Toasts / Notifications

**Entering:**
- Slide in from the right edge: `x: 100, opacity: 0` → `x: 0, opacity: 1`
- Duration: 300ms, ease-decelerate

**Exiting:**
- Slide out to the right with fade: `opacity: 0, x: 40`
- Duration: 200ms, ease-accelerate

**Auto-dismiss:** After the configured duration, auto-exit with a subtle progress bar shrinking over the last 2 seconds.

### 4.9 Logo Animation

The Forge logo is alive.

**Idle state:**
- 3–5 small pixels (2px, gold at 0.3 opacity) slowly orbit the logo at varying radii
- A breathing glow: the logo's drop-shadow pulses between `rgba(212,168,83,0.1)` and `rgba(212,168,83,0.2)` over 4 seconds

**Hover:**
- Orbiting pixels react — they accelerate slightly and move toward the cursor
- Logo gains 2% scale increase (200ms, ease-spring)
- Glow intensifies

**Click:**
- A brief energy pulse radiates outward from the logo center
- Gold ring expands from 0 to 30px radius and fades (400ms)

**Loading state:**
- Logo deconstructs into pixels — the SVG paths dissolve into 20–30 individual 2px squares
- Pixels scatter outward briefly (300ms)
- Then reassemble into the logo shape (600ms, ease-spring)
- This loading animation is Forge's identity signature

### 4.10 Avatar Animation

Forge's avatar is voxel-inspired but entirely original. It never resembles Minecraft.

**Idle:**
- Breathing: subtle scale oscillation (0.98–1.02, 3s cycle)
- 2–3 tiny particles float nearby
- Occasional blink (eyes close for 120ms, every 4–8 seconds randomized)

**Thinking:**
- 4–6 small pixels orbit the avatar at different speeds and radii
- Eyes brighten slightly (purple glow at 0.3 opacity)
- Subtle energy pulse radiates outward every 2 seconds

**Response:**
- Particles settle
- A brief confirmation pulse (scale 1.03 → 1.0, 200ms)

### 4.11 Background Motion

The background is alive. Very slowly.

Users should notice only after several seconds. This is ambient presence, not distraction.

**Techniques (choose 1–2, never all):**
- Moving gradient: a large radial gradient shifts position over 20–30 seconds
- Floating pixels: < 15 pixels, 2px, gold/purple at 0.1–0.2 opacity, drifting slowly
- Grid drift: a subtle dot-grid shifts position over 30 seconds (2–4px total movement)

**Rules:**
- Background animations never exceed 10% of the animation frame budget.
- Background animations are the first to disable under `prefers-reduced-motion`.
- Background animations are the first to disable under performance pressure (frame drops).

### 4.12 AI Thinking States

Never show a spinner. Never show a loading bar.

When the AI is thinking, show construction:

**Options (context-dependent):**
1. **Pixel assembly** — small pixels gather and arrange into a shape, then disperse and reform (loop)
2. **Energy flow** — a horizontal line of gold pixels flows left to right, fading at edges (like a data stream)
3. **Block movement** — 3–4 small squares shift position in a slow, deliberate pattern
4. **Waveform** — a soft sine wave drawn in gold at low opacity, stretching and compressing
5. **Breathing indicator** — a single circle that slowly expands and contracts (1.5s cycle)

The chosen indicator should feel like the AI is **constructing thoughts**, not **waiting for a bus**.

### 4.13 Page Transitions

Pages transform. They do not disappear.

**Techniques (by context):**

| Context | Transition | Duration |
|---------|-----------|----------|
| Same-level navigation | Cross-fade with slight Y offset | 300ms |
| Drill-down (list → detail) | Current content fades + slides left; new content fades + slides from right | 400ms |
| Back navigation | Reverse of drill-down | 350ms |
| Modal overlay | Background blurs (2px) + darkens; modal enters from scale 0.95 | 300ms |
| Tab switch | Content cross-fade; underline slides | 250ms |
| Full context switch | Pixel dissolve out → pixel assemble in | 600ms |

### 4.14 Cursor Interaction

Subtle. Never create exaggerated cursor trails.

**Proximity response:**
- Buttons within 40px of cursor get a subtle scale increase (1.01) and glow
- Cards within 60px acknowledge with a slight border brightening

**Rules:**
- Cursor interactions are disabled on mobile/touch
- Cursor interactions are the first disabled under performance pressure
- Never create a visible trail. The response is in the objects, not the cursor.

### 4.15 Performance Budget

Animation must preserve 60fps. Performance overrides aesthetics.

| Metric | Budget |
|--------|--------|
| Per-frame JS | < 4ms |
| Simultaneous active tweens | < 30 |
| ScrollTrigger calculations per frame | < 8 |
| Background animation budget | < 10% of frame |
| Total JS bundle (GSAP + plugins) | < 25KB gzipped |
| Layout thrash (forced reflows) | 0 — always batch reads before writes |

**If any animation causes frame drops:**
1. Reduce the number of animated properties
2. Replace layout animations with transform-only
3. Reduce the number of simultaneous animations
4. Disable the most expensive animations (background first, then ambient, then proximity)
5. If still dropping: remove the animation entirely

Users feel speed first. Visual quality second.

---

## V. COMPONENT SYSTEM

### 5.1 Component Architecture

Every component is defined by six properties:
1. **Purpose** — what it does and why it exists
2. **Hierarchy** — where it sits in the visual stack
3. **States** — all possible states and transitions
4. **Visual language** — color, spacing, elevation, radius
5. **Interaction** — how it responds to input
6. **Motion** — entrance, hover, active, exit, error
7. **Accessibility** — ARIA, keyboard, focus, reduced-motion

### 5.2 Core Components

#### Button

| Property | Specification |
|----------|--------------|
| Purpose | Primary action trigger |
| Variants | `primary` (gold fill), `secondary` (gold outline), `ghost` (transparent), `danger` (red outline) |
| Sizes | `sm` (32px h), `md` (40px h), `lg` (48px h) |
| Padding | `px-4` (sm), `px-5` (md), `px-6` (lg) |
| Radius | `radius-md` (8px) |
| Font | Body Small, weight 500 |
| Icon gap | `space-2` |
| Min-width | 80px (prevents tiny single-char buttons) |

**States:** default → hover → active → focus → disabled → loading → success → error

**Loading state:** Button text fades out (200ms) → skeleton pulse fills the button area → on completion, success/error state appears.

#### Input

| Property | Specification |
|----------|--------------|
| Purpose | Text/data entry |
| Variants | `default`, `search` (with icon), `code` (monospace) |
| Sizes | `sm` (32px h), `md` (40px h) |
| Padding | `px-3 py-2` (sm), `px-4 py-2.5` (md) |
| Radius | `radius-md` (8px) |
| Font | Body (default), Mono (code variant) |
| Border | `1px solid border` |
| Focus | `1px solid gold` + glow ring |

**Label:** Always visible (never placeholder-only). Label sits above with `space-1` gap. Caption/Body Small.

**Error:** Error text below input, `space-1` gap. Red. Never replaces help text; it appears in addition.

#### Card

| Property | Specification |
|----------|--------------|
| Purpose | Grouped content container |
| Variants | `default`, `interactive` (hover state), `selected` (active state) |
| Padding | `p-6` (24px) |
| Radius | `radius-lg` (12px) |
| Border | `1px solid border` |
| Background | `surface` |
| Elevation | Level 1 |

**Interactive card hover:** `y: -2px`, border brightens, shadow expands, inner glow appears.

**Selected state:** Gold border (1px solid), subtle gold inner glow.

#### Table

| Property | Specification |
|----------|--------------|
| Purpose | Structured data display |
| Header | Sticky, `surface-elevated` background, H4 weight 600 |
| Row | 48px min-height, alternate with `surface` / `surface-elevated` |
| Border | Bottom only, between rows, `border` color |
| Hover | Row background brightens |
| Sort indicator | Arrow icon with rotation animation on toggle |
| Selection | Checkbox column, 32px width |

#### Sidebar

| Property | Specification |
|----------|--------------|
| Purpose | Primary navigation and context |
| Width | 240px (expanded), 64px (collapsed, icon-only) |
| Background | `surface` with left border `1px solid border` |
| Sections | Grouped by purpose, `space-4` between groups |
| Active item | Gold left border (2px), `text-primary`, gold icon |

#### Dialog / Modal

| Property | Specification |
|----------|--------------|
| Purpose | Focused task or confirmation |
| Max-width | 480px (small), 640px (medium), 800px (large) |
| Padding | `p-8` |
| Radius | `radius-xl` (16px) |
| Elevation | Level 4 |
| Overlay | `void` at 60% opacity + 2px backdrop-filter blur |

**Entrance:** Scale from 0.96, fade in, 350ms, ease-spring.  
**Exit:** Scale to 0.97, fade out, 200ms, ease-accelerate.

#### Command Palette

| Property | Specification |
|----------|--------------|
| Purpose | Keyboard-first universal search and actions |
| Trigger | `⌘K` / `Ctrl+K` |
| Width | 560px, centered |
| Position | Top 20% of viewport |
| Input | Full-width, auto-focused, search variant |
| Results | Max 8 visible, scrollable, grouped by type |
| Active result | `gold` left border, `surface-elevated` background |

#### Toast

| Property | Specification |
|----------|--------------|
| Purpose | Asynchronous feedback |
| Variants | `success`, `error`, `warning`, `info` |
| Position | Bottom-right, stacked with 12px gap |
| Max visible | 3; overflow queued |
| Auto-dismiss | 5s (default), 8s (error), ∞ (action-required) |
| Width | 320px |

#### Tab

- Underline style (not pill/radio style)
- Underline is 2px `gold`, animated position via transform
- Content transitions with cross-fade (250ms)

#### Dropdown / Select

- Triggered on click/down-arrow, not hover
- Matches trigger width (minimum)
- Elevation Level 3
- Items: 36px height, `space-3` padding
- Active item: `gold` left border, `surface-elevated` background
- Search filter if > 8 items

#### Code Block

- Monospace font, with ligatures
- Syntax highlighting: dark theme matching Forge palette (gold for keywords, purple for types, green for strings)
- Line numbers: right-aligned, `text-tertiary` color, 48px gutter
- Copy button: top-right, ghost variant, appears on hover
- Max height before scroll: 400px
- Language badge: top-left, caption size, `surface-elevated` background

#### Terminal

- Monospace, no ligatures
- Background: `void` (pure black)
- Caret: blinking `gold` block
- Prompt: `gold` username/path, `text-primary` cursor
- Output: `text-secondary`
- Error output: `error` color
- Scrollbar: thin, `border` color, `gold` thumb on hover
- Min height: 200px, default: 300px

### 5.3 Empty States

Empty states are invitations to act, not notifications of absence.

- Illustration: Simple, line-art style, `text-tertiary` color
- Headline: H3, clear and direct ("No projects yet")
- Description: Body, helpful and specific ("Create your first project to get started")
- CTA: Primary button, action-oriented ("Create project")

### 5.4 Error States

Errors remain elegant. They never punish.

- Gentle shake animation (±4px, 3 oscillations, 300ms)
- Soft red glow — never a hard red flash
- Error message: specific, actionable, in the interface's voice
- Recovery path: always offered (retry, undo, contact)

---

## VI. LAYOUT PRINCIPLES

### 6.1 Responsive Breakpoints

| Name | Min-width | Columns | Behavior |
|------|-----------|---------|----------|
| Mobile | 0 | 4 | Single column, stacked navigation |
| Tablet | 768px | 8 | Optional sidebar, 2-column grids |
| Desktop | 1280px | 12 | Full layout with sidebar |
| Wide | 1536px | 12 | Increased margins, no content stretch |

### 6.2 Layout Patterns

**App shell:** Fixed sidebar (left) + scrollable main content + optional right panel.

**Content max-width:** 720px for prose (documentation, blog). 1280px for dashboard layouts.

**Vertical rhythm:** All vertical spacing between sections is a multiple of `space-4`. No arbitrary vertical gaps.

**Card grids:** Auto-fill with `minmax(280px, 1fr)`. Cards never exceed 400px width in a grid.

### 6.3 Dark Mode Philosophy

Forge is dark-first. The dark theme is not an alternative — it is the primary experience.

**Rationale:**
- Developers work in dark environments (IDE, terminal)
- Dark backgrounds reduce eye strain during extended sessions
- Gold accents gain maximum contrast and warmth against dark
- Pixel and glow effects are native to dark surfaces

**Light mode** may be supported in future but is secondary. It must be an intentional design, not an `invert()` of the dark palette.

---

## VII. UX SYSTEM

### 7.1 Navigation

**Primary:** Sidebar with icon + label, collapsible to icon-only.  
**Secondary:** Tabs within content areas.  
**Tertiary:** Breadcrumbs for deep navigation.  
**Escape:** Command palette (⌘K) for power users.

### 7.2 Information Architecture

- Organize by **task**, not by **entity**. Developers think "I want to deploy," not "I want to see the deployments page."
- Limit navigation depth to 3 levels. If deeper is needed, restructure.
- Every page has a clear primary purpose. If a page serves two purposes, split it.

### 7.3 Progressive Disclosure

- Default view shows the 80% use case
- Advanced settings behind disclosure panels
- Keyboard shortcuts shown only after first use or on request (?)
- Power features accessible via command palette, not cluttering the UI

### 7.4 Feedback

- **Immediate (< 100ms):** Visual state change (button press, toggle)
- **Quick (100–300ms):** Validation results, search suggestions
- **Standard (300ms–1s):** Data saves, form submissions, navigation
- **Long (> 1s):** Builds, deployments, AI generation — show progress with construction animation

Every action must produce visible feedback. If the user does something and nothing changes, the design is broken.

### 7.5 Error Recovery

- Every destructive action has an undo window (5 seconds)
- Confirmation dialogs for irreversible actions only
- Error messages include: what happened + why + how to fix it
- Network errors: automatic retry with exponential backoff (1s, 2s, 4s). Show retry count.

### 7.6 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` | Command palette |
| `⌘/` | Keyboard shortcut reference |
| `⌘S` | Save (local-first, no "unsaved changes" anxiety) |
| `⌘Enter` | Submit / Confirm |
| `⌘[` / `⌘]` | Navigate back / forward |
| `Escape` | Close topmost overlay / cancel |

Shortcuts are discoverable: shown in tooltips, in the command palette, and on the `⌘/` help overlay.

### 7.7 Onboarding

- Never block the user with a tour. Show, don't tell.
- First-run: Command palette shortcut prominently displayed
- Empty states contain CTAs — the onboarding IS the empty state
- Progressive: reveal features as the user encounters contexts where they're useful

---

## VIII. ACCESSIBILITY

### 8.1 Standards

Target: **WCAG 2.1 AA** minimum. Aim for AA+ where feasible.

### 8.2 Requirements

1. **Color contrast:** Minimum 4.5:1 for normal text, 3:1 for large text. Verify all `text-*` tokens against their backgrounds.
2. **Focus indicators:** Every interactive element has a visible focus ring. The ring is `2px solid gold` offset `2px` from the element. Never use `outline: none` without a replacement.
3. **Keyboard navigation:** All interactive elements are reachable via Tab. Custom widgets follow WAI-ARIA patterns.
4. **Screen readers:** All state changes are announced via `aria-live` regions. Motion-only feedback is supplemented with accessible text.
5. **Reduced motion:** All animations respect `prefers-reduced-motion: reduce`. No animation is the sole carrier of information.
6. **Touch targets:** Minimum 44×44px on mobile. Spacing between adjacent targets ≥ 8px.
7. **Semantic HTML:** Use native elements (`button`, `a`, `input`) before custom ARIA roles.
8. **Alt text:** All images have descriptive alt text. Decorative images use `alt=""`.

### 8.3 Accessibility Testing Checklist

For every component:
- [ ] Keyboard navigable (Tab, Enter, Escape, Arrow keys)
- [ ] Focus ring visible and gold
- [ ] Contrast ratio ≥ 4.5:1
- [ ] Announces state changes to screen readers
- [ ] Respects reduced-motion
- [ ] Touch targets ≥ 44px
- [ ] Not dependent on color alone

---

## IX. PERFORMANCE SYSTEM

Performance is design. A slow interface feels broken regardless of how beautiful it is.

### 9.1 Targets

| Metric | Budget |
|--------|--------|
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.0s |
| Time to Interactive | < 3.0s |
| Cumulative Layout Shift | < 0.05 |
| First Input Delay | < 50ms |
| Bundle size (JS) | < 150KB gzipped (initial route) |
| GSAP + plugins | < 25KB gzipped |
| Images (above fold) | < 100KB total, WebP/AVIF |
| Total DOM nodes | < 1500 per page |

### 9.2 Strategies

1. **Route-based code splitting** — every page loads only its own JS
2. **Lazy GSAP registration** — register plugins only in components that use them
3. **Intersection Observer for below-fold content** — images and heavy components load on approach
4. **CSS containment** — `contain: layout style paint` on card components
5. **Transform-only animation** — never animate layout properties; use `will-change` sparingly and remove after animation
6. **Font loading** — `font-display: swap` with size-adjusted fallback to minimize CLS
7. **Image optimization** — responsive `srcset`, AVIF → WebP → PNG, lazy below fold
8. **Animation budget** — if frame time exceeds 12ms, reduce concurrent animations

---

## X. ENGINEERING PHILOSOPHY

### 10.1 Principles

1. **Implementable.** Every design decision in this Constitution must translate to code. No theoretical ideals that cannot be built.
2. **Composable.** Components are building blocks, not paintings. They must work in any reasonable combination.
3. **Tokenized.** Every color, spacing, timing, and easing value is a design token. No magic numbers in code.
4. **Typed.** All components are TypeScript. Props are typed. Tokens are typed.
5. **Documented.** Every component has a usage example and an accessibility note.
6. **Tested.** Every component has visual regression tests and interaction tests.

### 10.2 File Organization

```
forge/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                 # Primitive components (Button, Input, Card)
│   ├── composite/          # Composed components (SearchBar, CommandPalette)
│   ├── motion/             # Animation components (ScrollReveal, FadeIn, PixelField)
│   └── layout/             # Layout components (AppShell, Sidebar, Panel)
├── design-tokens/
│   ├── colors.ts           # Color tokens
│   ├── spacing.ts          # Spacing tokens
│   ├── typography.ts       # Type scale tokens
│   ├── motion.ts           # Timing + easing tokens
│   └── index.ts            # Aggregated token export
├── hooks/
│   ├── useGSAP.ts          # GSAP setup with defaults + reduced motion
│   ├── useScrollReveal.ts  # Scroll-triggered animation hook
│   └── useMotionPreference.ts
└── styles/
    └── globals.css         # Tailwind base + custom properties
```

### 10.3 Design Token Pattern

```ts
// design-tokens/motion.ts
export const motion = {
  duration: {
    micro: 0.12,
    hover: 0.18,
    card: 0.25,
    panel: 0.35,
    dialog: 0.4,
    page: 0.55,
    hero: 1.5,
  },
  ease: {
    standard: 'power2.out',
    decelerate: 'power3.out',
    accelerate: 'power3.in',
    spring: 'back.out(1.4)',
    smooth: 'power2.inOut',
    sharp: 'power4.inOut',
  },
  stagger: {
    fast: 0.04,
    default: 0.06,
    relaxed: 0.08,
  },
} as const;
```

---

## XI. DESIGN REVIEW CHECKLIST

Before any design or code ships, it must pass the following review from each perspective:

### Product Designer
- [ ] Does this communicate hierarchy clearly?
- [ ] Is the visual language consistent with the token system?
- [ ] Does the layout serve the task, not the aesthetics?

### Creative Director
- [ ] Does this feel uniquely Forge? Would users recognize it without the logo?
- [ ] Does the personality come through (calm, intelligent, alive)?
- [ ] Is there one memorable element, not ten forgettable ones?

### UX Researcher
- [ ] Does this reduce friction or add it?
- [ ] Can a new user understand this without documentation?
- [ ] Does this work for both novice and power users?

### Frontend Architect
- [ ] Is this implementable with current web standards?
- [ ] Does this maintain 60fps on mid-range hardware?
- [ ] Is the component composable and reusable?

### Motion Designer
- [ ] Does every animation communicate something?
- [ ] Are timings and easings using the token system?
- [ ] Is reduced-motion behavior defined?

### Accessibility Specialist
- [ ] Does this meet WCAG 2.1 AA?
- [ ] Are all states communicated without relying on color alone?
- [ ] Is keyboard navigation supported?

### Performance Engineer
- [ ] Does this stay within the performance budget?
- [ ] Are transforms preferred over layout animations?
- [ ] Are animations batched and overlap-optimized?

---

## XII. FINAL ARTICLES

### Article I
Forge is a living workshop. Everything feels crafted. Nothing feels generated.

### Article II
Motion is communication. Every animation answers "What changed?" If nothing changed, nothing moves.

### Article III
Performance overrides aesthetics. Users feel speed first.

### Article IV
Accessibility is not a feature. It is a foundation.

### Article V
Forge may learn from world-class software. Forge never copies.

### Article VI
The Constitution is alive. It evolves as Forge evolves. But every change must be justified against the same question: *"Does this make Forge better for developers?"*

### Article VII
Users should remember how Forge felt, not merely how it looked.

---

*This Constitution was ratified on the principle that great software is not built by accident. Every pixel, every frame, every interaction is a decision. This document ensures those decisions are coherent, justified, and enduring.*

*Forge — Where developers build.*
