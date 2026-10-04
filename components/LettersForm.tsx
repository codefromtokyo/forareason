"use client";
import { useState } from "react";
import { makePDF } from "@/lib/pdf";

const idLabel = (code: string) => code === "jp" ? "Residence card number" : code === "nl" ? "BSN / residence permit number" : code === "fr" ? "Residence permit (titre de séjour) number" : "Local ID / residence permit number";

export function LettersForm() {
  const [d, setD] = useState<any>({ name: "", nationality: "", passport: "", home: "", base: "", start: "", end: "", purpose: "Tourism", country: "Japan", sponsor: "", relation: "", sponsorPassport: "", sponsorId: "", host: "", hostAddr: "", code: "jp" });
  const set = (k: string, v: string) => setD({ ...d, [k]: v });
  const F = (k: string, label: string, ph = "") => (
    <label className="block text-sm font-semibold">{label}
      <input value={d[k]} onChange={(e) => set(k, e.target.value)} placeholder={ph} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" />
    </label>
  );
  const dates = `${d.start || "____"} to ${d.end || "____"}`;
  const fields = [{ label: "Full name", value: d.name }, { label: "Base in " + d.country, value: d.base }, { label: "Dates", value: dates }];

  const gen = (kind: string) => {
    if (kind === "cover") {
      const body = `Date: ${new Date().toLocaleDateString()}\n\nTo the Visa Officer,\n\nSubject: ${d.purpose} visa application for ${d.country}\n\nDear Sir or Madam,\n\nI, ${d.name || "____"}, a ${d.nationality || "____"} national holding passport number ${d.passport || "____"}, am applying for a visa to visit ${d.country} from ${dates}. During my stay I will be based in ${d.base || "____"}.\n\nThe purpose of my trip is ${(d.purpose || "tourism").toLowerCase()}. I have attached my itinerary, proof of accommodation and funds, insurance, and confirmed return travel. I am settled in ${d.home || "____"} and intend to return at the end of my visit.\n\nThank you for considering my application.\n\nYours faithfully,\n${d.name || "____"}`;
      makePDF({ filename: "cover-letter.pdf", title: "Visa cover letter", subtitle: d.country, fields, blocks: [{ text: body }] });
    } else if (kind === "sponsor") {
      const body = `Date: ${new Date().toLocaleDateString()}\n\nTo the Visa Officer,\n\nSubject: Letter of sponsorship for ${d.name || "____"}\n\nDear Sir or Madam,\n\nI, ${d.sponsor || "____"}, holder of passport number ${d.sponsorPassport || "____"} and ${idLabel(d.code)} ${d.sponsorId || "____"}, hereby confirm that I am sponsoring ${d.name || "____"} (my ${d.relation || "____"}) for their trip to ${d.country} from ${dates}. I take full financial responsibility for their travel, accommodation and living expenses, and confirm they will return to ${d.home || "their home country"} afterwards.\n\nI have attached proof of my funds, identity and relationship to the applicant.\n\nYours faithfully,\n${d.sponsor || "____"}`;
      makePDF({ filename: "sponsorship-letter.pdf", title: "Sponsorship letter", subtitle: d.country, fields: [...fields, { label: "Sponsor", value: d.sponsor }, { label: "Sponsor passport", value: d.sponsorPassport }, { label: idLabel(d.code), value: d.sponsorId }], blocks: [{ text: body }] });
    } else {
      const body = `Date: ${new Date().toLocaleDateString()}\n\nTo the Visa Officer,\n\nSubject: Letter of invitation for ${d.name || "____"}\n\nDear Sir or Madam,\n\nI, ${d.host || "____"}, residing at ${d.hostAddr || "____"}, invite ${d.name || "____"} (${d.nationality || "____"}, passport ${d.passport || "____"}) to visit me in ${d.country} from ${dates}. They will stay with me at the address above. I confirm they will return to ${d.home || "their home country"} at the end of the visit.\n\nYours faithfully,\n${d.host || "____"}`;
      makePDF({ filename: "invitation-letter.pdf", title: "Invitation letter", subtitle: d.country, fields: [...fields, { label: "Host", value: d.host }], blocks: [{ text: body }] });
    }
  };

  return (
    <div className="space-y-5">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="font-read text-lg font-bold">Your details</h2>
        <div className="flex gap-2">{[["jp", "Japan"], ["nl", "Netherlands"], ["fr", "France"]].map(([k, l]) => (
          <button key={k} onClick={() => setD({ ...d, code: k, country: l })} className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${d.code === k ? "border-delft bg-delft text-white" : "border-slate-200"}`}>{l}</button>
        ))}</div>
        {F("name", "Full name (as in passport)")}{F("nationality", "Nationality", "e.g. Indian")}{F("passport", "Passport number")}
        {F("home", "Home city & country")}{F("base", "Base location on the trip")}
        <div className="grid grid-cols-2 gap-2">{F("start", "Arrival date")}{F("end", "Departure date")}</div>
        {F("purpose", "Purpose of trip")}
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="font-read text-lg font-bold">✉️ Cover letter</h2><button onClick={() => gen("cover")} className="mt-2 rounded-lg bg-delft px-4 py-2 font-semibold text-white">Download PDF</button></section>
      <section className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="font-read text-lg font-bold">🤝 Sponsorship letter</h2>{F("sponsor", "Sponsor name")}{F("relation", "Relationship to you")}{F("sponsorPassport", "Sponsor passport number")}{F("sponsorId", idLabel(d.code))}<button onClick={() => gen("sponsor")} className="mt-1 rounded-lg bg-delft px-4 py-2 font-semibold text-white">Download PDF</button></section>
      <section className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="font-read text-lg font-bold">🏠 Invitation letter</h2>{F("host", "Host name")}{F("hostAddr", "Host address")}<button onClick={() => gen("invite")} className="mt-1 rounded-lg bg-delft px-4 py-2 font-semibold text-white">Download PDF</button></section>
      <p className="text-xs text-amber-700">Fillable PDFs to save you time, not legal advice. Key fields stay editable in the PDF.</p>
    </div>
  );
}
