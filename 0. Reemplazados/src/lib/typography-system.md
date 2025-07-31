# Sistema de Tipografía Centralizado

## 📋 Descripción General

Este proyecto implementa un **sistema de tipografía completamente centralizado y escalable** que permite cambiar todas las fuentes del proyecto desde un solo archivo.

## 🎯 Las 4 Fuentes del Sistema

| Rol | Clase CSS | Propósito | Archivo de Configuración |
|-----|-----------|-----------|-------------------------|
| **Navegación** | `font-navbar` | Barra de navegación principal | `src/lib/fonts.ts` |
| **Títulos** | `font-heading` | Títulos, headings, secciones | `src/lib/fonts.ts` |
| **Contenido** | `font-body` | Texto principal, párrafos | `src/lib/fonts.ts` |
| **Auxiliar** | `font-aux` | Detalles, etiquetas, extras | `src/lib/fonts.ts` |

## 🚀 Uso en Componentes

### En JSX/TSX
```tsx
// Navegación
<nav className="font-navbar">Menú principal</nav>

// Títulos
<h1 className="font-heading text-4xl">Título Principal</h1>
<h2 className="font-heading text-2xl">Subtítulo</h2>

// Contenido
<p className="font-body">Este es el texto principal del contenido.</p>

// Elementos auxiliares
<span className="font-aux text-sm">Etiqueta</span>
<small className="font-aux">Detalle adicional</small>
```

### En CSS
```css
.navbar {
  font-family: var(--font-navbar);
}

.heading {
  font-family: var(--font-heading);
}

.body-text {
  font-family: var(--font-body);
}

.auxiliary {
  font-family: var(--font-aux);
}
```

## 🔧 Configuración

### Archivo Principal: `src/lib/fonts.ts`

Este archivo centraliza toda la configuración de fuentes:

```typescript
import localFont from "next/font/local"

export const fontNavbar = localFont({
  src: "../app/fonts/Inter.ttf",
  variable: "--font-navbar",
  display: "swap",
  preload: true,
})

export const fontHeading = localFont({
  src: "../app/fonts/IBMMono.ttf", 
  variable: "--font-heading",
  display: "swap",
  preload: true,
})

// ... etc
```

### Variables CSS: `src/styles/variables/typography.css`

Define las variables CSS que conectan con Tailwind:

```css
:root {
  --font-navbar: var(--font-navbar);    /* Navegación principal */
  --font-heading: var(--font-heading);  /* Títulos y secciones */
  --font-body: var(--font-body);        /* Contenido principal */
  --font-aux: var(--font-aux);          /* Elementos auxiliares */
}
```

### Tailwind Config: `tailwind.config.ts`

Mapea las variables CSS a clases de Tailwind:

```typescript
fontFamily: {
  navbar: ["var(--font-navbar)"],
  heading: ["var(--font-heading)"],
  body: ["var(--font-body)"],
  aux: ["var(--font-aux)"],
}
```

## 🔄 Cambiar Fuentes en Nuevos Proyectos

### Opción 1: Fuentes Locales
1. Coloca los archivos de fuentes en `src/app/fonts/`
2. Actualiza las rutas en `src/lib/fonts.ts`
3. ¡Listo! Todo el proyecto usará las nuevas fuentes

### Opción 2: Google Fonts
1. Cambia las importaciones en `src/lib/fonts.ts`:

```typescript
import { Inter, Poppins, Roboto, Open_Sans } from 'next/font/google'

export const fontNavbar = Inter({ 
  subsets: ['latin'],
  variable: '--font-navbar',
  display: 'swap',
})

export const fontHeading = Poppins({ 
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['600', '700'],
})

// ... etc
```

## 📁 Estructura de Archivos

```
src/
├── lib/
│   ├── fonts.ts              # 🎯 CONFIGURACIÓN PRINCIPAL
│   └── typography-system.md  # 📚 Esta documentación
├── app/
│   ├── fonts/                # 📁 Archivos de fuentes locales
│   │   ├── Inter.ttf
│   │   ├── IBMMono.ttf
│   │   ├── OpenSans.ttf
│   │   └── GeistVF.woff
│   ├── layout.tsx            # 🔗 Aplica las variables CSS
│   └── globals.css           # 🎨 Estilos base
└── styles/
    └── variables/
        └── typography.css    # 🎨 Variables CSS
```

## ✅ Beneficios del Sistema

1. **Centralizado**: Un solo archivo para cambiar todas las fuentes
2. **Escalable**: Fácil de replicar en nuevos proyectos
3. **Mantenible**: Código limpio y bien documentado
4. **Flexible**: Soporta fuentes locales y de Google Fonts
5. **Performance**: Optimizado con `display: swap` y `preload: true`

## 🎨 Ejemplos de Uso

### Componente de Navegación
```tsx
export function Navbar() {
  return (
    <nav className="font-navbar bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <a href="/" className="font-heading text-xl font-bold">
          Logo
        </a>
        <ul className="font-navbar space-x-6">
          <li><a href="/">Inicio</a></li>
          <li><a href="/about">Acerca</a></li>
        </ul>
      </div>
    </nav>
  )
}
```

### Componente de Artículo
```tsx
export function Article({ title, content, tags }) {
  return (
    <article className="max-w-2xl mx-auto">
      <h1 className="font-heading text-4xl font-bold mb-6">
        {title}
      </h1>
      
      <div className="font-body text-lg leading-relaxed mb-8">
        {content}
      </div>
      
      <div className="flex gap-2">
        {tags.map(tag => (
          <span key={tag} className="font-aux text-sm bg-gray-100 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
```

## 🔍 Verificación

Para verificar que el sistema funciona correctamente:

1. **Inspecciona elementos** en el navegador
2. **Verifica las variables CSS** en DevTools
3. **Comprueba las clases de Tailwind** se aplican correctamente
4. **Testea en diferentes componentes** que usen las 4 fuentes

---

**¡El sistema está listo para usar! 🎉** 