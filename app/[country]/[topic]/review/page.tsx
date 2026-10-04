import { notFound } from "next/navigation";
import Link from "next/link";
import { langForCountry } from "@/lib/lang";
import { Review } from "@/components/Review";

export default async function ReviewPage({ params, searchParams }: { params: Promise<{ country: string; topic: string }>; searchParams: Promise<{ level?: string }> }) {
  const { country, topic } = await params;
  const { level } = await searchParams;
  if (topic !== "language") notFound();
  const lang = langForCountry(country);
  if (!lang) notFound();
  const lv = level && lang.levels.includes(level) ? level : lang.levels[0];
  return (
    <section className="mx-auto max-w-lg space-y-4">
      <Link href={`/${country}/language`} className="text-sm font-semibold text-delft">← Course</Link>
      <h1 className="font-read text-2xl font-bold">Daily review · {lv}</h1>
      <Review lang={lang} country={country} level={lv} />
    </section>
  );
}
