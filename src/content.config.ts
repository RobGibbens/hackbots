import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { sponsorTierNames } from "./data/site.ts";

const calendarDate = z.coerce.date();

const seasonResult = z.object({
  name: z.string(),
  place: z.string(),
});

const seasonLink = z.object({
  label: z.string(),
  href: z.string().min(1),
});

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

const seasons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/seasons" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      game: z.string(),
      description: z.string(),
      image: image(),
      imageAlt: z.string(),
      robot: z.string(),
      record: z.string(),
      results: z
        .union([z.array(seasonResult), z.null()])
        .optional()
        .transform((value) => value ?? []),
      links: z.array(seasonLink),
    }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sponsors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      tier: z.enum(sponsorTierNames),
      summary: z.string().min(1),
      url: z.string().url(),
      season: z.number().int(),
      logo: image(),
      logoAlt: z.string().min(1),
    }),
});

export const collections = { news, events, seasons, sponsors };
