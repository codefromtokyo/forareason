"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-client";

export function ProfileEditor({ userId, email, initial }: { userId: string; email: string; initial: any }) {
  const [p, setP] = useState({
    display_name: initial?.display_name || "", home: initial?.home || "", bio: initial?.bio || "",
    handle: initial?.handle || "", is_public: initial?.is_public ?? true,
  });
  const [msg, setMsg] = useState("");
  const set = (k: string, v: any) => setP({ ...p, [k]: v });

  async function save() {
    setMsg("Saving…");
    try {
      const supabase = supabaseBrowser();
      const { error } = await supabase.from("profiles").upsert({
        id: userId, display_name: p.display_name, home: p.home, bio: p.bio,
        handle: (p.handle || "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 30) || null,
        is_public: p.is_public, updated_at: new Date().toISOString(),
      });
      setMsg(error ? (error.message.includes("handle") ? "That profile link is taken." : error.message) : "Saved.");
    } catch (e: any) { setMsg(e?.message || "Could not save."); }
  }

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{email}</p>
      <label className="block text-sm font-semibold">Name<input value={p.display_name} onChange={(e) => set("display_name", e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
      <label className="block text-sm font-semibold">Profile link (handle)<input value={p.handle} onChange={(e) => set("handle", e.target.value)} placeholder="your-handle" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
      <label className="block text-sm font-semibold">From<input value={p.home} onChange={(e) => set("home", e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
      <label className="block text-sm font-semibold">Bio<textarea value={p.bio} onChange={(e) => set("bio", e.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.is_public} onChange={(e) => set("is_public", e.target.checked)} /> Make my profile public</label>
      <div className="flex items-center gap-3">
        <button onClick={save} className="rounded-lg bg-delft px-4 py-2 font-semibold text-white">Save</button>
        {msg && <span className="text-sm text-slate-500">{msg}</span>}
      </div>
    </div>
  );
}
