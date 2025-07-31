"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Globe, Leaf, Quote } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { AnimatedElement } from "@/components/AnimatedElement"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function HomeTechnicalSignature() {
  const t = useTranslations("HomePage.TechnicalSignature")

  return (
    <>
      {/* --- Diseño 1: Minimalista y Elegante (Horizontal Clásico) --- */}
      <Section className="py-20 md:py-28 bg-background">
        <Container className="flex flex-col lg:flex-row items-center justify-center gap-12 md:gap-20">
          <AnimatedElement animation="slide-in-left" delay={200} once className="flex-shrink-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lg border-2 border-primary/30">
              <Image
                src="/placeholder.svg?height=320&width=320"
                alt={t("imageAlt")}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
          </AnimatedElement>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
            <AnimatedElement animation="slide-up" delay={300} once>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{t("architectName")}</h2>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={400} once>
              <p className="text-lg md:text-xl text-muted-foreground mb-4">{t("specialty")}</p>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={500} once>
              <p className="text-base md:text-lg text-gray-700 mb-6">{t("experience")}</p>
            </AnimatedElement>
            <AnimatedElement animation="fade-in" delay={700} once>
              <blockquote className="text-xl md:text-2xl italic text-gray-800 border-l-4 border-primary pl-4 mb-8">
                &ldquo;{t("quote")}&rdquo;
              </blockquote>
            </AnimatedElement>
            <div className="flex gap-4 mb-8">
              <AnimatedElement animation="fade-in" delay={700} once>
                {" "}
                {/* Adjusted from 800 */}
                <Badge variant="outline" className="border-primary text-primary-foreground">
                  <Globe className="mr-2 h-4 w-4" />
                  {t("globalIconDescription")}
                </Badge>
              </AnimatedElement>
              <AnimatedElement animation="fade-in" delay={1000} once>
                {" "}
                {/* Adjusted from 900 */}
                <Badge variant="outline" className="border-green-500 text-green-600">
                  <Leaf className="mr-2 h-4 w-4" />
                  {t("sustainableIconDescription")}
                </Badge>
              </AnimatedElement>
            </div>
            <AnimatedElement animation="slide-up" delay={1000} once>
              <Button asChild size="lg">
                <Link href="/nosotros">{t("ctaButton")} →</Link>
              </Button>
            </AnimatedElement>
          </div>
        </Container>
      </Section>

      {/* Separador visual entre diseños */}
      <div className="h-px bg-border my-16 md:my-24 w-3/4 mx-auto" />

      {/* --- Diseño 2: Moderno y Centrado (Bloque Vertical) --- */}
      <Section className="py-20 md:py-28 bg-secondary/10">
        <Container className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <AnimatedElement animation="fade-in" delay={200} once className="mb-8">
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/placeholder.svg?height=320&width=320"
                alt={t("imageAlt")}
                layout="fill"
                objectFit="cover"
                className="filter grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-50"></div>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={300} once>
            <h2 className="text-5xl md:text-6xl font-extrabold text-primary mb-2 leading-tight">
              {t("architectName")}
            </h2>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={400} once>
            <p className="text-xl md:text-2xl text-foreground mb-4 font-semibold">{t("specialty")}</p>
          </AnimatedElement>
          <AnimatedElement animation="slide-up" delay={500} once>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">{t("experience")}</p>
          </AnimatedElement>

          <AnimatedElement animation="fade-in" delay={700} once>
            <div className="relative bg-card p-6 md:p-8 rounded-xl shadow-inner border border-border mb-8">
              <Quote className="absolute -top-4 -left-4 h-12 w-12 text-primary/20" />
              <Quote className="absolute -bottom-4 -right-4 h-12 w-12 text-primary/20 rotate-180" />
              <p className="text-2xl md:text-3xl italic font-medium text-card-foreground leading-relaxed">
                {t("quote")}
              </p>
            </div>
          </AnimatedElement>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <AnimatedElement animation="fade-in" delay={700} once>
              {" "}
              {/* Adjusted from 800 */}
              <Badge className="px-4 py-2 text-base bg-primary text-primary-foreground shadow-sm">
                <Globe className="mr-2 h-4 w-4" />
                {t("globalIconDescription")}
              </Badge>
            </AnimatedElement>
            <AnimatedElement animation="fade-in" delay={1000} once>
              {" "}
              {/* Adjusted from 900 */}
              <Badge className="px-4 py-2 text-base bg-green-600 text-white shadow-sm">
                <Leaf className="mr-2 h-4 w-4" />
                {t("sustainableIconDescription")}
              </Badge>
            </AnimatedElement>
          </div>

          <AnimatedElement animation="slide-up" delay={1000} once>
            <Button asChild size="lg" variant="secondary">
              <Link href="/nosotros">{t("ctaButton")} →</Link>
            </Button>
          </AnimatedElement>
        </Container>
      </Section>

      {/* Separador visual entre diseños */}
      <div className="h-px bg-border my-16 md:my-24 w-3/4 mx-auto" />

      {/* --- Diseño 3: Elegancia con Superposición (Asimétrico) --- */}
      <Section className="py-20 md:py-28 bg-background">
        <Container className="flex flex-col lg:flex-row items-center justify-center gap-16 md:gap-24">
          {/* Imagen a la izquierda, ligeramente superpuesta y con efecto */}
          <AnimatedElement animation="slide-in-left" delay={200} once className="relative flex-shrink-0 lg:w-1/2">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-accent transform -rotate-3 hover:rotate-0 transition-transform duration-700 ease-in-out">
              <Image
                src="/placeholder.svg?height=384&width=384"
                alt={t("imageAlt")}
                layout="fill"
                objectFit="cover"
                className="brightness-75 hover:brightness-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent"></div>
            </div>
          </AnimatedElement>

          {/* Contenido de texto a la derecha, con la cita destacada */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl lg:w-1/2">
            <AnimatedElement animation="slide-up" delay={300} once>
              <h2 className="text-5xl md:text-6xl font-extrabold text-foreground mb-2 leading-tight">
                {t("architectName")}
              </h2>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={400} once>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">{t("specialty")}</p>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={500} once>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">{t("experience")}</p>
            </AnimatedElement>

            <AnimatedElement animation="fade-in" delay={700} once>
              <blockquote className="text-2xl md:text-3xl italic font-serif text-primary mb-8 relative pl-6">
                <span className="absolute top-0 left-0 text-5xl text-primary/20 font-bold leading-none">&ldquo;</span>
                {t("quote")}
              </blockquote>
            </AnimatedElement>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <AnimatedElement animation="fade-in" delay={700} once>
                {" "}
                {/* Adjusted from 800 */}
                <Badge className="px-4 py-2 text-base bg-accent text-accent-foreground shadow-sm">
                  <Globe className="mr-2 h-4 w-4" />
                  {t("globalIconDescription")}
                </Badge>
              </AnimatedElement>
              <AnimatedElement animation="fade-in" delay={1000} once>
                {" "}
                {/* Adjusted from 900 */}
                <Badge className="px-4 py-2 text-base bg-green-500 text-white shadow-sm">
                  <Leaf className="mr-2 h-4 w-4" />
                  {t("sustainableIconDescription")}
                </Badge>
              </AnimatedElement>
            </div>

            <AnimatedElement animation="slide-up" delay={1000} once>
              <Button asChild size="lg" variant="outline">
                <Link href="/nosotros">{t("ctaButton")} →</Link>
              </Button>
            </AnimatedElement>
          </div>
        </Container>
      </Section>

      {/* Separador visual entre diseños */}
      <div className="h-px bg-border my-16 md:my-24 w-3/4 mx-auto" />

      {/* --- Diseño 4: Estilo Tarjeta / Bloque (Grid-like) --- */}
      <Section className="py-20 md:py-28 bg-muted/20">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Bloque de imagen */}
          <AnimatedElement animation="fade-in" delay={200} once className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-80 md:h-96 rounded-xl overflow-hidden shadow-xl border border-border">
              <Image
                src="/placeholder.svg?height=384&width=384"
                alt={t("imageAlt")}
                layout="fill"
                objectFit="cover"
                className="object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent"></div>
            </div>
          </AnimatedElement>

          {/* Bloque de texto */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <AnimatedElement animation="slide-up" delay={300} once>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{t("architectName")}</h2>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={400} once>
              <p className="text-lg md:text-xl text-muted-foreground mb-4">{t("specialty")}</p>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={500} once>
              <p className="text-base md:text-lg text-gray-700 mb-6">{t("experience")}</p>
            </AnimatedElement>

            <AnimatedElement animation="fade-in" delay={700} once>
              <blockquote className="text-xl md:text-2xl italic text-gray-800 mb-8 relative">
                <span className="absolute -top-4 -left-4 text-5xl text-primary/20 font-bold">&ldquo;</span>
                {t("quote")}
              </blockquote>
            </AnimatedElement>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <AnimatedElement animation="fade-in" delay={700} once>
                {" "}
                {/* Adjusted from 800 */}
                <Badge variant="default" className="bg-primary/80 text-primary-foreground">
                  <Globe className="mr-1 h-4 w-4" />
                  {t("globalIconDescription")}
                </Badge>
              </AnimatedElement>
              <AnimatedElement animation="fade-in" delay={1000} once>
                {" "}
                {/* Adjusted from 900 */}
                <Badge variant="default" className="bg-green-600/80 text-white">
                  <Leaf className="mr-1 h-4 w-4" />
                  {t("sustainableIconDescription")}
                </Badge>
              </AnimatedElement>
            </div>

            <AnimatedElement animation="slide-up" delay={1000} once>
              <Button asChild size="lg" variant="link" className="text-primary hover:underline">
                <Link href="/nosotros">{t("ctaButton")} →</Link>
              </Button>
            </AnimatedElement>
          </div>
        </Container>
      </Section>

      {/* Separador visual entre diseños */}
      <div className="h-px bg-border my-16 md:my-24 w-3/4 mx-auto" />

      {/* --- Diseño 5: Impacto Visual (Fondo de Imagen Parcial) --- */}
      <Section className="py-20 md:py-28 relative overflow-hidden">
        {/* Imagen de fondo parcial, solo para desktop */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2 z-0">
          <Image
            src="/placeholder.svg?height=700&width=700"
            alt="Fondo abstracto"
            layout="fill"
            objectFit="cover"
            className="opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background to-background/50"></div>
        </div>

        <Container className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 md:gap-24">
          {/* Contenido de texto a la izquierda, más prominente */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl lg:w-1/2">
            <AnimatedElement animation="slide-up" delay={300} once>
              <h2 className="text-5xl md:text-7xl font-extrabold text-primary mb-4 leading-tight">
                {t("architectName")}
              </h2>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={400} once>
              <p className="text-xl md:text-2xl text-foreground mb-4 font-medium">{t("specialty")}</p>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={500} once>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">{t("experience")}</p>
            </AnimatedElement>

            <AnimatedElement animation="fade-in" delay={700} once>
              <blockquote className="text-2xl md:text-3xl italic font-semibold text-gray-800 mb-10 relative">
                <span className="absolute -top-6 -left-6 text-7xl text-primary/10 font-black leading-none">
                  &ldquo;
                </span>
                {t("quote")}
              </blockquote>
            </AnimatedElement>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              <AnimatedElement animation="fade-in" delay={700} once>
                {" "}
                {/* Adjusted from 800 */}
                <Badge className="px-5 py-2 text-base bg-primary/20 text-primary-foreground border border-primary">
                  <Globe className="mr-2 h-5 w-5" />
                  {t("globalIconDescription")}
                </Badge>
              </AnimatedElement>
              <AnimatedElement animation="fade-in" delay={1000} once>
                {" "}
                {/* Adjusted from 900 */}
                <Badge className="px-5 py-2 text-base bg-green-600/20 text-green-400 border border-green-600">
                  <Leaf className="mr-2 h-5 w-5" />
                  {t("sustainableIconDescription")}
                </Badge>
              </AnimatedElement>
            </div>

            <AnimatedElement animation="slide-up" delay={1000} once>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                <Link href="/nosotros">{t("ctaButton")} →</Link>
              </Button>
            </AnimatedElement>
          </div>

          {/* Imagen de la arquitecta a la derecha, destacada */}
          <AnimatedElement
            animation="slide-in-left"
            delay={200}
            once
            className="flex-shrink-0 lg:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-primary">
              <Image
                src="/placeholder.svg?height=384&width=384"
                alt={t("imageAlt")}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
          </AnimatedElement>
        </Container>
      </Section>
    </>
  )
}





