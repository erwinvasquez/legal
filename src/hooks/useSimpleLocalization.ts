"use client"

import { useCallback } from "react"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"

/**
 * Hook simplificado para manejo de localización usando next-intl
 * Reemplaza useLocalization que dependía de Redux
 */
export function useSimpleLocalization() {
  const locale = useLocale() // Obtiene idioma actual de next-intl
  const router = useRouter()
  const pathname = usePathname()

  /**
   * Cambiar el idioma actual y navegar a la ruta equivalente
   */
  const changeLocale = useCallback(
    (newLocale: string) => {
      if (newLocale === locale) return

      console.log(`🌐 useSimpleLocalization: Cambiando idioma de ${locale} a ${newLocale}`)

      // Construir la nueva ruta con el nuevo idioma
      const segments = pathname.split("/")

      // Si la ruta actual ya tiene un locale, lo reemplazamos
      if (segments.length > 1 && ["en", "es", "pt"].includes(segments[1])) {
        segments[1] = newLocale
        const newPath = segments.join("/")
        router.push(newPath)
      } else {
        // Si no tiene locale, añadimos el nuevo
        router.push(`/${newLocale}`)
      }

      // Persistir en localStorage y cookies (manteniendo compatibilidad)
      if (typeof window !== "undefined") {
        localStorage.setItem("locale", newLocale)
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Strict`
      }

      // Opcional: Guardar en servidor (mantener si es necesario)
      try {
        fetch("/api/language", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ locale: newLocale }),
        })
      } catch (error) {
        console.error("Error al guardar el idioma en el servidor:", error)
      }
    },
    [locale, pathname, router],
  )

  /**
   * Obtener la ruta con el prefijo del idioma actual
   */
  const getLocalizedPath = useCallback(
    (path: string) => {
      // Si la ruta ya comienza con un locale, lo reemplazamos
      if (path.startsWith("/en/") || path.startsWith("/es/") || path.startsWith("/pt/")) {
        const segments = path.split("/")
        segments[1] = locale
        return segments.join("/")
      }

      // Si la ruta comienza con / pero no tiene locale, añadimos el locale
      if (path.startsWith("/")) {
        return `/${locale}${path}`
      }

      // Si la ruta no comienza con /, añadimos / y el locale
      return `/${locale}/${path}`
    },
    [locale],
  )

  /**
   * Obtener el idioma de la ruta actual
   */
  const getLocaleFromPath = useCallback(() => {
    const segments = pathname?.split("/") || []
    if (segments.length > 1) {
      const potentialLocale = segments[1]
      if (["en", "es", "pt"].includes(potentialLocale)) {
        return potentialLocale
      }
    }
    return locale
  }, [pathname, locale])

  /**
   * Obtener la parte de la ruta sin el prefijo del idioma
   */
  const getPathWithoutLocale = useCallback(() => {
    const segments = pathname?.split("/") || []
    if (segments.length > 1 && ["en", "es", "pt"].includes(segments[1])) {
      return "/" + segments.slice(2).join("/")
    }
    return pathname || "/"
  }, [pathname])

  return {
    locale,
    changeLocale,
    getLocalizedPath,
    getLocaleFromPath,
    getPathWithoutLocale,
    supportedLocales: ["en", "es", "pt"], // Actualizado para incluir portugués
  }
}
