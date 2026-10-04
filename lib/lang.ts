import { DATA_NL, DATA_FR, DATA_JA } from "./lang-data";

export interface LangCfg { code: string; name: string; native: string; test: string; levels: string[]; data: Record<string, any>; speech: string; }

export const LANGS: Record<string, LangCfg> = {
  nl: { code: "nl", name: "Dutch", native: "Nederlands", test: "Staatsexamen NT2", levels: ["A1", "A2", "B1", "B2"], data: DATA_NL, speech: "nl-NL" },
  fr: { code: "fr", name: "French", native: "Français", test: "DELF", levels: ["A1", "A2", "B1", "B2"], data: DATA_FR, speech: "fr-FR" },
  jp: { code: "jp", name: "Japanese", native: "日本語", test: "JLPT", levels: ["N5", "N4", "N3", "N2", "N1"], data: DATA_JA, speech: "ja-JP" },
};
export const langForCountry = (country: string) => LANGS[country];
