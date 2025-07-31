"use client"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { AnimatedElement } from "@/components/AnimatedElement"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Phone } from "lucide-react"
import ContactFormEmedue from "@/components/contact/ContactFormEmedue"
import { useTranslations } from "next-intl"

export default function ContactPage() {
  const t = useTranslations("ContactSection")
  return (
    <Section id="contacto" heightType="content" fullWidth={true} className="bg-background">
      <Container size="large" className="py-16 md:py-24">
        {/* Header */}
        <AnimatedElement animation="slide-up" className="text-center mb-12">
          <div className="flex items-center justify-center mb-2">
            <MessageCircle className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t('header')}</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </AnimatedElement>
        {/* Formulario */}
        <AnimatedElement animation="slide-up">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{t('form.title')}</CardTitle>
              <p className="text-muted-foreground">
                {t('form.submit')}
              </p>
            </CardHeader>
            <CardContent>
              <ContactFormEmedue />
            </CardContent>
          </Card>
        </AnimatedElement>
      </Container>
    </Section>
  )
}
