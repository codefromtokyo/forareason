import { Deadlines } from "@/components/Deadlines";
export const metadata = { title: "Document & deadline tracker", description: "Track passport, visa, residence permit, insurance and licence expiry so you never miss a renewal. Private, on-device." };
export default function Page() {
  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h1 className="font-read text-2xl font-bold">📅 Documents & deadlines</h1>
      <p className="text-slate-600">Track what expires — passport, visa, permit, insurance — so a renewal never sneaks up on you.</p>
      <Deadlines />
    </section>
  );
}
