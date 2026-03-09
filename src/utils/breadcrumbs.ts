/**
 * Breadcrumb helper for BreadcrumbList schema and nav rendering.
 * Used for SEO and AI search optimization.
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Build BreadcrumbList schema for JSON-LD.
 */
export function breadcrumbSchema(items: BreadcrumbItem[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.url, baseUrl).toString()
    }))
  };
}
