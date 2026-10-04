import Link from "next/link";
export default function NotFound() {
  return (
    <section className="mx-auto max-w-md space-y-3 py-16 text-center">
      <div className="text-4xl">📍</div>
      <h1 className="font-read text-2xl font-bold">Not found</h1>
      <p className="text-slate-600">That page doesn&apos;t exist. Try starting a journey from home.</p>
      <Link href="/" className="inline-block rounded-lg bg-delft px-4 py-2 font-semibold text-white">Go home</Link>
    </section>
  );
}
