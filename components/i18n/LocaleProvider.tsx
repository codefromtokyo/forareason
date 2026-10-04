"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Locale, tr } from "@/lib/i18n/strings";

const Ctx = createContext<{ locale: Locale; setLocale: (l: Locale) => void; t: (k: string) => string }>({ locale: "en", setLocale: () => {}, t: (k) => k });
export const useI18n = () => useContext(Ctx);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  useEffect(() => { try { const l = localStorage.getItem("forareason-locale") as Locale; if (l) { setLocaleState(l); document.documentElement.lang = l; } } catch {} }, []);
  const setLocale = (l: Locale) => { setLocaleState(l); try { localStorage.setItem("forareason-locale", l); document.documentElement.lang = l; } catch {} };
  return <Ctx.Provider value={{ locale, setLocale, t: (k) => tr(locale, k) }}>{children}</Ctx.Provider>;
}
