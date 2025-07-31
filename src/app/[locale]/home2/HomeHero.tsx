import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/components/AnimatedElement";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";

export default function HomeHero() {
  const t = useTranslations("HomePage");
  const { parentRef, getDelayClass } = useStaggeredAnimation({ baseDelay: 400 });
  return (
    <Section
        id="hero"
        fullWidth={true}
        noPadding={true}
        fullHeight={false}
        className="relative w-screen h-screen overflow-hidden"
      >
        {/* Background Image/Video Placeholder */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/home2.png" // Reverted to original image
            alt="Sustainable construction" // Generic alt text, as HomeSection.backgroundAlt doesn't exist
            layout="fill"
            objectFit="cover"
            // className="brightness-50" // Reverted to original brightness
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
        </div>

        <Container
          size="xlarge"
          className="relative z-10 flex flex-col items-center justify-end h-full pb-10 md:pb-16"
        >
          <div ref={parentRef} className="w-full flex flex-col items-center">
            <AnimatedElement animation="slide-up" className={`text-center ${getDelayClass(0)}`}>
              <h1 className="md:line-clamp-2 text-center font-bold text-white text-4xl md:text-6xl lg:text-6xl leading-tight mx-auto">
                {t("HeroSection.title")}
              </h1>
            </AnimatedElement>
            <AnimatedElement
              animation="slide-up"
              className={`flex flex-col sm:flex-row justify-center gap-4 ${getDelayClass(1)}`}
            >
              <p className="text-lg md:text-2xl text-white/90 mt-4">
                {t("HeroSection.subtitle")}
              </p>
            </AnimatedElement>
          </div>
        </Container>
      </Section>
  );
} 