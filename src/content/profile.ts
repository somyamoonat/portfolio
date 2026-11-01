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

  projects: [
    {
      slug: "object-detection-annotation-pipeline",
      title: "Physical Object Detection & Annotation Pipeline",
      tagline: "Custom spatial dataset curation and semantic annotation pipeline for object recognition models.",
      year: "2026",
      category: "Machine Learning",
      role: "Lead Developer",
      problem:
        "High labeling noise and inconsistent bounding annotations in raw image datasets degrade object detection accuracy and introduce training instabilities.",
      outcome:
        "Curated and labeled over 1,000 spatial images using bounding boxes and semantic segmentation, eliminating noise and improving base model training accuracy by 12%.",
      description:
        "An end-to-end dataset curation and auditing pipeline that processes spatial imagery, enforces bounding box precision, and eliminates labeling artifacts before model ingestion.",
      highlights: [
        "Curated and annotated a custom dataset of 1,000+ spatial images using bounding boxes and semantic segmentation",
        "Performed data quality auditing and data cleaning to eliminate labeling noise",
        "Improved base model training accuracy by 12% through systematic annotation verification",
      ],
      technologies: ["Python", "Computer Vision", "Dataset Curation", "Bounding Box", "Data Cleaning"],
      images: [
        {
          src: "/projects/search-engine-preview.webp",
          alt: "Physical Object Detection and Annotation Pipeline",
        },
      ],
      liveUrl: undefined,
      githubUrl: "https://github.com/somyamoonat",
      featured: true,
      placeholder: false,
    },
    {
      slug: "automated-defect-identification",
      title: "Automated Defect Identification in Image Datasets",
      tagline: "Batch image preprocessing, normalization, and automated YOLO/JSON annotation tooling.",
      year: "2026",
      category: "Machine Learning",
      role: "ML Developer",
      problem:
        "Manual inspection and formatting across high-resolution image batches is slow, error-prone, and inconsistent across different model training formats.",
      outcome:
        "Built automated Python preprocessing utilities to normalize image batches and export structured JSON/YOLO labels ready for training pipelines.",
      description:
        "A Python-based image preprocessing workflow utilizing OpenCV and NumPy to filter, resize, and normalize high-resolution image batches with automated label formatting.",
      highlights: [
        "Developed Python-based preprocessing tool using OpenCV and NumPy to filter, resize, and normalize image batches",
        "Configured automated scripts to label target classes and export structured JSON/YOLO annotation formats",
        "Streamlined training pipeline ingestion with standardized bounding coordinate outputs",
      ],
      technologies: ["Python", "OpenCV", "NumPy", "YOLO", "JSON"],
      images: [
        {
          src: "/projects/vision-preview.webp",
          alt: "Automated Defect Identification tool visualization",
        },
      ],
      liveUrl: undefined,
      githubUrl: "https://github.com/somyamoonat",
      featured: true,
      placeholder: false,
    },
    {
      slug: "restaurant-web-platform-automation",
      title: "Commercial Restaurant Web Platform & Automated Menu System",
      tagline: "Responsive commercial web platform with automated WeasyPrint PDF layout generation.",
      year: "2026",
      category: "Full-Stack",
      role: "Full-Stack Developer",
      problem:
        "Maintaining synchronized digital menus and print-ready physical restaurant collateral leads to duplicate effort and formatting drift.",
      outcome:
        "Built a responsive customer web platform integrated with an automated WeasyPrint pipeline that compiles HTML/CSS templates into high-fidelity print PDFs.",
      description:
        "A full-stack restaurant platform enhancing digital presence and customer interaction, coupled with a Python-powered automation engine for programmatic PDF generation.",
      highlights: [
        "Designed and built responsive web platform for a local restaurant to enhance digital customer engagement",
        "Engineered an automated Python pipeline using WeasyPrint to programmatically convert HTML/CSS into print-ready PDF menus",
        "Ensured typographic fidelity and dynamic menu item synchronization",
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "Python", "WeasyPrint", "Automation"],
      images: [
        {
          src: "/projects/orchestrator-preview.webp",
          alt: "Commercial Restaurant Web Platform interface and menu generator",
        },
      ],
      liveUrl: undefined,
      githubUrl: "https://github.com/somyamoonat",
      featured: true,
      placeholder: false,
    },
    {
      slug: "cyberpunk-ai-minimax-engine",
      title: "Interactive Cyberpunk AI Minimax Engine",
      tagline: "Interactive game engine powered by Minimax decision algorithm with custom audio & glitch animations.",
      year: "2026",
      category: "Web Systems",
      role: "Frontend & Algorithm Developer",
      problem:
        "Standard web game implementations often rely on naive decision logic or heavy libraries, lacking both depth in bot decision trees and engaging styling.",
      outcome:
        "Developed a responsive browser game application with pure JavaScript Minimax decision-making logic and custom CSS cyberpunk glitch animations.",
      description:
        "An interactive web application featuring an optimal Minimax decision tree engine, pure JavaScript audio integrations, and custom CSS cyberpunk glitch aesthetics.",
      highlights: [
        "Built an interactive web application featuring a Minimax decision algorithm to execute optimal bot decision-making logic",
        "Implemented custom CSS glitch animations and audio integrations with pure JavaScript to optimize user experience",
        "Optimized game state evaluation for instantaneous zero-latency player moves",
      ],
      technologies: ["JavaScript", "Game Logic", "Minimax", "CSS3 Animations", "Audio API"],
      images: [
        {
          src: "/projects/editorial-preview.webp",
          alt: "Interactive Cyberpunk AI Minimax Engine interface",
        },
      ],
      liveUrl: undefined,
      githubUrl: "https://github.com/somyamoonat",
      featured: true,
      placeholder: false,
    },
  ],

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
        "Curated and labeled custom datasets of 1,000+ spatial images using bounding boxes and semantic segmentation, improving accuracy by 12%.",
        "Built image preprocessing and automated YOLO/JSON annotation tooling using OpenCV and NumPy.",
        "Engineered automated Python pipelines with WeasyPrint and built interactive web applications with pure JavaScript and Minimax logic.",
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
      linkedinUrl: "https://linkedin.com",
      placeholder: true,
    },
    {
      quote:
        "Somya bridges deep mathematical algorithms with clean, responsive web software. Whether structuring Minimax game trees or architecting modular Python pipelines, his code is disciplined, defensive, and immediately readable.",
      author: "Priya Nair",
      role: "Software Architect & Engineering Mentor",
      organization: "Open Source Tech Network",
      relationship: "Technical Mentorship",
      linkedinUrl: "https://linkedin.com",
      placeholder: true,
    },
    {
      quote:
        "Delivered end-to-end automation pipelines ahead of deadline. Somya communicates technical trade-offs with exceptional clarity, prioritizes architectural simplicity over bloat, and consistently meets production benchmarks.",
      author: "Rohan Verma",
      role: "Engineering Lead & Hackathon Judge",
      organization: "Bengaluru Tech Summit Projects",
      relationship: "Project Review & Hackathon Panel",
      linkedinUrl: "https://linkedin.com",
      placeholder: true,
    },
  ],

  articles: [
    {
      slug: "dataset-auditing-in-computer-vision",
      title: "Why Dataset Auditing Trumps Hyperparameter Tuning in Computer Vision",
      description:
        "An engineering analysis of how annotation variance and spatial boundary noise degrade neural networks, and how systematic curation yields double-digit precision improvements.",
      publishedAt: "March 2026",
      readTime: "5 min read",
      tags: ["Computer Vision", "Data Engineering", "Python"],
      platform: "Technical Notes",
      url: "https://github.com/somyamoonat",
      placeholder: true,
    },
    {
      slug: "deterministic-minimax-in-pure-js",
      title: "Deterministic Game Logic: Implementing Minimax with Alpha-Beta Pruning in Pure JS",
      description:
        "Architecting zero-dependency game decision engines with algorithmic search depth limits, heuristic evaluation scoring, and sub-50ms turn latency.",
      publishedAt: "January 2026",
      readTime: "6 min read",
      tags: ["Algorithms", "JavaScript", "Game Theory"],
      platform: "Technical Notes",
      url: "https://github.com/somyamoonat",
      placeholder: true,
    },
    {
      slug: "headless-document-pipelines-weasyprint",
      title: "Architecting Headless PDF Automation Pipelines with Python & WeasyPrint",
      description:
        "Building reliable server-side document rendering engines from dynamic data schemas, eliminating desktop renderer dependencies while ensuring pixel-perfect output.",
      publishedAt: "November 2025",
      readTime: "4 min read",
      tags: ["Python", "Automation", "Architecture"],
      platform: "Technical Notes",
      url: "https://github.com/somyamoonat",
      placeholder: true,
    },
  ],
};
