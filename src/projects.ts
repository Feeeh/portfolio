export interface Project {
  id: string;
  title: string;
  category: CategoryId;
  summary: string;
  description: string[];
  tech: string[];
  images: string[];
  link?: string;
}

export type CategoryId = "sesi" | "ia-kiko" | "scb" | "cashbackhub" | "personal";

export interface Category {
  id: CategoryId;
  label: string;
  blurb: string;
}

export const categories: Category[] = [
  { id: "sesi", label: "SESI", blurb: "Projects developed at SESI." },
  { id: "ia-kiko", label: "IA Kiko", blurb: "AI-powered assistant project." },
  { id: "scb", label: "Survival Craft Brasil", blurb: "Plugins built for a Minecraft server." },
  { id: "cashbackhub", label: "CashbackHub", blurb: "University project." },
  { id: "personal", label: "Personal", blurb: "Other projects built on my own time." },
];

// Placeholder image generator — replace `placeholders(...)` calls with real
// image paths, e.g. images: ["/img/my-project/1.png", "/img/my-project/2.png"]
function placeholders(title: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
      <rect width="100%" height="100%" fill="#14061c"/>
      <rect x="8" y="8" width="1264" height="704" fill="none" stroke="#9D75FC" stroke-width="4"/>
      <text x="50%" y="46%" fill="#9D75FC" font-family="monospace" font-size="48" text-anchor="middle">${title}</text>
      <text x="50%" y="56%" fill="#a1a1aa" font-family="monospace" font-size="32" text-anchor="middle">screenshot ${i + 1}</text>
    </svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  });
}

// EDIT: replace all placeholder titles, texts and images with your real projects.
export const projects: Project[] = [
  // ---------- SESI ----------
  {
    id: "sesi-project-1",
    title: "SESI Project 1",
    category: "sesi",
    summary: "One-line summary shown on the card.",
    description: [
      "First paragraph describing the project, the problem it solves and your role in it.",
      "Second paragraph with more details: challenges, results, interesting decisions.",
    ],
    tech: ["C#", ".NET", "SQL Server"],
    images: placeholders("SESI Project 1", 4),
  },
  {
    id: "sesi-project-2",
    title: "SESI Project 2",
    category: "sesi",
    summary: "One-line summary shown on the card.",
    description: ["Describe the project here."],
    tech: ["TypeScript", "React"],
    images: placeholders("SESI Project 2", 3),
  },
  {
    id: "sesi-project-3",
    title: "SESI Project 3",
    category: "sesi",
    summary: "One-line summary shown on the card.",
    description: ["Describe the project here."],
    tech: ["Python"],
    images: placeholders("SESI Project 3", 3),
  },
  {
    id: "sesi-project-4",
    title: "SESI Project 4",
    category: "sesi",
    summary: "One-line summary shown on the card.",
    description: ["Describe the project here."],
    tech: ["C#"],
    images: placeholders("SESI Project 4", 3),
  },
  {
    id: "sesi-project-5",
    title: "SESI Project 5",
    category: "sesi",
    summary: "One-line summary shown on the card.",
    description: ["Describe the project here."],
    tech: ["JavaScript"],
    images: placeholders("SESI Project 5", 3),
  },
  {
    id: "sesi-project-6",
    title: "SESI Project 6",
    category: "sesi",
    summary: "One-line summary shown on the card.",
    description: ["Describe the project here."],
    tech: ["Java"],
    images: placeholders("SESI Project 6", 3),
  },

  // ---------- IA Kiko ----------
  {
    id: "ia-kiko",
    title: "IA Kiko",
    category: "ia-kiko",
    summary: "AI assistant — describe what Kiko does in one line.",
    description: [
      "Describe IA Kiko: what it does, which models/APIs it uses, who uses it.",
      "Add architecture details, results or anything worth highlighting.",
    ],
    tech: ["Python", "LLM API"],
    images: placeholders("IA Kiko", 4),
  },

  // ---------- Survival Craft Brasil ----------
  {
    id: "scb-plugin-1",
    title: "SCB Plugin 1",
    category: "scb",
    summary: "Minecraft server plugin — one-line summary.",
    description: ["Describe the plugin: features, commands, how many players use it."],
    tech: ["Java", "Spigot API"],
    images: placeholders("SCB Plugin 1", 3),
  },
  {
    id: "scb-plugin-2",
    title: "SCB Plugin 2",
    category: "scb",
    summary: "Minecraft server plugin — one-line summary.",
    description: ["Describe the plugin here."],
    tech: ["Java", "Spigot API"],
    images: placeholders("SCB Plugin 2", 3),
  },
  {
    id: "scb-plugin-3",
    title: "SCB Plugin 3",
    category: "scb",
    summary: "Minecraft server plugin — one-line summary.",
    description: ["Describe the plugin here."],
    tech: ["Java", "Spigot API"],
    images: placeholders("SCB Plugin 3", 3),
  },

  // ---------- CashbackHub ----------
  {
    id: "cashbackhub",
    title: "CashbackHub",
    category: "cashbackhub",
    summary: "University project — cashback aggregation platform.",
    description: [
      "Describe CashbackHub: the idea, your team, your responsibilities and the outcome.",
    ],
    tech: ["C#", ".NET", "SQL"],
    images: placeholders("CashbackHub", 4),
  },

  // ---------- Personal ----------
  {
    id: "personal-project-1",
    title: "Personal Project 1",
    category: "personal",
    summary: "One-line summary shown on the card.",
    description: ["Describe the project here."],
    tech: ["TypeScript"],
    images: placeholders("Personal Project 1", 3),
  },
  {
    id: "personal-project-2",
    title: "Personal Project 2",
    category: "personal",
    summary: "One-line summary shown on the card.",
    description: ["Describe the project here."],
    tech: ["Go"],
    images: placeholders("Personal Project 2", 3),
  },
];
