import { useEffect, useState } from "react";
import { HiMenu, HiX, HiSun, HiMoon } from "react-icons/hi";
import { useWedding } from "@/lib/wedding-context";
import { wedding } from "@/lib/wedding";
import { cn } from "@/lib/utils";

const links = [
  { id: "home", en: "Home", si: "මුල් පිටුව" },
  { id: "events", en: "Events", si: "උත්සව" },
  { id: "gallery", en: "Gallery", si: "පින්තූර" },
];

export const Navbar = () => {
  const { lang, setLang, theme, toggleTheme } = useWedding();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    console.log("Clicked:", id); 
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-[999] pointer-events-auto transition-all duration-500",
        scrolled ? "py-3 glass-card !rounded-none border-b" : "py-5 bg-transparent border-transparent"
      )}
    >
      <nav className="container flex items-center justify-between relative z-[999]">
        <button onClick={() => go("home")} className="font-script text-2xl md:text-3xl text-gold-gradient relative z-50">
          {wedding.bride.en[0]} & {wedding.groom.en[0]}
        </button>

        {/* Desktop Links Container */}
        <div className="hidden md:flex items-center gap-8 relative z-[999]">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="font-display text-xs tracking-[0.2em] uppercase text-foreground/80 hover:text-primary transition-colors relative group cursor-pointer pointer-events-auto"
            >
              {lang === "en" ? l.en : l.si}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 relative z-[999]">
          {/* FIX: Removed 'hidden sm:flex' and added 'flex items-center' */}
          <button
            onClick={() => setLang(lang === "en" ? "si" : "en")}
            className="flex items-center h-9 px-3 rounded-full border border-primary/40 text-xs font-display tracking-widest hover:bg-primary/10 transition-colors pointer-events-auto"
            aria-label="Toggle language"
          >
            {lang === "en" ? "EN | සිං" : "සිං | EN"}
          </button>
          
          <button
            onClick={toggleTheme}
            className="h-9 w-9 grid place-items-center rounded-full border border-primary/40 hover:bg-primary/10 transition-colors pointer-events-auto"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <HiMoon className="w-4 h-4" /> : <HiSun className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden h-9 w-9 grid place-items-center rounded-full border border-primary/40 pointer-events-auto"
            aria-label="Menu"
          >
            {open ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden container mt-3 glass-card rounded-2xl p-4 flex flex-col gap-1 animate-fade-up">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-left px-4 py-3 rounded-lg hover:bg-primary/10 font-display text-sm tracking-widest uppercase"
            >
              {lang === "en" ? l.en : l.si}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};