"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import style from "./ActiveLinkIsla.module.css"
import { useState } from "react"
import type { JSX } from "react"

interface Props {
  path: string
  text?: string
  icon?: JSX.Element
  hasSubmenu?: boolean
  onClick?: (e: React.MouseEvent) => void
  isActive?: boolean
}

export const ActiveLinkIsla = ({ path, text, icon, hasSubmenu = false, onClick, isActive }: Props) => {
  const pathName = usePathname() // Detecta la ruta actual
  const { locale } = useParams() // Obtenemos el idioma actual de la ruta
  const [isHovered, setIsHovered] = useState(false)

  const getLocalePath = (path: string) => `/${locale}${path}` // Construimos la ruta con el idioma

  const linkClass = icon ? style["icon-link"] : style["text-link"] // Elegimos la clase según si hay un ícono o no

  // Determinamos la clase activa dinámicamente
  const activeClass = isActive
    ? (icon ? style["active-icon-link"] : style["active-text-link"])
    : (pathName.startsWith(`/${locale}${path}`)
      ? (icon ? style["active-icon-link"] : style["active-text-link"])
      : "")

  // Renderizar el icono con efecto de escala mejorado para la isla
  const renderIcon = () => {
    if (!icon) return null

    // Clonar el icono y añadir propiedades de estilo específicas para la isla
    return React.cloneElement(icon as React.ReactElement, {
      style: {
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered
          ? `scale(${pathName.startsWith(`/${locale}${path}`) ? "1.15" : "1.1"}) translateY(-1px)`
          : "scale(1)",
        filter: isHovered ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" : "",
      },
    })
  }

  // Renderizar el texto con efectos mejorados
  const renderText = () => {
    if (!text) return null

    return (
      <span
        style={{
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          textShadow: isHovered ? "0 1px 2px rgba(0,0,0,0.1)" : "",
        }}
      >
        {text}
      </span>
    )
  }

  return (
    <div className="flex items-center">
      <Link
        className={`${linkClass} ${activeClass}`}
        href={getLocalePath(path)} // Enlace con prefijo del idioma
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        style={{
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {icon ? renderIcon() : renderText()}
      </Link>
    </div>
  )
}
