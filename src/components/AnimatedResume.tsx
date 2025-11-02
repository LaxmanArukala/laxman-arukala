import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download,
  Code2,
  Database,
  Layout,
  Server,
  Briefcase,
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
  Cloud,
  Wrench
} from 'lucide-react';
import myImage from '../assets/images/professional.jpeg';
import project1Img from '../assets/images/project1.webp';
import enviteCards from '../assets/images/envitecards.svg'

import ContactFrom from './ContactFrom';

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
  const [isVisible, setIsVisible] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = ['Full Stack Developer', 'React Developer', 'Node.js Expert', 'UI/UX Enthusiast'];

  useEffect(() => {
    setIsVisible(true);
    
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
    { name: 'Node.js', level: 70, icon: <Server className="text-green-500" size={24} /> },
    { name: 'Express.js', level: 70, icon: <Server className="text-green-500" size={24} /> },
    { name: 'React JS', level: 90, icon: <Code2 className="text-blue-500" size={24} /> },
    { name: 'Angular JS', level: 40, icon: <Code2 className="text-green-500" size={24} /> },
    { name: 'JavaScript', level: 82, icon: <Code2 className="text-yellow-500" size={24} /> },
    { name: 'jQuery', level: 60, icon: <Code2 className="text-blue-700" size={24} /> },
    { name: 'Material UI', level: 80, icon: <Layout className="text-blue-400" size={24} /> },
    { name: 'TailWind CSS', level: 70, icon: <Layout className="text-red-500" size={24} /> },
    { name: 'Bootstrap', level: 70, icon: <Layout className="text-purple-500" size={24} /> },
    { name: 'CSS3', level: 80, icon: <Code2 className="text-blue-600" size={24} /> },
    { name: 'HTML5', level: 95, icon: <Code2 className="text-orange-500" size={24} /> },
  ];

 
const tools: Tool[] = [
    {
      name: 'Visual Studio Code',
      description: 'Primary code editor for development',
      icon: <Code2 className="text-blue-600" size={32} />,
      category: 'Editor'
    },
    {
      name: 'Git & GitHub',
      description: 'Version control and collaboration',
      icon: <GitBranch className="text-orange-600" size={32} />,
      category: 'Version Control'
    },
    {
      name: 'Postman',
      description: 'API testing and development',
      icon: <Settings className="text-orange-500" size={32} />,
      category: 'API Testing'
    },
    // {
    //   name: 'Azure DevOps',
    //   description: 'Project management and CI/CD',
    //   icon: <Cloud className="text-blue-500" size={32} />,
    //   category: 'DevOps'
    // },
    {
      name: 'Figma',
      description: 'UI/UX design and prototyping',
      icon: <Layout className="text-purple-500" size={32} />,
      category: 'Design'
    },
    {
      name: 'Chrome DevTools, React Developer Tool',
      description: 'Debugging and performance analysis',
      icon: <Monitor className="text-green-500" size={32} />,
      category: 'Debugging'
    },
    {
      name: 'NPM/Yarn',
      description: 'Package management',
      icon: <Package className="text-red-500" size={32} />,
      category: 'Package Manager'
    },
    {
      name: 'Terminal/Command Line',
      description: 'System administration and scripting',
      icon: <Terminal className="text-gray-700" size={32} />,
      category: 'CLI'
    },
    {
      name: 'Azure Board',
      description: 'Issue tracking and project management',
      icon: <FileText className="text-blue-500" size={32} />,
      category: 'Project Management'
    },
    {
      name: 'Webpack/Vite',
      description: 'Build tools and bundlers',
      icon: <Wrench className="text-yellow-600" size={32} />,
      category: 'Build Tools'
    },
    {
      name: 'ESLint/Prettier',
      description: 'Code formatting and linting',
      icon: <Settings className="text-purple-600" size={32} />,
      category: 'Code Formatting'
    },
    {
      name: 'Sonar Qube',
      description: 'Bugs, Vulnerabilities, Code Smells, Coverages, Duplication',
      icon: <Settings className="text-purple-600" size={32} />,
      category: 'Code Quality'
    },
    {
      name: 'Azure Blob Storage & AWS S3',
      description: 'Cloud storage and file management',
      icon: <Database className="text-blue-600" size={32} />,
      category: 'Cloud Storage'
    }
  ];

  const experiences: Experience[] = [
    {
      title: 'Senior Software Engineer ',
      company: 'SLK Software PVT LTD.',
      duration: 'Nov 2024 - Present',
      responsibilities: [
        'Developed interactive and reusable UI components using React JS, leveraging custom hooks and modern React practices.',
        'Built dynamic forms using Formik with custom validation logic, and developed PDF localization features for highlighting extracted text accurately.',
        'Designed and developed configurable widgets to be embedded across various modules within the Enovia application.',
        'Built and managed Node.js REST APIs, using HTTP methods with proper status handling and authentication.',
        'Captured and stored API failure logs in Azure Blob Storage for efficient monitoring and debugging.',
        'Actively contributed to Agile development by tracking progress in Azure DevOps dashboards, working on sprint-based work items, and participating in planning sessions.'
      ]
    },
    {
      title: 'Web UI/UX Developer',
      company: 'Immersion Software Labs PVT LTD.',
      duration: 'June 2019 - Nov 24',
      responsibilities: [
        'Developed dynamic and responsive front-end applications using Angular and React JS, adhering to modular and scalable architecture principles.',
        'Created reusable components and custom UI widgets to ensure consistent user experience across multiple projects.',
        'Integrated Stripe payment gateway for secure and seamless online payment processing, including handling tokens and webhooks.',
        'Integrated Node.js-based backend services with frontend applications using RESTful APIs, enhancing full-stack development exposure.',
        'Collaborated with UX designers to convert Figma/Adobe XD designs into pixel-perfect and responsive web interfaces.',
        'Optimized frontend performance by applying lazy loading, code splitting, and state management best practices using RxJS and Redux.',
        'Participated in Agile ceremonies, worked closely with cross-functional teams, and contributed to planning, code reviews, and release cycles.',
        'Ensured accessibility, mobile responsiveness, and cross-browser compatibility across all supported platforms using best UI practices.'
      ]
    },
    // {
    //   title: 'UI Developer',
    //   company: 'SignerTech IT Solutions',
    //   duration: 'June 2019 - March 2021',
    //   responsibilities: [
    //     'Designed and implemented front-end features using HTML5, CSS3, JavaScript, and AJAX for dynamic content loading.',
    //     'Developed responsive designs compatible across devices and browsers (Chrome, Firefox, Safari).',
    //     'Used Git for version control and collaborated with backend developers on API integration.',
    //     'Migrated legacy UI components to modern web standards for better performance and maintainability.',
    //     'Created reusable CSS frameworks and contributed to internal documentation for UI design guidelines.'
    //   ]
    // },
    {
      title: 'UI Developer',
      company: 'Nevexa Digital PVT LTD',
      duration: 'Dec 2018 - June 2019',
      responsibilities: [
        'Joined as a UI Developer Intern and contributed significantly to real-time projects, which led to an early transition into a paid role within the first month.',
        'Designed and implemented responsive UI layouts using HTML5, CSS3, and JavaScript based on client requirements.',
        'Collaborated with product teams to translate ideas into interactive, cross-browser compatible web interfaces.',
        'Created and maintained visual assets, ensuring consistent branding and user experience across web platforms.',
        'Supported quality assurance efforts by testing UI functionality and resolving layout and responsiveness issues across various devices.'
      ]
    }
  ];

  const education: Education[] = [
    {
      degree: 'Masters of Computer Science',
      institution: 'Priyadarshini College of Computer Science and Research',
      year: '2015 - 2018',
      grade: '75%'
    },
    {
      degree: 'Bachlor Science',
      institution: 'Sree Chaitanya Degree College',
      year: '2011 - 2014',
      grade: '60%'
    }
  ];

  const projects: Project[] = [
     {
      title: 'QC Tool',
      description: 'A smart quality check tool designed to automate and streamline inspection workflows.It ensures accuracy and consistency across processes with real-time validation.Customizable rules and reports help detect errors early and maintain high standards.Ideal for manufacturing, content review, data validation, and compliance checks.',
      technologies: ['React JS', 'Redux', 'Tailwind CSS', 'Material UI', 'Formik', 'Auth0', 'Apache Charts', 'Node JS','Express JS', 'PostgreSQL'],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      liveUrl: 'https://qc.artpark.ai',
      githubUrl: ''
    },
    {
      title: 'AR Gallery',
      description: 'We built a powerful AR solution to enhance engagement across industries.From interactive print and packaging to immersive e-commerce and education,it brings products and content to life with 3D, 360°, and real-time previews.Perfect for marketing, advertising, expos, and virtual experiences.',
      technologies: ['Angular 12','Bootstrap', 'CSS', 'HTML','Tailwind CSS','S3 Bucket', 'Node JS','Express JS', 'Dynamo DB'],
      image: project1Img,
      liveUrl: 'https://ar.immersionslabs.com',
      githubUrl: ''
    },
    {
      title: 'Envite Cards',
      description: 'Envite Cards is the perfect tool for collecting RSVPs online. Envite Cards is first-of-its-kind platform, enabling event planners to easily collect RSVPs',
      technologies: ['Angular 13','Bootstrap', 'CSS', 'HTML','Tailwind CSS','S3 Bucket', 'Node JS','Express JS', 'Dynamo DB'],
      image: enviteCards,
      liveUrl: 'https://site.envitecards.com/home',
      githubUrl: ''
    },
    
  ];

  // const handleDownloadResume = () => {
  //   // In a real application, this would trigger a PDF download
  //   alert('Resume download would start here!');
  // };

  const handleDownloadResume = () => {
  const link = document.createElement("a");
  link.href = "/assets/pdf/Resume.pdf";
  link.download = "Resume.pdf"; // This sets the file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

 // Group tools by category
  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

 
 

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section 1: Hero with Animation */}
      <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="text-center z-10 px-6">
          <div 
            className="transform transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 50}px)`
            }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              Arukala Laxman
            </h1>
            {/* <div className="text-2xl md:text-3xl text-blue-200 mb-8 h-12 flex items-center justify-center">
              <span className="mr-2">I'm a</span>
              <span className="text-yellow-300 font-semibold min-w-[300px] text-left">
                {typingText}
                <span className="animate-pulse text-white">|</span>
              </span>
            </div> */}
            <div className="text-2xl md:text-3xl text-blue-200 mb-8 h-12 flex items-center justify-center flex-wrap">
              <span className="mr-2">I'm a</span>
              <div className="text-yellow-300 font-semibold w-[300px] text-left whitespace-nowrap overflow-hidden">
                <span>{typingText}</span>
                <span className="animate-pulse text-white ml-1">|</span>
              </div>
            </div>

            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
              Full Stack Developer with 6 years of expertise in delivering high-quality, user-focused digital experiences.
            </p>
            <button 
              onClick={handleDownloadResume}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 mx-auto transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
            >
              <Download size={24} />
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Personal Info */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              className="transform transition-all duration-1000"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : -50}px)`
              }}
            >
              <div className="relative">
                <img 
                  src={myImage} 
                  alt="Profile" 
                  className="w-80 h-80 rounded-full object-cover mx-auto shadow-2xl border-8 border-white"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
                  <Code2 className="text-white" size={32} />
                </div>
              </div>
            </div>
            
            <div 
              className="transform transition-all duration-1000 delay-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : 50}px)`
              }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Arukala Laxman</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                I'm a passionate Full Stack Developer with over 6 years of experience in creating 
                robust, scalable web applications. I specialize in React.js, Angular, and Node.js, 
                with a keen eye for user experience and performance optimization.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors">
                  <Mail className="text-blue-500" size={24} />
                  <span className="text-lg">laxmanarukala@yahoo.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors">
                  <Phone className="text-green-500" size={24} />
                  <span className="text-lg">+91 888688 8762</span>
                </div>
                <div className="flex items-center gap-4 text-gray-700 hover:text-blue-600 transition-colors">
                  <MapPin className="text-red-500" size={24} />
                  <span className="text-lg">Bengaluru, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Skills */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">My Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6">Technologies I work with</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={skill.name}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 30}px)`,
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-center mb-4">
                  {skill.icon}
                  <h3 className="text-xl font-semibold text-gray-800 ml-3">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 100 + 500}ms`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 font-medium">{skill.level}%</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 4: Tools & Technologies */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Tools & Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6">Development tools and software I use daily</p>
          </div>
          
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div 
                key={tool.name}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-gray-100 hover:border-blue-200"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 30}px)`,
                  transitionDelay: `${index * 50}ms`
                }}
              >
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
                      {tool.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{tool.description}</p>
                  <div className="inline-block">
                    <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {tool.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          {/* Alternative grouped layout */}
          <div className="mt-16">
            {/* <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Organized by Category</h3> */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(groupedTools).map(([category, categoryTools], categoryIndex) => (
                <div 
                  key={category}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-6 border border-gray-100"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: `translateY(${isVisible ? 0 : 30}px)`,
                    transitionDelay: `${categoryIndex * 100 + 800}ms`
                  }}
                >
                  <h4 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    {category}
                  </h4>
                  <div className="space-y-3">
                    {categoryTools.map((tool, toolIndex) => (
                      <div key={tool.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                        <div className="flex-shrink-0">
                          {React.cloneElement(tool.icon as React.ReactElement, { size: 20 })}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{tool.name}</p>
                          <p className="text-xs text-gray-600">{tool.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Experience */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">My Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6">Professional journey and achievements</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className="relative flex items-start gap-8 transform transition-all duration-700"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: `translateX(${isVisible ? 0 : (index % 2 === 0 ? -50 : 50)}px)`,
                    transitionDelay: `${index * 200 + 300}ms`
                  }}
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Briefcase className="text-white" size={24} />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-8 flex-1 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{exp.title}</h3>
                        <p className="text-blue-600 font-semibold text-lg">{exp.company}</p>
                      </div>
                      <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                        <Calendar size={20} className="mr-2" />
                        <span className="font-medium">{exp.duration}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {exp.responsibilities.map((resp, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Zap className="text-yellow-500 mt-1 flex-shrink-0" size={16} />
                          <p className="text-gray-700 leading-relaxed">{resp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Education */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">My Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6">Academic background and qualifications</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 30}px)`,
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <GraduationCap className="text-white" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={18} className="mr-2" />
                    <span>{edu.year}</span>
                  </div>
                  {edu.grade && (
                    <div className="flex items-center text-green-600 font-semibold">
                      <Award size={18} className="mr-2" />
                      <span>{edu.grade}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">My Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6">Showcase of my recent work</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 30}px)`,
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target='_blank'
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-full transition-colors"
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Contact */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Contact Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-200 mt-6 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's collaborate and create something amazing together. 
              I'm always excited to work on new challenges and innovative projects.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              className="transform transition-all duration-1000"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : -50}px)`
              }}
            >
              {/* <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Contact" 
                className="w-full rounded-xl shadow-2xl"
              /> */}
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15543.116698001637!2d77.5734042!3d13.113171200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1753475445857!5m2!1sen!2sin"
                className="w-full rounded-xl shadow-2xl"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location"
              ></iframe> */}
             <ContactFrom/>

            </div>
            
            <div 
              className="transform transition-all duration-1000 delay-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : 50}px)`
              }}
            >
              <div className="space-y-8">
                <div className="flex items-center gap-4 text-lg">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-gray-300">Email</p>
                    <p className="font-semibold">laxmanarukala@yahoo.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-lg">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-gray-300">Phone</p>
                    <p className="font-semibold">+91 888688 8762</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-lg">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-gray-300">Location</p>
                    <p className="font-semibold">Bengaluru, India</p>
                  </div>
                </div>
                
                {/* <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-2xl" onClick={handleGetInTouch}>
                  <Send size={24} />
                  Get In Touch
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimatedResume;
