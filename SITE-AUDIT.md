# Site Audit – Crawlability & Sitemaps

**Date:** March 2025  
**Scope:** Sitemaps, robots.txt, crawler access, HTML structure

---

## Sitemaps

| Item | Status | Details |
|------|--------|---------|
| **Sitemap index** | OK | `/sitemap-index.xml` – points to main sitemap |
| **Main sitemap** | OK | `/sitemap.xml` – lists all pages and blog posts |
| **Linked in robots.txt** | OK | Both sitemaps listed in `robots.txt` |
| **Linked in HTML head** | OK | `<link rel="sitemap">` on every page |
| **Linked in footer** | OK | Sitemap link in footer navigation |
| **Absolute URLs** | OK | All sitemap URLs use full domain |
| **lastmod** | OK | Pages use `dateModified`; blog uses `pubDate` |
| **priority** | OK | Home 1.0, blog index 0.9, blog posts 0.8, pages 0.7 |
| **Content-Type** | OK | `application/xml; charset=utf-8` |

---

## Crawler Access

| Item | Status | Details |
|------|--------|---------|
| **robots.txt** | OK | `Allow: /` for all user-agents |
| **Meta robots** | OK | `index, follow` on every page |
| **No noindex** | OK | No pages blocked from indexing |
| **No nofollow** | OK | No link following restrictions |
| **AI crawlers** | OK | GPTBot, PerplexityBot, CCBot, Claude-Web explicitly allowed |

---

## HTML / Crawlability

| Item | Status | Details |
|------|--------|---------|
| **Static HTML** | OK | Astro outputs static HTML; no JS required for content |
| **Semantic structure** | OK | Proper headings (h1, h2, h3), nav, main, footer |
| **Canonical URLs** | OK | Every page has `<link rel="canonical">` |
| **Meta description** | OK | Every page has unique description |
| **Charset** | OK | `UTF-8` declared |
| **Viewport** | OK | Responsive meta viewport |
| **lang attribute** | OK | `<html lang="en">` |

---

## Configuration

| Item | Value |
|------|-------|
| **Domain** | `site.domain` in `src/data/site.ts` |
| **Astro site** | `astro.config.mjs` – update if domain changes |
| **Sitemap URLs** | Use `site.domain` for absolute URLs |

---

## Checklist for Launch

- [ ] Update `site.domain` in `src/data/site.ts` to production URL
- [ ] Update `site` in `astro.config.mjs` to match
- [ ] Submit sitemap in Google Search Console: `https://yoursite.com/sitemap-index.xml`
- [ ] Submit sitemap in Bing Webmaster Tools
- [ ] Verify `robots.txt` is accessible at `https://yoursite.com/robots.txt`
- [ ] Test sitemap at `https://yoursite.com/sitemap.xml`
