"use client"

import { useTranslations } from "next-intl"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Clock, Shield, Handshake, Users } from "lucide-react"
import { AnimatedElement } from "@/components/AnimatedElement"

const features = [
  {
    icon: Clock,
    key: "experience",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    key: "quality",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Handshake,
    key: "partnerships",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    key: "team",
    gradient: "from-orange-500 to-red-500",
  },
]

export function HomeWhyChooseUs() {
  const t = useTranslations("HomePage.whyChooseUs")

  return (
    <Section id="why-choose-us" heightType="content" className="py-16 md:py-24">
      <Container size="xlarge">
        <div className="text-center mb-16">
          <AnimatedElement animation="fade-in" delay={200}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading text-foreground">{t("title")}</h2>
          </AnimatedElement>

          <AnimatedElement animation="fade-in" delay={200}>
            <p className="text-xl text-foreground max-w-3xl mx-auto">{t("description")}</p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <AnimatedElement key={feature.key} animation="fade-in" delay={200}>
                <div className="group relative">
                  {/* Background gradient blur effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  />

                  {/* Main card */}
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-gray-200 dark:group-hover:border-gray-600">
                    {/* Icon container */}
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Decorative elements */}
                      <div
                        className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${feature.gradient} rounded-full opacity-60 group-hover:scale-125 transition-transform duration-300`}
                      />
                      <div
                        className={`absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r ${feature.gradient} rounded-full opacity-40 group-hover:scale-125 transition-transform duration-300 delay-75`}
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                        {t(`${feature.key}.title`)}
                      </h3>

                      <p className="text-foreground leading-relaxed">
                        {t(`${feature.key}.description`)}
                      </p>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full animate-pulse`} />
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            )
          })}
        </div>

        {/* Bottom CTA section */}
        <AnimatedElement animation="fade-in" delay={200}>
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("cta.title")}</h3>
              <p className="ttext-foreground mb-2 max-w-2xl mx-auto">{t("cta.description")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  {t("cta.primaryButton")}
                </button>
                <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-foreground rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                  {t("cta.secondaryButton")}
                </button>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </Container>
    </Section>
  )
}
