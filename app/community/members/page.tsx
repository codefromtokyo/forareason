import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
export const metadata = { title: "Members · For a Reason", description: "People learning what a new country asks of them." };
export default async function Members() {
  let members: any[] = [];
  try { const sb = await supabaseServer(); const { data } = await sb.from("public_profiles").select("handle,display_name,home").not("handle", "is", null).order("updated_at", { ascending: false }).limit(200); members = data || []; } catch {}
  return (
    <section className="space-y-4">
      <Link href="/community" className="text-sm font-semibold text-delft">← Community</Link>
      <h1 className="font-read text-2xl font-bold">Members</h1>
      <p className="text-slate-600">People learning for a reason. Make your profile public to appear here.</p>
      {members.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-500 shadow-sm">No public members yet. Be the first.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">{members.map((m) => (
          <Link key={m.handle} href={`/u/${m.handle}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-delft">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-delft/10 font-bold text-delft">{(m.display_name || m.handle).slice(0, 2).toUpperCase()}</span>
            <strong className="mt-2 block text-sm">{m.display_name || m.handle}</strong>
            <span className="text-xs text-slate-500">{m.home}</span>
          </Link>
        ))}</div>
      )}
    </section>
  );
}
