import { FaWhatsapp, FaFacebookF, FaHeart } from "react-icons/fa";
import { wedding } from "@/lib/wedding";
import { useWedding } from "@/lib/wedding-context";
import { Ornament } from "./Decorations";

export const Footer = () => {
  const { lang } = useWedding();
  const isEn = lang === "en";
  
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  
  // භාෂාවට අනුව WhatsApp පණිවිඩය වෙනස් වීම
  const waMsgEn = `You're invited to ${wedding.bride.en} & ${wedding.groom.en}'s wedding! ${shareUrl}`;
  const waMsgSi = `${wedding.bride.si} සහ ${wedding.groom.si} ගේ මංගල්‍යයට ඔබට ආදරයෙන් ආරාධනා කරමු! ${shareUrl}`;
  const waMsg = encodeURIComponent(isEn ? waMsgEn : waMsgSi);

  return (
    <footer className="relative py-12 lg:py-16 bg-gradient-soft border-t border-rose-200/50 dark:border-primary/20 overflow-hidden font-sans">
      
      {/* Subtle Background Theme Element */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10 z-0 flex justify-center items-end">
        <div className="w-[40rem] h-[20rem] border-t-[1px] border-primary/20 rounded-t-full translate-y-1/2" />
      </div>

      {/* --- NEW: BOTTOM CORNER FLOWERS --- */}
      <FlowerCorner className="absolute bottom-0 left-0 w-32 md:w-48 lg:w-56 text-[#cda052] opacity-40 dark:opacity-20 pointer-events-none z-0 transform-gpu" />
      <FlowerCorner className="absolute bottom-0 right-0 w-32 md:w-48 lg:w-56 text-[#cda052] opacity-40 dark:opacity-20 pointer-events-none scale-x-[-1] z-0 transform-gpu" />
      {/* ---------------------------------- */}

      <div className="container text-center relative z-10">
        <Ornament className="text-primary w-40 md:w-48 mx-auto mb-8 opacity-80" />
        
        {/* භාෂාවට අනුව නම් දර්ශනය වීම */}
        <h3 className={`py-2 px-2 text-gold-gradient drop-shadow-sm flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 ${isEn ? "font-script text-5xl md:text-6xl" : "font-sinhala font-bold text-4xl md:text-5xl"}`}>
          <span>{isEn ? wedding.bride.en : wedding.bride.si}</span> 
          <span className="font-script text-primary/80 text-4xl md:text-5xl">&</span> 
          <span>{isEn ? wedding.groom.en : wedding.groom.si}</span>
        </h3>
        
        <p className="font-display text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary mt-4">
          {wedding.hashtag}
        </p>

        {/* Credits Section */}
        <div className="mt-5 lg:mt-16 pt-8 border-t border-primary/15">
          <p className="font-serif italic text-foreground/70 flex items-center justify-center gap-2 text-sm">
            Design with <FaHeart className="text-rose-400 drop-shadow-sm animate-pulse" /> by CodeCraft
          </p>
           {/* Social Share Buttons (Themed) */}
        <div className="flex justify-center gap-4 mt-8 lg:mt-10">
          <a
            href={`https://wa.me/94788536767?text=${waMsg}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on WhatsApp"
            className="w-12 h-12 grid place-items-center rounded-full bg-white/60 dark:bg-black/20 border border-primary/30 text-primary-deep hover:bg-gold-gradient hover:text-white hover:border-transparent hover:shadow-glow transition-all hover:-translate-y-1 active:scale-95"
          >
            <FaWhatsapp className="w-5 h-5" />
          </a>
          
          <a 
            href="https://www.facebook.com/profile.php?id=61589021800561" 
            target="_blank" 
            rel="noreferrer"
            aria-label="Facebook" 
            className="w-12 h-12 grid place-items-center rounded-full bg-white/60 dark:bg-black/20 border border-primary/30 text-primary-deep hover:bg-gold-gradient hover:text-white hover:border-transparent hover:shadow-glow transition-all hover:-translate-y-1 active:scale-95"
          >
            <FaFacebookF className="w-5 h-5" />
          </a>
        </div>
          <p className="font-display text-[8px] tracking-[0.3em] uppercase text-muted-foreground mt-3">
            © {new Date().getFullYear()} CodeCraft. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

// --- ELEGANT FLOWER CORNER COMPONENT ---
// This uses clean SVG paths to draw beautiful, classic floral corners without causing lag.
const FlowerCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
    {/* Main Stem */}
    <path d="M 0,100 C 10,80 30,50 60,30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 0,100 C 30,95 60,80 80,50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Flower 1 (Top) */}
    <path d="M 55,25 C 50,20 60,10 65,15 C 70,20 60,30 55,25 Z" />
    <path d="M 60,30 C 50,35 45,25 50,20 C 55,15 65,25 60,30 Z" />
    <path d="M 65,25 C 75,20 70,10 65,15 C 60,10 55,20 65,25 Z" />
    <circle cx="60" cy="22" r="2.5" fill="currentColor" />

    {/* Flower 2 (Bottom Right) */}
    <path d="M 75,45 C 70,40 80,30 85,35 C 90,40 80,50 75,45 Z" />
    <path d="M 80,50 C 70,55 65,45 70,40 C 75,35 85,45 80,50 Z" />
    <path d="M 85,45 C 95,40 90,30 85,35 C 80,30 75,40 85,45 Z" />
    <circle cx="80" cy="42" r="2.5" fill="currentColor" />

    {/* Decorative Leaves */}
    <path d="M 15,85 C 20,70 10,65 5,75 C 0,85 10,90 15,85 Z" opacity="0.8" />
    <path d="M 30,70 C 45,60 40,50 30,55 C 20,60 20,75 30,70 Z" opacity="0.8" />
    <path d="M 40,90 C 55,85 60,75 50,75 C 40,75 35,95 40,90 Z" opacity="0.8" />
    
    {/* Elegant Dots */}
    <circle cx="45" cy="45" r="1.5" />
    <circle cx="25" cy="45" r="1" />
    <circle cx="55" cy="65" r="1.5" />
    <circle cx="35" cy="25" r="1" opacity="0.5" />
    <circle cx="85" cy="20" r="1" opacity="0.5" />
  </svg>
);