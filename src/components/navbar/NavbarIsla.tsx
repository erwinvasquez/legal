"use client"

import type React from "react"
import { useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { MobileMenu } from "../mobile-menu/MobileMenu"
import { Submenu, type PageWithSubmenu } from "../submenu/Submenu"
import { Home, Sparkles, DollarSign, Mail } from "lucide-react"
import { AuthDrawer } from "../auth/AuthDrawer"
import { useAuth, useScrollPosition, useSimpleLocalization, useActiveSection } from "@/hooks" // ✅ CAMBIADO: useSimpleLocalization
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { useRole } from "@/hooks/useRole"
import { ActiveLinkIsla } from "../active-link-isla/ActiveLinkIsla"
import { NavbarSectionIsla } from "../navbar-section-isla/NavbarSectionIsla"

const navItems = [
  { href: "/", text: "Home" },
  { href: "/pricing", text: "Pricing" },
  { href: "/contact", text: "Contact" },
]

export const NavbarIsla = () => {
  const S = useTranslations("Sections")
  const P = useTranslations("Pages")
  const A = useTranslations("Admin")
  const t = useTranslations()
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false)
  const { session, status } = useAuth()
  const { locale, getLocalizedPath } = useSimpleLocalization() // ✅ CAMBIADO: useSimpleLocalization
  const { isAdmin } = useRole() // Usar el hook de roles para verificar si es admin
  const activeSection = useActiveSection({ selectorPattern: "section[id]" })

  // Usar el hook de scroll para detectar cuando el usuario está haciendo scroll
  const { isScrolling, scrollY } = useScrollPosition(5, 300)

  // Determinar la clase de la navbar basada en el estado del scroll
  const navbarClass = cn("navbar", isScrolling ? "navbar-scrolling" : "navbar-static")

  // Usar useCallback para memoizar funciones
  const handleUserIconClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsAuthDrawerOpen(true)
  }, [])

  // Usar useCallback para memoizar la función de cierre del drawer
  const handleCloseAuthDrawer = useCallback(() => {
    setIsAuthDrawerOpen(false)
  }, [])

  // Función para manejar el clic en enlaces con submenu
  const handleSubmenuToggle = useCallback((e: React.MouseEvent, path: string) => {
    e.preventDefault()
    setHoveredPath((current) => (current === path ? null : path))
  }, [])

  // Memoizar la construcción de páginas simples para evitar recálculos en cada renderizado
  const simplePages = useMemo(() => {
    const pages: Array<{ path: string; text: string }> = [
      {
        path: "/about-us",
        text: t("Navbar.about-us"),
      },
      {
        path: "/technology",
        text: t("Navbar.technology"),
      },
      {
        path: "/calculadora",
        text: t("Navbar.calculadora"),
      },
    ]

    // Solo mostrar el panel de administración si el usuario es admin
    if (status === "authenticated" && session && isAdmin) {
      pages.push({
        path: "/admin",
        text: t("Navbar.admin"),
      })
    }

    return pages
  }, [status, session, A, isAdmin, t])

  // Páginas con submenu (memoizado para evitar recreaciones en cada renderizado)
  const pagesWithSubmenu: PageWithSubmenu[] = useMemo(
    () => [
      {
        path: "/",
        text: t("Navbar.home"),
        subpages: [
          {
            path: "/",
            title: t("NavbarSubmenu.home.title"),
            description: t("NavbarSubmenu.home.subtitle"),
            icon: <Home className="h-5 w-5" />,
            sections: [
              { id: "hero", title: t("NavbarSubmenu.home.hero") },
              { id: "problems", title: t("NavbarSubmenu.home.problems") },
              { id: "how-it-works", title: t("NavbarSubmenu.home.how") },
              { id: "outcomes", title: t("NavbarSubmenu.home.outcomes") },
              { id: "plans", title: t("NavbarSubmenu.home.plans") },
              { id: "cta", title: t("NavbarSubmenu.home.cta") },
            ],
          },
        ],
      },
      {
        path: "/features",
        text: t("Navbar.features"),
        subpages: [
          {
            path: "/features",
            title: t("NavbarSubmenu.features.title"),
            description: t("NavbarSubmenu.features.subtitle"),
            icon: <Sparkles className="h-5 w-5" />,
            sections: [
              { id: "case-management", title: t("NavbarSubmenu.features.caseManagement") },
              { id: "auto-timeline", title: t("NavbarSubmenu.features.autoTimeline") },
              { id: "ai-chat", title: t("NavbarSubmenu.features.aiChat") },
              { id: "letter-generator", title: t("NavbarSubmenu.features.letterGen") },
              { id: "document-viewer", title: t("NavbarSubmenu.features.docViewer") },
              { id: "multi-user-control", title: t("NavbarSubmenu.features.multiUser") },
            ],
          },
        ],
      },
      {
        path: "/pricing",
        text: t("Navbar.pricing"),
        subpages: [
          {
            path: "/pricing",
            title: t("NavbarSubmenu.pricing.title"),
            description: t("NavbarSubmenu.pricing.subtitle"),
            icon: <DollarSign className="h-5 w-5" />,
            sections: [
              { id: "plan-comparison", title: t("NavbarSubmenu.pricing.comparison") },
              { id: "monthly-annual-plans", title: t("NavbarSubmenu.pricing.plans") },
              { id: "pricing-faqs", title: t("NavbarSubmenu.pricing.faqs") },
              { id: "create-account-cta", title: t("NavbarSubmenu.pricing.cta") },
            ],
          },
        ],
      },
      {
        path: "/contact",
        text: t("Navbar.contact"),
        subpages: [
          {
            path: "/contact",
            title: t("NavbarSubmenu.contact.title"),
            description: t("NavbarSubmenu.contact.subtitle"),
            icon: <Mail className="h-5 w-5" />,
            sections: [
              { id: "contact-form", title: t("NavbarSubmenu.contact.form") },
              { id: "legal-tech-faq", title: t("NavbarSubmenu.contact.faq") },
              { id: "company-info", title: t("NavbarSubmenu.contact.companyInfo") },
            ],
          },
        ],
      },
    ],
    [t, S],
  )

  // Definimos las secciones que queremos mostrar en el NavbarSection
  type SectionItem = { id: string; label: string }
  const sections: SectionItem[] = useMemo(
    () => [
      // { id: "home", label: S("home") },
      // { id: "benefits", label: S("benefits") },
      // { id: "sectors", label: S("sectors") },
      // { id: "solutions", label: S("solutions") },
      // { id: "contact", label: S("contact") },
      // { id: "about-us", label: S("about-us") },
    ],
    [S],
  )

  // Unificar todos los ítems de menú (secciones, páginas simples, páginas con submenú)
  const allMenuItems = useMemo(() => {
    // Secciones (NavbarSection), páginas simples y páginas con submenú
    const sectionItems = sections
      .filter((section) => section && typeof section === "object" && section.id && section.label)
      .map((section) => ({ type: "section", ...section }))
    const simpleItems = simplePages
      .filter((page) => page && typeof page === "object" && page.path && page.text)
      .map((page) => ({ type: "simple", ...page }))
    const submenuItems = pagesWithSubmenu
      .filter((page) => page && typeof page === "object" && page.path && page.text)
      .map((page) => ({ type: "submenu", ...page }))
    return [...sectionItems, ...submenuItems, ...simpleItems]
  }, [sections, simplePages, pagesWithSubmenu])

  // Dividir dinámicamente los ítems en dos mitades
  const [leftItems, rightItems] = useMemo(() => {
    const half = Math.ceil(allMenuItems.length / 2)
    return [allMenuItems.slice(0, half), allMenuItems.slice(half)]
  }, [allMenuItems])

  return (
    <div className="pointer-events-none select-none flex justify-center w-full md:mt-6 mt-0 z-[var(--navbar-z-index)] fixed top-0 left-0 right-0">
      <Container
        as="nav"
        size="large"
        centered={true}
        withPadding={false}
        className={cn(
          "pointer-events-auto select-auto",
          "w-full",
          "flex-none",
          "border border-gray-100 dark:border-gray-800",
          "transition-all duration-300",
          // Isla flotante solo en md+
          "md:rounded-full md:shadow-lg md:bg-gradient-to-t md:from-primary/15 md:to-white/90 md:backdrop-blur md:py-2 md:px-4",
          // Barra plana en mobile
          "bg-white py-2 px-2",
          "island-navbar",
        )}
        style={{ minHeight: "var(--navbar-height)" }}
        onMouseLeave={() => setHoveredPath(null)}
      >
        <div className="w-full px-0 md:px-4 flex items-center justify-between">
          {/* Desktop: Menú izquierdo - se estira hacia el extremo izquierdo */}
          <div className="hidden lg:flex gap-x-4 flex-1 justify-start">
            {leftItems.map((item, idx) => {
              if (item.type === "section" && "id" in item && "label" in item) {
                // Solo renderizar si hay secciones
                if (!item.id || !item.label) return null
                return (
                  <div key={item.id ?? idx} onMouseEnter={() => setHoveredPath(null)}>
                    <NavbarSectionIsla sections={[item]} activeSection={activeSection ?? undefined} />
                  </div>
                )
              }
              if (item.type === "simple" && "path" in item && "text" in item) {
                return (
                  <div key={item.path ?? idx} onMouseEnter={() => setHoveredPath(null)}>
                    <ActiveLinkIsla path={item.path} text={item.text} />
                  </div>
                )
              }
              if (item.type === "submenu" && "path" in item && "text" in item) {
                return (
                  <div key={item.path ?? idx} onMouseEnter={() => setHoveredPath(item.path)}>
                    <ActiveLinkIsla
                      path={item.path}
                      text={item.text}
                      hasSubmenu={true}
                      onClick={(e) => handleSubmenuToggle(e, item.path)}
                    />
                  </div>
                )
              }
              return null
            })}
          </div>

          {/* Desktop: Logo centrado con margen progresivo */}
          <div className="hidden lg:flex flex-shrink-0 mx-12 md:mx-8 sm:mx-4">
            <Link href={`/${locale}`} className="flex items-center h-12 min-w-[120px]" tabIndex={0}>
              <div className="h-10 w-auto max-w-[140px] sm:h-12">
                <img
                  src="/images/Logo 2.png"
                  alt="Logo Icon"
                  className="h-full w-auto object-contain transition-all duration-200"
                />
              </div>
            </Link>
          </div>

          {/* Desktop: Menú derecho - se estira hacia el extremo derecho */}
          <div className="hidden lg:flex gap-x-4 flex-1 justify-end">
            {rightItems.map((item, idx) => {
              if (item.type === "section" && "id" in item && "label" in item) {
                // Solo renderizar si hay secciones
                if (!item.id || !item.label) return null
                return (
                  <div key={item.id ?? idx} onMouseEnter={() => setHoveredPath(null)}>
                    <NavbarSectionIsla sections={[item]} activeSection={activeSection ?? undefined} />
                  </div>
                )
              }
              if (item.type === "simple" && "path" in item && "text" in item) {
                return (
                  <div key={item.path ?? idx} onMouseEnter={() => setHoveredPath(null)}>
                    <ActiveLinkIsla path={item.path} text={item.text} />
                  </div>
                )
              }
              if (item.type === "submenu" && "path" in item && "text" in item) {
                return (
                  <div key={item.path ?? idx} onMouseEnter={() => setHoveredPath(item.path)}>
                    <ActiveLinkIsla
                      path={item.path}
                      text={item.text}
                      hasSubmenu={true}
                      onClick={(e) => handleSubmenuToggle(e, item.path)}
                    />
                  </div>
                )
              }
              return null
            })}
          </div>

          {/* Mobile: Estructura responsive */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Columna izquierda: vacía o futuro */}
            <div className="flex-1 flex justify-start">
              <MobileMenu
                sections={sections.length > 0 ? sections : []}
                pages={simplePages}
                pagesWithSubmenu={pagesWithSubmenu}
              />
            </div>
            {/* Columna central: logo centrado */}
            <div className="flex-1 flex justify-center">
              <Link href={`/${locale}`} className="flex items-center h-12 min-w-[120px]" tabIndex={0}>
                <div className="h-10 w-auto max-w-[140px] sm:h-12">
                  <img
                    src="/images/Logo 2.png"
                    alt="Logo Icon"
                    className="h-full w-auto object-contain transition-all duration-200"
                  />
                </div>
              </Link>
            </div>
            {/* Columna derecha: botón hamburguesa alineado a la derecha */}
            <div className="flex-1 flex justify-end"></div>
          </div>

          {/* Íconos y preferencias (lado derecho, siempre visibles) */}
          <div className="flex flex-shrink-0 items-center gap-x-4 ml-4" onMouseEnter={() => setHoveredPath(null)}>
            {/* Preferencias */}
            {/*
          <div className="flex items-center gap-x-2">
            <ThemeToggle />
            <SwitchLanguage />
          </div>
          */}
            {/* Acciones de usuario */}
            {/*
          <div className="flex items-center gap-x-2">
            <div className="relative">
              <NavbarIcon
                icon={<UserIcon className="h-6 w-6" />}
                onClick={handleUserIconClick}
                label="User account"
              />
              {status === "authenticated" && session && (
                <span
                  className="absolute h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                  style={{
                    top: "var(--navbar-icon-indicator-top)",
                    right: "var(--navbar-icon-indicator-right)",
                  }}
                ></span>
              )}
            </div>
            <NavbarIcon
              icon={<ShoppingCartIcon className="h-6 w-6" />}
              label="Shopping cart"
              onClick={() => (window.location.href = `/${locale}/cart`)}
            />
          </div>
          */}
          </div>
        </div>
        {/* Submenu desplegable (solo para desktop) */}
        <Submenu pages={pagesWithSubmenu} hoveredPath={hoveredPath} />
        {/* Drawer de autenticación */}
        <AuthDrawer isOpen={isAuthDrawerOpen} onClose={handleCloseAuthDrawer} />
      </Container>
    </div>
  )
}


// "use client"

// import type React from "react"
// import { useState, useCallback, useMemo } from "react"
// import Link from "next/link"
// import { useTranslations } from "next-intl"
// import { MobileMenu } from "../mobile-menu/MobileMenu"
// import { Submenu, type PageWithSubmenu } from "../submenu/Submenu"
// import { Layers, Sun, Wind, Home } from "lucide-react"
// import { AuthDrawer } from "../auth/AuthDrawer"
// import { useAuth, useScrollPosition, useSimpleLocalization, useActiveSection } from "@/hooks" // ✅ CAMBIADO: useSimpleLocalization
// import { cn } from "@/lib/utils"
// import { Container } from "@/components/ui/container"
// import { useRole } from "@/hooks/useRole"
// import { ActiveLinkIsla } from "../active-link-isla/ActiveLinkIsla"
// import { NavbarSectionIsla } from "../navbar-section-isla/NavbarSectionIsla"

// const navItems = [
//   { href: "/", text: "Home" },
//   { href: "/pricing", text: "Pricing" },
//   { href: "/contact", text: "Contact" },
// ]

// export const NavbarIsla = () => {
//   const S = useTranslations("Sections")
//   const P = useTranslations("Pages")
//   const A = useTranslations("Admin")
//   const t = useTranslations()
//   const [hoveredPath, setHoveredPath] = useState<string | null>(null)
//   const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false)
//   const { session, status } = useAuth()
//   const { locale, getLocalizedPath } = useSimpleLocalization() // ✅ CAMBIADO: useSimpleLocalization
//   const { isAdmin } = useRole() // Usar el hook de roles para verificar si es admin
//   const activeSection = useActiveSection({ selectorPattern: "section[id]" })

//   // Usar el hook de scroll para detectar cuando el usuario está haciendo scroll
//   const { isScrolling, scrollY } = useScrollPosition(5, 300)

//   // Determinar la clase de la navbar basada en el estado del scroll
//   const navbarClass = cn("navbar", isScrolling ? "navbar-scrolling" : "navbar-static")

//   // Usar useCallback para memoizar funciones
//   const handleUserIconClick = useCallback((e: React.MouseEvent) => {
//     e.preventDefault()
//     setIsAuthDrawerOpen(true)
//   }, [])

//   // Usar useCallback para memoizar la función de cierre del drawer
//   const handleCloseAuthDrawer = useCallback(() => {
//     setIsAuthDrawerOpen(false)
//   }, [])

//   // Función para manejar el clic en enlaces con submenu
//   const handleSubmenuToggle = useCallback((e: React.MouseEvent, path: string) => {
//     e.preventDefault()
//     setHoveredPath((current) => (current === path ? null : path))
//   }, [])

//   // Memoizar la construcción de páginas simples para evitar recálculos en cada renderizado
//   const simplePages = useMemo(() => {
//     const pages: Array<{ path: string; text: string }> = [
//       {
//         path: "/about-us",
//         text: P("about-us"), // Puedes usar `t("Navbar.cotizador")` si lo tienes traducido
//       },
//       {
//         path: "/technology",
//         text: P("technology"), // Puedes usar `t("Navbar.cotizador")` si lo tienes traducido
//       },
//       {
//         path: "/contact",
//         text: P("contact"), // Puedes usar `t("Navbar.cotizador")` si lo tienes traducido
//       },
//     ]

//     // Solo mostrar el panel de administración si el usuario es admin
//     // if (status === "authenticated" && session && isAdmin) {
//     //   pages.push({
//     //     path: "/admin",
//     //     text: A("adminPanel"),
//     //   })
//     // }

//     return pages
//   }, [status, session, A, isAdmin, P]) // ✅ AÑADIDO: P como dependencia

//   // Páginas con submenu (memoizado para evitar recreaciones en cada renderizado)
//   const pagesWithSubmenu: PageWithSubmenu[] = useMemo(
//     () => [
//       {
//         path: "/",
//         text: t("Navbar.home"),
//         subpages: [
//           {
//             path: "/",
//             title: t("HomePage.hero.title"),
//             description: t("HomePage.hero.subtitle"),
//             icon: <Home className="h-5 w-5" />,
//             sections: [
//               { id: "home", title: S("home") },
//               { id: "benefits", title: S("benefits") },
//               { id: "services", title: S("services") },
//               { id: "projects", title: S("projects") },
//               { id: "why-choose-us", title: S("why-choose-us") },
//               { id: "contact", title: S("contact") },
//             ],
//           },
//         ],
//       },
//       {
//         path: "/projects",
//         text: t("Navbar.projects"),
//         subpages: [
//           {
//             path: "project-1",
//             title: "Project 1",
//             description: t("HomePage.FeaturedProjectsSection.project1.name"),
//           },
//           {
//             path: "project-2",
//             title: "Project 2",
//             description: t("HomePage.FeaturedProjectsSection.project2.name"),
//           },
//           {
//             path: "project-3",
//             title: "Project 3",
//             description: t("HomePage.FeaturedProjectsSection.project3.name"),
//           },
//           {
//             path: "project-4",
//             title: "Project 4",
//             description: t("HomePage.FeaturedProjectsSection.project4.name"),
//           },
//         ],
//       },
//       {
//         path: "/services",
//         text: t("Navbar.services"),
//         subpages: [
//           {
//             path: "design",
//             title: t("HomePage.services.designTitle"),
//             description: t("HomePage.services.designDescription"),
//             sections: [
//               { id: "learn-more", title: t("HomePage.whyChooseUs.cta.secondaryButton") },
//               { id: "how-we-work", title: t("HomePage.whyChooseUs.badge") },
//               { id: "faq", title: "FAQ" },
//               { id: "contact", title: t("ContactSection.header") },
//             ],
//           },
//           {
//             path: "construction",
//             title: t("HomePage.services.constructionTitle"),
//             description: t("HomePage.services.constructionDescription"),
//             sections: [
//               { id: "learn-more", title: t("HomePage.whyChooseUs.cta.secondaryButton") },
//               { id: "how-we-work", title: t("HomePage.whyChooseUs.badge") },
//               { id: "faq", title: "FAQ" },
//               { id: "contact", title: t("ContactSection.header") },
//             ],
//           },
//           {
//             path: "supervision",
//             title: t("HomePage.services.supervisionTitle"),
//             description: t("HomePage.services.supervisionDescription"),
//             sections: [
//               { id: "learn-more", title: t("HomePage.whyChooseUs.cta.secondaryButton") },
//               { id: "how-we-work", title: t("HomePage.whyChooseUs.badge") },
//               { id: "faq", title: "FAQ" },
//               { id: "contact", title: t("ContactSection.header") },
//             ],
//           },
//           {
//             path: "training",
//             title: t("HomePage.services.trainingTitle"),
//             description: t("HomePage.services.trainingDescription"),
//             sections: [
//               { id: "learn-more", title: t("HomePage.whyChooseUs.cta.secondaryButton") },
//               { id: "how-we-work", title: t("HomePage.whyChooseUs.badge") },
//               { id: "faq", title: "FAQ" },
//               { id: "contact", title: t("ContactSection.header") },
//             ],
//           },
//         ],
//       },
     

//       // {
//       //   path: "/products",
//       //   text: t("Navbar.products"),
//       //   subpages: [
//       //     {
//       //       path: "/bipv",
//       //       title: t("SolutionsSection.bipv.title"),
//       //       description: t("SolutionsSection.bipv.subtitle"),
//       //       icon: <Layers className="h-5 w-5" />,
//       //       sections: [
//       //         {
//       //           id: "vidrios-fotovoltaicos",
//       //           title: t("BIPVPage.photovoltaicGlass.title"),
//       //         },
//       //         {
//       //           id: "teja-solar",
//       //           title: t("BIPVPage.solarTile.title"),
//       //         },
//       //         {
//       //           id: "panel-techo-solar",
//       //           title: t("BIPVPage.solarRoofPanel.title"),
//       //         },
//       //         {
//       //           id: "portatil",
//       //           title: t("BIPVPage.portableSolarPanel.title"),
//       //         },
//       //       ],
//       //     },
//       //     {
//       //       path: "/photovoltaic",
//       //       title: t("SolutionsSection.photovoltaic.title"),
//       //       description: t("SolutionsSection.photovoltaic.subtitle"),
//       //       icon: <Sun className="h-5 w-5" />,
//       //     },
//       //     {
//       //       path: "/wind",
//       //       title: t("SolutionsSection.wind.title"),
//       //       description: t("SolutionsSection.wind.subtitle"),
//       //       icon: <Wind className="h-5 w-5" />,
//       //     },
//       //   ],
//       // },
//     ],
//     [t, S],
//   )

//   // Definimos las secciones que queremos mostrar en el NavbarSection
//   type SectionItem = { id: string; label: string }
//   const sections: SectionItem[] = useMemo(
//     () => [
//       // { id: "home", label: S("home") },
//       // { id: "benefits", label: S("benefits") },
//       // { id: "sectors", label: S("sectors") },
//       // { id: "solutions", label: S("solutions") },
//       // { id: "contact", label: S("contact") },
//       // { id: "about-us", label: S("about-us") },
//     ],
//     [S],
//   )

//   // Unificar todos los ítems de menú (secciones, páginas simples, páginas con submenú)
//   const allMenuItems = useMemo(() => {
//     // Secciones (NavbarSection), páginas simples y páginas con submenú
//     const sectionItems = sections
//       .filter((section) => section && typeof section === 'object' && section.id && section.label)
//       .map((section) => ({ type: "section", ...section }))
//     const simpleItems = simplePages
//       .filter((page) => page && typeof page === 'object' && page.path && page.text)
//       .map((page) => ({ type: "simple", ...page }))
//     const submenuItems = pagesWithSubmenu
//       .filter((page) => page && typeof page === 'object' && page.path && page.text)
//       .map((page) => ({ type: "submenu", ...page }))
//     return [
//       ...sectionItems,
//       ...submenuItems,
//       ...simpleItems,
      
//     ]
//   }, [sections, simplePages, pagesWithSubmenu])

//   // Dividir dinámicamente los ítems en dos mitades
//   const [leftItems, rightItems] = useMemo(() => {
//     const half = Math.ceil(allMenuItems.length / 2)
//     return [allMenuItems.slice(0, half), allMenuItems.slice(half)]
//   }, [allMenuItems])

//   return (
//     <div className="pointer-events-none select-none flex justify-center w-full md:mt-6 mt-0 z-[var(--navbar-z-index)] fixed top-0 left-0 right-0">
//       <Container
//         as="nav"
//         size="large"
//         centered={true}
//         withPadding={false}
//         className={cn(
//           "pointer-events-auto select-auto",
//           "w-full",
//           "flex-none",
//           "border border-gray-100 dark:border-gray-800",
//           "transition-all duration-300",
//           // Isla flotante solo en md+
//           "md:rounded-full md:shadow-lg md:bg-gradient-to-t md:from-primary/15 md:to-white/90 md:backdrop-blur md:py-2 md:px-4",
//           // Barra plana en mobile
//           "bg-white py-2 px-2",
//           "island-navbar",
//         )}
//         style={{ minHeight: "var(--navbar-height)" }}
//         onMouseLeave={() => setHoveredPath(null)}
//       >
//         <div className="w-full px-0 md:px-4 flex items-center justify-between">
//           {/* Desktop: Menú izquierdo - se estira hacia el extremo izquierdo */}
//           <div className="hidden lg:flex gap-x-4 flex-1 justify-start">
//             {leftItems.map((item, idx) => {
//               if (item.type === "section" && "id" in item && "label" in item) {
//                 // Solo renderizar si hay secciones
//                 if (!item.id || !item.label) return null;
//                 return (
//                   <div key={item.id ?? idx} onMouseEnter={() => setHoveredPath(null)}>
//                     <NavbarSectionIsla sections={[item]} activeSection={activeSection ?? undefined} />
//                   </div>
//                 )
//               }
//               if (item.type === "simple" && "path" in item && "text" in item) {
//                 return (
//                   <div key={item.path ?? idx} onMouseEnter={() => setHoveredPath(null)}>
//                     <ActiveLinkIsla path={item.path} text={item.text} />
//                   </div>
//                 )
//               }
//               if (item.type === "submenu" && "path" in item && "text" in item) {
//                 return (
//                   <div key={item.path ?? idx} onMouseEnter={() => setHoveredPath(item.path)}>
//                     <ActiveLinkIsla
//                       path={item.path}
//                       text={item.text}
//                       hasSubmenu={true}
//                       onClick={(e) => handleSubmenuToggle(e, item.path)}
//                     />
//                   </div>
//                 )
//               }
//               return null
//             })}
//           </div>

//           {/* Desktop: Logo centrado con margen progresivo */}
//           <div className="hidden lg:flex flex-shrink-0 mx-12 md:mx-8 sm:mx-4">
//             <Link href={`/${locale}`} className="flex items-center h-12 min-w-[120px]" tabIndex={0}>
//               <div className="h-10 w-auto max-w-[140px] sm:h-12">
//                 <img
//                   src="/images/Logo 2.png"
//                   alt="Logo Icon"
//                   className="h-full w-auto object-contain transition-all duration-200"
//                 />
//               </div>
//             </Link>
//           </div>

//           {/* Desktop: Menú derecho - se estira hacia el extremo derecho */}
//           <div className="hidden lg:flex gap-x-4 flex-1 justify-end">
//             {rightItems.map((item, idx) => {
//               if (item.type === "section" && "id" in item && "label" in item) {
//                 // Solo renderizar si hay secciones
//                 if (!item.id || !item.label) return null;
//                 return (
//                   <div key={item.id ?? idx} onMouseEnter={() => setHoveredPath(null)}>
//                     <NavbarSectionIsla sections={[item]} activeSection={activeSection ?? undefined} />
//                   </div>
//                 )
//               }
//               if (item.type === "simple" && "path" in item && "text" in item) {
//                 return (
//                   <div key={item.path ?? idx} onMouseEnter={() => setHoveredPath(null)}>
//                     <ActiveLinkIsla path={item.path} text={item.text} />
//                   </div>
//                 )
//               }
//               if (item.type === "submenu" && "path" in item && "text" in item) {
//                 return (
//                   <div key={item.path ?? idx} onMouseEnter={() => setHoveredPath(item.path)}>
//                     <ActiveLinkIsla
//                       path={item.path}
//                       text={item.text}
//                       hasSubmenu={true}
//                       onClick={(e) => handleSubmenuToggle(e, item.path)}
//                     />
//                   </div>
//                 )
//               }
//               return null
//             })}
//           </div>

//           {/* Mobile: Estructura responsive */}
//           <div className="flex lg:hidden items-center justify-between w-full">
//             {/* Columna izquierda: vacía o futuro */}
//             <div className="flex-1 flex justify-start">
//               <MobileMenu sections={sections.length > 0 ? sections : []} pages={simplePages} pagesWithSubmenu={pagesWithSubmenu} />
//             </div>
//             {/* Columna central: logo centrado */}
//             <div className="flex-1 flex justify-center">
//               <Link href={`/${locale}`} className="flex items-center h-12 min-w-[120px]" tabIndex={0}>
//                 <div className="h-10 w-auto max-w-[140px] sm:h-12">
//                   <img
//                     src="/images/Logo 2.png"
//                     alt="Logo Icon"
//                     className="h-full w-auto object-contain transition-all duration-200"
//                   />
//                 </div>
//               </Link>
//             </div>
//             {/* Columna derecha: botón hamburguesa alineado a la derecha */}
//             <div className="flex-1 flex justify-end"></div>
//           </div>

//           {/* Íconos y preferencias (lado derecho, siempre visibles) */}
//           <div className="flex flex-shrink-0 items-center gap-x-4 ml-4" onMouseEnter={() => setHoveredPath(null)}>
//             {/* Preferencias */}
//             {/*
//             <div className="flex items-center gap-x-2">
//               <ThemeToggle />
//               <SwitchLanguage />
//             </div>
//             */}
//             {/* Acciones de usuario */}
//             {/*
//             <div className="flex items-center gap-x-2">
//               <div className="relative">
//                 <NavbarIcon
//                   icon={<UserIcon className="h-6 w-6" />}
//                   onClick={handleUserIconClick}
//                   label="User account"
//                 />
//                 {status === "authenticated" && session && (
//                   <span
//                     className="absolute h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
//                     style={{
//                       top: "var(--navbar-icon-indicator-top)",
//                       right: "var(--navbar-icon-indicator-right)",
//                     }}
//                   ></span>
//                 )}
//               </div>
//               <NavbarIcon
//                 icon={<ShoppingCartIcon className="h-6 w-6" />}
//                 label="Shopping cart"
//                 onClick={() => (window.location.href = `/${locale}/cart`)}
//               />
//             </div>
//             */}
//           </div>
//         </div>
//         {/* Submenu desplegable (solo para desktop) */}
//         <Submenu pages={pagesWithSubmenu} hoveredPath={hoveredPath} />
//         {/* Drawer de autenticación */}
//         <AuthDrawer isOpen={isAuthDrawerOpen} onClose={handleCloseAuthDrawer} />
//       </Container>
//     </div>
//   )
// }
