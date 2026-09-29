/* Tourist-visa checklists by destination and passport type. Checked September 2026; rules change, so each
   links to the official source. EES is live at Schengen borders (Apr 2026); ETIAS is delayed, likely 2027. */
const VISA_CHECK = {
  jp: {
    country:"Japan", official:[["Japan MOFA visa","https://www.mofa.go.jp/j_info/visit/visa/"],["Japan eVISA","https://www.evisa.mofa.go.jp/"]],
    // by passport tier
    exempt:{ list:"US, UK, EU/EEA, Australia, Canada, Singapore, South Korea and many others",
      note:"Visa-free for short tourism, usually up to 90 days. You just need a passport valid for your stay, a return ticket and proof of funds if asked." },
    visa:{ who:"Indian passport (and other visa-required nationalities)",
      type:"Apply for a short-term tourist visa. Indian nationals can often use the Japan eVISA online after an embassy-registered agent, or apply at the embassy/VFS.",
      where:"Japan embassy/consulate or VFS Global; eVISA portal where eligible",
      timeline:"Usually about 5–7 working days once documents are in.",
      docs:["Passport valid for the stay, with blank pages","Visa application form (one per applicant)","One recent passport photo (per spec)","Confirmed round-trip flight booking","Day-by-day itinerary in Japan","Hotel bookings / where you'll stay","Bank statements (last 3–6 months) showing funds","Certificate of employment / income, or business proof","If sponsored: sponsor's letter, funds and relationship proof"] }
  },
  nl: { schengen:true, country:"the Netherlands (Schengen)", official:[["Netherlands short-stay visa","https://www.netherlandsworldwide.nl/visa-the-netherlands"],["EES/ETIAS info","https://travel-europe.europa.eu/ees_en"]] },
  fr: { schengen:true, country:"France (Schengen)", official:[["France short-stay visa","https://france-visas.gouv.fr/en/"],["EES/ETIAS info","https://travel-europe.europa.eu/ees_en"]] }
};
// Shared Schengen content (NL, FR)
const SCHENGEN = {
  exempt:{ list:"US, UK, EU/EEA/Swiss, Canada, Australia, Japan and ~60 others",
    note:"Visa-free for short stays (90 days in any 180). Fingerprints and a photo are now taken at the border (EES, live since April 2026). ETIAS (a €20 online authorisation, like the US ESTA) is delayed and expected around 2027; it is NOT required yet." },
  visa:{ who:"Indian passport (and other visa-required nationalities)",
    type:"Apply for a Schengen short-stay (Type C) visa at the country where you'll spend the most time (or your first entry).",
    where:"That country's visa centre, usually VFS Global; book an appointment.",
    timeline:"Apply up to 6 months ahead; allow ~15 working days, sometimes longer in peak season.",
    docs:["Passport valid 3+ months beyond your stay, 2 blank pages, issued in the last 10 years","Schengen visa application form, signed","Two recent photos (Schengen/ICAO spec)","Travel medical insurance covering €30,000, valid across Schengen","Confirmed round-trip flight reservation","Proof of accommodation (hotel bookings) for the whole stay","Day-by-day itinerary","Bank statements (last 3–6 months) showing sufficient funds","Cover letter explaining your trip","Employment proof and leave letter / no-objection; or business registration","If sponsored: sponsor's letter, their bank statements and relationship proof","Visa fee payment"] }
};
