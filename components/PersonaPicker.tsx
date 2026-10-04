"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const PERSONAS: { id: string; icon: string; label: string; blurb: string; links: [string, string][] }[] = [
  { id: "student", icon: "🎓", label: "Student", blurb: "Campus, class, housing and a part-time job in the local language.", links: [["Student visa", "/jp/visa"], ["Learn the language", "/jp/language"], ["Settle-in checklist", "/tools/settle"]] },
  { id: "employee", icon: "💼", label: "Relocating for work", blurb: "Work visa, settle-in admin, and what your pay is really worth.", links: [["Visa & residency", "/nl/visa"], ["Cost & take-home", "/tools/cost"], ["Settle-in checklist", "/tools/settle"]] },
  { id: "traveller", icon: "✈️", label: "Travelling", blurb: "Get around, eat, stay safe — one hour before your trip.", links: [["Travel guide", "/jp/travel"], ["Phrasebook", "/tools/phrasebook"], ["Day-by-day itinerary", "/tools/itinerary"]] },
  { id: "family", icon: "💛", label: "Joining family / dependent", blurb: "Moving with a partner? Your visa, your work rights, and a community so you're not alone.", links: [["Dependent visa & work rights", "/nl/visa"], ["Community & meetups", "/community"], ["Learn the language", "/nl/language"]] },
];

export function PersonaPicker() {
  const [sel, setSel] = useState<string | null>(null);
  useEffect(() => { try { setSel(localStorage.getItem("forareason-persona")); } catch {} }, []);
  const pick = (id: string) => { setSel(id); try { localStorage.setItem("forareason-persona", id); } catch {} };
  const p = PERSONAS.find((x) => x.id === sel);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-2 font-read text-lg font-bold">Who are you here as?</h2>
      <div className="grid grid-cols-2 gap-2">{PERSONAS.map((x) => (
        <button key={x.id} onClick={() => pick(x.id)} className={`rounded-xl border p-3 text-left ${sel === x.id ? "border-delft bg-delft/5" : "border-slate-200"}`}>
          <span className="text-xl">{x.icon}</span><strong className="mt-1 block text-sm">{x.label}</strong>
        </button>
      ))}</div>
      {p && (
        <div className="mt-3 rounded-xl bg-slate-50 p-3">
          <p className="text-sm text-slate-600">{p.blurb}</p>
          <div className="mt-2 flex flex-wrap gap-2">{p.links.map(([l, h]) => <Link key={h} href={h} className="rounded-full border border-delft px-3 py-1 text-sm font-semibold text-delft">{l}</Link>)}</div>
        </div>
      )}
    </section>
  );
}
