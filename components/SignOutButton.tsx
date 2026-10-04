"use client";
import { supabaseBrowser } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
export function SignOutButton() {
  const router = useRouter();
  return <button onClick={async () => { await supabaseBrowser().auth.signOut(); router.push("/"); router.refresh(); }} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold">Sign out</button>;
}
