import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { wedding } from "@/lib/wedding";
import { useWedding } from "@/lib/wedding-context";
import { Ornament, Sparkles } from "./Decorations";
import swanImg from "@/assets/swam.webp";
import { LotusDivider } from "./Ornaments";

export const InvitationCard = () => {
  const { lang } = useWedding();
  const isEn = lang === "en";

  // State for Name and Title
  const [guestName, setGuestName] = useState("");
  // Default title eka widihata meka thiyanawa, URL eken dunnoth meka wenas wenawa
  const [guestTitle, setGuestTitle] = useState("Mr. & Mrs. / Mrs. / Mr. / Miss. / Family");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    
    // Name eka gannawa
    const name = searchParams.get("name");
    if (name) {
      setGuestName(name);
    }

    // Title eka gannawa
    const title = searchParams.get("title");
    if (title) {
      setGuestTitle(title);
    }
  }, []);

  return (
    <section className="relative lg:py-24 bg-gradient-soft overflow-hidden font-sans">
      <div className="container max-w-3xl relative px-4">
        
        {/* Adjusted Background Blurs for Lotus Theme (Softer Rose/Gold) */}
        <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-rose-200/30 via-primary/5 to-amber-200/30 rounded-[2.5rem] blur-2xl opacity-70 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          // Updated Card Styles: Added border-rose-200/50 and shadow-elegant for luxury traditional feel
          className="relative glass-card bg-white/80 dark:bg-card/95 backdrop-blur-xl rounded-[2rem] p-8 md:p-16 text-center overflow-hidden border border-rose-200/50 dark:border-amber-900/30 shadow-elegant"
        >
          <Sparkles count={10} />
          
          {/* Subtle Lotus corners (Replacing gallery image overlays for a cleaner look) */}
          <LotusCorner className="absolute top-0 left-0 w-32 md:w-48 text-rose-300/30 dark:text-rose-900/20" />
          <LotusCorner className="absolute top-0 right-0 w-32 md:w-48 text-rose-300/30 dark:text-rose-900/20 scale-x-[-1]" />
          <LotusCorner className="absolute bottom-0 left-0 w-32 md:w-48 text-rose-300/30 dark:text-rose-900/20 scale-y-[-1]" />
          <LotusCorner className="absolute bottom-0 right-0 w-32 md:w-48 text-rose-300/30 dark:text-rose-900/20 scale-x-[-1] scale-y-[-1]" />

          <h3 className={`py-2 font-script text-3xl md:text-5xl text-gold-gradient mb-2 relative z-10 drop-shadow-sm ${!isEn ? "font-sinhala font-semibold" : ""}`}>
            {isEn ? wedding.invitationHeader.en : wedding.invitationHeader.si}
          </h3>
               <LotusDivider className="mt-4" width="w-20 sm:w-28" />
          {/* Dynamic Guest Name & Title Section */}
          {guestName && (
            <div className="relative z-10 my-8 flex flex-col items-center justify-center animate-fade-in bg-rose-50/40 dark:bg-black/20 p-6 rounded-2xl border border-rose-100 dark:border-white/5 max-w-sm mx-auto shadow-sm">
              <p className={`text-foreground/80 text-xs md:text-sm uppercase tracking-widest mb-1 ${!isEn ? "font-sinhala" : "font-display"}`}>
                Request the honour of your presence
              </p>
              
              {/* Dynamic Title Eka Methanata Damma */}
              <p className={`text-foreground/70 text-[10px] md:text-xs uppercase tracking-wider mb-3 ${!isEn ? "font-sinhala" : "font-display"}`}>
                {guestTitle}
              </p>
              
              <h2 className={`text-2xl md:text-3xl font-semibold text-primary-deep border-b-[2px] border-dotted border-primary/40 pb-2 mb-4 px-8 min-w-[200px] inline-block text-center ${!isEn ? "font-sinhala" : "font-serif"}`}>
                {guestName}
              </h2>
              
              <p className={`text-foreground/80 text-xs md:text-sm uppercase tracking-widest mt-1 ${!isEn ? "font-sinhala" : "font-display"}`}>
                To celebrate our marriage of
              </p>
            </div>
          )}

          <Ornament className="text-primary w-32 md:w-40 mx-auto mb-10 relative z-10 opacity-80" />

          <p className={`text-foreground/85 text-sm md:text-base mb-2 leading-relaxed relative z-10 max-w-lg mx-auto ${!isEn ? "font-sinhala" : "font-serif italic"}`}>
            {isEn ? wedding.brideParents.en : wedding.brideParents.si}
          </p>
          <h2 className={`py-2 px-2 text-5xl md:text-7xl text-gold-gradient py-4 leading-[1.2] my-1 relative z-10 drop-shadow-sm ${!isEn ? "font-sinhala font-bold" : "font-couple"}`}>
            {isEn ? wedding.bride.en : wedding.bride.si}
          </h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 flex justify-center my-4"
          >
            <img 
              src={swanImg} 
              alt="Swans" 
              className="w-32 md:w-48 object-contain drop-shadow-md"
            />
          </motion.div>

          <p className={`text-foreground/85 text-sm md:text-base my-4 leading-relaxed relative z-10 max-w-lg mx-auto ${!isEn ? "font-sinhala" : "font-serif italic"}`}>
            {isEn ? wedding.groomParents.en : wedding.groomParents.si}
          </p>
          <h2 className={`py-2 text-5xl md:text-7xl py-4 text-gold-gradient leading-[1.2] my-1 relative z-10 drop-shadow-sm ${!isEn ? "font-sinhala font-bold" : "font-couple"}`}>
            {isEn ? wedding.groom.en : wedding.groom.si}
          </h2>

          <p className={`text-foreground/90 font-medium text-sm md:text-base mt-6 relative z-10 max-w-lg mx-auto ${!isEn ? "font-sinhala" : "font-serif italic"}`}>
            {isEn ? wedding.invitationWording.en : wedding.invitationWording.si}
          </p>

          <Ornament className="text-primary w-40 md:w-48 mx-auto mt-6 mb-6 relative z-10 opacity-80" />

          <div className={`text-lg md:text-2xl text-primary-deep font-bold relative z-10 ${!isEn ? "font-sinhala" : "font-display tracking-[0.2em]"}`}>
            {isEn ? wedding.ceremony.date : wedding.ceremony.dateSi}
          </div>

          {/* Details Grid - Updated with Theme Colors */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8 text-foreground/90 max-w-md mx-auto relative z-10 bg-rose-50/50 dark:bg-black/20 p-6 rounded-[1.5rem] border border-rose-100 dark:border-white/5 shadow-sm">
            <div className={`${!isEn ? "font-sinhala" : "font-serif"}`}>
              <div className={`text-[10px] md:text-xs text-primary uppercase mb-1 ${!isEn ? "font-bold tracking-widest" : "font-display tracking-[0.2em]"}`}>{isEn ? "Venue" : "ස්ථානය"}</div>
              <div className="text-base md:text-lg font-semibold">{isEn ? wedding.ceremony.venue : wedding.ceremony.venueSi}</div>
              <div className="text-xs md:text-sm mt-1 text-foreground/70">{isEn ? wedding.ceremony.address : wedding.ceremony.addressSi}</div>
            </div>
            <div className={`${!isEn ? "font-sinhala" : "font-serif"}`}>
              <div className={`text-[10px] md:text-xs text-primary uppercase mb-1 ${!isEn ? "font-bold tracking-widest" : "font-display tracking-[0.2em]"}`}>{isEn ? "Time" : "වේලාව"}</div>
              <div className="text-base md:text-lg font-semibold">{isEn ? wedding.ceremony.time : wedding.ceremony.timeSi}</div>
              <div className="text-xs md:text-sm mt-1 text-foreground/70">{isEn ? wedding.reception.time : wedding.reception.timeSi}</div>
            </div>
          </div>

          {/* <p className={`mt-8 text-foreground/80 max-w-xl mx-auto relative z-10 ${!isEn ? "font-sinhala" : "font-serif italic"}`}>
            {isEn ? wedding.invitedBy.en : wedding.invitedBy.si}
          </p> */}

          <a
            href={wedding.ceremony.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className={`relative z-10 mt-8 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gold-gradient text-white shadow-md hover:shadow-glow transition-all hover:-translate-y-1 active:scale-95 w-full md:w-auto ${!isEn ? "font-sinhala font-bold text-sm tracking-widest" : "font-display text-[10px] md:text-xs tracking-[0.2em] uppercase"}`}
          >
            <FaMapMarkerAlt className="w-3 h-3" />
            {isEn ? "View Hotel Location" : "හෝටල් ස්ථානය බලන්න"}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Custom Lotus Corner SVG for Traditional Theme Background
const LotusCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} fill="currentColor" aria-hidden>
    <path d="M10 10 C 40 10, 60 30, 60 60 C 60 90, 40 110, 10 110" />
    <path d="M10 10 C 10 40, 30 60, 60 60" />
    <path d="M35 35 C 50 35, 60 45, 60 60" />
  </svg>
);