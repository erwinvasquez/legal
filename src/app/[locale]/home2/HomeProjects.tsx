"use client";

import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

// This component will be the individual panel in the horizontal accordion
const ProjectAccordionItem = ({
  name,
  location,
  status,
  ctaText,
  isActive,
  onHover,
}: {
  name: string;
  location: string;
  status: string;
  ctaText: string;
  isActive: boolean;
  onHover: () => void;
}) => {
  return (
    <div
      className={cn(
        "relative h-full overflow-hidden cursor-pointer",
        "transition-all duration-700 ease-in-out",
        isActive ? "flex-[3]" : "flex-[0.25] min-w-[40px]", // Flex grow for active, fixed min-width for inactive
        isActive ? "bg-black/0 " : "bg-black/40 backdrop-blur-sm",
        isActive
          ? "flex flex-col justify-end p-6 md:p-8"
          : "flex flex-col justify-center p-6 md:p-8", // Content alignment
        "text-white", // Text color
        "rounded-lg shadow-lg" // Subtle rounded corners and shadow
      )}
      onMouseEnter={onHover}
    >
      {/* Project Name - rotated when inactive */}
      <h3
        className={cn(
          "font-bold font-heading drop-shadow-lg",
          isActive
            ? "text-4xl md:text-5xl mb-4"
            : "text-2xl md:text-3xl md:rotate-90 md:origin-bottom-left whitespace-nowrap text-center",
          "transition-all duration-500 ease-in-out"
        )}
      >
        {name}
      </h3>

      {/* Details and Button - visible only when active */}
      <div
        className={cn(
          "overflow-hidden",
          isActive
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 translate-y-4",
          "transition-all duration-500 ease-in-out delay-200"
        )}
      >
        <p className="text-lg md:text-xl font-body text-white/90 mb-2">
          {location}
        </p>
        <p className="text-md md:text-lg font-body text-white/80 mb-6">
          {status}
        </p>
        <Button
          variant="secondary"
          className="bg-white text-primary hover:bg-gray-100"
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
};

export default function HomeProjects() {
  const t = useTranslations("HomePage");
  const projects = [
    {
      imageSrc: "/images/proyectos/BigHouse2.jpg", // Example image for project 1
      name: t("FeaturedProjectsSection.project1.name"),
      location: t("FeaturedProjectsSection.project1.location"),
      status: t("FeaturedProjectsSection.project1.status"),
    },
    {
      imageSrc: "/images/proyectos/Guillen2.jpg", // Example image for project 2
      name: t("FeaturedProjectsSection.project2.name"),
      location: t("FeaturedProjectsSection.project2.location"),
      status: t("FeaturedProjectsSection.project2.status"),
    },
    {
      imageSrc: "/images/proyectos/BigHouse2.jpg", // Example image for project 3
      name: t("FeaturedProjectsSection.project3.name"),
      location: t("FeaturedProjectsSection.project3.location"),
      status: t("FeaturedProjectsSection.project3.status"),
    },
    {
      imageSrc: "/images/proyectos/Guillen2.jpg", // Example image for project 4
      name: t("FeaturedProjectsSection.project4.name"),
      location: t("FeaturedProjectsSection.project4.location"),
      status: t("FeaturedProjectsSection.project4.status"),
    },
  ];

  // Limit to 3 projects for the accordion display
  const featuredProjects = projects.slice(0, 3);

  // State to manage which project is currently active/expanded
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(1); // índice 1 = el segundo (posición central si hay 3)// Start with the first project active
  const currentBackgroundImage =
    activeProjectIndex !== null
      ? featuredProjects[activeProjectIndex].imageSrc
      : featuredProjects[0].imageSrc;

  return (
    <Section
      id="projects"
      
      fullWidth={true}
      className="relative h-[700px] bg-background py-0 md:py-0 overflow-hidden" // Ensure overflow hidden for image
    >
      {/* Dynamic Background Image for the entire section */}
      <div className="absolute inset-0 w-full h-full">
        {featuredProjects.map((project, index) => (
          <div
            key={`bg-${index}`}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              activeProjectIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={project.imageSrc}
              alt={project.name}
              fill
              className="object-cover"
              priority={activeProjectIndex === index}
            />
            {/* Optional: overlay for readability */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ))}
        {/* Overlay oscuro para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <Container
        size="full"
        className="relative z-10 h-full flex flex-col justify-en pt-20 md:pt-0"
      >
        {/* Título en posición absoluta arriba */}
        <h2 className="hidden md:block absolute top-6 left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-bold text-center font-heading text-white drop-shadow-lg z-20 pt-28">
          {t("FeaturedProjectsSection.title")}
        </h2>

        {/* Acordeón ocupa todo el alto del contenedor */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 w-full px-4 sm:px-6 md:px-8">
          {featuredProjects.map((project, index) => (
            <ProjectAccordionItem
              key={index}
              name={project.name}
              location={project.location}
              status={project.status}
              ctaText={t("FeaturedProjectsSection.cta")}
              isActive={activeProjectIndex === index}
              onHover={() => setActiveProjectIndex(index)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
