"use client";
import { useState } from "react";
import { NOMAD_WORLD } from "@/lib/nomad_global";

export function NomadWorld() {
  const W = NOMAD_WORLD;
  const [pk, setPk] = useState("in");
  const pp = W.passports[pk] || W.passports.other;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-1 font-read text-lg font-bold">🌍 Digital-nomad visas worldwide</h2>
      <p className="text-sm text-slate-500">50+ countries offer one. Rough figures, checked {W.updated}; confirm officially.</p>
      <p className="mt-3 text-sm font-semibold">For your passport:</p>
      <div className="mt-1 flex flex-wrap gap-2">
        {Object.entries(W.passports).map(([k, v]: any) => (
          <button key={k} onClick={() => setPk(k)}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${k === pk ? "border-nomad bg-nomad text-white" : "border-slate-200"}`}>
            {v.label}
          </button>
        ))}
      </div>
      <ul className="mt-2 space-y-1 text-slate-700">{pp.notes.map((n: string, i: number) => <li key={i}>• {n}</li>)}</ul>
      <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full min-w-[520px] text-sm">
          <thead><tr className="bg-nomad/10 text-left">{["Country", "Visa", "Income / savings", "Stay"].map((h) => <th key={h} className="whitespace-nowrap p-2 font-bold">{h}</th>)}</tr></thead>
          <tbody>{W.visas.map((r: string[], i: number) => (
            <tr key={i} className="border-t border-slate-100">{r.map((cell, j) => <td key={j} className={`whitespace-nowrap p-2 ${j === 0 ? "font-semibold" : ""}`}>{cell}</td>)}</tr>
          ))}</tbody>
        </table>
      </div>
    </section>
  );
}
