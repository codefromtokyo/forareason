"use client";
import { useState } from "react";
import { LangCfg } from "@/lib/lang";

const READY = 60;

export function MockTest({ lang, country, initial }: { lang: LangCfg; country: string; initial: string }) {
  const [level, setLevel] = useState(lang.levels.includes(initial) ? initial : lang.levels[0]);
  const [section, setSection] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const exam = lang.data[level]?.exam || {};
  // stable shuffle per question keyed by level+section+indices
  function shuf(o: string[], seedKey: string) {
    const arr = o.map((v, i) => ({ v, i }));
    let seed = 0; for (const ch of seedKey) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    for (let k = arr.length - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [arr[k], arr[j]] = [arr[j], arr[k]]; }
    return arr;
  }
  const sections = ["reading", "listening"].filter((s) => Array.isArray(exam[s]) && exam[s].length);

  if (!section) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {lang.levels.map((l) => <button key={l} onClick={() => setLevel(l)} className={`rounded-full border px-3 py-1.5 text-sm font-bold ${l === level ? "border-delft bg-delft text-white" : "border-slate-200"}`}>{l}</button>)}
        </div>
        <p className="text-slate-600">{lang.test} {level} mock. Pick a section. Pass mark {READY}%.</p>
        <div className="grid gap-3">
          {sections.map((s) => {
            const count = exam[s].reduce((n: number, p: any) => n + (p.qs?.length || 0), 0);
            return (
              <button key={s} onClick={() => { setSection(s); setAnswers({}); setSubmitted(false); }}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-delft">
                <span className="font-semibold capitalize">{s}</span>
                <span className="text-sm text-slate-500">{count} questions · {exam.minutes?.[s] ?? "—"} min</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const parts = exam[section];
  let total = 0, correct = 0;
  parts.forEach((p: any, pi: number) => p.qs.forEach((q: any, qi: number) => {
    total++;
    const key = `${pi}:${qi}`;
    const opts = shuf(q.o, `${level}-${section}-${pi}-${qi}`);
    const correctIdx = opts.findIndex((o) => o.i === 0);
    if (answers[key] === correctIdx) correct++;
  }));
  const score = total ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="space-y-4">
      <button onClick={() => setSection(null)} className="text-sm font-semibold text-delft">← Sections</button>
      <h2 className="font-read text-xl font-bold capitalize">{section} · {level}</h2>
      {parts.map((p: any, pi: number) => (
        <section key={pi} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          {p.title && <h3 className="font-bold">{p.title}</h3>}
          {p.text && <p className="mt-1 whitespace-pre-line rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{p.text}</p>}
          {p.script && <button onClick={() => { const u = new SpeechSynthesisUtterance(p.script); u.lang = lang.speech; u.rate = 0.9; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); }} className="mt-1 rounded-lg border border-delft px-3 py-1.5 text-sm font-semibold text-delft">🔊 Play audio</button>}
          <div className="mt-3 space-y-3">
            {p.qs.map((q: any, qi: number) => {
              const key = `${pi}:${qi}`; const picked = answers[key];
              const opts = shuf(q.o, `${level}-${section}-${pi}-${qi}`);
              const correctIdx = opts.findIndex((o) => o.i === 0);
              return (
                <div key={qi}>
                  <p className="font-semibold">{q.q}</p>
                  <div className="mt-1 flex flex-col gap-1">
                    {opts.map((o, oi) => (
                      <button key={oi} disabled={submitted} onClick={() => setAnswers({ ...answers, [key]: oi })}
                        className={`rounded-lg border px-3 py-2 text-left text-sm ${submitted ? (oi === correctIdx ? "border-emerald-500 bg-emerald-50" : picked === oi ? "border-red-400 bg-red-50" : "border-slate-200") : picked === oi ? "border-delft bg-delft/5" : "border-slate-200"}`}>{o.v}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
      {!submitted ? (
        <button onClick={() => setSubmitted(true)} className="w-full rounded-lg bg-delft py-3 font-semibold text-white">Submit</button>
      ) : (
        <div className={`rounded-2xl p-4 text-center ${score >= READY ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
          <p className="font-read text-2xl font-bold">{score}%</p>
          <p>{score >= READY ? `On track for ${level}.` : "No fail here — if the real exam asked something not covered, tell us so we add it."}</p>
          <button onClick={() => { setSubmitted(false); setAnswers({}); }} className="mt-2 rounded-lg border border-current px-4 py-1.5 font-semibold">Retake</button>
        </div>
      )}
    </div>
  );
}
