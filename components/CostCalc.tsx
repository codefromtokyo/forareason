"use client";
import { useState } from "react";
import { COST, netPay } from "@/lib/cost";

const fmt = (sym: string, n: number) => sym + Math.round(n).toLocaleString();

export function CostCalc() {
  const [code, setCode] = useState("nl");
  const [gross, setGross] = useState("");
  const [ruling, setRuling] = useState(false);
  const c = COST[code];
  const g = +gross || 0;
  const r = g > 0 ? netPay(code, g, ruling) : null;
  const mo = r ? Math.round(r.net / 12) : 0;

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {Object.keys(COST).map((k) => (
          <button key={k} onClick={() => setCode(k)}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${k === code ? "border-delft bg-delft text-white" : "border-slate-200"}`}>
            {COST[k].name.replace("the ", "")}
          </button>
        ))}
      </div>
      {code === "nl" && (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={ruling} onChange={(e) => setRuling(e.target.checked)} /> I have the 30% ruling
        </label>
      )}
      <label className="block text-sm font-semibold">Gross annual salary ({c.cur})
        <input value={gross} onChange={(e) => setGross(e.target.value)} inputMode="numeric" placeholder="e.g. 60000"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </label>
      {r && (
        <div className="rounded-xl border border-slate-200 p-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-delft/10 p-2"><b className="block font-read text-delft">{fmt(c.sym, r.net)}</b><span className="text-xs text-slate-500">Take-home / year</span></div>
            <div className="rounded-lg bg-delft/10 p-2"><b className="block font-read text-delft">{fmt(c.sym, mo)}</b><span className="text-xs text-slate-500">/ month</span></div>
            <div className="rounded-lg bg-delft/10 p-2"><b className="block font-read text-delft">{r.rate}%</b><span className="text-xs text-slate-500">Deductions</span></div>
          </div>
          <ul className="mt-2 text-sm">
            {r.rows.map((row: any[], i: number) => (
              <li key={i} className="flex justify-between border-t border-slate-100 py-1"><span>{row[0]}</span><b>{row[1] < 0 ? "" : "-"}{fmt(c.sym, Math.abs(row[1]))}</b></li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg border border-slate-200 p-2"><b className="block text-delft">Rent, centre</b>{fmt(c.sym, c.rent.centre[0])}–{fmt(c.sym, c.rent.centre[1])}/mo</div>
        <div className="rounded-lg border border-slate-200 p-2"><b className="block text-delft">Rent, outside</b>{fmt(c.sym, c.rent.outside[0])}–{fmt(c.sym, c.rent.outside[1])}/mo</div>
      </div>
      <p><strong>What you get:</strong> {c.whatYouGet}</p>
      <p className="text-xs text-amber-700">Rough estimates for a single person; not tax or financial advice.</p>
    </div>
  );
}
