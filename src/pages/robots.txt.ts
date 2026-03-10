import type { APIRoute } from "astro";
import { site } from "../data/site";

export const GET: APIRoute = () => {
  const base = new URL("/", site.domain).toString().replace(/\/$/, "");
  const robots = `User-agent: *
Allow: /

# AI search engines - explicitly allow for GEO/AEO visibility
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

Sitemap: ${base}/sitemap.xml
`;

  return new Response(robots, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};
