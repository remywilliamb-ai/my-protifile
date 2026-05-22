import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../data_context';

export default function Footer() {
  const { personalInfo } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer
      id="portfolio-footer"
      className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-12 px-6 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo/Name */}
        <div className="flex items-center space-x-3 text-left" id="footer-branding">
          {/* Elegant Mini Loader-Like Logo Emblem */}
          <div className="relative flex items-center justify-center w-10 h-10 pointer-events-none shrink-0" id="footer-loader-mini">
            {/* Outer dotted orbit spinning */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-amber-500/30 dark:border-amber-400/40"
            />
            {/* Spinning orbit line */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute w-[32px] h-[32px] rounded-full border border-transparent border-t-amber-500 border-b-amber-500"
            />
            {/* Inner solid gold-glowing emblem badge */}
            <div className="w-[24px] h-[24px] bg-slate-900 dark:bg-slate-950 rounded-full flex items-center justify-center relative z-10 border border-amber-500 shadow-md">
              <span className="text-[9px] font-black font-sans tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 select-none">
                RE
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold tracking-wider text-slate-900 dark:text-slate-100 uppercase font-sans leading-none mb-1">
              {personalInfo.fullName}
            </div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase leading-none">
              Level 5 Software Developer • Rwanda
            </div>
          </div>
        </div>

        {/* Quick Footer Links */}
        <nav className="flex flex-wrap justify-center gap-6" id="footer-nav">
          <a
            href="#home"
            onClick={(e) => handleScroll(e, 'home')}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-450 transition-colors uppercase tracking-widest"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleScroll(e, 'about')}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-450 transition-colors uppercase tracking-widest"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={(e) => handleScroll(e, 'skills')}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-450 transition-colors uppercase tracking-widest"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, 'projects')}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-450 transition-colors uppercase tracking-widest"
          >
            Projects
          </a>
          <a
            href="#journey"
            onClick={(e) => handleScroll(e, 'journey')}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-450 transition-colors uppercase tracking-widest"
          >
            Journey
          </a>
        </nav>

        {/* Copyright notation */}
        <div className="text-center md:text-right" id="footer-copyright">
          <p className="text-xs font-mono text-slate-500 dark:text-slate-405">
            &copy; {currentYear} {personalInfo.fullName}. All rights reserved.
          </p>
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1">
            Carefully crafted with level-5 standards in Kigali 🇷🇼
          </p>
        </div>
      </div>
    </footer>
  );
}
