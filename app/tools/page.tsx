export default function Tools() {
  const tools = ["Do I need a visa?", "Day-by-day itinerary", "Schengen trip", "Road trip", "Cost & take-home", "Cover letter", "Sponsorship letter", "Invitation letter"];
  return (
    <section className="space-y-4">
      <h1 className="font-read text-3xl font-bold">Tools</h1>
      <div className="grid grid-cols-2 gap-3">
        {tools.map((t) => (
          <div key={t} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <strong className="text-sm">{t}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
