import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../data/site";

export const GET: APIRoute = async () => {
  const pages = await getCollection("pages");
  const blogPosts = await getCollection("blog");
  const now = new Date().toISOString().split("T")[0];

  const urlEntries: Array<{ path: string; lastmod?: string; priority?: number }> = [
    { path: "/", lastmod: now, priority: 1.0 },
    { path: "/blog", lastmod: now, priority: 0.9 }
  ];

  for (const p of pages) {
    if (p.slug === "home") continue;
    urlEntries.push({ path: p.data.canonicalPath, lastmod: now, priority: 0.7 });
  }

  for (const p of blogPosts) {
    const lastmod = (p.data.dateModified ?? p.data.pubDate).toISOString().split("T")[0];
    urlEntries.push({ path: p.data.canonicalPath, lastmod, priority: 0.8 });
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
        (e.priority != null ? `<priority>${e.priority}</priority>` : "") +
        `</url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};
