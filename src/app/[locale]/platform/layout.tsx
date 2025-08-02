import type React from "react"
import { getServerSession } from "next-auth"
import { getTranslations } from "next-intl/server"
import { authOptions } from "@/lib/auth/auth-options"
import { SidebarProvider } from "@/components/ui/sidebar"
import { PlatformSidebar } from "./components/PlatformSidebar"
import { PlatformContent } from "./components/PlatformContent"
import { redirect } from "next/navigation"

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const t = await getTranslations("Platform") // ✅ versión server-safe

  if (!session || !session.user) {
    redirect(`/?error=${encodeURIComponent(t("accessDenied.message"))}`)
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <PlatformSidebar />
        <PlatformContent>{children}</PlatformContent>
      </div>
    </SidebarProvider>
  )
}
