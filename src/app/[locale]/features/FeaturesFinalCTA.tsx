"use client"

import { useTranslations } from "next-intl"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { AnimatedElement } from "@/components/AnimatedElement"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function FeaturesCTA() {
  const t = useTranslations("features")

  return (
    <Section
      heightType="content" 
      fullWidth={true} 
      id="features-cta"
      className="relative w-secreen py-16 md:py-24 lg:py-32 text-primary-foreground text-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/placeholder.svg?height=800&width=1200&text=Abstract Background Pattern"
          alt="Abstract Background Pattern"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      </div>
      <Container  size="xlarge" className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="fade-in" delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-4">
            {t("finalCTA.title")}
          </h2>
        </AnimatedElement>
        <AnimatedElement animation="fade-in" delay={0.2}>
          <p className="text-lg md:text-xl text-pretty mb-8">{t("finalCTA.text")}</p>
        </AnimatedElement>
        <AnimatedElement animation="fade-in" delay={0.3}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="min-h-[44px]">
              <Link href="#">{t("finalCTA.buttons.try")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-[44px] border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Link href="#">{t("finalCTA.buttons.demo")}</Link>
            </Button>
          </div>
        </AnimatedElement>
      </Container>
    </Section>
  )
}
