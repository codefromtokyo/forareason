import { VisaCheck } from "@/components/VisaCheck";
export const metadata = { title: "Do I need a visa?" };
export default function Page() {
  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h1 className="font-read text-2xl font-bold">🛂 Do I need a visa?</h1>
      <p className="text-slate-600">Check whether your passport needs a visa, and tick off the documents to collect.</p>
      <VisaCheck />
    </section>
  );
}
