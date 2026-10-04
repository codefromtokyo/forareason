import type { MetadataRoute } from "next";
import { COUNTRIES } from "@/lib/countries";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE || "https://forareason.vercel.app";
  const urls: MetadataRoute.Sitemap = [
    { url: base, priority: 1 },
    { url: `${base}/about` }, { url: `${base}/community` }, { url: `${base}/tools` },
    { url: `${base}/tools/cost` }, { url: `${base}/tools/itinerary` }, { url: `${base}/tools/roadtrip` },
    { url: `${base}/tools/letters` }, { url: `${base}/tools/visa-check` }, { url: `${base}/tools/settle` }, { url: `${base}/tools/phrasebook` }, { url: `${base}/tools/deadlines` }, { url: `${base}/community/members` },
  ];
  COUNTRIES.forEach((c) => c.topics.forEach((t) => urls.push({ url: `${base}/${c.code}/${t}` })));
  return urls;
}
