import Link from "next/link";
export default function Tools() {
  const tools = ["Phrasebook", "Documents & deadlines", "Settle-in checklist", "Do I need a visa?", "Day-by-day itinerary", "Schengen trip", "Road trip", "Cost & take-home", "Cover letter", "Sponsorship letter", "Invitation letter"];
  return (
    <section className="space-y-4">
      <h1 className="font-read text-3xl font-bold">Tools</h1>
      <div className="grid grid-cols-2 gap-3">
        {tools.map((t) => (
          <Link key={t} href={t.startsWith("Phrasebook") ? "/tools/phrasebook" : t.startsWith("Documents") ? "/tools/deadlines" : t.startsWith("Settle") ? "/tools/settle" : t.startsWith("Do I need") ? "/tools/visa-check" : t.startsWith("Cost") ? "/tools/cost" : t.startsWith("Day-by-day") ? "/tools/itinerary" : t.startsWith("Schengen") ? "/tools/itinerary?schengen=1" : t.startsWith("Road trip") ? "/tools/roadtrip" : t.includes("letter") ? "/tools/letters" : "#"} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-delft">
            <strong className="text-sm">{t}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
