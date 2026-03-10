import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../data/site";
import { stateSlugs } from "../data/states";

export const prerender = true;

/** Normalize path to trailing slash (site uses trailingSlash: "always") */
function toTrailingSlash(path: string): string {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export const GET: APIRoute = async () => {
  const pages = await getCollection("pages");
  const blogPosts = await getCollection("blog");
  const now = new Date().toISOString().split("T")[0];

  type UrlEntry = { path: string; lastmod?: string; priority?: number; changefreq?: string };
  const urlEntries: UrlEntry[] = [
    { path: "/", lastmod: now, priority: 1.0, changefreq: "weekly" },
    { path: "/blog/", lastmod: now, priority: 0.9, changefreq: "weekly" }
  ];

  for (const slug of stateSlugs) {
    urlEntries.push({ path: toTrailingSlash(`/contractor-financing/${slug}`), lastmod: now, priority: 0.7, changefreq: "monthly" });
  }

  for (const p of pages) {
    if (p.slug === "home") continue;
    const lastmod = p.data.dateModified?.toISOString().split("T")[0] ?? now;
    const changefreq = ["faq", "about", "contact"].includes(p.slug) ? "monthly" : "weekly";
    urlEntries.push({ path: toTrailingSlash(p.data.canonicalPath), lastmod, priority: 0.7, changefreq });
  }

  for (const p of blogPosts) {
    const lastmod = (p.data.dateModified ?? p.data.pubDate).toISOString().split("T")[0];
    urlEntries.push({ path: toTrailingSlash(p.data.canonicalPath), lastmod, priority: 0.8, changefreq: "monthly" });
  }

  const seen = new Set<string>();
  const urls = urlEntries
    .filter((e) => {
      if (seen.has(e.path)) return false;
      seen.add(e.path);
      return true;
    })
    .map(
      (e) =>
        `<url><loc>${new URL(e.path, site.domain).toString()}</loc>` +
        (e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : "") +
        (e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : "") +
        (e.priority != null ? `<priority>${e.priority}</priority>` : "") +
        `</url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
