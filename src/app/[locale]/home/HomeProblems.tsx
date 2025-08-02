"use client"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { AnimatedElement } from "@/components/AnimatedElement"
import { useTranslations } from "next-intl"
import { FileX, Clock, AlertTriangle, TrendingDown } from "lucide-react"

export default function HomeProblems() {
  const t = useTranslations("Home")

  const problems = [
    {
      icon: FileX,
      title: t("problems.card1.title"),
      description: t("problems.card1.description"),
      delay: 200,
    },
    {
      icon: Clock,
      title: t("problems.card2.title"),
      description: t("problems.card2.description"),
      delay: 400,
    },
    {
      icon: AlertTriangle,
      title: t("problems.card3.title"),
      description: t("problems.card3.description"),
      delay: 600,
    },
    {
      icon: TrendingDown,
      title: t("problems.card4.title"),
      description: t("problems.card4.description"),
      delay: 800,
    },
  ]

  return (
    <Section id="problems" className="py-12 sm:py-16">
      <Container size="xlarge">
        <div className="text-center mb-12 sm:mb-16">
          <AnimatedElement animation="fade-in" delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              {t("problems.title")}
            </h2>
          </AnimatedElement>
          <AnimatedElement animation="fade-in" delay={0.2}>
            <p className="font-body text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t("problems.subtitle")}
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {problems.map((problem, index) => (
            <AnimatedElement key={index} animation="slide-up" delay={0.3 + index * 0.1}>
              <Card className="p-6 sm:p-8 h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-background border-border/50 min-w-0 overflow-hidden">
                <div className="flex flex-col space-y-4 sm:space-y-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <problem.icon className="w-6 h-6 sm:w-7 sm:h-7 text-destructive" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground mb-3 leading-tight">
                      {problem.title}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </Container>
    </Section>
  )
}

