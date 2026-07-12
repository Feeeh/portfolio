export type Lang = "en" | "pt";

export interface Localized {
  en: string;
  pt: string;
}

export interface LocalizedList {
  en: string[];
  pt: string[];
}

export interface Project {
  id: string;
  title: string;
  category: CategoryId;
  summary: Localized;
  description: LocalizedList;
  tech: string[];
  images: string[];
  link?: string;
}

export type CategoryId = "sesi" | "ia-kiko" | "scb" | "cashbackhub";

export interface Category {
  id: CategoryId;
  label: string;
  blurb: Localized;
}

export const categories: Category[] = [
  {
    id: "sesi",
    label: "SESI-SP · FIESP",
    blurb: {
      en: "Portals and platforms I develop and maintain at SESI São Paulo, after starting as a backend engineering intern at FIESP.",
      pt: "Portais e plataformas que desenvolvo e mantenho no SESI São Paulo, depois de começar como estagiário de engenharia de software (backend) na FIESP.",
    },
  },
  {
    id: "ia-kiko",
    label: "IA Kiko",
    blurb: {
      en: "AI storytelling platform for children — co-founder.",
      pt: "Plataforma de histórias com IA para crianças — cofundador.",
    },
  },
  {
    id: "scb",
    label: "Survival Craft Brasil",
    blurb: {
      en: "Community Minecraft server I co-founded and built plugins for.",
      pt: "Servidor de Minecraft comunitário que cofundei e para o qual desenvolvi plugins.",
    },
  },
  {
    id: "cashbackhub",
    label: "CashbackHub",
    blurb: {
      en: "University project published at the CATI academic congress.",
      pt: "Projeto universitário publicado no congresso acadêmico CATI.",
    },
  },
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

export const projects: Project[] = [
  // ---------- SESI-SP · FIESP ----------
  {
    id: "sesi-conteudos",
    title: "SESI-SP Conteúdos",
    category: "sesi",
    summary: {
      en: "Free content hub with occupational health & safety guides for industrial companies.",
      pt: "Hub gratuito de conteúdos com guias de saúde e segurança do trabalho para indústrias.",
    },
    description: {
      en: [
        "Content portal where SESI-SP publishes free guides, digital books and videos on workplace safety, health and corporate development — with search and topic filters used by industrial companies and safety professionals across São Paulo.",
        "I work on the development and maintenance of pages and flows (ASP.NET Razor, HTML/CSS/JavaScript), SQL Server queries and data structures, and performance improvements guided by Lighthouse/PageSpeed (Core Web Vitals). I also handle technical SEO: meta tags, canonical URLs, Schema.org/JSON-LD structured data, GA4/GTM instrumentation and Screaming Frog audits.",
      ],
      pt: [
        "Portal de conteúdos em que o SESI-SP publica gratuitamente guias, livros digitais e vídeos sobre segurança do trabalho, saúde e desenvolvimento corporativo — com busca e filtros por tema, usado por indústrias e profissionais de SST de todo o estado de São Paulo.",
        "Atuo no desenvolvimento e na manutenção de páginas e fluxos (ASP.NET Razor, HTML/CSS/JavaScript), em consultas e estruturas de dados no SQL Server e em melhorias de performance guiadas por Lighthouse/PageSpeed (Core Web Vitals). Também cuido do SEO técnico: meta tags, URLs canônicas, dados estruturados Schema.org/JSON-LD, instrumentação GA4/GTM e auditorias com Screaming Frog.",
      ],
    },
    tech: ["C#", ".NET", "ASP.NET Razor", "SQL Server", "JavaScript", "SEO", "GA4/GTM"],
    images: ["/img/projects/sesi-conteudos.webp"],
    link: "https://www.sesisp.org.br/para-industria/conteudos",
  },
  {
    id: "memoria-cultural",
    title: "Memória Cultural SESI-SP",
    category: "sesi",
    summary: {
      en: "Digital archive preserving decades of SESI-SP's artistic and cultural history.",
      pt: "Acervo digital que preserva décadas da história artística e cultural do SESI-SP.",
    },
    description: {
      en: [
        "A public digital archive run by the FIESP Cultural Center that gathers historical records of SESI-SP's artistic activities — a searchable collection across eight artistic languages (performing arts, visual arts, audiovisual, dance, literature, music and more), plus costume photography archives and artist biographies.",
        "My work covers feature development and maintenance of the portal, database-backed search and filtering over the collection, page/flow adjustments, and web performance and SEO improvements so the archive stays fast and discoverable.",
      ],
      pt: [
        "Acervo digital público mantido pelo Centro Cultural FIESP que reúne registros históricos das atividades artísticas do SESI-SP — uma coleção pesquisável em oito linguagens artísticas (artes cênicas, artes visuais, audiovisual, dança, literatura, música e mais), além de acervo fotográfico de figurinos e biografias de artistas.",
        "Meu trabalho envolve o desenvolvimento de funcionalidades e a manutenção do portal, busca e filtros sobre a coleção com apoio de banco de dados, ajustes de páginas e fluxos, e melhorias de performance web e SEO para manter o acervo rápido e fácil de encontrar.",
      ],
    },
    tech: ["C#", ".NET", "ASP.NET Razor", "SQL Server", "JavaScript", "SEO"],
    images: ["/img/projects/fiesp-memoria-cultural.webp"],
    link: "https://centrocultural.fiesp.com.br/memoria-cultural",
  },
  {
    id: "jornada-digital",
    title: "Jornada de Transformação Digital",
    category: "sesi",
    summary: {
      en: "Supplier registration portal for the FIESP/SENAI/SEBRAE digital transformation program.",
      pt: "Portal de cadastro de fornecedores do programa de transformação digital FIESP/SENAI/SEBRAE.",
    },
    description: {
      en: [
        "Registration platform where technology providers apply to join the SENAI-SP marketplace that connects suppliers to companies going through digital transformation. It features a multi-step form covering company data, technological categories, service coverage areas, documentation upload and terms agreement.",
        "I supported development and maintenance of the application: form flows and validation, back-end APIs, SQL Server data handling, and testing/validation of features before release.",
      ],
      pt: [
        "Plataforma de cadastro em que fornecedores de tecnologia se candidatam ao marketplace do SENAI-SP, que conecta fornecedores a empresas em transformação digital. Possui formulário em múltiplas etapas com dados da empresa, categorias tecnológicas, polos de atendimento, envio de documentação e aceite de termos.",
        "Apoiei o desenvolvimento e a manutenção da aplicação: fluxos e validação de formulários, APIs de back-end, tratamento de dados no SQL Server e testes/validação das funcionalidades antes das entregas.",
      ],
    },
    tech: ["C#", ".NET", "APIs REST", "SQL Server", "JavaScript"],
    images: ["/img/projects/senai-jornada-digital.webp"],
    link: "https://jornadadigital-cadastro.sp.senai.br/",
  },
  {
    id: "portais-fiesp-sesi",
    title: "Portal FIESP, Portal SESI-SP & other portals",
    category: "sesi",
    summary: {
      en: "Ongoing maintenance and evolution of the institution's main web portals.",
      pt: "Manutenção e evolução contínuas dos principais portais web da instituição.",
    },
    description: {
      en: [
        "Continuous maintenance of several high-traffic institutional portals, including Portal FIESP and Portal SESI-SP: bug investigation and fixes, new features, content flows, and support to internal users (issue triage and incident reproduction).",
        "Recurring work on web performance (Lighthouse/PageSpeed, lazy loading, asset optimization) and technical SEO — meta tags, canonicals, structured data, redirect chains, duplicate titles/descriptions and indexing audits with Screaming Frog.",
      ],
      pt: [
        "Manutenção contínua de diversos portais institucionais de alto tráfego, incluindo o Portal FIESP e o Portal SESI-SP: investigação e correção de bugs, novas funcionalidades, fluxos de conteúdo e suporte a usuários internos (triagem e reprodução de incidentes).",
        "Trabalho recorrente em performance web (Lighthouse/PageSpeed, lazy loading, otimização de assets) e SEO técnico — meta tags, canônicas, dados estruturados, cadeias de redirecionamento, títulos/descrições duplicados e auditorias de indexação com Screaming Frog.",
      ],
    },
    tech: ["C#", ".NET", "ASP.NET", "SQL Server", "JavaScript", "Web Performance", "SEO"],
    images: ["/img/projects/portal-fiesp.webp", "/img/projects/portal-sesi.webp"],
    link: "https://www.fiesp.com.br/",
  },

  // ---------- IA Kiko ----------
  {
    id: "ia-kiko",
    title: "IA Kiko",
    category: "ia-kiko",
    summary: {
      en: "AI platform that turns children into authors of their own illustrated stories.",
      pt: "Plataforma de IA que transforma crianças em autoras das próprias histórias ilustradas.",
    },
    description: {
      en: [
        "IA Kiko helps children develop imagination, critical thinking and writing skills: through playful questions and AI-assisted narrative generation, each child becomes the author of their own story — telling, drawing and coloring along the way.",
        "As co-founder I'm responsible for the product's architecture: an ASP.NET Core (.NET 10) back end with Entity Framework Core and SQL Server on Azure, and a TypeScript front end built with Vite and Bootstrap 5.",
        "The platform integrates multiple AI models (Claude, OpenAI, Google Gemini) for text and image generation, and includes Stripe payments, automated e-mails, NFS-e invoice issuing, JWT authentication and background jobs with Hangfire. It's deployed to Azure App Service via GitHub Actions, with code quality tracked on SonarCloud and tests using xUnit, FluentAssertions and Moq.",
      ],
      pt: [
        "O IA Kiko ajuda crianças a desenvolver imaginação, pensamento crítico e habilidades de escrita: por meio de perguntas criativas e geração de narrativas assistida por IA, cada criança se torna autora da própria história — contando, desenhando e colorindo pelo caminho.",
        "Como cofundador, sou responsável pela arquitetura do produto: back-end em ASP.NET Core (.NET 10) com Entity Framework Core e SQL Server no Azure, e front-end em TypeScript construído com Vite e Bootstrap 5.",
        "A plataforma integra múltiplos modelos de IA (Claude, OpenAI, Google Gemini) para geração de texto e imagens, e inclui pagamentos com Stripe, e-mails automatizados, emissão de NFS-e, autenticação JWT e jobs em background com Hangfire. O deploy é feito no Azure App Service via GitHub Actions, com qualidade de código no SonarCloud e testes com xUnit, FluentAssertions e Moq.",
      ],
    },
    tech: [
      "C#",
      ".NET 10",
      "ASP.NET Core",
      "EF Core",
      "SQL Server",
      "Azure",
      "TypeScript",
      "Vite",
      "Claude / OpenAI / Gemini",
      "Stripe",
      "Hangfire",
      "GitHub Actions",
    ],
    images: ["/img/projects/ia-kiko.webp"],
    link: "https://iakiko.com.br/",
  },

  // ---------- Survival Craft Brasil ----------
  {
    id: "scb-plugins",
    title: "Survival Craft Brasil — server & plugins",
    category: "scb",
    summary: {
      en: "Community Minecraft server with 50–100 concurrent players and custom Java plugins.",
      pt: "Servidor de Minecraft comunitário com 50–100 jogadores simultâneos e plugins próprios em Java.",
    },
    description: {
      en: [
        "Co-founded, built and operated a community Minecraft server that peaked at 50–100 simultaneous players, taking care of stability and player experience.",
        "Developed plugin modifications in Java on the Bukkit API, focused on new features and maintenance, and organized events and community management — an early lesson in leadership and product sense.",
      ],
      pt: [
        "Cofundei, construí e operei um servidor de Minecraft comunitário com picos de 50–100 jogadores simultâneos, cuidando da estabilidade e da experiência dos jogadores.",
        "Desenvolvi modificações/plugins em Java com a Bukkit API, focados em novas funcionalidades e manutenção, além de organizar eventos e a gestão da comunidade — um aprendizado precoce de liderança e senso de produto.",
      ],
    },
    tech: ["Java", "Bukkit API"],
    images: placeholders("Survival Craft Brasil", 3),
    link: "https://github.com/Feeeh/SurvivalCraftBrasil",
  },

  // ---------- CashbackHub ----------
  {
    id: "cashbackhub",
    title: "CashbackHub — Cashback Alert",
    category: "cashbackhub",
    summary: {
      en: "Cashback alert platform, published at FAM's CATI academic congress (2023).",
      pt: "Plataforma de alerta de cashback, publicada no congresso acadêmico CATI da FAM (2023).",
    },
    description: {
      en: [
        "University project built with my team at Centro Universitário FAM: a platform that aggregates cashback offers and alerts users about them.",
        'The work was published as "CASHBACKHUB: ALERTA DE CASHBACK" in the proceedings of the IV Congresso Acadêmico de Tecnologia da Informação (CATI), November 2023.',
      ],
      pt: [
        "Projeto universitário desenvolvido com minha equipe no Centro Universitário FAM: uma plataforma que agrega ofertas de cashback e alerta os usuários sobre elas.",
        'O trabalho foi publicado como "CASHBACKHUB: ALERTA DE CASHBACK" nos anais do IV Congresso Acadêmico de Tecnologia da Informação (CATI), em novembro de 2023.',
      ],
    },
    tech: ["C#", ".NET", "SQL"],
    images: placeholders("CashbackHub", 3),
  },
];
