import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";
import { useWedding } from "@/lib/wedding-context";
import { Ornament } from "./Decorations";
import { LotusDivider } from "./Ornaments";

// කාලය ගණනය කරන ශ්‍රිතය (Calculate time difference)
const calc = (target: Date) => {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export const Countdown = () => {
  const { lang } = useWedding();
  const isEn = lang === "en";
  
  const [t, setT] = useState(() => calc(wedding.date));
  
  useEffect(() => {
    const id = setInterval(() => setT(calc(wedding.date)), 1000);
    return () => clearInterval(id);
  }, []);

  // භාෂාවට අනුව වචන වෙනස් වීම
  const labels = isEn
    ? { d: "Days", h: "Hours", m: "Minutes", s: "Seconds", title: "Counting Down to Forever" }
    : { d: "දින", h: "පැය", m: "මිනිත්තු", s: "තත්පර", title: "සදාකාලික ආදරයක ඇරඹුමට..." };

  const items = [
    { v: t.days, l: labels.d },
    { v: t.hours, l: labels.h },
    { v: t.minutes, l: labels.m },
    { v: t.seconds, l: labels.s },
  ];

  // භාෂාවට අනුව දිනය ලබාගැනීම
  const dateStr = isEn ? wedding.ceremony.date : wedding.ceremony.dateSi;

  return (
    <section className="relative py-20 lg:py-24 bg-gradient-soft overflow-hidden font-sans">
      
      {/* Background Water Ripples for Theme Continuity */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] border-[1px] border-primary/20 rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] border-[1px] border-primary/30 rounded-full" />
      </div>

      <div className="container text-center relative z-10 px-4">
        <LotusDivider  width="w-20 sm:w-28" />
        <Ornament className="text-primary w-32 md:w-40 mx-auto mb-6 opacity-80" />
        
        <h2 className={`text-gold-gradient mb-2 py-4 px-2 drop-shadow-sm ${isEn ? "font-script text-4xl md:text-6xl" : "font-sinhala font-bold text-3xl md:text-5xl"}`}>
          {labels.title}
        </h2>
        
        <p className={`text-muted-foreground mb-16 uppercase ${isEn ? "font-display tracking-[0.2em] text-xs md:text-sm" : "font-sinhala font-semibold tracking-widest text-sm md:text-base"}`}>
          {dateStr}
        </p>

        {/* Countdown Cards Grid (Mobile responsive) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {items.map((it, i) => (
            <motion.div
              key={it.l}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative glass-card bg-rose-50/50 dark:bg-black/20 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center border border-rose-200/50 dark:border-white/5 shadow-sm overflow-hidden group hover:border-primary/40 transition-colors"
            >
              {/* Card Hover Effect */}
              <div className="absolute inset-0 rounded-[2rem] bg-gold-gradient opacity-0 group-hover:opacity-10 transition-opacity" />
              
              {/* Lotus Corners for each card */}
              <LotusCorner className="absolute top-2 left-2 w-8 text-primary/20" />
              <LotusCorner className="absolute bottom-2 right-2 w-8 text-primary/20 scale-x-[-1] scale-y-[-1]" />

              {/* Number */}
              <motion.div
                key={it.v}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-display text-4xl md:text-6xl text-gold-gradient font-semibold tabular-nums drop-shadow-sm"
              >
                {String(it.v).padStart(2, "0")}
              </motion.div>
              
              {/* Label */}
              <div className={`mt-2 text-primary/80 uppercase ${isEn ? "font-display text-[10px] md:text-xs tracking-[0.3em]" : "font-sinhala font-bold text-xs md:text-sm tracking-widest"}`}>
                {it.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Small Lotus Corner SVG for the Countdown Cards
const LotusCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden>
    <path d="M5 5 Q 30 15 45 45 Q 60 75 95 95" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
    <path d="M5 5 Q 10 30 45 45" />
    <path d="M25 25 Q 35 30 45 45" />
  </svg>
);