/**
 * DESIGN TOKENS
 * Centralized design system values for consistent styling across the application
 * Based on Swiftcourse brand colors and golden ratio typography
 */

/**
 * BRAND COLORS
 * Primary: Deep forest green - conveys authority, trust, professionalism
 * Accent: Vibrant orange - creates energy, urgency, and calls-to-action
 */
export const colors = {
  brand: {
    green: {
      DEFAULT: "#1a4d3e",
      dark: "#143d31",
      light: "#2a6d5e",
    },
    orange: {
      DEFAULT: "#ff5722",
      dark: "#e64a19",
      light: "#ff7043",
    },
  },
  neutral: {
    white: "#ffffff",
    offWhite: "#fafafa",
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
} as const

/**
 * TYPOGRAPHY SCALE - Golden Ratio (1.618)
 * Base size: 16px (1rem)
 * Each step multiplies by approximately 1.25 (practical golden ratio for web)
 */
export const typography = {
  fontSize: {
    xs: "0.64rem", // 10.24px
    sm: "0.8rem", // 12.8px
    base: "1rem", // 16px
    lg: "1.25rem", // 20px
    xl: "1.563rem", // 25px
    "2xl": "1.953rem", // 31.25px
    "3xl": "2.441rem", // 39px
    "4xl": "3.052rem", // 48.8px
    "5xl": "3.815rem", // 61px
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.75,
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const

/**
 * SPACING SCALE
 * Based on 4px base unit for consistent spacing
 */
export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
  "4xl": "6rem", // 96px
} as const

/**
 * BORDER RADIUS
 * Consistent rounding for UI elements
 */
export const borderRadius = {
  sm: "0.25rem", // 4px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  full: "9999px",
} as const

/**
 * BREAKPOINTS
 * Responsive design breakpoints
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

/**
 * Z-INDEX SCALE
 * Consistent layering for overlapping elements
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const

/**
 * ANIMATION DURATIONS
 * Consistent timing for transitions and animations
 */
export const animation = {
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
} as const
