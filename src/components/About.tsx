import { motion } from 'motion/react';
import { LayoutGrid, Cpu, BookOpen, Milestone, Award, Globe } from 'lucide-react';
import { personalInfo } from '../data';

export default function About() {
  const highlightPoints = [
    {
      title: 'Frontend UI/UX',
      desc: 'Developing stunning, eye-catching, and interactive user interfaces utilizing glassmorphism, seamless layout motions, and responsive frameworks.',
      icon: LayoutGrid,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Backend Engineering',
      desc: 'Architecting robust database workflows, token protection routes, RESTful endpoints, and custom logical systems using modern server patterns.',
      icon: Cpu,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'ICT System Integration',
      desc: 'Deep core interest in computer networks, system configurations, hardware diagnostic pipelines, and localized technology solutions.',
      icon: Globe,
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20'
    },
    {
      title: 'Level 5 Core Studies',
      desc: 'Finalizing an exhaustive Software Development Diploma Curriculum in Rwanda, combining structured algorithmics with real team projects.',
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-600/10 border-blue-600/20'
    }
  ];

  return (
    <section
      id="about"
      className="relative py-24 bg-[#f0f4f8] dark:bg-slate-900 overflow-hidden"
    >
      {/* Background Decorator Lines and Bulbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-96 h-96 rounded-full bg-blue-400/5 dark:bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-indigo-400/5 dark:bg-indigo-600/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="about-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16" id="about-header">
          <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest bg-blue-500/10 dark:bg-blue-400/10 px-3.5 py-1.5 rounded-full border border-blue-500/15 dark:border-blue-400/20">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-950 dark:text-white">
            Driven by Purpose, Inspired by Technology
          </h2>
          <div className="h-1 w-12 bg-blue-600 dark:bg-blue-400 rounded-full" />
        </div>

        {/* Narrative + Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="about-body">
          {/* Narrative Text Column */}
          <div className="lg:col-span-5 flex flex-col space-y-6" id="about-narrative">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
              <span>My Journey & Vision</span>
            </h3>
            
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-base" id="narrative-bio">
              {personalInfo.longBio}
            </p>

            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-base">
              Rwandan technology ecosystems are growing exponentially, and I aim to contribute actively by putting my soft and hard capabilities to work. Through rigorous level-5 course objectives, interactive peer builds, and continuous stack exploration, I am structuring my capabilities to meet demanding industry needs.
            </p>

            {/* Structured Stats indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800" id="stats-row">
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">Level 5</span>
                <span className="text-xs font-mono text-slate-400 tracking-wider uppercase mt-1">Academics</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-bold text-indigo-500 dark:text-indigo-400">10+</span>
                <span className="text-xs font-mono text-slate-400 tracking-wider uppercase mt-1">Core Techs</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-bold text-teal-500 dark:text-teal-400">6+</span>
                <span className="text-xs font-mono text-slate-400 tracking-wider uppercase mt-1">Projects</span>
              </div>
            </div>
          </div>

          {/* Highlights Grid cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" id="about-highlights-grid">
            {highlightPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className="sleek-card group relative p-6 hover:-translate-y-1 flex flex-col"
                  id={`about-card-${index}`}
                >
                  <div className="absolute top-0 right-0 p-3 text-slate-200 dark:text-slate-800 font-mono font-bold text-4xl select-none leading-none group-hover:text-blue-500/10 transition-colors">
                    0{index + 1}
                  </div>
                  
                  {/* Icon wrap */}
                  <div className={`p-3 rounded-xl border self-start mb-4 ${point.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 font-sans">
                    {point.title}
                  </h4>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
