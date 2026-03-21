/** Problem/situation pages for related linking */
export const problemLinks = [
  { href: "/contractor-cash-flow-problems", label: "Contractor cash flow problems" },
  { href: "/contractor-cash-flow-between-projects", label: "Cash flow between projects" },
  { href: "/contractor-material-timing-gaps", label: "Material timing gaps" },
  { href: "/contractor-seasonal-cash-flow", label: "Seasonal cash flow" },
  { href: "/contractor-slow-paying-clients", label: "Slow paying clients" },
  { href: "/contractor-waiting-on-invoices", label: "Waiting on invoices" },
  { href: "/construction-invoice-payment-delays", label: "Invoice payment delays" },
  { href: "/contractor-retainage-cash-flow", label: "Retainage cash flow" },
  { href: "/contractor-draw-schedule-cash-flow", label: "Draw schedule cash flow" },
  { href: "/contractor-progress-billing-cash-flow", label: "Progress billing cash flow" },
  { href: "/how-contractors-pay-workers-before-invoices-clear", label: "Pay workers before invoices clear" },
  { href: "/what-contractors-do-when-invoices-delayed", label: "When invoices are delayed" },
  { href: "/how-contractors-buy-materials-before-getting-paid", label: "Materials before payment" },
  { href: "/contractor-equipment-breakdown-funding", label: "Equipment breakdown" },
  { href: "/how-contractors-afford-heavy-equipment", label: "Afford heavy equipment" },
  { href: "/how-contractors-start-jobs-before-payment", label: "Project startup costs" }
] as const;

/** Default related funding links for blog internal linking */
export const fundingLinks = [
  { href: "/contractor-cash-flow-guide", label: "Cash Flow Guide" },
  { href: "/contractor-working-capital", label: "Working Capital" },
  { href: "/construction-equipment-financing", label: "Equipment Financing" },
  { href: "/contractor-line-of-credit", label: "Line of Credit" },
  { href: "/contractor-payroll-funding", label: "Payroll Funding" },
  { href: "/construction-business-loans", label: "Business Loans" },
  { href: "/contractor-cash-flow-problems", label: "Cash Flow" },
  { href: "/accounts-receivable-financing-contractors", label: "Accounts Receivable" },
  { href: "/contractor-invoice-financing", label: "Invoice Financing" },
  { href: "/contractor-material-purchase-financing", label: "Material Purchase" },
  { href: "/contractor-retainage-cash-flow", label: "Retainage Cash Flow" },
  { href: "/contractor-draw-schedule-cash-flow", label: "Draw Schedule Cash Flow" },
  { href: "/contractor-financing-bad-credit", label: "Financing Bad Credit" },
  { href: "/fast-contractor-loans", label: "Fast Contractor Loans" },
  { href: "/excavator-financing-contractors", label: "Excavator Financing" },
  { href: "/skid-steer-financing-contractors", label: "Skid Steer Financing" },
  { href: "/dump-truck-financing-contractors", label: "Dump Truck Financing" },
  { href: "/loader-financing-contractors", label: "Loader Financing" },
  { href: "/backhoe-financing-contractors", label: "Backhoe Financing" },
  { href: "/contractor-vehicle-financing", label: "Vehicle Financing" },
  { href: "/subcontractor-financing", label: "Subcontractor Financing" },
  { href: "/invoice-factoring-contractors", label: "Invoice Factoring" },
  { href: "/used-construction-equipment-financing", label: "Used Equipment Financing" },
  { href: "/all-funding-options", label: "All Funding Options" },
  { href: "/service-areas", label: "Service Areas" }
] as const;

export const site = {
  name: "Contractor Capital Guide",
  /** Replace with your production domain before launch */
  domain: "https://contractorcapitalguide.com",
  phone: "(919) 907-2611",
  phoneHref: "tel:+19199072611",
  ctaUrl: "https://axiantpartners.com/match",
  ctaText: "Explore contractor funding options",
  ctaSecondary: "See what funding options may be available",
  ctaTertiary: "Review contractor financing options",
  ctaReassurance: "Reviewing options can help contractors understand what may fit before making any decision.",
  ctaDisclaimer: "Informational only. Not financial advice. Consult qualified professionals for funding decisions.",
  author: "Contractor Capital Guide Editorial Team",
  /** Add Google Business Profile, LinkedIn, etc. for GEO/AEO (sameAs schema). Replace placeholders with your actual URLs. */
  sameAs: [
    "https://contractorcapitalguide.com",
    "https://www.linkedin.com/company/contractor-capital-guide",
    "https://www.google.com/maps?cid=YOUR_GOOGLE_BUSINESS_CID"
  ] as string[],
  /** Twitter handle for twitter:site (e.g. @ContractorCapital) - replace with your handle or leave empty to omit */
  twitterSite: "@ContractorCapital" as string,
  /** Twitter handle for twitter:creator - replace with your handle or leave empty to omit */
  twitterCreator: "@ContractorCapital" as string,
  /** Service area for GEO - update with your actual coverage */
  areaServed: "United States",
  nav: [
    { label: "Home", href: "/" },
    { label: "Cash Flow Guide", href: "/contractor-cash-flow-guide" },
    { label: "Working Capital", href: "/contractor-working-capital" },
    { label: "Equipment Financing", href: "/construction-equipment-financing" },
    { label: "Line of Credit", href: "/contractor-line-of-credit" },
    { label: "Business Loans", href: "/construction-business-loans" },
    { label: "Payroll Funding", href: "/contractor-payroll-funding" },
    { label: "FAQ", href: "/faq" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "Glossary", href: "/glossary" },
    { label: "All Options", href: "/all-funding-options" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]
};
