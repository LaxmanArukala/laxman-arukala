import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
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
  ExternalLink,
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
} from "lucide-react";
import project1Img from "../assets/images/project1.webp";
import enviteCards from "../assets/images/envitecards.svg";
import placholderImage from "../assets/images/alter-image.png";
import aiImage from "../assets/images/ai-image.jpeg";

import ContactFrom from "./ContactFrom";
import TiltCard from "./TiltCard";
import GradientBlobs from "./GradientBlobs";
import MarqueeRow from "./MarqueeRow";
import NavBar from "./NavBar";
import CodeProfileCard from "./CodeProfileCard";
import SkillBars from "./SkillBars";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "./motionVariants";

const HeroScene = lazy(() => import("./three/HeroScene"));

interface Skill {
  name: string;
  level: number;
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
  image: string;
  liveUrl?: string;
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
        "Worked on a healthcare-focused web platform designed to streamline workflows and improve data management. Built responsive UI components, integrated secure APIs, and implemented scalable frontend architecture following best practices.",
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
      image: "",
      liveUrl: "",
      githubUrl: "",
    },
    {
      title: "Cross-Platform Mobile Application",
      description:
        "Contributed to the development of a React Native mobile application, implementing reusable components, optimizing performance, and integrating APIs to deliver a seamless cross-platform user experience.",
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
      image: "",
      liveUrl: "",
      githubUrl: "",
    },
    {
      title: "AI Feature Prototyping (POC)",
      description:
        "Developed proof-of-concept AI-driven features for enterprise web applications, focusing on intelligent data extraction, automation, and improved user experience. Collaborated with the team to evaluate feasibility, performance, and integration strategies for AI-powered functionalities.",
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
      image: "",
      liveUrl: "",
      githubUrl: "",
    },

    {
      title: "QC Tool",
      description:
        "A smart quality check tool designed to automate and streamline inspection workflows.It ensures accuracy and consistency across processes with real-time validation.Customizable rules and reports help detect errors early and maintain high standards.Ideal for manufacturing, content review, data validation, and compliance checks.",
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
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      liveUrl: "https://qc.artpark.ai",
      githubUrl: "",
    },
    {
      title: "AR Gallery",
      description:
        "We built a powerful AR solution to enhance engagement across industries.From interactive print and packaging to immersive e-commerce and education,it brings products and content to life with 3D, 360°, and real-time previews.Perfect for marketing, advertising, expos, and virtual experiences.",
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
      image: project1Img,
      liveUrl: "https://ar.immersionslabs.com",
      githubUrl: "",
    },
    {
      title: "Envite Cards",
      description:
        "Envite Cards is the perfect tool for collecting RSVPs online. Envite Cards is first-of-its-kind platform, enabling event planners to easily collect RSVPs",
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
      image: enviteCards,
      liveUrl: "https://site.envitecards.com/home",
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
      value: "Bengaluru, India",
      color: "bg-red-500",
    },
  ];

  const toolsMid = Math.ceil(tools.length / 2);
  const toolsRow1 = tools.slice(0, toolsMid);
  const toolsRow2 = tools.slice(toolsMid);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
        {/* Section 1: Hero — nav + sidebar + text panel + full-bleed 3D visual */}
        <section id="hero" className="flex min-h-screen flex-col bg-[#0a0a0f]">
          <NavBar />

          <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
            {/* Sidebar */}
            <div className="hidden md:flex w-16 flex-shrink-0 flex-col items-center justify-between border-r border-white/10 py-10">
              <div className="flex flex-1 items-center">
                <span className="[writing-mode:vertical-rl] rotate-180 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                  Portfolio
                </span>
              </div>
              <div className="flex flex-col items-center gap-5">
                <a
                  href="mailto:laxmanarukala@yahoo.com"
                  aria-label="Email"
                  className="text-gray-500 transition-colors hover:text-white"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="tel:+918886888762"
                  aria-label="Phone"
                  className="text-gray-500 transition-colors hover:text-white"
                >
                  <Phone size={18} />
                </a>
                <button
                  onClick={handleDownloadResume}
                  aria-label="Download resume"
                  className="text-gray-500 transition-colors hover:text-white"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>

            {/* Text panel */}
            <div className="relative order-1 flex flex-1 items-center px-6 sm:px-10 md:px-16 py-16 md:py-0">
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-10 right-0 w-56 h-56 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative z-10 max-w-xl"
              >
                <div className="mb-4 flex flex-col items-start">
                  <span className="h-9 w-px bg-gradient-to-b from-transparent to-blue-500" />
                  <span className="-mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                </div>
                <p className="text-blue-400 tracking-[0.3em] text-xs md:text-sm font-semibold uppercase mb-5">
                  Full Stack Developer · Bengaluru
                </p>
                <h1 className="text-6xl sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-5 tracking-tight">
                  Laxman Arukala
                </h1>
                <div className="flex items-center gap-2 text-lg md:text-xl mb-8">
                  <span className="text-gray-400 font-normal">I'm a</span>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold w-[16ch] text-left whitespace-nowrap overflow-hidden inline-block">
                    {typingText}
                    <span className="animate-pulse text-white ml-1">|</span>
                  </span>
                </div>
                <p className="text-base md:text-lg text-gray-400 mb-10 max-w-md leading-relaxed">
                  7 years of expertise in delivering high-quality, user-focused
                  digital experiences.
                </p>
                <motion.button
                  onClick={handleDownloadResume}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 shadow-2xl shadow-blue-500/20"
                >
                  <Download size={24} />
                  Download Resume
                </motion.button>
              </motion.div>
            </div>

            {/* Right: full-bleed 3D visual with floating skill badges */}
            <div className="relative order-2 md:w-[45%] h-96 md:h-auto overflow-hidden">
              <Suspense
                fallback={
                  <div className="h-full w-full animate-pulse bg-gradient-to-br from-gray-900 to-indigo-950" />
                }
              >
                <HeroScene />
              </Suspense>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="absolute left-[10%] top-[16%] flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl md:h-20 md:w-20"
              >
                <Code2 className="text-blue-600" size={28} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                className="absolute right-[12%] top-[42%] flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl md:h-16 md:w-16"
              >
                <Server className="text-green-600" size={24} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                className="absolute left-[16%] bottom-[16%] flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl md:h-20 md:w-20"
              >
                <Database className="text-purple-600" size={26} />
              </motion.div>

              <div className="absolute right-[22%] top-[10%] hidden h-8 w-8 rounded-full border-2 border-white/30 md:block" />
              <div className="absolute left-[8%] bottom-[38%] hidden h-6 w-6 rounded-full border-2 border-white/20 md:block" />
            </div>
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
                    location="Bengaluru, India"
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

        {/* Section 5: Experience — single-column editorial timeline */}
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
              {/* Center line - desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-white/10">
                <motion.div
                  className="w-full bg-gradient-to-b from-blue-500 to-purple-600 origin-top"
                  style={{ scaleY: lineScale, height: "100%" }}
                />
              </div>
              {/* Left line - mobile */}
              <div className="md:hidden absolute left-2 top-0 h-full w-0.5 bg-white/10">
                <motion.div
                  className="w-full bg-gradient-to-b from-blue-500 to-purple-600 origin-top"
                  style={{ scaleY: lineScale, height: "100%" }}
                />
              </div>

              <div className="space-y-12 md:space-y-16">
                {experiences.map((exp, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={index}
                      className={`relative flex flex-col gap-6 pl-8 md:flex-row md:items-start md:gap-0 md:pl-0 ${
                        isEven ? "md:flex-row-reverse" : ""
                      }`}
                      variants={isEven ? fadeInRight : fadeInLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 md:hidden" />

                      <div className="md:w-[calc(50%-2.75rem)]">
                        <div className="glass-dark rounded-3xl p-6 md:p-8">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                              {exp.company.trim().slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white">
                                {exp.title}
                              </h3>
                              <p className="text-blue-400 font-semibold text-sm">
                                {exp.company}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-gray-400 mb-4">
                            <Calendar size={13} />
                            {exp.duration}
                          </span>
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
                      </div>

                      <motion.div
                        className="absolute left-1/2 top-2 hidden h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#0a0a0f] bg-gradient-to-r from-blue-500 to-purple-600 md:flex"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        }}
                      />

                      <div className="hidden md:block md:w-[calc(50%-2.75rem)]" />
                    </motion.div>
                  );
                })}
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

        {/* Section 7: Projects — alternating bleed images */}
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

          <div className="space-y-20 md:space-y-28">
            {projects.map((project, index) => {
              const imageFirst = index % 2 === 0;
              const textContent = (
                <div
                  className={`relative px-6 py-10 md:py-16 ${
                    imageFirst
                      ? "md:pl-12 lg:pl-16 md:pr-10"
                      : "md:pr-12 lg:pr-16 md:pl-10"
                  }`}
                >
                  <span className="absolute -top-2 md:top-4 left-6 text-[90px] md:text-[110px] font-black text-white/5 select-none leading-none pointer-events-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">
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
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          className="flex items-center gap-2 text-blue-400 hover:underline"
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </a>
                      )}
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
                </div>
              );

              const imageContent = (
                <TiltCard
                  className={`h-72 md:h-[420px] w-full overflow-hidden shadow-2xl ${
                    imageFirst
                      ? "md:rounded-r-3xl"
                      : "md:rounded-l-3xl"
                  }`}
                  maxTilt={4}
                  scale={1.01}
                >
                  <img
                    src={project.image || placholderImage}
                    alt={project.title}
                    onError={(e) => {
                      e.currentTarget.src = placholderImage;
                    }}
                    className="w-full h-full object-cover"
                  />
                </TiltCard>
              );

              return (
                <motion.div
                  key={index}
                  className="grid md:grid-cols-12 items-center gap-y-2"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  {imageFirst ? (
                    <>
                      <div className="md:col-span-7">{imageContent}</div>
                      <div className="md:col-span-5">{textContent}</div>
                    </>
                  ) : (
                    <>
                      <div className="md:col-span-5 md:order-1">
                        {textContent}
                      </div>
                      <div className="md:col-span-7 md:order-2">
                        {imageContent}
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
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
      </div>
    </MotionConfig>
  );
};

export default AnimatedResume;
