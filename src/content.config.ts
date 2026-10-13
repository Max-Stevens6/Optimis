import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { amsterdamWallTime } from './lib/dates';

const activities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/activities' }),
  schema: z.object({
    title: z.string(),
    date: z.union([z.string(), z.date()]).transform(amsterdamWallTime),
    location: z.string(),
    image: z.string().optional(),
    category: z.enum(['Borrel', 'Gala', 'Gastcollege', 'Stagemarkt']),
    // `description` = de markdown-body van het bestand (zie .pages.yml)
  }),
});

const vacancies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vacancies' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    type: z.enum(['Stage', 'Afstudeerstage', 'Bijbaan', 'Traineeship', 'Vaste baan']),
    location: z.string().optional(),
    url: z.string().optional(),
  }),
});

const board = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/board' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    image: z.string().optional(),
    order: z.number().default(100),
    active: z.boolean().default(true),
    // korte beschrijving = markdown-body van het bestand
  }),
});

export const collections = { activities, vacancies, board };
