# Outbound Linking Strategy Audit Report

**Date:** Audit completed and fixes applied

---

## Rule Compliance Summary

| Rule | Status | Notes |
|------|--------|------|
| 1. Internal links majority | ✓ | Pages have many internal links to guides, problem pages, and related content |
| 2. Blog posts prioritize internal links | ✓ | Blog: Related funding guides + More articles (internal) before CTA |
| 3. Outbound Axiant links limited and natural | ✓ | 1 inline + 1 CTA block per page; CTA at end of content |
| 4. Blog articles: 1 Axiant link (near end) | ✓ | Each blog has 1 CTA block at end; no inline Axiant in blog content |
| 5. Core funding pages: 2–3 Axiant links max | ✓ | Pages with inline + CTA = 2 links each |
| 6. No Axiant in nav or footer | ✓ Fixed | Header CTA changed from Axiant to internal `/explore-contractor-funding-options` |
| 7. Avoid identical anchor text | ✓ Fixed | Anchor text now varies across pages |
| 8. Calm anchor text | ✓ | Uses approved variants |
| 9. Correct attributes (href, target, rel) | ✓ | All Axiant links use correct URL and attributes |
| 10. Internal linking primary | ✓ | Internal guides dominate; user explores content before outbound |

---

## All Outbound Axiant Links (Post-Fix)

### Template / CTA Block (appears on every page and blog via CTA section)

| Location | Anchor Text | URL | target | rel |
|----------|-------------|-----|--------|-----|
| `[slug].astro` (page CTA) | `{site.ctaText}` = "Explore contractor funding options" | https://axiantpartners.com/match | ✓ | ✓ |
| `index.astro` (home CTA) | `{site.ctaText}` | https://axiantpartners.com/match | ✓ | ✓ |
| `blog/[slug].astro` (blog CTA) | `{site.ctaText}` | https://axiantpartners.com/match | ✓ | ✓ |

### Header (Rule 6 Fix Applied)

| Location | Change |
|----------|--------|
| `BaseLayout.astro` header | **Changed from:** Axiant link → **To:** Internal link `/explore-contractor-funding-options` |

### Inline Links in Content (19 pages)

| Page | Anchor Text | Links | target | rel |
|------|-------------|-------|--------|-----|
| contractor-bridge-loans.md | see what funding options may be available | 1 inline + 1 CTA | ✓ | ✓ |
| contractor-line-of-credit.md | review contractor financing options | 1 inline + 1 CTA | ✓ | ✓ |
| construction-equipment-financing.md | see what funding options may be available | 1 inline + 1 CTA | ✓ | ✓ |
| construction-business-loans.md | review contractor financing options | 1 inline + 1 CTA | ✓ | ✓ |
| sba-loans-for-contractors.md | see what funding options may be available | 1 inline + 1 CTA | ✓ | ✓ |
| contractor-invoice-financing.md | explore contractor funding options | 1 inline + 1 CTA | ✓ | ✓ |
| contractor-equipment-repair-pressure.md | see what funding options may be available | 1 inline + 1 CTA | ✓ | ✓ |
| contractor-payroll-between-jobs.md | review contractor financing options | 1 inline + 1 CTA | ✓ | ✓ |
| contractor-seasonal-cash-flow.md | see what funding options may be available | 1 inline + 1 CTA | ✓ | ✓ |
| contractor-slow-paying-clients.md | explore contractor funding options | 1 inline + 1 CTA | ✓ | ✓ |
| contractor-waiting-on-invoices.md | see what funding options may be available | 1 inline + 1 CTA | ✓ | ✓ |
| contractor-material-timing-gaps.md | review contractor financing options | 1 inline + 1 CTA | ✓ | ✓ |
| contractor-mobilization-costs.md | see what funding options may be available | 1 inline + 1 CTA | ✓ | ✓ |
| construction-equipment-loans-vs-lease.md | explore contractor funding options | 1 inline + 1 CTA | ✓ | ✓ |
| dump-truck-financing-contractors.md | see what funding options may be available | 1 inline + 1 CTA | ✓ | ✓ |
| excavator-financing-contractors.md | review contractor financing options | 1 inline + 1 CTA | ✓ | ✓ |
| skid-steer-financing-contractors.md | see what funding options may be available | 1 inline + 1 CTA | ✓ | ✓ |
| used-construction-equipment-financing.md | explore contractor funding options | 1 inline + 1 CTA | ✓ | ✓ |
| explore-contractor-funding-options.md | explore contractor funding options | 1 inline + 1 CTA | ✓ | ✓ |

### Other Axiant-Related Link

| Page | URL | Purpose | target | rel |
|------|-----|---------|--------|-----|
| contact.md | outlook.office.com/...@axiantpartners.com/meetingtype/... | Schedule meeting | ✓ | ✓ |

---

## Anchor Text Distribution (Post-Fix)

- **"see what funding options may be available"** – 8 pages
- **"review contractor financing options"** – 5 pages
- **"explore contractor funding options"** – 5 pages
- **CTA button** – "Explore contractor funding options" (site.ctaText)

---

## Footer

Footer contains only internal links. No Axiant links.

---

## Navigation

- **Nav items:** All internal (/, /contractor-cash-flow-guide, /contractor-working-capital, etc.)
- **Header CTA button:** Now links to `/explore-contractor-funding-options` (internal)

---

## Confirmation

All Axiant links use:
- `href="https://axiantpartners.com/match"`
- `target="_blank"`
- `rel="sponsored noopener noreferrer"`

(The contact page Outlook booking link uses the same rel and target attributes.)
