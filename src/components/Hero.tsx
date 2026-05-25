import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Terminal, Database, Code, Cpu, Server, Globe } from 'lucide-react';
import { usePortfolio } from '../data_context';

// Helper component for floating icons with random positions and gentle oscillations
function FloatingIcon({ children, className, delay, duration }: { children: React.ReactNode; className: string; delay: number; duration: number }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-15, 15, -15] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className={`absolute opacity-20 dark:opacity-30 p-3 rounded-xl bg-blue-500/5 dark:bg-blue-500/15 border border-blue-500/10 dark:border-blue-400/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const { personalInfo, language, t } = usePortfolio();
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    language === 'en' ? 'Software Developer' : language === 'rw' ? 'Umuhanga mu gukora porogaramu' : 'Développeur Logiciel',
    language === 'en' ? 'ICT Specialist' : language === 'rw' ? 'Inzobere m\'Ikoranabuhanga' : 'Spécialiste des TIC',
    language === 'en' ? 'Tech Visionary' : language === 'rw' ? 'Umunyabitsire mu Ikoranabuhanga' : 'Visionnaire des TIC'
  ];

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const wordPause = 2000;

  // Reset typewriter when language changes to avoid type indexing inconsistencies
  useEffect(() => {
    setText('');
    setRoleIndex(0);
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullRole = roles[roleIndex];

    if (!currentFullRole) return;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentFullRole.substring(0, text.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(currentFullRole.substring(0, text.length + 1));
      }, typingSpeed);
    }

    // Handles word switching logic
    if (!isDeleting && text === currentFullRole) {
      timer = setTimeout(() => setIsDeleting(true), wordPause);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex, language]);

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const avatarSrc = personalInfo.avatarUrl || '/src/assets/images/remy_william_avatar_1779379369567.png';

  const localizedShortBio = language === 'rw'
    ? 'Yavutse mu mwaka wa 2009 • Ni umunyeshuri ugana ku musozo mu gice cya Level 5 Software Development akaba n\'umuhanga mu ikoranabuhanga ukomoka mu Rwanda 🇷🇼, wubaka porogaramu z\'imbuga, amafoto n\'amashusho meza, hamwe n\'inzira zizewe zitanga amakuru (APIs).'
    : language === 'fr'
    ? 'Né en 2009 • Étudiant en dernière année de niveau 5 en développement logiciel et prodige de la technologie originaire du Rwanda 🇷🇼, concevant des systèmes web hautement immersifs, des plateformes cinématiques réactives et des API sécurisées.'
    : personalInfo.shortBio;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-6 pt-24 pb-16 transition-colors duration-300"
    >
      {/* Background Interactive Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Neon blue ambient glow bulbs */}
        <div className="absolute top-[10%] left-[5%] w-[30rem] h-[30rem] rounded-full bg-blue-100/50 dark:bg-blue-500/5 blur-[130px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[35rem] h-[35rem] rounded-full bg-blue-50/50 dark:bg-blue-500/5 blur-[150px]" />
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 dark:opacity-15" />
        
        {/* Floating tech icons */}
        <FloatingIcon className="top-[18%] left-[10%]" delay={0} duration={6}>
          <Code className="w-6 h-6 text-blue-650" />
        </FloatingIcon>
        <FloatingIcon className="top-[30%] right-[8%]" delay={1.5} duration={7}>
          <Terminal className="w-5 h-5 text-blue-650" />
        </FloatingIcon>
        <FloatingIcon className="bottom-[25%] left-[8%]" delay={0.8} duration={8}>
          <Database className="w-6 h-6 text-blue-600" />
        </FloatingIcon>
        <FloatingIcon className="bottom-[18%] right-[12%]" delay={2} duration={5}>
          <Cpu className="w-5 h-5 text-blue-650" />
        </FloatingIcon>
        <FloatingIcon className="top-[60%] left-[22%]" delay={1.2} duration={6}>
          <Server className="w-5 h-5 text-blue-600" />
        </FloatingIcon>
        <FloatingIcon className="top-[75%] right-[28%]" delay={0.3} duration={7}>
          <Globe className="w-6 h-6 text-blue-650" />
        </FloatingIcon>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10" id="hero-grid">
        
        {/* Introductory Hero Text - Left Panel */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left" id="hero-text-container">
          {/* Tagline */}
          <div className="inline-flex self-start items-center space-x-2 bg-blue-50 dark:bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-500/20">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="font-mono text-xs text-blue-650 dark:text-blue-400 font-bold uppercase tracking-wider">
              {t('hero.tagline')}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            {t('hero.hi')}{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 font-extrabold mt-2 filter drop-shadow-[0_2px_10px_rgba(59,130,246,0.05)]">
              {personalInfo.fullName}
            </span>
          </h1>

          {/* Typewriter text block */}
          <div className="h-12 sm:h-16 flex items-center">
            <p className="text-xl sm:text-2xl font-mono text-slate-700 dark:text-slate-350">
              {t('hero.typewriter_prefix')}<span className="text-blue-600 dark:text-blue-400 font-semibold border-r-2 border-r-blue-600 dark:border-r-blue-400 animate-pulse pr-1" id="typing-span">{text}</span>
            </p>
          </div>

          {/* Short Bio */}
          <p className="text-base sm:text-lg text-slate-605 dark:text-slate-400 leading-relaxed max-w-xl">
            {localizedShortBio}
          </p>

          {/* Action Call boundaries */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4" id="hero-actions">
            {/* Primary Action Button */}
            <button
              onClick={() => scrollToSection('projects')}
              className="group inline-flex items-center justify-center space-x-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 py-3.5 px-6 rounded-xl hover:shadow-[0_0_25px_rgba(37,99,235,0.25)] transition-all duration-300 active:scale-95 cursor-pointer font-bold"
              id="cta-projects"
            >
              <span>{t('hero.explore')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Action Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center space-x-2 text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-202 dark:border-slate-800 py-3.5 px-6 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer"
              id="cta-contact"
            >
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{t('hero.get_in_touch')}</span>
            </button>
          </div>
        </div>

        {/* Futuristic Portrait frame - Right Panel */}
        <div className="lg:col-span-5 flex justify-center" id="hero-portrait-container">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96" id="portrait-frame">
            {/* Ambient cyan backdrop spinning rings */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/30 dark:border-blue-550/20 animate-spin" style={{ animationDuration: '40s' }} />
            <div className="absolute -inset-4 rounded-full border border-double border-blue-400/20 dark:border-blue-550/10 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
            
            {/* Glowing cyan corner widgets representing tech theme decor */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500 rounded-br-xl" />

            {/* Internal Glass container holding the picture */}
            <div className="absolute inset-4 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-blue-500 via-indigo-400 to-slate-200 dark:from-blue-600 dark:via-indigo-500 dark:to-slate-800 shadow-xl flex items-center justify-center border border-white/20">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 dark:bg-slate-900 relative">
                <img
                  src={avatarSrc}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                  id="avatar-image"
                />
                
                {/* Tech scanline light sweep grid layer overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none animate-pulse" />
              </div>
            </div>

            {/* Small hovering Badge stats indicator */}
            <div className="absolute -bottom-2 right-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 px-4 shadow-[0_10px_30px_rgba(59,130,246,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center space-x-2 animate-bounce flex-row">
              <div className="flex items-center justify-center p-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-605">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 leading-none font-semibold">{t('hero.status_label')}</div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">{t('hero.status_value')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
