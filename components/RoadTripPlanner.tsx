"use client";
import { useState } from "react";
import { TRAVEL } from "@/lib/travel";
import { planRoadTrip } from "@/lib/itinerary";

export function RoadTripPlanner() {
  const [code, setCode] = useState("nl");
  const [days, setDays] = useState(5);
  const [base, setBase] = useState("");
  const tv = TRAVEL[code];
  const plan = planRoadTrip(tv, { days, base: base || tv.hub });
  return (
    <div className="space-y-4">
      <div className="flex gap-2">{[["jp", "🇯🇵 Japan"], ["nl", "🇳🇱 Netherlands"], ["fr", "🇫🇷 France"]].map(([k, l]) => (
        <button key={k} onClick={() => setCode(k)} className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${k === code ? "border-road bg-road text-white" : "border-slate-200"}`}>{l}</button>
      ))}</div>
      <label className="block text-sm font-semibold">Start / base <input value={base} onChange={(e) => setBase(e.target.value)} placeholder={tv.hub} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
      <label className="block text-sm font-semibold">Days: {days}<input type="range" min={2} max={14} value={days} onChange={(e) => setDays(+e.target.value)} className="w-full" /></label>
      <div className="space-y-3">{plan.days.map((day: any, i: number) => (
        <div key={i} className="border-t border-slate-200 pt-3">
          <h3 className="font-read font-bold text-road">{day.title}</h3>
          <p className="font-semibold">🚗 <a href={day.leg.dir} target="_blank" rel="noopener" className="text-road underline">{day.leg.from} → {day.leg.to}</a> · live driving directions</p>
          <p className="text-sm text-slate-500">{day.note}</p>
          {day.stops.length > 0 && <ul className="mt-1">{day.stops.map((s: any, j: number) => <li key={j}><strong>{s.name}</strong>{s.why && <> — <span className="text-sm text-slate-500">{s.why}</span></>}</li>)}</ul>}
        </div>
      ))}</div>
    </div>
  );
}
