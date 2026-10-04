"use client";
import { useState } from "react";
import { TRAVEL } from "@/lib/travel";
import { planItinerary } from "@/lib/itinerary";
import { makePDF, itineraryBlocks } from "@/lib/pdf";

const COUNTRIES = [["jp", "🇯🇵 Japan"], ["nl", "🇳🇱 Netherlands"], ["fr", "🇫🇷 France"]];
const INTERESTS = [["history", "History"], ["art", "Art & museums"], ["landmark", "Landmarks"], ["nature", "Nature & parks"], ["food", "Food & markets"], ["view", "Views"], ["family", "Family"]];

export function ItineraryPlanner({ schengen = false }: { schengen?: boolean }) {
  const [code, setCode] = useState(schengen ? "nl" : "jp");
  const [days, setDays] = useState(schengen ? 8 : 7);
  const [base, setBase] = useState("");
  const [pace, setPace] = useState("balanced");
  const [interests, setInterests] = useState<string[]>([]);
  const [combine, setCombine] = useState(schengen);
  const tv = TRAVEL[code];
  const extraTv = schengen && combine ? TRAVEL[code === "nl" ? "fr" : "nl"] : null;
  const plan = planItinerary(tv, { days, base: base || tv.hub, pace, interests, extraTv });

  return (
    <div className="space-y-4">
      {!schengen && (
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map(([k, l]) => (
            <button key={k} onClick={() => setCode(k)} className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${k === code ? "border-travel bg-travel text-white" : "border-slate-200"}`}>{l}</button>
          ))}
        </div>
      )}
      {schengen && (
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={combine} onChange={(e) => setCombine(e.target.checked)} /> Combine Netherlands + France</label>
      )}
      <label className="block text-sm font-semibold">Base location
        <input value={base} onChange={(e) => setBase(e.target.value)} placeholder={tv.hub} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </label>
      <label className="block text-sm font-semibold">Days: {days}
        <input type="range" min={schengen ? 3 : 2} max={21} value={days} onChange={(e) => setDays(+e.target.value)} className="w-full" />
      </label>
      <div>
        <p className="text-sm font-semibold">Pace</p>
        <div className="mt-1 flex gap-2">{["relaxed", "balanced", "packed"].map((p) => (
          <button key={p} onClick={() => setPace(p)} className={`rounded-full border px-3 py-1.5 text-sm ${p === pace ? "border-travel bg-travel text-white" : "border-slate-200"}`}>{p[0].toUpperCase() + p.slice(1)}</button>
        ))}</div>
      </div>
      <div>
        <p className="text-sm font-semibold">What do you enjoy? (we won't stack museums)</p>
        <div className="mt-1 flex flex-wrap gap-2">{INTERESTS.map(([k, l]) => (
          <button key={k} onClick={() => setInterests(interests.includes(k) ? interests.filter((x) => x !== k) : [...interests, k])}
            className={`rounded-full border px-3 py-1.5 text-sm ${interests.includes(k) ? "border-travel bg-travel text-white" : "border-slate-200"}`}>{l}</button>
        ))}</div>
      </div>
      <div className="flex gap-2"><button onClick={() => makePDF({ filename: `itinerary-${code}.pdf`, title: `Itinerary — ${tv.country}`, subtitle: `${days}-day plan`, fields: [{ label: "Base", value: base || tv.hub }, { label: "Days", value: String(days) }], blocks: itineraryBlocks(tv, { days, base: base || tv.hub, pace, interests, extraTv }) })} className="rounded-lg bg-travel px-4 py-2 font-semibold text-white">Download PDF</button></div>
      {plan.overcommit && <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-800">🌿 That's a lot for the days you picked. We kept it calm; add days to fit more without the rush.</div>}
      <div className="space-y-3">
        {plan.days.map((day: any, i: number) => (
          <div key={i} className="border-t border-slate-200 pt-3">
            <h3 className="font-read font-bold text-travel">{day.title}</h3>
            <p className="text-sm text-slate-500">{day.note}</p>
            {day.stops.length > 0 && <ul className="mt-2 space-y-2">{day.stops.map((s: any, j: number) => (
              <li key={j} className="border-t border-dashed border-slate-100 pt-2 first:border-0">
                <strong>{s.name}</strong>{s.label && <span className="ml-1 rounded-full bg-travel/10 px-2 py-0.5 text-xs font-semibold text-travel">{s.label}</span>}
                {s.why && <p className="text-sm text-slate-500">{s.why}</p>}
                {s.station && <p className="text-sm text-slate-500">Near: {s.station}</p>}
                <a href={s.dir} target="_blank" rel="noopener" className="text-sm font-semibold text-travel">🚆 Directions</a>
              </li>
            ))}</ul>}
          </div>
        ))}
      </div>
    </div>
  );
}
