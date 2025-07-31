"use client"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { AnimatedElement } from "@/components/AnimatedElement"
import { useTranslations } from "next-intl"
import { Play } from "lucide-react"

export default function HomeHero() {
  const t = useTranslations("Home")

  return (
    <Section
      id="hero"
      fullWidth={true}
      noPadding={false}
      fullHeight={true}
      className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5"
    >
      <Container size="xlarge" className="relative z-10 flex flex-col items-center justify-center min-h-screen py-20">
        <div className="w-full flex flex-col items-center text-center space-y-8">
          <AnimatedElement animation="fade-in" delay={200}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight max-w-4xl">
              {t("hero.title")}
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={400}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={600}>
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl">{t("hero.description")}</p>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={800} className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="min-h-[44px] font-medium">
              {t("hero.primaryButton")}
            </Button>
            <Button variant="outline" size="lg" className="min-h-[44px] font-medium bg-transparent">
              <Play className="w-4 h-4 mr-2" />
              {t("hero.secondaryButton")}
            </Button>
          </AnimatedElement>
        </div>
      </Container>
    </Section>
  )
}
