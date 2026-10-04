export const metadata = { title: "Offline · For a Reason" };
export default function Offline() {
  return (
    <section className="mx-auto max-w-md space-y-3 py-10 text-center">
      <div className="text-4xl">📍</div>
      <h1 className="font-read text-2xl font-bold">You are offline</h1>
      <p className="text-slate-600">Pages you have opened before still work. Reconnect to load new ones.</p>
    </section>
  );
}
