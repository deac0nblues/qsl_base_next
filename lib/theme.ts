// Quicksilver Labs Design System – typed token constants

export const colors = {
  background: '#121a3a',
  foreground: '#ffffff',
  accent: '#00ff96',
  accentRgb: '0, 255, 150',
  secondaryText: '#b8b8b8',
  contrastDark: '#000000',
  contrastLight: '#FAFAFA',
} as const;

export const accentOpacity = {
  5: 'rgba(0, 255, 150, 0.05)',
  20: 'rgba(0, 255, 150, 0.20)',
  25: 'rgba(0, 255, 150, 0.25)',
  30: 'rgba(0, 255, 150, 0.30)',
  40: 'rgba(0, 255, 150, 0.40)',
  50: 'rgba(0, 255, 150, 0.50)',
  80: 'rgba(0, 255, 150, 0.80)',
} as const;

export const fontFamily = {
  sans: "'Plus Jakarta Sans', system-ui, sans-serif",
  mono: "'Courier New', Monaco, Menlo, monospace",
} as const;

export const fontSize = {
  meta: '10px',
  label: '11px',
  codeAccent: '11px',
  annotation: '10px',
  caption: '12px',
  body: '16px',
  bodyLg: '18px',
  heading: '24px',
  display: '32px',
} as const;

export const lineHeight = {
  tight: 1.15,
  heading: 1.2,
  label: 1.3,
  caption: 1.4,
  body: 1.7,
} as const;

export const fontWeight = {
  light: 300,
  regular: 400,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export const letterSpacing = {
  tightLg: '-0.03em',
  tightMd: '-0.02em',
  mono: '0.08em',
  none: '0',
} as const;

export const spacing = {
  sectionPaddingTight: '3rem',
  sectionPaddingSm: '4rem',
  sectionPaddingMd: '5rem',
  sectionPaddingLg: '6rem',
  cardPadding: '24px',
  maxContentWidth: '1280px',
  readingWidth: '65ch',
  gridSize: '20px',
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const zIndex = {
  base: 1,
  component: 10,
  featured: 20,
  drawer: 40,
  nav: 50,
} as const;

export const transition = {
  fast: '200ms',
  moderate: '300ms',
  entry: '600ms',
} as const;

export const spring = {
  nav: { stiffness: 300, damping: 30 },
  mouse: { stiffness: 150, damping: 15 },
  drawer: { stiffness: 200, damping: 25 },
  scale: { stiffness: 300, damping: 20 },
} as const;

/** Recharts-friendly palette derived from design tokens */
export const chartColors = {
  primary: colors.accent,
  primaryFaded: accentOpacity[50],
  gridLine: accentOpacity[20],
  label: colors.secondaryText,
  bg: colors.background,
  white: colors.foreground,
} as const;
