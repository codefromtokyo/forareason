"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-client";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const configured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

  async function sendLink() {
    if (!/.+@.+\..+/.test(email)) { setMsg("Enter a valid email."); return; }
    setMsg("Sending your link…");
    try {
      const supabase = supabaseBrowser();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: typeof window !== "undefined" ? window.location.origin + "/auth/callback" : undefined },
      });
      setMsg(error ? error.message : `Link sent to ${email}. Open it to sign in.`);
    } catch (e: any) {
      setMsg(e?.message || "Could not send the link.");
    }
  }
  async function google() {
    const supabase = supabaseBrowser();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: typeof window !== "undefined" ? window.location.origin + "/auth/callback" : undefined },
    });
  }

  if (!configured) {
    return <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
      Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable sign-in.
    </p>;
  }
  return (
    <div className="space-y-3">
      <button onClick={google} className="w-full rounded-lg border border-slate-300 bg-white py-2.5 font-semibold">
        Continue with Google
      </button>
      <div className="flex items-center gap-2 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />or email<span className="h-px flex-1 bg-slate-200" /></div>
      <div className="flex gap-2">
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2" />
        <button onClick={sendLink} className="rounded-lg bg-delft px-4 py-2 font-semibold text-white">Send link</button>
      </div>
      {msg && <p className="text-sm text-slate-600">{msg}</p>}
    </div>
  );
}
