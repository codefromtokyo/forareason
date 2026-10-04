/* Ported: Visa & residency content. */
/* Visa and residency journeys — plain-English overviews to help people understand the path.
   NOT legal or immigration advice. Rules change often; every guide links to the official source.
   Facts checked September 2026. */
export const VISA: Record<string, any> = {
jp: {
  country:"Japan", authority:[["Immigration Services Agency of Japan","https://www.isa.go.jp/en/"],["Ministry of Justice","https://www.moj.go.jp/EN/"]],
  intro:"Most people arrive on a Status of Residence tied to a purpose (work, study, family), renew it, then aim for permanent residence or naturalisation. Japan does not use a points visa for most workers; your category is printed on your residence card.",
  types:[
    { title:"Work statuses", body:"Engineer/Specialist in Humanities/International Services covers most office and tech jobs. Others: Business Manager, Intra-company Transferee, Highly Skilled Professional (a points-based fast track to PR). Your employer usually sponsors it." },
    { title:"Student and trainee", body:"Student status for university or language school; you need separate permission to work part-time (up to 28 hours/week in term). Many switch to a work status after graduating." },
    { title:"Family and spouse", body:"Spouse or Child of Japanese National, or Dependent for the family of a worker. Spouses of Japanese nationals have shorter routes to PR and naturalisation." },
    { title:"Specified Skilled Worker (SSW)", body:"For specific sectors (care, food, construction and more). SSW (i) is time-limited; SSW (ii) can lead to longer stays and family." },
    { title:"Highly Skilled Professional (points)", body:"A points-based status for high earners and researchers. Enough points can bring PR in as little as 1–3 years and let you bring parents or a helper." },
    { title:"Startup and Business Manager", body:"For founders and company managers. Some cities run a startup visa that gives you months to set up before you need the full Business Manager status." }
  ],
  focus:[["work","Working"],["study","Studying"],["family","Family"],["pr","Settle (PR)"],["citizen","Citizenship"]],
  journey:[
    { stage:"work", title:"1. Entry visa and landing", body:"You get a visa at a Japanese embassy (often after a Certificate of Eligibility your employer or school obtains). On arrival you receive a Residence Card (在留カード)." },
    { stage:"work", title:"2. Register and settle", body:"Within 14 days, register your address at the city office and get a My Number. Enrol in health insurance and pension. Keep every payment record: unpaid tax or pension can sink a later PR or naturalisation application." },
    { stage:"work", title:"3. Renew and build years", body:"Renew your status before it expires. Aim to hold the longest period of stay for your category (from April 2027, PR generally expects a 5-year period of stay). Long absences can break your continuity." },
    { stage:"pr", title:"4. Permanent residence (永住)", body:"Generally after 10 years in Japan, at least 5 on a work status (shorter for spouses of Japanese nationals or Highly Skilled Professionals). You keep your nationality and lose work restrictions. From 1 Oct 2026 the fee is ¥200,000." },
    { stage:"citizen", title:"5. Naturalisation (帰化), if you want a passport", body:"Statutory minimum is 5 continuous years, but from April 2026 screening generally expects about 10 years of residence and real Japanese ability. You must renounce your other nationality. Spouses of Japanese nationals have a shorter route (3 years' marriage + 1 year residence)." }
  ],
  quiz:[
    ["Japan uses a points-based visa for most foreign workers.",false,"Most workers hold a purpose-based Status of Residence; the points system is a separate Highly Skilled track."],
    ["You must register your address at the city office within 14 days of moving in.",true,"Registration and My Number come first."],
    ["Unpaid tax or pension can hurt a later permanent-residence application.",true,"Payment records are checked closely."],
    ["Permanent residence generally needs about 10 years in Japan.",true,"Usually 10 years, at least 5 on a work status; shorter for some spouses."],
    ["Naturalisation lets you keep your original nationality.",false,"Japan generally requires you to renounce it."],
    ["A spouse of a Japanese national has a shorter route to naturalisation.",true,"3 years of marriage plus 1 year of residence, among other conditions."]
  ]
},
nl: {
  country:"the Netherlands", authority:[["IND (Immigration and Naturalisation Service)","https://ind.nl/en"],["Government of the Netherlands","https://www.government.nl/topics/immigration-to-the-netherlands"]],
  intro:"EU/EEA and Swiss citizens can live and work freely. Others usually need a residence permit for a purpose (work, highly skilled migrant, study, family), then can move to permanent residence and Dutch nationality. Many steps run through the IND and your municipality.",
  types:[
    { title:"Highly skilled migrant / work", body:"The main route for professionals: an employer that is a recognised sponsor applies, and you must earn above a salary threshold. There is also the EU Blue Card and an orientation year for recent graduates of top universities." },
    { title:"Student", body:"A residence permit for study, sponsored by your school. You may work limited hours and get an orientation year (zoekjaar) to find work after graduating." },
    { title:"Family", body:"Family reunification with a partner or family member who lives in the Netherlands, subject to income and, often, a basic civic integration exam abroad." },
    { title:"Self-employed and startup", body:"Permits for self-employment or for startup founders working with a facilitator, judged on the value to the Dutch economy." },
    { title:"EU Blue Card & ICT", body:"For highly qualified workers (EU Blue Card) and intra-company transfers (ICT) moving within a multinational." },
    { title:"Orientation year (zoekjaar)", body:"Recent graduates of top universities get a year to look for work or start a business in the Netherlands." }
  ],
  focus:[["work","Working"],["study","Studying"],["family","Family"],["pr","Settle (PR)"],["citizen","Citizenship"]],
  journey:[
    { stage:"work", title:"1. Entry (MVV) and permit", body:"Non-EU nationals usually need an MVV (entry visa) plus a residence permit, arranged together via a sponsor. EU/EEA/Swiss citizens skip this." },
    { stage:"work", title:"2. Register in the BRP", body:"Register your address at the municipality to get a BSN (citizen service number). You need it for work, banking, healthcare and everything after." },
    { stage:"study", title:"3. Integrate", body:"Many permit holders must pass the civic integration exam (inburgering), currently around A2 Dutch plus knowledge of society, within a set time. EU citizens are exempt." },
    { stage:"pr", title:"4. Permanent residence", body:"After 5 uninterrupted years on a valid permit, with steady income and the integration diploma, you can apply for a permanent residence permit or EU long-term resident status." },
    { stage:"citizen", title:"5. Dutch nationality", body:"Naturalisation after 5 years of lawful residence (3 if you live with a Dutch partner), with the integration diploma and usually renouncing your other nationality. A faster 'option' procedure exists for some people with a strong tie to the Netherlands. A proposal to extend 5 years to 10 was floated but is not law as of 2026." }
  ],
  quiz:[
    ["EU/EEA and Swiss citizens need a residence permit to live in the Netherlands.",false,"They can live and work freely; others need a permit."],
    ["The BSN (citizen service number) comes from registering in the municipality (BRP).",true,"You need it for work, banking and healthcare."],
    ["Permanent residence usually needs 5 uninterrupted years on a valid permit.",true,"Plus steady income and, usually, the integration diploma."],
    ["The civic integration exam is currently around A2 Dutch.",true,"A2, plus knowledge of Dutch society; a rise to B1 has been proposed."],
    ["You can naturalise after 3 years if you live with a Dutch partner.",true,"Otherwise 5 years of lawful residence."],
    ["The Netherlands has already extended naturalisation from 5 to 10 years.",false,"That was proposed but is not law; 5 years still applies."]
  ]
},
fr: {
  country:"France", authority:[["Service-Public (official)","https://www.service-public.fr/particuliers/vosdroits/N110"],["France-Visas","https://france-visas.gouv.fr/en/"]],
  intro:"EU/EEA and Swiss citizens live and work freely. Others usually get a long-stay visa (VLS-TS) for a purpose, renew it as a residence card (titre de séjour), then a multi-year or resident card, and can apply for French nationality. Recent law raised the French level needed for some permits.",
  types:[
    { title:"Work (salarié, passeport talent)", body:"The Passeport Talent covers skilled workers, researchers and founders, often for up to 4 years. Standard salarié permits are tied to a job and employer." },
    { title:"Student", body:"A student long-stay visa lets you study and work limited hours. Graduates can get a temporary residence permit to look for work (APS)." },
    { title:"Family", body:"Family reunification (regroupement familial) or a private-and-family-life card for partners and family of residents and French nationals." },
    { title:"Visitor and others", body:"A visitor card (no work) for those with means; plus permits for specific situations. From 2026, a B1-level French requirement applies to some multi-year cards." },
    { title:"Talent – founder & researcher", body:"Passeport Talent sub-types for startup founders (French Tech), researchers and highly qualified employees, often for up to 4 years and covering family." }
  ],
  focus:[["work","Working"],["study","Studying"],["family","Family"],["pr","Settle (card)"],["citizen","Citizenship"]],
  journey:[
    { stage:"work", title:"1. Long-stay visa (VLS-TS)", body:"Non-EU nationals apply at a French consulate for a long-stay visa acting as a residence permit for the first year; validate it online after arrival." },
    { stage:"work", title:"2. Titre de séjour", body:"Before it expires, renew at the préfecture as a residence card. Register with health insurance and, if required, sign the integration contract (CIR) with French classes." },
    { stage:"pr", title:"3. Multi-year and resident card", body:"After the first year you can often get a multi-year card, then a 10-year carte de résident after about 5 years of stable residence, with a French-language level." },
    { stage:"citizen", title:"4. French nationality", body:"Naturalisation by decree generally after 5 years of residence (2 if you graduated from a French university), with French at B1 or above, stable income and integration. Marriage to a French citizen is a separate route." }
  ],
  quiz:[
    ["A non-EU national usually needs a long-stay visa (VLS-TS) to settle in France.",true,"It acts as a residence permit for the first year."],
    ["You must validate the VLS-TS after arriving in France.",true,"Validate it online, then renew at the préfecture."],
    ["The 10-year carte de résident usually comes after about 5 years of stable residence.",true,"With a French-language level and stable income."],
    ["Naturalisation generally needs 5 years of residence.",true,"2 years if you graduated from a French university."],
    ["From 2026, some multi-year cards require B1-level French.",true,"The language bar was raised by recent law."],
    ["EU citizens need a French residence permit to live in France.",false,"EU/EEA and Swiss citizens live and work freely."]
  ]
}
};
