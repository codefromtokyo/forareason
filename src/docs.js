/* Fillable trip & visa documents, generated client-side with pdf-lib (loaded from jsdelivr).
   Key fields are left as editable AcroForm text fields so a user or visa officer can tweak the PDF. */
let _pdfLib = null;
async function loadPdfLib() {
  if (_pdfLib) return _pdfLib;
  _pdfLib = await import("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm");
  return _pdfLib;
}
function downloadBytes(bytes, filename) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function wrapText(text, font, size, maxW) {
  const out = [];
  String(text).split("\n").forEach(par => {
    if (par === "") { out.push(""); return; }
    let line = "";
    par.split(/\s+/).forEach(w => {
      const test = line ? line + " " + w : w;
      if (font.widthOfTextAtSize(test, size) > maxW && line) { out.push(line); line = w; }
      else line = test;
    });
    if (line) out.push(line);
  });
  return out;
}
/* spec: { filename, title, subtitle, fields:[{label,value}], blocks:[{h?, text}] } */
async function makePDF(spec) {
  const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const form = doc.getForm();
  const W = 595, H = 842, M = 56, maxW = W - M * 2;
  const blue = rgb(0.11, 0.29, 0.66), ink = rgb(0.08, 0.12, 0.22), grey = rgb(0.45, 0.5, 0.58);
  let page = doc.addPage([W, H]), y = H - M, fieldN = 0;
  const nl = (h = 14) => { y -= h; if (y < M + 40) { page = doc.addPage([W, H]); y = H - M; } };
  const draw = (t, f, s, c, x = M) => { page.drawText(String(t), { x, y, size: s, font: f, color: c }); };
  // header
  draw(spec.title, bold, 20, blue); nl(24);
  if (spec.subtitle) { draw(spec.subtitle, font, 11, grey); nl(20); }
  page.drawLine({ start: { x: M, y: y + 6 }, end: { x: W - M, y: y + 6 }, thickness: 1, color: rgb(0.8, 0.85, 0.93) }); nl(14);
  // editable fields block
  (spec.fields || []).forEach(f => {
    draw(f.label, bold, 10, ink); nl(15);
    const tf = form.createTextField("f" + (fieldN++)); tf.setText(f.value || "");
    tf.addToPage(page, { x: M, y: y - 2, width: maxW, height: 16, borderColor: rgb(0.8, 0.85, 0.93), backgroundColor: rgb(0.97, 0.98, 1), borderWidth: 1 });
    tf.setFontSize(10); nl(26);
  });
  if ((spec.fields || []).length) { nl(6); }
  // body blocks
  (spec.blocks || []).forEach(b => {
    if (b.h) { nl(6); draw(b.h, bold, 13, blue); nl(18); }
    wrapText(b.text, font, 11, maxW).forEach(line => { draw(line, font, 11, ink); nl(15); });
    nl(4);
  });
  // footer
  page.drawText("Prepared with For a Reason (forareason) — a plain-English, self-declared draft, not legal advice.", { x: M, y: M - 24, size: 8, font, color: grey });
  const bytes = await doc.save();
  downloadBytes(bytes, spec.filename);
}

/* ----- itinerary: structured days with stops, nearest station and live transit directions from the base ----- */
function mapsDir(origin, dest, mode) {
  return "https://www.google.com/maps/dir/?api=1&origin=" + encodeURIComponent(origin || "") + "&destination=" + encodeURIComponent(dest || "") + "&travelmode=" + (mode || "transit");
}
function dayLabel(i, startDate) {
  if (!startDate) return "Day " + i; const d = new Date(startDate); if (isNaN(d)) return "Day " + i;
  d.setDate(d.getDate() + (i - 1)); return "Day " + i + " (" + d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }) + ")";
}
const HEAVY_CATS = ["art", "history"];
const CAT_LABEL = { history:"History", art:"Art & museums", landmark:"Landmark", nature:"Nature & parks", food:"Food & markets", view:"Views", family:"Family", shopping:"Shopping" };
const PACE_PER_DAY = { relaxed:2, balanced:3, packed:4 };
/* Build a comfortable, category-balanced plan.
   opts: { days, base, startDate, pace, interests:[cat], extraTv (second Schengen country) } */
function planItinerary(tv, opts) {
  opts = opts || {};
  const days = Math.max(2, Math.min(21, +opts.days || 7));
  const pace = PACE_PER_DAY[opts.pace] ? opts.pace : "balanced";
  const perDay = PACE_PER_DAY[pace];
  const interests = opts.interests && opts.interests.length ? opts.interests : null;
  const country = tv.country || "";
  const base = opts.base || tv.hub || country;
  const mk = s => ({ name:s.name, station:s.station, cat:s.cat, why:s.why, label:CAT_LABEL[s.cat] || "", dest:s.name + ", " + (s.city || country), dir: mapsDir(base, s.name + ", " + (s.city || country)) });
  // score spots by interest match; interesting first, keep original order otherwise
  const score = s => (interests && interests.includes(s.cat) ? 0 : 1);
  const all = (tv.spots || []).slice();
  const city = all.filter(s => !s.trip).sort((a, b) => score(a) - score(b)).map(mk);
  const trips = all.filter(s => s.trip).sort((a, b) => score(a) - score(b)).map(mk);
  // second country (Schengen combine)
  let city2 = [], country2 = "";
  if (opts.extraTv) { country2 = opts.extraTv.country; const b2 = opts.extraTv.hub || country2;
    const mk2 = s => ({ name:s.name, station:s.station, cat:s.cat, why:s.why, label:CAT_LABEL[s.cat] || "", dest:s.name + ", " + (s.city || country2), dir: mapsDir(b2, s.name + ", " + (s.city || country2)) });
    city2 = (opts.extraTv.spots || []).filter(s => !s.trip).sort((a, b) => score(a) - score(b)).map(mk2); }
  // day allocation
  const exploreDays = Math.max(0, days - 2);          // minus arrival + departure
  const splitB = opts.extraTv ? Math.floor(exploreDays / 2) : 0;  // days in country 2
  const capacity = exploreDays * perDay;
  const wanted = (interests ? all.filter(s => interests.includes(s.cat)).length : city.length + trips.length);
  const overcommit = wanted > capacity && days <= 4;   // more to see than fits calmly in a short trip
  const days_ = [];
  let ci = 0, ci2 = 0, ti = 0, dayInB = 0;
  const takeBalanced = (pool, ref, n) => {  // pick n, at most 1 heavy unless interested in it
    const picks = []; let heavy = 0; const maxHeavy = 1 + (interests ? 1 : 0);
    while (picks.length < n && ref.i < pool.length) {
      const s = pool[ref.i];
      const isHeavy = HEAVY_CATS.includes(s.cat);
      if (isHeavy && heavy >= maxHeavy) { // skip stacking heavy; try a lighter one further down
        const j = pool.findIndex((x, k) => k > ref.i && !HEAVY_CATS.includes(x.cat) && !picks.includes(x));
        if (j >= 0) { picks.push(pool[j]); pool.splice(j, 1); continue; }
      }
      if (isHeavy) heavy++; picks.push(s); ref.i++;
    }
    return picks;
  };
  const refC = { i:0 }, refC2 = { i:0 };
  for (let i = 1; i <= days; i++) {
    if (i === 1) { days_.push({ title: dayLabel(i, opts.startDate), kind:"arrive", note:"Arrive and check in around " + base + ". Sort your transit card and an eSIM, then an easy dinner nearby.", stops:[] }); continue; }
    if (i === days) { const cty = opts.extraTv ? country2 : country; const b = opts.extraTv ? (opts.extraTv.hub || country2) : base;
      days_.push({ title: dayLabel(i, opts.startDate), kind:"depart", note:"Slow morning, last souvenirs, then to the airport with time to spare.", stops:[{ name:"Airport", station:"Check your line to the airport", label:"", why:"", dir: mapsDir(b, "airport " + cty) }] }); continue; }
    const idx = i - 1; // explore day index (1-based within explore span)
    const inB = opts.extraTv && idx > (exploreDays - splitB);
    if (opts.extraTv && idx === (exploreDays - splitB) + 1) { // transfer to country 2
      days_.push({ title: dayLabel(i, opts.startDate), kind:"transfer", note:"Travel to " + country2 + " (fast train between the two, e.g. Thalys/Eurostar). Check in and take it easy.", stops: takeBalanced(city2, refC2, Math.max(1, perDay - 1)) });
      continue;
    }
    // day trip every 3rd explore day when trips exist and trip isn't over-packing a relaxed trip
    const wantTrip = !opts.extraTv && trips.length && idx % 3 === 0 && pace !== "relaxed";
    if (wantTrip && ti < trips.length) { const s = trips[ti++]; days_.push({ title: dayLabel(i, opts.startDate), kind:"trip", note:"Day trip. Back to " + base + " for dinner.", stops:[s] }); continue; }
    const pool = inB ? city2 : city, ref = inB ? refC2 : refC;
    const stops = takeBalanced(pool, ref, perDay);
    days_.push({ title: dayLabel(i, opts.startDate), kind:"explore", note:"Based in " + (inB ? (opts.extraTv.hub || country2) : base) + ". Take it at your pace, coffee breaks count.", stops });
  }
  return { days: days_, overcommit, pace, perDay, capacity, wanted };
}
// legacy wrapper used by callers
function itineraryDays(tv, days, base, startDate, opts) {
  return planItinerary(tv, Object.assign({ days, base, startDate }, opts || {})).days;
}
/* ----- road trip (caravan): drive between cities, with live driving directions ----- */
function planRoadTrip(tv, opts) {
  opts = opts || {};
  const country = tv.country || "";
  const base = opts.base || tv.hub || country;
  const days = Math.max(2, Math.min(14, +opts.days || 5));
  const cities = []; (tv.spots || []).forEach(s => { if (!cities.includes(s.city)) cities.push(s.city); });
  const out = []; let prev = base, prevLabel = base;
  for (let i = 1; i <= days; i++) {
    if (i === days) { out.push({ title: dayLabel(i, opts.startDate), kind:"drive", note:"Drive back to " + base + ". Return the car with fuel and time to spare.", leg:{ from:prevLabel, to:base, dir: mapsDir(prev, base, "driving") }, stops:[] }); break; }
    const city = cities[(i - 1) % cities.length]; const dest = city + ", " + country;
    const citySpots = (tv.spots || []).filter(s => s.city === city).slice(0, 2).map(s => ({ name:s.name, why:s.why, label:(typeof CAT_LABEL !== "undefined" ? CAT_LABEL[s.cat] : "") || "" }));
    out.push({ title: dayLabel(i, opts.startDate), kind:"drive", note:"Drive to " + city + ", park up and explore. Take breaks, enjoy the road.", leg:{ from:prevLabel, to:city, dir: mapsDir(prev, dest, "driving") }, stops:citySpots });
    prev = dest; prevLabel = city;
  }
  return { days: out, base, country };
}
function buildRoadTrip(tv, base, days, startDate) {
  const plan = planRoadTrip(tv, { base, days, startDate });
  return plan.days.map(day => {
    const lines = ["Drive: " + day.leg.from + " -> " + day.leg.to, "   Route (driving): " + day.leg.dir, day.note];
    day.stops.forEach(s => lines.push("\u2022 " + s.name + (s.label ? "  [" + s.label + "]" : "") + (s.why ? " \u2014 " + s.why : "")));
    return { h: day.title, text: lines.join("\n") };
  });
}

// text blocks for the PDF
function buildItinerary(tv, days, base, name, startDate) {
  return itineraryDays(tv, days, base, startDate).map(day => {
    const lines = [day.note];
    day.stops.forEach(s => { lines.push("• " + s.name + (s.station ? "  (near: " + s.station + ")" : "")); lines.push("   Directions from " + (base || tv.hub || "your base") + ": " + s.dir); });
    return { h: day.title, text: lines.join("\n") };
  });
}
