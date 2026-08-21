import { motion } from "framer-motion";
import { useWedding } from "@/lib/wedding-context";
import { wedding } from "@/lib/wedding";
import { Ornament, Sparkles } from "./Decorations";
import heroFloral from "@/assets/hero-floral.webp";
import swanImg from "@/assets/swam.webp"; 
import { LotusDivider } from "./Ornaments";

interface Props { 
  onOpenInvitation: () => void; 
  opened: boolean; 
}

export const Hero = ({ onOpenInvitation, opened }: Props) => {
  const { lang } = useWedding();
  const isEn = lang === "en";
  
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-soft">
      
      {/* Background floral (iOS OPTIMIZED: Removed mix-blend modes) */}
      <div className="absolute inset-0 bg-transparent">
        <img
          src={heroFloral}
          alt=""
          loading="lazy"
          // Removed mix-blend-multiply/screen to prevent lag. Opacity adjusted to compensate.
          className="w-full h-full object-cover opacity-90 dark:opacity-80"
          width={1536}
          height={1920}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/90" />
      </div>

      <Sparkles count={19} />

      {/* Floating Lotus Petals (iOS OPTIMIZED: Added GPU hardware acceleration) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden isolate">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            // Added transform-gpu to offload continuous animation to the iPhone graphics chip
            className="absolute text-rose-300/40 text-lg md:text-xl transform-gpu will-change-transform [backface-visibility:hidden]"
            initial={{ top: "-10%", left: `${20 * i + Math.random() * 10}%` }}
            animate={{ top: "110%", rotate: [0, 180, 360], x: [0, 30, -30, 0] }}
            transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
          >
            ✿
          </motion.div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative container z-[50] text-center px-4 flex flex-col items-center justify-center py-16">
      
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // Increased En size: text-xs md:text-base (was text-[10px] md:text-sm)
          className={`relative z-10 font-front uppercase text-primary-deep mb-6 mt-10 ${isEn ? "font-display text-xs md:text-base tracking-[0.3em]" : "font-sinhala text-sm md:text-base tracking-widest font-semibold"}`}
        >
          {isEn ? "You are warmly invited" : "ඔබට ආදරයෙන් ආරාධනා කරමු"}
        </motion.p>

        {/* Top Ornament */}
        <LotusDivider  width="w-20 sm:w-28" />
        <Ornament className="relative z-10 text-primary/70 w-32 md:w-48 mx-auto mb-4" />

        {/* Bride Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          // Increased En size: text-8xl sm:text-9xl md:text-[10rem]
          className={`relative z-10 leading-[1.3] py-3 px-2 text-gold-gradient drop-shadow-sm ${isEn ? "font-couple text-7xl sm:text-9xl md:text-[10rem]" : "font-sinhala font-bold text-5xl sm:text-6xl md:text-7xl"}`}
        >
          {isEn ? wedding.bride.en : wedding.bride.si}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 font-display text-3xl md:text-5xl my-2 text-primary tracking-widest drop-shadow-sm"
        >
          &
        </motion.div>

        {/* Groom Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          // Increased En size: text-8xl sm:text-9xl md:text-[10rem]
          className={`relative z-10 leading-[1.3] py-3 px-2 text-gold-gradient drop-shadow-sm ${isEn ? "font-couple text-7xl sm:text-9xl md:text-[10rem]" : "font-sinhala font-bold text-5xl sm:text-6xl md:text-7xl"}`}
        >
          {isEn ? wedding.groom.en : wedding.groom.si}
        </motion.h1>

        {/* Swan Image (iOS OPTIMIZED: Added hardware acceleration for continuous bobbing) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: [0, -6, 0] 
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.7 },
            scale: { duration: 1, delay: 0.7 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 } 
          }}
          // transform-gpu prevents lag during continuous y-axis animations
          className="relative z-10 my-6 transform-gpu will-change-transform [backface-visibility:hidden]"
        >
          <img 
            src={swanImg} 
            alt="Swans with Lotus" 
            className="w-56 md:w-72 lg:w-80 object-contain drop-shadow-xl mx-auto"
          />
        </motion.div>

        {/* --- ROMANTIC QUOTE (Replaces Date & Location) --- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="relative z-10 mt-2 mb-4 px-4 max-w-lg mx-auto"
        >
          <p className={`text-foreground/80 italic ${isEn ? "font-serif text-lg md:text-2xl leading-relaxed" : "font-sinhala text-base md:text-xl leading-loose"}`}>
            {isEn 
              ? '"Two souls but with a single thought, two hearts that beat as one."' 
              : '"එකම සිතුවිල්ලකින් බැඳුණු ආත්ම දෙකක්, එකම රිද්මයකට ගැහෙන හදවත් දෙකක්."'}
          </p>
        </motion.div>
        {/* ---------------------------------------------------- */}

        {/* Swipe/Scroll Hint Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="relative mt-8 cursor-pointer z-20"
        >
          <div className="flex flex-col items-center px-8 py-3 rounded-[2rem] bg-white/40 backdrop-blur-md border border-primary/20 shadow-[0_4px_20px_rgba(212,175,55,0.15)] active:scale-95 transition-transform whitespace-nowrap touch-manipulation">
            
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`text-primary font-semibold uppercase mb-1 transform-gpu ${isEn ? "font-display text-xs md:text-sm tracking-[0.2em]" : "font-sinhala text-xs md:text-sm tracking-widest"}`}
            >
              {isEn ? "Swipe to Explore" : "පහළට යන්න"}
            </motion.div>

            {/* Double Animated Chevrons */}
            <div className="flex flex-col items-center -space-y-3.5 mt-1">
              <motion.div
                animate={{ y: [0, 5, 0], opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                className="transform-gpu will-change-transform"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary drop-shadow-[0_2px_4px_rgba(217,119,6,0.3)]">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </motion.div>
              <motion.div
                animate={{ y: [0, 5, 0], opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="transform-gpu will-change-transform"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary drop-shadow-[0_2px_4px_rgba(217,119,6,0.3)]">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </motion.div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};