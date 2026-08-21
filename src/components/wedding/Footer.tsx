import { FaWhatsapp, FaFacebookF, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding";
import { useWedding } from "@/lib/wedding-context";
import { Ornament } from "./Decorations";

// IMPORT YOUR EXTERNAL FLOWER IMAGE HERE:
// Change "flower-image.png" to the exact name of your file!
import flowerArt from "@/assets/footer.webp"; 

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

      {/* --- EXTERNAL FLOWER IMAGES (iOS Optimized) --- */}
      <div className="absolute inset-0 pointer-events-none z-0 isolate overflow-hidden">
        
        {/* Left Flower */}
        <img 
          src={flowerArt} 
          alt="Flower Corner"
          // If your image has a white background, keep 'mix-blend-multiply dark:invert'. 
          // If it is already transparent (PNG), you can delete those two classes!
          className="absolute bottom-20 left-10 w-32 md:w-48 lg:w-56 opacity-90 dark:opacity-70 mix-blend-multiply transform-gpu will-change-transform [backface-visibility:hidden]"
        />
        
        {/* Right Flower (Flipped horizontally) */}
        <img 
          src={flowerArt} 
          alt="Flower Corner"
          className="absolute bottom-20 right-10 w-32 md:w-48 lg:w-56 opacity-90 dark:opacity-70 mix-blend-multiply scale-x-[-1] transform-gpu will-change-transform [backface-visibility:hidden]"
        />
        
      </div>
      {/* ---------------------------------------------- */}

      <div className="container text-center relative z-10">
        <Ornament className="text-primary w-40 md:w-48 mx-auto mb-8 opacity-80" />
        
        {/* Sweet Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 transform-gpu"
        >
          <p className={`text-foreground/70 italic ${isEn ? "font-serif text-lg" : "font-sinhala text-base"}`}>
            {isEn ? "Your presence is a great blessing to us  ." : "ඔබගේ පැමිණීම අපට මහත් ආශිර්වාදයකි."}
          </p>
        </motion.div>

        {/* භාෂාවට අනුව නම් දර්ශනය වීම */}
        <h3 className={`py-2 px-2 text-gold-gradient drop-shadow-sm flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 ${isEn ? "font-script text-5xl md:text-6xl" : "font-sinhala font-bold text-4xl md:text-5xl"}`}>
          <span>{isEn ? wedding.bride.en : wedding.bride.si}</span> 
          
          {/* Pulsing Ampersand */}
          <motion.span 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="font-script text-primary/80 text-4xl md:text-5xl transform-gpu"
          >
            &
          </motion.span> 
          
          <span>{isEn ? wedding.groom.en : wedding.groom.si}</span>
        </h3>
        
        <p className="font-display text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary mt-4">
          {wedding.hashtag}
        </p>

        {/* Credits Section */}
        <div className="mt-5 lg:mt-12 pt-8 border-t border-primary/15">
          <p className="font-serif italic text-foreground/70 flex items-center justify-center gap-2 text-sm">
            Design with <FaHeart className="text-rose-400 drop-shadow-sm animate-pulse transform-gpu" /> by CodeCraft
          </p>
          
          {/* Social Share Buttons */}
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
          
          <p className="font-display text-[8px] tracking-[0.3em] uppercase text-muted-foreground mt-6">
            © {new Date().getFullYear()} CodeCraft. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};