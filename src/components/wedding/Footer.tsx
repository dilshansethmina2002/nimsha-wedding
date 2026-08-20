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