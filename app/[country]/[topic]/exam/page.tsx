import { notFound } from "next/navigation";
import Link from "next/link";
import { langForCountry } from "@/lib/lang";
import { MockTest } from "@/components/MockTest";

export default async function ExamPage({ params, searchParams }: { params: Promise<{ country: string; topic: string }>; searchParams: Promise<{ level?: string }> }) {
  const { country, topic } = await params;
  const { level } = await searchParams;
  if (topic !== "language") notFound();
  const lang = langForCountry(country);
  if (!lang) notFound();
  return (
    <section className="space-y-4">
      <Link href={`/${country}/language`} className="text-sm font-semibold text-delft">← Syllabus</Link>
      <h1 className="font-read text-2xl font-bold">Mock test — {lang.test}</h1>
      <MockTest lang={lang} country={country} initial={level || lang.levels[0]} />
    </section>
  );
}
