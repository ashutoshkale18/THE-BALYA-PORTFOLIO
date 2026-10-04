/**
 * THE BALYA — Shared Motion System
 * Centralized animation variants and easing curves.
 * All animations respect prefers-reduced-motion via the
 * `reducedMotion: "user"` prop on MotionConfig in main App.
 */

// ─── Easing ─────────────────────────────────────────────────────────────────
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1] as const;
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

// ─── Fade Up (scroll-triggered section reveals) ──────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
};

// ─── Fade In (simple opacity) ─────────────────────────────────────────────────
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_CUBIC },
  },
};

// ─── Stagger Container ───────────────────────────────────────────────────────
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

// ─── Stagger Child (used inside stagger containers) ──────────────────────────
export const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

// ─── Slide In Left ───────────────────────────────────────────────────────────
export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
};

// ─── Slide In Right ──────────────────────────────────────────────────────────
export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
};

// ─── Scale In (image / card reveal) ─────────────────────────────────────────
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

// ─── Page Transition wrapper ─────────────────────────────────────────────────
export const pageEnter = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: EASE_IN_OUT },
  },
};

// ─── Common viewport trigger settings ────────────────────────────────────────
export const VIEWPORT_ONCE = { once: true, amount: 0.15 } as const;
export const VIEWPORT_MARGIN = { once: true, amount: 0.1, margin: '-60px' } as const;
