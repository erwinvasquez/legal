// "use client"

// import { useState, useEffect } from "react"
// import { useTheme } from "next-themes"
// import { Moon, Sun, Monitor } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// export function ThemeToggle() {
//   const [mounted, setMounted] = useState(false)
//   const { theme, setTheme, systemTheme } = useTheme()

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted) {
//     return (
//       <Button variant="ghost" size="icon" className="w-9 h-9">
//         <span className="sr-only">Toggle theme</span>
//       </Button>
//     )
//   }

//   const currentTheme = theme === "system" ? systemTheme : theme

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" className="w-9 h-9 hover:bg-muted transition-colors">
//           {currentTheme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="min-w-[120px]">
//         <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
//           <Sun className="mr-2 h-4 w-4" />
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
//           <Moon className="mr-2 h-4 w-4" />
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
//           <Monitor className="mr-2 h-4 w-4" />
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }





// TEMA SIN TOGLE
"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { NavbarIcon } from "@/components/ui/navbar-icon"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
    // Forzar tema light si no hay tema guardado
    if (!theme || theme === "system") {
      setTheme("light")
    }
  }, [theme, setTheme])

  // Si no está montado, renderizar un placeholder con las mismas dimensiones
  if (!mounted) {
    return (
      <div className="w-9 h-9 flex items-center justify-center opacity-0">
        <span className="sr-only">Toggle theme</span>
      </div>
    )
  }

  return (
    <NavbarIcon
      icon={theme === "dark" ? <Sun /> : <Moon className="fill-current" />}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      label="Toggle theme"
    />
  )
}