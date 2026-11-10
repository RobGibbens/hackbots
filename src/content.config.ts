import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const calendarDate = z.coerce.date();

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: calendarDate,
    summary: z.string(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        when: calendarDate,
        where: z.string(),
        image: image().optional(),
        imageAlt: z.string().optional(),
      })
      .refine((data) => !data.image || Boolean(data.imageAlt), {
        message: "imageAlt is required when image is set",
        path: ["imageAlt"],
      }),
});

export const collections = { news, events };
