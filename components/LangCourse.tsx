"use client";
import { useState } from "react";
import Link from "next/link";
import { LangCfg } from "@/lib/lang";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { totalDue } from "@/lib/srs";
import { useEffect } from "react";

type Tab = "vocab" | "grammar" | "order";

export function LangCourse({ lang, country }: { lang: LangCfg; country: string }) {
  const { t } = useI18n();
  const [level, setLevel] = useState(lang.levels[0]);
  const [tab, setTab] = useState<Tab>("vocab");
  const d = lang.data[level];
  const [due, setDue] = useState(0);
  useEffect(() => { setDue(totalDue(country, level, d.vocab || [])); }, [level, country]);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text); u.lang = lang.speech; u.rate = 0.9;
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {lang.levels.map((l) => (
          <button key={l} onClick={() => setLevel(l)} className={`rounded-full border px-3 py-1.5 text-sm font-bold ${l === level ? "border-delft bg-delft text-white" : "border-slate-200"}`}>{l}</button>
        ))}
        <Link href={`/${country}/language/review?level=${level}`} className="ml-auto rounded-lg bg-delft px-3 py-1.5 text-sm font-semibold text-white">🔥 Review{due ? ` (${due})` : ""}</Link>
        <Link href={`/${country}/language/exam?level=${level}`} className="rounded-lg border border-delft px-3 py-1.5 text-sm font-semibold text-delft">{t("mockTest")} →</Link>
      </div>

      <div className="flex gap-4 border-b border-slate-200 text-sm font-semibold">
        {([["vocab", t("coreWords")], ["grammar", t("grammar")], ["order", t("sentences")]] as [Tab, string][]).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`-mb-px border-b-2 pb-2 ${tab === k ? "border-delft text-delft" : "border-transparent text-slate-500"}`}>{l}</button>
        ))}
      </div>

      {tab === "vocab" && <VocabQuiz words={d.vocab || []} speak={speak} />}
      {tab === "grammar" && <Grammar grammar={d.grammar || []} />}
      {tab === "order" && <Sentences order={d.order || []} speak={speak} />}
    </div>
  );
}

function VocabQuiz({ words, speak }: { words: [string, string][]; speak: (t: string) => void }) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const w = words[i % words.length];
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-sm text-slate-400">{(i % words.length) + 1} / {words.length}</p>
      <h2 className="mt-2 font-read text-3xl font-bold">{w[0]}</h2>
      <button onClick={() => speak(w[0])} className="mt-2 text-delft">🔊 Listen</button>
      <p className="mt-4 min-h-[1.5rem] text-lg text-slate-600">{show ? w[1] : "·····"}</p>
      <div className="mt-4 flex justify-center gap-2">
        <button onClick={() => setShow(!show)} className="rounded-lg border border-slate-300 px-4 py-2 font-semibold">{show ? "Hide" : "Show meaning"}</button>
        <button onClick={() => { setShow(false); setI(i + 1); }} className="rounded-lg bg-delft px-4 py-2 font-semibold text-white">Next</button>
      </div>
    </section>
  );
}

function Grammar({ grammar }: { grammar: any[] }) {
  return (
    <div className="space-y-4">
      {grammar.map((g, gi) => (
        <section key={gi} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-read text-lg font-bold">{g.title}</h2>
          <ul className="mt-2 space-y-1 text-slate-700">{g.notes.map((n: string, i: number) => <li key={i}>• {n}</li>)}</ul>
          <div className="mt-3 space-y-3">{g.drills.map((dr: any, di: number) => <Drill key={di} dr={dr} />)}</div>
        </section>
      ))}
    </div>
  );
}
function shuffled(o: string[]) {
  const arr = o.map((v, i) => ({ v, i }));
  for (let k = arr.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [arr[k], arr[j]] = [arr[j], arr[k]]; }
  return arr;
}
function Drill({ dr }: { dr: any }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [opts] = useState(() => shuffled(dr.o));
  return (
    <div className="rounded-lg border border-slate-100 p-3">
      <p className="font-semibold">{dr.q}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {opts.map((o, oi) => (
          <button key={oi} disabled={picked != null} onClick={() => setPicked(oi)}
            className={`rounded-lg border px-3 py-1.5 text-sm ${picked != null && o.i === 0 ? "border-emerald-500 bg-emerald-50" : picked === oi ? "border-red-400 bg-red-50" : "border-slate-200"}`}>{o.v}</button>
        ))}
      </div>
      {picked != null && <p className="mt-2 text-sm text-slate-600">{opts[picked].i === 0 ? "✓ " : "✗ "}{dr.why}</p>}
    </div>
  );
}
function Sentences({ order, speak }: { order: [string, string][]; speak: (t: string) => void }) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const s = order[i % order.length];
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-400">Sentence {(i % order.length) + 1} / {order.length}</p>
      <h2 className="mt-2 font-read text-xl font-bold">{s[0]}</h2>
      <p className="mt-3 min-h-[1.5rem] text-lg text-delft">{show ? s[1] : "Tap to reveal the translation"}</p>
      {show && <button onClick={() => speak(s[1])} className="mt-1 text-delft">🔊 Listen</button>}
      <div className="mt-4 flex gap-2">
        <button onClick={() => setShow(!show)} className="rounded-lg border border-slate-300 px-4 py-2 font-semibold">{show ? "Hide" : "Reveal"}</button>
        <button onClick={() => { setShow(false); setI(i + 1); }} className="rounded-lg bg-delft px-4 py-2 font-semibold text-white">Next</button>
      </div>
    </section>
  );
}
