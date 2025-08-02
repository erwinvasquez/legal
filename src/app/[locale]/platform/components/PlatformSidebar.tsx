"use client"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { LayoutDashboard, Folder, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export function PlatformSidebar() {
  const t = useTranslations("Platform.sidebar")
  const pathname = usePathname()

  const navItems = [
    {
      title: t("dashboard"),
      href: "/platform",
      icon: LayoutDashboard,
    },
    {
      title: t("cases"),
      href: "/platform/cases",
      icon: Folder,
    },
    {
      title: t("settings"),
      href: "/platform/settings", // Placeholder for settings page
      icon: Settings,
    },
  ]

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader className="p-4">
        <Link href="/platform" className="flex items-center gap-2">
          <img src="/placeholder.svg?height=32&width=32" alt="Logo" className="h-8 w-8" />
          <span className="text-lg font-semibold group-data-[state=collapsed]:hidden">LegalAI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start group-data-[state=collapsed]:justify-center"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <Settings className="size-4 mr-2 group-data-[state=collapsed]:mr-0" />
          <span className="group-data-[state=collapsed]:hidden">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
