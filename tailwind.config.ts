import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sistema de colores semánticos usando CSS variables
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Colores de componentes
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // Colores de marca
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        // Estados
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },

        // Elementos de interfaz
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Navbar específico
        navbar: {
          DEFAULT: "hsl(var(--navbar-bg))",
          foreground: "hsl(var(--navbar-text))",
          hover: "hsl(var(--navbar-link-hover-color))",
          active: "hsl(var(--navbar-link-active-color))",
          border: "hsl(var(--navbar-border-color))",
        },

        // Submenu específico
        submenu: {
          DEFAULT: "hsl(var(--submenu-bg))",
          foreground: "hsl(var(--submenu-text))",
          muted: "hsl(var(--submenu-text-muted))",
          hover: "hsl(var(--submenu-hover-bg))",
          border: "hsl(var(--submenu-border-color))",
        },

        // Gráficos
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },

      // ============================================================================
      // SISTEMA DE TIPOGRAFÍA CENTRALIZADO
      // ============================================================================
      // Estas clases permiten usar las 4 fuentes del sistema:
      // - font-navbar: Navegación principal
      // - font-heading: Títulos y secciones  
      // - font-body: Contenido principal
      // - font-aux: Elementos auxiliares
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        open: ["var(--font-open)"],
        navbar: ["var(--font-navbar)"],
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        aux: ["var(--font-aux)"],
      },

      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
        "5xl": "var(--font-size-5xl)",
        "6xl": "var(--font-size-6xl)",
      },

      fontWeight: {
        normal: "var(--font-weight-normal)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
        extrabold: "var(--font-weight-extrabold)",
      },

      lineHeight: {
        none: "var(--line-height-none)",
        tight: "var(--line-height-tight)",
        snug: "var(--line-height-snug)",
        normal: "var(--line-height-normal)",
        relaxed: "var(--line-height-relaxed)",
        loose: "var(--line-height-loose)",
      },

      letterSpacing: {
        tighter: "var(--letter-spacing-tighter)",
        tight: "var(--letter-spacing-tight)",
        normal: "var(--letter-spacing-normal)",
        wide: "var(--letter-spacing-wide)",
        wider: "var(--letter-spacing-wider)",
        widest: "var(--letter-spacing-widest)",
      },

      // Espaciado usando variables CSS
      spacing: {
        "0": "var(--spacing-0)",
        "1": "var(--spacing-1)",
        "2": "var(--spacing-2)",
        "3": "var(--spacing-3)",
        "4": "var(--spacing-4)",
        "5": "var(--spacing-5)",
        "6": "var(--spacing-6)",
        "8": "var(--spacing-8)",
        "10": "var(--spacing-10)",
        "12": "var(--spacing-12)",
        "16": "var(--spacing-16)",
        "20": "var(--spacing-20)",
        "24": "var(--spacing-24)",
      },

      // Bordes
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // Sombras usando variables CSS
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        submenu: "var(--submenu-shadow)",
      },

      // Animaciones
      transitionDuration: {
        DEFAULT: "var(--transition-duration)",
      },

      transitionTimingFunction: {
        DEFAULT: "var(--transition-timing)",
      },

      // Z-index
      zIndex: {
        "0": "var(--z-0)",
        "10": "var(--z-10)",
        "20": "var(--z-20)",
        "30": "var(--z-30)",
        "40": "var(--z-40)",
        "50": "var(--z-50)",
        navbar: "var(--z-navbar)",
        submenu: "var(--z-submenu)",
        dropdown: "var(--z-dropdown)",
        modal: "var(--z-modal)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config


