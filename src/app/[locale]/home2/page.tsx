"use client";

import type React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HomeHero from "./HomeHero";
import HomeBenefits from "./HomeBenefits";

import HomeProjects from "./HomeProjects";
//import HomeTestimonials from "./HomeTestimonials";

import HomeServices from "./HomeServices";
import { HomeWhyChooseUs } from "./HomeWhyChooseUs";



export default function HomePage() {
  
  return (
    <main>
      <HomeHero />
      <HomeBenefits />
      <HomeServices/>
      <HomeProjects />
      <HomeWhyChooseUs/>
    </main>
  );
}
