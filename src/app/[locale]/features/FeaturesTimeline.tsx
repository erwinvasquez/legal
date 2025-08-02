"use client"

import { useTranslations } from "next-intl"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { AnimatedElement } from "@/components/AnimatedElement"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Eye, Layers, Gavel } from "lucide-react"
import Image from "next/image"

export default function FeaturesTimeline() {
  const t = useTranslations("features")
  const benefits = t.raw("timeline.benefits") as string[]

  const timelinePoints = [
    {
      icon: Calendar,
      title: benefits[0],
      description: "Organiza cronológicamente todos los eventos relevantes del caso.",
    },
    {
      icon: Eye,
      title: benefits[1],
      description: "Adapta la línea de tiempo para presentaciones en juicios o peritajes.",
    },
    {
      icon: Layers,
      title: benefits[2],
      description: "Filtra y agrupa la información según tus necesidades de análisis.",
    },
    {
      icon: Gavel,
      title: benefits[3],
      description: "Presenta de forma clara y concisa la progresión del caso.",
    },
  ]

  return (
    <Section heightType="content" id="features-auto-timeline" className="py-16 md:py-24 lg:py-32 text-foreground">
      <Container  size="xlarge" className="text-center mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="fade-in" delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-4">{t("timeline.title")}</h2>
        </AnimatedElement>
        <AnimatedElement animation="fade-in" delay={0.2}>
          <p className="text-lg text-muted-foreground text-pretty mb-12">{t("timeline.description")}</p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {timelinePoints.map((point, index) => (
            <AnimatedElement key={index} animation="slide-up" delay={0.3 + index * 0.1}>
              <Card className="bg-muted p-6 shadow-sm border border-border h-full flex flex-col items-center text-center">
                <CardHeader className="pb-4 flex flex-col items-center">
                  <point.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle className="text-xl font-semibold text-balance">{point.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                  <p className="text-base text-muted-foreground text-pretty">{point.description}</p>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </Container>
    </Section>
  )
}
