export type TopicKey = "travel" | "language" | "road" | "visa" | "nomad";

export const TOPIC_LABEL: Record<TopicKey, string> = {
  travel: "Travel",
  language: "Language",
  road: "Driving & walking",
  visa: "Visa & residency",
  nomad: "Remote & nomad",
};

export const TOPIC_COLOR: Record<TopicKey, string> = {
  travel: "#0F766E",
  language: "#1D4BA8",
  road: "#15803D",
  visa: "#4338CA",
  nomad: "#B45309",
};

export interface Country {
  code: string;
  name: string;
  flag: string;
  topics: TopicKey[];
}

export const COUNTRIES: Country[] = [
  { code: "jp", name: "Japan", flag: "🇯🇵", topics: ["travel", "language", "road", "visa", "nomad"] },
  { code: "nl", name: "Netherlands", flag: "🇳🇱", topics: ["travel", "language", "road", "visa", "nomad"] },
  { code: "fr", name: "France", flag: "🇫🇷", topics: ["travel", "language", "visa", "nomad"] },
];

export const countryByCode = (code: string) => COUNTRIES.find((c) => c.code === code);
