import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Coffee, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BuyMeCoffeeModal from './BuyMeCoffeeModal';
import { usePortfolio } from '../data_context';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: (e?: React.MouseEvent) => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isCoffeeOpen, setIsCoffeeOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { language, setLanguage, t } = usePortfolio();

  const languagesList = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'rw' as const, name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
  ];

  const currentLangObj = languagesList.find(l => l.code === language) || languagesList[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#lang-dropdown-container')) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.journey'), href: '#journey' },
    { name: t('nav.contact'), href: '#contact' },
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
  }, [language]); // Depend on language since navLink names change

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
          className="flex items-center space-x-2 sm:space-x-3 text-base sm:text-lg md:text-xl font-bold tracking-wider text-blue-600 group"
          id="nav-logo"
        >
          {/* Elegant Mini Loader-Like Logo Emblem */}
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 pointer-events-none shrink-0" id="nav-loader-mini">
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
              className="absolute w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] rounded-full border border-transparent border-t-amber-500 border-b-amber-500"
            />
            {/* Inner solid gold-glowing emblem badge */}
            <div className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] bg-slate-900 dark:bg-slate-950 rounded-full flex items-center justify-center relative z-10 border border-amber-500 shadow-md">
              <span className="text-[8px] sm:text-[10px] font-black font-sans tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 select-none">
                RE
              </span>
            </div>
            {/* Orbiting tiny satellite orb */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute w-[28px] h-[28px] sm:w-[36px] sm:h-[36px]"
            >
              <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-full border border-white dark:border-slate-800 absolute -top-0.5 left-1/2 -translate-x-1/2 shadow-sm" />
            </motion.div>
          </div>

          <span className="relative overflow-hidden block text-xs xs:text-sm md:text-base font-bold tracking-wider whitespace-nowrap">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full text-slate-800 dark:text-slate-200">
              REMY WILLIAM
            </span>
            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-blue-650 dark:text-blue-400 font-semibold uppercase">
              {t('nav.developer')}
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
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Premium Language Dropdown Option */}
          <div className="hidden sm:block relative select-none" id="lang-dropdown-container">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="px-3.5 py-2 flex items-center space-x-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-sm focus:outline-none select-none cursor-pointer text-xs font-bold uppercase tracking-wider h-9"
              title="Select Language"
              id="lang-dropdown-trigger-btn"
            >
              <div className="relative flex items-center justify-center">
                <Globe className="w-4 h-4 text-blue-500 shrink-0" />
                {/* Online pulsing green dot (tick) on language div */}
                <span className="absolute -top-1.5 -right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 border border-white dark:border-slate-900"></span>
                </span>
              </div>
              <span className="font-sans font-bold text-xs">{t('nav.language')}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-[9999] py-1.5 overflow-hidden"
                  id="lang-dropdown-options"
                >
                  <div className="px-3 py-1 text-[8px] font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase border-b border-slate-100 dark:border-slate-800/80 mb-1 select-none">
                    Language
                  </div>
                  {languagesList.map((langItem) => {
                    const isSelected = language === langItem.code;
                    return (
                      <button
                        key={langItem.code}
                        onClick={() => {
                          setLanguage(langItem.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs font-semibold tracking-wide transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer border-0 outline-none text-slate-700 dark:text-slate-200 ${
                          isSelected ? 'bg-blue-50/75 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold' : ''
                        }`}
                        id={`choose-lang-${langItem.code}`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm leading-none">{langItem.flag}</span>
                          <span className="font-sans text-xs">{langItem.name}</span>
                        </div>
                        {isSelected && (
                          <span className="inline-block w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400" />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-mono font-bold tracking-wider text-slate-900 bg-amber-400 hover:bg-amber-300 hover:shadow-md hover:shadow-amber-400/10 active:scale-95 px-3.5 py-2 rounded-lg transition-all border border-amber-300 shadow-sm cursor-pointer outline-none"
            id="cta-nav-coffee"
            title="Buy Remy a Coffee"
          >
            <Coffee className="w-3.5 h-3.5 text-slate-900 fill-slate-900 animate-pulse" />
            <span className="hidden xs:inline uppercase">{t('nav.coffee')}</span>
          </button>

          {/* Social Quick Contact (Dynamic Hover CTA) */}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, 'contact')}
            className="hidden sm:inline-flex items-center space-x-1 text-xs font-mono font-medium tracking-wider text-white bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 px-4 py-2 rounded-lg transition-all font-bold uppercase whitespace-nowrap"
            id="cta-nav-contact"
          >
            {t('nav.hire')}
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
              {/* Mobile Language Grid Option */}
              <div className="border-t border-slate-100 dark:border-slate-800/60 pt-3 my-1">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase font-bold select-none text-left flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-blue-500" />
                    <span>{t('nav.language')}</span>
                  </div>
                  {/* Online tick for language div on mobile */}
                  <div className="flex items-center space-x-1.5 bg-emerald-500/10 dark:bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/20 dark:border-emerald-500/10">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[8px] font-mono font-black tracking-wider text-emerald-600 dark:text-emerald-400 uppercase select-none">
                      {t('status.online')}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {languagesList.map((langItem) => {
                    const isSelected = language === langItem.code;
                    return (
                      <button
                        key={langItem.code}
                        onClick={() => {
                          setLanguage(langItem.code);
                        }}
                        className={`py-2 px-1 text-center rounded-xl border font-sans text-[11px] font-bold transition-all focus:outline-none select-none cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <span className="text-base leading-none">{langItem.flag}</span>
                        <span className="font-sans font-semibold">{langItem.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Online status badge */}
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 dark:border-emerald-500/10 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase select-none">
                    REMY • {t('status.online')}
                  </span>
                </div>
                <span className="text-[9px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">{t('status.active')}</span>
              </div>

              <button
                onClick={() => {
                  setIsCoffeeOpen(true);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 text-sm font-mono tracking-widest text-slate-900 bg-amber-400 hover:bg-amber-300 py-3 rounded-lg shadow-sm font-bold border border-amber-300 cursor-pointer outline-none uppercase"
              >
                <Coffee className="w-4 h-4 text-slate-900 fill-slate-900 animate-pulse" />
                <span>{t('nav.buy_coffee')}</span>
              </button>
              <a
                href="#contact"
                onClick={(e) => {
                  handleClick(e, 'contact');
                  setIsOpen(false);
                }}
                className="w-full text-center text-sm font-mono tracking-widest text-white bg-blue-600 hover:bg-blue-500 py-3 rounded-lg shadow-md font-bold uppercase"
              >
                {t('nav.hire')}
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

      {/* Mobile Floating Bottom Language Switcher */}
      <div 
        className="sm:hidden fixed bottom-6 right-6 z-[999] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-2xl flex items-center justify-center space-x-1"
        id="mobile-floating-language-bar"
      >
        <div className="relative flex h-2 w-2 mx-1.5" id="mobile-float-online-indicator">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        {languagesList.map((langItem) => {
          const isSelected = language === langItem.code;
          return (
            <button
              key={langItem.code}
              onClick={() => setLanguage(langItem.code)}
              className={`py-1 px-2.5 rounded-xl text-[10px] font-black tracking-wider transition-all cursor-pointer flex items-center space-x-1 uppercase ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span className="text-xs leading-none">{langItem.flag}</span>
              <span className="font-mono text-[9px]">{langItem.code}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
