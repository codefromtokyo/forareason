import { Phrasebook } from "@/components/Phrasebook";
export const metadata = { title: "Phrasebook", description: "Offline survival phrases with audio for Dutch, French and Japanese: basics, getting around, eating out, health & emergency, making friends." };
export default function Page() {
  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h1 className="font-read text-2xl font-bold">🗣️ Phrasebook</h1>
      <p className="text-slate-600">The phrases that get you through day one, with audio. Works offline.</p>
      <Phrasebook />
    </section>
  );
}
