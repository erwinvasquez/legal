/**
 * Utilidades para el sistema de temas
 */

export type Theme = "light" | "dark" | "system"

export interface ThemeConfig {
  name: string
  displayName: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
}

export const themeConfigs: Record<Exclude<Theme, "system">, ThemeConfig> = {
  light: {
    name: "light",
    displayName: "Light",
    colors: {
      primary: "hsl(150, 63%, 30%)", // Forest Green
      secondary: "hsl(220, 70%, 40%)", // Deep Blue
      accent: "hsl(120, 61%, 50%)", // Lime Green
      background: "hsl(60, 9%, 98%)", // Bone White
      foreground: "hsl(215, 28%, 17%)", // Carbon Gray
    },
  },
  dark: {
    name: "dark",
    displayName: "Dark",
    colors: {
      primary: "hsl(120, 61%, 50%)", // Lime Green
      secondary: "hsl(0, 0%, 14.9%)", // Gray 800
      accent: "hsl(150, 63%, 30%)", // Forest Green
      background: "hsl(0, 0%, 3.9%)", // Gray 950
      foreground: "hsl(0, 0%, 98%)", // Gray 50
    },
  },
}

/**
 * Obtiene la configuración del tema actual
 */
export function getThemeConfig(theme: Theme): ThemeConfig | null {
  if (theme === "system") return null
  return themeConfigs[theme]
}

/**
 * Genera clases CSS dinámicas basadas en el tema
 */
export function getThemeClasses(theme: Theme) {
  const config = getThemeConfig(theme)
  if (!config) return ""

  return `theme-${config.name}`
}

/**
 * Verifica si un tema es válido
 */
export function isValidTheme(theme: string): theme is Theme {
  return ["light", "dark", "system"].includes(theme)
}

/**
 * Obtiene el tema preferido del sistema
 */
export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}
