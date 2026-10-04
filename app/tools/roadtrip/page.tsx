import { RoadTripPlanner } from "@/components/RoadTripPlanner";
export const metadata = { title: "Road trip planner" };
export default function Page() {
  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h1 className="font-read text-2xl font-bold">🚐 Road trip (drive between places)</h1>
      <p className="text-slate-600">A caravan-style drive between cities, with live driving directions for each leg.</p>
      <RoadTripPlanner />
    </section>
  );
}
