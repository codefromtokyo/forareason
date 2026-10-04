import { ItineraryPlanner } from "@/components/ItineraryPlanner";
export const metadata = { title: "Day-by-day itinerary" };

export default async function Page({ searchParams }: { searchParams: Promise<{ schengen?: string }> }) {
  const sp = await searchParams;
  const schengen = sp.schengen === "1";
  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h1 className="font-read text-2xl font-bold">{schengen ? "🇪🇺 Schengen trip" : "🗺️ Day-by-day itinerary"}</h1>
      <p className="text-slate-600">
        {schengen
          ? "Plan one trip across the Netherlands and France, with the train transfer between them. More Schengen countries coming."
          : "Smart plan with routes. Set pace and interests; we won't stack museums, and we nudge you to slow down if you over-commit."}
      </p>
      <ItineraryPlanner schengen={schengen} />
    </section>
  );
}
