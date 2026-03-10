# Sitemap Domain Setup

The sitemap is generated at build time and available at:

- `/sitemap.xml`
- `/sitemap-index.xml`

## Ensure Both Domains Serve the Sitemap

For the sitemap to be accessible at **both**:

- `https://contractorcapitalguide.com/sitemap.xml`
- `https://www.contractorcapitalguide.com/sitemap.xml`

**Cloudflare Pages:** Add both domains as custom domains to your Pages project:

1. Cloudflare Dashboard → Pages → Your project → Custom domains
2. Add `contractorcapitalguide.com`
3. Add `www.contractorcapitalguide.com`

Both domains will serve the same static files (including the sitemap). No redirect is required for the sitemap to work on both.

**Optional (canonical redirect):** To redirect www → non-www for SEO, use Cloudflare **Redirect Rules** or **Bulk Redirects** in the dashboard (not `_redirects`, which does not support domain-level redirects).
