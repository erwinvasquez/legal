"use client"

import { useTranslations } from "next-intl"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { AnimatedElement } from "@/components/AnimatedElement"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Image from "next/image"

export default function FeaturesCaseManagement() {
  const t = useTranslations("features")
  const benefits = t.raw("caseManagement.benefits") as string[]

  return (
    <Section heightType="content" id="features-case-management" className="py-16 md:py-24 lg:py-32 text-foreground">
      <Container size="xlarge" className="grid lg:grid-cols-2 gap-12 items-center">
        <AnimatedElement animation="slide-up" delay={0.1}>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{t("caseManagement.title")}</h2>
            <p className="text-lg text-muted-foreground text-pretty">{t("caseManagement.description")}</p>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <AnimatedElement key={index} animation="slide-up" delay={0.3 + index * 0.1}>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-base text-muted-foreground text-balance">{benefit}</span>
                  </li>
                </AnimatedElement>
              ))}
            </ul>
          </div>
        </AnimatedElement>
        <AnimatedElement animation="slide-up" delay={0.2}>
          <Card className="bg-background p-4 sm:p-6 shadow-lg border border-border">
            <CardContent className="p-0">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center text-muted-foreground">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Case Management Dashboard"
                  alt="Case Management Dashboard"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>
      </Container>
    </Section>
  )
}


