import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Code2,
  Database,
  Layout,
  Server,
  Calendar,
  GraduationCap,
  Github,
  Send,
  User,
  Award,
  Zap,
  Terminal,
  GitBranch,
  Settings,
  Monitor,
  Package,
  FileText,
  Wrench,
  Shield,
  Search,
  TrendingUp,
  Cloud,
  DollarSign,
} from "lucide-react";
import ContactFrom from "./ContactFrom";
import TiltCard from "./TiltCard";
import GradientBlobs from "./GradientBlobs";
import MarqueeRow from "./MarqueeRow";
import NavBar from "./NavBar";
import Footer from "./Footer";
import CodeProfileCard from "./CodeProfileCard";
import SkillBars from "./SkillBars";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "./motionVariants";

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Tool {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}
interface Experience {
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  grade?: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
}

const AnimatedResume: React.FC = () => {
  const [typingText, setTypingText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineScale = useTransform(timelineProgress, [0, 1], [0, 1]);

  const roles = [
    "Full Stack Developer",
    "React Developer",
    "Node.js Expert",
    "UI/UX Enthusiast",
  ];

  useEffect(() => {
    // Typing animation for roles
    const typeRole = (roleIndex: number) => {
      const role = roles[roleIndex];
      let charIndex = 0;

      const typeInterval = setInterval(() => {
        if (charIndex <= role.length) {
          setTypingText(role.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            // Clear text and move to next role
            const clearTypingInterval = setInterval(() => {
              if (charIndex > 0) {
                setTypingText(role.slice(0, charIndex));
                charIndex--;
              } else {
                clearInterval(clearTypingInterval);
                setCurrentRole((prev) => (prev + 1) % roles.length);
              }
            }, 50);
          }, 2000);
        }
      }, 100);
    };

    typeRole(currentRole);
  }, [currentRole]);

  const skills: Skill[] = [
    {
      name: "Node.js",
      level: 70,
      icon: <Server className="text-green-500" size={24} />,
    },
    {
      name: "Express.js",
      level: 70,
      icon: <Server className="text-green-500" size={24} />,
    },
    {
      name: "React JS",
      level: 90,
      icon: <Code2 className="text-blue-500" size={24} />,
    },
    {
      name: "Redux/ Redux Toolkit",
      level: 80,
      icon: <Code2 className="text-green-500" size={24} />,
    },
    {
      name: "Tanstack Query",
      level: 80,
      icon: <Code2 className="text-green-500" size={24} />,
    },
    {
      name: "TypeScript",
      level: 50,
      icon: <Code2 className="text-green-500" size={24} />,
    },
    {
      name: "JavaScript",
      level: 82,
      icon: <Code2 className="text-yellow-500" size={24} />,
    },
    {
      name: "jQuery",
      level: 60,
      icon: <Code2 className="text-blue-700" size={24} />,
    },
    {
      name: "Material UI",
      level: 80,
      icon: <Layout className="text-blue-400" size={24} />,
    },
    {
      name: "Material React Table",
      level: 80,
      icon: <Layout className="text-blue-400" size={24} />,
    },
    {
      name: "TailWind CSS",
      level: 70,
      icon: <Layout className="text-red-500" size={24} />,
    },
    {
      name: "Bootstrap",
      level: 70,
      icon: <Layout className="text-purple-500" size={24} />,
    },
    {
      name: "CSS3",
      level: 80,
      icon: <Code2 className="text-blue-600" size={24} />,
    },
    {
      name: "HTML5",
      level: 95,
      icon: <Code2 className="text-orange-500" size={24} />,
    },
    {
      name: "SEO",
      level: 60,
      icon: <Search className="text-teal-400" size={24} />,
    },
    {
      name: "Digital Marketing",
      level: 55,
      icon: <TrendingUp className="text-pink-400" size={24} />,
    },
  ];

  const orbitSkillNames = [
    "React JS",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Redux Toolkit",
    "Tailwind CSS",
    "Material UI",
    "HTML5",
  ];

  const skillCategories = [
    {
      name: "Frontend",
      skillNames: ["React JS", "JavaScript", "TypeScript", "HTML5", "CSS3"],
    },
    { name: "Backend", skillNames: ["Node.js", "Express.js"] },
    {
      name: "State & Data",
      skillNames: ["Redux/ Redux Toolkit", "Tanstack Query"],
    },
    {
      name: "UI & Styling",
      skillNames: [
        "Material UI",
        "Material React Table",
        "TailWind CSS",
        "Bootstrap",
        "jQuery",
      ],
    },
    {
      name: "Marketing & Growth",
      skillNames: ["SEO", "Digital Marketing"],
    },
  ];

  const services: Service[] = [
    {
      title: "Web Development",
      description:
        "End-to-end web application builds — from requirements and architecture through responsive, production-ready interfaces using React, TypeScript, and modern tooling.",
      icon: <Code2 className="text-blue-400" size={26} />,
    },
    {
      title: "UI/UX Design",
      description:
        "User research, wireframes, and interactive prototypes that get validated before development starts, so what ships is intuitive and on-brand.",
      icon: <Layout className="text-purple-400" size={26} />,
    },
    {
      title: "Backend Development",
      description:
        "Secure, well-documented REST APIs, database design, and server-side architecture built to scale with your product, not against it.",
      icon: <Server className="text-green-400" size={26} />,
    },
    {
      title: "DevOps",
      description:
        "CI/CD pipelines, containerization, and automated deployment workflows that ship changes faster with fewer production surprises.",
      icon: <GitBranch className="text-orange-400" size={26} />,
    },
    {
      title: "Hosting & Infrastructure",
      description:
        "Cloud hosting setup and management on AWS/Azure — monitoring, backups, and security baked in so your site stays fast and available.",
      icon: <Cloud className="text-sky-400" size={26} />,
    },
    {
      title: "Cost Optimization",
      description:
        "Architecture and cloud-spend audits that cut infrastructure and technical debt costs without giving up performance or reliability.",
      icon: <DollarSign className="text-yellow-400" size={26} />,
    },
  ];

  const tools: Tool[] = [
    {
      name: "Visual Studio Code",
      description: "Primary code editor for development",
      icon: <Code2 className="text-blue-600" size={20} />,
      category: "Editor",
    },
    {
      name: "Git & GitHub",
      description: "Version control and collaboration",
      icon: <GitBranch className="text-orange-600" size={20} />,
      category: "Version Control",
    },
    {
      name: "Postman",
      description: "API testing and development",
      icon: <Settings className="text-orange-500" size={20} />,
      category: "API Testing",
    },
    {
      name: "Figma",
      description: "UI/UX design and prototyping",
      icon: <Layout className="text-purple-500" size={20} />,
      category: "Design",
    },
    {
      name: "Chrome DevTools, React Developer Tool",
      description: "Debugging and performance analysis",
      icon: <Monitor className="text-green-500" size={20} />,
      category: "Debugging",
    },
    {
      name: "NPM/Yarn",
      description: "Package management",
      icon: <Package className="text-red-500" size={20} />,
      category: "Package Manager",
    },
    {
      name: "Terminal/Command Line",
      description: "System administration and scripting",
      icon: <Terminal className="text-gray-700" size={20} />,
      category: "CLI",
    },
    {
      name: "Azure Boards / Jira",
      description:
        "Agile project management, sprint planning, backlog tracking, and issue management",
      icon: <FileText className="text-blue-600" size={20} />,
      category: "Project Management",
    },
    {
      name: "Confluence",
      description:
        "Team collaboration and documentation platform for technical and project documentation",
      icon: <FileText className="text-blue-400" size={20} />,
      category: "Documentation",
    },
    {
      name: "Webpack/Vite",
      description: "Build tools and bundlers",
      icon: <Wrench className="text-yellow-600" size={20} />,
      category: "Build Tools",
    },
    {
      name: "ESLint/Prettier",
      description: "Code formatting and linting",
      icon: <Settings className="text-purple-600" size={20} />,
      category: "Code Formatting",
    },
    {
      name: "Sonar Qube",
      description: "Bugs, Vulnerabilities, Code Smells, Coverages, Duplication",
      icon: <Settings className="text-purple-600" size={20} />,
      category: "Code Quality",
    },
    {
      name: "Veracode",
      description: "Application security testing and vulnerability scanning",
      icon: <Shield className="text-green-600" size={20} />,
      category: "Security",
    },
    {
      name: "Azure Blob Storage & AWS S3",
      description: "Cloud storage and file management",
      icon: <Database className="text-blue-600" size={20} />,
      category: "Cloud Storage",
    },
  ];

  const experiences: Experience[] = [
    {
      title: "Senior Software Engineer ",
      company: "Wipro Technologies PVT LTD.",
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
      title: "Senior Software Engineer ",
      company: "SLK Software PVT LTD.",
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

  const education: Education[] = [
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

  const projects: Project[] = [
    {
      title: "Healthcare Management Platform",
      description:
        "A healthcare-focused web platform built to simplify clinical workflows and centralize data management. Delivered responsive, accessible UI components, integrated secure REST APIs, and architected a scalable frontend foundation for long-term maintainability.",
      technologies: [
        "React",
        "Redux/Redux Toolkit",
        "TypeScript",
        "JavaScript",
        "Tanstck Query",
        "Material UI",
        "REST APIs",
        "Webpack",
        "HTML/HTML5",
        "CSS/CSS3",
        "Tanstack Query",
        "Reactive Forms",
        "Accessibility",
        "Jest",
      ],
      githubUrl: "",
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
        "Tanstck Query",
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
        "Tanstck Query",
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
    },
  ];

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/assets/pdf/Resume.pdf";
    link.download = "Resume.pdf"; // This sets the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uniqueCompanies = new Set(experiences.map((exp) => exp.company)).size;
  const aboutStats = [
    { label: "Years Experience", value: "7+" },
    { label: "Projects Delivered", value: `${projects.length}+` },
    { label: "Technologies", value: `${skills.length}+` },
    { label: "Companies", value: `${uniqueCompanies}` },
  ];

  const companyShortNames = [
    "Wipro",
    "SLK Software",
    "Immersion Labs",
    "Nevexa Digital",
  ];

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "laxmanarukala@yahoo.com",
      color: "bg-blue-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 888688 8762",
      color: "bg-green-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hyderabad, India",
      color: "bg-red-500",
    },
  ];

  const toolsMid = Math.ceil(tools.length / 2);
  const toolsRow1 = tools.slice(0, toolsMid);
  const toolsRow2 = tools.slice(toolsMid);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
        {/* Section 1: Hero — floating nav + ghost type + arch portrait */}
        <section
          id="hero"
          className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a0a0f]"
        >
          <NavBar />

          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 right-0 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />

          {/* Giant ghost word */}
          <div className="pointer-events-none absolute inset-x-0 top-[14%] flex justify-center select-none md:top-[18%]">
            <span className="whitespace-nowrap text-[20vw] font-black uppercase leading-none tracking-tight text-white/[0.04] md:text-[13vw]">
              Developer
            </span>
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pt-28 pb-10 md:flex-row md:items-center md:px-10 md:pt-32 lg:gap-16">
            {/* Arch portrait + floating badges */}
            <div className="relative order-1 flex items-center justify-center md:order-2 md:flex-1 md:justify-end">
              {/* Sized wrapper — every badge/card below is positioned relative to this, not the full-width row */}
              <div className="relative h-[300px] w-[240px] sm:h-[380px] sm:w-[300px] md:h-[460px] md:w-[370px]">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-gradient-to-b from-blue-600/30 via-indigo-700/20 to-transparent ring-1 ring-white/10"
                >
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-gradient-to-br from-blue-300 to-purple-300 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl md:text-7xl">
                      LA
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: -6 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="absolute -left-3 top-[6%] whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg backdrop-blur-md sm:-left-6 sm:px-4 sm:py-2 sm:text-xs"
                >
                  React JS
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, rotate: 6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 6 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="absolute -right-3 top-[30%] whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg backdrop-blur-md sm:-right-6 sm:px-4 sm:py-2 sm:text-xs"
                >
                  Node.js
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring", stiffness: 180 }}
                  className="absolute -right-3 bottom-[24%] w-28 rounded-xl border border-white/10 bg-white/[0.06] p-2.5 shadow-2xl backdrop-blur-md sm:-right-4 sm:w-36 sm:rounded-2xl sm:p-3.5"
                >
                  <p className="text-[9px] leading-tight text-gray-400 sm:text-[11px]">
                    Years Crafting
                    <br />
                    Digital Products
                  </p>
                  <p className="mt-1 text-base font-bold text-white sm:mt-2 sm:text-2xl">
                    7+
                  </p>
                </motion.div>

                {/* CTA — sits over the bottom of the arch */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
                  className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-4 text-center sm:px-6 sm:pb-6"
                >
                  <motion.button
                    onClick={handleDownloadResume}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xl shadow-blue-500/20 hover:from-blue-600 hover:to-purple-700 sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
                  >
                    <Download size={14} className="sm:hidden" />
                    <Download size={16} className="hidden sm:block" />
                    Download Resume
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Text block */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="relative z-10 order-2 flex items-center md:order-1 md:flex-1"
            >
              <div className="max-w-lg">
                <p className="mb-3 text-sm text-gray-400">Hey, I'm Laxman.</p>
                <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
                  Full Stack Development
                </h1>
                <div className="mt-5 flex items-center gap-2 text-base md:text-lg">
                  <span className="font-normal text-gray-400">I'm a</span>
                  <span className="inline-block w-[16ch] overflow-hidden whitespace-nowrap bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-left font-semibold text-transparent">
                    {typingText}
                    <span className="ml-1 animate-pulse text-white">|</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: About — editorial split, no boxed tiles */}
        <section id="about" className="relative py-24 bg-[#0a0a0f] overflow-hidden">
          <GradientBlobs variant="cool" />
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12 items-stretch">
              <motion.div
                variants={fadeInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="lg:col-span-2"
              >
                <TiltCard
                  className="relative h-full min-h-[380px] rounded-3xl shadow-2xl"
                  maxTilt={6}
                >
                  <CodeProfileCard
                    name="Laxman Arukala"
                    role={roles[0]}
                    location="Hyderabad, India"
                    experience="7+ years"
                    companies={companyShortNames}
                    stack={orbitSkillNames.slice(0, 4)}
                    focus="Fast, accessible, scalable UIs"
                  />
                </TiltCard>
              </motion.div>

              <motion.div
                variants={fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="lg:col-span-3 flex flex-col justify-center"
              >
                <p className="text-sm font-semibold tracking-widest text-blue-400 uppercase mb-4">
                  About Me
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-6">
                  7+ years turning designs into fast, accessible interfaces.
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  I build production React and Node.js applications that hold
                  up under real users — from enterprise healthcare platforms
                  to AI-powered prototyping tools. Seven years across four
                  companies taught me that clean architecture and fast,
                  accessible interfaces aren't nice-to-haves — they're the
                  job.
                </p>

                <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
                  {aboutStats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={i > 0 ? "pl-8 border-l border-white/10" : ""}
                    >
                      <span className="text-3xl font-bold text-white">
                        {stat.value}
                      </span>
                      <span className="block text-xs text-gray-500 mt-1">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                  {contactItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <item.icon size={16} className="text-blue-400" />
                      {item.value}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2.5: Services — end-to-end offering */}
        <section id="services" className="relative py-24 bg-[#0a0a0f] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="max-w-2xl mb-16"
            >
              <p className="text-sm font-semibold tracking-widest text-blue-400 uppercase mb-4">
                Services
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                End-to-end delivery, from idea to production
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                I take websites and software products through the full
                lifecycle — design, build, ship, and run — so you get one
                accountable partner instead of piecing it together across
                vendors.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 hover:border-white/20 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 mb-5">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section 3: Skills — dark showcase, 3D orbit + tag cloud (no cards) */}
        <section id="skills" className="relative py-24 bg-gradient-to-b from-[#0a0a0f] via-indigo-950 to-purple-950 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-center mb-12"
            >
              <p className="text-sm font-semibold tracking-widest text-blue-300 uppercase mb-4">
                Tech Stack
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Technologies I work with
              </h2>
            </motion.div>

            <SkillBars skills={skills} categories={skillCategories} />
          </div>
        </section>

        {/* Section 4: Tools — scrolling marquee, no grid */}
        <section className="relative py-24 bg-[#0a0a0f] overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 mb-14 text-center">
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-sm font-semibold tracking-widest text-blue-400 uppercase mb-4"
            >
              Toolbox
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              Tools & technologies I use daily
            </motion.h2>
          </div>

          <div className="space-y-6">
            <MarqueeRow
              items={toolsRow1.map((t) => ({ icon: t.icon, name: t.name }))}
              direction="left"
            />
            <MarqueeRow
              items={toolsRow2.map((t) => ({ icon: t.icon, name: t.name }))}
              direction="right"
            />
          </div>
        </section>

        {/* Section 5: Experience — left-rail timeline */}
        <section id="experience" className="py-24 bg-[#0a0a0f]">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="mb-16"
            >
              <p className="text-sm font-semibold tracking-widest text-blue-400 uppercase mb-3">
                Career
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                My Experience
              </h2>
            </motion.div>

            <div className="relative" ref={timelineRef}>
              {/* Rail */}
              <div className="absolute left-5 md:left-6 top-2 bottom-2 w-px bg-white/10">
                <motion.div
                  className="w-full bg-gradient-to-b from-blue-500 to-purple-600 origin-top"
                  style={{ scaleY: lineScale, height: "100%" }}
                />
              </div>

              <div className="space-y-10">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="relative flex gap-5 md:gap-8 pl-0"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <motion.div
                      className="relative z-10 flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-xs md:text-sm font-bold text-white shadow-lg shadow-blue-950/40"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      {exp.company.trim().slice(0, 2).toUpperCase()}
                    </motion.div>

                    <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 hover:border-white/20 transition-colors">
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {exp.title}
                          </h3>
                          <p className="text-blue-400 font-semibold text-sm">
                            {exp.company}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-gray-400">
                          <Calendar size={13} />
                          {exp.duration}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <div key={i} className="flex gap-2 items-start">
                            <Zap
                              size={13}
                              className="text-yellow-500 mt-1 flex-shrink-0"
                            />
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {resp}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Education — plain line-item list */}
        <section className="py-20 bg-[#0a0a0f]">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="mb-12"
            >
              <p className="text-sm font-semibold tracking-widest text-blue-400 uppercase mb-3">
                Education
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Academic Background
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="divide-y divide-white/10 border-t border-white/10"
            >
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-6"
                >
                  <div className="flex items-center gap-4">
                    <GraduationCap
                      className="text-blue-400 flex-shrink-0"
                      size={22}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-blue-400 text-sm">
                        {edu.institution}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 pl-10 sm:pl-0">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {edu.year}
                    </span>
                    {edu.grade && (
                      <span className="flex items-center gap-1 text-green-400 font-semibold">
                        <Award size={14} />
                        {edu.grade}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section 7: Projects — text-only cards */}
        <section id="projects" className="relative py-24 bg-[#0a0a0f] overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-sm font-semibold tracking-widest text-blue-400 uppercase mb-4"
            >
              Selected Work
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              Featured Projects
            </motion.h2>
          </div>

          <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 md:px-8 md:py-10 overflow-hidden"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="absolute -top-3 right-5 text-[70px] md:text-[80px] font-black text-white/5 select-none leading-none pointer-events-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 text-xs rounded-full shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        className="flex items-center gap-2 text-gray-400 hover:underline"
                      >
                        <Github size={18} />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 8: Contact — unified panel, big closing statement */}
        <section id="contact" className="relative py-24 bg-[#0a0a0f] text-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-center mb-14"
            >
              <p className="text-sm font-semibold tracking-widest text-blue-400 uppercase mb-4">
                Get In Touch
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Let's build something
                <br className="hidden sm:block" /> great together.
              </h2>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="glass-dark rounded-3xl p-6 sm:p-10 grid md:grid-cols-2 gap-10"
            >
              <ContactFrom />
              <div className="flex flex-col justify-center gap-6">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center flex-shrink-0`}
                    >
                      <item.icon size={22} />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">{item.label}</p>
                      <p className="font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </MotionConfig>
  );
};

export default AnimatedResume;
