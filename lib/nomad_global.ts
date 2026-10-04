/* Ported: global digital-nomad reference. */
/* Global remote-work reference. Figures checked September 2026 from multiple trackers; income thresholds
   are pegged to local minimum/average wages and change yearly, so treat as rough and confirm officially. */
export const NOMAD_WORLD: Record<string, any> = {
  updated: "September 2026",
  // [country, visa name, rough income/savings requirement, typical duration, note]
  visas: [
    ["Portugal", "D8", "~€3,680/mo", "1–2 yrs, renewable", "Path to PR/citizenship after 5 yrs"],
    ["Spain", "Digital Nomad Visa", "~€2,760/mo", "up to 5 yrs", "24% flat tax option; counts toward residency"],
    ["Italy", "Digital Nomad Visa", "~€28,000/yr", "1 yr, renewable", "Needs professional experience"],
    ["Greece", "Digital Nomad Visa", "~€3,500/mo", "1 yr", "Apply at a consulate before travel"],
    ["Croatia", "Digital Nomad", "~€2,540–3,600/mo", "up to 18 mo", "No renewal; local tax exemption"],
    ["Estonia", "Digital Nomad Visa", "~€4,500/mo", "1 yr", "Highest EU bar; e-Residency is separate"],
    ["Malta", "Nomad Residence", "~€3,500/mo", "1 yr, renewable", "English-speaking EU option"],
    ["Germany", "Freelancer (§21)", "self-sustaining", "up to 3 yrs", "Counts toward PR at 5 yrs"],
    ["UAE (Dubai)", "Virtual Working", "~$3,500/mo", "1 yr, renewable", "0% income tax; 6-mo bank history"],
    ["Thailand", "DTV", "~฿500,000 savings", "5 yrs, 180 days/entry", "Savings, not monthly income"],
    ["Malaysia", "DE Rantau", "~$24,000/yr", "1 yr, renewable", "Fast internet, safe"],
    ["Indonesia (Bali)", "Remote Worker (E33G)", "~$60,000/yr", "1 yr", "Tourist-visa working is enforced"],
    ["Japan", "Digital Nomad", "~¥10M/yr", "6 mo, no renewal", "~50 eligible nationalities; no residence card"],
    ["South Korea", "Workation (F-1-D)", "~$65,000/yr", "up to 2 yrs", "Multiple entry"],
    ["Taiwan", "Digital Nomad", "~$20,000/yr (under 30)", "6 mo–2 yrs", "Extended in 2026"],
    ["Costa Rica", "Rentista/Nomad", "~$3,000/mo", "1 yr + renewal", "Territorial tax"],
    ["Mexico", "Temporary Resident", "~$2,600–4,300/mo", "1–4 yrs", "Popular, flexible"],
    ["Brazil", "Digital Nomad", "~$1,500/mo or $18k savings", "1 yr, renewable", "Low bar"],
    ["Colombia", "Digital Nomad (V)", "~$750–1,400/mo", "up to 2 yrs", "Cheapest, Medellín hub"],
    ["Georgia", "Remotely from Georgia", "no fixed minimum", "up to 1 yr", "Visa-free for many; favourable tax"]
  ],
  // How the picture differs by passport. Honest, high-level.
  passports: {
    in: { label: "Indian passport", notes: [
      "You usually apply at a consulate before you travel; visa-free stays are shorter than for US/EU holders.",
      "Open to Indians and low-barrier: Thailand DTV (savings ~₹12L), Malaysia DE Rantau, UAE Dubai, Georgia, Brazil, Colombia, Mexico, Portugal, Spain, Montenegro.",
      "Japan's digital-nomad visa needs a visa-waiver + tax-treaty nationality; India is not on that list, so Japan's DN route generally isn't open.",
      "Carry 6 months of bank statements and clean paperwork; approvals tightened in 2025–26."
    ]},
    us: { label: "US passport", notes: [
      "Widest access. Special routes: Netherlands DAFT (€4,500 in a Dutch business, renewable, PR at 5 yrs).",
      "You still file US taxes on worldwide income wherever you live; the FEIE excludes ~$120k but you must file.",
      "Strong picks: Portugal D8, Spain, Mexico, Costa Rica, Dubai (0% tax), Thailand DTV."
    ]},
    eu: { label: "EU / EEA / Swiss passport", notes: [
      "You can already live and work in any EU/EEA country and Switzerland with no visa. Digital-nomad visas are for non-EU destinations.",
      "For outside the EU (Thailand, UAE, Latin America, Asia), you use the same nomad visas as everyone else."
    ]},
    gb: { label: "UK passport", notes: [
      "Post-Brexit you need a visa to stay long-term in the EU; the nomad visas (Portugal, Spain, Greece, Croatia, Estonia, Italy, Malta) are the route.",
      "Also strong: UAE, Thailand DTV, and Latin America."
    ]},
    other: { label: "Other passports", notes: [
      "Eligibility and visa-free days vary a lot by country. Check the destination's official page for your nationality.",
      "Savings-based options (Thailand DTV, Brazil) and low-income hubs (Colombia, Georgia, Mexico) tend to be the most open."
    ]}
  },
  sources: [
    ["Global tracker (Genki)", "https://guide.genki.world/digital-nomad-visa/"],
    ["Country list & income (Ellis)", "https://www.ellis.com/resources/digital-nomad-visas-explained"],
    ["For Indian citizens", "https://freakingnomads.com/best-digital-nomad-visas-for-indian-citizens/"]
  ]
};
