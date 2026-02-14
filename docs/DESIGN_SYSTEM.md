# Quicksilver Labs Design System

Complete visual identity specification extracted from the website codebase.

---

## Quick Reference

### Core Colors
```
Background:      #121a3a (Deep navy blue)
Foreground:      #ffffff (White)
Accent:          #00ff96 (Neon green)
Accent RGB:      0, 255, 150
Secondary Text:  #b8b8b8 (Light gray - WCAG AA compliant)
Contrast Dark:   #000000
Contrast Light:  #FAFAFA
```

### Most-Used Typography
```
Body:            16px / 1.7 line-height / Plus Jakarta Sans
Body Large:      18px / 1.7 line-height
Headline Large:  36px→48px→64px→84px (responsive) / 1.15 line-height / weight 300
Headline Medium: 32px→40px→56px→64px (responsive) / 1.15 line-height / weight 300
Code Accent:     11px / uppercase / 0.08em letter-spacing / monospace
Caption:         12px / 1.4 line-height
```

### Common Spacing
```
Section Padding Y:  4rem (64px) standard, 6rem (96px) feature sections
Horizontal Padding: 16px mobile → 24px sm → 64px lg
Gap Pattern:        gap-6 sm:gap-8 lg:gap-12
Card Padding:       p-6 (24px)
Max Content Width:  max-w-7xl (1280px)
Reading Width:      65ch (optimal readability)
```

### Key Component Patterns
```
Card Border:        border border-accent/50 rounded-sm
Card Hover:         hover:border-accent hover:bg-accent/5
Card Glow:          shadow-[0_0_16px_rgba(var(--accent-rgb),0.25)]
Button Primary:     bg-accent text-background min-h-[48px] font-mono uppercase
Button Hover:       hover:bg-transparent hover:text-accent
Transition:         transition-all duration-200
```

### Standard Animations
```
Duration:           200ms (UI feedback)
Spring Physics:     stiffness: 300, damping: 30 (nav)
Entry Animation:    opacity 0→1, y: 20→0, duration: 0.6s
Scale Hover:        1 → 1.05
Viewport Trigger:   -100px margin (before in-view)
```

### Breakpoints
```
Mobile:  base (0px)
Small:   640px
Medium:  768px
Large:   1024px
XL:      1280px
```

---

## 1. COLOR PALETTE

### Primary Colors (CSS Variables)
Defined in `globals.css`:

```css
:root {
  --background: #121a3a;      /* Deep navy blue - main background */
  --foreground: #ffffff;       /* White - primary text */
  --accent: #00ff96;           /* Bright neon green - CTAs, highlights, interactive elements */
  --accent-rgb: 0, 255, 150;   /* RGB values for rgba() usage */
  --secondary-text: #b8b8b8;   /* Light gray - body text, WCAG AA compliant */
}
```

**Usage Contexts:**
- `--background`: Applied to body, sections, cards
- `--foreground`: Primary headings, navigation, high-emphasis text
- `--accent`: CTAs, active states, borders, hover states, labels, code highlights
- `--secondary-text`: Body paragraphs, supporting text, metadata

### Contrast Colors (Light Mode Utilities)
```
Contrast Box Background:          #000000 (Black)
Contrast Box Foreground:          #FAFAFA (Almost white)
Contrast Box Inverse Background:  #FAFAFA
Contrast Box Inverse Foreground:  #000000
```

### Opacity & Transparency Patterns

**Accent Variations:**
```
accent/5    - 5% opacity   - Subtle hover background
accent/20   - 20% opacity  - Border accents, gradient stops
accent/25   - 25% opacity  - Glow effects, shadows
accent/30   - 30% opacity  - Tags, labels
accent/40   - 40% opacity  - Secondary borders
accent/50   - 50% opacity  - Primary card borders
accent/80   - 80% opacity  - Hover text fade
```

**Black Overlays:**
```
black/6     - 6% opacity   - Subtle UI separation
black/8     - 8% opacity   - Grid overlay sections
black/10    - 10% opacity  - Divider lines
```

**White Overlays:**
```
white/60    - 60% opacity  - Inactive navigation items
white/80    - 80% opacity  - Secondary interactive elements
```

**RGBA Usage:**
```css
rgba(var(--accent-rgb), 0.25)   /* Glow shadows */
rgba(var(--accent-rgb), 0.5)    /* Border accents */
rgba(0, 0, 0, 0.1)              /* Subtle black overlays */
```

---

## 2. TYPOGRAPHY

### Font Families

**Primary Sans Serif:**
```css
font-family: var(--font-sans);
/* Resolves to: Plus_Jakarta_Sans, system-ui, sans-serif */
```
- Imported via Google Fonts
- Variable font with weights 300-800
- Applied with `-webkit-font-smoothing: antialiased`

**Monospace:**
```css
font-family: 'Courier New', Monaco, Menlo, monospace;
```
- Used for: Labels, code accents, technical annotations, CTAs

### Type Scale

| Class Name | Size | Line Height | Weight | Letter Spacing | Usage |
|------------|------|-------------|--------|----------------|-------|
| `.meta` | 10px | 1.4 | 400 | default | Smallest metadata |
| `.label` | 11px | 1.4 | 400 | default | Form labels |
| `.text-label` | 11px | 1.3 | 400 | default | Label variant |
| `.code-accent` | 11px | default | 400 | 0.08em | Uppercase code labels |
| `.annotation` | 10px | default | 400 | 0.08em | Technical annotations |
| `.caption` / `.text-caption` | 12px | 1.4 | 400 | default | Small supporting text |
| `.body` | 16px | 1.7 | 400 | default | Base body text |
| `.body-lg` | 18px | 1.7 | 400 | default | Large body (desktop) |
| `.body-text` | 16px→18px | 1.7 | 400 | default | Responsive body |
| `.heading` | 24px (1.5rem) | 1.2 | 400 | default | Mid-level headings |
| `.display` | 32px (2rem) | 1.15 | 400 | default | Large display |
| `.headline-medium` | 32px→40px→56px→64px | 1.15 | 300 | -0.02em | Section headings |
| `.headline-large` | 36px→48px→64px→84px | 1.15 | 300 | -0.03em | Hero headlines |
| `.metric-number` | 36px→48px→64px | default | 300 | default | Statistics |

**Responsive Typography Breakpoints:**

Hero Headline (`.headline-large`):
```
Base (mobile):  36px / line-height: 1.15 / weight: 300 / tracking: -0.03em
sm: (640px):    48px
md: (768px):    64px
lg: (1024px):   72px
xl: (1280px):   84px
```

Section Headline (`.headline-medium`):
```
Base:   32px / line-height: 1.15 / weight: 300
sm:     40px / tracking: -0.02em
md:     56px / tracking: -0.02em
lg:     64px
```

Body Text (`.body-text`):
```
Base:   16px / line-height: 1.7
sm:     18px / line-height: 1.7
```

Metric Numbers:
```
Base:   30px / weight: 300
sm:     36px
md:     48px
lg:     64px
```

### Font Weights

```
300 - Light    - Headlines, display text, metrics (creates elegant, modern feel)
400 - Regular  - Body text, navigation, standard UI
600 - Semibold - Accent numbers, active nav items, emphasis
700 - Bold     - Article h2, h3, h4 headings
800 - Extrabold - Article h1 headings
```

### Letter Spacing

```
Default:          0 (no tracking)
.tracking-mono:   0.08em (uppercase labels, code)
.tracking-wider:  varies (contextual)
Headline Large:   -0.03em (tight, modern)
Headline Medium:  -0.02em (slightly tight)
```

**Usage Pattern:**
- Negative tracking on large headlines creates visual tightness
- Positive tracking on uppercase monospace creates clarity
- Body text uses default (0) spacing

### Line Height

```
1.15  - Headlines (tight, impactful)
1.2   - Mid-level headings
1.3   - Labels (compact)
1.4   - Small text, captions, metadata
1.7   - Body text (generous, readable)
```

### Text Transform Patterns

```
uppercase - Code accents, labels, buttons, nav items, technical annotations
lowercase - Body text, descriptions
default   - Headlines, display text
```

**Examples:**
```html
<!-- Code accent label -->
<span class="code-accent">[SECTION_NAME]</span>

<!-- Annotation -->
<span class="annotation">METADATA</span>

<!-- CTA Button -->
<button class="font-mono uppercase tracking-mono">EXPLORE</button>
```

---

## 3. SPACING & LAYOUT

### Vertical Section Padding (CSS Variables)

```css
--section-padding-y-tight: 3rem;   /* 48px - compact sections */
--section-padding-y-sm: 4rem;      /* 64px - standard sections */
--section-padding-y-md: 5rem;      /* 80px - main content */
--section-padding-y-lg: 6rem;      /* 96px - feature sections */
```

**Usage:**
```html
<section class="py-[var(--section-padding-y-md)]">
<section class="py-[var(--section-padding-y-lg)]">
```

### Horizontal Padding (Responsive)

```
Mobile (base):   px-4   (16px)
Small (640px):   sm:px-6  (24px)
Medium (768px):  md:px-12 or md:px-16 (48-64px)
Large (1024px):  lg:px-16 (64px)
```

**Common Pattern:**
```html
<div class="px-4 sm:px-6 md:px-16 lg:px-16">
```

### Gap & Margin Patterns

**Component Gaps:**
```
Hero stats:              gap-3 sm:gap-6 md:gap-12
Standard components:     gap-6 sm:gap-8 lg:gap-12
Arsenal scroll:          gap-8 md:gap-12
Carousel:                gap-3 md:gap-4 (0.75rem → 1rem)
Tight vertical:          space-y-12 sm:space-y-20 md:space-y-32
Card grids:              gap-6 sm:gap-8
```

**Card Internal Padding:**
```
Small cards:    p-4 sm:p-5 md:p-6
Standard cards: p-6
Large cards:    p-8
```

**Border-Accent Padding:**
```
Left border accent:  pl-4 sm:pl-6 md:pl-8 md:pl-12
Creates visual hierarchy with colored left border
```

**Margin Bottom (Vertical Rhythm):**
```
Section headers:    mb-2 (8px between label and headline)
Section headlines:  mb-20 (80px below heading before content)
Paragraphs:         mb-6 (24px between paragraphs)
```

### Max Widths & Containers

```
Container (standard):     max-w-7xl    (1280px)
Content readable:         max-w-2xl    (672px)
Reading width:            max-w-reading / 65ch (65 characters)
Card max widths:          max-w-md (448px), max-w-xl (576px)
Sidebar (hero):           xl:w-96 (384px)
Mobile nav drawer:        w-64 max-w-[85vw]
```

**Usage Examples:**
```html
<!-- Main container -->
<div class="max-w-7xl mx-auto">

<!-- Reading content -->
<article class="max-w-reading">

<!-- Optimal paragraph width -->
<p class="max-w-2xl">
```

### Breakpoints (Tailwind Standard)

```
Base:    0px      (mobile-first, no prefix)
sm:      640px    (small tablets)
md:      768px    (tablets)
lg:      1024px   (desktops)
xl:      1280px   (large desktops)
```

### Grid Patterns

**Three-Column Layout:**
```html
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
```
- 1 column on mobile
- 3 columns at lg breakpoint (1024px+)

**Two-Column Layout:**
```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

**Hero Grid (Asymmetric):**
```html
<div class="grid grid-cols-1 xl:grid-cols-[1fr_24rem] xl:gap-12">
```
- Single column on mobile/tablet
- At xl: main content (fluid) + 384px sidebar
- 48px gap between columns

**Navigation Grid:**
```html
<nav class="grid grid-cols-3 items-center">
  <!-- Logo | Nav Items | Empty Space -->
</nav>
```

### Flex Patterns

**Horizontal Scroll (Metrics):**
```html
<div class="flex flex-nowrap justify-start gap-3 sm:gap-6">
```
- No wrapping for horizontal scrollable stats

**Footer Layout:**
```html
<footer class="flex flex-col md:flex-row justify-between">
```
- Stacked on mobile, horizontal on desktop

**Centered Content:**
```html
<div class="flex items-center justify-center">
```

### Z-Index Scale

```
z-1   - Base content layer
z-10  - Component internal layers
z-20  - Featured cards, overlays
z-40  - Mobile nav drawer, sticky elements
z-50  - Navigation bar (sticky header)
```

**Usage:**
```html
<nav class="sticky top-0 z-50">
<div class="fixed inset-y-0 z-40"> <!-- mobile drawer -->
<div class="relative z-20"> <!-- featured card -->
```

---

## 4. COMPONENT PATTERNS

### Card Component

**Base Card Style:**
```html
<div class="
  border border-accent/50
  rounded-sm
  p-6
  bg-background
  hover:border-accent
  hover:bg-accent/5
  hover:shadow-[0_0_16px_rgba(var(--accent-rgb),0.25)]
  transition-all duration-200
">
```

**Characteristics:**
- Minimal corner radius (`rounded-sm` = 2px)
- 50% opacity accent border at rest
- Solid accent border on hover
- Subtle background tint on hover (5% accent)
- Glow effect: 16px spread, 25% opacity accent color
- 200ms transition on all properties

**Variants:**

Featured Article Card:
```html
<article class="
  group
  border border-accent/50
  rounded-sm
  p-6
  hover:border-accent
  hover:bg-accent/5
  hover:shadow-[0_0_16px_rgba(var(--accent-rgb),0.25)]
  transition-all duration-200
  min-h-[380px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[480px]
">
```

Tool/Research Card (No Hover Effect):
```html
<div class="
  border border-accent/50
  rounded-sm
  p-6
  bg-background
">
```

### Button Components

**Primary Button (CTA):**
```html
<a class="
  inline-flex items-center
  min-h-[48px]
  px-10 py-4
  border-2 border-accent
  bg-accent
  text-background
  hover:bg-transparent
  hover:text-accent
  transition-all duration-200
  font-semibold
  font-mono
  uppercase
  tracking-mono
  text-xl
">
  BUTTON TEXT
</a>
```

**Characteristics:**
- Minimum 48px height (accessibility)
- Monospace font, uppercase, tracked
- Filled accent at rest
- Ghost (transparent bg) on hover
- Bold weight for emphasis

**Secondary Button:**
```html
<button class="
  w-full
  text-sm
  text-accent
  uppercase
  border border-accent/40
  px-4 py-2
  hover:bg-accent
  hover:text-background
  transition-all duration-200
  text-center
  cursor-pointer
  relative z-10
  min-h-[44px]
">
  BUTTON TEXT
</button>
```

**Link Button (Text-Only):**
```html
<a class="
  text-accent
  hover:text-accent/80
  transition-colors duration-200
  inline-flex items-center gap-2
">
  Link Text →
</a>
```

### Section Header Pattern

**Structure:**
```html
<div class="mb-20">
  <span class="code-accent mb-2 text-[11px]">[SECTION_NAME]</span>
  <h2 class="headline-medium">Section Headline Here</h2>
</div>
```

**Usage:**
- Code accent label with bracket notation
- 8px gap between label and headline
- 80px margin below headline group

### Navigation Component

**Desktop Navigation:**
```html
<nav class="
  sticky top-0 z-50
  border-b border-accent/20
  bg-background/95
  backdrop-blur-sm
">
```

**Active State:**
```html
<a class="
  relative
  text-accent
  font-semibold
">
  Nav Item
  <!-- Animated underline with spring physics -->
  <motion.div
    layoutId="underline"
    transition={{ stiffness: 300, damping: 30 }}
    class="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
  />
</a>
```

**Inactive State:**
```html
<a class="
  text-white/60
  hover:text-white
  transition-colors duration-200
">
  Nav Item
</a>
```

**Mobile Drawer:**
```html
<motion.div
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{ stiffness: 200, damping: 25 }}
  class="
    fixed inset-y-0 right-0 z-40
    w-64 max-w-[85vw]
    bg-background
    border-l border-accent/50
  "
>
```

### Label/Tag Component

```html
<span class="
  inline-block
  text-caption
  text-accent
  border border-accent/30
  px-2 py-1
  uppercase
">
  TAG
</span>
```

### Border Accent Lines

**Horizontal Divider:**
```html
<div class="
  h-px
  bg-gradient-to-r
  from-transparent
  via-black/10
  to-transparent
">
</div>
```

**Vertical Accent:**
```html
<div class="
  w-px
  bg-gradient-to-b
  from-accent/50
  via-accent/20
  to-transparent
">
</div>
```

**Left Border Accent:**
```html
<div class="
  border-l-2 border-accent
  pl-4 sm:pl-6 md:pl-8
">
  Content with left accent
</div>
```

### Carousel Component

**Structure:**
```typescript
const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
const [selectedIndex, setSelectedIndex] = useState(0);
const [isAutoPlaying, setIsAutoPlaying] = useState(true);

// Auto-advance every 5 seconds
useEffect(() => {
  if (!embla || !isAutoPlaying) return;
  const interval = setInterval(() => {
    embla.scrollNext();
  }, 5000);
  return () => clearInterval(interval);
}, [embla, isAutoPlaying]);
```

**CSS Variables:**
```html
<div class="
  [--carousel-gap:0.75rem]
  md:[--carousel-gap:1rem]
">
```

**Transition:**
```typescript
transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
```

### Infinite Scroll (Arsenal)

```typescript
<motion.div
  animate={{ x: [0, -scrollDistance] }}
  transition={{
    duration: 40,
    ease: "linear",
    repeat: Infinity,
  }}
  className="flex gap-8 md:gap-12"
>
  {/* Duplicated items */}
</motion.div>
```

---

## 5. MOTION & INTERACTION

### Animation Library
**Framework:** Framer Motion 11.3.0

### Standard Transitions

**Duration:**
```
duration-200  (200ms) - UI feedback, hover states, borders
duration-300  (300ms) - Moderate transitions
duration-600  (600ms) - Entry animations, content reveals
```

**Easing:**
```
ease-in-out   - Default smooth transitions
linear        - Infinite scrolling, rotations
easeInOut     - Carousel transitions
```

**Transition Classes:**
```css
transition-all duration-200         /* All properties */
transition-colors duration-200      /* Color changes only */
transition-transform duration-200   /* Movement only */
```

### Spring Physics

**Navigation Underline:**
```typescript
transition={{
  type: "spring",
  stiffness: 300,
  damping: 30
}}
```
- High stiffness = snappy response
- Medium damping = slight bounce

**Mouse Reactive 3D:**
```typescript
const springConfig = { stiffness: 150, damping: 15 };
const rotateX = useSpring(0, springConfig);
const rotateY = useSpring(0, springConfig);
```
- Lower stiffness = smooth following
- Lower damping = more fluid

**Mobile Drawer:**
```typescript
transition={{
  stiffness: 200,
  damping: 25
}}
```

**Scale Animations:**
```typescript
transition={{
  stiffness: 300,
  damping: 20
}}
```

### Entry Animations (whileInView)

**Fade + Slide Up:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  viewport={{ once: true, margin: "-100px" }}
>
```

**Characteristics:**
- Triggers 100px before element enters viewport
- Fires only once per element
- 20px upward slide
- Staggered by index (0.1s per item)

**Fade + Slide Right:**
```typescript
<motion.div
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true, margin: "-100px" }}
>
```

**Viewport Configuration:**
```typescript
viewport={{
  once: true,          // Animate only once
  margin: "-100px"     // Trigger 100px before visible
}}
```

### Letter-by-Letter Animation

**Component:** AnimatedHeading.tsx
```typescript
variants={{
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.3,
    },
  }),
}}
```

**Usage:**
```html
<AnimatedHeading text="Headline" className="headline-large" />
```

**Timing:**
- 30ms delay per letter
- 300ms fade-in per letter
- Creates typewriter-like effect

### Carousel Animation

**Auto-Advance:**
```typescript
const interval = setInterval(() => {
  embla.scrollNext();
}, 5000); // 5 seconds per slide
```

**Transition:**
```typescript
transition={{
  type: "tween",
  duration: 0.6,
  ease: "easeInOut"
}}
```

**Pause on Hover:**
```typescript
onMouseEnter={() => setIsAutoPlaying(false)}
onMouseLeave={() => setIsAutoPlaying(true)}
```

### Infinite Animations

**Arsenal Scroll:**
```typescript
animate={{ x: [0, -scrollDistance] }}
transition={{
  duration: 40,
  ease: "linear",
  repeat: Infinity,
}}
```
- 40 seconds per full cycle
- Linear easing for smooth continuous motion
- Seamless loop with duplicated content

**Rotating Geometric Elements:**
```typescript
animate={{ rotate: 360 }}
transition={{
  duration: 26,  // or 30 seconds
  ease: "linear",
  repeat: Infinity
}}
```

### Mouse Reactive (3D Tilt)

**Implementation:**
```typescript
const rotateX = useSpring(0, { stiffness: 150, damping: 15 });
const rotateY = useSpring(0, { stiffness: 150, damping: 15 });

const handleMouseMove = (e: React.MouseEvent) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  rotateX.set((y - 0.5) * -15);  // Max 15 degrees
  rotateY.set((x - 0.5) * 15);
};

const handleMouseLeave = () => {
  rotateX.set(0);
  rotateY.set(0);
};
```

**Scale on Hover:**
```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ stiffness: 300, damping: 20 }}
>
```

### Scroll-Based Animations

**Sticky Navigation with Backdrop Blur:**
```html
<nav class="
  sticky top-0 z-50
  bg-background/95
  backdrop-blur-sm
  transition-all duration-200
">
```

**Scroll Detection (Navigation):**
```typescript
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 0);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

---

## 6. HOVER & INTERACTION STATES

### Color Transitions

**Navigation Items:**
```
Default:  text-white/60
Hover:    text-white
Active:   text-accent font-semibold
```

**Accent Links:**
```
Default:  text-accent
Hover:    text-accent/80
```

**Card Borders:**
```
Default:  border-accent/50
Hover:    border-accent
```

**Card Background:**
```
Default:  bg-background
Hover:    bg-accent/5
```

### Shadow Effects

**Card Hover Glow:**
```css
box-shadow: 0 0 16px rgba(0, 255, 150, 0.25);
```

**Tailwind Implementation:**
```html
hover:shadow-[0_0_16px_rgba(var(--accent-rgb),0.25)]
```

**Characteristics:**
- No offset (centered glow)
- 16px blur radius
- 25% opacity accent color
- Creates "neon glow" effect

### Border Transitions

**Pattern 1: Opacity Change**
```
Default:  border-accent/50
Hover:    border-accent
Duration: 200ms
```

**Pattern 2: Color to Accent**
```
Default:  border-accent/40
Hover:    border-accent
Duration: 200ms
```

**All transitions use:**
```html
transition-all duration-200
```

### Scale Effects

**Card/Button Scale:**
```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ stiffness: 300, damping: 20 }}
>
```

**Icon Scale:**
```typescript
<motion.div
  whileHover={{ scale: 1.1 }}
>
```

### Opacity Transitions

**Icon Hover:**
```html
<img class="
  opacity-60
  group-hover:opacity-100
  transition-opacity duration-200
" />
```

**Text Hover:**
```html
<a class="
  text-accent
  hover:text-accent/80
">
```

### Button State Transitions

**Primary Button:**
```
State      | Background  | Text          | Border
-----------|-------------|---------------|-------------
Default    | bg-accent   | text-background | border-accent
Hover      | bg-transparent | text-accent | border-accent
Duration   | 200ms       | 200ms         | 200ms
```

**Secondary Button:**
```
State      | Background  | Text       | Border
-----------|-------------|------------|-------------
Default    | transparent | text-accent | border-accent/40
Hover      | bg-accent   | text-background | border-accent
Duration   | 200ms       | 200ms      | 200ms
```

### Focus States

**Keyboard Navigation:**
```html
<button class="
  focus:outline-none
  focus:ring-2
  focus:ring-accent
  focus:ring-offset-2
  focus:ring-offset-background
">
```

---

## 7. RESPONSIVE BEHAVIOR

### Mobile-First Strategy

**Base styles apply to mobile (no prefix needed).**
Breakpoint prefixes progressively enhance:
- `sm:` (640px) - Small tablets
- `md:` (768px) - Tablets
- `lg:` (1024px) - Desktops
- `xl:` (1280px) - Large desktops

### Typography Scaling

**Hero Headline:**
```
Mobile (base):  36px / leading-[1.15] / tracking-[-0.03em]
sm: 640px:      48px
md: 768px:      64px
lg: 1024px:     72px
xl: 1280px:     84px
```

**Section Headlines:**
```
Mobile:  32px
sm:      40px
md:      56px / tracking-[-0.02em]
lg:      64px
```

**Body Text:**
```
Mobile:  16px / leading-[1.7]
sm:      18px / leading-[1.7]
```

**Metrics:**
```
Mobile:  30px
sm:      36px
md:      48px
lg:      64px
```

### Layout Transformations

**Columns:**
```
Mobile:  grid-cols-1     (single column)
lg:      grid-cols-3     (three columns)
```

**Padding:**
```
Mobile:  px-4   (16px)
sm:      px-6   (24px)
md:      px-12  (48px) or px-16 (64px)
lg:      px-16  (64px)
```

**Gaps:**
```
Mobile:  gap-3   (12px)
sm:      gap-6   (24px)
md:      gap-12  (48px)
```

**Section Padding:**
```
Mobile:  py-12  (48px)
sm:      py-16  (64px)
md:      py-20  (80px)
lg:      py-24  (96px)
```

### Card Heights (Responsive)

```
Mobile:  min-h-[380px]
sm:      min-h-[420px]
md:      min-h-[460px]
lg:      min-h-[480px]
```

### Navigation Behavior

**Desktop (lg and above):**
- Sticky navigation bar
- Horizontal layout
- Animated underline on active item

**Mobile (below lg):**
- Hamburger menu button
- Slide-in drawer from right
- Fixed overlay
- Width: `w-64 max-w-[85vw]`

**Implementation:**
```html
<!-- Desktop nav -->
<nav class="hidden lg:flex">

<!-- Mobile toggle -->
<button class="lg:hidden">

<!-- Mobile drawer -->
<motion.div class="lg:hidden fixed ...">
```

### Visibility Classes

**Desktop Only:**
```html
hidden lg:block      (show at 1024px+)
hidden xl:block      (show at 1280px+)
hidden md:block      (show at 768px+)
```

**Mobile Only:**
```html
lg:hidden            (hide at 1024px+)
md:hidden            (hide at 768px+)
```

**Responsive Layout Examples:**
```html
<!-- Stack on mobile, grid on desktop -->
<div class="flex flex-col lg:grid lg:grid-cols-3">

<!-- Full width mobile, half width desktop -->
<div class="w-full lg:w-1/2">
```

---

## 8. GRID & BACKGROUND PATTERNS

### Grid Overlay System

**CSS Variable:**
```css
--grid-size: 20px;
```

**Background Pattern:**
```css
background-image:
  linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
background-size: var(--grid-size) var(--grid-size);
```

**Opacity Levels:**
```
Section overlay:  opacity-[0.08]  (8%)
Strip overlay:    opacity-[0.03]  (3%)
```

**Mask Fade (Left to Right):**
```css
mask-image: linear-gradient(
  to right,
  rgba(0, 0, 0, 0),
  rgba(0, 0, 0, 1) 20%,
  rgba(0, 0, 0, 1) 80%,
  rgba(0, 0, 0, 0)
);
```

**Usage:**
```html
<div class="
  absolute inset-0
  opacity-[0.08]
  [background-image:linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)]
  [background-size:var(--grid-size)_var(--grid-size)]
  [mask-image:linear-gradient(to_right,rgba(0,0,0,0),rgba(0,0,0,1)_20%,rgba(0,0,0,1)_80%,rgba(0,0,0,0))]
">
</div>
```

### Geometric Accent Elements

**Rotating Squares:**
```html
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 26, ease: "linear", repeat: Infinity }}
  class="absolute w-16 h-16 border border-accent/20 rotate-45"
>
</motion.div>
```

**Diagonal Lines:**
```html
<div class="absolute w-px h-32 bg-gradient-to-b from-accent/50 to-transparent -rotate-45">
</div>
```

**Corner Accents:**
```html
<div class="hidden xl:block absolute top-0 right-0 w-32 h-32">
  <!-- Decorative geometric element -->
</div>
```

**Characteristics:**
- Desktop only (`hidden xl:block`)
- Subtle accent colors (20-50% opacity)
- Slow rotation (26-30 seconds)
- Non-intrusive positioning

---

## 9. ICONOGRAPHY & IMAGERY

### Icon Library

**Source:** Simple Icons (via CDN)
```
https://cdn.simpleicons.org/{brand-name}/00ff96
```

**Color:** `00ff96` (accent color, no # prefix for CDN)

**Usage Example:**
```html
<img
  src="https://cdn.simpleicons.org/react/00ff96"
  alt="React"
  class="max-w-full max-h-full"
/>
```

**Container Sizing:**
```html
<div class="w-14 h-14 flex items-center justify-center">
  <img src="..." class="max-w-full max-h-full" />
</div>
```

**Hover Effects:**
```html
<div class="group">
  <img class="
    opacity-60
    group-hover:opacity-100
    transition-opacity duration-200
  " />
</div>
```

### Icon Fallback Pattern

**When no icon available:**
```html
<div class="
  w-14 h-14
  border border-accent/50
  rounded-sm
  flex items-center justify-center
">
  <span class="text-xs font-mono text-accent uppercase">
    {initials}
  </span>
</div>
```

### Image Treatment

**Standard Image Sizing:**
```html
<img class="
  w-full
  h-auto
  object-cover
" />
```

**Constrained Images:**
```html
<img class="
  max-w-full
  max-h-full
  object-contain
" />
```

**Logo Sizing:**
```
Standard: w-14 h-14 (56px)
Small:    w-8 h-8   (32px)
Large:    w-20 h-20 (80px)
```

### Custom Icon Filters

**For colored brand logos (not simple icons):**
```css
filter: brightness(0) saturate(100%) invert(88%) sepia(22%) saturate(1234%) hue-rotate(97deg) brightness(102%) contrast(101%);
```
- Converts logo to accent color (#00ff96)
- Used for complex SVG logos

---

## 10. ACCESSIBILITY FEATURES

### Minimum Touch Targets

**All interactive elements:**
```
min-h-[44px]  or  min-h-[48px]
min-w-[44px]  or  min-w-[48px]
```

**Rationale:** WCAG 2.1 Level AA requires 44x44px minimum for touch targets

**Implementation:**
```html
<button class="min-h-[48px] px-10 py-4">
<a class="min-h-[44px] inline-flex items-center">
```

### Color Contrast (WCAG Compliance)

**White on Background:**
```
#ffffff on #121a3a
Contrast Ratio: 21:1 (AAA)
```

**Secondary Text on Background:**
```
#b8b8b8 on #121a3a
Contrast Ratio: 4.5:1 (AA)
Usage: Body text, supporting content
```

**Accent on Background:**
```
#00ff96 on #121a3a
High contrast (AAA for large text)
Usage: Headlines, interactive elements, accents
```

**Accent on White (if used):**
```
#00ff96 on #ffffff
Contrast Ratio: 3.4:1 (AA for large text only)
Avoid for body text on white backgrounds
```

### Semantic HTML

**Heading Hierarchy:**
```html
<h1> - Page title (one per page)
<h2> - Major sections
<h3> - Subsections
<h4> - Minor headings
```

**Navigation:**
```html
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="...">Link</a></li>
  </ul>
</nav>
```

**Buttons vs Links:**
```html
<!-- Actions/interactions -->
<button type="button" onClick={handleClick}>

<!-- Navigation -->
<a href="/page">Link</a>
```

**Skip Links (if needed):**
```html
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Focus Management

**Keyboard Navigation:**
```html
<a class="
  focus:outline-none
  focus:ring-2
  focus:ring-accent
  focus:ring-offset-2
  focus:ring-offset-background
">
```

**Focus Visible:**
```html
<button class="
  focus-visible:ring-2
  focus-visible:ring-accent
">
```

**Mobile Drawer Focus Trap:**
- When drawer opens, focus moves to first nav item
- Escape key closes drawer
- Focus returns to trigger button

### Screen Reader Support

**Alternative Text:**
```html
<img src="..." alt="Descriptive text" />
```

**ARIA Labels:**
```html
<button aria-label="Open navigation menu">
  <span aria-hidden="true">☰</span>
</button>
```

**Visually Hidden (Screen Reader Only):**
```html
<span class="sr-only">Additional context</span>
```

### Motion Preferences

**Respect prefers-reduced-motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. SPECIAL UTILITIES & EFFECTS

### Text Balance

**Utility Class:**
```html
<h1 class="text-balance">
  Headline text wraps nicely
</h1>
```

**CSS:**
```css
.text-balance {
  text-wrap: balance;
}
```

**Purpose:** Prevents orphaned words, creates balanced multi-line headings

### Monospace Styling Classes

**Code Accent:**
```css
.code-accent {
  font-family: monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
}
```

**Usage:**
```html
<span class="code-accent">[SECTION_NAME]</span>
```

**Annotation:**
```css
.annotation {
  font-family: monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--secondary-text);
}
```

**Tracking Mono:**
```css
.tracking-mono {
  letter-spacing: 0.08em;
}
```

### Reading Experience

**Optimal Reading Width:**
```css
.reading-max {
  max-width: 65ch;
}
```

**Body Text Line Height:**
```
line-height: 1.7
```

**Purpose:** 65 characters per line is optimal for reading comprehension

### Section Dividers

**Horizontal Gradient Line:**
```html
<div class="
  h-px
  bg-gradient-to-r
  from-transparent
  via-black/10
  to-transparent
  max-w-7xl mx-auto
">
</div>
```

**Vertical Gradient Line:**
```html
<div class="
  w-px
  h-full
  bg-gradient-to-b
  from-accent/50
  via-accent/20
  to-transparent
">
</div>
```

### Backdrop Blur

**Sticky Navigation:**
```html
<nav class="
  sticky top-0
  bg-background/95
  backdrop-blur-sm
">
```

**Purpose:** Creates frosted glass effect while maintaining legibility

---

## 12. DEPENDENCIES & TECH STACK

### CSS Framework
```json
"tailwindcss": "3.4.7"
"postcss": "8.4.39"
"autoprefixer": "10.4.19"
```

**Config:** `tailwind.config.ts`
- Custom theme extensions
- CSS variables integration
- Custom utility classes

### Animation Library
```json
"framer-motion": "^11.3.0"
```

**Usage:**
- All motion components use `"use client"` directive
- Spring physics for natural motion
- whileInView for scroll-based reveals
- Layout animations for shared element transitions

### Content Rendering
```json
"react-markdown": "9.0.1"
"remark-gfm": "4.0.0"
```

**Purpose:** Render markdown content with GitHub-flavored markdown support

### Next.js
```json
"next": "14.2.7"
"react": "^18"
"react-dom": "^18"
```

**Features Used:**
- App Router
- Server/Client Components
- Image optimization (next/image)
- Font optimization (next/font)

---

## 13. FILE ORGANIZATION

### CSS Entry Point
```
/app/globals.css
```
- Root CSS variables (`:root`)
- Tailwind directives
- Custom utility classes in `@layer utilities`

### Config Files
```
/tailwind.config.ts       - Theme extensions, custom classes
/postcss.config.js        - PostCSS plugins
/next.config.ts           - Next.js configuration
```

### Component Structure
```
/components/
  AnimatedHeading.tsx
  ArticleHero.tsx
  ArticleImage.tsx
  CareerCards.tsx
  Carousel.tsx
  CaseStudyArticles.tsx
  FeaturedArticles.tsx
  Footer.tsx
  Hero.tsx
  MouseReactiveCard.tsx
  Navigation.tsx
  ResearchInstrumentation.tsx
  Timeline.tsx
  ... (15+ components)
```

**Characteristics:**
- All use Tailwind classes (no CSS modules)
- Client components with `"use client"` when interactive
- Consistent naming (PascalCase)

### Page Structure
```
/app/
  page.tsx              - Homepage
  about/page.tsx        - About page
  research/page.tsx     - Research page
  [slug]/page.tsx       - Dynamic article pages
  layout.tsx            - Root layout
  globals.css           - Global styles
```

---

## 14. DESIGN PHILOSOPHY

### Aesthetic Principles

**Minimal & Technical:**
- Limited color palette (3 primary colors)
- Clean borders and lines
- Generous whitespace
- Typography-driven hierarchy

**Dark Mode Default:**
- Deep navy blue background
- High contrast for readability
- Neon accent for energy and focus

**Modern & Professional:**
- Light font weights (300) for elegance
- Tight letter spacing on headlines
- Monospace accents for technical credibility
- Subtle animations enhance without distracting

### Key Characteristics

**Color-Constrained:**
- Background, foreground, accent
- All other colors derived via opacity
- Consistent visual language

**Typography-Driven:**
- Clear hierarchy (10px → 84px)
- Generous line-height for readability (1.7)
- Light weights create elegant feel

**Animation-Enhanced:**
- Spring physics for organic motion
- Entry animations guide attention
- Hover states provide feedback
- Infinite animations add dynamism

**Fully Responsive:**
- Mobile-first approach
- Fluid typography scaling
- Flexible grid layouts
- Touch-optimized interactions

**Accessibility-First:**
- WCAG AA/AAA contrast ratios
- Minimum touch targets (44-48px)
- Semantic HTML
- Keyboard navigation support

### Reusable Patterns

1. **Card Component** - Featured content with hover glow
2. **Section Header** - Code accent + headline
3. **CTA Button** - Monospace, uppercase, filled → ghost
4. **Navigation** - Animated underline, spring physics
5. **Carousel** - Auto-advance, pause on hover
6. **Infinite Scroll** - Seamless looping content
7. **Border Accents** - Gradient lines for visual interest
8. **Mouse Reactive** - 3D tilt on hover
9. **Entry Animations** - Fade + slide on scroll

---

## 15. IMPLEMENTATION CHECKLIST

To recreate this design system from scratch:

### 1. Setup
- [ ] Install Tailwind CSS 3.4.7
- [ ] Install Framer Motion 11.3.0
- [ ] Install Next.js 14+ with App Router
- [ ] Import Plus Jakarta Sans from Google Fonts

### 2. CSS Variables (globals.css)
- [ ] Define `--background: #121a3a`
- [ ] Define `--foreground: #ffffff`
- [ ] Define `--accent: #00ff96`
- [ ] Define `--accent-rgb: 0, 255, 150`
- [ ] Define `--secondary-text: #b8b8b8`
- [ ] Define section padding variables
- [ ] Define `--grid-size: 20px`

### 3. Tailwind Config
- [ ] Extend theme with CSS variables
- [ ] Add custom utility classes (code-accent, annotation, etc.)
- [ ] Configure font family with Plus Jakarta Sans

### 4. Typography Classes
- [ ] Create `.headline-large` (36px→84px responsive)
- [ ] Create `.headline-medium` (32px→64px responsive)
- [ ] Create `.body-text` (16px→18px responsive)
- [ ] Create `.code-accent` (11px, mono, uppercase)
- [ ] Create `.annotation` (10px, mono, uppercase)
- [ ] Set default font-smoothing to antialiased

### 5. Component Patterns
- [ ] Build Card component (border-accent/50, hover glow)
- [ ] Build Button variants (primary, secondary, link)
- [ ] Build Navigation (desktop sticky, mobile drawer)
- [ ] Build Section header pattern (code accent + headline)

### 6. Animation Setup
- [ ] Configure spring physics constants
- [ ] Create whileInView animation variants
- [ ] Build AnimatedHeading component
- [ ] Implement carousel with auto-advance
- [ ] Create infinite scroll animation
- [ ] Add mouse reactive 3D tilt

### 7. Accessibility
- [ ] Set min-h-[44px] on all interactive elements
- [ ] Verify color contrast ratios
- [ ] Add aria-labels to navigation
- [ ] Implement focus states
- [ ] Add prefers-reduced-motion support

### 8. Responsive Design
- [ ] Test typography scaling at all breakpoints
- [ ] Verify grid layouts (1→2→3 columns)
- [ ] Test mobile drawer navigation
- [ ] Adjust spacing at each breakpoint

### 9. Special Effects
- [ ] Create grid overlay background
- [ ] Add rotating geometric accents
- [ ] Implement gradient divider lines
- [ ] Add backdrop blur to sticky nav

### 10. Testing
- [ ] Test on mobile (320px - 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (1024px+)
- [ ] Verify all animations perform smoothly
- [ ] Test keyboard navigation
- [ ] Run accessibility audit

---

## Quick Copy-Paste Values

### Colors
```css
#121a3a  /* Background */
#ffffff  /* Foreground */
#00ff96  /* Accent */
#b8b8b8  /* Secondary text */
```

### Font Sizes (Responsive)
```
36px → 48px → 64px → 84px  /* Hero headline */
32px → 40px → 56px → 64px  /* Section headline */
16px → 18px                 /* Body text */
```

### Spacing
```
px-4 sm:px-6 md:px-16        /* Horizontal padding */
py-[var(--section-padding-y-md)]  /* Section padding (80px) */
gap-6 sm:gap-8 lg:gap-12     /* Component gaps */
```

### Transitions
```
transition-all duration-200   /* Standard */
stiffness: 300, damping: 30  /* Spring nav */
stiffness: 150, damping: 15  /* Mouse reactive */
```

---

This design system specification is complete and precise enough to recreate the Quicksilver Labs visual identity without seeing the original website.