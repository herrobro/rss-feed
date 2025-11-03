import { z } from "zod";

// Article schema for RSS feed items
export const articleSchema = z.object({
  title: z.string(),
  link: z.string().url(),
});

export const articlesResponseSchema = z.array(articleSchema);

export type Article = z.infer<typeof articleSchema>;
