"use client"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { AnimatedElement } from "@/components/AnimatedElement"
import { useTranslations } from "next-intl"
import { Upload, MessageCircle, FileOutput } from "lucide-react"

export default function HomeSteps() {
  const t = useTranslations("Home")

  const steps = [
    {
      number: "1",
      icon: Upload,
      title: t("steps.step1.title"),
      description: t("steps.step1.description"),
      detail: t("steps.step1.detail"),
      delay: 200,
    },
    {
      number: "2",
      icon: MessageCircle,
      title: t("steps.step2.title"),
      description: t("steps.step2.description"),
      detail: t("steps.step2.detail"),
      delay: 400,
    },
    {
      number: "3",
      icon: FileOutput,
      title: t("steps.step3.title"),
      description: t("steps.step3.description"),
      detail: t("steps.step3.detail"),
      delay: 600,
    },
  ]

  return (
    <Section id="steps" className="bg-background py-12 sm:py-16">
      <Container size="xlarge">
        <div className="text-center mb-12 sm:mb-16">
          <AnimatedElement animation="fade-in" delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              {t("steps.title")}
            </h2>
          </AnimatedElement>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1 space-y-6 sm:space-y-8">
            {steps.map((step, index) => (
              <AnimatedElement key={index} animation="slide-up" delay={200}>
                <Card className="p-6 sm:p-8 relative overflow-hidden bg-background border-border/50 hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-heading text-lg sm:text-xl font-bold text-primary">{step.number}</span>
                  </div>

                  <div className="flex items-start space-x-4 sm:space-x-6 pr-12 sm:pr-16">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3">
                        {step.title}
                      </h3>
                      <p className="font-body text-base sm:text-lg text-primary font-medium mb-3 sm:mb-4">
                        {step.description}
                      </p>
                      <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedElement>
            ))}
          </div>

          <div className="flex-1 lg:max-w-md">
            <AnimatedElement animation="fade-in" delay={800}>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=400&width=300"
                  alt={t("steps.mockupAlt")}
                  className="w-full h-auto rounded-lg shadow-lg border border-border/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </Container>
    </Section>
  )
}

