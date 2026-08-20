import { motion } from "framer-motion";
import { FaGoogle, FaCalendarAlt } from "react-icons/fa";
import { useWedding } from "@/lib/wedding-context";
import { buildGoogleCalendarUrl, downloadICS } from "@/lib/calendar";
import { Ornament } from "./Decorations";

export const SaveTheDate = () => {
  const { lang } = useWedding();
  const isEn = lang === "en";

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-soft overflow-hidden font-sans">
      
      {/* Background Water Ripples for Theme Continuity */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10 z-0">
        <div className="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] border-[1px] border-primary/20 rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45rem] h-[45rem] border-[1px] border-primary/30 rounded-full" />
      </div>

      {/* Falling Lotus Petals Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute text-rose-300/40 text-lg md:text-xl"
            initial={{ top: "-10%", left: `${15 * i + Math.random() * 25}%` }}
            animate={{ top: "110%", rotate: [0, 180, 360], x: [0, 40, -40, 0] }}
            transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, ease: "linear", delay: i * 2 }}
          >
            ✿
          </motion.div>
        ))}
      </div>

      <div className="container max-w-4xl relative z-10 px-4">
        {/* අලංකාර Glass Card එකක් ඇතුළට Content එක දමා ඇත */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass-card bg-white/70 dark:bg-black/30 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 text-center border border-rose-200/50 dark:border-white/10 shadow-elegant overflow-hidden"
        >
          {/* Lotus Corners for the Card */}
          <LotusCorner className="absolute top-2 left-2 w-10 md:w-16 text-primary/20" />
          <LotusCorner className="absolute top-2 right-2 w-10 md:w-16 text-primary/20 scale-x-[-1]" />
          <LotusCorner className="absolute bottom-2 left-2 w-10 md:w-16 text-primary/20 scale-y-[-1]" />
          <LotusCorner className="absolute bottom-2 right-2 w-10 md:w-16 text-primary/20 scale-x-[-1] scale-y-[-1]" />

          <p className={`uppercase text-primary-deep mb-3 ${isEn ? "font-display text-xs tracking-[0.4em]" : "font-sinhala font-semibold tracking-widest text-sm"}`}>
            {isEn ? "Don't Miss It" : "අමතක නොකරන්න"}
          </p>
          
          <h2 className={`text-gold-gradient mb-3 py-2 px-2 drop-shadow-sm ${isEn ? "font-script text-5xl md:text-7xl" : "font-sinhala font-bold text-4xl md:text-6xl"}`}>
            {isEn ? "Save Our Date" : "දිනය සුරකින්න"}
          </h2>
          
          <Ornament className="text-primary w-40 md:w-48 mx-auto mb-6 opacity-80" />
          
          <p className={`text-foreground/80 max-w-xl mx-auto mb-10 ${isEn ? "font-serif text-lg" : "font-sinhala text-base leading-relaxed"}`}>
            {isEn
              ? "Add our wedding to your calendar — we'll even remind you 2 days before, so you have time to find that perfect outfit."
              : "අපගේ විවාහ දිනය ඔබගේ දින දර්ශනයට එක් කරන්න — දින 2කට පෙර අපි ඔබට මතක් කරන්නෙමු."}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
          >
            <a
              href={buildGoogleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gold-gradient text-primary-foreground uppercase shadow-md hover:shadow-glow transition-all hover:-translate-y-1 active:scale-95 shimmer ${isEn ? "font-display text-[10px] md:text-xs tracking-[0.2em]" : "font-sinhala font-bold text-xs md:text-sm tracking-widest"}`}
            >
              <FaGoogle className="w-4 h-4" /> {isEn ? "Google Calendar" : "Google දින දර්ශනය"}
            </a>
            <button
              onClick={downloadICS}
              className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-primary/50 text-primary-deep bg-white/50 dark:bg-black/20 hover:bg-primary hover:text-primary-foreground hover:border-primary uppercase transition-all hover:-translate-y-1 active:scale-95 ${isEn ? "font-display text-[10px] md:text-xs tracking-[0.2em]" : "font-sinhala font-bold text-xs md:text-sm tracking-widest"}`}
            >
              <FaCalendarAlt className="w-4 h-4" /> {isEn ? "Apple / Outlook (.ics)" : "Apple / Outlook"}
            </button>
          </motion.div>

          <p className={`mt-8 ${isEn ? "font-serif italic text-sm text-muted-foreground" : "font-sinhala text-sm text-muted-foreground/80"}`}>
            {isEn ? "Reminder set for 2 days before · Works on iPhone, Android, Outlook" : "දින 2කට පෙර මතක්වීමක් · iPhone, Android, Outlook සඳහා සහය දක්වයි"}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Small Lotus Corner SVG for the Card
const LotusCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden>
    <path d="M5 5 Q 30 15 45 45 Q 60 75 95 95" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
    <path d="M5 5 Q 10 30 45 45" />
    <path d="M25 25 Q 35 30 45 45" />
  </svg>
);