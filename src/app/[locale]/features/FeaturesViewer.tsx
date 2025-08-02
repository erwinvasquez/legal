"use client"

import { useTranslations } from "next-intl"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { AnimatedElement } from "@/components/AnimatedElement"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Lightbulb, FileText } from "lucide-react"
import Image from "next/image"

export default function FeaturesViewer() {
  const t = useTranslations("features")
  const functions = t.raw("viewer.functions") as string[]

  const viewerFunctions = [
    {
      icon: Search,
      title: functions[0],
      description: "Busca por síntomas, medicamentos o términos legales en segundos.",
    },
    {
      icon: Lightbulb,
      title: functions[1],
      description: "Resalta fechas, nombres, diagnósticos y códigos CIE-10 automáticamente.",
    },
    {
      icon: FileText,
      title: functions[2],
      description: "Obtén un resumen automático del contenido del documento por IA.",
    },
    {
      icon: Lightbulb, // Reusing Lightbulb for "Vista dividida" as no specific icon was provided
      title: functions[3],
      description: "Compara dos archivos lado a lado para un análisis detallado.",
    },
  ]

  return (
    <Section heightType="content" id="features-document-viewer" className="py-16 md:py-24 lg:py-32 text-foreground">
      <Container  size="xlarge" className="grid lg:grid-cols-2 gap-12 items-center">
        <AnimatedElement animation="slide-up" delay={0.1}>
          <Card className="bg-card p-4 sm:p-6 shadow-lg border border-border">
            <CardContent className="p-0">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center text-muted-foreground">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Document Viewer Interface"
                  alt="Document Viewer Interface"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>
        <AnimatedElement animation="slide-up" delay={0.2}>
          <div className="space-y-6 lg:pl-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{t("viewer.title")}</h2>
            <p className="text-lg text-muted-foreground text-pretty">{t("viewer.description")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {viewerFunctions.map((func, index) => (
                <AnimatedElement key={index} animation="slide-up" delay={0.3 + index * 0.1}>
                  <Card className="bg-background p-4 shadow-sm border border-border h-full">
                    <CardContent className="p-0 flex flex-col items-start text-left">
                      <func.icon className="h-6 w-6 text-primary mb-3" />
                      <p className="text-base font-medium text-foreground text-balance">{func.title}</p>
                    </CardContent>
                  </Card>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </AnimatedElement>
      </Container>
    </Section>
  )
}
