import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About · For a Reason",
  description: "A woman from Himachal, learning her way across the world. A non-profit, open-source community for people who learn a language, road rules or a test because they have to.",
};
const paras = [
  "Himachal is mostly forest and mountain. Roughly two-thirds of it is classed as forest, and it sends four people to a parliament of five hundred and forty-three. When your home is that small on the map, you learn early that the world will not bend to the way things are done back there.",
  "Tokyo made that lesson concrete. The trains, the forms, the rules nobody says out loud, the language on every sign. Almost none of it worked the way I expected. I had to learn a whole country from the ground up, as an adult, while holding down a job.",
  "Some of it I fell for. The quiet order. A neighbour who explains the recycling days before you even ask. Some of it still wears me down. This app is a map of all of it: what I am learning, what I love, what I do not, and everywhere I have been.",
  "For a Reason is non-profit and open source. No ads, nothing for sale. The lessons, guides and visa maps are built with AI and made better by the people who use them. Your profile is yours to declare; we do not check it. The real exam is where you prove yourself.",
  "If you are learning something a new country asks of you, for a reason of your own, you are in the right place. And if you have already done it, reach back and pull the next person up.",
];
const facts = [["about two-thirds", "of Himachal is forest and mountain"], ["4 of 543", "seats it holds in parliament"], ["India to Tokyo", "and still learning, out loud"]];
export default function About() {
  return (
    <article className="space-y-5">
      <section className="rounded-2xl bg-delft p-6 text-white shadow-lg">
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">For a Reason · A community</p>
        <h1 className="mt-1 font-read text-3xl font-bold">For a reason</h1>
        <p className="mt-2 max-w-prose text-white/90">I&apos;m Sakshi. I grew up in Himachal, a small state in the north of India where the mountains do most of the talking, and I live in Tokyo now.</p>
      </section>
      <div className="grid grid-cols-3 gap-2">{facts.map((f) => (
        <div key={f[0]} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"><b className="block font-read text-delft">{f[0]}</b><span className="text-xs text-slate-500">{f[1]}</span></div>
      ))}</div>
      <div className="mx-auto max-w-prose space-y-4 font-read text-lg leading-relaxed text-ink">
        <p>{paras[0]}</p>
        <blockquote className="border-l-4 border-delft pl-4 font-semibold text-delft">Four voices in a room of hundreds. You learn to speak up, or you learn to disappear.</blockquote>
        {paras.slice(1).map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </article>
  );
}
