import { LettersForm } from "@/components/LettersForm";
export const metadata = { title: "Visa letters (fillable PDF)" };
export default function Page() {
  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h1 className="font-read text-2xl font-bold">Visa letters</h1>
      <p className="text-slate-600">Cover, sponsorship and invitation letters as fillable PDFs.</p>
      <LettersForm />
    </section>
  );
}
