"use client";
import { useEffect, useState } from "react";

interface Doc { id: string; type: string; label: string; expiry: string; }
const TYPES = ["Passport", "Visa", "Residence permit", "Health insurance", "Driving licence", "Other"];
const KEY = "forareason-deadlines";

export function Deadlines() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [type, setType] = useState("Visa");
  const [label, setLabel] = useState("");
  const [expiry, setExpiry] = useState("");
  useEffect(() => { try { setDocs(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch {} }, []);
  const persist = (d: Doc[]) => { setDocs(d); try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {} };
  const add = () => { if (!expiry) return; const d = [...docs, { id: Math.random().toString(36).slice(2), type, label: label || type, expiry }]; persist(d); setLabel(""); setExpiry(""); };
  const remove = (id: string) => persist(docs.filter((x) => x.id !== id));
  const days = (e: string) => Math.ceil((+new Date(e) - Date.now()) / 86400000);
  const sorted = [...docs].sort((a, b) => +new Date(a.expiry) - +new Date(b.expiry));

  return (
    <div className="space-y-4">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="font-read text-lg font-bold">Add a document</h2>
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
        <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label (optional, e.g. Work visa)" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        <label className="block text-sm font-semibold">Expiry date<input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
        <button onClick={add} className="rounded-lg bg-delft px-4 py-2 font-semibold text-white">Add</button>
      </section>
      {sorted.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-500 shadow-sm">Nothing tracked yet. Add your passport, visa or permit so you never miss a renewal.</p>
      ) : (
        <ul className="space-y-2">{sorted.map((d) => {
          const left = days(d.expiry);
          const tone = left < 0 ? "border-red-400 bg-red-50 text-red-700" : left < 60 ? "border-amber-400 bg-amber-50 text-amber-800" : "border-emerald-300 bg-emerald-50 text-emerald-700";
          return (
            <li key={d.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div><strong>{d.label}</strong><p className="text-sm text-slate-500">{d.type} · {new Date(d.expiry).toLocaleDateString()}</p></div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${tone}`}>{left < 0 ? `Expired ${-left}d ago` : `${left}d left`}</span>
                <button onClick={() => remove(d.id)} className="text-slate-400" aria-label="Remove">✕</button>
              </div>
            </li>
          );
        })}</ul>
      )}
      <p className="text-xs text-slate-400">Stored on this device only. We never upload your documents. Renew well before expiry — permits often need 1–3 months.</p>
    </div>
  );
}
