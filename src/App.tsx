import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from './data';

// Components import
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved !== null ? saved === 'dark' : true;
  });
  const [loading, setLoading] = useState(true);

  // System boots loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1850); // Quick elegant loading time
    return () => clearTimeout(timer);
  }, []);

  // Dark mode class implementation
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newVal = !prev;
      localStorage.setItem('theme', newVal ? 'dark' : 'light');
      return newVal;
    });
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100" id="app-root-wrapper">
      <AnimatePresence>
        {loading ? (
          /* Elegant Minimal RE Logo Loader Screen with theme-aware background */
          <motion.div
            key="preloader"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white select-none transition-colors duration-300"
            id="app-preloader"
          >
            {/* Subtle soft visual gradient glow background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-amber-200/30 via-orange-150/15 to-transparent dark:from-amber-600/10 dark:via-orange-500/5 blur-[140px] pointer-events-none" />

            {/* Main Interactive Loader Brand Hub */}
            <div className="relative flex flex-col items-center" id="loading-re-container">
              
              {/* Spinning Graphics Wrapper */}
              <div className="relative flex items-center justify-center w-36 h-36 mb-8" id="loading-re-logo">
                {/* 1. Futuristic Outer Ring with Tech Dash Lines */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="absolute inset-x-0 inset-y-0 rounded-full border-2 border-dashed border-amber-500/30 dark:border-amber-400/40"
                />

                {/* 2. Middle Orbit (Counter-Clockwise elegance, fast-spinning dual gold segments) */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute w-[124px] h-[124px] rounded-full border-2 border-transparent border-t-amber-500 border-b-amber-500"
                />

                {/* 3. Outer Ring Frame Glow aura */}
                <div className="absolute w-28 h-28 rounded-full bg-amber-400/10 dark:bg-amber-400/5 blur-xl animate-pulse" />

                {/* 4. Elegant custom golden-glowing solid circular emblem for "RE" */}
                <motion.div
                  animate={{ 
                    scale: [0.97, 1.03, 0.97],
                    boxShadow: [
                      "0 10px 30px -10px rgba(245, 158, 11, 0.3)",
                      "0 20px 40px -5px rgba(245, 158, 11, 0.45)",
                      "0 10px 30px -10px rgba(245, 158, 11, 0.3)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-[90px] h-[90px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-full flex flex-col items-center justify-center shadow-2xl relative z-10 border-2 border-amber-500"
                >
                  <div className="absolute inset-0.5 rounded-full border border-amber-400/20 bg-slate-900/60" />
                  
                  {/* Highly polished 'RE' emblem letters */}
                  <span className="text-3xl font-black font-sans tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 relative z-10 select-none">
                    RE
                  </span>

                  {/* Micro luxury horizontal line support */}
                  <div className="w-6 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent relative z-10 mt-0.5 opacity-60" />
                </motion.div>
                
                {/* 5. Delicate gold loading orb satellite orbiting the logo */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  className="absolute w-[124px] h-[124px]"
                >
                  <div className="w-3.5 h-3.5 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-full border-2 border-white dark:border-slate-800 absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-lg shadow-amber-500/40" />
                </motion.div>
              </div>

              {/* Sophisticated Logo details & Status Loader Text labels */}
              <div className="text-center space-y-2">
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="text-sm font-black font-sans tracking-[0.3em] text-slate-900 dark:text-slate-100 uppercase bg-clip-text"
                >
                  REMY WILLIAM
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-[9px] font-mono tracking-[0.18em] text-amber-650 dark:text-amber-550 uppercase font-black flex items-center justify-center gap-2"
                >
                  <span>STUDIO</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>PRELOADER</span>
                </motion.p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Normal portfolio layouts */
          <motion.div
            key="main-web"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            id="app-main-layout"
          >
            {/* Header Navbar */}
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            
            {/* Main sections wrapper */}
            <main>
              {/* Home / Hero Area */}
              <Hero />
              
              {/* About / Credentials */}
              <About />
              
              {/* Live Technical Skill Cards */}
              <Skills />
              
              {/* Interactive Projects Carousel */}
              <Projects />
              
              {/* Level 5 Education Progress Flow */}
              <Timeline />
              
              {/* Secure Email/Inquiry Forms */}
              <Contact />
            </main>

            {/* Footer and final branding */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
