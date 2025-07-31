"use client"

import { useTheme as useNextTheme } from "next-themes"
import { useEffect, useState } from "react"
import { getSystemTheme, isValidTheme, type Theme } from "@/lib/theme-utils"

/**
 * Hook personalizado para manejo de temas con funcionalidades extendidas
 */
export function useTheme() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = (theme as Theme) || "system"
  const effectiveTheme = (resolvedTheme as "light" | "dark") || "light"

  const changeTheme = (newTheme: Theme) => {
    if (isValidTheme(newTheme)) {
      setTheme(newTheme)
    }
  }

  const toggleTheme = () => {
    if (currentTheme === "light") {
      changeTheme("dark")
    } else if (currentTheme === "dark") {
      changeTheme("system")
    } else {
      changeTheme("light")
    }
  }

  const isDark = effectiveTheme === "dark"
  const isLight = effectiveTheme === "light"
  const isSystem = currentTheme === "system"

  return {
    // Estados
    theme: currentTheme,
    effectiveTheme,
    systemTheme: (systemTheme as "light" | "dark") || getSystemTheme(),
    mounted,
    isDark,
    isLight,
    isSystem,

    // Acciones
    setTheme: changeTheme,
    toggleTheme,

    // Utilidades
    getThemeClass: () => `theme-${effectiveTheme}`,
    isTheme: (checkTheme: Theme) => currentTheme === checkTheme,
  }
}
