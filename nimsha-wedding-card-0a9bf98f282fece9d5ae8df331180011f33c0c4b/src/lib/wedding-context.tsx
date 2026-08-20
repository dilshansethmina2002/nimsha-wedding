import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Lang } from "./wedding";

type Theme = "light" | "dark";

interface WeddingContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  guestName: string | null;
}

const Ctx = createContext<WeddingContextValue | null>(null);

export const WeddingProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const g = params.get("guest") || params.get("to");
    if (g) setGuestName(g);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Ctx.Provider
      value={{
        lang,
        setLang,
        theme,
        setTheme,
        toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
        guestName,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useWedding = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWedding outside provider");
  return ctx;
};
