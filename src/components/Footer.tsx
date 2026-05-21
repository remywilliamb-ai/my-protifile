import React from 'react';
import { personalInfo } from '../data';

export default function Footer() {
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
      className="bg-white border-t border-slate-200 py-12 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo/Name */}
        <div className="flex items-center space-x-2 text-left" id="footer-branding">
          <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 font-bold leading-none">
            RW
          </span>
          <div>
            <div className="text-sm font-bold tracking-wider text-slate-900 uppercase font-sans leading-none mb-1">
              {personalInfo.fullName}
            </div>
            <div className="text-[10px] font-mono tracking-widest text-slate-450 uppercase leading-none">
              Level 5 Software Developer • Rwanda
            </div>
          </div>
        </div>

        {/* Quick Footer Links */}
        <nav className="flex flex-wrap justify-center gap-6" id="footer-nav">
          <a
            href="#home"
            onClick={(e) => handleScroll(e, 'home')}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleScroll(e, 'about')}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={(e) => handleScroll(e, 'skills')}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, 'projects')}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            Projects
          </a>
          <a
            href="#journey"
            onClick={(e) => handleScroll(e, 'journey')}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            Journey
          </a>
        </nav>

        {/* Copyright notation */}
        <div className="text-center md:text-right" id="footer-copyright">
          <p className="text-xs font-mono text-slate-500">
            &copy; {currentYear} {personalInfo.fullName}. All rights reserved.
          </p>
          <p className="text-[10px] font-mono text-slate-400 mt-1">
            Carefully crafted with level-5 standards in Kigali 🇷🇼
          </p>
        </div>
      </div>
    </footer>
  );
}
