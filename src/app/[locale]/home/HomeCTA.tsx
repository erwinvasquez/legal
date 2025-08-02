"use client"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { AnimatedElement } from "@/components/AnimatedElement"
import { useTranslations } from "next-intl"
import { ArrowRight, Calendar } from "lucide-react"

export default function HomeCTA() {
  const t = useTranslations("Home")

  return (
    <Section id="cta" fullWidth={true} heightType="content" className="relative w-screen bg-gradient-to-r from-primary to-primary/80">
      <Container size="xlarge">
        <div className="text-center text-white">
          <AnimatedElement animation="fade-in" delay={200}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t("cta.title")}</h2>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={400}>
            <p className="font-body text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={600} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="min-h-[44px] font-medium">
              <ArrowRight className="w-4 h-4 mr-2" />
              {t("cta.primaryButton")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-[44px] font-medium bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t("cta.secondaryButton")}
            </Button>
          </AnimatedElement>
        </div>
      </Container>
    </Section>
  )
}
