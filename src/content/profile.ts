export interface SocialLink {
  label: string;
  url: string;
  handle?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  category: "Full-Stack" | "Machine Learning" | "Web Systems" | "Open Source" | string;
  role: string;
  problem: string;
  outcome: string;
  description: string;
  highlights: string[];
  technologies: string[];
  images: ProjectImage[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  placeholder?: boolean;
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  location?: string;
  type: "Work" | "Research" | "Leadership" | "Open Source";
  summary: string;
  bullets: string[];
  placeholder?: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  notes?: string;
  location?: string;
  placeholder?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
  placeholder?: boolean;
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
  url?: string;
  placeholder?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Profile {
  personal: {
    name: string;
    domain: string;
    primaryRole: string;
    heroEyebrowRole: string;
    heroSubline: string;
    heroFocusItems: string[];
    subRoles: string[];
    location: string;
    status: {
      availableForWork: boolean;
      statusText: string;
    };
    bioShort: string;
    bioLong: string[];
    statement: string;
    currently: string[];
    photo?: string;
  };
  contact: {
    email: string;
    calendarUrl?: string;
    resumeUrl: string;
    locationTimezone: string;
  };
  socials: Record<string, SocialLink>;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
}

export const profileData: Profile = {
  personal: {
    name: "Somya Moonat",
    domain: "somyamoonat.tech",
    primaryRole: "Full-Stack Developer & ML Engineer",
    heroEyebrowRole: "FULL-STACK DEVELOPER & ML ENGINEER",
    heroSubline:
      "Full-stack web developer and machine learning engineer focused on practical software, clean architecture, and reliable systems.",
    heroFocusItems: [
      "Full-Stack Web Development",
      "Machine Learning Systems",
      "API & Backend Engineering",
    ],
    subRoles: [
      "Full-Stack Web Development",
      "Machine Learning Systems",
      "API & Backend Engineering",
    ],
    location: "India (IST, UTC+5:30)",
    status: {
      availableForWork: true,
      statusText: "Open to full-time roles & select projects",
    },
    bioShort:
      "Software developer building full-stack applications and ML pipelines with clean architectures and disciplined engineering.",
    bioLong: [
      "I am an engineer focused on the intersection of modern web systems and applied machine learning. Most of my work involves TypeScript and Next.js on the client, clean Python and Node backends, and practical data pipelines that solve concrete problems.",
      "I value architectural clarity: predictable state management, defensive typing, sensible database schemas, and avoiding unnecessary abstractions that make software difficult to reason about.",
    ],
    statement:
      "Full-stack engineer and machine learning practitioner building reliable web applications and intelligent data systems.",
    currently: [
      "Building full-stack applications with Next.js App Router and TypeScript",
      "Studying information retrieval methods and model evaluation workflows",
      "Open to software engineering and machine learning roles",
    ],
    photo: undefined, // Add your image path here (e.g. "/somya.jpg") to switch from typographic portrait to photo
  },

  contact: {
    email: "somya.moonat@gmail.com",
    calendarUrl: undefined, // Optional booking link (e.g. "https://cal.com/somyamoonat")
    resumeUrl: "/resume.pdf",
    locationTimezone: "IST (UTC+5:30) • Open to remote worldwide",
  },

  socials: {
    github: {
      label: "GitHub",
      url: "https://github.com/somyamoonat",
      handle: "@somyamoonat",
    },
    linkedin: {
      label: "LinkedIn",
      url: "https://linkedin.com/in/somyamoonat",
      handle: "in/somyamoonat",
    },
    x: {
      label: "X (Twitter)",
      url: "https://x.com/somyamoonat",
      handle: "@somyamoonat",
    },
    email: {
      label: "Direct Email",
      url: "mailto:somya.moonat@gmail.com",
      handle: "somya.moonat@gmail.com",
    },
  },

  skills: [
    {
      category: "Frontend Engineering",
      skills: [
        "TypeScript",
        "React",
        "Next.js (App Router)",
        "Tailwind CSS",
        "HTML5 / Semantic Web",
        "State Management",
        "Responsive & Accessible UI",
      ],
    },
    {
      category: "Backend & Storage",
      skills: [
        "Node.js",
        "Python",
        "REST APIs",
        "PostgreSQL",
        "Prisma / Drizzle ORM",
        "Redis",
        "Authentication & Security",
      ],
    },
    {
      category: "Machine Learning & Data",
      skills: [
        "PyTorch",
        "Scikit-learn",
        "NumPy & Pandas",
        "Data Preprocessing Pipelines",
        "Model Training & Validation",
        "Vector Search & Embeddings",
      ],
    },
    {
      category: "DevOps & Tooling",
      skills: [
        "Git & GitHub Actions",
        "Docker",
        "Linux CLI",
        "Vercel Deployment",
        "Unit & Integration Testing",
      ],
    },
  ],

  projects: [
    {
      slug: "contextual-search-engine",
      title: "Contextual Semantic Search Engine",
      tagline: "Document retrieval pipeline pairing dense vector embeddings with lexical search.",
      year: "2026",
      category: "Machine Learning",
      role: "Lead Developer",
      problem:
        "Keyword search fails on nuanced queries where vocabulary differs from source terminology, while pure vector search often misses exact technical identifiers.",
      outcome:
        "Built a hybrid indexing pipeline that balances dense semantic similarity with keyword matching and exposes a clean query API.",
      description:
        "An end-to-end document search pipeline that processes raw text, generates normalized embeddings, and retrieves ranked context chunks for downstream tasks.",
      highlights: [
        "Hybrid scoring combining lexical token matching with dense vector representations",
        "Quantized vector index structure to reduce query memory footprint",
        "Query inspection client built in Next.js with real-time score inspection",
      ],
      technologies: ["Python", "PyTorch", "FastAPI", "Vector Search", "TypeScript", "Next.js"],
      images: [
        {
          src: "/projects/search-engine-preview.webp",
          alt: "Contextual Semantic Search Engine query inspector and score breakdown",
        },
      ],
      liveUrl: undefined, // Add verified URL when deployed
      githubUrl: "https://github.com/somyamoonat",
      featured: true,
      placeholder: true,
    },
    {
      slug: "task-orchestrator",
      title: "Concurrent Task Orchestrator & Dashboard",
      tagline: "Background job queue and telemetry interface for asynchronous workloads.",
      year: "2025",
      category: "Full-Stack",
      role: "Full-Stack Developer",
      problem:
        "Long-running computational tasks and API operations block web handlers without an asynchronous worker pool and execution tracking.",
      outcome:
        "Created an idempotent job dispatcher with configurable retries, worker pooling, and a live web status dashboard.",
      description:
        "A distributed job execution system with backoff policies, worker health checks, and a live administration console.",
      highlights: [
        "Idempotent queue processing with exponential retry backoff",
        "Live status streaming from backend worker pools to web dashboard",
        "Clean operational UI displaying active workers, failure rates, and job logs",
      ],
      technologies: ["TypeScript", "Next.js", "Node.js", "Redis", "PostgreSQL", "Tailwind CSS"],
      images: [
        {
          src: "/projects/orchestrator-preview.webp",
          alt: "Concurrent Task Orchestrator job management dashboard",
        },
      ],
      liveUrl: undefined,
      githubUrl: "https://github.com/somyamoonat",
      featured: true,
      placeholder: true,
    },
    {
      slug: "vision-classifier",
      title: "Visual Anomaly Detection System",
      tagline: "Convolutional model trained to detect structural surface variations.",
      year: "2025",
      category: "Machine Learning",
      role: "ML Engineer",
      problem:
        "Manual inspection across repetitive image datasets is slow and error-prone, requiring an automated classification model.",
      outcome:
        "Trained a convolutional classifier on annotated image samples with class-weighted loss to handle imbalanced categories.",
      description:
        "Computer vision classification workflow including dataset augmentation, transfer learning fine-tuning, and export for local inference.",
      highlights: [
        "Dataset pipeline with data augmentations to mitigate overfitting",
        "Exported model weights to ONNX format for cross-platform inference",
        "Evaluation dashboard displaying confusion matrices and per-class precision",
      ],
      technologies: ["PyTorch", "OpenCV", "Python", "NumPy", "ONNX"],
      images: [
        {
          src: "/projects/vision-preview.webp",
          alt: "Visual Anomaly Detection model evaluation and heatmap output",
        },
      ],
      liveUrl: undefined,
      githubUrl: "https://github.com/somyamoonat",
      featured: true,
      placeholder: true,
    },
    {
      slug: "editorial-publishing-engine",
      title: "Static Editorial Publishing Engine",
      tagline: "Markdown-driven publishing platform focused on typography and page load speed.",
      year: "2024",
      category: "Web Systems",
      role: "Frontend Developer",
      problem:
        "Heavy CMS platforms introduce complex maintenance requirements and slow initial page loads for simple technical publications.",
      outcome:
        "Built a lightweight static generation publishing pipeline with MDX support, syntax highlighting, and responsive typography.",
      description:
        "A static publishing setup with automated table of contents generation, code snippet formatting, and strict typography rules.",
      highlights: [
        "Static generation for immediate page delivery and zero server runtime costs",
        "Custom typography tokens and responsive baseline grid",
        "Support for MDX content blocks and accessible navigation",
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MDX"],
      images: [
        {
          src: "/projects/editorial-preview.webp",
          alt: "Editorial Publishing Engine reading view",
        },
      ],
      liveUrl: undefined,
      githubUrl: "https://github.com/somyamoonat",
      featured: false,
      placeholder: true,
    },
  ],

  experience: [
    {
      role: "Software & Machine Learning Projects",
      organization: "Independent Development",
      period: "2024 — Present",
      location: "Remote",
      type: "Work",
      summary:
        "Designing, building, and deploying full-stack web applications and machine learning prototypes.",
      bullets: [
        "Developed full-stack web applications using Next.js App Router, TypeScript, and relational databases.",
        "Engineered predictive and classification workflows in Python, integrating APIs into client-facing web frontends.",
        "Focused on maintainable code architecture, comprehensive type definitions, and reliable UI design.",
      ],
      placeholder: false,
    },
  ],

  education: [
    {
      institution: "Undergraduate Degree Program",
      degree: "Bachelor of Technology in Computer Science & Engineering",
      period: "2022 — 2026",
      location: "India",
      notes:
        "Coursework in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Machine Learning.",
      placeholder: true,
    },
  ],

  certifications: [
    {
      name: "Machine Learning Specialization",
      issuer: "DeepLearning.AI / Coursera",
      year: "2024",
      url: undefined,
      placeholder: true,
    },
  ],

  achievements: [
    {
      title: "Hackathon Finalist / Engineering Project Showcase",
      description:
        "Built an interactive data exploration web tool and presented system architecture to evaluation panel.",
      year: "2024",
      url: undefined,
      placeholder: true,
    },
  ],
};
