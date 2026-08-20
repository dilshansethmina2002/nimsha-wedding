import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { wedding } from "@/lib/wedding";
import { useWedding } from "@/lib/wedding-context";
import { Sparkles, Ornament } from "./Decorations";

interface Props { open: boolean; onComplete: () => void; }

// First-screen luxury envelope. Opens cinematically when user clicks anywhere on the screen.
export const EnvelopeOpening = ({ open, onComplete }: Props) => {
  const { lang, setLang } = useWedding();
  const [opening, setOpening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Screen size එක පරීක්ෂා කිරීම
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    // Allow flap + letter animations to play, then notify parent to mount the rest.
    setTimeout(onComplete, 2600);
  };

  // Mobile එකේදී කාඩ් එක උඩට යන ප්‍රමාණය අඩු කර ඇත (-135). Desktop එකේදී -210.
  const letterMoveY = isMobile ? -135 : -210; 

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
          onClick={handleOpen}
          className="fixed inset-0 z-[100] grid place-items-center bg-gradient-radial overflow-hidden cursor-pointer"
        >
          <Sparkles count={14} />

          {/* Floral corner accents */}
          <FloralCorner className="absolute top-0 left-0 w-40 md:w-64 text-primary/60" />
          <FloralCorner className="absolute top-0 right-0 w-40 md:w-64 text-primary/60 scale-x-[-1]" />
          <FloralCorner className="absolute bottom-0 left-0 w-40 md:w-64 text-primary/60 scale-y-[-1]" />
          <FloralCorner className="absolute bottom-0 right-0 w-40 md:w-64 text-primary/60 scale-x-[-1] scale-y-[-1]" />

          {/* Language toggle (envelope screen only) - Stop propagation so clicking toggle doesn't trigger open */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLang(lang === "en" ? "si" : "en");
            }}
            className="absolute top-5 right-5 px-3 py-1.5 rounded-full border border-primary/50 text-xs font-display tracking-widest hover:bg-primary/10 z-10 backdrop-blur-sm cursor-pointer"
          >
            {lang === "en" ? "සිංහල" : "English"}
          </button>

          <div className="relative flex flex-col items-center px-6 pointer-events-none">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: opening ? 0 : 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative z-50 font-couple text-5xl md:text-6xl text-gold-gradient mb-12 tracking-wide text-center"
            >
              {lang === "en" ? "Two Hearts, One Journey" : "ශ්‍රී සුභ මංගලම්"}
            </motion.p>

            <div className="relative z-10" style={{ perspective: "1400px" }}>
              {/* Outer gold halo */}
              <motion.div
                aria-hidden
                className="absolute -inset-8 rounded-[2rem] pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 40px 0px hsl(42 90% 65% / 0.35)",
                    "0 0 80px 12px hsl(42 90% 70% / 0.55)",
                    "0 0 40px 0px hsl(42 90% 65% / 0.35)",
                  ],
                }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />

              <div
                className="relative w-[300px] h-[200px] sm:w-[360px] sm:h-[240px] md:w-[460px] md:h-[300px] rounded-md shadow-elegant"
                style={{ background: "var(--gradient-gold)" }}
              >
                {/* Inner gold border frame */}
                <div className="absolute inset-2 rounded border border-primary-foreground/40 pointer-events-none z-[1]" />
                <div className="absolute inset-3 rounded-sm border border-primary-foreground/20 pointer-events-none z-[1]" />

                {/* Decorative corner flourishes (envelope body) */}
                <EnvelopeCorner className="absolute top-1.5 left-1.5 w-10 md:w-14 text-primary-foreground/70 z-[2]" />
                <EnvelopeCorner className="absolute top-1.5 right-1.5 w-10 md:w-14 text-primary-foreground/70 scale-x-[-1] z-[2]" />
                <EnvelopeCorner className="absolute bottom-1.5 left-1.5 w-10 md:w-14 text-primary-foreground/70 scale-y-[-1] z-[2]" />
                <EnvelopeCorner className="absolute bottom-1.5 right-1.5 w-10 md:w-14 text-primary-foreground/70 scale-x-[-1] scale-y-[-1] z-[2]" />

                {/* Subtle damask shimmer overlay */}
                <div
                  className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none z-[1] rounded-md"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 25% 25%, hsl(45 95% 85% / 0.6) 0%, transparent 35%), radial-gradient(circle at 75% 75%, hsl(45 95% 85% / 0.5) 0%, transparent 35%)",
                  }}
                />

                {/* Letter inside - මෙතන තමයි y අගය dynamically මාරු වෙන්නේ */}
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={opening ? { y: letterMoveY, opacity: 1 } : { y: 0, opacity: 0 }}
                  transition={{ duration: 1.4, delay: 0.9, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute inset-3 z-10 bg-card rounded-sm shadow-card flex flex-col items-center justify-center text-center px-4 border border-primary/30"
                >
                  <p className="font-display text-[10px] md:text-xs tracking-[0.3em] text-primary-deep mb-2">
                    {lang === "en" ? "WITH JOY" : "ආදරයෙන්"}
                  </p>
                  <p className="font-couple text-4xl md:text-6xl text-gold-gradient leading-none">
                    {wedding.bride.en} & {wedding.groom.en}
                  </p>
                  <p className="font-serif italic text-[11px] md:text-sm text-foreground/70 mt-2">
                    {lang === "en" ? "request the honor of your presence" : "ඔබගේ පැමිණීම අපේක්ෂා කරති"}
                  </p>
                </motion.div>

                {/* Flap (animates on click) */}
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={opening ? { rotateX: -180 } : { rotateX: 0 }}
                  transition={{ duration: 1, delay: 0.05, ease: "easeInOut" }}
                  style={{
                    transformOrigin: "top",
                    backfaceVisibility: "hidden",
                    background:
                      "linear-gradient(160deg, hsl(42 85% 62%) 0%, hsl(35 80% 48%) 55%, hsl(28 75% 32%) 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 70%)",
                    filter: "drop-shadow(0 6px 10px hsl(28 60% 20% / 0.35))",
                  }}
                  className="absolute inset-x-0 top-0 h-full rounded-md z-20"
                >
                  {/* Flap inner border */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 70%)",
                      border: "1px solid hsl(45 95% 88% / 0.5)",
                      margin: "6px",
                    }}
                  />
                  {/* Center flap monogram tag */}
                  <div className="absolute left-1/2 top-[18%] -translate-x-1/2 font-script text-primary-foreground/80 text-xs md:text-sm tracking-widest">
                    ✦ &nbsp; ✦ &nbsp; ✦
                  </div>
                </motion.div>

                {/* Wax seal */}
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  animate={opening ? { scale: 0, opacity: 0, rotate: 180 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-1/2 top-[28%] -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full grid place-items-center z-30"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, hsl(0 70% 55%), hsl(0 75% 38%) 55%, hsl(0 80% 22%) 100%)",
                    boxShadow:
                      "0 6px 16px hsl(0 70% 15% / 0.55), inset 0 2px 4px hsl(0 90% 80% / 0.5), inset 0 -3px 6px hsl(0 80% 10% / 0.4)",
                  }}
                >
                  {/* Seal serrated edge */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "repeating-conic-gradient(from 0deg, hsl(0 70% 35%) 0deg 8deg, transparent 8deg 16deg)",
                      mask: "radial-gradient(circle, transparent 60%, black 62%, black 100%)",
                      WebkitMask: "radial-gradient(circle, transparent 60%, black 62%, black 100%)",
                      opacity: 0.7,
                    }}
                  />
                  <span className="relative font-script text-primary-foreground text-2xl md:text-3xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                    {wedding.bride.en[0]}&{wedding.groom.en[0]}
                  </span>
                </motion.div>
              </div>
            </div>

            <Ornament className="text-primary w-56 mt-8 mb-2 relative z-50 pointer-events-none" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: opening ? 0 : 1 }}
              transition={{ delay: 0.5 }}
              className="font-script py-2 px-2
               text-3xl md:text-4xl text-gold-gradient text-center relative z-50 pointer-events-none"
            >
              {lang === "en" ? "You're Invited" : "ඔබට ආරාධනා"}
            </motion.p>

            {/* Highlighted Open Invitation Button */}
            {!opening && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  opacity: { delay: 0.8, duration: 0.5 },
                  y: { delay: 0.8, duration: 0.5 },
                  scale: { delay: 1.3, repeat: Infinity, duration: 2, ease: "easeInOut" },
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent duplicate trigger from parent click
                  handleOpen();
                }}
                className="mt-6 inline-flex justify-center items-center gap-3 w-[85vw] max-w-[300px] md:w-auto md:px-10 py-4 rounded-full bg-gold-gradient text-primary-foreground font-display text-[13px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase shadow-elegant hover:shadow-glow transition-all active:scale-95 shimmer relative z-50 border border-amber-300/40 pointer-events-auto"
              >
                {lang === "en" ? "Open Invitation" : "ආරාධනය විවෘත කරන්න"}
                <span>✦</span>
              </motion.button>
            )}

            {opening && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="font-script text-2xl text-primary mt-6 relative z-50 pointer-events-none"
              >
                {lang === "en" ? "Welcome to our story…" : "අපේ කතාවට සාදරයෙන් පිළිගනිමු…"}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FloralCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="0.8">
    <path d="M10 10 Q 60 30 90 80 Q 120 130 180 150" />
    <path d="M20 40 Q 50 60 70 110" />
    <circle cx="40" cy="20" r="3" fill="currentColor" />
    <circle cx="80" cy="60" r="2.5" fill="currentColor" />
    <circle cx="130" cy="120" r="3" fill="currentColor" />
    <path d="M55 55 q -8 -8 0 -16 q 8 8 0 16 z" fill="currentColor" opacity="0.4" />
    <path d="M110 100 q -10 -10 0 -20 q 10 10 0 20 z" fill="currentColor" opacity="0.4" />
  </svg>
);

const EnvelopeCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 60" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M4 4 Q 20 8 28 22 Q 36 36 56 40" />
    <path d="M4 4 Q 14 18 18 32" />
    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    <circle cx="22" cy="20" r="1.2" fill="currentColor" />
    <path d="M30 14 q -4 -4 0 -8 q 4 4 0 8 z" fill="currentColor" opacity="0.6" />
  </svg>
);