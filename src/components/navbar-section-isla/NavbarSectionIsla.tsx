"use client"

import { ActiveLinkIsla } from "../active-link-isla/ActiveLinkIsla"
import { usePathname, useParams } from "next/navigation"

interface Section {
  id: string
  label: string
}

interface Props {
  sections: Section[]
  activeSection?: string
}

export const NavbarSectionIsla = ({ sections, activeSection }: Props) => {
  const pathName = usePathname()
  const { locale } = useParams()

  const scrollToSection = (sectionId: string) => {
    const isHome = pathName === `/${locale}` || pathName === `/${locale}/`
  
    if (!isHome) {
      window.location.href = `/${locale}#${sectionId}`
      return
    }
  
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start", // asegura el inicio de la sección
      })
  
      // Opcionalmente forzar actualización del hash sin recargar
      window.history.pushState(null, "", `#${sectionId}`)
    }
  }

  return (
    <>
      {sections.map((section) => (
        <div key={section.id}>
          <ActiveLinkIsla
            path={`#${section.id}`}
            text={section.label}
            isActive={activeSection === section.id}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(section.id)
            }}
          />
        </div>
      ))}
    </>
  )
}
