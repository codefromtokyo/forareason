/* Ported planning logic from the vanilla app (docs.js). PDF generation is added in the next round. */
import { mapsDir } from "./maps";

export const CAT_LABEL: Record<string, string> = {
  history: "History", art: "Art & museums", landmark: "Landmark", nature: "Nature & parks",
  food: "Food & markets", view: "Views", family: "Family", shopping: "Shopping",
};
const HEAVY_CATS = ["art", "history"];
const PACE_PER_DAY: Record<string, number> = { relaxed: 2, balanced: 3, packed: 4 };

export function dayLabel(i: number, startDate?: string) {
  if (!startDate) return "Day " + i;
  const d = new Date(startDate);
  if (isNaN(+d)) return "Day " + i;
  d.setDate(d.getDate() + (i - 1));
  return "Day " + i + " (" + d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }) + ")";
}

export interface ItinOpts { days?: number; base?: string; startDate?: string; pace?: string; interests?: string[]; extraTv?: any; }

export function planItinerary(tv: any, opts: ItinOpts = {}) {
  const days = Math.max(2, Math.min(21, +(opts.days || 7)));
  const pace = PACE_PER_DAY[opts.pace || ""] ? opts.pace! : "balanced";
  const perDay = PACE_PER_DAY[pace];
  const interests = opts.interests && opts.interests.length ? opts.interests : null;
  const country = tv.country || "";
  const base = opts.base || tv.hub || country;
  const mk = (s: any) => ({ name: s.name, station: s.station, cat: s.cat, why: s.why, label: CAT_LABEL[s.cat] || "", dest: s.name + ", " + (s.city || country), dir: mapsDir(base, s.name + ", " + (s.city || country)) });
  const score = (s: any) => (interests && interests.includes(s.cat) ? 0 : 1);
  const all = (tv.spots || []).slice();
  const city = all.filter((s: any) => !s.trip).sort((a: any, b: any) => score(a) - score(b)).map(mk);
  const trips = all.filter((s: any) => s.trip).sort((a: any, b: any) => score(a) - score(b)).map(mk);
  let city2: any[] = [], country2 = "";
  if (opts.extraTv) {
    country2 = opts.extraTv.country; const b2 = opts.extraTv.hub || country2;
    const mk2 = (s: any) => ({ name: s.name, station: s.station, cat: s.cat, why: s.why, label: CAT_LABEL[s.cat] || "", dest: s.name + ", " + (s.city || country2), dir: mapsDir(b2, s.name + ", " + (s.city || country2)) });
    city2 = (opts.extraTv.spots || []).filter((s: any) => !s.trip).sort((a: any, b: any) => score(a) - score(b)).map(mk2);
  }
  const exploreDays = Math.max(0, days - 2);
  const splitB = opts.extraTv ? Math.floor(exploreDays / 2) : 0;
  const capacity = exploreDays * perDay;
  const wanted = interests ? all.filter((s: any) => interests.includes(s.cat)).length : city.length + trips.length;
  const overcommit = wanted > capacity && days <= 4;
  const daysArr: any[] = [];
  let ti = 0;
  const takeBalanced = (pool: any[], ref: { i: number }, n: number) => {
    const picks: any[] = []; let heavy = 0; const maxHeavy = 1 + (interests ? 1 : 0);
    while (picks.length < n && ref.i < pool.length) {
      const s = pool[ref.i]; const isHeavy = HEAVY_CATS.includes(s.cat);
      if (isHeavy && heavy >= maxHeavy) {
        const j = pool.findIndex((x, k) => k > ref.i && !HEAVY_CATS.includes(x.cat) && !picks.includes(x));
        if (j >= 0) { picks.push(pool[j]); pool.splice(j, 1); continue; }
      }
      if (isHeavy) heavy++; picks.push(s); ref.i++;
    }
    return picks;
  };
  const refC = { i: 0 }, refC2 = { i: 0 };
  for (let i = 1; i <= days; i++) {
    if (i === 1) { daysArr.push({ title: dayLabel(i, opts.startDate), kind: "arrive", note: "Arrive and check in around " + base + ". Sort your transit card and an eSIM, then an easy dinner nearby.", stops: [] }); continue; }
    if (i === days) { const cty = opts.extraTv ? country2 : country; const b = opts.extraTv ? (opts.extraTv.hub || country2) : base; daysArr.push({ title: dayLabel(i, opts.startDate), kind: "depart", note: "Slow morning, last souvenirs, then to the airport with time to spare.", stops: [{ name: "Airport", station: "Check your line to the airport", label: "", why: "", dir: mapsDir(b, "airport " + cty) }] }); continue; }
    const idx = i - 1;
    const inB = opts.extraTv && idx > exploreDays - splitB;
    if (opts.extraTv && idx === exploreDays - splitB + 1) { daysArr.push({ title: dayLabel(i, opts.startDate), kind: "transfer", note: "Travel to " + country2 + " (fast train, e.g. Thalys/Eurostar). Check in and take it easy.", stops: takeBalanced(city2, refC2, Math.max(1, perDay - 1)) }); continue; }
    const wantTrip = !opts.extraTv && trips.length && idx % 3 === 0 && pace !== "relaxed";
    if (wantTrip && ti < trips.length) { const s = trips[ti++]; daysArr.push({ title: dayLabel(i, opts.startDate), kind: "trip", note: "Day trip. Back to " + base + " for dinner.", stops: [s] }); continue; }
    const pool = inB ? city2 : city, ref = inB ? refC2 : refC;
    daysArr.push({ title: dayLabel(i, opts.startDate), kind: "explore", note: "Based in " + (inB ? (opts.extraTv.hub || country2) : base) + ". Take it at your pace, coffee breaks count.", stops: takeBalanced(pool, ref, perDay) });
  }
  return { days: daysArr, overcommit, pace, perDay, capacity, wanted };
}

export function planRoadTrip(tv: any, opts: ItinOpts = {}) {
  const country = tv.country || "";
  const base = opts.base || tv.hub || country;
  const days = Math.max(2, Math.min(14, +(opts.days || 5)));
  const cities: string[] = [];
  (tv.spots || []).forEach((s: any) => { if (!cities.includes(s.city)) cities.push(s.city); });
  const out: any[] = []; let prev = base, prevLabel = base;
  for (let i = 1; i <= days; i++) {
    if (i === days) { out.push({ title: dayLabel(i, opts.startDate), note: "Drive back to " + base + ". Return the car with fuel and time to spare.", leg: { from: prevLabel, to: base, dir: mapsDir(prev, base, "driving") }, stops: [] }); break; }
    const city = cities[(i - 1) % cities.length]; const dest = city + ", " + country;
    const citySpots = (tv.spots || []).filter((s: any) => s.city === city).slice(0, 2).map((s: any) => ({ name: s.name, why: s.why, label: CAT_LABEL[s.cat] || "" }));
    out.push({ title: dayLabel(i, opts.startDate), note: "Drive to " + city + ", park up and explore. Take breaks, enjoy the road.", leg: { from: prevLabel, to: city, dir: mapsDir(prev, dest, "driving") }, stops: citySpots });
    prev = dest; prevLabel = city;
  }
  return { days: out, base, country };
}
