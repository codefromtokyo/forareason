/* Relocation "settle-in" checklists per country. Checked Sept 2026; steps change, confirm officially. */
export const SETTLE: Record<string, { country: string; steps: { title: string; body: string }[]; sources: [string, string][] }> = {
  jp: {
    country: "Japan",
    steps: [
      { title: "Register your address (within 14 days)", body: "Go to the city/ward office with your residence card; you'll be entered in the resident register and can get a My Number." },
      { title: "Get My Number", body: "Your individual number arrives by mail; needed for work, banking and tax. Apply for the physical card if you want ID." },
      { title: "Enrol in health insurance & pension", body: "Join National Health Insurance (or your employer's) and the pension at the city office. Keep every payment record for later visa/PR." },
      { title: "Open a bank account", body: "Japan Post Bank or a megabank. Bring your residence card, My Number and sometimes a phone number and address proof." },
      { title: "Get a phone / SIM", body: "A local SIM or MVNO (IIJmio, Rakuten) with your residence card; an eSIM bridges the first days." },
      { title: "Set up transit & utilities", body: "Add Suica/Pasmo to your phone; set up electricity, gas, water and internet for your flat." },
    ],
    sources: [["Immigration Services Agency", "https://www.isa.go.jp/en/"], ["My Number", "https://www.digital.go.jp/en/"]],
  },
  nl: {
    country: "the Netherlands",
    steps: [
      { title: "Register at the municipality (BRP) & get a BSN", body: "Book an appointment; bring your passport and a birth certificate (often apostilled). The BSN is needed for everything." },
      { title: "Open a bank account", body: "With your BSN and address. Online banks (bunq) are fast; traditional banks (ABN AMRO, ING) are widely accepted." },
      { title: "Take out health insurance (mandatory)", body: "Dutch basic insurance is required within 4 months of registering; ~€140/mo. Compare on Independer/Zorgwijzer." },
      { title: "Register with a GP (huisarts)", body: "Your gateway to healthcare; register near home as some have waiting lists." },
      { title: "Get a phone / SIM & DigiD", body: "A SIM with your BSN; set up DigiD (your login for government and health services)." },
      { title: "Sort housing admin", body: "Rental contract, energy and internet, and the gemeente's waste pass if needed." },
    ],
    sources: [["Government of the Netherlands", "https://www.government.nl/topics/immigration-to-the-netherlands"], ["DigiD", "https://www.digid.nl/en"]],
  },
  fr: {
    country: "France",
    steps: [
      { title: "Validate your long-stay visa (VLS-TS)", body: "Validate online within 3 months of arrival and pay the tax; this makes your visa a valid residence permit." },
      { title: "Register for health cover (PUMA)", body: "After ~3 months of residence, apply to the CPAM for a social security number and carte Vitale." },
      { title: "Open a bank account", body: "With your passport, visa and proof of address. Online banks accept newcomers; a RIB is needed for rent and salary." },
      { title: "Get a phone / SIM", body: "A French SIM (Free, Orange, SFR) with ID; eSIM for the first days." },
      { title: "Set up home & tax", body: "Energy and internet contracts; you'll declare income and pay the taxe d'habitation/foncière rules as they apply." },
      { title: "Register with a doctor (médecin traitant)", body: "Declare a treating doctor to get full reimbursement rates." },
    ],
    sources: [["Service-Public", "https://www.service-public.fr/"], ["Validate VLS-TS", "https://administration-etrangers-en-france.interieur.gouv.fr/"]],
  },
};
