"use client";
import { useState } from "react";
import { PHRASEBOOK } from "@/lib/phrasebook";

export function Phrasebook({ initial = "jp" }: { initial?: string }) {
  const [code, setCode] = useState(initial);
  const pb = PHRASEBOOK[code];
  const [cat, setCat] = useState(0);
  const speak = (t: string) => { if (window.speechSynthesis) { const u = new SpeechSynthesisUtterance(t); u.lang = pb.speech; u.rate = 0.85; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); } };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">{Object.entries(PHRASEBOOK).map(([k, v]) => (
        <button key={k} onClick={() => { setCode(k); setCat(0); }} className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${k === code ? "border-delft bg-delft text-white" : "border-slate-200"}`}>{v.lang}</button>
      ))}</div>
      <div className="flex gap-2 overflow-x-auto pb-1">{pb.cats.map((c, i) => (
        <button key={i} onClick={() => setCat(i)} className={`flex-none rounded-full border px-3 py-1.5 text-sm font-semibold ${i === cat ? "border-delft bg-delft/10 text-delft" : "border-slate-200"}`}>{c.icon} {c.title}</button>
      ))}</div>
      <ul className="space-y-2">{pb.cats[cat].phrases.map((p, i) => (
        <li key={i} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div><p className="font-read text-lg font-bold">{p[1]}</p>{p[2] && <p className="text-xs text-slate-400">{p[2]}</p>}<p className="text-sm text-slate-500">{p[0]}</p></div>
          <button onClick={() => speak(p[1])} aria-label="Listen" className="flex-none rounded-full bg-delft/10 px-3 py-2 text-delft">🔊</button>
        </li>
      ))}</ul>
      <p className="text-xs text-slate-400">Works offline. Tap 🔊 for audio (uses your device voices).</p>
    </div>
  );
}
