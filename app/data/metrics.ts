export interface Metric {
  label: string;
  value: number;
  story?: string;
  link?: string;
}

export const metrics: Metric[] = [
  {
    label: "People Impacted",
    value: 8000,
    story: "Through LightAid and other initiatives, we've reached thousands of people in need.",
    link: "https://lightaid.org",
  },
  {
    label: "Donations",
    value: 17000,
    story: "Over 17,000 essential items shipped to communities across the country.",
  },
  {
    label: "Chapters",
    value: 20,
    story: "LightAid has expanded to 20+ chapters nationwide, creating local impact.",
  },
  {
    label: "Funds Raised ($)",
    value: 4000,
    story: "Community support has enabled us to scale our operations and reach more people.",
  },
];

