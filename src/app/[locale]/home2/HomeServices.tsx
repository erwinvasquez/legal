"use client";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Wrench, Building, ShieldCheck, Users } from "lucide-react";
import { AnimatedElement } from "@/components/AnimatedElement";
import Image from "next/image";
import { Carousel } from "@/components/swiper/Carousel";

export default function HomeServices() {
  const t = useTranslations("HomePage");

  const services = [
    {
      icon: Wrench,
      titleKey: "services.designTitle",
      descriptionKey: "services.designDescription",
      image: "/images/services/Diseno2.png",
    },
    {
      icon: Building,
      titleKey: "services.constructionTitle",
      descriptionKey: "services.constructionDescription",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: ShieldCheck,
      titleKey: "services.supervisionTitle",
      descriptionKey: "services.supervisionDescription",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      icon: Users,
      titleKey: "services.trainingTitle",
      descriptionKey: "services.trainingDescription",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <Section
      id="services"
      fullWidth
      heightType="custom"
      className="relative h-[80vh] bg-background py-0 overflow-hidden"
    >
      {/* Fondo */}
      <div className="absolute inset-0 h-[60%]">
        <Image
          src="/images/services/BgServices.jpg"
          alt="Sustainable construction"
          layout="fill"
          objectFit="cover"
          style={{ objectPosition: "center 60%" }}
        />
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      <Container
        size="xlarge"
        className="relative z-10 text-center translate-y-[70px] px-4 sm:px-6 lg:px-8"
      >
        <AnimatedElement animation="fade-in" delay={200}>
          <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
            {t("services.sectionTitle")}
          </h2>
        </AnimatedElement>

        {/* Carrusel en móviles */}
        <div className="md:hidden max-w-[92vw] w-full max-w-xs mx-auto overflow-visible">
          <Carousel
            centeredSlides
            loop
            className="w-full"
            spaceBetween={16}
            slidesPerView={1}
            navigation={false}
          >
            {services.map((service, index) => (
              <div key={service.titleKey} className="w-full mx-auto flex justify-center pb-20">
                <AnimatedElement animation="fade-in" index={index} staggerDelay={100}>
                  <Card className="relative flex flex-col items-center p-0 h-full text-center shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-visible bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pb-12">
                    <img
                      src={service.image}
                      alt={t(service.titleKey)}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 pt-12 pb-16 flex flex-col items-center">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                        {t(service.titleKey)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t(service.descriptionKey)}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </Card>
                </AnimatedElement>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Grid para pantallas md+ */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <AnimatedElement
              key={service.titleKey}
              animation="fade-in"
              index={index}
              staggerDelay={100}
            >
              <Card className="relative flex flex-col items-center p-0 h-full text-center shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-visible bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pb-12">
                <img
                  src={service.image}
                  alt={t(service.titleKey)}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 pt-12 flex flex-col items-center">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(service.descriptionKey)}
                  </p>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </Container>
    </Section>
  );
}

