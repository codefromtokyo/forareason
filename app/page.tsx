import Link from "next/link";
import { COUNTRIES, TOPIC_LABEL, TopicKey } from "@/lib/countries";
import { supabaseServer } from "@/lib/supabase-server";

export default async function Home() {
  let name = "";
  try {
    const supabase = await supabaseServer();
    const { data } = await supabase.auth.getUser();
    name = (data.user?.user_metadata?.full_name as string) || "";
  } catch {}
  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-gradient-to-br from-[#153E8C] to-[#2E6BD6] p-6 text-white shadow-lg">
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">For a Reason</p>
        <h1 className="mt-1 font-read text-3xl font-bold">{name ? `Hi ${name}` : "Your journeys"}</h1>
        <p className="mt-2 text-white/90">Break the language gap, together. Pick a country and what you need.</p>
      </section>

      {!name && (
        <section className="flex items-center justify-between gap-3 rounded-2xl border border-delft bg-delft/5 p-4">
          <div>
            <strong className="block">Sign in to save your progress</strong>
            <p className="text-sm text-slate-500">Keep your journeys and profile on any device. Free.</p>
          </div>
          <Link href="/signin" className="rounded-lg bg-delft px-4 py-2 font-semibold text-white">Sign in</Link>
        </section>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-read text-xl font-bold">Start a journey</h2>
        <div className="space-y-4">
          {COUNTRIES.map((c) => (
            <div key={c.code}>
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <span className="text-2xl">{c.flag}</span> {c.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {c.topics.map((tk) => (
                  <Link key={tk} href={`/${c.code}/${tk}`}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold hover:border-delft">
                    {TOPIC_LABEL[tk as TopicKey]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
