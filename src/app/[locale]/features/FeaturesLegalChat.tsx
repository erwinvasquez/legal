"use client"

import { useTranslations } from "next-intl"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { AnimatedElement } from "@/components/AnimatedElement"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import Image from "next/image"

export default function FeaturesLegalChat() {
  const t = useTranslations("features")
  const capabilities = t.raw("legalChat.capabilities") as string[]

  return (
    <Section heightType="content" id="features-ai-legal-chat" className="py-16 md:py-24 lg:py-32 text-foreground">
      <Container  size="xlarge" className="grid lg:grid-cols-2 gap-12 items-center">
        <AnimatedElement animation="slide-up" delay={0.1}>
          <Card className="bg-background p-4 sm:p-6 shadow-lg border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold text-balance">{t("legalChat.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center text-muted-foreground">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=AI Legal Chat Interface"
                  alt="AI Legal Chat Interface"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>
        <AnimatedElement animation="slide-up" delay={0.2}>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{t("legalChat.title")}</h2>
            <p className="text-lg text-muted-foreground text-pretty">{t("legalChat.description")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {capabilities.map((capability, index) => (
                <AnimatedElement key={index} animation="slide-up" delay={0.3 + index * 0.1}>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-base text-muted-foreground text-balance">{capability}</span>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </AnimatedElement>
      </Container>
    </Section>
  )
}
