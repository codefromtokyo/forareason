import { SettleChecklist } from "@/components/SettleChecklist";
export const metadata = { title: "Settle-in checklist", description: "Everything to do after you arrive: register, bank, health, SIM, utilities — for Japan, the Netherlands, France." };
export default function Page() {
  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h1 className="font-read text-2xl font-bold">🧳 Settle-in checklist</h1>
      <p className="text-slate-600">The admin to sort after you arrive: registration, bank, health, SIM, utilities. Tick it off.</p>
      <SettleChecklist />
    </section>
  );
}
