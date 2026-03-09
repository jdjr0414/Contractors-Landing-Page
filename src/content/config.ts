import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    canonicalPath: z.string(),
    ogType: z.enum(["website", "article"]).default("website"),
    h1: z.string().optional(),
    intro: z.string().optional(),
    /** Short answer for AI search / featured snippet; rendered near top */
    quickAnswer: z.string().optional(),
    ctaTitle: z.string().optional(),
    ctaText: z.string().optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).default([])
  })
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    canonicalPath: z.string(),
    category: z.string().default("Contractor Funding"),
    ogType: z.literal("article").default("article"),
    excerpt: z.string(),
    /** Short answer for AI search / featured snippet; rendered near top of article */
    quickAnswer: z.string().optional(),
    /** Absolute URL for article hero/feature image (schema + og:image) */
    imageUrl: z.string().optional(),
    author: z.string().default("Contractor Capital Guide"),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).default([]),
    /** Related funding page paths for internal linking (e.g. /contractor-working-capital) */
    relatedFunding: z.array(z.string()).default([])
  })
});

export const collections = { pages, blog };
