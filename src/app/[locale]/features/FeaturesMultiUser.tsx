"use client"

import { useTranslations } from "next-intl"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { AnimatedElement } from "@/components/AnimatedElement"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Lock, Activity, Bell } from "lucide-react"
import Image from "next/image"

export default function FeaturesMultiUser() {
  const t = useTranslations("features")
  const includes = t.raw("multiUser.includes") as string[]

  const multiUserFeatures = [
    {
      icon: Users,
      title: includes[0],
      description: "Define y personaliza los roles de acceso para cada miembro del equipo.",
    },
    {
      icon: Lock,
      title: includes[1],
      description: "Mantén un registro detallado de todas las actividades realizadas por los usuarios.",
    },
    {
      icon: Activity,
      title: includes[2],
      description: "Supervisa el progreso y la actividad del equipo desde cualquier lugar.",
    },
    {
      icon: Bell,
      title: includes[3],
      description: "Recibe alertas sobre cambios importantes en los casos que te interesan.",
    },
  ]

  return (
    <Section heightType="content" id="features-multi-user" className="py-16 md:py-24 lg:py-32 text-foreground">
      <Container  size="xlarge" className="text-center mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="fade-in" delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-4">{t("multiUser.title")}</h2>
        </AnimatedElement>
        <AnimatedElement animation="fade-in" delay={0.2}>
          <p className="text-lg text-muted-foreground text-pretty mb-12">{t("multiUser.description")}</p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {multiUserFeatures.map((feature, index) => (
            <AnimatedElement key={index} animation="slide-up" delay={0.3 + index * 0.1}>
              <Card className="bg-background p-6 shadow-sm border border-border text-center h-full flex flex-col items-center">
                <CardHeader className="pb-4 flex flex-col items-center">
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle className="text-xl font-semibold text-balance">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                  <p className="text-base text-muted-foreground text-pretty">{feature.description}</p>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>

      </Container>
    </Section>
  )
}
