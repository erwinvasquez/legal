"use client"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { AnimatedElement } from "@/components/AnimatedElement"
import { useTranslations } from "next-intl"
import { Zap, Target, FileCheck, Clock } from "lucide-react"

export default function HomeScenarios() {
  const t = useTranslations("Home")

  const scenarios = [
    {
      icon: Zap,
      title: t("scenarios.item1.title"),
      description: t("scenarios.item1.description"),
      timeLabel: t("scenarios.item1.timeLabel"),
      delay: 100,
    },
    {
      icon: Target,
      title: t("scenarios.item2.title"),
      description: t("scenarios.item2.description"),
      timeLabel: t("scenarios.item2.timeLabel"),
      delay: 200,
    },
    {
      icon: FileCheck,
      title: t("scenarios.item3.title"),
      description: t("scenarios.item3.description"),
      timeLabel: t("scenarios.item3.timeLabel"),
      delay: 300,
    },
    {
      icon: Clock,
      title: t("scenarios.item4.title"),
      description: t("scenarios.item4.description"),
      timeLabel: t("scenarios.item4.timeLabel"),
      delay: 400,
    },
  ]

  return (
    <Section id="scenarios" className="py-12 lg:py-20">
      <Container size="xlarge">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <AnimatedElement animation="fade-in" delay={100}>
            <h2 className="text-foreground font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
              {t("scenarios.title")}
            </h2>
          </AnimatedElement>
          <AnimatedElement animation="fade-in" delay={200}>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mt-4">
              {t("scenarios.subtitle")}
            </p>
          </AnimatedElement>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {scenarios.map((scenario, index) => (
            <AnimatedElement key={index} animation="fade-in" delay={0.3 + index * 0.1}>
            <div className="relative bg-card rounded-2xl p-6 lg:p-8 shadow-md border border-border/40 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              {/* Floating icon */}
              <div className="absolute -top-3 -left-3 w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <scenario.icon className="w-7 h-7 text-primary-foreground" />
              </div>
          
              {/* Time badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
                <Clock className="w-4 h-4" />
                {scenario.timeLabel}
              </div>
          
              {/* Title */}
              <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3 leading-tight">
                {scenario.title}
              </h3>
          
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {scenario.description}
              </p>
          
              {/* Decorative line */}
              <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
            </div>
          </AnimatedElement>
          
          ))}
        </div>

        {/* CTA inferior */}
        <AnimatedElement animation="fade-in" delay={1000}>
          <div className="text-center mt-16 lg:mt-20">
            <div className="relative bg-card rounded-2xl p-6 lg:p-10 max-w-3xl mx-auto border border-border/50 shadow-lg">
              <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3">
                {t("scenarios.cta.title")}
              </h3>
              <p className="text-muted-foreground text-base mb-6 max-w-2xl mx-auto">
                {t("scenarios.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="group bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  <span className="group-hover:scale-105 inline-block transition-transform duration-300">
                    {t("scenarios.cta.primaryButton")}
                  </span>
                </button>
                <button className="group border-2 border-border text-foreground px-6 py-3 rounded-xl font-semibold hover:bg-muted hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                  <span className="group-hover:scale-105 inline-block transition-transform duration-300">
                    {t("scenarios.cta.secondaryButton")}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </Container>
    </Section>
  )
}


