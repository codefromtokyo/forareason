/* Cost of living + rough net-pay calculators. Figures checked September 2026; taxes and rents change,
   so these are estimates, not tax or financial advice. */
const COST = {
  jp: { name:"Japan", cur:"JPY", sym:"\u00a5", city:"Tokyo",
    rent:{ centre:[150000,190000], outside:[90000,120000] },
    essentials:[70000,110000], transport:[8000,15000],
    whatYouGet:"Compact, efficient flats; world-class transport; very safe; cash still handy. Tokyo rents are rising. Foreigners often need a guarantor company and key money up front.",
    taxNote:"Take-home is gross minus ~14.7% social insurance, national income tax (5-45%) and ~10% resident tax (billed from your second year).",
    sources:[["NTA (tax)","https://www.nta.go.jp/foreign_language/"],["Tokyo rent & cost","https://e-housing.jp/"]] },
  nl: { name:"the Netherlands", cur:"EUR", sym:"\u20ac", city:"Amsterdam",
    rent:{ centre:[1800,2300], outside:[1400,1800] },
    essentials:[350,550], transport:[80,120],
    whatYouGet:"High quality of life, English everywhere, bikeable cities. Amsterdam housing is brutal, so many pick Rotterdam or Utrecht. Health insurance (~\u20ac150/mo) is separate and mandatory.",
    taxNote:"Box 1 has three brackets (35.75% / 37.56% / 49.5%); social security is bundled into the first bracket. Tax credits lower the bill. The 30% ruling can make part of a skilled migrant's salary tax-free.",
    sources:[["Belastingdienst","https://www.belastingdienst.nl/"],["30% ruling / IND","https://ind.nl/en"]] },
  fr: { name:"France", cur:"EUR", sym:"\u20ac", city:"Paris",
    rent:{ centre:[1300,1800], outside:[1000,1400] },
    essentials:[350,550], transport:[86,90],
    whatYouGet:"Great food, culture and healthcare; strong worker protections. Paris rent is high but below London; the regions are much cheaper. Employee social charges are high, but healthcare and pensions are strong.",
    taxNote:"Employee social contributions are high (~22% of gross); income tax is then progressive (0/11/30/41/45%) on the remainder, for a single person with no dependents.",
    sources:[["Service-Public (tax)","https://www.service-public.fr/"],["URSSAF","https://www.urssaf.fr/"]] }
};
// ---- rough net-pay calculators (annual gross in local currency) ----
function netPayJP(g) {
  const social = Math.round(g * 0.1469);
  let ded; if (g <= 1625000) ded = 550000; else if (g <= 1800000) ded = g * 0.4 - 100000; else if (g <= 3600000) ded = g * 0.3 + 80000; else if (g <= 6600000) ded = g * 0.2 + 440000; else if (g <= 8500000) ded = g * 0.1 + 1100000; else ded = 1950000;
  const taxable = Math.max(0, g - social - ded - 480000);
  const br = [[1950000,0.05,0],[3300000,0.10,97500],[6950000,0.20,427500],[9000000,0.23,636000],[18000000,0.33,1536000],[40000000,0.40,2796000],[Infinity,0.45,4796000]];
  let it = 0; for (const [cap, rate, sub] of br) { if (taxable <= cap) { it = taxable * rate - sub; break; } }
  it = Math.round(Math.max(0, it) * 1.021);
  const resident = Math.round(Math.max(0, taxable) * 0.10);
  const net = g - social - it - resident;
  return { net, rows:[["Social insurance", social],["Income tax", it],["Resident tax", resident]], rate: Math.round((1 - net / g) * 1000) / 10 };
}
function netPayNL(g, ruling) {
  const base = ruling ? g * 0.70 : g, b1 = 38883, b2 = 78426;
  let tax = Math.min(base, b1) * 0.3575;
  if (base > b1) tax += (Math.min(base, b2) - b1) * 0.3756;
  if (base > b2) tax += (base - b2) * 0.495;
  const credit = Math.max(0, Math.min(8800, 8800 - 0.06 * Math.max(0, base - 23000)));
  tax = Math.round(Math.max(0, tax - credit));
  const net = g - tax;
  return { net, rows:[["Tax + social (Box 1)", tax]].concat(ruling ? [["30% ruling tax-free", Math.round(g * 0.30)]] : []), rate: Math.round((1 - net / g) * 1000) / 10 };
}
function netPayFR(g) {
  const social = Math.round(g * 0.22), netSocial = g - social, taxable = netSocial * 0.90;
  const br = [[11497,0],[29315,0.11],[83823,0.30],[180294,0.41],[Infinity,0.45]];
  let it = 0, prev = 0; for (const [cap, rate] of br) { if (taxable > prev) { it += (Math.min(taxable, cap) - prev) * rate; prev = cap; } else break; }
  it = Math.round(it); const net = netSocial - it;
  return { net, rows:[["Social contributions", social],["Income tax", it]], rate: Math.round((1 - net / g) * 1000) / 10 };
}
function netPay(code, gross, ruling) { gross = Math.max(0, +gross || 0); return code === "jp" ? netPayJP(gross) : code === "fr" ? netPayFR(gross) : netPayNL(gross, ruling); }
