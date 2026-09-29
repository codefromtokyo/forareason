import Link from "next/link";
import { notFound } from "next/navigation";
import { countryByCode, TOPIC_LABEL, TOPIC_COLOR, TopicKey } from "@/lib/countries";

export function generateStaticParams() {
  return [];
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ country: string; topic: string }>;
}) {
  const { country, topic } = await params;
  const c = countryByCode(country);
  const tk = topic as TopicKey;
  if (!c || !c.topics.includes(tk)) notFound();
  const color = TOPIC_COLOR[tk];
  return (
    <div className="space-y-4">
      <Link href="/" className="text-sm font-semibold" style={{ color }}>← Home</Link>
      <section className="rounded-2xl p-6 text-white shadow-lg" style={{ background: color }}>
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">
          {TOPIC_LABEL[tk]} · {c.name}
        </p>
        <h1 className="mt-1 font-read text-3xl font-bold">{c.flag} {c.name}</h1>
        <p className="mt-2 text-white/90">
          The {TOPIC_LABEL[tk].toLowerCase()} guide for {c.name}. Content ports here from the existing app.
        </p>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="font-read text-xl font-bold">Coming from the migration</h2>
        <p className="mt-2 text-slate-600">
          This route ({`/${country}/${topic}`}) is the home for this journey. The lessons, guides, tools and
          progress from the vanilla app are ported into components under this route.
        </p>
      </section>
    </div>
  );
}
