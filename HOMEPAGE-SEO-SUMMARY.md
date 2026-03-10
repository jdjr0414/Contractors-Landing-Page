# Homepage SEO & Conversion Summary

## 1. New Homepage Copy (Editorial Version – Default)

### Hero
- **H1:** Contractor Financing & Cash Flow Guide
- **Subheadline:** Understand working capital, lines of credit, material deposits, and cash flow. This site helps contractors compare options and decide when each financing tool makes sense.
- **Supporting copy:** Labor is paid weekly. Materials are paid upfront. Client invoices often pay 30–90 days later. We explain the problems contractors face and the funding options many use to bridge the gap.
- **Primary CTA:** Explore contractor funding guides → `/explore-contractor-funding-options`
- **Secondary CTA:** View financing articles → `/blog`

### What This Site Covers (new section)
Explains that the site helps contractors compare financing options and understand when each tool makes sense. Covers working capital, lines of credit, equipment financing, payroll funding. Addresses common problems: paying for materials before getting paid, large upfront deposits, covering labor and mobilization, choosing between working capital and a line of credit, avoiding cash flow gaps.

### Popular Guides (new section)
- Contractor working capital
- Contractor line of credit
- How contractors pay for materials before getting paid
- How contractors handle large material deposits
- Contractor cash flow problems
- Construction equipment financing

### How to Choose the Right Financing Option (new section)
Explains matching product to problem: working capital for one-time gaps, line of credit for recurring gaps, equipment financing for equipment, business loans for expansion.

---

## 2. Title Tag & Meta Description

### Editorial (default)
- **Title:** Contractor Financing Guide | Working Capital, Lines of Credit & Cash Flow 2026
- **Meta description:** Educational guide for contractors on working capital, lines of credit, material deposits, and cash flow. Compare options, understand when each financing tool fits, and find guides for payroll gaps, equipment, and invoice delays.

### Conversion
- **Title:** Contractor Financing Options | Compare Working Capital & Lines of Credit
- **Meta description:** Compare contractor financing options for payroll gaps, material deposits, equipment, and invoice delays. See what may fit your construction business.

---

## 3. Sections Added

| Section | Purpose |
|---------|---------|
| What This Site Covers | Explains site purpose, audience, and topics |
| Popular Guides | Internal links to high-value pages |
| How to Choose the Right Financing Option | Decision support, working capital vs line of credit |

---

## 4. Internal Links Added

| Page | Context |
|------|---------|
| `/contractor-working-capital` | Definition, What site covers, Popular guides, How to choose |
| `/contractor-line-of-credit` | Definition, What site covers, Popular guides, How to choose |
| `/blog/pay-materials-before-getting-paid` | Problems intro, Popular guides |
| `/blog/large-material-deposits-contractors` | Problems intro, Popular guides |
| `/construction-equipment-financing` | What site covers, Popular guides, How to choose |
| `/contractor-payroll-funding` | What site covers |
| `/contractor-cash-flow-problems` | Popular guides |
| `/construction-business-loans` | How to choose |
| `/explore-contractor-funding-options` | Hero primary CTA |
| `/blog` | Hero secondary CTA |

Total: 10+ distinct internal links in new copy, plus existing links in problem cards, funding grid, solutions grid, FAQ sidebar.

---

## 5. Schema Markup

- **WebPage** – name, description, url, dateModified, author, publisher, about, image, abstract
- **FAQPage** – 6 questions from home.md (already present)
- **HowTo** – payment cycle steps
- **ItemList** – funding options
- **BreadcrumbList** – Home

---

## 6. Two Versions: Editorial vs Conversion

### Editorial (default)
- **Switch:** `HOMEPAGE_VERSION = "editorial"` in `src/pages/index.astro`
- **Focus:** SEO, crawlable copy, education, internal links
- **Hero CTAs:** Primary = Explore guides, Secondary = View articles
- **Best for:** Organic search, trust, long-term traffic

### Conversion
- **Switch:** `HOMEPAGE_VERSION = "conversion"` in `src/pages/index.astro`
- **Focus:** Direct conversion, shorter hero, external CTA first
- **Hero CTAs:** Primary = See what funding options may be available (external), Secondary = Explore guides
- **Best for:** Paid traffic, high-intent visitors

---

## 7. Recommendation

**Use the editorial version as default.**

Reasons:
1. The homepage was thin; editorial adds 400+ words of useful, indexable copy.
2. Organic search drives long-term traffic; editorial supports that.
3. Trust and education support conversions; editorial builds both.
4. The conversion version is one constant change away if you run paid campaigns.

To switch to conversion: set `HOMEPAGE_VERSION = "conversion"` in `src/pages/index.astro` (line ~58).
