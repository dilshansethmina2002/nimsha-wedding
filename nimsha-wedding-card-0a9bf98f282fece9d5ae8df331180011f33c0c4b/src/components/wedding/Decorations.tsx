import { motion } from "framer-motion";

// Floating petals/sparkles overlay — purely decorative
export const FloatingPetals = ({ count = 14 }: { count?: number }) => {
  const petals = Array.from({ length: count });
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      {petals.map((_, i) => {
        const left = Math.random() * 100;
        const duration = 12 + Math.random() * 14;
        const delay = Math.random() * 10;
        const size = 8 + Math.random() * 12;
        return (
          <span
            key={i}
            className="absolute top-0 animate-float-petal"
            style={{
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              width: size,
              height: size,
            }}
          >
            <svg viewBox="0 0 20 20" className="w-full h-full opacity-60">
              <path
                d="M10 2 C 6 6, 6 14, 10 18 C 14 14, 14 6, 10 2 Z"
                fill="hsl(var(--primary-glow))"
                opacity="0.7"
              />
            </svg>
          </span>
        );
      })}
    </div>
  );
};

export const Sparkles = ({ count = 6 }: { count?: number }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    {Array.from({ length: count }).map((_, i) => (
      <motion.span
        key={i}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14">
          <path d="M7 0 L8 6 L14 7 L8 8 L7 14 L6 8 L0 7 L6 6 Z" fill="hsl(var(--primary))" />
        </svg>
      </motion.span>
    ))}
  </div>
);

export const Ornament = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 30" className={className} aria-hidden>
    <line x1="0" y1="15" x2="70" y2="15" stroke="currentColor" strokeWidth="0.6" />
    <circle cx="80" cy="15" r="2" fill="currentColor" />
    <path
      d="M100 5 C 90 10, 90 20, 100 25 C 110 20, 110 10, 100 5 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <circle cx="120" cy="15" r="2" fill="currentColor" />
    <line x1="130" y1="15" x2="200" y2="15" stroke="currentColor" strokeWidth="0.6" />
  </svg>
);
