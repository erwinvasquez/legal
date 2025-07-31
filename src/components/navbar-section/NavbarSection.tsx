"use client"

import type React from "react"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useCallback, useState } from "react"
import { useActiveSection } from "@/hooks"
import style from "../active-link/ActiveLink.module.css"
import { DEFAULT_SECTION_DETECTION } from "@/lib/animation-config"

interface Section {
  id: string
  label: string
}

interface NavbarSectionProps {
  sections: Section[]
}

export const NavbarSection: React.FC<NavbarSectionProps> = ({ sections }) => {
  const router = useRouter()
  const pathname = usePathname()

  // Obtener locale de la URL
  const locale = pathname?.split("/")[1] || "es"

  const [targetId, setTargetId] = useState<string | null>(null)

  // Verificar si estamos en la página principal
  const isHomePage = pathname === `/${locale}`

  // Usar nuestro hook unificado para detectar la sección activa
  const activeSection = useActiveSection({
    threshold: DEFAULT_SECTION_DETECTION.threshold,
    selectorPattern: DEFAULT_SECTION_DETECTION.selectorPattern,
  })

  // Scroll suave hacia una sección específica
  const handleScroll = useCallback((id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  // Navegar entre secciones o a la página principal
  const handleNavigation = (id: string) => {
    if (pathname === `/${locale}`) {
      handleScroll(id)
      // Actualizar manualmente el hash sin recargar la página
      window.history.pushState(null, "", `#${id}`)
    } else {
      setTargetId(id)
      // Navegar primero a la página principal sin hash para permitir el scroll suave
      router.push(`/${locale}`)
    }
  }

  // Aplicar el scroll después de cambiar de página
  useEffect(() => {
    if (targetId && pathname === `/${locale}`) {
      const timeout = setTimeout(() => {
        handleScroll(targetId)
        // Actualizar manualmente el hash sin recargar la página
        window.history.pushState(null, "", `#${targetId}`)
        setTargetId(null)
      }, 300) // Aumentamos el tiempo para asegurar que la página esté completamente cargada
      return () => clearTimeout(timeout)
    }
  }, [pathname, targetId, handleScroll, locale])

  // Determinar si una sección está activa
  const isSectionActive = (sectionId: string) => {
    // Verificar si hay un hash en la URL que coincida con el ID de la sección
    const hash = window.location.hash.substring(1)

    // Si estamos en la página principal, usar el activeSection del hook o el hash
    if (isHomePage) {
      return activeSection === sectionId || hash === sectionId
    }

    // Si estamos en otra página, verificar si la URL coincide con el ID de la sección
    const currentPage = pathname.split("/").pop()?.toLowerCase() || ""
    return currentPage === sectionId.toLowerCase()
  }

  return (
    <div className="flex items-center" style={{ gap: "var(--navbar-link-spacing)" }}>
      {sections.map((section) => (
        <Link
          key={section.id}
          href={`/${locale}#${section.id}`}
          scroll={false}
          className={`${style["text-link"]} ${isSectionActive(section.id) ? style["active-text-link"] : ""}`}
          onClick={(e) => {
            e.preventDefault()
            handleNavigation(section.id)
          }}
        >
          {section.label}
        </Link>
      ))}
    </div>
  )
}
