import Link from "next/link";
import { notFound } from "next/navigation";
import { countryByCode, TOPIC_COLOR } from "@/lib/countries";
import { TRAVEL, GUIDES, GUIDE_EXTRA } from "@/lib/travel";
import { mapsDir } from "@/lib/maps";

const CAT_L: Record<string, string> = { history: "History", art: "Art & museums", landmark: "Landmark", nature: "Nature & parks", food: "Food & markets", view: "Views", family: "Family" };

export default async function PlaceDetail({ params }: { params: Promise<{ country: string; topic: string; idx: string }> }) {
  const { country, topic, idx } = await params;
  if (topic !== "travel") notFound();
  const tv = TRAVEL[country];
  const sp = tv?.spots?.[Number(idx)];
  if (!sp) notFound();
  const color = TOPIC_COLOR.travel;
  const base = tv.hub || tv.country;
  const g = { ...(GUIDES[sp.name] || {}), ...(GUIDE_EXTRA[sp.name] || {}) };

  return (
    <div className="space-y-4">
      <Link href={`/${country}/${topic}/places`} className="text-sm font-semibold" style={{ color }}>← Places</Link>
      <section className="rounded-2xl p-6 text-white shadow-lg" style={{ background: color }}>
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">{sp.city} · {CAT_L[sp.cat] || sp.cat}</p>
        <h1 className="mt-1 font-read text-3xl font-bold">{sp.name}</h1>
        {sp.why && <p className="mt-2 text-white/90">{sp.why}</p>}
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p><strong>🚉 Getting there:</strong> {sp.station || "—"}</p>
        <a href={mapsDir(base, `${sp.name}, ${sp.city || tv.country}`)} target="_blank" rel="noopener"
          className="mt-3 inline-block rounded-lg px-4 py-2 font-semibold text-white" style={{ background: color }}>🚆 Directions (transit)</a>
      </section>
      {g.about && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 font-read text-lg font-bold">📖 Self-guide</h2>
          <p className="text-slate-700">{g.about}</p>
          <div className="my-3 grid grid-cols-2 gap-2">
            {g.howLong && <div className="rounded-lg p-2" style={{ background: color + "22" }}><b className="block text-xs" style={{ color }}>⏱️ How long</b>{g.howLong}</div>}
            {g.bestTime && <div className="rounded-lg p-2" style={{ background: color + "22" }}><b className="block text-xs" style={{ color }}>🗓️ Best time</b>{g.bestTime}</div>}
          </div>
          {g.seeDo && <><h3 className="text-sm font-bold" style={{ color }}>See & do</h3><ul className="mt-1 space-y-1 text-slate-700">{g.seeDo.map((x: string, i: number) => <li key={i}>• {x}</li>)}</ul></>}
          {g.eat && <><h3 className="mt-3 text-sm font-bold" style={{ color }}>🍽️ Eat nearby</h3><p className="text-slate-700">{g.eat}</p></>}
          {g.tip && <><h3 className="mt-3 text-sm font-bold" style={{ color }}>💡 Tip</h3><p className="text-slate-700">{g.tip}</p></>}
          <p className="mt-3 text-xs text-slate-400">AI-written; double-check details.</p>
        </section>
      )}
    </div>
  );
}
