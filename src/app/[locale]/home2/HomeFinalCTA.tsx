import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HomeFinalCTA() {
  const t = useTranslations("HomePage");
  return (
    <Section
      id="final-cta"
      heightType="content"
      className="relative py-20 md:py-32 text-white overflow-hidden"
      style={{ backgroundColor: "hsl(var(--secondary))" }}
    >
      {/* Optional: Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=720&width=1280"
          alt={t("FinalCTASection.backgroundAlt")}
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <Container size="medium" className="relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight font-heading">
          {t("FinalCTASection.title")}
        </h2>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          {t("FinalCTASection.cta")}
        </Button>
      </Container>
    </Section>
  );
} 