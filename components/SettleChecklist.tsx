"use client";
import { useEffect, useState } from "react";
import { SETTLE } from "@/lib/settle";

export function SettleChecklist() {
  const [code, setCode] = useState("jp");
  const [ticks, setTicks] = useState<Record<string, boolean>>({});
  useEffect(() => { try { setTicks(JSON.parse(localStorage.getItem("forareason-settle") || "{}")); } catch {} }, []);
  const set = (k: string, v: boolean) => { const n = { ...ticks, [k]: v }; setTicks(n); try { localStorage.setItem("forareason-settle", JSON.stringify(n)); } catch {} };
  const s = SETTLE[code];
  const done = s.steps.filter((_, i) => ticks[`${code}:${i}`]).length;
  return (
    <div className="space-y-4">
      <div className="flex gap-2">{Object.entries(SETTLE).map(([k, v]) => (
        <button key={k} onClick={() => setCode(k)} className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${k === code ? "border-delft bg-delft text-white" : "border-slate-200"}`}>{v.country.replace("the ", "")}</button>
      ))}</div>
      <div className="flex items-center gap-2"><div className="h-2 flex-1 overflow-hidden rounded bg-slate-200"><div className="h-full bg-delft" style={{ width: `${(done / s.steps.length) * 100}%` }} /></div><span className="text-sm font-semibold text-delft">{done}/{s.steps.length}</span></div>
      <ul className="space-y-2">{s.steps.map((st, i) => {
        const k = `${code}:${i}`;
        return (
          <li key={i} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={!!ticks[k]} onChange={(e) => set(k, e.target.checked)} className="mt-1 h-5 w-5" />
              <span><strong className={ticks[k] ? "text-slate-400 line-through" : ""}>{st.title}</strong><p className="mt-1 text-sm text-slate-600">{st.body}</p></span>
            </label>
          </li>
        );
      })}</ul>
      <p className="text-sm">{s.sources.map((o, i) => <a key={i} href={o[1]} target="_blank" rel="noopener" className="mr-2 underline text-delft">{o[0]}</a>)}</p>
      <p className="text-xs text-amber-700">A checklist to save you time, not legal advice. Steps vary by situation; confirm officially.</p>
    </div>
  );
}
