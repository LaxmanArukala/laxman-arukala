/**
 * Single source of truth for portfolio content.
 * Moved verbatim from the previous AnimatedResume component — edit copy here.
 */
import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Database,
  Layout,
  Server,
  GitBranch,
  Settings,
  Monitor,
  Package,
  FileText,
  Wrench,
  Shield,
  Terminal,
  Cloud,
  DollarSign,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import professionalPortrait from "../assets/images/professional.jpeg";
import casualPortrait from "../assets/images/my-image.jpeg";
import arGalleryImg from "../assets/images/project1.webp";
import enviteCardsImg from "../assets/images/envitecards.svg";
import aiImg from "../assets/images/ai-image.jpeg";
import resumePdf from "../assets/pdf/Resume.pdf";

export const images = {
  professionalPortrait,
  casualPortrait,
};

export const resumeUrl = resumePdf;

export const profile = {
  firstName: "Laxman",
  lastName: "Arukala",
  role: "Full Stack Developer",
  tagline: ["Build.", "Innovate.", "Scale."],
  greeting: "Hey, I'm Laxman.",
  roles: [
    "Full Stack Developer",
    "React Developer",
    "Node.js Expert",
    "UI/UX Enthusiast",
  ],
  location: "Hyderabad, India",
  experience: "7+ years",
  focus: "Fast, accessible, scalable UIs",
  aboutHeadline: "7+ years turning designs into fast, accessible interfaces.",
  about:
    "I build production React and Node.js applications that hold up under real users — from enterprise healthcare platforms to AI-powered prototyping tools. Seven years across four companies taught me that clean architecture and fast, accessible interfaces aren't nice-to-haves — they're the job.",
  footerBlurb:
    "Full stack developer building fast, accessible web products — from UI/UX and frontend to backend, DevOps, and hosting.",
};

export const contact = {
  email: "laxmanarukala@yahoo.com",
  phone: "+91 888688 8762",
  phoneHref: "tel:+918886888762",
  location: "Hyderabad, India",
  // Add profile URLs here to show them in the contact scene and footer.
  linkedin: "",
  github: "",
};

export const contactItems: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}[] = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: "Phone", value: contact.phone, href: contact.phoneHref },
  { icon: MapPin, label: "Location", value: contact.location },
];

export interface Skill {
  name: string;
  /** Self-rated proficiency from the original portfolio, where one exists. */
  level?: number;
}

export interface SkillGroup {
  id: string;
  name: string;
  summary: string;
  icon: LucideIcon;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    name: "Frontend",
    summary: "Component-driven interfaces that are fast, accessible and built to last.",
    icon: Layout,
    skills: [
      { name: "React JS", level: 90 },
      { name: "Next.js" },
      { name: "JavaScript", level: 82 },
      { name: "TypeScript", level: 50 },
      { name: "Redux/ Redux Toolkit", level: 80 },
      { name: "Tanstack Query", level: 80 },
      { name: "Material UI", level: 80 },
      { name: "Material React Table", level: 80 },
      { name: "TailWind CSS", level: 70 },
      { name: "Bootstrap", level: 70 },
      { name: "jQuery", level: 60 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 80 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    summary: "Secure REST APIs and services built to scale with the product.",
    icon: Server,
    skills: [
      { name: "Node.js", level: 70 },
      { name: "Express.js", level: 70 },
      { name: "REST APIs" },
      { name: "Microservices Architecture" },
    ],
  },
  {
    id: "database",
    name: "Database",
    summary: "Relational and document data models behind every feature.",
    icon: Database,
    skills: [{ name: "PostgreSQL" }, { name: "MongoDB" }, { name: "Dynamo DB" }],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    summary: "Containerised, automated delivery from commit to production.",
    icon: Cloud,
    skills: [
      { name: "Microsoft Azure" },
      { name: "AWS" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "CI/CD" },
    ],
  },
  {
    id: "growth",
    name: "Marketing & Growth",
    summary: "Making sure what ships is found, measured and grows.",
    icon: Code2,
    skills: [
      { name: "SEO", level: 60 },
      { name: "Digital Marketing", level: 55 },
    ],
  },
];

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Web Development",
    description:
      "End-to-end web application builds — from requirements and architecture through responsive, production-ready interfaces using React, TypeScript, and modern tooling.",
    icon: Code2,
  },
  {
    title: "UI/UX Design",
    description:
      "User research, wireframes, and interactive prototypes that get validated before development starts, so what ships is intuitive and on-brand.",
    icon: Layout,
  },
  {
    title: "Backend Development",
    description:
      "Secure, well-documented REST APIs, database design, and server-side architecture built to scale with your product, not against it.",
    icon: Server,
  },
  {
    title: "DevOps",
    description:
      "CI/CD pipelines, containerization, and automated deployment workflows that ship changes faster with fewer production surprises.",
    icon: GitBranch,
  },
  {
    title: "Hosting & Infrastructure",
    description:
      "Cloud hosting setup and management on AWS/Azure — monitoring, backups, and security baked in so your site stays fast and available.",
    icon: Cloud,
  },
  {
    title: "Cost Optimization",
    description:
      "Architecture and cloud-spend audits that cut infrastructure and technical debt costs without giving up performance or reliability.",
    icon: DollarSign,
  },
];

export interface Tool {
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
}

export const tools: Tool[] = [
  { name: "Visual Studio Code", description: "Primary code editor for development", icon: Code2, category: "Editor" },
  { name: "Git & GitHub", description: "Version control and collaboration", icon: GitBranch, category: "Version Control" },
  { name: "Postman", description: "API testing and development", icon: Settings, category: "API Testing" },
  { name: "Figma", description: "UI/UX design and prototyping", icon: Layout, category: "Design" },
  { name: "Chrome DevTools, React Developer Tool", description: "Debugging and performance analysis", icon: Monitor, category: "Debugging" },
  { name: "NPM/Yarn", description: "Package management", icon: Package, category: "Package Manager" },
  { name: "Terminal/Command Line", description: "System administration and scripting", icon: Terminal, category: "CLI" },
  {
    name: "Azure Boards / Jira",
    description: "Agile project management, sprint planning, backlog tracking, and issue management",
    icon: FileText,
    category: "Project Management",
  },
  {
    name: "Confluence",
    description: "Team collaboration and documentation platform for technical and project documentation",
    icon: FileText,
    category: "Documentation",
  },
  { name: "Webpack/Vite", description: "Build tools and bundlers", icon: Wrench, category: "Build Tools" },
  { name: "ESLint/Prettier", description: "Code formatting and linting", icon: Settings, category: "Code Formatting" },
  { name: "Sonar Qube", description: "Bugs, Vulnerabilities, Code Smells, Coverages, Duplication", icon: Settings, category: "Code Quality" },
  { name: "Veracode", description: "Application security testing and vulnerability scanning", icon: Shield, category: "Security" },
  { name: "Azure Blob Storage & AWS S3", description: "Cloud storage and file management", icon: Database, category: "Cloud Storage" },
];

export interface Experience {
  title: string;
  company: string;
  shortName: string;
  duration: string;
  responsibilities: string[];
}

export const experiences: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "Wipro Technologies PVT LTD.",
    shortName: "Wipro",
    duration: "December 2025 - Present",
    responsibilities: [
      "Developed interactive and reusable UI components using React.js, leveraging custom hooks and modern React best practices.",
      "Built dynamic forms using Reactive Forms with custom validation logic.",
      "Accelerated development productivity by leveraging GitHub Copilot for faster code generation, debugging, and implementation.",
      "Contributed to the development of a React Native mobile application, ensuring seamless functionality across mobile platforms.",
      "Actively participated in Agile Scrum ceremonies including daily stand-ups, sprint planning, backlog grooming, and retrospectives.",
      "Provided technical suggestions and improvements to the team to enhance productivity, maintainability, and development efficiency.",
      "Collaborated with the team in estimating development timelines and effort for upcoming features and tasks.",
      "Contributed to architecture discussions and proposed scalable frontend solutions aligned with project requirements.",
      "Maintained code quality by integrating SonarQube Cloud and Veracode for static code analysis and security scanning.",
      "Developed unit tests using Jest and improved code reliability by increasing overall test coverage.",
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "SLK Software PVT LTD.",
    shortName: "SLK Software",
    duration: "Nov 2024 - December 2025",
    responsibilities: [
      "Developed interactive and reusable UI components using React JS, leveraging custom hooks and modern React practices.",
      "Built dynamic forms using Formik with custom validation logic, and developed PDF localization features for highlighting extracted text accurately.",
      "Designed and developed configurable widgets to be embedded across various modules within the Enovia application.",
      "Built and managed Node.js REST APIs, using HTTP methods with proper status handling and authentication.",
      "Captured and stored API failure logs in Azure Blob Storage for efficient monitoring and debugging.",
      "Actively contributed to Agile development by tracking progress in Azure DevOps dashboards, working on sprint-based work items, and participating in planning sessions.",
    ],
  },
  {
    title: "Web UI/UX Developer",
    company: "Immersion Software Labs PVT LTD.",
    shortName: "Immersion Labs",
    duration: "June 2019 - Nov 24",
    responsibilities: [
      "Developed dynamic and responsive front-end applications using Angular and React JS, adhering to modular and scalable architecture principles.",
      "Created reusable components and custom UI widgets to ensure consistent user experience across multiple projects.",
      "Integrated Stripe payment gateway for secure and seamless online payment processing, including handling tokens and webhooks.",
      "Integrated Node.js-based backend services with frontend applications using RESTful APIs, enhancing full-stack development exposure.",
      "Collaborated with UX designers to convert Figma/Adobe XD designs into pixel-perfect and responsive web interfaces.",
      "Optimized frontend performance by applying lazy loading, code splitting, and state management best practices using RxJS and Redux.",
      "Participated in Agile ceremonies, worked closely with cross-functional teams, and contributed to planning, code reviews, and release cycles.",
      "Ensured accessibility, mobile responsiveness, and cross-browser compatibility across all supported platforms using best UI practices.",
    ],
  },
  {
    title: "UI Developer",
    company: "Nevexa Digital PVT LTD",
    shortName: "Nevexa Digital",
    duration: "Dec 2018 - June 2019",
    responsibilities: [
      "Joined as a UI Developer Intern and contributed significantly to real-time projects, which led to an early transition into a paid role within the first month.",
      "Designed and implemented responsive UI layouts using HTML5, CSS3, and JavaScript based on client requirements.",
      "Collaborated with product teams to translate ideas into interactive, cross-browser compatible web interfaces.",
      "Created and maintained visual assets, ensuring consistent branding and user experience across web platforms.",
      "Supported quality assurance efforts by testing UI functionality and resolving layout and responsiveness issues across various devices.",
    ],
  },
];

export interface Education {
  degree: string;
  institution: string;
  year: string;
  grade?: string;
}

export const education: Education[] = [
  {
    degree: "Masters of Computer Science",
    institution: "Priyadarshini College of Computer Science and Research",
    year: "2015 - 2018",
    grade: "75%",
  },
  {
    degree: "Bachlor Science",
    institution: "Sree Chaitanya Degree College",
    year: "2011 - 2014",
    grade: "60%",
  },
];

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  /** Screenshot or artwork from src/assets, when one exists. */
  image?: string;
  /** "cover" for screenshots, "contain" for logos. */
  imageFit?: "cover" | "contain";
  /** Short field label shown on the card (taken from the description). */
  domain: string;
  /** Accent colour for the card. */
  accent: string;
  /**
   * Preview when there is no screenshot: an interface sketch in a browser
   * ("dashboard", "table") or phone ("app") frame. With an image, "browser" frames it.
   */
  preview: "dashboard" | "app" | "table" | "browser";
}

export const projects: Project[] = [
  {
    title: "Healthcare Management Platform",
    description:
      "A healthcare-focused web platform built to simplify clinical workflows and centralize data management. Delivered responsive, accessible UI components, integrated secure REST APIs, and architected a scalable frontend foundation for long-term maintainability.",
    technologies: [
      "React",
      "Redux/Redux Toolkit",
      "TypeScript",
      "JavaScript",
      "Tanstack Query",
      "Material UI",
      "REST APIs",
      "Webpack",
      "HTML/HTML5",
      "CSS/CSS3",
      "Reactive Forms",
      "Accessibility",
      "Jest",
    ],
    githubUrl: "",
    domain: "Healthcare",
    accent: "#4f8cff",
    preview: "dashboard",
  },
  {
    title: "Cross-Platform Mobile Application",
    description:
      "A React Native mobile app engineered for a consistent, high-performance experience across iOS and Android. Built reusable components, optimized rendering performance, and integrated secure authentication with REST APIs.",
    technologies: [
      "React Native",
      "TypeScript",
      "JavaScript",
      "Zustand",
      "REST APIs",
      "Expo Go",
      "Okta Auth0",
      "Material UI",
      "CSS3",
      "Jest",
    ],
    githubUrl: "",
    domain: "Mobile · iOS & Android",
    accent: "#8b7bff",
    preview: "app",
  },
  {
    title: "AI Feature Prototyping (POC)",
    description:
      "Proof-of-concept AI features for an enterprise web application, focused on intelligent data extraction and workflow automation. Partnered with the team to validate feasibility, performance, and integration strategy for AI-powered functionality end to end.",
    technologies: [
      "React",
      "Redux/Redux Toolkit",
      "TypeScript",
      "JavaScript",
      "Tanstack Query",
      "AI APIs",
      "REST APIs",
      "Material UI",
      "Node JS",
      "Express JS",
      "PostgreSQL",
      "HTML/HTML5",
      "CSS/CSS3",
      "Jest",
    ],
    githubUrl: "",
    image: aiImg,
    imageFit: "cover",
    domain: "AI · Enterprise",
    accent: "#22d3ee",
    preview: "browser",
  },
  {
    title: "QC Tool",
    description:
      "A smart quality-check platform that automates and streamlines inspection workflows with real-time validation for accuracy and consistency. Customizable rules and reporting help teams catch errors early — ideal for manufacturing, content review, data validation, and compliance checks.",
    technologies: [
      "React JS",
      "Redux/ Redux ToolKit",
      "TypeScript",
      "JavaScript",
      "Tanstack Query",
      "Tailwind CSS",
      "Material UI",
      "Formik",
      "Auth0",
      "Apache Charts",
      "Node JS",
      "Express JS",
      "PostgreSQL",
      "HTML/HTML5",
      "CSS/CSS3",
    ],
    githubUrl: "",
    domain: "Quality & Compliance",
    accent: "#34d399",
    preview: "table",
  },
  {
    title: "AR Gallery",
    description:
      "An augmented reality platform that brings products and content to life through interactive 3D, 360°, and real-time previews. Built to boost engagement across print, packaging, e-commerce, and education — ideal for marketing, advertising, expos, and virtual experiences.",
    technologies: [
      "Angular 12",
      "Bootstrap",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "S3 Bucket",
      "Node JS",
      "Express JS",
      "Dynamo DB",
      "HTML/HTML5",
      "CSS/CSS3",
    ],
    githubUrl: "",
    image: arGalleryImg,
    imageFit: "cover",
    domain: "Augmented Reality",
    accent: "#f59e0b",
    preview: "browser",
  },
  {
    title: "Envite Cards",
    description:
      "A first-of-its-kind RSVP platform that makes it effortless for event planners to create digital invitations and collect responses online, replacing manual RSVP tracking with a seamless, centralized workflow.",
    technologies: [
      "Angular 13",
      "Bootstrap",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "S3 Bucket",
      "Node JS",
      "Express JS",
      "Dynamo DB",
      "HTML/HTML5",
      "CSS/CSS3",
    ],
    githubUrl: "",
    image: enviteCardsImg,
    imageFit: "contain",
    domain: "Events & RSVP",
    accent: "#f472b6",
    preview: "browser",
  },
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { label: "Years Experience", value: "7+" },
  { label: "Projects Delivered", value: `${projects.length}+` },
  {
    label: "Technologies",
    value: `${skillGroups.reduce((n, g) => n + g.skills.length, 0)}+`,
  },
  {
    label: "Companies",
    value: `${new Set(experiences.map((e) => e.company)).size}`,
  },
];
