"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { LangCfg } from "@/lib/lang";
import { loadSrs, dueCards, grade, SrsState } from "@/lib/srs";

export function Review({ lang, country, level }: { lang: LangCfg; country: string; level: string }) {
  const words: [string, string][] = lang.data[level]?.vocab || [];
  const [s, setS] = useState<SrsState>(() => (typeof window === "undefined" ? ({ cards: {}, streak: 0, reviewedToday: 0, dayGoal: 15 } as SrsState) : loadSrs()));
  const queue = useMemo(() => dueCards(s, country, level, words, 20), [level]); // fixed session
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(0);

  const speak = (text: string) => { if (window.speechSynthesis) { const u = new SpeechSynthesisUtterance(text); u.lang = lang.speech; u.rate = 0.9; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); } };

  if (queue.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <div className="text-3xl">✅</div>
        <h2 className="mt-2 font-read text-xl font-bold">All caught up</h2>
        <p className="text-slate-600">No cards due for {level} right now. Come back tomorrow to keep your streak.</p>
        <Link href={`/${country}/language`} className="mt-3 inline-block rounded-lg bg-delft px-4 py-2 font-semibold text-white">Back to course</Link>
      </div>
    );
  }
  if (i >= queue.length) {
    const ns = loadSrs();
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <div className="text-3xl">🎉</div>
        <h2 className="mt-2 font-read text-xl font-bold">Session done — {done} reviewed</h2>
        <p className="text-slate-600">🔥 {ns.streak}-day streak. Daily goal {ns.dayGoal}.</p>
        <Link href={`/${country}/language`} className="mt-3 inline-block rounded-lg bg-delft px-4 py-2 font-semibold text-white">Back to course</Link>
      </div>
    );
  }

  const card = queue[i];
  const answer = (correct: boolean) => { const ns = grade(loadSrs(), card.key, correct); setS(ns); setDone(done + 1); setShow(false); setI(i + 1); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>{i + 1} / {queue.length}</span>
        <span>🔥 {s.streak} day{card.isNew ? " · new word" : ""}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded bg-slate-200"><div className="h-full bg-delft" style={{ width: `${(i / queue.length) * 100}%` }} /></div>
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="font-read text-4xl font-bold">{card.word}</h2>
        <button onClick={() => speak(card.word)} className="mt-2 text-delft">🔊 Listen</button>
        <p className="mt-6 min-h-[1.75rem] text-xl text-slate-600">{show ? card.meaning : ""}</p>
        {!show ? (
          <button onClick={() => setShow(true)} className="mt-4 rounded-lg border border-slate-300 px-6 py-2 font-semibold">Show answer</button>
        ) : (
          <div className="mt-4 flex justify-center gap-3">
            <button onClick={() => answer(false)} className="rounded-lg border border-red-300 bg-red-50 px-6 py-2 font-semibold text-red-700">Again</button>
            <button onClick={() => answer(true)} className="rounded-lg border border-emerald-400 bg-emerald-50 px-6 py-2 font-semibold text-emerald-700">Got it</button>
          </div>
        )}
      </section>
    </div>
  );
}
