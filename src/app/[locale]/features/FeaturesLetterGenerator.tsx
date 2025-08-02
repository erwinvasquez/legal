"use client"

import { useTranslations } from "next-intl"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { AnimatedElement } from "@/components/AnimatedElement"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Hospital, ClipboardList, Edit } from "lucide-react"
import Image from "next/image"

export default function FeaturesLetterGenerator() {
  const t = useTranslations("features")
  const types = t.raw("letterGenerator.types") as string[]

  const letterTypes = [
    {
      icon: Hospital,
      title: types[0],
      description: "Genera solicitudes formales para obtener información de hospitales y aseguradoras.",
    },
    {
      icon: FileText,
      title: types[1],
      description: "Crea informes médicos iniciales basados en la documentación cargada.",
    },
    {
      icon: ClipboardList,
      title: types[2],
      description: "Redacta cartas legales clave para el inicio y seguimiento de casos.",
    },
    {
      icon: Edit,
      title: types[3],
      description: "Adapta las plantillas a la voz y el formato de tu firma.",
    },
  ]

  return (
    <Section
      id="features-letter-generator"
      heightType="content"
      className="py-16 md:py-24 lg:py-32 text-foreground"
    >
      <Container size="xlarge" className="text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="fade-in" delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-4">
            {t("letterGenerator.title")}
          </h2>
        </AnimatedElement>
        <AnimatedElement animation="fade-in" delay={0.2}>
          <p className="text-lg text-muted-foreground text-pretty mb-12">{t("letterGenerator.description")}</p>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {letterTypes.map((type, index) => (
              <AnimatedElement key={index} animation="slide-up" delay={0.4 + index * 0.1}>
                <Card className="bg-muted p-6 shadow-sm border border-border text-left h-full">
                  <CardHeader className="pb-4">
                    <type.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-xl font-semibold text-balance">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-base text-muted-foreground text-pretty">{type.description}</p>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
          <AnimatedElement animation="slide-up" delay={0.4}>
            <Card className="bg-card p-4 sm:p-6 shadow-2xl border border-border transform lg:rotate-3 lg:scale-105 transition-transform duration-500 ease-out">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center text-muted-foreground">
                  <Image
                    src="/placeholder.svg?height=600&width=450"
                    alt="Letter Mockup"
                    width={450}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>
        </div>
      </Container>
    </Section>
  )
}

