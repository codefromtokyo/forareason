"use client";
import { useState } from "react";
import { VISA_CHECK, SCHENGEN } from "@/lib/visacheck";

const PASSPORTS = [["in", "Indian"], ["us", "US"], ["eu", "EU / EEA"], ["gb", "UK"], ["other", "Other"]];

export function VisaCheck() {
  const [code, setCode] = useState("nl");
  const [pass, setPass] = useState("in");
  const [ticks, setTicks] = useState<Record<string, boolean>>({});
  const baseVc = VISA_CHECK[code];
  const vc = baseVc?.schengen ? { ...baseVc, exempt: SCHENGEN.exempt, visa: SCHENGEN.visa } : baseVc;
  const needsVisa = !(pass === "eu" || pass === "us" || pass === "gb");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">{[["jp", "Japan"], ["nl", "Netherlands"], ["fr", "France"]].map(([k, l]) => (
        <button key={k} onClick={() => setCode(k)} className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${k === code ? "border-visa bg-visa text-white" : "border-slate-200"}`}>{l}</button>
      ))}</div>
      <p className="text-sm font-semibold">Your passport:</p>
      <div className="flex flex-wrap gap-2">{PASSPORTS.map(([k, l]) => (
        <button key={k} onClick={() => setPass(k)} className={`rounded-full border px-3 py-1.5 text-sm ${k === pass ? "border-visa bg-visa text-white" : "border-slate-200"}`}>{l}</button>
      ))}</div>

      {!needsVisa ? (
        <>
          <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 font-semibold text-emerald-800">✅ Your passport is visa-free for a short visit to {vc.country}.</div>
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-slate-700">{vc.exempt.note}</p>
            <p className="mt-2 text-sm text-slate-500">Visa-free passports include: {vc.exempt.list}.</p>
          </section>
        </>
      ) : (
        <>
          <div className="rounded-lg border border-visa bg-visa/5 p-3 font-semibold">🛂 Your passport needs a visa to visit {vc.country}.</div>
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="font-semibold">{vc.visa.type}</p>
            <p className="mt-1 text-sm text-slate-500">Where: {vc.visa.where} · {vc.visa.timeline}</p>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-read text-lg font-bold">Documents to collect</h3>
            <ul className="space-y-1">{vc.visa.docs.map((doc: string, i: number) => {
              const key = code + ":" + i;
              return (
                <li key={i}>
                  <label className="flex items-start gap-2 border-t border-slate-100 py-2 first:border-0">
                    <input type="checkbox" checked={!!ticks[key]} onChange={(e) => setTicks({ ...ticks, [key]: e.target.checked })} className="mt-1" />
                    <span className={ticks[key] ? "text-slate-400 line-through" : ""}>{doc}</span>
                  </label>
                </li>
              );
            })}</ul>
            <p className="mt-2 text-sm text-slate-500">{Object.values(ticks).filter(Boolean).length} / {vc.visa.docs.length} collected</p>
          </section>
          <a href="/tools/letters" className="inline-block rounded-lg bg-visa px-4 py-2 font-semibold text-white">Generate the letters →</a>
        </>
      )}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
        <p className="text-amber-700">A checklist to save you time, not legal advice. Confirm on the official site before you apply.</p>
        <p className="mt-2">{vc.official.map((o: string[], i: number) => <a key={i} href={o[1]} target="_blank" rel="noopener" className="mr-2 underline text-visa">{o[0]}</a>)}</p>
      </section>
    </div>
  );
}
