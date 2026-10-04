"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadProgress, Progress } from "@/lib/progress";
import { pullAndMerge } from "@/lib/progress-sync";
import { COUNTRIES, TOPIC_COLOR, TopicKey } from "@/lib/countries";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { PersonaPicker } from "@/components/PersonaPicker";

export function Dashboard({ name }: { name: string }) {
  const { t } = useI18n();
  const topicLabel = (tk: TopicKey) => t("topic" + tk.charAt(0).toUpperCase() + tk.slice(1));
  const [p, setP] = useState<Progress>({ badges: {}, courses: {}, streak: 0 });
  const [q, setQ] = useState("");
  useEffect(() => { setP(loadProgress()); pullAndMerge().then(setP); }, []);
  const tasks = Object.entries(p.courses).filter(([, pct]) => pct > 0);
  const overall = tasks.length ? Math.round(tasks.reduce((a, [, v]) => a + v, 0) / tasks.length) : 0;
  const parse = (id: string) => { const [cc, tk] = id.split("/"); const c = COUNTRIES.find((x) => x.code === cc); return { c, tk: tk as TopicKey }; };
  const countries = COUNTRIES.filter((c) => !q || c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-gradient-to-br from-[#153E8C] to-[#2E6BD6] p-6 text-white shadow-lg">
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">For a Reason</p>
        <h1 className="mt-1 font-read text-3xl font-bold">{name ? `Hi ${name}` : t("yourJourneys")}</h1>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[[overall + "%", t("overall")], [String(tasks.length), t("journeys")], [String(Object.keys(p.badges).length), t("badges")]].map(([v, l]) => (
            <div key={l} className="rounded-lg bg-white/15 p-2 text-center"><b className="block font-read text-xl">{v}</b><span className="text-[11px] text-white/80">{l}</span></div>
          ))}
        </div>
      </section>

      {!name && (
        <section className="flex items-center justify-between gap-3 rounded-2xl border border-delft bg-delft/5 p-4">
          <div><strong className="block">{t("signToSave")}</strong><p className="text-sm text-slate-500">{t("saveSub")}</p></div>
          <Link href="/signin" className="rounded-lg bg-delft px-4 py-2 font-semibold text-white">{t("signIn")}</Link>
        </section>
      )}

      {tasks.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 font-read text-lg font-bold">{t("whatDoing")}</h2>
          <ul>{tasks.map(([id, pct]) => { const { c, tk } = parse(id); if (!c) return null; const col = TOPIC_COLOR[tk];
            return (
              <li key={id} className="border-t border-slate-100 first:border-0" style={{ borderLeft: `3px solid ${col}` }}>
                <Link href={`/${c.code}/${tk}`} className="flex items-center gap-3 py-3 pl-2">
                  <span className="text-2xl">{c.flag}</span>
                  <span className="flex-1"><strong className="block text-[15px]">{c.name}</strong><span className="text-sm text-slate-500">{topicLabel(tk)}</span></span>
                  <span className="flex items-center gap-2 text-sm font-bold" style={{ color: col }}><span className="h-1.5 w-16 overflow-hidden rounded bg-slate-200"><i className="block h-full" style={{ width: pct + "%", background: col }} /></span>{pct}%</span>
                </Link>
              </li>
            );
          })}</ul>
        </section>
      )}

      <PersonaPicker />

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 font-read text-lg font-bold">{t("startJourney")}</h2>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchCountry")} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        <div className="mt-3 space-y-4">
          {countries.map((c) => (
            <div key={c.code}>
              <div className="mb-2 flex items-center gap-2 font-semibold"><span className="text-2xl">{c.flag}</span> {c.name}</div>
              <div className="flex flex-wrap gap-2">
                {c.topics.map((tk) => (
                  <Link key={tk} href={`/${c.code}/${tk}`} className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold hover:border-delft">{topicLabel(tk)}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
