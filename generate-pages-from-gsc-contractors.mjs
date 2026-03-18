import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const repoRoot = process.cwd();
const gscDir = path.join(repoRoot, "gsc");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function safeUnzip(zipPath, extractDir) {
  ensureDir(extractDir);

  // Clean extract dir so repeated runs don’t accumulate stale CSVs.
  for (const f of fs.existsSync(extractDir) ? fs.readdirSync(extractDir) : []) {
    fs.rmSync(path.join(extractDir, f), { recursive: true, force: true });
  }

  if (!fs.existsSync(zipPath)) {
    throw new Error(`GSC zip not found: ${zipPath}`);
  }

  // Uses system tar (works with the kind of ZIP exports we get from GSC).
  execSync(`tar -xf "${zipPath}" -C "${extractDir}"`, { stdio: "inherit" });
}

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' && (i === 0 || line[i - 1] !== "\\")) {
      // Toggle quotes. This is a simple parser; good enough for GSC exports (queries are typically plain text).
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function parseCsv(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);
  const qIndex = headers.findIndex((h) => /query|top queries/i.test(h));
  const impIndex = headers.findIndex((h) => /impressions/i.test(h));
  const posIndex = headers.findIndex((h) => /position/i.test(h));

  if (qIndex === -1 || impIndex === -1 || posIndex === -1) {
    throw new Error(
      `Could not find needed columns in Queries.csv. Headers were: ${headers.join(" | ")}`
    );
  }

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    if (cols.length <= Math.max(qIndex, impIndex, posIndex)) continue;

    const query = (cols[qIndex] ?? "").replace(/^"|"$/g, "");
    if (!query) continue;

    const impressions = Number(cols[impIndex]) || 0;
    const position = Number(cols[posIndex]) || 0;
    rows.push({ query, impressions, position });
  }
  return rows;
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "topic";
}

function titleCase(s) {
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function isBrandQuery(query) {
  const q = query.toLowerCase();
  const brandTerms = ["axiant", "contractor capital guide", "contractorcapitalguide.com"];
  return brandTerms.some((t) => q.includes(t));
}

function pickTopics(rows, limit, existingSlugs) {
  const candidates = rows
    .filter((r) => r.impressions >= 3 && r.position >= 1 && r.position <= 100 && !isBrandQuery(r.query))
    .sort((a, b) => {
      const impDiff = b.impressions - a.impressions;
      if (impDiff !== 0) return impDiff;
      // prefer midrange positions (closer to 20)
      return Math.abs(a.position - 20) - Math.abs(b.position - 20);
    });

  const used = new Set();
  const topics = [];
  for (const r of candidates) {
    const baseSlug = slugify(r.query);
    if (existingSlugs.has(baseSlug)) continue;
    if (used.has(baseSlug)) continue;
    used.add(baseSlug);

    topics.push({
      slug: baseSlug,
      title: titleCase(r.query),
      query: r.query,
      impressions: r.impressions,
      position: r.position,
    });

    if (topics.length >= limit) break;
  }
  return topics;
}

function keywordFocus(queryLower) {
  if (/(payroll|labor|wages|wage)/i.test(queryLower)) return "payroll";
  if (/(invoice|invoices|payment|slow pay|delayed|waiting)/i.test(queryLower)) return "invoices";
  if (/(material|deposit|materials)/i.test(queryLower)) return "materials";
  if (/(equipment|breakdown|repair|machinery)/i.test(queryLower)) return "equipment";
  if (/(startup|mobilization|mobilisation|project start)/i.test(queryLower)) return "startup";
  if (/(government|bid|contract)/i.test(queryLower)) return "government";
  return "general";
}

function buildContractorMarkdown(topic, nowYmd) {
  const q = topic.query;
  const ql = q.toLowerCase();
  const focus = keywordFocus(ql);

  // Defaults (keeps the "Related problems" and "Related solutions" blocks on every page).
  let relatedProblems = ["/contractor-cash-flow-problems", "/what-delays-contractor-payments"];
  let relatedSolutions = [
    "/contractor-working-capital",
    "/contractor-line-of-credit",
    "/construction-equipment-financing",
    "/accounts-receivable-financing-contractors",
  ];

  if (focus === "payroll") {
    relatedProblems = ["/reasons-contractors-miss-payroll", "/what-delays-contractor-payments"];
    relatedSolutions = ["/contractor-payroll-funding", "/contractor-working-capital", "/contractor-line-of-credit"];
  } else if (focus === "invoices") {
    relatedProblems = ["/contractor-waiting-on-invoices", "/contractor-slow-paying-clients", "/what-delays-contractor-payments"];
    relatedSolutions = ["/accounts-receivable-financing-contractors", "/contractor-invoice-financing", "/contractor-working-capital"];
  } else if (focus === "materials") {
    relatedProblems = ["/contractor-material-timing-gaps", "/what-delays-contractor-payments"];
    relatedSolutions = ["/contractor-working-capital", "/contractor-line-of-credit", "/contractor-material-purchase-financing"];
  } else if (focus === "equipment") {
    relatedProblems = ["/what-stops-contractors-buying-equipment", "/what-delays-contractor-payments"];
    relatedSolutions = ["/construction-equipment-financing", "/construction-equipment-loans-vs-lease", "/contractor-working-capital"];
  } else if (focus === "startup") {
    relatedProblems = ["/what-contractors-do-when-invoices-delayed", "/what-delays-contractor-payments"];
    relatedSolutions = ["/contractor-working-capital", "/contractor-payroll-funding", "/contractor-line-of-credit"];
  } else if (focus === "government") {
    relatedProblems = ["/slow-paying-government-client-contractor-financing", "/what-stops-contractors-bidding-government-contracts", "/what-delays-contractor-payments"];
    relatedSolutions = ["/contractor-working-capital", "/accounts-receivable-financing-contractors", "/contractor-line-of-credit"];
  }

  const h1 = topic.title;
  const description = `Guide for construction contractors about “${q}”: what it means for cash flow, where it shows up during projects, and what financing options help bridge the gap. Includes practical steps and FAQ based on real Search Console query wording.`;

  const intro = (() => {
    if (focus === "payroll") {
      return `When contractors search “${q}”, they’re usually trying to figure out why cash feels short right before payroll. The timing mismatch between labor schedules and customer payment cycles creates a predictable gap—even when jobs are profitable.`;
    }
    if (focus === "invoices") {
      return `“${q}” commonly points to invoice delays: the work is done, invoices are submitted, and then payment takes longer than expected. Understanding where the delay happens helps you plan cash flow and choose a financing path that matches the gap.`;
    }
    if (focus === "materials") {
      return `Searches for “${q}” often show up when contractors need materials before they get paid. Suppliers want deposits or payment on delivery, while client payments follow later. This creates pressure that can stall jobs if you’re not planning ahead.`;
    }
    if (focus === "equipment") {
      return `When contractors search “${q}”, they often mean equipment is the bottleneck: repairs, replacements, or purchases don’t fit inside current reserves. The key is matching the financing tool to the timing and collateral that lenders actually want.`;
    }
    if (focus === "startup") {
      return `“${q}” is usually a startup problem: mobilization, early labor, and initial materials go out before client cash arrives. Funding the early phase protects your schedule and reduces the risk of delays caused by cash constraints.`;
    }
    if (focus === "government") {
      return `When contractors search “${q}”, they’re often dealing with government payment cycles, approval timelines, or document requirements. Cash flow planning is essential because the process can create delays even when work is moving forward.`;
    }
    return `When you search “${q}”, you’re trying to understand a real cash-flow pressure that contractors face during a project. This guide explains what the term typically means, why the gap happens, and the financing options that can bridge it.`;
  })();

  const quickAnswer = (() => {
    if (focus === "invoices") {
      return `Quick answer: “${q}” usually describes invoice payment delays. Contractors can bridge the timing gap with working capital, invoice financing/receivables financing, or a line of credit—depending on whether the delay is tied to approvals, net terms, retainage, or client payment runs.`;
    }
    if (focus === "payroll") {
      return `Quick answer: “${q}” usually reflects payroll timing gaps. Since labor is often paid weekly/biweekly while client payments arrive later, contractors typically use payroll funding, working capital, or a line of credit to cover payroll float.`;
    }
    if (focus === "materials") {
      return `Quick answer: “${q}” commonly comes up when materials require deposits or upfront payment. Contractors can cover the deposit with working capital, material purchase financing, or a line of credit until client payments arrive.`;
    }
    if (focus === "equipment") {
      return `Quick answer: “${q}” typically points to equipment timing gaps—repairs or purchases that drain reserves. Equipment financing or working capital can provide the funding, while matching the tool to the urgency and documentation keeps the process smoother.`;
    }
    return `Quick answer: “${q}” is about a contractor cash flow timing gap. The right response depends on whether the gap is payroll, invoices, materials, equipment, or project startup—and financing should match the type of delay, not just the urgency.`;
  })();

  const keyTakeaway = `Key takeaway: ${h1} usually comes down to timing. Once you identify which part of the contractor payment cycle is creating the gap, you can choose a financing option (working capital, line of credit, equipment financing, or receivables/invoice financing) that matches the delay.`;

  const faqItems = (() => {
    if (focus === "invoices") {
      return [
        { question: `What causes “${q}” for contractors?`, answer: `Invoice delays are commonly driven by payment application review and approval, inspections/disbursement processes, net-60/net-90 terms, retainage, scheduled payment runs, and disputes/change orders. Even when invoices are submitted, payment may wait for the next internal payment run.` },
        { question: `How do contractors manage cash flow during invoice delays?`, answer: `Forecast the wait, then fund operations with working capital or a line of credit. If approved/submitted invoices are the bottleneck, accounts receivable financing and invoice financing can convert receivables into near-term cash.` },
        { question: `When does invoice financing make sense vs a line of credit?`, answer: `Invoice/receivables financing typically fits when you have specific unpaid invoices that qualify. A line of credit fits better when the gap is recurring across projects and you need flexible draws over time.` },
        { question: `Will applying for financing affect credit?`, answer: `Applying can create a hard inquiry (small temporary impact). The practical effect depends on your situation, so it’s best to discuss timing and qualification with a funding partner.` },
        { question: `What documents do contractors usually need?`, answer: `Expect to provide recent financials, bank statements, and information about the invoices/contracts (customer, amounts, aging, and documentation). Your provider will confirm requirements.` },
      ];
    }
    if (focus === "payroll") {
      return [
        { question: `What makes “${q}” happen?`, answer: `Payroll timing gaps usually come from weekly/biweekly labor schedules and client payment cycles that don’t line up. Even profitable jobs can feel cash-poor when payroll hits before client funds arrive.` },
        { question: `What financing helps when payroll is due?`, answer: `Contractor payroll funding and working capital can help bridge the gap. Some providers structure repayment around cash receipts, while others rely on standard financing terms—so it’s important to compare options.` },
        { question: `How fast can funding be approved for payroll gaps?`, answer: `Approval speed depends on the provider and the completeness of your documentation. Many contractors plan for 1–3 days for a decision and then match timing to their payroll calendar.` },
        { question: `Is payroll funding different from a line of credit?`, answer: `Payroll funding is often tailored to urgent timing gaps, while a line of credit provides revolving access. Both can help—choose based on whether the need is one-time or recurring.` },
        { question: `How should contractors prepare to apply?`, answer: `Gather recent financials and information about the payroll period and projects. A funding partner can help you select a tool and prepare the application so you’re not scrambling before payday.` },
      ];
    }

    return [
      { question: `What does “${q}” mean in plain English?`, answer: `In contractor cash-flow conversations, “${q}” typically describes a timing mismatch: money goes out before it comes in. It’s not necessarily a sign of poor management—construction payment cycles often create predictable gaps.` },
      { question: `Why does this create pressure for contractors?`, answer: `Because expenses like labor, materials, equipment, and job startup hit on schedules. Client payments can follow later due to net terms, approval/inspection steps, retainage, and scheduled payment runs. The result is a cash shortage even when the business is doing well.` },
      { question: `What are the most common funding options?`, answer: `Many contractors use working capital or a line of credit. If the gap is tied to specific unpaid invoices, accounts receivable/invoice financing can help. If the issue is equipment, equipment financing may fit.` },
      { question: `How do you choose the right option?`, answer: `Start with the gap type (payroll, invoices, materials, equipment, or startup). Then compare structures, required documentation, approval timelines, and repayment mechanics. A good funding partner focuses on fit, not just urgency.` },
      { question: `What’s the first step this week?`, answer: `Write down where the delay starts in your payment cycle, then review which financing tool matches it. If you’re not sure, request a review of your situation and application readiness.` },
    ];
  })();

  const content = `
## What “${q}” usually means for contractors
${intro}

In construction, timing mismatches are structural. Net-30, net-60, and net-90 terms, retainage, and approval/inspection steps mean contractors often fund labor and job-related expenses before client payment arrives. When contractors search “${q}”, they’re usually trying to name the specific part of the cycle that’s causing the gap so they can plan for it instead of reacting late.

## Where this shows up during a project
Most of the time, “${q}” is experienced at one of these moments:

1. The week payroll hits before customer cash arrives.
2. Invoices are submitted, but payment waits for approvals, inspections, or the next disbursement run.
3. Materials require deposits or payment on delivery, while the client pays after milestones.
4. Equipment repairs or replacements drain reserves at the worst possible time.
5. Mobilization/startup costs go out at the beginning of a job, before the first client payment.

If you can identify which moment you’re in, you can match the right funding type to the gap rather than forcing the same solution onto every problem.

## GEO: How this plays out across US markets and regions
Contractor cash-flow timing issues show up nationwide, but the *details* vary by region. In some markets, project schedules and approval cycles can create slower payment timelines. In others, supplier behavior (deposit requirements, delivery terms, or change-order lead times) shifts when money goes out compared to when revenue arrives.

That’s why the best approach is to plan using your real payment timeline: net terms, retainage release patterns, draw schedules, and the internal “payment run” calendar you experience with your clients and owners. A financing option helps only when its documentation requirements and repayment mechanics match how your business actually runs in your local area.

## Why timing gaps happen (even when work is profitable)
Construction businesses often look successful on paper, yet cash stays tight because:

- Expenses follow fixed schedules (payroll weekly/biweekly, supplier deposits, equipment costs, and overhead).
- Client payments follow slower cycles (net terms, retainage release schedules, and payment application review).
- Delays can be caused by process, not performance (documentation review, change orders, or dispute resolution).

That’s why the best response is planning + fit. The goal is not to eliminate the cycle (you can’t). The goal is to fund it.

## Contractor funding options that can bridge the gap
When contractors face “${q}”, the right tool depends on what kind of delay is happening.

If the gap is **working-capital timing**, consider:
- **Contractor working capital** — flexible-use capital designed to smooth cash flow between expenses and receipts.  
  See: [/contractor-working-capital](/contractor-working-capital)
- **Contractor line of credit** — revolving access when your timing gaps repeat across projects or seasons.  
  See: [/contractor-line-of-credit](/contractor-line-of-credit)

If the gap is **invoice-related**, consider:
- **Accounts receivable financing** — convert eligible receivables into faster cash so you don’t wait for payment runs.  
  See: [/accounts receivable financing](/accounts-receivable-financing-contractors)
- **Contractor invoice financing** — a targeted option when you have specific invoices that can qualify.  
  See: [/contractor-invoice-financing](/contractor-invoice-financing)

If the gap is **equipment-related**, consider:
- **Construction equipment financing** — finance the equipment needed for the job so repairs or purchases don’t stop production.  
  See: [/construction-equipment-financing](/construction-equipment-financing)

If you want to compare everything at once, start with:
- **All funding options**  
  See: [/all-funding-options](/all-funding-options)

## Action checklist: what to do next
Use this simple workflow to move from “we have a cash gap” to “we have a plan”:

1. **Identify the exact delay trigger.** Is it payroll timing, invoice review, retainage, materials deposits, or equipment?
2. **Estimate the cash gap duration.** Assume the gap can be longer than expected if approvals slow down.
3. **Select the financing type that matches the gap.** Working capital for timing gaps, receivables/invoice financing for eligible invoices, equipment financing for repairs/purchases.
4. **Prepare your application materials early.** Missing docs cause delays. Plan ahead so approvals happen when you need them.
5. **Confirm repayment mechanics and timelines.** Match the repayment rhythm to how your project payments actually arrive.

If you want to explore options, this site’s CTA can help route you to the right contractor funding path based on your situation.

## Practical example (how contractors plan it)
Picture a contractor who has multiple active projects. Payroll is due every two weeks, but customer payments arrive after approvals and disbursement review. At the same time, suppliers require deposits before material deliveries. Even if every job is profitable, the contractor can still run short because cash goes out in advance of receipts.

In that scenario, the contractor typically succeeds by:
- using contractor working capital to stabilize payroll and overhead during the waiting period,
- using receivables financing when specific invoices are the bottleneck,
- and using line-of-credit draws for recurring project overlap.

That planning creates continuity: crews get paid, materials arrive on time, and jobs keep moving forward.

In practice, this means you should treat “${q}” as a planning input, not an emergency. The earlier you prepare for the delay—rather than waiting for cash to run out—the more options you have, the easier it is to choose fit-based funding, and the less disruption you experience mid-project.
`.trim();

  const frontmatter = `---
title: "${h1.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
canonicalPath: /${topic.slug}
dateModified: ${nowYmd}
h1: ${h1.replace(/"/g, '\\"')}
intro: "${intro.replace(/"/g, '\\"')}"
quickAnswer: "${quickAnswer.replace(/"/g, '\\"')}"
keyTakeaway: "${keyTakeaway.replace(/"/g, '\\"')}"
ctaTitle: Explore contractor funding options
ctaText: See what may be available for your construction business.
relatedProblems: ${JSON.stringify(relatedProblems)}
relatedSolutions: ${JSON.stringify(relatedSolutions)}
faq:
${faqItems
  .map(
    (it) =>
      `  - question: "${it.question.replace(/"/g, '\\"')}"\n    answer: "${it.answer.replace(/"/g, '\\"')}"`
  )
  .join("\n")}
---
`;

  return frontmatter + "\n" + content + "\n";
}

function todayYmd() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function main() {
  const zipArg = process.argv[2] || path.join(gscDir, "latest.zip");
  const limitArg = process.argv.includes("--limit");
  const limit = limitArg
    ? Number(process.argv[process.argv.indexOf("--limit") + 1] || 15)
    : 15;
  const dryRun = process.argv.includes("--dry-run");
  const skipBuild = process.argv.includes("--skip-build");

  const zipPath = path.isAbsolute(zipArg) ? zipArg : path.join(repoRoot, zipArg);
  const extractDir = path.join(gscDir, "latest");

  const queriesCsv = "Queries.csv";
  ensureDir(gscDir);

  safeUnzip(zipPath, extractDir);
  const queriesCsvPath = path.join(extractDir, queriesCsv);
  if (!fs.existsSync(queriesCsvPath)) {
    throw new Error(`Queries.csv not found after unzip: ${queriesCsvPath}`);
  }

  const rows = parseCsv(queriesCsvPath);
  if (!rows.length) throw new Error("No rows found in Queries.csv");

  const pagesDir = path.join(repoRoot, "src", "content", "pages");
  ensureDir(pagesDir);
  const existingSlugs = new Set(
    fs.readdirSync(pagesDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""))
  );

  const topics = pickTopics(rows, limit, existingSlugs);
  const now = todayYmd();

  const generated = [];
  for (const t of topics) {
    const mdPath = path.join(pagesDir, `${t.slug}.md`);
    if (existingSlugs.has(t.slug)) continue;

    generated.push(t);
    if (!dryRun) {
      const md = buildContractorMarkdown(t, now);
      fs.writeFileSync(mdPath, md, "utf8");
    }
  }

  const planOut = path.join(gscDir, "generated-contractors-topics.json");
  fs.writeFileSync(planOut, JSON.stringify({ generatedAt: new Date().toISOString(), topics: generated }, null, 2), "utf8");

  console.log(`Selected ${generated.length} topics from GSC.`);
  console.log(`Wrote markdown pages to src/content/pages/ : ${dryRun ? "(dry-run)" : "done"}`);
  console.log(`Plan written to: ${planOut}`);

  if (!dryRun && !skipBuild) {
    console.log("Running build to update sitemap and static output...");
    execSync("npm run build", { stdio: "inherit", cwd: repoRoot });
  }
}

main();

