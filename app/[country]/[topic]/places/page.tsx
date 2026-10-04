import Link from "next/link";
import { notFound } from "next/navigation";
import { countryByCode, TOPIC_COLOR } from "@/lib/countries";
import { TRAVEL } from "@/lib/travel";

const CAT_L: Record<string, string> = { history: "History", art: "Art & museums", landmark: "Landmark", nature: "Nature & parks", food: "Food & markets", view: "Views", family: "Family" };
const CAT_EMOJI: Record<string, string> = { history: "🏛️", art: "🖼️", landmark: "📸", nature: "🌿", food: "🍜", view: "🔭", family: "🦌" };

export default async function Places({ params }: { params: Promise<{ country: string; topic: string }> }) {
  const { country, topic } = await params;
  if (topic !== "travel") notFound();
  const tv = TRAVEL[country];
  if (!tv) notFound();
  const color = TOPIC_COLOR.travel;
  const cities: string[] = [];
  tv.spots.forEach((s: any) => { if (!cities.includes(s.city)) cities.push(s.city); });

  return (
    <div className="space-y-4">
      <Link href={`/${country}/${topic}`} className="text-sm font-semibold" style={{ color }}>← {tv.country}</Link>
      <section className="rounded-2xl p-6 text-white shadow-lg" style={{ background: color }}>
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">Travel · {tv.country}</p>
        <h1 className="mt-1 font-read text-3xl font-bold">Places to go</h1>
        <p className="mt-2 text-white/90">Tap a place for a self-guide and directions.</p>
      </section>
      {cities.map((city) => (
        <section key={city} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-read text-lg font-bold">{city}</h2>
          <div className="grid grid-cols-2 gap-3">
            {tv.spots.map((s: any, i: number) => s.city === city ? (
              <Link key={i} href={`/${country}/${topic}/places/${i}`}
                className="overflow-hidden rounded-xl border border-slate-200 shadow-sm hover:border-[color:var(--tc)]" style={{ ["--tc" as any]: color }}>
                <div className="flex h-24 items-center justify-center text-3xl" style={{ background: color + "22" }}>{CAT_EMOJI[s.cat] || "📍"}</div>
                <div className="p-3">
                  <strong className="font-read text-[15px]">{s.name}</strong>
                  {s.cat && <span className="ml-1 rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ background: color + "22", color }}>{CAT_L[s.cat]}</span>}
                  {s.why && <p className="mt-1 text-xs text-slate-500">{s.why}</p>}
                </div>
              </Link>
            ) : null)}
          </div>
        </section>
      ))}
    </div>
  );
}
