"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  return (

    <section className="bg-indigo-100 py-16 md:py-20 lg:py-28 w-full flex justify-center">
      

      <div className="w-11/12 md:w-10/12 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        <div className="order-2 lg:order-1 text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight tracking-tight">
            Discover & Read
            <br />
            Original Ebooks
          </h1>
          <span className="text-indigo-600 font-semibold uppercase">
            Digital Ebook Sharing Platform
             </span>

          <p className="mt-6 text-gray-700 text-base md:text-lg max-w-xl leading-relaxed">
            Explore thousands of original ebooks from talented writers around the world.
          </p>

            <Link 
            href="/browse"
            className="inline-block mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold transition duration-300 shadow-md shadow-indigo-600/10 text-center text-sm md:text-base cursor-pointer" style={{ padding: "4px"  }}
          >
            Browse Ebooks
          </Link>
        </div>

        
 <motion.div
  className="order-2 lg:order-1 text-left"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>

  <Swiper
    modules={[Autoplay, Pagination]}
    autoplay={{ delay: 3000 }}
    loop={true}
    pagination={{ clickable: true }}
  >

    <SwiperSlide>
      <img
  src="https://i.postimg.cc/1znS3RDG/book-2.jpg"
  alt="Featured Ebook 1"
  className="w-full rounded-3xl"
/>
    </SwiperSlide>

    <SwiperSlide>
 <img
  src="https://i.postimg.cc/gj2b0m6v/book-6.jpg"
  alt="Featured Ebook 3"
  className="w-full rounded-3xl"
/>
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="https://i.postimg.cc/gj2b0m6v/book-6.jpg"
        className="w-full rounded-3xl"
      />
    </SwiperSlide>

  </Swiper>

</motion.div>

      </div>
    </section>
  );
}
