import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BuyMeCoffeeModal from './BuyMeCoffeeModal';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: (e?: React.MouseEvent) => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isCoffeeOpen, setIsCoffeeOpen] = useState(false);

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
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-md border-b border-blue-50 dark:border-slate-900 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, 'home')}
          className="flex items-center space-x-3 text-xl font-bold tracking-wider text-blue-600 group"
          id="nav-logo"
        >
          {/* Elegant Mini Loader-Like Logo Emblem */}
          <div className="relative flex items-center justify-center w-11 h-11 pointer-events-none shrink-0" id="nav-loader-mini">
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
              className="absolute w-[36px] h-[36px] rounded-full border border-transparent border-t-amber-500 border-b-amber-500"
            />
            {/* Inner solid gold-glowing emblem badge */}
            <div className="w-[28px] h-[28px] bg-slate-900 dark:bg-slate-950 rounded-full flex items-center justify-center relative z-10 border border-amber-500 shadow-md">
              <span className="text-[10px] font-black font-sans tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 select-none">
                RE
              </span>
            </div>
            {/* Orbiting tiny satellite orb */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute w-[36px] h-[36px]"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-full border border-white dark:border-slate-800 absolute -top-0.5 left-1/2 -translate-x-1/2 shadow-sm" />
            </motion.div>
          </div>

          <span className="relative overflow-hidden block">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full text-slate-800 dark:text-slate-200">
              REMY WILLIAM
            </span>
            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-blue-650 dark:text-blue-400 font-semibold">
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
                    ? 'text-blue-600 dark:text-blue-450 font-semibold'
                    : 'text-slate-650 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-450'
                }`}
                id={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
                {isLinkActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] rounded-t bg-blue-600"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Light/Dark Toggle Button */}
          <button
            onClick={(e) => toggleDarkMode(e)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-250 cursor-pointer flex items-center justify-center shadow-sm select-none outline-none focus:outline-none"
            aria-label="Toggle Theme"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="theme-toggle-btn"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20 animate-pulse" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600 fill-blue-600/10" />
            )}
          </button>

          {/* Buy Me A Coffee (Trigger Modal) */}
          <button
            onClick={() => setIsCoffeeOpen(true)}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold tracking-wider text-slate-900 bg-amber-400 hover:bg-amber-300 hover:shadow-md hover:shadow-amber-400/10 active:scale-95 px-3.5 py-2 rounded-lg transition-all border border-amber-300 shadow-sm cursor-pointer outline-none"
            id="cta-nav-coffee"
            title="Buy Remy a Coffee"
          >
            <Coffee className="w-3.5 h-3.5 text-slate-900 fill-slate-900 animate-pulse" />
            <span className="hidden xs:inline">COFFEE</span>
          </button>

          {/* Social Quick Contact (Dynamic Hover CTA) */}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, 'contact')}
            className="hidden sm:inline-flex items-center space-x-1 text-xs font-mono font-medium tracking-wider text-white bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 px-4 py-2 rounded-lg transition-all font-bold"
            id="cta-nav-contact"
          >
            HIRE REMY
          </a>

          {/* Mobile Hamburger Controls */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 focus:outline-none"
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
            className="md:hidden overflow-hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-900 shadow-xl"
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
                        ? 'text-blue-600 dark:text-blue-450 pl-2 border-l-2 border-l-blue-600'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-450'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <button
                onClick={() => {
                  setIsCoffeeOpen(true);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 text-sm font-mono tracking-widest text-slate-900 bg-amber-400 hover:bg-amber-300 py-3 rounded-lg shadow-sm font-bold border border-amber-300 cursor-pointer outline-none"
              >
                <Coffee className="w-4 h-4 text-slate-900 fill-slate-900 animate-pulse" />
                <span>BUY ME A COFFEE</span>
              </button>
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
      {/* Interactive Support Form Modal */}
      <BuyMeCoffeeModal
        isOpen={isCoffeeOpen}
        onClose={() => setIsCoffeeOpen(false)}
      />
    </header>
  );
}
