import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Library, Compass } from 'lucide-react';
import { projectsData } from '../data';

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'fullstack'>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend UI/UX' },
    { id: 'fullstack', label: 'Full Stack & APIs' }
  ];

  const filteredProjects = projectsData.filter(project => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  return (
    <section
      id="projects"
      className="relative py-24 bg-[#f0f4f8] dark:bg-slate-900 overflow-hidden"
    >
      {/* Decorative vector meshes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] left-[8%] w-[28rem] h-[28rem] rounded-full bg-blue-500/5 dark:bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-indigo-500/5 dark:bg-indigo-500/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="projects-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16" id="projects-header">
          <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest bg-blue-500/10 dark:bg-blue-400/10 px-3.5 py-1.5 rounded-full border border-blue-500/15 dark:border-blue-400/20">
            Featured Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-950 dark:text-white">
            Practical Software Architectures
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl text-center text-sm leading-relaxed">
            A comprehensive catalog of applications focused on tokenized routes, clean data rendering, custom UX, and efficient databases.
          </p>
          <div className="h-1 w-12 bg-blue-600 dark:bg-blue-400 rounded-full" />
        </div>

        {/* Categories Controls */}
        <div className="flex justify-center mb-12 animate-none" id="projects-filters">
          <div className="inline-flex p-1.5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/60 dark:border-slate-800/50 rounded-2xl">
            {categories.map((cat) => {
              const isActive = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id as any)}
                  className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 relative focus:outline-none cursor-pointer ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200'
                  }`}
                  id={`project-tab-${cat.id}`}
                >
                  <span className="relative z-10">{cat.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeProjCategory"
                      className="absolute inset-0 bg-blue-600 dark:bg-blue-500 rounded-xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="sleek-card group flex flex-col rounded-3xl overflow-hidden hover:-translate-y-1.5"
                id={`project-card-${project.id}`}
              >
                {/* Image Display Frame with Overlay */}
                <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    id={`project-img-${project.id}`}
                  />
                  
                  {/* Hover interactive glass button shelf overlay */}
                  <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/25 hover:scale-110 active:scale-95 transition-all text-xs flex items-center space-x-2"
                      title="View GitHub Repository"
                      id={`proj-github-${project.id}`}
                    >
                      <Github className="w-5 h-5" />
                      <span className="font-mono text-[10px] tracking-wider font-bold">REPOS</span>
                    </a>
                    
                    {project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white hover:scale-110 active:scale-95 transition-all text-xs flex items-center space-x-2 shadow-lg shadow-blue-500/35"
                        title="View Live Deploy"
                        id={`proj-live-${project.id}`}
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span className="font-mono text-[10px] tracking-wider font-bold">LIVE</span>
                      </a>
                    )}
                  </div>

                  {/* Top-right category Pill */}
                  <span className="absolute top-4 right-4 z-10 font-mono text-[10px] uppercase font-bold tracking-wider text-white bg-slate-950/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-full shadow-md">
                    {project.category === 'fullstack' ? 'Full Stack' : 'Frontend'}
                  </span>
                </div>

                {/* Info Text block */}
                <div className="p-6 flex flex-col flex-1" id={`project-content-${project.id}`}>
                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2.5 font-sans leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5" id={`project-techs-${project.id}`}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] font-semibold text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/60 border border-slate-205 dark:border-slate-800/10 px-2.5 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Readability link list for mobile displays (mobile tap targets) */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-150 dark:border-slate-800/50 sm:hidden">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-slate-600 dark:text-slate-300"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code Repo</span>
                    </a>
                    
                    {project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-blue-600 dark:text-blue-400"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
