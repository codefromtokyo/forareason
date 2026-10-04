/* Dependent / family visa + work-rights notes. Checked Sept 2026; rules change, confirm officially. */
export const DEPENDENT: Record<string, { title: string; points: string[]; source: [string, string] }> = {
  jp: { title: "Joining family in Japan (Dependent visa)", points: [
    "Spouses and children of a worker come on a Dependent (家族滞在) status, tied to the main visa holder.",
    "By default you cannot work. To work part-time (up to 28 hours/week) you must apply for 'permission to engage in activity other than that permitted' at immigration.",
    "A spouse of a Japanese national or permanent resident has a different status with no work restriction.",
    "You get a residence card, can register at the city office, and join health insurance as a dependent.",
  ], source: ["Immigration Services Agency", "https://www.isa.go.jp/en/"] },
  nl: { title: "Joining family in the Netherlands", points: [
    "Partners and family reunification permits usually allow you to work freely — your employer does not need a separate work permit.",
    "You get a BSN, can open a bank account, and must take Dutch health insurance once you live there.",
    "Civic integration (inburgering) may apply; many partners use it to build their own footing and network.",
    "Your residence is linked to the main applicant, but you build your own path to permanent residence over time.",
  ], source: ["IND", "https://ind.nl/en"] },
  fr: { title: "Joining family in France", points: [
    "Family reunification and 'vie privée et familiale' permits generally allow you to work.",
    "Partners of Talent-passport holders get a 'passeport talent (famille)' that permits work.",
    "You register for health cover (PUMA) after a few months and can join French classes via the integration contract (CIR).",
    "Spouses of French nationals have their own residence route.",
  ], source: ["Service-Public", "https://www.service-public.fr/"] },
};
