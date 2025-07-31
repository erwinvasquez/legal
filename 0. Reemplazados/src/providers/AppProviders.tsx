"use client"

import type React from "react"
import { ThemeProvider } from "next-themes"

interface Props {
  children: React.ReactNode
}

/**
 * Providers principales de la aplicación
 * - ThemeProvider: Manejo de temas (next-themes)
 * - SessionProvider: Se maneja en AuthProvider separadamente
 * - NO incluye Redux Provider (eliminado)
 */
export const AppProviders = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      themes={["light", "dark"]}
      storageKey="theme"
    >
      {children}
    </ThemeProvider>
  )
}

