import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Mail, 
  Phone, 
  ExternalLink, 
  Github,
  Linkedin,
  Download,
  Send,
  Sparkles,
  Code,
  Palette,
  Smartphone,
  Server,
  Database,
  Cpu,
  Cloud,
  BarChart3,
  Layers,
  CheckCircle,
  Award,
  Calendar,
  Users,
  Zap,
  Menu,
  X,
  ChevronRight,
  Star,
  Target,
  Clock,
  Home,
  User,
  Folder,
  Briefcase,
  Wrench,
  GraduationCap,
  MessageSquare,
  Rocket,
  Globe,
  Shield,
  Terminal,
  Figma,
  Camera,
  Heart,
  TrendingUp,
  Coffee
} from 'lucide-react';

import './index.css';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches && 
                   localStorage.getItem('darkMode') !== 'false');
    setDarkMode(isDark);
    document.documentElement.className = isDark ? 'dark' : 'light';
    
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    });

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.className = newDarkMode ? 'dark' : 'light';
    localStorage.setItem('darkMode', newDarkMode);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please fill in all required fields (Name, Email, Message)' 
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.message.length < 10) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Message should be at least 10 characters long' 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Message sent successfully! I will get back to you soon.' 
        });
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });

        setTimeout(() => {
          setSubmitStatus({ type: '', message: '' });
        }, 5000);
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: `Failed to send message: ${data.message}` 
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Error sending message. Please try again later or contact me directly.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const projects = [
    {
      title: "Crop Yield Predictor AI",
      category: "Frontend Project",
      description: "Frontend AI-powered agricultural web application predicting crop yields using environmental parameters with real-time analytics",
      tech: ["React", "Vite", "GitHub", "JavaScript", "Chart.js", "CSS", "Netlify"],
      icon: <BarChart3 />,
      color: "emerald-cyan",
      githubLink: "https://github.com/monishr288/CROPS-YIELD-PREDICTION",
      liveLink: "https://cyp-crop-yield-predictor.netlify.app/",
      details: "AI companion chatbot to reduce loneliness"
    },
    {
      title: "PORTFOLIO WEBSITE",
      category: "Full Stack Project",
      description: "Enterprise-grade full-stack design system with 100+ animated components, backend APIs and comprehensive documentation",
      tech: ["React", "Node.js", "Express.js", "Framer Motion", "Tailwind", "REST APIs", "CSS"],
      icon: <Code />,
      color: "purple-pink",
      githubLink:"https://github.com/monishr288/combined",
      liveLink:"https://my-portfolio-khaki-five-61.vercel.app/",
      details:"Portfolio website showcasing full-stack capabilities with React and Node.js",

    },
    {
      title: "DESIGN-AGENCY Next.js",
      category: "Full Stack Framework",
      description: "A cutting-edge design agency website built with Next.js 14, featuring interactive UI components, dark/light mode, smooth animations with Framer Motion, and integrated contact form using EmailJS.",
      tech: ["React 18", "Next.js 14", "Tailwind CSS", "Typescript", "GitHub", "JavaScript", "EmailJS", "Lenis", "npm", "Lucide React", "Git", "CSS", "Vercel", "Framer Motion"],
      icon: <Shield />,
      color: "techy",
      githubLink: "https://github.com/monishr288/design-agency-nextjs",
      liveLink: "https://design-agency-nextjs-eight.vercel.app/",
      details: "A modern, responsive design agency portfolio built with Next.js 14"
    },
    {
      title: "DESIGN-AGENCY HOMEPAGE",
      category: "Frontend Project",
      description: "A modern, fully responsive Design Agency website built with React, showcasing a clean and professional UI with interactive components and seamless user experience.",
      tech: ["React", "Vite", "GitHub", "JavaScript", "EmailJS", "Context API", "npm", "Lucide React", "Git", "CSS", "Vercel"],
      icon: <Layers />,
      color: "play",
      githubLink: "https://github.com/monishr288/design-agency",
      liveLink: "https://design-agency-homepage-neon.vercel.app/",
      details: "A modern React-based Design Agency homepage featuring dark/light mode"
    },
    {
      title: "MindEase-AI Companion for Reducing Loneliness",
      category: "Frontend Project",
      description: "AI-powered emotional support web application using Gemini API to provide compassionate conversations and reduce loneliness",
      tech: ["React", "Vite", "GitHub", "JavaScript", "Gemini API Key", "CSS", "Vercel"],
      icon: <Zap />,
      color: "health",
      githubLink: "https://github.com/monishr288/emosup/tree/main/mindease-chat",
      liveLink: "https://mindease-ai-companion.vercel.app/",
      details: "AI companion for emotional wellbeing"
    },
    {
      title: "Flower Shop E-Commerce",
      category: "Frontend Project",
      description: "Beautiful flower shop e-commerce website with responsive design and smooth user experience",
      tech: ["HTML", "CSS", "GitHub", "JavaScript"],
      icon: <Heart />,
      color: "rose-orange",
      githubLink: "https://github.com/monishr288/Flower-Shopping-Website",
      liveLink: "https://monishr288.github.io/Flower-Shopping-Website/",
      details: "E-commerce flower shop"
    },
    {
      title: "Supermarket App UI Design",
      category: "UI/UX Design",
      description: "Designed a supermarket web and mobile application UI using Figma, focusing on usability and user experience.",
      tech: ["Figma"],
      icon: <Figma />,
      color: "luxe",
      liveLink: "https://www.figma.com/proto/pWKpDNeb47q5uoXaOxfzPq/Ecommerce-App?node-id=1-6",
      details: "UI/UX design project"
    },
  ];

  const experiences = [
    {
      company: "Connect Infosystem",
      role: "Frontend Developer Intern",
      period: "June 2024 – July 2024",
      description: "Designed and developed responsive websites using HTML and CSS, while learning and applying core JavaScript concepts to enhance interactivity and functionality.",
      icon: <Code />,
      color: "blue-cyan"
    },
    {
      company: "Retch Solutions",
      role: "UI/UX Designer",
      period: "January 2025",
      description: "Designed user interfaces for web and mobile applications using Figma, including a supermarket project with interactive prototypes.",
      icon: <Figma />,
      color: "green-emerald"
    }
  ];

  const skills = {
    frontend: ["React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind", "Framer Motion"],
    backend: ["Node.js", "Express.js", "Next.js", "Python", "Java", "REST APIs"],
    design: ["Figma", "UI/UX Design", "Prototyping", "Wireframing", "Design Systems"],
    tools: ["Git", "Vercel", "VS Code", "Vite", "Chart.js", "GitHub", "Netlify"]
  };

  const stats = [
    { number: "2+", label: "Years Experience", icon: <Calendar />, color: "blue-cyan" },
    { number: "5+", label: "Projects", icon: <Code />, color: "purple-pink" },
    { number: "100%", label: "Full Stack Focus", icon: <Award />, color: "green-emerald" },
    { number: "∞", label: "Full Stack Passion", icon: <Sparkles />, color: "orange-amber" }
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'projects', label: 'Projects', icon: <Folder size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Wrench size={18} /> },
    { id: 'contact', label: 'Contact', icon: <MessageSquare size={18} /> }
  ];

  return (
    <div className={`portfolio ${darkMode ? 'dark' : 'light'}`}>
      <motion.div 
        className="progress-bar" 
        style={{ scaleX }}
      />

      <nav className="nav">
        <div className="nav-container">
          <motion.div 
            className="nav-brand"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('home')}
          >
            <div className="nav-logo">
              <Code size={24} />
            </div>
            <span className="brand-text">Monish R</span>
          </motion.div>

          <div className="nav-menu-desktop">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <motion.div layoutId="nav-indicator" className="nav-indicator" />
                )}
              </button>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              <div className="theme-toggle-inner">
                <motion.div 
                  className="theme-toggle-circle"
                  animate={{ x: darkMode ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                </motion.div>
              </div>
            </motion.button>
          </div>

          <div className="nav-menu-mobile">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="theme-toggle-mobile"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-button"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        <motion.div 
          className={`mobile-menu ${menuOpen ? 'open' : ''}`}
          initial={false}
          animate={{ height: menuOpen ? 'auto' : 0 }}
        >
          <div className="mobile-menu-content">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </motion.div>
      </nav>

      <section id="home" className="hero">
        <div className="container">
          <div className="hero-grid">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="hero-badge"
              >
                <Sparkles size={16} />
                <span>Full Stack Developer & UI Specialist</span>
              </motion.div>
              
              <h1 className="hero-title">
                Hi, I'm <span className="text-gradient">Monish R</span>
              </h1>
              
              <p className="hero-subtitle">
                I specialize in building complete web applications from frontend to backend using React.js, Node.js, 
                and modern databases, delivering end-to-end solutions with excellent user experiences.
              </p>
              
              <div className="hero-actions">
                <motion.a
                  href="/MONISH R res.pdf"
                  download="Monish_R_Resume.pdf"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  <span>Download Resume</span>
                </motion.a>
                <motion.a
                  href="#contact"
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={20} />
                  <span>Contact Me</span>
                </motion.a>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="hero-contact"
              >
                <a href="tel:9025952561" className="contact-item">
                  <Phone size={20} />
                  <span>9025952561</span>
                </a>
                <a href="mailto:rmonish543@gmail.com" className="contact-item">
                  <Mail size={20} />
                  <span>rmonish543@gmail.com</span>
                </a>
                <a href="https://linkedin.com/in/monish-r-640479301/" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/monishr288" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-photo"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="photo-frame">
                <img 
                  src="/Untitled_Project__10_-removebg-preview.png"
                  alt="Monish R - Full Stack Developer"
                  className="profile-image"
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                    e.target.src = "/Monish.png";
                  }}
                />
                <motion.div 
                  className="floating-icon icon-1"
                  animate={{ 
                    y: [0, -30, 0],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <Code size={24} />
                </motion.div>
                <motion.div 
                  className="floating-icon icon-2"
                  animate={{ 
                    y: [0, 30, 0],
                    rotate: [360, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                >
                  <Server size={24} />
                </motion.div>
                <motion.div 
                  className="floating-icon icon-3"
                  animate={{ 
                    x: [0, 20, 0],
                    rotate: [0, -360]
                  }}
                  transition={{ duration: 7, repeat: Infinity, delay: 2 }}
                >
                  <Database size={24} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>About <span className="text-gradient">Me</span></h2>
            <p className="section-subtitle">Passionate Full Stack Developer creating complete digital solutions</p>
          </motion.div>

          <div className="about-content">
            <div className="about-text">
              <p>
                A Full Stack Developer specializing in building complete web applications using React.js, Node.js, 
                and modern databases. I'm passionate about creating end-to-end solutions that deliver excellent user 
                experiences while maintaining robust backend systems.
              </p>
              <p>
                Enthusiastic about learning new technologies across the entire stack, I'm confident in my ability to 
                fulfill your full-stack requirements and add value to your incredible growth journey with complete 
                technical solutions.
              </p>
            </div>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`stat-card ${stat.color}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`stat-icon ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section projects">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Featured <span className="text-gradient">Projects</span></h2>
            <p className="section-subtitle">Showcasing my full-stack capabilities and complete solutions</p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="project-header">
                  <div className={`project-icon ${project.color}`}>
                    {project.icon}
                  </div>
                  <div>
                    <span className="project-category">{project.category}</span>
                    <h3 className="project-title">{project.title}</h3>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-footer">
                  <div className="project-actions">
                    {project.githubLink && (
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="btn-project btn-github"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github size={18} />
                        <span>GitHub</span>
                      </motion.a>
                    )}
                    
                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="btn-project btn-live-demo"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`View ${project.title} live demo`}
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                    
                    <motion.button
                      className="btn-project btn-details"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        alert(`
Project: ${project.title}
Category: ${project.category}
Description: ${project.description}
Technologies: ${project.tech.join(', ')}
                        `);
                      }}
                      aria-label={`View details for ${project.title}`}
                    >
                      <span>Details</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section experience">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Work <span className="text-gradient">Experience</span></h2>
            <p className="section-subtitle">Professional journey and full-stack accomplishments</p>
          </motion.div>

          <div className="experience-timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="experience-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="experience-dot">
                  <div className={`dot-icon ${exp.color}`}>
                    {exp.icon}
                  </div>
                </div>
                <div className="experience-content">
                  <div className="experience-header">
                    <h3 className="experience-role">{exp.role}</h3>
                    <div className="experience-company">{exp.company}</div>
                    <div className="experience-period">{exp.period}</div>
                  </div>
                  <p className="experience-description">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section skills">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Technical <span className="text-gradient">Skills</span></h2>
            <p className="section-subtitle">Full-stack technologies and tools I work with</p>
          </motion.div>

          <div className="skills-grid">
            <div className="skills-category">
              <div className="skills-category-header">
                <Code size={24} />
                <h3>Frontend Development</h3>
              </div>
              <div className="skills-list">
                {skills.frontend.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CheckCircle size={16} />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="skills-category">
              <div className="skills-category-header">
                <Server size={24} />
                <h3>Backend Development</h3>
              </div>
              <div className="skills-list">
                {skills.backend.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CheckCircle size={16} />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="skills-category">
              <div className="skills-category-header">
                <Palette size={24} />
                <h3>Design & UI/UX</h3>
              </div>
              <div className="skills-list">
                {skills.design.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CheckCircle size={16} />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="skills-category">
              <div className="skills-category-header">
                <Terminal size={24} />
                <h3>Tools & Technologies</h3>
              </div>
              <div className="skills-list">
                {skills.tools.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CheckCircle size={16} />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Get In <span className="text-gradient">Touch</span></h2>
            <p className="section-subtitle">Let's build something amazing together</p>
          </motion.div>

          {submitStatus.message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`status-message ${submitStatus.type}`}
            >
              {submitStatus.message}
            </motion.div>
          )}

          <div className="contact-grid">
            <div className="contact-info">
              <motion.div
                className="contact-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3>Contact Information</h3>
                <div className="contact-items">
                  <a href="tel:9025952561" className="contact-item-card">
                    <div className="contact-icon">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="contact-label">Phone</div>
                      <div className="contact-value">9025952561</div>
                    </div>
                  </a>
                  <a href="mailto:rmonish543@gmail.com" className="contact-item-card">
                    <div className="contact-icon">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="contact-label">Email</div>
                      <div className="contact-value">rmonish543@gmail.com</div>
                    </div>
                  </a>
                  <a href="https://linkedin.com/in/monish-r-640479301/" target="_blank" rel="noopener noreferrer" className="contact-item-card">
                    <div className="contact-icon">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <div className="contact-label">LinkedIn</div>
                      <div className="contact-value">Monish R</div>
                    </div>
                  </a>
                  <a href="https://github.com/monishr288" target="_blank" rel="noopener noreferrer" className="contact-item-card">
                    <div className="contact-icon">
                      <Github size={20} />
                    </div>
                    <div>
                      <div className="contact-label">GitHub</div>
                      <div className="contact-value">monishr288</div>
                    </div>
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="contact-form-container">
              <motion.div
                className="contact-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3>Send a Message</h3>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Your Name *" 
                      className="form-input" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input 
                      type="email" 
                      name="email"
                      placeholder="your@email.com *" 
                      className="form-input" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="Phone Number (Optional)" 
                      className="form-input" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="subject"
                      placeholder="Subject (Optional)" 
                      className="form-input" 
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <textarea 
                      name="message"
                      placeholder="Your message... *" 
                      rows="5" 
                      className="form-textarea" 
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      minLength="10"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="btn btn-primary btn-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="send-icon-spinner"
                        >
                          <Send size={20} />
                        </motion.div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <Code size={32} />
              </div>
              <div>
                <div className="footer-name">Monish R</div>
                <p className="footer-tagline">
                  Full Stack Developer specializing in React.js & Node.js • Creating complete digital solutions
                </p>
              </div>
            </div>

            <div className="footer-social">
              <motion.a
                href="https://linkedin.com/in/monish-r-640479301/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://github.com/monishr288"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="mailto:rmonish543@gmail.com"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={20} />
              </motion.a>
              <motion.a
                href="tel:9025952561"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone size={20} />
              </motion.a>
            </div>

            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} Monish R. All rights reserved. Made with ❤️.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;