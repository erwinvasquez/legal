/**
 * Configuración centralizada para el sistema de animaciones
 * Este archivo contiene tipos, constantes y utilidades para las animaciones
 */

// Tipos para las opciones de animación
export type AnimationType =
  | "fade-in"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "zoom-in"
  | "rotate-in"
  | "flip-x"
  | "flip-y"
  | "scale-in"

export type AnimationDuration = "fastest" | "fast" | "normal" | "slow" | "slower" | "slowest"

export type AnimationEasing = "linear" | "in" | "out" | "in-out" | "bounce" | "elastic"

/**
 * Type for animation delay. Can be a number representing milliseconds or seconds.
 * If a value is less than 10 (and greater than 0), it's interpreted as seconds and converted to milliseconds.
 * It will then be mapped to the closest valid Tailwind CSS delay utility class.
 */
export type AnimationDelay = number

// Configuración para la detección de scroll
export interface ScrollDetectionConfig {
  /** Valor entre 0 y 1 que indica qué porcentaje del elemento debe ser visible */
  threshold: number
  /** Margen alrededor del elemento para la detección */
  rootMargin: string
  /** Si la animación debe ejecutarse solo una vez */
  once: boolean
  /** Si la animación debe reiniciarse cuando el elemento sale del viewport */
  resetOnLeave: boolean
  /** Clase CSS que se aplica cuando el elemento es visible */
  visibleClass: string
}

// Valores predeterminados para la detección de scroll
export const DEFAULT_SCROLL_DETECTION: ScrollDetectionConfig = {
  threshold: 0.6,
  rootMargin: "0px",
  once: true,
  resetOnLeave: false,
  visibleClass: "is-visible",
}

// Valores predeterminados para la detección de secciones activas
export const DEFAULT_SECTION_DETECTION = {
  threshold: 0.6,
  rootMargin: "0px",
  selectorPattern: "section[id]",
}

/**
 * Array of standard Tailwind CSS animation delay values in milliseconds.
 */
export const TAILWIND_ANIMATION_DELAYS_MS = [0, 75, 100, 150, 200, 300, 500, 700, 1000]

/**
 * Helper function to find the closest valid Tailwind CSS animation delay value
 * for a given millisecond value.
 * @param ms The delay in milliseconds.
 * @returns The closest valid Tailwind delay in milliseconds.
 */
export function getClosestTailwindDelay(ms: number): number {
  return TAILWIND_ANIMATION_DELAYS_MS.reduce((prev, curr) => (Math.abs(curr - ms) < Math.abs(prev - ms) ? curr : prev))
}

// Utilidades para generar clases CSS
export const getAnimationClasses = (
  animation: AnimationType,
  duration?: AnimationDuration,
  easing?: AnimationEasing,
  delay?: AnimationDelay,
): string => {
  const classes = ["animate-on-scroll", animation]

  if (duration) {
    classes.push(`duration-${duration}`)
  }

  if (easing) {
    classes.push(`ease-${easing}`)
  }

  if (delay) {
    // Convert seconds to milliseconds if applicable, then find closest Tailwind delay
    let delayInMs = delay
    if (delay > 0 && delay < 10) {
      delayInMs = delay * 1000
    }
    const finalDelay = getClosestTailwindDelay(delayInMs)
    classes.push(`delay-${finalDelay}`)
  }

  return classes.join(" ")
}

// Mapeo de nombres amigables a valores CSS
export const ANIMATION_DURATION_MAP: Record<AnimationDuration, string> = {
  fastest: "var(--animation-duration-fastest)",
  fast: "var(--animation-duration-fast)",
  normal: "var(--animation-duration-normal)",
  slow: "var(--animation-duration-slow)",
  slower: "var(--animation-duration-slower)",
  slowest: "var(--animation-duration-slowest)",
}

export const ANIMATION_EASING_MAP: Record<AnimationEasing, string> = {
  linear: "var(--animation-easing-linear)",
  in: "var(--animation-easing-in)",
  out: "var(--animation-easing-out)",
  "in-out": "var(--animation-easing-in-out)",
  bounce: "var(--animation-easing-bounce)",
  elastic: "var(--animation-easing-elastic)",
}

