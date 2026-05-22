import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Terminal, Database, Shield, Radio, Sparkles } from 'lucide-react';
import { skillsData } from '../data';
import { Skill } from '../types';

// Robust inline SVG icons representing every requested technology to preserve premium quality and visual fidelity
function TechLogo({ name }: { name: string }) {
  switch (name) {
    case 'HTML5':
      return (
        <svg className="w-8 h-8 text-orange-500 fill-current" viewBox="0 0 24 24">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17 5.7H6l.3 3.4h11l-.3 3.5H9.6l-.2-1.9H16l-.2 2.4-3.8 1.2-3.8-1.2-.2-2.8H6.2l.5 6.2 5.3 1.7 5.3-1.7.7-8.2-.1-1.4z" />
        </svg>
      );
    case 'CSS3':
      return (
        <svg className="w-8 h-8 text-blue-500 fill-current" viewBox="0 0 24 24">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17 5.7h-12l.3 3.4h10.3l-.3 3.5H9.6l-.2-1.9H16l-.2 2.4-3.8 1.2-3.8-1.2-.2-2.8H6.2l.5 6.2 5.3 1.7 5.3-1.7.7-8.2-.1-1.4z" />
        </svg>
      );
    case 'JavaScript':
      return (
        <svg className="w-8 h-8 text-yellow-500 fill-current rounded" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0V0zm20 18.2c-.3-1-1.5-1.7-2.8-1.7-1.4 0-2.4 1-2.4 2.4s1 2.4 2.4 2.4c1.4 0 2.5-.7 2.8-1.7h-1.3c-.2.4-.7.7-1.5.7-1 0-1.4-.7-1.4-1.4s.4-1.4 1.4-1.4c.8 0 1.2.3 1.5.7H20zm-6.2-7.2h-1.5c.2-.5.5-.8.9-1.2.4-.3.9-.5 1.4-.5.8 0 1.3.4 1.5.9.2.4.4 1 .4 1.8V17c0 1.5-.5 2.5-1.5 3-1 .5-2.2.3-3-.4l.7-.9c.5.5 1.2.6 1.7.4.4-.2.6-.7.6-1.3v-4c0-.6-.1-1-.3-1.2-.2-.2-.5-.3-.9-.3s-.7.2-.9.5c-.3.2-.5.6-.7 1h-1z" />
        </svg>
      );
    case 'React.js':
      return (
        <svg className="w-8 h-8 text-teal-400 stroke-current fill-none stroke-2 animate-spin" style={{ animationDuration: '15s' }} viewBox="0 0 24 24">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" className="fill-current" />
        </svg>
      );
    case 'Tailwind CSS':
      return (
        <svg className="w-8 h-8 text-cyan-400 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5c-2.3 0-4.3 1-5.6 2.6a6.8 6.8 0 0 0-1 4.3 5.4 5.4 0 0 0 5 4.6 6 6 0 0 0 4.1-1.5c2.3 0 4.3-1 5.6-2.6a6.8 6.8 0 0 0 1-4.3 5.4 5.4 0 0 0-5-4.6A6 6 0 0 0 12 6.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10c0-1.7 1.3-3 3-3s3 1.3 3 3c0 2-2 3.5-3.5 4.5S8 12 8 10z" />
        </svg>
      );
    case 'Node.js':
      return (
        <svg className="w-8 h-8 text-green-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 0L2.3 5.6v11.2L12 22.4l9.7-5.6V5.6L12 0zm7.7 15.6l-7.7 4.4-7.7-4.4V6.8l7.7-4.4 7.7 4.4v8.8z M9.1 9.4H10.5V13.8C10.5 14.8 9.9 15.6 9 15.6S7.5 14.8 7.5 13.8H8.8C8.8 14.2 9 14.5 9.1 14.5C9.3 14.5 9.4 14.2 9.4 13.8V9.4z" />
        </svg>
      );
    case 'Express.js':
      return (
        <div className="w-8 h-8 text-slate-800 font-mono font-black text-sm border-2 border-slate-300 rounded flex items-center justify-center bg-slate-50 leading-none">
          EX
        </div>
      );
    case 'REST APIs':
      return (
        <svg className="w-8 h-8 text-blue-400 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <path d="M6 8h12M6 12h12M6 16h6" />
        </svg>
      );
    case 'MySQL':
      return (
        <svg className="w-8 h-8 text-sky-600 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V18h-2v-1.07c-2.34-.14-4.2-1.92-4.43-4.26h2.03c.2.14.3.2.4.2a2 2 0 0 0 2-2V9H9V7h4v4.5c0 1.1-.9 2-2 2H9.6c.15.42.5.75.95.88l2.45-2.45V16.93z" />
        </svg>
      );
    case 'MongoDB':
      return (
        <svg className="w-8 h-8 text-emerald-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C7 4.5 4 10 4 14.5c0 4.1 3.4 7.5 7.5 7.5l.5-1c3 0 6.5-2.5 6.5-6.5C18.5 10 15.5 4.5 12 0zm-1.5 18c-1.5-.5-2.5-1.5-2.5-3.5 0-3 3-6.5 4-8.5v12l-1.5 0z" />
        </svg>
      );
    case 'Git & GitHub':
      return (
        <svg className="w-8 h-8 text-slate-900 dark:text-slate-100 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.024A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.024 2.747-1.024.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      );
    default:
      return <Code className="w-8 h-8 text-blue-500" />;
  }
}

export default function Skills() {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'backend' | 'database' | 'other'>('all');

  const tabs = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend UI/UX' },
    { id: 'backend', label: 'Backend APIs' },
    { id: 'database', label: 'Databases & Tools' },
  ];

  // Map requested categories
  const filteredSkills = skillsData.filter(skill => {
    if (filter === 'all') return true;
    if (filter === 'database') {
      return skill.category === 'database' || skill.category === 'other';
    }
    return skill.category === filter;
  });

  return (
    <section
      id="skills"
      className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300"
    >
      {/* Dynamic Ambient Blur Spheres */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[10%] right-[10%] w-[32rem] h-[32rem] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute top-[10%] left-[8%] w-80 h-80 rounded-full bg-blue-50/50 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="skills-container">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 shadow-none" id="skills-header">
          <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-widest bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/15">
            Skills Inventory
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-900 dark:text-slate-100">
            Dynamic Technical Capabilities
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl text-center text-sm leading-relaxed">
            Hands-on expertise structured through course modules, self-driven research, and full-stack project executions.
          </p>
          <div className="h-1 w-12 bg-blue-600 rounded-full" />
        </div>

        {/* Tab Controls Filters */}
        <div className="flex justify-center mb-12" id="skills-tabs-wrap">
          <div className="inline-flex flex-wrap gap-1 p-1 bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl max-w-full justify-center">
            {tabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`relative px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-350 focus:outline-none cursor-pointer ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                  id={`skill-tab-${tab.id}`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 bg-blue-600 rounded-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic skills grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="skills-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group relative p-6 block"
                  id={`skill-card-${skill.name.toLowerCase().replace(/[ .&]/g, '-')}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    {/* SVG logo */}
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 flex items-center justify-center">
                      <TechLogo name={skill.name} />
                    </div>
                    {/* Percentage */}
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-500/10 px-2.5 py-1 rounded-full">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Title & category */}
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center justify-between font-sans">
                    <span>{skill.name}</span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                      {skill.category}
                    </span>
                  </h3>

                  {/* Visual Progress bar */}
                  <div className="relative w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.1 }}
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-650 to-blue-500"
                    />
                  </div>
                  
                  {/* Subtle bar shadow reflection */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent group-hover:via-blue-500/50 transition-all" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic educational certification footnote banner */}
        <div className="mt-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8 flex flex-col sm:flex-row items-center justify-between gap-6" id="skills-footnote">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Looking for a specific tech stack or framework?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                As a final-year Level 5 Software Development student, I undergo weekly logical evaluations. My foundation in engineering design principles empowers me to adapt and master alternative stacks and tools inside modern corporate architectures rapidly.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="text-xs font-mono font-bold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 px-5 py-3 rounded-xl border border-blue-200 dark:border-blue-900 shrink-0 uppercase transition-all"
          >
            Request Custom Build
          </a>
        </div>
        
      </div>
    </section>
  );
}
