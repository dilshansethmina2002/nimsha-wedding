import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { useWedding } from "@/lib/wedding-context";
import { Ornament } from "./Decorations";
import { LotusDivider } from "./Ornaments";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import g1 from "@/assets/gallery-1.webp";
import g2 from "@/assets/gallery-2.webp";
import g3 from "@/assets/gallery-3.webp";
import g4 from "@/assets/gallery-4.webp";
import g5 from "@/assets/gallery-5.webp";
import g6 from "@/assets/gallery-6.webp";
// import g7 from "@/assets/gallery-7.webp";

const images = [g1, g2, g3, g4, g5, g6];

export const Gallery = () => {
  const { lang } = useWedding();
  const isEn = lang === "en";

  return (
    <section id="gallery" className="relative py-16 lg:py-24 bg-gradient-soft overflow-hidden font-sans">
      
      {/* Background Water Ripples for Theme Continuity */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10 z-0">
        <div className="absolute top-[-5%] right-[-10%] w-[45rem] h-[45rem] border-[1px] border-primary/20 rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] border-[1px] border-primary/30 rounded-full" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`uppercase text-primary-deep mb-3 ${isEn ? "font-display text-xs tracking-[0.4em]" : "font-sinhala font-semibold tracking-widest text-sm"}`}
          >
            {isEn ? "Captured Moments" : "සිහිවටන"}
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`text-gold-gradient py-2 px-2 drop-shadow-sm ${isEn ? "font-script text-5xl md:text-7xl" : "font-sinhala font-bold text-4xl md:text-6xl"}`}
          >
            {isEn ? "Our Gallery" : "ගැලරිය"}
          </motion.h2>
          
          <div className="flex justify-center mt-2 mb-2">
            <LotusDivider width="w-20 sm:w-28" />
          </div>
          <Ornament className="text-primary w-40 md:w-48 mx-auto opacity-80" />
        </div>

        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          coverflowEffect={{ rotate: 20, stretch: 0, depth: 150, modifier: 1.5, slideShadows: false }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          className="!pb-16"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i} className="!w-[280px] sm:!w-[360px] md:!w-[420px]">
              <div
                // Traditional Photo Frame Look (White background padding with thin gold border)
                className="block w-full aspect-[3/4] overflow-hidden rounded-2xl bg-white dark:bg-black/50 p-2 md:p-3 border border-rose-200/50 dark:border-primary/20 shadow-elegant group relative"
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl border border-primary/10">
                  <img
                    src={src}
                    alt={`Wedding moment ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                     <span className="font-script text-3xl text-white drop-shadow-md">✦</span>
                  </div> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};