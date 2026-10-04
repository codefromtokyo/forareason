export type Locale = "en" | "fr" | "ja" | "nl";
export const LOCALES: [Locale, string][] = [["en", "English"], ["fr", "Français"], ["ja", "日本語"], ["nl", "Nederlands"]];

type Dict = Record<string, string>;
const en: Dict = {
  home: "Home", tools: "Tools", community: "Community", about: "About", signIn: "Sign in", you: "You",
  tagline: "Break the language gap, together.",
  yourJourneys: "Your journeys", overall: "Overall", journeys: "Journeys", badges: "Badges",
  startJourney: "Start a journey", searchCountry: "Search a country…", whatDoing: "What you're doing",
  signToSave: "Sign in to save your progress", saveSub: "Keep your journeys on any device. Free.",
  mockTest: "Mock test", coreWords: "Core words", grammar: "Grammar & drills", sentences: "Build sentences",
  showMeaning: "Show meaning", hide: "Hide", next: "Next", listen: "Listen", submit: "Submit", retake: "Retake",
  topicTravel: "Travel", topicLanguage: "Language", topicRoad: "Driving & walking", topicVisa: "Visa & residency", topicNomad: "Remote & nomad",
  appLanguage: "App language",
};
const fr: Dict = { home: "Accueil", tools: "Outils", community: "Communauté", about: "À propos", signIn: "Se connecter", you: "Vous", tagline: "Comblez le fossé linguistique, ensemble.", yourJourneys: "Vos parcours", overall: "Global", journeys: "Parcours", badges: "Badges", startJourney: "Démarrer un parcours", searchCountry: "Rechercher un pays…", whatDoing: "Ce que vous faites", signToSave: "Connectez-vous pour sauvegarder", saveSub: "Gardez vos parcours sur tous vos appareils. Gratuit.", mockTest: "Test blanc", coreWords: "Mots clés", grammar: "Grammaire et exercices", sentences: "Construire des phrases", showMeaning: "Afficher le sens", hide: "Masquer", next: "Suivant", listen: "Écouter", submit: "Valider", retake: "Recommencer", topicTravel: "Voyage", topicLanguage: "Langue", topicRoad: "Conduite et marche", topicVisa: "Visa et résidence", topicNomad: "Télétravail et nomade", appLanguage: "Langue de l'app" };
const ja: Dict = { home: "ホーム", tools: "ツール", community: "コミュニティ", about: "私たちについて", signIn: "サインイン", you: "マイページ", tagline: "言葉の壁を、みんなで越える。", yourJourneys: "あなたの旅", overall: "全体", journeys: "旅", badges: "バッジ", startJourney: "旅を始める", searchCountry: "国を検索…", whatDoing: "進行中", signToSave: "進捗を保存するにはサインイン", saveSub: "どの端末でも旅を続けられます。無料。", mockTest: "模擬試験", coreWords: "基本単語", grammar: "文法と練習", sentences: "文を作る", showMeaning: "意味を表示", hide: "隠す", next: "次へ", listen: "聞く", submit: "提出", retake: "再挑戦", topicTravel: "旅行", topicLanguage: "言語", topicRoad: "運転と歩行", topicVisa: "ビザと在留", topicNomad: "リモート＆ノマド", appLanguage: "アプリの言語" };
const nl: Dict = { home: "Home", tools: "Tools", community: "Community", about: "Over ons", signIn: "Inloggen", you: "Jij", tagline: "Overbrug de taalkloof, samen.", yourJourneys: "Jouw reizen", overall: "Totaal", journeys: "Reizen", badges: "Badges", startJourney: "Start een reis", searchCountry: "Zoek een land…", whatDoing: "Waar je mee bezig bent", signToSave: "Log in om je voortgang te bewaren", saveSub: "Houd je reizen op elk apparaat. Gratis.", mockTest: "Proefexamen", coreWords: "Kernwoorden", grammar: "Grammatica & oefeningen", sentences: "Zinnen bouwen", showMeaning: "Toon betekenis", hide: "Verberg", next: "Volgende", listen: "Luister", submit: "Inleveren", retake: "Opnieuw", topicTravel: "Reizen", topicLanguage: "Taal", topicRoad: "Rijden & lopen", topicVisa: "Visum & verblijf", topicNomad: "Remote & nomade", appLanguage: "App-taal" };

export const DICTS: Record<Locale, Dict> = { en, fr, ja, nl };
export function tr(locale: Locale, key: string) { return DICTS[locale]?.[key] ?? en[key] ?? key; }
