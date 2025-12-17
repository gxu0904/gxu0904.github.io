export const person = {
  name: "Grace Xu",
  title: "Full-Stack Developer, Software Lead & CTO",
  location: "San Jose, CA",
  email: "gx0794@gmail.com",
  github: "https://github.com/gxu0904",
  linkedin: "https://www.linkedin.com/in/grace-xu-",

  highlights: [
    "Software Lead for FRC Team 3256 • USACO Platinum",
    "Co-Founder & CEO/CTO of StudyAP (5,000+ students)",
    "Co-Lead & CTO of LightAid (17K+ donations, 750+ volunteers)",
    "Published researcher in Materials Today Communications (2025)",
    "ICDC 1st Place Winner — VBC Sports (2025)"
  ],

  bio: 
    "Hello, I'm Grace! I'm a senior at Valley Christian High School passionate about building tools that improve learning, accessibility, and global equity. I love creating systems that combine engineering with social impact — from AI-powered education platforms, to assistive technology for visually impaired shoppers, to the infrastructure behind a 10+ country nonprofit. My work sits at the intersection of software, hardware, and impactful problem-solving.",

  skills: {
    "Languages": ["Python", "TypeScript", "Java", "C++", "Go", "SQL"],
    "Frontend": ["React", "Next.js", "Vue.js", "Tailwind CSS", "Three.js"],
    "Backend": ["Node.js", "Express", "Firebase", "PostgreSQL", "MongoDB"],
    "Tools": ["Git", "Figma", "Docker", "AWS", "Vercel"],
    "Design": ["UI/UX Design", "Prototyping", "User Testing", "Workflow Design"]
  },

  timeline: [
    { year: "2025", event: "1st Place ICDC - VBC Sports; Reached USACO Platinum Division; Attended M&TSI over summer, created device to assist visually impaired shoppers" },
    { year: "2024", event: "Co-founded StudyAP; Scaled LightAid to 10+ chapters; Joined DECA leadership" },
    { year: "2023", event: "Battled Aplastic anemia, received bone marrow transplant" },
    { year: "2022", event: "Summer: Attended COSMOS Cluster 5, created card-dealing robot for final project" },
    { year: "2021", event: "Joined FRC 3256; began competitive programming journey" }
  ]
} as const;

export type Person = typeof person;
