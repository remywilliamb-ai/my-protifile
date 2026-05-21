import { motion } from 'motion/react';
import { Calendar, Award, Code2, Cpu, CheckCircle2, ChevronRight } from 'lucide-react';
import { timelineData } from '../data';

export default function Timeline() {
  // Mapping milestones to appropriate status icons
  const iconsList = [Award, Code2, Cpu, CheckCircle2];

  return (
    <section
      id="journey"
      className="relative py-24 bg-slate-50 overflow-hidden border-t border-slate-100"
    >
      {/* Dynamic atmospheric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-blue-500/5 blur-[125px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[32rem] h-[32rem] rounded-full bg-indigo-500/5 blur-[125px]" />
        
        {/* Futuristic circuit trace line */}
        <div className="absolute top-0 bottom-0 left-[50%] -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent hidden md:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="timeline-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-20" id="timeline-header">
          <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Education Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-900">
            Level 5 Software Engineering Journey
          </h2>
          <p className="text-slate-500 max-w-xl text-center text-sm leading-relaxed">
            The incremental academic progression of a software engineer, mapping foundations in hardware straight through to micro-service APIs.
          </p>
          <div className="h-1 w-12 bg-blue-600 rounded-full" />
        </div>

        {/* Timeline body wrapper */}
        <div className="relative" id="timeline-body">
          {/* Vertical central spine line for desktop / left margin line for mobile */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 md:-translate-x-1/2" />

          {/* Cards collection */}
          <div className="space-y-12" id="timeline-events-list">
            {timelineData.map((ev, index) => {
              const IconComponent = iconsList[index % iconsList.length];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                  id={`timeline-node-${index}`}
                >
                  {/* Timeline node bullet locator element */}
                  <div className="absolute left-4 md:left-1/2 top-4 md:top-8 -translate-x-[15px] md:-translate-x-1/2 z-20 flex items-center justify-center w-[32px] h-[32px] rounded-full bg-white border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)] text-blue-600 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>

                  {/* Context Card Box container (alternating side spacing on desktop) */}
                  <div
                    className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                      isEven ? 'md:pr-12 text-left' : 'md:pl-12 text-left'
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group block relative"
                      id={`timeline-card-${index}`}
                    >
                      {/* Period indicator */}
                      <span className="inline-flex items-center space-x-1 font-mono text-xs font-bold text-blue-600 bg-blue-50 py-1.5 px-3 rounded-full mb-4 border border-blue-100">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <span>{ev.period}</span>
                      </span>

                      {/* Header content */}
                      <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors duration-250 font-sans leading-tight">
                        {ev.title}
                      </h3>
                      <h4 className="text-xs font-mono font-medium tracking-wide text-slate-400 uppercase mt-1 mb-4 leading-none">
                        {ev.subtitle}
                      </h4>

                      {/* Description narrative body */}
                      <p className="text-sm text-slate-500 leading-relaxed mb-6">
                        {ev.description}
                      </p>

                      {/* Micro skill bullet highlights */}
                      <div className="border-t border-slate-100 pt-4" id={`timeline-skills-list-${index}`}>
                        <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-2.5 font-bold">
                          Core Competencies
                        </div>
                        <div className="flex flex-wrap gap-1.5 text-left">
                          {ev.skillsAcquired.map((skill, subIdx) => (
                            <span
                              key={subIdx}
                              className="inline-flex items-center space-x-1 font-mono text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md"
                            >
                              <ChevronRight className="w-2.5 h-2.5 text-blue-500 shrink-0" />
                              <span>{skill}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
