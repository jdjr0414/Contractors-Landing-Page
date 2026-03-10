import type { APIRoute } from "astro";
import { site } from "../data/site";

export const prerender = true;

export const GET: APIRoute = async () => {
  const sitemapUrl = new URL("/sitemap.xml", site.domain).toString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${sitemapUrl}</loc></sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
