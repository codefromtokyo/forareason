import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Community · For a Reason",
  description: "An inclusive community of fellow learners and travellers: house shares, books, small meetups. Everyone welcome, women- and LGBTQ+-friendly, safe-first. Run on WhatsApp.",
};
const share = ["🏠 Houses and rooms — find a flatmate or a short stay.", "📚 Books and resources — pass on the textbooks, apps and notes that worked.", "☕ Small meetups — a language café, a walk, a study night.", "🗣️ Language partners — swap an hour of your language for theirs.", "🧭 Local know-how — the stuff guides never tell you."];
const safety = ["Video-call or meet in a public place before you commit.", "See the place and a real contract before you pay a deposit. Never wire money for a room you haven't seen.", "Be careful with sublets: check the landlord actually allows it.", "Keep it in the group chat and split costs in writing."];
export default function Community() {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-br from-[#153E8C] to-[#2E6BD6] p-6 text-white shadow-lg">
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">For a Reason · Community</p>
        <h1 className="mt-1 font-read text-3xl font-bold">Learn together, land together</h1>
        <p className="mt-2 text-white/90">A community of fellow learners and travellers who help each other arrive, settle and get around a new country. Everyone is welcome.</p>
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="font-read text-lg font-bold">🌈 Everyone&apos;s welcome</h2><p className="mt-1 text-slate-700">Women, men and non-binary folks; LGBTQ+; every background, faith and first language. Safe-first and harassment-free.</p></section>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="font-read text-lg font-bold">🤝 What we share</h2><ul className="mt-2 space-y-1 text-slate-700">{share.map((s, i) => <li key={i}>{s}</li>)}</ul></section>
      <section className="rounded-2xl border-l-4 border-rose-400 bg-white p-4 shadow-sm"><h2 className="font-read text-lg font-bold">🛟 Stay safe</h2><ol className="mt-2 list-decimal space-y-1 pl-5 text-slate-700">{safety.map((s, i) => <li key={i}>{s}</li>)}</ol><p className="mt-2 text-slate-700">If someone tries to scam you, send the admins your screenshots. We block them from the community.</p></section>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="font-read text-lg font-bold">💛 Safe-first, for real</h2><p className="mt-1 text-slate-700">Built with women and LGBTQ+ people moving or travelling solo in mind: optional women-only and LGBTQ+-friendly rooms, zero tolerance for harassment, and admins who act on reports.</p></section>
      <a href="/community/members" className="inline-block rounded-lg border border-delft px-4 py-2 font-semibold text-delft">See members →</a>
      <p className="text-sm text-slate-500">Non-profit and open source. The community runs on WhatsApp for now.</p>
    </section>
  );
}
