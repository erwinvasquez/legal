"use client"

import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import React from "react"

interface CarouselProps extends SwiperProps {
  children: React.ReactNode
  className?: string
}

export function Carousel({ children, className, ...props }: CarouselProps) {
  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  )
}
