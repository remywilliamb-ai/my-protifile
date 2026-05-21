import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, Shield, Sparkles } from 'lucide-react';

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
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('sys --initialize');

  const logOutputs = [
    'sys --initialize',
    'core --import remy_william_cv',
    'stack --bind level_5_software_dev',
    'geo --locate kigali_rwanda_africa',
    'assets --fetch cinematic_fastmovie_theme',
    'status --application_ready'
  ];

  // System boots loading progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 600);
            return 100;
          }
          
          // Speed up progressively
          const increment = Math.floor(Math.random() * 8) + 4;
          const nextProgress = Math.min(prev + increment, 100);

          // Rotate developer log text outputs matching percentage sections
          const index = Math.min(
            Math.floor((nextProgress / 100) * logOutputs.length),
            logOutputs.length - 1
          );
          setLoadingText(logOutputs[index]);

          return nextProgress;
        });
      }, 90);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Dark mode class implementation
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white text-slate-900" id="app-root-wrapper">
      <AnimatePresence>
        {loading ? (
          /* Cinematic cybernetic loader screen with white background */
          <motion.div
            key="preloader"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-slate-900 select-none"
            id="app-preloader"
          >
            {/* Background cyber light glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-100 blur-[120px] pointer-events-none" />

            {/* Glowing developer emblem */}
            <div className="relative mb-6" id="loading-emblem">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/30 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="relative p-6 rounded-full bg-slate-50 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.05)] text-blue-600">
                <Cpu className="w-8 h-8 animate-pulse" />
              </div>
            </div>

            {/* Pulsing welcome header */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6 px-4"
              id="loader-welcome"
            >
              <h2 className="text-sm sm:text-base font-extrabold font-sans tracking-[0.2em] text-blue-600 uppercase drop-shadow-[0_0_12px_rgba(59,130,246,0.1)] flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 animate-pulse text-blue-600 shrink-0" />
                <span>WELCOME TO REMY PROTIFILE</span>
                <Sparkles className="w-4 h-4 animate-pulse text-blue-600 shrink-0" />
              </h2>
            </motion.div>

            {/* Custom high-tech diagnostic values */}
            <div className="w-80 flex flex-col items-stretch text-left space-y-3 font-mono" id="diag-container">
              
              {/* Spinning progress details */}
              <div className="flex justify-between text-xs text-blue-650">
                <span className="flex items-center space-x-1">
                  <Terminal className="w-3 h-3 text-blue-650" />
                  <span className="animate-pulse">{loadingText}</span>
                </span>
                <span className="font-bold">{progress}%</span>
              </div>

              {/* Progress bar boundary */}
              <div className="relative w-full h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Minimal hardware signature nodes */}
              <div className="flex justify-between items-center text-[9px] text-slate-400 pt-1">
                <span className="flex items-center space-x-1">
                  <Shield className="w-2.5 h-2.5 text-blue-550" />
                  <span>SECURE_SESSION_ACTIVE</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-2.5 h-2.5 text-blue-500" />
                  <span>KGL_RW_L5</span>
                </span>
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
