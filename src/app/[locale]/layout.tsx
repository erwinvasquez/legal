import type React from "react"
import type { Metadata } from "next"
import { Footer, NavbarIsla } from "@/components"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import "../globals.css"
import { AppProviders } from "@/providers/AppProviders" // Cambiado de redux/Providers
import { SchemaOrg } from "@/components/seo/SchemaOrg"
import { generateWebsiteSchema } from "@/lib/seo/schema"
import { getDefaultMetadata } from "@/lib/seo/metadata"
import { AuthProvider } from "@/providers/AuthProvider"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/auth-options"
import { Navbar } from "@/components/navbar/Navbar"

// Metadatos por defecto para el sitio
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return getDefaultMetadata("/", params.locale)
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Obtener la sesión del servidor
  const session = await getServerSession(authOptions)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  // Generar Schema.org para el sitio web
  const websiteSchema = await generateWebsiteSchema(locale)

  return (
    <AppProviders>
      <AuthProvider session={session}>
        <NextIntlClientProvider messages={messages}>
          {/* Schema.org global para el sitio web y la organización */}
          <SchemaOrg schema={websiteSchema} />

          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </AuthProvider>
    </AppProviders>
  )
}












