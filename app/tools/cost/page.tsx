import { CostCalc } from "@/components/CostCalc";
export const metadata = { title: "Cost of living & take-home pay" };
export default function CostPage() {
  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h1 className="font-read text-2xl font-bold">💶 Cost of living & take-home pay</h1>
      <p className="text-slate-600">Rough rents, monthly costs and a net-pay estimate. Estimates, not financial advice.</p>
      <CostCalc />
    </section>
  );
}
