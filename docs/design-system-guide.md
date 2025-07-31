# 🎨 Guía del Sistema de Diseño Visual (DEMPS)

## Documentación Técnica del Theme Centralizado

Esta documentación describe el sistema de diseño visual centralizado del proyecto, conocido como **DEMPS** (Design System). Es una guía obligatoria para cualquier desarrollador o IA que trabaje en el proyecto.

---

## 📁 1. Ubicación y Estructura del Theme

### 🗂️ Archivos Principales del Sistema de Diseño

El sistema de diseño está distribuido en varios archivos organizados jerárquicamente:

#### **Variables CSS Base**
\`\`\`
styles/
├── variables/
│   ├── base.css           # Colores base y dimensiones fundamentales
│   ├── typography.css     # Sistema de tipografía completo
│   ├── layout.css         # Espaciado, contenedores y z-index
│   ├── components.css     # Variables específicas de componentes
│   └── animations.css     # Duraciones y transiciones
├── themes/
│   └── unified.css        # Tema unificado con modo claro/oscuro
├── tokens/
│   └── animation-tokens.css # Tokens de animación centralizados
└── animations/
    └── scroll-animations.css # Animaciones de scroll
\`\`\`

#### **Configuración de Fuentes**
\`\`\`
lib/fonts.ts               # Configuración centralizada de fuentes
\`\`\`

#### **Configuración de Tailwind**
\`\`\`
tailwind.config.ts         # Extensión de Tailwind con variables CSS
\`\`\`

#### **Utilidades de Tema**
\`\`\`
lib/theme-utils.ts         # Utilidades para manejo de temas
\`\`\`

---

## 🎨 2. Variables del Sistema de Diseño

### **Colores Base** (`styles/variables/base.css`)

\`\`\`css
:root {
  /* Colores fundamentales */
  --color-white: 0 0% 100%;
  --color-black: 0 0% 3.9%;
  
  /* Paleta de grises completa */
  --color-gray-50: 0 0% 98%;
  --color-gray-100: 0 0% 96.1%;
  --color-gray-500: 0 0% 63.9%;
  --color-gray-900: 0 0% 9.6%;
  --color-gray-950: 0 0% 3.9%;
  
  /* Colores de marca EMEDOS */
  --color-emedos-green: 72 87% 40%;        /* #97BF0D */
  --color-emedos-gray: 0 0% 35%;           /* #404040 */
  --color-forest-green: 150 63% 30%;
  --color-lime-green: 120 61% 50%;
  --color-deep-blue: 220 70% 40%;
}
\`\`\`

### **Colores Semánticos** (`styles/themes/unified.css`)

\`\`\`css
:root {
  /* Colores semánticos que cambian según el tema */
  --background: var(--color-bone-white);
  --foreground: var(--color-emedos-gray);
  --primary: var(--color-emedos-green);
  --secondary: var(--color-deep-blue);
  --accent: var(--color-lime-green);
  --muted: var(--color-gray-100);
  --border: var(--color-gray-300);
}

.dark {
  /* Variables para tema oscuro */
  --background: var(--color-gray-darkest);
  --foreground: var(--color-emedos-gray);
  --primary: var(--color-forest-green-dark);
  /* ... */
}
\`\`\`

### **Sistema de Tipografía** (`styles/variables/typography.css`)

\`\`\`css
:root {
  /* Familias de fuentes con fallbacks */
  --font-sans: var(--font-navbar), ui-sans-serif, system-ui;
  --font-mono: var(--font-heading), ui-monospace, SFMono-Regular;
  --font-open: var(--font-body), ui-sans-serif, system-ui;
  
  /* Tamaños de fuente */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  
  /* Pesos de fuente */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
}
\`\`\`

### **Espaciado y Layout** (`styles/variables/layout.css`)

\`\`\`css
:root {
  /* Espaciado consistente */
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  
  /* Contenedores */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  
  /* Z-index */
  --z-navbar: 40;
  --z-dropdown: 50;
  --z-modal: 100;
}
\`\`\`

---

## 🖌️ 3. Aplicación de Estilos

### **Componentes Base Obligatorios**

#### **Container** (`components/ui/container.tsx`)
\`\`\`tsx
// ✅ CORRECTO: Usar Container para limitar ancho
<Container size="large" withPadding>
  <h1>Mi contenido</h1>
</Container>

// ❌ INCORRECTO: Hardcodear clases de contenedor
<div className="max-w-7xl mx-auto px-8">
  <h1>Mi contenido</h1>
</div>
\`\`\`

#### **Section** (`components/ui/section.tsx`)
\`\`\`tsx
// ✅ CORRECTO: Usar Section para estructura consistente
<Section id="about" heightType="min">
  <Container>
    <h2>Sobre Nosotros</h2>
  </Container>
</Section>

// ❌ INCORRECTO: Crear secciones manualmente
<div className="min-h-screen py-12">
  <div className="container mx-auto">
    <h2>Sobre Nosotros</h2>
  </div>
</div>
\`\`\`

### **Aplicación de Colores**

\`\`\`tsx
// ✅ CORRECTO: Usar colores semánticos
<div className="bg-primary text-primary-foreground">
  <p className="text-muted-foreground">Texto secundario</p>
</div>

// ✅ CORRECTO: Usar con opacidad
<div className="bg-primary/20 border-primary/50">
  Contenido con opacidad
</div>

// ❌ INCORRECTO: Colores hardcodeados
<div className="bg-green-500 text-white">
  <p className="text-gray-600">Texto secundario</p>
</div>
\`\`\`

### **Aplicación de Tipografía**

\`\`\`tsx
// ✅ CORRECTO: Usar clases de fuente del sistema
<h1 className="font-heading text-4xl font-bold">Título Principal</h1>
<p className="font-body text-base">Contenido del párrafo</p>
<nav className="font-navbar text-xs font-extrabold uppercase">
  Navegación
</nav>

// ❌ INCORRECTO: Fuentes hardcodeadas
<h1 style={{ fontFamily: 'Arial', fontSize: '36px' }}>Título</h1>
\`\`\`

### **Animaciones con AnimatedElement**

\`\`\`tsx
import { AnimatedElement } from "@/components/AnimatedElement"

// ✅ CORRECTO: Usar AnimatedElement para animaciones
<AnimatedElement 
  animation="fade-in" 
  duration="slow" 
  delay={300}
>
  <Card>Contenido animado</Card>
</AnimatedElement>

// ✅ CORRECTO: Animaciones escalonadas
{items.map((item, index) => (
  <AnimatedElement 
    key={item.id}
    animation="slide-up"
    index={index}
    staggerDelay={100}
  >
    <ItemCard item={item} />
  </AnimatedElement>
))}
\`\`\`

### **Combinación de Clases con cn()**

\`\`\`tsx
import { cn } from "@/lib/utils"

// ✅ CORRECTO: Usar cn() para combinar clases
<div className={cn(
  "base-class",
  isActive && "active-class",
  className
)}>
  Contenido
</div>

// ❌ INCORRECTO: Concatenación manual
<div className={`base-class ${isActive ? 'active-class' : ''} ${className}`}>
  Contenido
</div>
\`\`\`

---

## 📄 4. Creación de Nuevas Páginas

### **Estructura Obligatoria de Páginas**

#### **Ubicación**
\`\`\`
app/[locale]/mi-nueva-pagina/page.tsx
\`\`\`

#### **Estructura Base**
\`\`\`tsx
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Container, Section } from "@/components/ui"
import { AnimatedElement } from "@/components/AnimatedElement"

// Metadatos SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const t = await getTranslations({ 
    locale: params.locale, 
    namespace: "MiPagina" 
  })
  
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function MiNuevaPagina({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const t = await getTranslations({ 
    locale: params.locale, 
    namespace: "MiPagina" 
  })

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <Section id="hero" heightType="min">
        <Container size="large">
          <AnimatedElement animation="fade-in" duration="slow">
            <h1 className="font-heading text-4xl font-bold text-foreground">
              {t("hero.title")}
            </h1>
            <p className="font-body text-lg text-muted-foreground mt-4">
              {t("hero.description")}
            </p>
          </AnimatedElement>
        </Container>
      </Section>

      {/* Content Section */}
      <Section id="content" heightType="content">
        <Container>
          <AnimatedElement animation="slide-up" delay={200}>
            {/* Contenido de la página */}
          </AnimatedElement>
        </Container>
      </Section>
    </main>
  )
}
\`\`\`

### **Traducciones**

#### **Archivo de traducciones** (`es.json`, `en.json`, `pt.json`)
\`\`\`json
{
  "MiPagina": {
    "title": "Mi Nueva Página",
    "description": "Descripción de mi nueva página",
    "hero": {
      "title": "Título del Hero",
      "description": "Descripción del hero"
    }
  }
}
\`\`\`

---

## 🧱 5. Buenas Prácticas Obligatorias

### **✅ HACER**

1. **Usar componentes base siempre**
   \`\`\`tsx
   // ✅ CORRECTO
   <Section><Container><Button variant="primary">Acción</Button></Container></Section>
   \`\`\`

2. **Usar variables CSS del tema**
   \`\`\`css
   /* ✅ CORRECTO */
   .mi-componente {
     background-color: hsl(var(--primary));
     padding: var(--spacing-4);
     border-radius: var(--radius);
   }
   \`\`\`

3. **Usar traducciones para todo el texto**
   \`\`\`tsx
   // ✅ CORRECTO
   <h1>{t("section.title")}</h1>
   \`\`\`

4. **Usar AnimatedElement para animaciones**
   \`\`\`tsx
   // ✅ CORRECTO
   <AnimatedElement animation="fade-in">
     <Card>Contenido</Card>
   </AnimatedElement>
   \`\`\`

5. **Usar cn() para combinar clases**
   \`\`\`tsx
   // ✅ CORRECTO
   <div className={cn("base-class", condition && "conditional-class")}>
   \`\`\`

### **❌ NO HACER**

1. **No hardcodear colores**
   \`\`\`tsx
   // ❌ INCORRECTO
   <div style={{ backgroundColor: '#97BF0D' }}>
   <div className="bg-green-500">
   \`\`\`

2. **No crear contenedores manuales**
   \`\`\`tsx
   // ❌ INCORRECTO
   <div className="max-w-7xl mx-auto px-8">
   \`\`\`

3. **No importar fuentes directamente**
   \`\`\`tsx
   // ❌ INCORRECTO
   import { Inter } from 'next/font/google'
   \`\`\`

4. **No usar tipos `any`**
   \`\`\`tsx
   // ❌ INCORRECTO
   const data: any = fetchData()
   \`\`\`

5. **No modificar componentes compartidos sin revisión**
   \`\`\`tsx
   // ❌ PELIGROSO: Modificar Button.tsx afecta todo el proyecto
   \`\`\`

---

## 🧩 6. Errores Comunes a Evitar

### **🚫 Error: Estilos Inline Hardcodeados**
\`\`\`tsx
// ❌ INCORRECTO
<div style={{ 
  color: '#333', 
  fontSize: '18px', 
  marginBottom: '20px' 
}}>

// ✅ CORRECTO
<div className="text-foreground text-lg mb-5">
\`\`\`

### **🚫 Error: Clases de Tailwind Sin Considerar el Sistema**
\`\`\`tsx
// ❌ INCORRECTO
<div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">

// ✅ CORRECTO
<Card className="bg-primary text-primary-foreground">
\`\`\`

### **🚫 Error: Crear Variantes de Tema Manualmente**
\`\`\`tsx
// ❌ INCORRECTO: Modificar cada página
<div className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}>

// ✅ CORRECTO: Usar variables semánticas
<div className="bg-background">
\`\`\`

### **🚫 Error: No Usar Estructura de Sección**
\`\`\`tsx
// ❌ INCORRECTO
<div className="py-20">
  <div className="container mx-auto">
    <h2>Mi Sección</h2>
  </div>
</div>

// ✅ CORRECTO
<Section id="mi-seccion">
  <Container>
    <h2>Mi Sección</h2>
  </Container>
</Section>
\`\`\`

---

## 🔧 7. Extensión del Sistema de Diseño

### **Agregar Nuevos Colores**

1. **Definir en variables base** (`styles/variables/base.css`)
   \`\`\`css
   :root {
     --color-nuevo-brand: 200 50% 45%;
   }
   \`\`\`

2. **Agregar a colores semánticos** (`styles/themes/unified.css`)
   \`\`\`css
   :root {
     --nuevo-semantic: var(--color-nuevo-brand);
   }
   \`\`\`

3. **Extender Tailwind** (`tailwind.config.ts`)
   \`\`\`ts
   colors: {
     'nuevo-semantic': 'hsl(var(--nuevo-semantic))',
   }
   \`\`\`

### **Agregar Nuevas Fuentes**

1. **Registrar en configuración** (`lib/fonts.ts`)
   \`\`\`ts
   export const fontNueva = localFont({
     src: "../app/fonts/NuevaFont.ttf",
     variable: "--font-nueva",
     display: "swap",
   })
   \`\`\`

2. **Agregar a variables** (`styles/variables/typography.css`)
   \`\`\`css
   :root {
     --font-nueva: var(--font-nueva), sans-serif;
   }
   \`\`\`

3. **Extender Tailwind** (`tailwind.config.ts`)
   \`\`\`ts
   fontFamily: {
     nueva: ["var(--font-nueva)"],
   }
   \`\`\`

### **Agregar Nuevos Componentes de Tokens**

1. **Definir tokens** (`styles/variables/components.css`)
   \`\`\`css
   :root {
     --mi-componente-bg: hsl(var(--background));
     --mi-componente-padding: var(--spacing-4);
     --mi-componente-radius: var(--radius);
   }
   \`\`\`

2. **Crear componente usando tokens**
   \`\`\`tsx
   export function MiComponente({ className, ...props }: Props) {
     return (
       <div 
         className={cn(
           "bg-[var(--mi-componente-bg)]",
           "p-[var(--mi-componente-padding)]", 
           "rounded-[var(--mi-componente-radius)]",
           className
         )}
         {...props}
       />
     )
   }
   \`\`\`

---

## 📋 8. Checklist de Desarrollo

### **Antes de Crear una Nueva Página**
- [ ] ¿Existe una traducción para todos los textos?
- [ ] ¿Estoy usando `Section` y `Container` correctamente?
- [ ] ¿Estoy usando colores semánticos del tema?
- [ ] ¿Estoy usando las fuentes del sistema?
- [ ] ¿Necesito animaciones? ¿Estoy usando `AnimatedElement`?

### **Antes de Crear un Nuevo Componente**
- [ ] ¿Ya existe un componente similar en `components/ui/`?
- [ ] ¿Estoy usando variables CSS del tema?
- [ ] ¿Estoy usando `cn()` para combinar clases?
- [ ] ¿El componente es reutilizable y flexible?
- [ ] ¿Estoy siguiendo las convenciones de naming?

### **Antes de Modificar Estilos**
- [ ] ¿Existe una variable CSS para esto?
- [ ] ¿Estoy modificando un componente compartido?
- [ ] ¿Mi cambio afectará otras páginas?
- [ ] ¿Estoy siguiendo el sistema de diseño?

---

## 🎯 9. Recursos y Referencias

### **Archivos Clave para Consultar**
- `app/[locale]/design-system/page.tsx` - Página de demostración del sistema
- `docs/design-system-guide.md` - Esta documentación
- `styles/themes/unified.css` - Tema principal
- `tailwind.config.ts` - Configuración de Tailwind
- `lib/fonts.ts` - Configuración de fuentes

### **Comandos Útiles**
\`\`\`bash
# Ver página del sistema de diseño
npm run dev
# Navegar a /[locale]/design-system

# Verificar variables CSS
# Inspeccionar elemento en DevTools > Computed > Ver variables CSS
\`\`\`

### **Herramientas de Desarrollo**
- **DevTools**: Inspeccionar variables CSS en tiempo real
- **Tailwind IntelliSense**: Autocompletado de clases
- **TypeScript**: Verificación de tipos en tiempo de desarrollo

---

## ⚠️ Advertencias Importantes

1. **NUNCA modifiques `styles/themes/unified.css` sin entender el impacto global**
2. **NUNCA hardcodees colores o fuentes si existen en el sistema**
3. **SIEMPRE usa `cn()` para combinar clases de Tailwind**
4. **SIEMPRE usa traducciones para texto visible al usuario**
5. **SIEMPRE usa componentes base (`Section`, `Container`) para estructura**

---

Esta documentación es la **fuente única de verdad** para el sistema de diseño del proyecto. Cualquier desviación de estas reglas debe ser justificada y documentada.

**Versión**: 1.0  
**Última actualización**: Julio 2025  
**Mantenedor**: Equipo de Desarrollo
