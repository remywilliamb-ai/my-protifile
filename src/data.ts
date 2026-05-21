import { Project, Skill, TimelineEvent } from './types';

export const personalInfo = {
  fullName: 'Bizimana Ngabo Remy William',
  title: 'Software Developer • ICT Specialist • Tech Visionary',
  birthYear: 2009,
  shortBio: 'Born in 2009 • Final-year Level 5 Software Development student and tech prodigy from Rwanda 🇷🇼, building highly immersive web systems, responsive cinematic platforms, and secure APIs.',
  longBio: 'I am Bizimana Ngabo Remy William, an ambitious, forward-thinking Software Developer born in 2009. Currently finalizing my Level 5 Software Development certification in Rwanda, I pair deep programming principles with advanced application UI/UX designs. My ultimate vision is to create high-impact software systems that streamline commerce, entertainment, and digital security within East Africa and globally.',
  avatarUrl: '', // Will resolve to the generated image in the component
  family: {
    mom: 'Mukabyiringiro Anee',
    dad: 'Bizimana Felix',
    brother: 'Kwizera Edison',
    self: 'Bizimana Ngabo Remy William',
  },
  contact: {
    email: 'remywilliamb@gmail.com',
    phone: '078657980',
    whatsapp: 'https://wa.me/25078657980', // standard format for Rwandan phone contact
    linkedin: 'https://linkedin.com/in/remy-william',
    github: 'https://github.com/remy-william',
    location: 'Kigali, Rwanda'
  }
};

export const skillsData: Skill[] = [
  // Frontend
  { name: 'HTML5', category: 'frontend', level: 95, iconName: 'Html5' },
  { name: 'CSS3', category: 'frontend', level: 90, iconName: 'Css3' },
  { name: 'JavaScript', category: 'frontend', level: 88, iconName: 'Javascript' },
  { name: 'React.js', category: 'frontend', level: 85, iconName: 'React' },
  { name: 'Tailwind CSS', category: 'frontend', level: 92, iconName: 'Tailwind' },
  
  // Backend
  { name: 'Node.js', category: 'backend', level: 80, iconName: 'Nodejs' },
  { name: 'Express.js', category: 'backend', level: 83, iconName: 'Express' },
  { name: 'REST APIs', category: 'backend', level: 86, iconName: 'Api' },
  
  // Databases
  { name: 'MySQL', category: 'database', level: 78, iconName: 'Mysql' },
  { name: 'MongoDB', category: 'database', level: 75, iconName: 'Mongodb' },
  
  // Other / Tools
  { name: 'Git & GitHub', category: 'other', level: 88, iconName: 'Github' }
];

export const projectsData: Project[] = [
  {
    id: 'fastmovie',
    title: 'FastMovie Website',
    description: 'An premium cinematic exploration hub styled with high contrast dark designs, glowing capsule layouts, and interactive real-time movie content hubs.',
    tech: ['React.js', 'Tailwind CSS', 'motion', 'REST APIs'],
    liveUrl: '#fastmovie', // Custom click event triggers the exquisite interactive FastMovie demo!
    githubUrl: 'https://github.com/remy-william/fastmovie-app',
    category: 'frontend',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'movie-series-platform',
    title: 'Movie & Series Platform',
    description: 'A dynamic database search hub integrating cinematic search queries, detailed cast profiles, user favorited playlists, and IMDB score reviews.',
    tech: ['React.js', 'Tailwind CSS', 'REST APIs', 'Lucide Icons'],
    liveUrl: 'https://remy-cineverse.vercel.app',
    githubUrl: 'https://github.com/remy-william/movie-series-platform',
    category: 'frontend',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'admin-dashboard',
    title: 'Interactive Admin Dashboard',
    description: 'A futuristic glassmorphic command center compiling reactive statistics charts, user tracking tables, theme settings, and active task progress metrics.',
    tech: ['React.js', 'Recharts', 'Tailwind CSS', 'Lucide Icons'],
    liveUrl: 'https://remy-admin-panel.vercel.app',
    githubUrl: 'https://github.com/remy-william/admin-dashboard',
    category: 'frontend',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'jwt-auth-system',
    title: 'JWT Token Security System',
    description: 'A production-ready secure authentication gateway utilizing JSON Web Tokens, salt hashing, session control, and access levels.',
    tech: ['Node.js', 'Express.js', 'JWT', 'MongoDB', 'React.js'],
    liveUrl: 'https://remy-jwt-auth.vercel.app',
    githubUrl: 'https://github.com/remy-william/jwt-auth-system',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'portfolio-website',
    title: 'Futuristic Portfolio',
    description: 'This current personal platform built to highlight credentials with sleek glassmorphism, high contrast themes, and optimized layout elements.',
    tech: ['React.js', 'Tailwind CSS', 'motion', 'Lucide Icons'],
    liveUrl: '#',
    githubUrl: 'https://github.com/remy-william/portfolio-v2',
    category: 'frontend',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'fullstack-crud-app',
    title: 'Full Stack CRUD App',
    description: 'A comprehensive multi-user management tracker with real-time editing, schema validations, query filtering, and smooth state updates.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Tailwind CSS'],
    liveUrl: 'https://remy-crud-manager.vercel.app',
    githubUrl: 'https://github.com/remy-william/fullstack-crud-app',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80'
  }
];

export const timelineData: TimelineEvent[] = [
  {
    period: '2023 - 2024',
    title: 'ICT Foundations & Hardware',
    subtitle: 'Academic Induction & System Integration',
    description: 'Initiated Level 5 Software Development studies, mastering network structures, hardware assemblies, logic operations, standard algorithm patterns, and database basics.',
    skillsAcquired: ['Network Architecture', 'Operating Systems', 'System Hardware', 'Algorithms Design']
  },
  {
    period: 'Mid 2024',
    title: 'Frontend Engineering Core',
    subtitle: 'Responsive Interfaces & UX Guidelines',
    description: 'Deep-dived into core web architectures - writing semantic HTML5, highly scalable CSS3 structures, fluid layouts with Tailwind CSS, and DOM programming with local Javascript states.',
    skillsAcquired: ['HTML5 / CSS3', 'JavaScript ES6+', 'Tailwind CSS', 'Responsive Layouts']
  },
  {
    period: 'Late 2024 - Early 2025',
    title: 'Dynamic React Applications',
    subtitle: 'State Handlers, Route Systems & Components',
    description: 'Advanced to UI development frameworks, implementing modern React hooks, modular layouts, async rest query structures, and animated feedback interfaces with Framer Motion.',
    skillsAcquired: ['React.js Framework', 'Context API / State Management', 'Web APIs Integration', 'motion Essentials']
  },
  {
    period: 'Mid 2025 - Present',
    title: 'Robust Backends & API Security',
    subtitle: 'Node Servers, Express Routers & DB Architectures',
    description: 'Evolving as a final-year software developer with comprehensive server-side logic in Node.js and Express.js, state-saving databases with MySQL / MongoDB, and tokenized JWT security gateways.',
    skillsAcquired: ['NodeJS / ExpressJS', 'REST APIs Design', 'Relational Databases (MySQL)', 'JSON Web Tokens (JWT)']
  }
];
