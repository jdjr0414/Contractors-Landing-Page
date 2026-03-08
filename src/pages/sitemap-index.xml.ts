import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../data/site";

export const GET: APIRoute = async () => {
  const pageEntries = (await getCollection("pages")).map((p) => p.data.canonicalPath);
  const blogEntries = (await getCollection("blog")).map((p) => p.data.canonicalPath);
  const urls = Array.from(new Set(["/", "/blog", ...pageEntries, ...blogEntries]))
    .map((path) => `<url><loc>${new URL(path, site.domain).toString()}</loc></url>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};
