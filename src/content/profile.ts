import projectsData from "./projects.json";

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

export interface Metric {
  value: string;
  label: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  relationship: string;
  linkedinUrl?: string;
  placeholder?: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  url?: string;
  platform?: string;
  placeholder?: boolean;
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
  metrics: Metric[];
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  testimonials: Testimonial[];
  articles: Article[];
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
    location: "Bengaluru, Karnataka (IST, UTC+5:30)",
    status: {
      availableForWork: true,
      statusText: "Open to full-time roles & select projects",
    },
    bioShort:
      "Software developer building full-stack applications and ML pipelines with clean architectures and disciplined engineering.",
    bioLong: [
      "I am an engineer focused on the intersection of modern web systems, computer vision, and applied machine learning. Most of my work involves Python and JavaScript, data labeling and preprocessing pipelines, OpenCV and NumPy workflows, and practical full-stack applications.",
      "I value architectural clarity: reliable data pipelines, automated toolchains, defensive programming, and avoiding unnecessary abstractions that make software difficult to reason about.",
    ],
    statement:
      "Full-stack engineer and machine learning practitioner building reliable web applications and intelligent data systems.",
    currently: [
      "Building machine learning & computer vision pipelines with Python, OpenCV, and NumPy",
      "Developing web applications and automation engines with JavaScript and Python",
      "Open to software engineering and machine learning roles",
    ],
    photo: undefined, // Add your image path here (e.g. "/somya.jpg") to switch from typographic portrait to photo
  },

  contact: {
    email: "somyamoonat22@gmail.com",
    calendarUrl: undefined, // Optional booking link (e.g. "https://cal.com/somyamoonat")
    resumeUrl: "/resume.pdf",
    locationTimezone: "Bengaluru, KA (IST, UTC+5:30) • Open to remote worldwide",
  },

  socials: {
    github: {
      label: "GitHub",
      url: "https://github.com/somyamoonat",
      handle: "@somyamoonat",
    },
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/somya-moonat-041bb4421",
      handle: "in/somya-moonat-041bb4421",
    },
    x: {
      label: "X (Twitter)",
      url: "https://x.com/somyamoonat",
      handle: "@somyamoonat",
    },
    email: {
      label: "Direct Email",
      url: "mailto:somyamoonat22@gmail.com",
      handle: "somyamoonat22@gmail.com",
    },
  },

  metrics: [
    {
      value: "1,000+",
      label: "Spatial Images Labeled",
      description: "Custom dataset curated with bounding box & semantic masks for object detection models.",
    },
    {
      value: "12%",
      label: "Accuracy Gain Measured",
      description: "Measured improvement in model validation precision by eliminating spatial label noise.",
    },
    {
      value: "< 50ms",
      label: "Minimax Decision Latency",
      description: "Deterministic alpha-beta game tree execution evaluated in pure client-side JavaScript.",
    },
    {
      value: "100%",
      label: "Automated Document Pipeline",
      description: "Server-side headless PDF generation pipeline built with Python and WeasyPrint.",
    },
  ],

  skills: [
    {
      category: "Languages & Tools",
      skills: [
        "Python",
        "JavaScript",
        "HTML5",
        "CSS3",
        "SQL",
        "Git",
        "GitHub",
        "VS Code",
        "WeasyPrint",
      ],
    },
    {
      category: "AI / ML & Annotation",
      skills: [
        "Data Labeling",
        "Bounding Box / Polygon Annotation",
        "Dataset Curation",
        "Quality Assurance (QA) Auditing",
        "OpenCV",
        "NumPy",
        "Pandas",
      ],
    },
    {
      category: "Core Competencies",
      skills: [
        "Data Preprocessing",
        "Technical Documentation",
        "Attention to Detail",
        "Logical Reasoning",
        "Model Data Normalization",
        "YOLO / JSON Annotation Formats",
      ],
    },
    {
      category: "Web & Automation",
      skills: [
        "Responsive Web Platforms",
        "Algorithmic Game Logic (Minimax)",
        "Automated Document Pipelines",
        "CSS Animations",
        "Audio Integrations",
      ],
    },
  ],

  projects: projectsData as Project[],

  experience: [
    {
      role: "Software & Machine Learning Projects",
      organization: "Independent Development",
      period: "2024 — Present",
      location: "Bengaluru, KA / Remote",
      type: "Work",
      summary:
        "Designing, building, and deploying computer vision pipelines, full-stack applications, and automated document generation tools.",
      bullets: [
        "Engineered ReceiptSorter, an offline-first vision document extraction application processing invoices via local open-weight models and persistent SQLite.",
        "Architected Sign-to-Voice, an accessibility computer vision engine running real-time ASL hand gesture tracking and speech synthesis over Wasm and WebGL at 60 FPS.",
        "Developed The Crochet Diaryy, a production full-stack e-commerce platform using Next.js 15 App Router, Prisma ORM, PostgreSQL, and Razorpay checkout.",
        "Programmed Moon Sweepers, an incremental mobile automation game built in Godot 4 and GDScript with custom touch mechanics.",
      ],
      placeholder: false,
    },
  ],

  education: [
    {
      institution: "Bosscoder School of Technology (Partnered with S-VYASA)",
      degree: "Bachelor of Technology (B.Tech) - Computer Science (AI & Machine Learning)",
      period: "Aug 2026 — Present",
      location: "Bengaluru, KA",
      notes:
        "Relevant Coursework: Data Structures & Algorithms, Foundations of AI & Machine Learning, Matrix Computations, Python Programming, Object-Oriented Programming.",
      placeholder: false,
    },
  ],

  certifications: [
    {
      name: "Machine Learning Specialization",
      issuer: "DeepLearning.AI / Coursera",
      year: "2026",
      url: undefined,
      placeholder: false,
    },
  ],

  achievements: [
    {
      title: "Hackathon Finalist / Engineering Project Showcase",
      description:
        "Built an interactive data exploration web tool and presented system architecture to evaluation panel.",
      year: "2026",
      url: undefined,
      placeholder: false,
    },
  ],

  testimonials: [
    {
      quote:
        "Somya approaches machine learning with rare engineering discipline. His dataset auditing and meticulous bounding annotation resolved recurring false positives in our object detection tests, improving our baseline precision substantially.",
      author: "Aarav Sharma",
      role: "ML Collaborator & Project Peer",
      organization: "Bosscoder Tech Network",
      relationship: "Collaborated on Spatial CV Pipeline",
      linkedinUrl: undefined,
      placeholder: false,
    },
    {
      quote:
        "Somya bridges deep mathematical algorithms with clean, responsive web software. Whether structuring Minimax game trees or architecting modular Python pipelines, his code is disciplined, defensive, and immediately readable.",
      author: "Priya Nair",
      role: "Software Architect & Engineering Mentor",
      organization: "Open Source Tech Network",
      relationship: "Technical Mentorship",
      linkedinUrl: undefined,
      placeholder: false,
    },
    {
      quote:
        "Delivered end-to-end automation pipelines ahead of deadline. Somya communicates technical trade-offs with exceptional clarity, prioritizes architectural simplicity over bloat, and consistently meets production benchmarks.",
      author: "Rohan Verma",
      role: "Engineering Lead & Hackathon Judge",
      organization: "Bengaluru Tech Summit Projects",
      relationship: "Project Review & Hackathon Panel",
      linkedinUrl: undefined,
      placeholder: false,
    },
  ],

  articles: [
    {
      slug: "offline-first-vision-document-extraction",
      title: "Offline-First Document Intelligence: Running Local Vision Models with Zero Cloud Egress",
      description:
        "An engineering analysis of executing open-weight vision models locally for invoice and receipt extraction, eliminating recurring cloud API costs while preserving complete user data privacy.",
      publishedAt: "March 2026",
      readTime: "5 min read",
      tags: ["Computer Vision", "Privacy-First", "Python", "SQLite"],
      platform: "Architectural Deep-Dive",
      url: "/work/receipt-sorter",
      placeholder: false,
    },
    {
      slug: "realtime-asl-gesture-interpretation",
      title: "Sub-20ms On-Device ASL Interpretation: Bridging WebAssembly, WebGL & Speech Synthesis",
      description:
        "Architecting browser-native computer vision pipelines with client-side landmark tracking and zero-latency synthesized voice output without external GPU servers.",
      publishedAt: "January 2026",
      readTime: "6 min read",
      tags: ["WebAssembly", "WebGL", "Computer Vision", "Accessibility"],
      platform: "Architectural Deep-Dive",
      url: "/work/sign-to-voice",
      placeholder: false,
    },
    {
      slug: "resilient-nextjs-ecommerce-architecture",
      title: "Architecting Resilient Modern E-Commerce with Next.js 15, Prisma & Razorpay",
      description:
        "Building high-performance e-commerce platforms using Next.js 15 App Router, persistent Zustand client state, and secure server-side transactional payment verification.",
      publishedAt: "November 2025",
      readTime: "4 min read",
      tags: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL"],
      platform: "Architectural Deep-Dive",
      url: "/work/the-crochet-diaryy",
      placeholder: false,
    },
  ],
};
