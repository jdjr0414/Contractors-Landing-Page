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
  domain: "https://example.com",
  ctaUrl: "https://axiantpartners.com/match",
  ctaText: "Explore contractor funding options",
  ctaSecondary: "See what funding options may be available",
  ctaTertiary: "Review contractor financing options",
  ctaReassurance: "Reviewing options can help contractors understand what may fit before making any decision.",
  /** Add LinkedIn, Crunchbase, etc. for AI entity authority (sameAs schema) */
  sameAs: [] as string[],
  nav: [
    { label: "Home", href: "/" },
    { label: "Cash Flow Guide", href: "/contractor-cash-flow-guide" },
    { label: "Working Capital", href: "/contractor-working-capital" },
    { label: "Equipment Financing", href: "/construction-equipment-financing" },
    { label: "Line of Credit", href: "/contractor-line-of-credit" },
    { label: "Business Loans", href: "/construction-business-loans" },
    { label: "Payroll Funding", href: "/contractor-payroll-funding" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]
};
