"use client";
import { LOCALES } from "@/lib/i18n/strings";
import { useI18n } from "./LocaleProvider";
export function LocaleSwitcher() {
  const { locale, setLocale } = useI18n();
  return (
    <select value={locale} onChange={(e) => setLocale(e.target.value as any)}
      className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm" aria-label="App language">
      {LOCALES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
    </select>
  );
}
