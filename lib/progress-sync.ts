"use client";
import { supabaseBrowser } from "./supabase-client";
import { loadProgress, saveProgress, Progress } from "./progress";

export async function pullAndMerge(): Promise<Progress> {
  const local = loadProgress();
  try {
    const sb = supabaseBrowser();
    const { data: u } = await sb.auth.getUser();
    if (!u.user) return local;
    const { data } = await sb.from("progress").select("data").eq("user_id", u.user.id).eq("course", "_all").maybeSingle();
    const remote = (data?.data as Progress) || null;
    if (remote) {
      const merged: Progress = {
        badges: { ...remote.badges, ...local.badges },
        courses: { ...remote.courses },
        streak: Math.max(remote.streak || 0, local.streak || 0),
      };
      Object.entries(local.courses).forEach(([k, v]) => { merged.courses[k] = Math.max(merged.courses[k] || 0, v); });
      saveProgress(merged);
      return merged;
    }
    await push(local);
  } catch {}
  return local;
}

let timer: any = null;
export function push(p: Progress) {
  clearTimeout(timer);
  return new Promise<void>((res) => {
    timer = setTimeout(async () => {
      try {
        const sb = supabaseBrowser();
        const { data: u } = await sb.auth.getUser();
        if (u.user) await sb.from("progress").upsert({ user_id: u.user.id, course: "_all", data: p, updated_at: new Date().toISOString() });
      } catch {}
      res();
    }, 800);
  });
}
