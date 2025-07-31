"use client"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { useTranslations } from "next-intl"
import { ShieldCheck, Leaf, Zap, Home } from "lucide-react"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function HomeBenefits() {
  const t = useTranslations("HomePage")
  const benefits = [
    {
      icon: <ShieldCheck className="h-10 w-10" />,
      title: t("BenefitsSection.benefit1.title"),
      description: t("BenefitsSection.benefit1.description"),
    },
    {
      icon: <Leaf className="h-10 w-10" />,
      title: t("BenefitsSection.benefit2.title"),
      description: t("BenefitsSection.benefit2.description"),
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: t("BenefitsSection.benefit3.title"),
      description: t("BenefitsSection.benefit3.description"),
    },
    {
      icon: <Home className="h-10 w-10" />,
      title: t("BenefitsSection.benefit4.title"),
      description: t("BenefitsSection.benefit4.description"),
    },
  ]
  return (
    <Section id="benefits" heightType="content" className="py-16 md:py-24">
      <Container size="medium">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading text-foreground">{t("BenefitsSection.title")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className={cn(
                "relative flex flex-col items-center text-center",
                "bg-gradient-to-br from-card to-card/80 text-card-foreground",
                "shadow-xl transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.03] overflow-hidden group",
                "p-0", // Elimina el padding por defecto de Card, se aplicará en CardContent
              )}
            >
              {/* Superposición de degradado interna */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

              <CardContent className="relative z-10 p-8 flex flex-col items-center text-center w-full">
                {/* Icono */}
                <div className="p-5 rounded-full bg-primary/15 text-primary mb-6 transform group-hover:rotate-6 transition-transform duration-500">
                  {benefit.icon}
                </div>
                {/* Título */}
                <CardTitle className="text-2xl font-bold mb-3 font-heading text-foreground group-hover:text-primary transition-colors duration-500">
                  {benefit.title}
                </CardTitle>
                {/* Descripción */}
                <CardDescription className="text-lg text-muted-foreground font-body">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}


