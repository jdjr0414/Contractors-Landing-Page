# Cloudflare Pages: Root + WWW Domain Setup

Add **both** hostnames to your Pages project so DNS resolves. The **canonical** host is **`https://contractorcapitalguide.com`** (apex). After **Step 4**, `www` redirects to apex, so **`/sitemap.xml`** on apex returns **200**; on `www` it **301**s to apex (fine for Google).

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

2. **WWW domain (after Step 4 redirect):**  
   https://www.contractorcapitalguide.com/sitemap.xml → **301** to `https://contractorcapitalguide.com/sitemap.xml` → **200**

---

## Step 4: Redirect WWW → Root (canonical = apex)

The site’s **canonical URLs, sitemap, and Search Console** use **`https://contractorcapitalguide.com`** (no `www`).  
**`www` must redirect to apex (301)**, not the other way around. If apex redirects to `www`, Google Search Console often reports **redirect errors** because the HTML `rel="canonical"` points at apex while HTTP sends users to `www`.

### 4a — Remove a wrong rule (apex → www)

If you previously added a redirect **from** `contractorcapitalguide.com` **to** `www.contractorcapitalguide.com`, **delete or disable** that rule.

1. **Cloudflare Dashboard** → your zone → **Rules** → **Redirect Rules** (and check **Bulk Redirects** if used)
2. Find any rule whose target is `www.contractorcapitalguide.com` when the request host is **apex**
3. **Turn off** or **delete** it

### 4b — Add WWW → apex (301)

1. **Rules** → **Redirect Rules** → **Create rule**
2. **Name:** `Redirect www to root`
3. **When:** *Custom filter expression* — **Hostname** **equals** `www.contractorcapitalguide.com`  
   (or use the rule builder: **Field** = Hostname, **Operator** = equals, **Value** = `www.contractorcapitalguide.com`)
4. **Then:** **Dynamic redirect**
   - **Target:** `https://contractorcapitalguide.com${uri.path}`  
   - Or **Static** with “Preserve query string” if your UI offers it
5. **Status code:** **301**
6. **Save** and **Deploy**

After this:

- `https://contractorcapitalguide.com/any-path/` → **200** (final URL matches canonical + sitemap)
- `https://www.contractorcapitalguide.com/any-path/` → **301** → apex

`https://www.contractorcapitalguide.com/sitemap.xml` will **301** to `https://contractorcapitalguide.com/sitemap.xml`. Google follows that for sitemaps.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Root domain returns 522/error | Ensure apex CNAME or ALIAS points to your Pages project |
| Sitemap returns 404 | Rebuild and redeploy; confirm `dist/sitemap.xml` exists |
| Sitemap returns 500 | Check build logs; sitemap is prerendered at build time |
| Only www works | Add `contractorcapitalguide.com` as a custom domain in Pages |
| GSC “redirect” errors on apex URLs | Remove apex→www redirect; use www→apex only (Step 4) |

---

## Summary

- **Sitemap location:** `/sitemap.xml` (built from `src/pages/sitemap.xml.ts`)
- **Canonical domain in sitemap:** `https://contractorcapitalguide.com`
- **Both domains** must be added to the Pages project so both serve the same content
