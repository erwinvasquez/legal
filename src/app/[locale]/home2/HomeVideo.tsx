import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PlayCircle, X } from "lucide-react";
import { useState } from "react";

export default function HomeVideo() {
  const t = useTranslations("HomePage");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  return (
    <Section id="video" heightType="content" className="bg-muted py-16 md:py-24">
      <Container size="medium" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 font-heading">{t("VideoSection.title")}</h2>
        <div className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-xl aspect-video">
          <Image
            src="/placeholder.svg?height=720&width=1280"
            alt={t("VideoSection.videoThumbnailAlt")}
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute inset-0 flex items-center justify-center text-white text-opacity-90 hover:text-opacity-100 transition-opacity"
            aria-label={t("VideoSection.playVideo")}
            onClick={() => setIsVideoModalOpen(true)}
          >
            <PlayCircle className="h-20 w-20 fill-white stroke-none" />
          </Button>
        </div>
        <Button size="lg" className="mt-12 bg-primary text-primary-foreground hover:bg-primary/90">
          {t("VideoSection.cta")}
        </Button>
      </Container>
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300"
              aria-label="Close video"
            >
              <X className="h-8 w-8" />
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Emedue Explanatory Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </Section>
  );
} 