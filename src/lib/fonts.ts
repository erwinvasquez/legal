import localFont from "next/font/local"

// ============================================================================
// CONFIGURACIÓN CENTRALIZADA DE FUENTES
// ============================================================================
// Este archivo centraliza toda la configuración de fuentes del proyecto.
// Para cambiar las fuentes en futuros proyectos, solo modifica este archivo.

// Fuente para navegación principal
export const fontNavbar = localFont({
  src: "../app/fonts/Inter.ttf",
  variable: "--font-navbar",
  display: "swap",
  preload: true,
})

// Fuente para títulos y secciones
export const fontHeading = localFont({
  src: "../app/fonts/Oswald.ttf",
  variable: "--font-heading",
  display: "swap",
  preload: true,
})

// Fuente para contenido principal
export const fontBody = localFont({
  src: "../app/fonts/OpenSans.ttf",
  variable: "--font-body",
  display: "swap",
  preload: true,
})

// Fuente para elementos auxiliares (detalles, etiquetas, etc.)
export const fontAux = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-aux",
  display: "swap",
  preload: true,
})

// ============================================================================
// CONFIGURACIÓN PARA FUTUROS PROYECTOS
// ============================================================================
// Para cambiar las fuentes en un nuevo proyecto, simplemente:
// 1. Reemplaza las rutas de src con las nuevas fuentes
// 2. O cambia a @next/font/google si prefieres fuentes de Google Fonts
// 
// Ejemplo con Google Fonts:
// import { Inter, Poppins, Roboto, Open_Sans } from 'next/font/google'
// 
// export const fontNavbar = Inter({ 
//   subsets: ['latin'],
//   variable: '--font-navbar',
//   display: 'swap',
// })
// 
// export const fontHeading = Poppins({ 
//   subsets: ['latin'],
//   variable: '--font-heading',
//   display: 'swap',
//   weight: ['600', '700'],
// })
// 
// export const fontBody = Roboto({ 
//   subsets: ['latin'],
//   variable: '--font-body',
//   display: 'swap',
//   weight: ['400', '500'],
// })
// 
// export const fontAux = Open_Sans({ 
//   subsets: ['latin'],
//   variable: '--font-aux',
//   display: 'swap',
//   weight: ['300', '400'],
// })

// ============================================================================
// EXPORTACIÓN DE TODAS LAS VARIABLES
// ============================================================================
export const fontVariables = [
  fontNavbar.variable,
  fontHeading.variable,
  fontBody.variable,
  fontAux.variable,
].join(" ")

// ============================================================================
// TIPOS PARA TYPESCRIPT
// ============================================================================
export type FontRole = "navbar" | "heading" | "body" | "aux"

export interface FontConfig {
  navbar: typeof fontNavbar
  heading: typeof fontHeading
  body: typeof fontBody
  aux: typeof fontAux
}

export const fonts: FontConfig = {
  navbar: fontNavbar,
  heading: fontHeading,
  body: fontBody,
  aux: fontAux,
} 