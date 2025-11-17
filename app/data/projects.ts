import { z } from "zod";

export const Project = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  tagline: z.string(),
  category: z.enum(["Engineering", "Research", "Social Impact", "Design"]),
  year: z.number(),
  summary: z.string(),
  highlights: z.array(z.string()).min(3),
  links: z.object({
    repo: z.string().optional(),
    live: z.string().optional(),
    doc: z.string().optional(),
  }),
  cover: z.string(),
  tech: z.array(z.string()),
});

export type Project = z.infer<typeof Project>;

export const projects: Project[] = [
  {
    id: "studyap",
    title: "StudyAP",
    slug: "studyap",
    tagline: "AI-powered test prep for AP, SAT, GED",
    category: "Engineering",
    year: 2025,
    summary:
      "Platform with question generator, spaced repetition, analytics.",
    highlights: [
      "1k+ students",
      "Retention +65%",
      "Auto item generation",
    ],
    links: { live: "https://studyap.org" },
    cover: "/images/projects/studyap.jpg",
    tech: ["Next.js", "TS", "Supabase", "OpenAI", "Tailwind"],
  },
  {
    id: "lightaid",
    title: "LightAid",
    slug: "lightaid",
    tagline: "Nonprofit tackling light & period poverty",
    category: "Social Impact",
    year: 2025,
    summary: "20+ chapters, logistics & donation pipeline.",
    highlights: [
      "8k+ impacted",
      "$4k+ raised",
      "17k+ donations shipped",
    ],
    links: { live: "https://lightaid.org" },
    cover: "/images/projects/lightaid.jpg",
    tech: ["Next.js", "Airtable", "Supabase"],
  },
  {
    id: "nano-grinding",
    title: "Nano-Grinding MD + DL Optimization",
    slug: "nano-grinding",
    tagline: "Atomic-scale machining parameter search",
    category: "Research",
    year: 2025,
    summary:
      "MD sims + NSGA-II surrogate cut compute from hours → 5s.",
    highlights: [
      "First-author, MTComm 2025",
      "Interpretable features",
      "Surface quality model",
    ],
    links: { doc: "#" },
    cover: "/images/projects/nano.jpg",
    tech: ["LAMMPS", "PyTorch", "Python"],
  },
];

