import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase-server";

async function getProfile(handle: string) {
  try {
    const sb = await supabaseServer();
    const { data: idRow } = await sb.rpc("profile_id_by_handle", { h: handle });
    const id = idRow as string | null;
    if (!id) return null;
    const { data: p } = await sb.from("profiles").select("id,handle,display_name,home,bio,reasons,badges,is_public").eq("id", id).maybeSingle();
    if (!p || !p.is_public) return null;
    const [{ data: langs }, { data: places }] = await Promise.all([
      sb.from("declared_languages").select("*").eq("user_id", id),
      sb.from("places").select("*").eq("user_id", id),
    ]);
    return { ...p, langs: langs || [], places: places || [] };
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const p = await getProfile(handle);
  if (!p) return { title: "Member · For a Reason" };
  return { title: `${p.display_name || handle} · For a Reason`, description: p.bio || `${p.display_name || handle} on For a Reason.` };
}

export default async function PublicProfile({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const p = await getProfile(handle);
  if (!p) notFound();
  return (
    <section className="space-y-4">
      <div className="rounded-2xl bg-delft p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 font-read text-xl font-bold">{(p.display_name || handle).slice(0, 2).toUpperCase()}</span>
          <div><h1 className="font-read text-2xl font-bold">{p.display_name || handle}</h1><p className="text-white/80">{p.home}</p></div>
        </div>
        {p.bio && <p className="mt-3 text-white/90">{p.bio}</p>}
        <p className="mt-2 text-xs text-white/70">Self-declared. The real test is where you verify yourself.</p>
      </div>
      {Object.keys(p.badges || {}).length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="mb-2 font-read text-lg font-bold">Badges</h2>
          <div className="flex flex-wrap gap-2">{Object.values(p.badges as Record<string, any>).map((b: any, i: number) => <span key={i} className="rounded-full bg-delft/10 px-3 py-1 text-sm font-semibold text-delft">🏅 {b.label}</span>)}</div>
        </section>
      )}
      {p.langs.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="mb-2 font-read text-lg font-bold">Languages</h2>
          <ul className="space-y-1">{p.langs.map((l: any, i: number) => <li key={i}><strong>{l.language}</strong> {l.level && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{l.test ? l.test + " " : ""}{l.level}</span>}</li>)}</ul>
        </section>
      )}
      {p.places.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="mb-2 font-read text-lg font-bold">Map</h2>
          <ul className="space-y-1">{p.places.map((pl: any, i: number) => <li key={i}><strong>{pl.city ? pl.city + ", " + pl.country : pl.country}</strong> <span className="text-sm text-slate-500">{pl.status}</span></li>)}</ul>
        </section>
      )}
    </section>
  );
}
