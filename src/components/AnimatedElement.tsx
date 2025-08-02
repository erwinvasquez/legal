"use client"

import type React from "react"
import { forwardRef } from "react"
import { useScrollAnimation } from "@/hooks"
import { cn } from "@/lib/utils"
import {
  type AnimationType,
  type AnimationDuration,
  type AnimationEasing,
  type AnimationDelay,
  DEFAULT_SCROLL_DETECTION,
  getClosestTailwindDelay, // Ensure this is correctly imported
} from "@/lib/animation-config"

export interface AnimatedElementProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tipo de animación a aplicar cuando el elemento entra en el viewport
   */
  animation?: AnimationType

  /**
   * Variante de duración de la animación
   */
  duration?: AnimationDuration

  /**
   * Función de temporización de la animación
   */
  ease?: AnimationEasing

  /**
   * Retraso antes de que comience la animación (en ms)
   */
  delay?: AnimationDelay

  /**
   * Valor entre 0 y 1 que indica qué porcentaje del elemento debe ser visible
   * antes de activar la animación
   */
  threshold?: number

  /**
   * Si la animación debe ejecutarse solo una vez
   */
  once?: boolean

  /**
   * Si la animación debe reiniciarse cuando el elemento sale del viewport
   */
  resetOnLeave?: boolean

  /**
   * Etiqueta HTML a renderizar
   */
  as?: React.ElementType

  /**
   * Índice del elemento para animaciones escalonadas
   * Si se proporciona, se utilizará para calcular un retraso automático
   */
  index?: number

  /**
   * Retraso base en ms para animaciones escalonadas (cuando se usa index)
   * Por defecto es 100ms
   */
  staggerDelay?: number

  /**
   * Número máximo de elementos para calcular el retraso máximo
   * Por defecto es 10
   */
  maxItems?: number
}

/**
 * Componente AnimatedElement que se anima cuando entra en el viewport
 *
 * @example
 * <AnimatedElement animation="fade-in">
 *   Contenido que aparece gradualmente al entrar en la vista
 * </AnimatedElement>
 *
 * @example
 * <AnimatedElement
 *   animation="slide-up"
 *   duration="slow"
 *   delay={300}
 *   className="p-4 bg-white rounded-lg shadow-md"
 * >
 *   Contenido que se desliza hacia arriba con un retraso
 * </AnimatedElement>
 *
 * @example
 * <AnimatedElement
 *   animation="fade-in"
 *   delay={0.2} // Interpreted as 200ms
 * >
 *   Contenido con un retraso de 0.2 segundos
 * </AnimatedElement>
 */
export const AnimatedElement = forwardRef<HTMLDivElement, AnimatedElementProps>(
  (
    {
      children,
      animation = "fade-in",
      duration = "slow",
      ease = "in-out",
      delay,
      threshold = DEFAULT_SCROLL_DETECTION.threshold,
      once = DEFAULT_SCROLL_DETECTION.once,
      resetOnLeave = DEFAULT_SCROLL_DETECTION.resetOnLeave,
      className,
      as: Component = "div",
      index,
      staggerDelay = 100,
      maxItems = 10,
      ...props
    },
    ref,
  ) => {
    let finalDelay: number | undefined = undefined

    // If an index is provided, it takes precedence for calculating the delay
    if (index !== undefined) {
      const delayValue = Math.min(index, maxItems) * staggerDelay

      // Convert the numeric value to the corresponding delay class,
      // ensuring it matches the allowed values in AnimationDelay
      // Using getClosestTailwindDelay for consistency
      finalDelay = getClosestTailwindDelay(delayValue)
    } else if (delay !== undefined) {
      // If no index, process the direct 'delay' prop
      let delayInMs = delay
      // Heuristic: if delay is a small positive number, assume it's in seconds and convert to ms
      if (delay > 0 && delay < 10) {
        delayInMs = delay * 1000
      }
      // Find the closest valid Tailwind delay value
      finalDelay = getClosestTailwindDelay(delayInMs)
    }

    const animationRef = useScrollAnimation({
      threshold,
      once,
      resetOnLeave,
    })

    // Combinar los refs si se proporciona un ref externo
    const combinedRef = (node: HTMLDivElement) => {
      animationRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    return (
      <Component
        ref={combinedRef}
        className={cn(
          "animate-on-scroll",
          animation,
          `duration-${duration}`,
          `ease-${ease}`,
          finalDelay !== undefined && `delay-${finalDelay}`,
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

AnimatedElement.displayName = "AnimatedElement"
