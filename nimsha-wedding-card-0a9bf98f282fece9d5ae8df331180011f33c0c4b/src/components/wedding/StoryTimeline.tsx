import { motion } from "framer-motion";
import { FaHeart, FaRing, FaGem, FaInfinity } from "react-icons/fa";
import { wedding } from "@/lib/wedding";
import { useWedding } from "@/lib/wedding-context";
import { Ornament } from "./Decorations";

const icons = [FaHeart, FaGem, FaRing, FaInfinity];

export const StoryTimeline = () => {
  const { lang } = useWedding();
  return (
    <section id="story" className="relative py-24 bg-gradient-soft">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <p className="font-display text-xs tracking-[0.4em] uppercase text-primary-deep mb-3">
            {lang === "en" ? "Our Journey" : "අපගේ ගමන"}
          </p>
          <h2 className="font-script text-5xl md:text-7xl text-gold-gradient">
            {lang === "en" ? "Our Love Story" : "අපේ ආදර කතාව"}
          </h2>
          <Ornament className="text-primary w-48 mx-auto mt-4" />
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

          {wedding.story.map((s, i) => {
            const Icon = icons[i % icons.length];
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative mb-12 md:mb-16 grid md:grid-cols-2 gap-6 md:gap-12 ${isLeft ? "" : "md:[&>*:first-child]:order-2"}`}
              >
                <div className={`pl-16 md:pl-0 ${isLeft ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <div className="glass-card rounded-2xl p-6 inline-block text-left">
                    <div className="font-display text-sm tracking-[0.3em] text-primary mb-1">{s.year}</div>
                    <h3 className="font-script text-3xl text-gold-gradient mb-2">
                      {lang === "en" ? s.title.en : s.title.si}
                    </h3>
                    <p className="font-serif text-foreground/80 leading-relaxed">
                      {lang === "en" ? s.text.en : s.text.si}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block" />

                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-6 w-12 h-12 rounded-full bg-gold-gradient grid place-items-center text-primary-foreground shadow-glow">
                  <Icon className="w-5 h-5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
