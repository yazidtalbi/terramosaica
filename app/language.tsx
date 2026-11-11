"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { translate, type Language } from "./translations";

const LanguageContext = createContext({
  language: "fr" as Language,
  setLanguage: (_language: Language) => {},
  t: (text: string) => text,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>("fr");

  useEffect(() => {
    const restoreLanguage = () => {
      const query = new URL(window.location.href).searchParams.get("lang");
      let stored: string | null = null;
      try { stored = localStorage.getItem("terra-language"); } catch { /* Storage may be unavailable. */ }
      updateLanguage(query === "en" || query === "fr" ? query : stored === "en" ? "en" : "fr");
    };
    restoreLanguage();
    window.addEventListener("popstate", restoreLanguage);
    return () => window.removeEventListener("popstate", restoreLanguage);
  }, []);

  const setLanguage = useCallback((next: Language) => {
    updateLanguage(next);
    try { localStorage.setItem("terra-language", next); } catch { /* Switching still works without storage. */ }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "en" ? "Terra Mosaica | The art of Moroccan zellige" : "Terra Mosaica | L’art du zellige marocain";
    document.querySelector('meta[name="description"]')?.setAttribute("content", language === "en"
      ? "Handcrafted Moroccan zellige, six generations of expertise. Discover our collections, custom colours and support from quarry to installation."
      : "Zellige marocain façonné à la main, six générations de savoir-faire. Collections, couleurs sur mesure et accompagnement de la carrière à la pose.");
    window.dispatchEvent(new Event("resize"));
  }, [language]);

  const t = useCallback((text: string) => translate(text, language), [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
