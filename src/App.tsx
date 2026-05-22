import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
  const isDarkMode = true; // Cinematic dark theme is default and persistent always
  const [loading, setLoading] = useState(true);

  // System boots loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); // Quick elegant loading time
    return () => clearTimeout(timer);
  }, []);

  // Dark mode class implementation
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white text-slate-900" id="app-root-wrapper">
      <AnimatePresence>
        {loading ? (
          /* Elegant Minimal RE Logo Loader Screen with white background */
          <motion.div
            key="preloader"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-slate-900 select-none"
            id="app-preloader"
          >
            {/* Subtle soft visual glow background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-amber-50 blur-[100px] pointer-events-none" />

            {/* Glowing RE lettermark badge with spinning outer orbit */}
            <div className="relative flex items-center justify-center" id="loading-re-logo">
              {/* Smooth spinning circular loading track */}
              <div className="absolute w-20 h-20 rounded-full border-2 border-slate-100" />
              <div className="absolute w-20 h-20 rounded-full border-t-2 border-r-2 border-amber-500 animate-spin" style={{ animationDuration: '0.9s' }} />

              {/* Pulsing inner solid black emblem containing 'RE' lettermark */}
              <motion.div
                animate={{ scale: [0.96, 1.04, 0.96] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center shadow-lg relative z-10 border border-slate-800"
              >
                <span className="text-xl font-extrabold font-sans tracking-tight text-white select-none">
                  RE
                </span>
              </motion.div>
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
            <Navbar isDarkMode={isDarkMode} />
            
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
