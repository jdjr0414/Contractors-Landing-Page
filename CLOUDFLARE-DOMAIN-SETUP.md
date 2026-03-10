# Cloudflare Pages: Root + WWW Domain Setup

For Google Search Console domain properties, the sitemap must be accessible at **both**:

- `https://contractorcapitalguide.com/sitemap.xml`
- `https://www.contractorcapitalguide.com/sitemap.xml`

Both URLs must return the same XML with HTTP 200. This is achieved by adding both domains to your Cloudflare Pages project.

---

## Step 1: Add Both Custom Domains

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. Select your project: **contractors-landing-page**
3. Open **Custom domains**
4. Add both domains:
   - Click **Set up a custom domain**
   - Enter `contractorcapitalguide.com` (root/apex) → **Continue**
   - Repeat for `www.contractorcapitalguide.com`

---

## Step 2: DNS Configuration

### If your domain uses Cloudflare nameservers

Cloudflare will create the required DNS records automatically when you add the custom domains. Verify in **DNS** → **Records**:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | `@` | `contractors-landing-page.pages.dev` | Proxied |
| CNAME | `www` | `contractors-landing-page.pages.dev` | Proxied |

> **Note:** For apex (`@`), Cloudflare uses CNAME flattening so a CNAME at the root works.

### If your domain does NOT use Cloudflare nameservers

You must add a CNAME record at your DNS provider:

- **For www:** `www` → `contractors-landing-page.pages.dev`
- **For root:** Use your provider’s apex/ALIAS/ANAME record to point to `contractors-landing-page.pages.dev` (or use Cloudflare for full setup)

---

## Step 3: Verify Both Domains Serve the Sitemap

After DNS propagates (usually a few minutes):

1. **Root domain:**  
   https://contractorcapitalguide.com/sitemap.xml → HTTP 200, valid XML

2. **WWW domain:**  
   https://www.contractorcapitalguide.com/sitemap.xml → HTTP 200, same XML

Both URLs serve the same static file from your Pages deployment.

---

## Step 4 (Optional): Redirect WWW → Root

To consolidate SEO signals, you can redirect `www` to the root domain:

1. **Cloudflare Dashboard** → Your zone → **Rules** → **Redirect Rules**
2. Create a rule:
   - **Name:** `Redirect www to root`
   - **When:** Hostname equals `www.contractorcapitalguide.com`
   - **Then:** Dynamic redirect to `https://contractorcapitalguide.com${uri.path}`, 301

With this redirect, `https://www.contractorcapitalguide.com/sitemap.xml` will 301 to `https://contractorcapitalguide.com/sitemap.xml`. Google follows redirects for sitemaps, so both will work for Search Console.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Root domain returns 522/error | Ensure apex CNAME or ALIAS points to your Pages project |
| Sitemap returns 404 | Rebuild and redeploy; confirm `dist/sitemap.xml` exists |
| Sitemap returns 500 | Check build logs; sitemap is prerendered at build time |
| Only www works | Add `contractorcapitalguide.com` as a custom domain in Pages |

---

## Summary

- **Sitemap location:** `/sitemap.xml` (built from `src/pages/sitemap.xml.ts`)
- **Canonical domain in sitemap:** `https://contractorcapitalguide.com`
- **Both domains** must be added to the Pages project so both serve the same content
