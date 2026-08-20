import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaPhone } from "react-icons/fa";
import { wedding } from "@/lib/wedding";
import { useWedding } from "@/lib/wedding-context";
import { mapsUrl } from "@/lib/calendar";
import heroFloral from "@/assets/hero-floral.webp";
import { LotusDivider } from "./Ornaments"; 

export const EventDetails = () => {
  const { lang } = useWedding();
  const isEn = lang === "en";
  
  const events = [wedding.ceremony];

  return (
    <section id="events" className="relative lg:py-24 py-16 bg-[#faf8f5] dark:bg-stone-950 overflow-hidden min-h-screen flex items-center justify-center transition-colors duration-500">
      
      {/* Background texture */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroFloral}
          alt=""
          className="w-full h-full object-cover opacity-10 dark:opacity-5 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-500"
        />
      </div>

      {/* Soft Ambient Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#cda052]/10 dark:bg-[#cda052]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-500 z-0"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-rose-300/10 dark:bg-rose-900/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none transition-colors duration-500 z-0"></div>

      <div className="container max-w-5xl relative z-10 flex justify-center px-4">
        {events.map((ev, i) => {
          const title = isEn ? ev.title.en : ev.title.si;
          const date = isEn ? ev.date : ev.dateSi;
          const time = isEn ? ev.time : ev.timeSi;
          const venue = isEn ? ev.venue : ev.venueSi;
          const address = isEn ? ev.address : ev.addressSi;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-lg"
            >
              {/* --- COMPACT MATTE CARD (Now slightly transparent) --- */}
              <div className="bg-[#fdfbf7]/90 dark:bg-[#1c1917]/90 backdrop-blur-md rounded-t-[8rem] md:rounded-t-[9rem] rounded-b-[2rem] p-6 pt-10 md:p-10 md:pt-12 text-center shadow-[0_20px_60px_-15px_rgba(205,160,82,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col items-center transition-colors duration-500">
                
                {/* Center Watermark */}
                <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] opacity-[0.03] dark:opacity-[0.03] pointer-events-none z-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#cda052] w-full h-full scale-150">
                    <path d="M50 0 C55 40, 90 45, 100 50 C90 55, 55 60, 50 100 C45 60, 10 55, 0 50 C10 45, 45 40, 50 0 Z" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  </svg>
                </div>

                {/* Top Arch Corner Vines */}
                <SwirlingVine className="absolute -top-2 -left-2 w-40 h-40 text-[#cda052] dark:text-[#d4af37] opacity-60 dark:opacity-40 pointer-events-none z-0" />
                <SwirlingVine className="absolute -top-2 -right-2 w-40 h-40 text-[#cda052] dark:text-[#d4af37] opacity-60 dark:opacity-40 pointer-events-none scale-x-[-1] z-0" />

                {/* Top Ornament */}
                <LotusDivider width="w-20 mb-6 mt-4 opacity-80 text-[#cda052] relative z-10" />

                <h3 className={`text-gold-gradient mb-6 drop-shadow-sm relative z-10 ${isEn ? "font-script text-4xl md:text-5xl" : "font-sinhala font-bold text-2xl md:text-3xl leading-relaxed"}`}>
                  {title}
                </h3>

                {/* Details Stack */}
                <div className="flex flex-col gap-6 w-full max-w-[280px] mx-auto mt-0 mb-8 relative z-10">
                  <DetailBlock icon={<FaClock />} label={date} value={time} isEn={isEn} />
                  
                  {/* Small gold separator */}
                  <div className="w-10 h-px bg-[#cda052]/40 dark:bg-[#cda052]/30 mx-auto transition-colors duration-500"></div>
                  
                  <DetailBlock icon={<FaMapMarkerAlt />} label={venue} value={address} isEn={isEn} />
                </div>

                {/* Maps Button */}
                <a
                  href={(ev as any).mapsUrl || mapsUrl(ev.mapsQuery)}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gold-gradient text-white transition-all shadow-md hover:shadow-lg hover:shadow-[#cda052]/20 active:scale-95 w-full max-w-[260px] relative z-20 ${isEn ? "font-serif text-sm tracking-widest uppercase" : "font-sinhala font-bold text-sm tracking-wide"}`}
                >
                  <FaMapMarkerAlt className="w-4 h-4 mb-0.5" />
                  {isEn ? "Open in Maps" : "සිතියම් විවෘත කරන්න"}
                </a>

                {/* Coordinator Contact */}
                <div className="mt-8 w-full flex flex-col items-center relative z-10 transition-colors duration-500">
                   <div className={`text-[#cda052] uppercase mb-3 ${isEn ? "font-display text-[9px] tracking-[0.25em]" : "font-sinhala font-bold text-[10px] tracking-wider"}`}>
                     {isEn ? "Coordinator" : "සම්බන්ධීකාරක"}
                   </div>
                   
                   <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 transition-colors duration-500">
                     <div className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-white dark:bg-stone-900 border border-[#e5d8c5] dark:border-stone-700 shadow-sm transition-colors duration-500">
                       <FaPhone className="text-[#cda052] w-3 h-3" />
                     </div>
                     <div className="flex flex-col sm:flex-row items-center sm:gap-2 text-center transition-colors duration-500">
                       <span className={`text-[#4a4540] dark:text-stone-200 font-medium ${isEn ? "font-serif text-[14px]" : "font-sinhala text-sm"}`}>
                         {wedding.contact.name}
                       </span>
                       <span className="hidden sm:inline-block text-[#cda052]/50 text-[10px]">•</span>
                       <span className={`text-[#7a746e] dark:text-stone-400 ${isEn ? "font-serif text-[13px] tracking-wide" : "font-sans text-xs tracking-wider"}`}>
                         {wedding.contact.phone}
                       </span>
                     </div>
                   </div>
                </div>

               
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

// ELEGANT SWIRLING VINE COMPONENT
const SwirlingVine = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
    <path d="M 5,95 C 20,80 40,65 50,45 C 55,30 65,20 85,15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M 30,75 C 10,65 15,45 30,40 C 45,35 55,55 45,65 C 38,72 25,65 30,58" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M 55,40 C 45,40 35,25 45,15 C 55,5 65,15 60,25 C 57,30 50,28 53,22" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
    <path d="M 45,65 C 60,75 80,85 95,75" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <path d="M 45,55 Q 55,65 65,58 Q 55,48 45,55 Z" fill="currentColor" opacity="0.3" />
    <path d="M 70,30 Q 80,25 85,35 Q 75,40 70,30 Z" fill="currentColor" opacity="0.4" />
    <path d="M 25,85 Q 35,95 45,90 Q 35,80 25,85 Z" fill="currentColor" opacity="0.3" />
    <path d="M 65,20 Q 75,10 85,15 Q 75,25 65,20 Z" fill="currentColor" opacity="0.5" />
    <circle cx="88" cy="12" r="1" fill="currentColor" />
    <circle cx="95" cy="73" r="0.8" fill="currentColor" />
    <circle cx="28" cy="56" r="0.8" fill="currentColor" />
  </svg>
);

// TINY BOTTOM FLOURISH COMPONENT
const BottomFlourish = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 20" className={className} fill="none" aria-hidden="true">
    <path d="M10,10 Q30,0 50,10 T90,10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
    <path d="M35,10 Q50,18 65,10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
    <circle cx="50" cy="10" r="2" fill="currentColor" />
    <circle cx="20" cy="7.5" r="1" fill="currentColor" opacity="0.7"/>
    <circle cx="80" cy="7.5" r="1" fill="currentColor" opacity="0.7"/>
  </svg>
);

// Detail Block 
const DetailBlock = ({ icon, label, value, isEn }: { icon: React.ReactNode; label: string; value: string; isEn: boolean }) => (
  <div className="flex flex-col items-center text-center gap-2">
    <div className="w-10 h-10 rounded-full bg-white dark:bg-stone-900 border border-[#e5d8c5] dark:border-stone-700 flex items-center justify-center text-[#cda052] text-lg shadow-sm mb-1 transition-colors duration-500">
      {icon}
    </div>
    <div>
      <div className={`text-[#4a4540] dark:text-stone-200 transition-colors duration-500 ${isEn ? "font-serif font-medium text-[17px] leading-snug" : "font-sinhala font-semibold text-[15px] leading-relaxed"}`}>
        {label}
      </div>
      <div className={`text-[#7a746e] dark:text-stone-400 transition-colors duration-500 mt-1 ${isEn ? "font-serif text-[14px]" : "font-sinhala text-[13px]"}`}>
        {value}
      </div>
    </div>
  </div>
);