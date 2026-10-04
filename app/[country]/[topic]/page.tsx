import Link from "next/link";
import { notFound } from "next/navigation";
import { countryByCode, TOPIC_LABEL, TOPIC_COLOR, TopicKey } from "@/lib/countries";
import { TRAVEL } from "@/lib/travel";
import { VISA } from "@/lib/visa";
import { DEPENDENT } from "@/lib/dependent";
import { NOMAD } from "@/lib/nomad";
import { NomadWorld } from "@/components/NomadWorld";
import { ROAD } from "@/lib/roads";
import { RoadCourse } from "@/components/RoadCourse";
import { langForCountry } from "@/lib/lang";
import { LangCourse } from "@/components/LangCourse";
import { TrackVisit } from "@/components/TrackVisit";

const Section = ({ title, items }: { title: string; items: string[] }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <h2 className="mb-2 font-read text-lg font-bold">{title}</h2>
    <ul className="space-y-1.5 text-slate-700">{items.map((x, i) => <li key={i}>• {x}</li>)}</ul>
  </section>
);

export async function generateMetadata({ params }: { params: Promise<{ country: string; topic: string }> }) {
  const { country, topic } = await params;
  const c = countryByCode(country);
  const tk = topic as TopicKey;
  if (!c) return {};
  const label = TOPIC_LABEL[tk] || topic;
  return {
    title: `${label} in ${c.name} · For a Reason`,
    description: `${label} for ${c.name}: a free, honest guide. Learn what the country asks of you, for a reason.`,
  };
}

export default async function CoursePage({ params }: { params: Promise<{ country: string; topic: string }> }) {
  const { country, topic } = await params;
  const c = countryByCode(country);
  const tk = topic as TopicKey;
  if (!c || !c.topics.includes(tk)) notFound();
  const color = TOPIC_COLOR[tk];
  const tv = tk === "travel" ? TRAVEL[country] : null;
  const vz = tk === "visa" ? VISA[country] : null;
  const nm = tk === "nomad" ? NOMAD[country] : null;
  const rd = tk === "road" ? ROAD[country] : null;
  const lg = tk === "language" ? langForCountry(country) : null;

  return (
    <div className="space-y-4">
      <TrackVisit id={`${country}/${topic}`} />
      <div className="flex items-center gap-4 text-sm font-semibold">
        <Link href="/" style={{ color }}>← Home</Link>
        {tk === "travel" && <Link href={`/${country}/travel/tabs`} className="text-slate-400">Guide</Link>}
        {tk === "travel" && <Link href={`/${country}/${topic}/places`} style={{ color }}>Places →</Link>}
      </div>

      <section className="rounded-2xl p-6 text-white shadow-lg" style={{ background: color }}>
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">{TOPIC_LABEL[tk]} · {c.name}</p>
        <h1 className="mt-1 font-read text-3xl font-bold">{tv ? `Travel: ${tv.country}` : vz ? `Visa & residency: ${vz.country}` : nm ? `Remote & nomad: ${nm.country}` : rd ? `Roads: ${rd.country}` : lg ? `${lg.name} · ${lg.test}` : `${c.flag} ${c.name}`}</h1>
        {(tv || vz || nm) && <p className="mt-2 text-white/90">{(tv || vz || nm).intro}</p>}
        {rd && <p className="mt-2 text-white/90">Drives on the {rd.side}. Rules for drivers, riders and walkers.</p>}
      </section>

      {tv ? (
        <>
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-2 font-read text-lg font-bold">🧳 Essentials</h2>
            <div className="space-y-3">
              {tv.essentials.map((e: any, i: number) => (
                <details key={i} className="rounded-lg border border-slate-100 p-3">
                  <summary className="cursor-pointer font-semibold">{e.title}</summary>
                  <p className="mt-2 text-slate-700">{e.body}</p>
                </details>
              ))}
            </div>
          </section>
          {tv.transit && (
            <section className="rounded-2xl border-l-4 border-slate-200 bg-white p-4 shadow-sm" style={{ borderLeftColor: color }}>
              <h2 className="mb-2 font-read text-lg font-bold">🚇 Getting around</h2>
              {[["Set it up", tv.transit.setup], ["Where to tap (check in & out)", tv.transit.tap], ["Passes vs tickets", tv.transit.passes], ["Cheap hacks", tv.transit.hacks]].map(([h, arr]: any) => (
                <div key={h} className="mt-2">
                  <h3 className="text-sm font-bold" style={{ color }}>{h}</h3>
                  <ul className="mt-1 space-y-1 text-slate-700">{arr.map((x: string, i: number) => <li key={i}>• {x}</li>)}</ul>
                </div>
              ))}
            </section>
          )}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-2 font-read text-lg font-bold">🗓️ When to go & budget</h2>
            {tv.whenBudget.map((w: string[], i: number) => <p key={i} className="mb-1"><strong>{w[0]}:</strong> {w[1]}</p>)}
          </section>
          <Section title="⭐ Top experiences" items={tv.top} />
          {tv.food && <Section title="🍜 Food to try" items={tv.food} />}
          {tv.stay && <Section title="🛏️ Where to stay" items={tv.stay} />}
          {tv.dayTrips && <Section title="🚆 Day trips" items={tv.dayTrips} />}
          {tv.apps && <Section title="📱 Useful apps" items={tv.apps} />}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <Link href={`/${country}/${topic}/places`} className="font-semibold" style={{ color }}>Browse all places →</Link>
          </div>
        </>
      ) : vz ? (
        <>
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-2 font-read text-lg font-bold">Visa types</h2>
            <div className="space-y-3">{vz.types.map((x: any, i: number) => (
              <details key={i} className="rounded-lg border border-slate-100 p-3"><summary className="cursor-pointer font-semibold">{x.title}</summary><p className="mt-2 text-slate-700">{x.body}</p></details>
            ))}</div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-2 font-read text-lg font-bold">Your journey</h2>
            <ol className="space-y-2">{vz.journey.map((x: any, i: number) => (
              <li key={i}><strong>{x.title}.</strong> <span className="text-slate-700">{x.body}</span></li>
            ))}</ol>
          </section>
          {DEPENDENT[country] && (
            <section className="rounded-2xl border-l-4 border-rose-300 bg-white p-4 shadow-sm">
              <h2 className="mb-2 font-read text-lg font-bold">💛 {DEPENDENT[country].title}</h2>
              <ul className="space-y-1 text-slate-700">{DEPENDENT[country].points.map((p: string, i: number) => <li key={i}>• {p}</li>)}</ul>
              <p className="mt-2 text-sm"><a href={DEPENDENT[country].source[1]} target="_blank" rel="noopener" className="underline" style={{ color }}>{DEPENDENT[country].source[0]}</a> · <a href="/community" className="underline" style={{ color }}>Find your community →</a></p>
            </section>
          )}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
            <p className="text-amber-700">A plain-English overview, not legal or immigration advice. Always check the official sources.</p>
            <p className="mt-2">{vz.authority.map(([l, u]: string[], i: number) => <a key={i} href={u} target="_blank" rel="noopener" className="mr-2 underline" style={{ color }}>{l}</a>)}</p>
          </section>
        </>
      ) : nm ? (
        <>
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-2 font-read text-lg font-bold">Options</h2>
            <div className="space-y-3">{nm.types.map((x: any, i: number) => (
              <details key={i} className="rounded-lg border border-slate-100 p-3"><summary className="cursor-pointer font-semibold">{x.title}</summary><p className="mt-2 text-slate-700">{x.body}</p></details>
            ))}</div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-2 font-read text-lg font-bold">Setting up</h2>
            <ol className="space-y-2">{nm.setup.map((x: any, i: number) => (<li key={i}><strong>{x.title}.</strong> <span className="text-slate-700">{x.body}</span></li>))}</ol>
          </section>
          {nm.cities && <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="mb-2 font-read text-lg font-bold">🌆 Best bases</h2><ul className="space-y-2">{nm.cities.map((ci: string[], i: number) => (<li key={i}><strong>{ci[0]}</strong> <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">{ci[2]}</span><br /><span className="text-sm text-slate-500">{ci[1]}</span></li>))}</ul></section>}
          {nm.jobs && <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="mb-2 font-read text-lg font-bold">💼 Remote jobs & gigs</h2><ul className="space-y-1">{nm.jobs.map((j: string[], i: number) => (<li key={i}><a href={j[1]} target="_blank" rel="noopener" className="underline" style={{ color }}>{j[0]}</a> — <span className="text-sm text-slate-500">{j[2]}</span></li>))}</ul></section>}
          <NomadWorld />
          <section className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm"><p className="text-amber-700">Overview only, not legal or tax advice. Rules change fast.</p></section>
        </>
      ) : lg ? (
        <LangCourse lang={lg} country={country} />
      ) : rd ? (
        <RoadCourse road={rd} color={color} />
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-600 shadow-sm">
          The {TOPIC_LABEL[tk].toLowerCase()} content for {c.name} ports here next.
        </section>
      )}
    </div>
  );
}
