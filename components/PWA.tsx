"use client";
import { useEffect, useState } from "react";

export function PWA() {
  const [prompt, setPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const onPrompt = (e: Event) => { e.preventDefault(); setPrompt(e); setShow(true); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!show || !prompt) return null;
  return (
    <div className="fixed inset-x-3 bottom-24 z-[70] flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-lg sm:inset-x-auto sm:right-4 sm:max-w-sm">
      <img src="/icons/icon-192.png" alt="" width={40} height={40} className="rounded-lg" />
      <div className="flex-1">
        <strong className="block text-sm">Install For a Reason</strong>
        <span className="text-xs text-slate-500">Add it to your home screen.</span>
      </div>
      <button
        onClick={async () => { await prompt.prompt(); setShow(false); setPrompt(null); }}
        className="rounded-lg bg-delft px-3 py-1.5 text-sm font-semibold text-white">
        Install
      </button>
      <button onClick={() => setShow(false)} className="text-xs text-slate-400">✕</button>
    </div>
  );
}
