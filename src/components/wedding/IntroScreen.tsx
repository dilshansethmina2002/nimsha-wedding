import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import coupleIntro from "@/assets/couple-intro.webp";
import { Sparkles } from "./Decorations";

interface Props {
  onComplete: () => void;
  duration?: number;
}

// Cinematic full-screen intro shown before the envelope.
export const IntroScreen = ({ onComplete, duration = 3000 }: Props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 1.1, ease: "easeInOut" } }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[200] grid place-items-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(40 50% 96%) 0%, hsl(38 35% 88%) 60%, hsl(32 30% 78%) 100%)",
          }}
        >
          <Sparkles count={18} />

          {/* Floating petals */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                style={{ left: `${Math.random() * 100}%`, top: `-10%` }}
                animate={{
                  y: ["-10vh", "110vh"],
                  x: [0, Math.random() * 80 - 40],
                  rotate: [0, 360],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "linear",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 20 20">
                  <path
                    d="M10 2 C 6 6, 6 14, 10 18 C 14 14, 14 6, 10 2 Z"
                    fill="hsl(35 80% 55%)"
                    opacity="0.7"
                  />
                </svg>
              </motion.span>
            ))}
          </div>

          {/* Decorative gold frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="relative max-w-[92vw] max-h-[88vh] p-3 md:p-5 rounded-[2rem]"
            
          >
            <div className="">
              <motion.img
                src={coupleIntro}
                alt="Bride and groom"
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
                className="block max-h-[78vh] w-auto rounded-[1.4rem] object-contain"
                draggable={false}
              />
            </div>

            {/* Soft pulsing glow ring */}
            <motion.div
              className="absolute inset-0 rounded-[2rem] pointer-events-none"
              animate={{ boxShadow: [
                "0 0 40px 0px hsl(42 90% 70% / 0.3)",
                "0 0 90px 15px hsl(42 90% 70% / 0.55)",
                "0 0 40px 0px hsl(42 90% 70% / 0.3)",
              ] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 font-script text-3xl md:text-4xl text-black-gradient text-center"
          >
            A Love Story Begins…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
