"use client"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedElement } from "@/components/AnimatedElement"
import { useTranslations } from "next-intl"
import { Check } from "lucide-react"

export default function HomePlans() {
  const t = useTranslations("Home")

  const plans = [
    {
      name: t("plans.planInicio.name"),
      price: t("plans.planInicio.price"),
      features: [
        t("plans.planInicio.feature1"),
        t("plans.planInicio.feature2"),
        t("plans.planInicio.feature3"),
        t("plans.planInicio.feature4"),
        t("plans.planInicio.feature5"),
      ],
      popular: false,
      delay: 200,
    },
    {
      name: t("plans.planEstudio.name"),
      price: t("plans.planEstudio.price"),
      features: [
        t("plans.planEstudio.feature1"),
        t("plans.planEstudio.feature2"),
        t("plans.planEstudio.feature3"),
        t("plans.planEstudio.feature4"),
        t("plans.planEstudio.feature5"),
      ],
      popular: true,
      delay: 400,
    },
    {
      name: t("plans.planLegal.name"),
      price: t("plans.planLegal.price"),
      features: [
        t("plans.planLegal.feature1"),
        t("plans.planLegal.feature2"),
        t("plans.planLegal.feature3"),
        t("plans.planLegal.feature4"),
        t("plans.planLegal.feature5"),
      ],
      popular: false,
      delay: 600,
    },
  ]

  return (
    <Section id="plans" className="bg-background">
      <Container size="xlarge">
        <div className="text-center mb-16">
          <AnimatedElement animation="fade-in" delay={100}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{t("plans.title")}</h2>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <AnimatedElement key={index} animation="slide-up" delay={200}>
              <Card className={`p-8 relative ${plan.popular ? "ring-2 ring-primary shadow-xl scale-105" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    {t("plans.popular")}
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="font-heading text-3xl font-bold text-primary">{plan.price}</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full min-h-[44px]" variant={plan.popular ? "default" : "outline"}>
                  {t("plans.selectPlan")}
                </Button>
              </Card>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement animation="fade-in" delay={800} className="text-center mt-12">
          <Button variant="outline" size="lg" className="min-h-[44px] bg-transparent">
            {t("plans.compareAll")}
          </Button>
        </AnimatedElement>
      </Container>
    </Section>
  )
}
