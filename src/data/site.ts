/** Problem/situation pages for related linking */
export const problemLinks = [
  { href: "/contractor-cash-flow-problems", label: "Contractor cash flow problems" },
  { href: "/how-contractors-pay-workers-before-invoices-clear", label: "Pay workers before invoices clear" },
  { href: "/what-contractors-do-when-invoices-delayed", label: "When invoices are delayed" },
  { href: "/how-contractors-buy-materials-before-getting-paid", label: "Materials before payment" },
  { href: "/contractor-equipment-breakdown-funding", label: "Equipment breakdown" },
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
  { href: "/contractor-material-purchase-financing", label: "Material Purchase" }
] as const;

export const site = {
  name: "Contractor Capital Guide",
  /** Replace with your production domain before launch */
  domain: "https://contractorcapitalguide.com",
  ctaUrl: "https://axiantpartners.com/match",
  ctaText: "Explore contractor funding options",
  ctaSecondary: "See what funding options may be available",
  ctaTertiary: "Review contractor financing options",
  ctaReassurance: "Reviewing options can help contractors understand what may fit before making any decision.",
  ctaDisclaimer: "Informational only. Not financial advice. Consult qualified professionals for funding decisions.",
  author: "Contractor Capital Guide Editorial Team",
  /** Add Google Business Profile, LinkedIn, etc. for GEO/AEO (sameAs schema) */
  sameAs: [] as string[],
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
