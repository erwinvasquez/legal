"use client"

import { useTranslations } from "next-intl"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { AnimatedElement } from "@/components/AnimatedElement"

export default function FeaturesIntro() {
  const t = useTranslations("features")

  return (
    <Section heightType="content" id="features-intro" className="py-16 md:py-24 lg:py-32 text-foreground text-center">
      <Container  size="xlarge" className="mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="fade-in" delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance mb-4">
            {t("intro.title")}
          </h1>
        </AnimatedElement>
        <AnimatedElement animation="fade-in" delay={0.2}>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">{t("intro.subtitle")}</p>
        </AnimatedElement>
      </Container>
    </Section>
  )
}
