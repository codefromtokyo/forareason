/* Remote-work & digital-nomad overviews. NOT legal or tax advice; rules change fast. Checked September 2026. */
const NOMAD = {
jp: {
  country:"Japan", authority:[["Immigration Services Agency","https://www.isa.go.jp/en/"],["Ministry of Foreign Affairs (visa)","https://www.mofa.go.jp/j_info/visit/visa/"]],
  intro:"Japan opened a digital-nomad visa in 2024: up to 6 months for high-earning remote workers from eligible countries. Below the income bar, many nomads simply visit as tourists. Coworking and connectivity are excellent in the big cities.",
  types:[
    { title:"Digital Nomad visa (6 months)", body:"A Designated Activities status for remote work for non-Japanese employers or clients. Up to 6 months, not renewable: you must leave and reapply. You do NOT get a residence card, which limits things like opening a local bank account." },
    { title:"Who qualifies", body:"Nationals of ~50 countries and regions that have both a visa-waiver arrangement and a tax treaty with Japan (US, UK, most of the EU, Australia, Canada, Singapore, South Korea, Taiwan and more). Check the official list before applying." },
    { title:"Income and insurance", body:"You must show about ¥10 million/year (roughly US$65–70k) in active remote income, plus private health insurance covering at least ¥10 million. Family can join under a matching status." },
    { title:"Visiting as a tourist instead", body:"If your stay is short or you're under the income bar, entering visa-free as a tourist lets you travel and work for your own foreign clients within the allowed period. It's simpler, but capped at 90 days and not a work status." }
  ],
  setup:[
    { title:"1. Connectivity", body:"Get an eSIM before you land, or a data SIM/pocket wifi at the airport. Coverage is excellent nationwide. Cafés and coworking spaces have fast wifi." },
    { title:"2. Where to base", body:"Tokyo and Osaka have the most coworking (WeWork, local spaces). Fukuoka is cheaper and startup-friendly. Trains make day trips easy within the 6 months." },
    { title:"3. Money", body:"Without a residence card you usually can't open a Japanese bank account. Use a multi-currency card (Wise/Revolut) and carry some cash; Japan is still cash-friendly." },
    { title:"4. Tax", body:"No Japanese tax on foreign income for stays under 183 days in a year, but you remain taxable at home. This is general info, not tax advice." },
    { title:"5. Community", body:"There are active remote-worker and expat groups in Tokyo and Osaka. Meetups and coworking are the fastest way in." }
  ],
  cities:[
    ["Tokyo","World-class transport and coworking, endless food, safe at any hour.","US$2,500–4,000"],
    ["Osaka","Cheaper than Tokyo, warmer, famously friendly, great food scene.","US$2,000–3,200"],
    ["Fukuoka","Startup-friendly and compact, beaches and mountains close by.","US$1,700–2,800"]
  ],
  jobs:[
    ["We Work Remotely","https://weworkremotely.com/","Large board, strong for engineering and design."],
    ["Remote OK","https://remoteok.com/","Aggregates remote roles across tech."],
    ["Wellfound","https://wellfound.com/","Startup jobs, many remote-first."],
    ["Japan Dev","https://japan-dev.com/","Tech jobs at companies in Japan, some remote."]
  ],
  quiz:[
    ["Japan's digital-nomad visa lets you stay up to 6 months.",true,"6 months, and it cannot be renewed."],
    ["You can work for Japanese companies on the digital-nomad visa.",false,"Only for non-Japanese employers or clients."],
    ["The income requirement is about ¥10 million a year.",true,"Roughly US$65–70k in active remote income."],
    ["Digital-nomad visa holders get a residence card.",false,"No residence card, which limits local banking."],
    ["Below the income bar, a short tourist visit still allows working for your own foreign clients.",true,"Within the visa-free period; it's not a work status though."],
    ["Foreign income is generally not taxed in Japan for stays under 183 days.",true,"You still owe tax at home."]
  ]
},
nl: {
  country:"the Netherlands", authority:[["IND (immigration)","https://ind.nl/en"],["KVK (business register)","https://www.kvk.nl/english/"]],
  intro:"The Netherlands has no simple digital-nomad visa. Americans use the easy DAFT route; others use the harder self-employed permit or a sponsored job. Amsterdam housing is brutal, so many land in Rotterdam, Utrecht or The Hague.",
  types:[
    { title:"DAFT (US citizens)", body:"The Dutch-American Friendship Treaty: register a Dutch business (KVK) and keep €4,500 in a business account. No income test or points. Granted for 2 years, renewable, and counts towards permanent residence after 5 years. One of the easiest EU routes for Americans." },
    { title:"Self-employed permit (others)", body:"Non-Americans register a business and pass a points test proving the enterprise adds value to the Dutch economy. Notably harder than DAFT." },
    { title:"Highly skilled migrant", body:"If a Dutch employer that is a recognised sponsor hires you above the salary threshold, that's often the smoothest route to living there long-term." },
    { title:"Short stays (Schengen)", body:"Any non-EU national can stay 90 days in any 180 under Schengen and work for their own foreign clients, but that's not a residence route." }
  ],
  setup:[
    { title:"1. Register (BRP) and BSN", body:"Once you have a permit, register your address at the municipality to get a BSN. You need it for banking, business and healthcare." },
    { title:"2. Business and bank", body:"For DAFT/self-employed, register at the KVK (an eenmanszaak/sole proprietorship is simplest, ~€50) and open a Dutch business bank account." },
    { title:"3. Health insurance", body:"Dutch basic health insurance is mandatory once you live there. Arrange it soon after arrival." },
    { title:"4. Connectivity and coworking", body:"Fast internet everywhere; English is widely spoken. Coworking is strong in Amsterdam, Rotterdam and Utrecht." },
    { title:"5. Tax", body:"Living there usually makes you a Dutch tax resident on worldwide income; treaties avoid double taxation. Get proper advice." }
  ],
  cities:[
    ["Rotterdam","Modern, cheaper than Amsterdam, easy to find a desk and a flat.","€2,400–3,400"],
    ["Utrecht","Central, calm, quick train to everywhere.","€2,400–3,300"],
    ["The Hague","By the sea, international, more relaxed housing than Amsterdam.","€2,300–3,300"]
  ],
  jobs:[
    ["We Work Remotely","https://weworkremotely.com/","Large general remote board."],
    ["Remotive","https://remotive.com/","Curated remote roles, EU-friendly."],
    ["Wellfound","https://wellfound.com/","Startup and remote-first jobs."],
    ["Honeypot","https://www.honeypot.io/","EU developer jobs, some remote."]
  ],
  quiz:[
    ["The Netherlands has a simple, low-bar digital-nomad visa for everyone.",false,"There's no general nomad visa; routes differ by nationality."],
    ["DAFT is only for US citizens.",true,"It comes from the Dutch-American Friendship Treaty."],
    ["DAFT requires keeping about €4,500 in a Dutch business account.",true,"No income test or points, unlike the self-employed permit."],
    ["DAFT time can count towards permanent residence after 5 years.",true,"It's renewable and a real residence route."],
    ["Non-Americans use the harder self-employed permit or a sponsored job.",true,"The self-employed permit uses a points test."],
    ["You need a BSN, from registering at the municipality, to bank and run a business.",true,"Register in the BRP first."]
  ]
},
fr: {
  country:"France", authority:[["Service-Public (official)","https://www.service-public.fr/particuliers/vosdroits/N110"],["France-Visas","https://france-visas.gouv.fr/en/"]],
  intro:"France has no dedicated digital-nomad visa, but several long-stay routes fit remote workers. In June 2026 the Interior Ministry confirmed you can hold the visitor permit while keeping a foreign job, under conditions. EU citizens need nothing special.",
  types:[
    { title:"Visitor (VLS-TS visiteur)", body:"For someone living on their own resources who signs not to work for French clients. Since June 2026, keeping a salaried job with a foreign company is allowed under conditions. Needs about €1,478 net/month; 1 year, renewable." },
    { title:"Entrepreneur / profession libérale", body:"For freelancers invoicing from a French address. You register your activity at the guichet unique and show it's viable, around €1,867/month from the activity; 1 year." },
    { title:"Talent passport", body:"For founders (French Tech), researchers and highly qualified employees. Often up to 4 years and covers family." },
    { title:"Short stays (Schengen)", body:"Non-EU nationals can stay 90 days in any 180 under Schengen and work for their own foreign clients; not a residence route." }
  ],
  setup:[
    { title:"1. Long-stay visa first", body:"Apply at a French consulate for the right long-stay visa (visitor, profession libérale, or Talent), then validate it online after you arrive." },
    { title:"2. Register your activity", body:"Freelancers register at the guichet unique; you may get a SIRET number. The visitor route bars French professional activity." },
    { title:"3. Health cover", body:"Show private health insurance for the visa; after a few months of residence you may join the French system (PUMA)." },
    { title:"4. Connectivity and coworking", body:"Good internet and lots of coworking in Paris, Lyon, Bordeaux and Nice. A French SIM is cheap; an eSIM bridges the first days." },
    { title:"5. Tax", body:"Long stays can make you a French tax resident; treaties prevent double taxation. Take professional advice." }
  ],
  cities:[
    ["Lyon","Big-city amenities, cheaper than Paris, great food and trains.","€2,200–3,200"],
    ["Bordeaux","Wine country, sunny, strong coworking scene.","€2,100–3,000"],
    ["Nice","Riviera base, sun and sea, good flights across Europe.","€2,300–3,300"]
  ],
  jobs:[
    ["We Work Remotely","https://weworkremotely.com/","Large general remote board."],
    ["Remotive","https://remotive.com/","Curated remote roles, EU-friendly."],
    ["Welcome to the Jungle","https://www.welcometothejungle.com/","Popular in France, filter for remote."],
    ["Wellfound","https://wellfound.com/","Startup and remote-first jobs."]
  ],
  quiz:[
    ["France has a dedicated digital-nomad visa.",false,"It doesn't; several long-stay routes fit instead."],
    ["Since June 2026, the visitor permit can be held while keeping a foreign salaried job, under conditions.",true,"The Interior Ministry confirmed this in writing."],
    ["The visitor route lets you work for French clients.",false,"It bars French professional activity."],
    ["Freelancers use the entrepreneur / profession libérale route.",true,"You register the activity at the guichet unique."],
    ["The Talent passport can last up to 4 years and cover family.",true,"For founders, researchers and highly qualified staff."],
    ["EU citizens need a special visa to work remotely from France.",false,"EU/EEA and Swiss citizens live and work freely."]
  ]
}
};
