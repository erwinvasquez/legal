"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

interface CustomThemeProviderProps extends Omit<ThemeProviderProps, "children"> {
  children: React.ReactNode
}

export function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="theme-preference"
      themes={["light", "dark", "system"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}


