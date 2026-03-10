# Sitemap Domain Setup

The sitemap is generated at build time and available at `/sitemap.xml`. It includes:

- Homepage
- /blog and all individual blog posts
- All contractor-financing state pages (texas, california, florida, etc.)
- All content pages (working capital, equipment financing, glossary, etc.)

## Both Domains Must Return HTTP 200

For Google Search Console domain properties, both URLs must return the **same XML** with **HTTP 200**:

- `https://contractorcapitalguide.com/sitemap.xml`
- `https://www.contractorcapitalguide.com/sitemap.xml`

**→ See [CLOUDFLARE-DOMAIN-SETUP.md](./CLOUDFLARE-DOMAIN-SETUP.md)** for step-by-step Cloudflare Pages configuration (add both domains as custom domains).
