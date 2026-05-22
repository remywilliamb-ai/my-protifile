import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Cpu, BookOpen, Globe, Coffee, Heart, Users, Sparkles, Phone, Copy, Check } from 'lucide-react';
import { personalInfo } from '../data';

export default function About() {
  const [showCoffeeDetails, setShowCoffeeDetails] = useState(false);
  const [copied, setCopied] = useState(false);

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
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'ICT System Integration',
      desc: 'Deep core interest in computer networks, system configurations, hardware diagnostic pipelines, and localized technology solutions.',
      icon: Globe,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Level 5 Core Studies',
      desc: 'Finalizing an exhaustive Software Development Diploma Curriculum in Rwanda, combining structured algorithmics with real team projects.',
      icon: BookOpen,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    }
  ];

  return (
    <section
      id="about"
      className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Background Decorator Lines and Bulbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-96 h-96 rounded-full bg-blue-100/50 dark:bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-blue-50/50 dark:bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="about-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16" id="about-header">
          <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-widest bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-900 dark:text-slate-100">
            Driven by Purpose, Inspired by Technology
          </h2>
          <div className="h-1 w-12 bg-blue-550 rounded-full" />
        </div>

        {/* Narrative + Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="about-body">
          {/* Narrative Text Column */}
          <div className="lg:col-span-5 flex flex-col space-y-6" id="about-narrative">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
              <span>My Journey & Vision</span>
            </h3>
            
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base" id="narrative-bio">
              {personalInfo.longBio}
            </p>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              I am a final-year software developer pursuing Level 5 Diploma goals in Rwanda. Our regional tech sphere is growing rapidly, and I aim to contribute high fidelity applications that simplify modern enterprise solutions. I leverage modern frontend architectures, reliable relational systems, and token encryption pipelines.
            </p>

            {/* Direct Contact Phone Detail */}
            <div className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl" id="about-phone-box">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Direct Developer Contact</div>
                <a href={`tel:${personalInfo.contact.phone}`} className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-650 dark:hover:text-blue-400 transition-colors">
                  (+250) {personalInfo.contact.phone}
                </a>
              </div>
            </div>

            {/* Buy Me a Coffee interactive component */}
            <div className="pt-4 flex flex-col items-start gap-4" id="coffee-component">
              <button
                onClick={() => setShowCoffeeDetails(!showCoffeeDetails)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border border-blue-500 dark:border-slate-800 active:scale-95 text-blue-600 dark:text-blue-400 font-bold rounded-2xl shadow-lg shadow-blue-500/15 transition-all text-sm font-sans cursor-pointer"
                id="btn-buy-coffee"
              >
                <Coffee className="w-5 h-5 text-blue-600 fill-blue-600 animate-pulse" />
                <span>Buy Me A Coffee</span>
              </button>

              <AnimatePresence>
                {showCoffeeDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="overflow-hidden w-full bg-slate-50 dark:bg-slate-900 border border-blue-500/10 dark:border-blue-500/20 rounded-2xl p-5 text-left"
                    id="coffee-details-box"
                  >
                    <h4 className="text-blue-650 dark:text-blue-400 font-bold text-sm mb-2 flex items-center space-x-1.5">
                      <Heart className="w-4 h-4 fill-blue-600 text-blue-600 animate-pulse" />
                      <span>Support My Development Journey</span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-405 leading-relaxed mb-4">
                      Thank you! Your support fuels clean coding and premium responsive layouts.
                    </p>
                    <div className="p-3.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wider uppercase block mb-1">MOMO PAY (Rwanda):</span>
                        <div className="text-blue-600 dark:text-blue-450 font-extrabold text-sm tracking-widest">*182*1*1*0786557980#</div>
                      </div>
                      
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('*182*1*1*0786557980#');
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold font-sans bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer self-stretch sm:self-auto text-center justify-center shadow-md shadow-blue-600/15"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Code Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Structured Stats indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800" id="stats-row">
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-bold text-blue-650 dark:text-blue-400">Level 5</span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">Academics</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">10+</span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">Core Techs</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-bold text-blue-650 dark:text-blue-400">6+</span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">Projects</span>
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
                  className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 hover:border-blue-500/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group relative p-6 hover:-translate-y-1 flex flex-col"
                  id={`about-card-${index}`}
                >
                  <div className="absolute top-0 right-0 p-3 text-slate-100 dark:text-slate-800/40 font-mono font-bold text-4xl select-none leading-none group-hover:text-blue-500/15 transition-colors">
                    0{index + 1}
                  </div>
                  
                  {/* Icon wrap */}
                  <div className={`p-3 rounded-xl border self-start mb-4 ${point.color} dark:border-slate-800`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 font-sans">
                    {point.title}
                  </h4>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Family Core Sub-section */}
        <div className="mt-20 pt-16 border-t border-slate-100 dark:border-slate-800" id="about-family-section">
          <div className="flex flex-col items-center text-center space-y-3 mb-12">
            <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-widest bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
              Personal Heritage
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              My Family Pillar
            </h3>
            <p className="text-slate-600 dark:text-slate-450 text-sm max-w-xl">
              Success is built upon a sturdy foundation of love, core values, and family guidance. Meet the family of Bizimana Ngabo Remy William:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Father Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Bizimana Felix</h4>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-450 uppercase tracking-widest font-semibold">Father / Parent</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Guiding our household with wisdom, resourcefulness, and professional integrity.
              </p>
            </div>

            {/* Mother Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Mukabyiringiro Anee</h4>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-450 uppercase tracking-widest font-semibold">Mother / Parent</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Providing ultimate care, educational diligence, and warm core principles.
              </p>
            </div>

            {/* Brother Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Kwizera Edison</h4>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-450 uppercase tracking-widest font-semibold">Brother / Sibling</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Colleague, companion, and collaborative partner in research and learning.
              </p>
            </div>

            {/* Self Card */}
            <div className="bg-white dark:bg-slate-900 border-2 border-blue-500/80 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-blue-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-bl">
                SELF
              </div>
              <div className="w-14 h-14 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center border border-blue-500/30 mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-blue-650" />
              </div>
              <h4 className="text-base font-bold text-blue-650 dark:text-blue-400 mb-1">Remy William</h4>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Born 2009 / Developer</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Dedicated youngest developer, streamlining cinematic media engines and secure backends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
