"use client";
import { useState } from "react";

const REASONS = (hasWritten: boolean) => [
  ["rules", "Learn the rules", "Drive, ride, walk safely"],
  ["travel", "Drive as a visitor", "Rent and drive on your trip"],
  ["licence", "Get a licence", hasWritten ? "No licence yet · with the written exam" : "No licence yet"],
  ["convert", "Convert my licence", "Swap a foreign licence"],
];

export function RoadCourse({ road, color }: { road: any; color: string }) {
  const [reason, setReason] = useState("rules");
  const [ans, setAns] = useState<Record<number, number>>({});
  const meta = REASONS(road.hasWritten).find((r) => r[0] === reason)!;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">Why do you need this?</p>
      <div className="flex flex-wrap gap-2">
        {REASONS(road.hasWritten).map(([id, label]) => (
          <button key={id} onClick={() => setReason(id)}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${id === reason ? "text-white" : "border-slate-200"}`}
            style={id === reason ? { background: color, borderColor: color } : {}}>{label}</button>
        ))}
      </div>

      {reason === "rules" && (
        <>
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            {road.guide.map((g: any, i: number) => (
              <details key={i} className="border-t border-slate-100 py-2 first:border-0" open={i === 0}>
                <summary className="cursor-pointer font-semibold">{g.title}</summary>
                <ul className="mt-2 space-y-1 text-slate-700">{g.points.map((p: string, j: number) => <li key={j}>• {p}</li>)}</ul>
              </details>
            ))}
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-read text-lg font-bold">Practice</h3>
            <div className="space-y-3">
              {road.quiz.slice(0, 6).map((q: any[], i: number) => {
                const isTF = typeof q[1] === "boolean";
                const opts = isTF ? ["True", "False"] : q[1];
                const correct = isTF ? (q[1] ? 0 : 1) : q[2];
                const why = isTF ? q[2] : q[3];
                const picked = ans[i];
                return (
                  <div key={i} className="rounded-lg border border-slate-100 p-3">
                    <p className="font-semibold">{q[0]}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(opts as string[]).map((o, oi) => (
                        <button key={oi} disabled={picked != null} onClick={() => setAns({ ...ans, [i]: oi })}
                          className={`rounded-lg border px-3 py-1.5 text-sm ${picked != null && oi === correct ? "border-emerald-500 bg-emerald-50" : picked === oi ? "border-red-400 bg-red-50" : "border-slate-200"}`}>{o}</button>
                      ))}
                    </div>
                    {picked != null && <p className="mt-2 text-sm text-slate-600">{picked === correct ? "✓ " : "✗ "}{why}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {reason === "travel" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 font-read text-lg font-bold">Driving as a visitor</h3>
          <ul className="space-y-1 text-slate-700">{road.visit.map((x: string, i: number) => <li key={i}>• {x}</li>)}</ul>
        </section>
      )}

      {(reason === "licence" || reason === "convert") && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 font-read text-lg font-bold">{meta[1]}</h3>
          <ol className="space-y-2">{(road.journeys[reason] || []).map((x: any, i: number) => (
            <li key={i}><strong>{x.title}.</strong> <span className="text-slate-700">{x.body}</span></li>
          ))}</ol>
          <p className="mt-3 text-sm text-slate-500">{road.hasWritten ? "This country has a written theory test; practise in the Rules tab." : "No written theory exam here."}</p>
          <p className="mt-2 text-sm">{road.official.map((o: string[], i: number) => <a key={i} href={o[1]} target="_blank" rel="noopener" className="mr-2 underline" style={{ color }}>{o[0]}</a>)}</p>
        </section>
      )}
    </div>
  );
}
