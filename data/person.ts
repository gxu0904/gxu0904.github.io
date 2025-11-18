export const person = {
  name: "Grace Xu",
  title: "Full-Stack Developer & Product Designer",
  location: "San Francisco, CA",
  email: "grace@example.com",
  github: "https://github.com/gracexu",
  linkedin: "https://linkedin.com/in/gracexu",
  highlights: [
    "Built 7+ full-stack applications serving 10K+ users",
    "Led product design for 3 award-winning DECA projects",
    "Research assistant in nano-grinding optimization",
    "FIRST Robotics programming lead (2022-2023)",
  ],
  bio: "I'm a developer and designer passionate about building tools that make learning and productivity more accessible. From educational platforms to research tools, I love combining clean code with thoughtful UX to solve real problems.",
  skills: {
    "Languages": ["TypeScript", "Python", "Java", "C++", "SQL"],
    "Frontend": ["React", "Next.js", "Tailwind CSS", "Three.js"],
    "Backend": ["Node.js", "Express", "PostgreSQL", "Firebase"],
    "Tools": ["Git", "Figma", "Vercel", "AWS", "Docker"],
    "Design": ["UI/UX", "Prototyping", "User Research", "A/B Testing"],
  },
  timeline: [
    { year: "2024", event: "Started Computer Science at Stanford" },
    { year: "2023", event: "M&TSI Program - Built predictive ML models" },
    { year: "2022", event: "Founded StudyAP - 5K+ students" },
    { year: "2021", event: "FIRST Robotics Programming Lead" },
  ],
} as const;

export type Person = typeof person;
