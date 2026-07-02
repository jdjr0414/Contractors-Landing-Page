# CTR Rewrites Tracker

Title/meta rewrites to win clicks on pages that already rank. Baseline = GSC 90-day
window 2026-04-02 to 2026-06-30 (pulled via the CRM repo `npm run audit:gsc-pull`).

Thesis: these pages rank at strong positions for informational "reasons [trade] need
working capital" queries, but their title tags were commercial financing slogans that did
not match that intent. Titles realigned to the intent the pages actually rank for (each
"N reasons" count verified against the page's own content). Descriptions tightened to match.

IMPORTANT caveat: the dominant CTR drag on the roofing/working-capital giants is AI Overview
absorption of research-intent queries, so expect partial recovery, not a full fix. The
trailing-slash duplicate-URL issue (see below) should be fixed alongside these.

| Date | Page | Old title | New title | Baseline impr / clicks / CTR / pos | Follow-up (3-4 wks) |
|---|---|---|---|---|---|
| 2026-07-01 | /roofing-contractor-financing/ | Roofing Contractor Financing: Fund Materials & Payroll Fast | 7 Reasons Roofing Companies Need Working Capital (2026) | 17,970 / 0 / 0.00% / 2.7 | |
| 2026-07-01 | /contractor-working-capital/ | Contractor Working Capital: Get Cash Before the Client Pays | 6 Reasons Contractors Run Short on Working Capital | 16,055 / 0 / 0.00% / 5.8 | |
| 2026-07-01 | /electrical-contractor-financing/ | Electrical Contractor Financing: Fund Wire, Panels & Payroll | 6 Reasons Electrical Contractors Need Working Capital | ~1,963 / 1 / 0.05% / 3-6 | |
| 2026-07-01 | /hvac-contractor-financing/ | HVAC Contractor Financing: Fund Equipment & Seasonal Cash Flow | 6 Reasons HVAC Contractors Need Working Capital | 626 / 0 / 0.00% / 8.5 | |
| 2026-07-01 | /lawn-care-business-financing/ | Lawn Care Business Financing: Fund Equipment & Spring Ramp-Up | 5 Reasons Lawn Care Companies Need Working Capital | 469 / 0 / 0.00% / 9.1 | |
| 2026-07-01 | /concrete-contractor-financing/ | Concrete Contractor Financing: Fund Materials & Crew Payroll | 5 Reasons Concrete Contractors Need Working Capital | 179 / 0 / 0.00% / 5.1 | |

## Open technical fix (higher ROI than titles)
Trailing-slash duplicate URLs are indexed as separate pages, splitting signals:
`/roofing-contractor-financing/` (17,970 impr) vs `/roofing-contractor-financing` (3,311),
same for electrical. Pick one canonical form (Astro `trailingSlash` + a redirect or a single
`rel=canonical`) so all signal consolidates on one URL.

## How to measure
In ~3-4 weeks: from the CRM repo run `npm run audit:gsc-pull contractors-landing`, then read
`scripts/gsc/contractors-landing.json` for these pages and fill the follow-up column.
