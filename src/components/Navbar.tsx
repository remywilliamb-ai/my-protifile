import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDarkMode, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on scroll alignment
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.getElementById(target);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
      setActiveSection(target);
      setIsOpen(false);
    }
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f0f4f8]/85 dark:bg-slate-950/85 backdrop-blur-xl shadow-md border-b border-white/60 dark:border-slate-800/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, 'home')}
          className="flex items-center space-x-2 text-xl font-bold tracking-wider text-blue-600 dark:text-blue-400 group"
          id="nav-logo"
        >
          <span className="font-mono text-xs text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 group-hover:bg-blue-500/20 transition-all leading-none">
            RW
          </span>
          <span className="relative overflow-hidden block">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
              REMY WILLIAM
            </span>
            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-slate-800 dark:text-white font-semibold">
              DEVELOPER
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
          {navLinks.map((link) => {
            const isLinkActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href.substring(1))}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isLinkActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400'
                }`}
                id={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
                {isLinkActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] rounded-t bg-blue-600 dark:bg-blue-400"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all shadow-sm focus:outline-none"
            aria-label="Toggle dark/light mode"
            id="theme-toggler"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-blue-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Social Quick Contact (Dynamic Hover CTA) */}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, 'contact')}
            className="hidden sm:inline-flex items-center space-x-1 text-xs font-mono font-medium tracking-wider text-white bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 px-4 py-2 rounded-lg transition-all"
            id="cta-nav-contact"
          >
            HIRE REMY
          </a>

          {/* Mobile Hamburger Controls */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
            aria-label="Toggle mobile menu"
            id="mobile-nav-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#f0f4f8]/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-900 shadow-xl"
            id="mobile-nav-panel"
          >
            <div className="px-6 py-5 flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isLinkActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href.substring(1))}
                    className={`text-base font-semibold py-2 border-b border-dashed border-slate-100 dark:border-slate-900 last:border-0 transition-colors ${
                      isLinkActive
                        ? 'text-blue-600 dark:text-blue-400 pl-2 border-l-2 border-l-blue-600 dark:border-l-blue-400'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleClick(e, 'contact')}
                className="w-full text-center text-sm font-mono tracking-widest text-white bg-blue-600 hover:bg-blue-500 py-3 rounded-lg shadow-md font-bold"
              >
                HIRE REMY
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
