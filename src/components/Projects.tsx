import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Library, Compass, Play, Search, Grid, ArrowRight, Video, Tv, Film, Calendar, Clapperboard, X, ChevronLeft, ChevronRight, Sliders, Sparkles, Check } from 'lucide-react';
import { usePortfolio } from '../data_context';

export default function Projects() {
  const { projectsData, language, t } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'frontend' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  // FastMovie Interactive State
  const [fastMovieSearch, setFastMovieSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('HOME');
  const [carouselOffset, setCarouselOffset] = useState(0);

  const categories = [
    { id: 'all', label: language === 'rw' ? 'Yose' : language === 'fr' ? 'Tous les Projets' : 'All Projects' },
    { id: 'frontend', label: language === 'rw' ? 'Mbere (Frontend)' : language === 'fr' ? 'Client (Frontend)' : 'Frontend UI/UX' },
    { id: 'fullstack', label: language === 'rw' ? 'Inyuma & Full Stack' : language === 'fr' ? 'Serveur & API (Full Stack)' : 'Full Stack & APIs' }
  ];

  const filteredProjects = projectsData.filter(project => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  // Helper translation mapping for projects to load premium translated descriptors
  const getProjectLocalizedDetails = (id: string, defTitle: string, defDesc: string) => {
    if (language === 'rw') {
      switch (id) {
        case 'fastmovie':
          return {
            title: 'Urubuga rya FastMovie',
            description: 'Urubuga rwihariwe rwa sinema rufite imiterere ishimishije ihendutse kandi igaragara neza kuri buri gikoresho zisesengura amakuru.'
          };
        case 'movie-series-platform':
          return {
            title: 'Urubuga rw’amafilime n’uruhererekane',
            description: 'Uburyo bwo gushakisha amafilime n\'urutonde rwayo rukomatanyije na sisitemu yo gupima amanota arimo n’ayo kuri IMDB.'
          };
        case 'admin-dashboard':
          return {
            title: 'Interactive Admin Dashboard',
            description: 'Ikigo cy\'iterambere kigaragaza amashusho arebana n’ibarurishamibare ry’abakoresha ku buryo bunoze.'
          };
        case 'jwt-auth-system':
          return {
            title: 'Sisitemu y’Umutekano rya JWT',
            description: 'Sisitemu y\'umutekano ishingiye kuri token za JWT, hashing y’ijambo ry’ibanga, no gucunga neza imiyoborere.'
          };
        case 'portfolio-website':
          return {
            title: 'Futuristic Portfolio',
            description: 'Urubuga mpanzanyigisho rwubatswe neza hagamijwe kugaragaza ibyo nshoboye gukora n’ibyo nagezeho mu buryo bwa glassmorphism.'
          };
        case 'fullstack-crud-app':
          return {
            title: 'Porogaramu ya Full Stack CRUD',
            description: 'Uburyo bwashyizweho bwo gucunga no guhindura amakuru y’abakoresha benshi icyarimwe binyuze kuri database nshingiramashusho.'
          };
      }
    } else if (language === 'fr') {
      switch (id) {
        case 'fastmovie':
          return {
            title: 'Site Web FastMovie',
            description: 'Un portail cinématographique haut de gamme conçu avec un design sombre élégant, des capsules lumineuses et un affichage de contenu fluide.'
          };
        case 'movie-series-platform':
          return {
            title: 'Plateforme de Films & Séries',
            description: "Moteur de recherche dynamique de films intégrant la liste des acteurs, les playlists favorites de l'utilisateur et les évaluations de notes IMDB de haute précision."
          };
        case 'admin-dashboard':
          return {
            title: 'Tableau de Bord Administrateur',
            description: 'Un centre de contrôle de style néomorphe moderne affichant des graphiques analytiques, le suivi des utilisateurs et le statut des tâches.'
          };
        case 'jwt-auth-system':
          return {
            title: 'Sécurité d\'Accès par Jetons JWT',
            description: 'Un portail de gestion d\'accès sécurisé prêt pour la production utilisant les jetons JWT, le salage des mots de passe et le contrôle de session robuste.'
          };
        case 'portfolio-website':
          return {
            title: 'Portefeuille Interactif',
            description: 'Ma plateforme actuelle développée pour valoriser mes aptitudes de développeur avec un design moderne et adaptatif de haute technologie.'
          };
        case 'fullstack-crud-app':
          return {
            title: 'Application de Gestion CRUD',
            description: 'Un outil complet de gestion d\'utilisateurs multi-comptes avec une synchronisation en temps réel et des validations de schémas de données SQL.'
          };
      }
    }
    return { title: defTitle, description: defDesc };
  };

  // FastMovie Mock Movies
  const fastMovieData = [
    { title: 'Slaxx', year: 2026, genre: 'Horror', tag: language === 'rw' ? 'Gaheza' : language === 'fr' ? 'Exclusif' : 'Exclusive', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80' },
    { title: 'Rocky Experience', year: 2025, tag: 'IMAX Series', genre: 'Action', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=80' },
    { title: 'Limitless Loop', year: 2026, tag: language === 'rw' ? 'Gaheza' : language === 'fr' ? 'Premium' : 'Exclusive', genre: 'Sci-Fi', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=80' },
    { title: 'Dark Void', year: 2024, tag: language === 'rw' ? 'Filime' : language === 'fr' ? 'Film' : 'Movie', genre: 'Thriller', image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&auto=format&fit=crop&q=80' },
    { title: 'Silent Run', year: 2025, tag: language === 'rw' ? 'Gaheza' : language === 'fr' ? 'Drame' : 'Exclusive', genre: 'Drama', image: 'https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?w=400&auto=format&fit=crop&q=80' }
  ];

  const filteredFastMovies = fastMovieData.filter(m => 
    m.title.toLowerCase().includes(fastMovieSearch.toLowerCase()) ||
    m.genre.toLowerCase().includes(fastMovieSearch.toLowerCase())
  );

  const localizedSubtitle = language === 'rw'
    ? 'Igerageza ry’imishinga igezweho yibanda kuri tokenization, inyigo y’amakuru, porogaramu zishimiwe, n’ububiko bwizihiye amakode.'
    : language === 'fr'
    ? 'Un catalogue complet d’applications axées sur des routes sécurisées par jetons, l’affichage dynamique, des interfaces utilisateur d’avant-garde et des bases de données de haute voltige.'
    : 'A comprehensive catalog of applications focused on tokenized routes, clean data rendering, custom UX, and efficient databases.';

  return (
    <section
      id="projects"
      className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Decorative vector meshes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] left-[8%] w-[28rem] h-[28rem] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-blue-50/50 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="projects-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16" id="projects-header">
          <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-widest bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
            {t('projects.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-900 dark:text-slate-100 mb-2">
            {t('projects.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-350 max-w-xl text-center text-sm leading-relaxed">
            {localizedSubtitle}
          </p>
          <div className="h-1 w-12 bg-blue-600 rounded-full" />
        </div>

        {/* Categories Controls */}
        <div className="flex justify-center mb-12 animate-none" id="projects-filters">
          <div className="inline-flex p-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            {categories.map((cat) => {
              const isActive = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id as any)}
                  className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 relative focus:outline-none cursor-pointer ${
                    isActive
                      ? 'text-white shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                  id={`project-tab-${cat.id}`}
                >
                  <span className="relative z-10">{cat.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeProjCategory"
                      className="absolute inset-0 bg-blue-600 rounded-xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const info = getProjectLocalizedDetails(project.id, project.title, project.description);
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-850 hover:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col rounded-3xl overflow-hidden hover:-translate-y-1.5"
                  id={`project-card-${project.id}`}
                >
                  {/* Image Display Frame with Overlay */}
                  <div className="relative aspect-video overflow-hidden bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-850">
                    <img
                      src={project.image}
                      alt={info.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      id={`project-img-${project.id}`}
                    />
                    
                    {/* Hover interactive glass button shelf overlay */}
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/25 hover:scale-110 active:scale-95 transition-all text-xs flex items-center space-x-2"
                        title={t('projects.view_github')}
                        id={`proj-github-${project.id}`}
                      >
                        <Github className="w-5 h-5" />
                        <span className="font-mono text-[10px] tracking-wider font-bold">REPOS</span>
                      </a>
                      
                      {project.liveUrl !== '#' && (
                        project.liveUrl === '#fastmovie' ? (
                          <button
                            onClick={() => setSelectedProject('fastmovie')}
                            className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white hover:scale-110 active:scale-95 transition-all text-xs flex items-center space-x-2 shadow-lg shadow-blue-550/35 cursor-pointer font-bold"
                            title={t('projects.cinematic_title')}
                            id={`proj-live-${project.id}`}
                          >
                            <ExternalLink className="w-5 h-5" />
                            <span className="font-mono text-[10px] tracking-wider font-bold">LIVE DESIGN</span>
                          </button>
                        ) : (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white hover:scale-110 active:scale-95 transition-all text-xs flex items-center space-x-2 shadow-lg shadow-blue-500/35"
                            title={t('projects.live_demo')}
                            id={`proj-live-${project.id}`}
                          >
                            <ExternalLink className="w-5 h-5" />
                            <span className="font-mono text-[10px] tracking-wider font-bold">LIVE</span>
                          </a>
                        )
                      )}
                    </div>

                    {/* Top-right category Pill */}
                    <span className="absolute top-4 right-4 z-10 font-mono text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-3 py-1.5 rounded-full shadow-sm">
                      {project.category === 'fullstack' ? 'Full Stack' : 'Frontend'}
                    </span>
                  </div>

                  {/* Info Text block */}
                  <div className="p-6 flex flex-col flex-1" id={`project-content-${project.id}`}>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors mb-2.5 font-sans leading-snug">
                      {info.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                      {info.description}
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5" id={`project-techs-${project.id}`}>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] font-semibold text-slate-605 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 border border-slate-201 dark:border-slate-800 px-2.5 py-1 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Readability link list for mobile displays */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 sm:hidden">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-slate-600 dark:text-slate-450"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code Repo</span>
                      </a>
                      
                      {project.liveUrl !== '#' && (
                        project.liveUrl === '#fastmovie' ? (
                          <button
                            onClick={() => setSelectedProject('fastmovie')}
                            className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-blue-600 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Design</span>
                          </button>
                        ) : (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-blue-600"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )
                      )}
                    </div>
                    
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Exquisite FastMovie High-Fidelity Interactive Modal Setup */}
      <AnimatePresence>
        {selectedProject === 'fastmovie' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/95 dark:bg-slate-950/98 backdrop-blur-md overflow-y-auto overflow-x-hidden flex flex-col justify-start items-center py-6 px-4 sm:px-6"
            id="fastmovie-fullscreen-overlay"
          >
            {/* Modal Exit Header Anchor */}
            <div className="max-w-7xl w-full flex justify-between items-center mb-6 z-30 relative py-2">
              <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>
                  {language === 'rw' ? "FASTMOVIE INTERACTIVE WORKSPACE" : language === 'fr' ? "ESPACE INTERACTIF FASTMOVIE" : "FASTMOVIE INTERACTIVE WORKSPACE"}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white active:scale-95 transition-all font-sans text-xs flex items-center space-x-1 px-4 cursor-pointer"
                id="close-fastmovie-modal"
              >
                <X className="w-4 h-4" />
                <span className="font-bold">
                  {language === 'rw' ? 'Sohokamo' : language === 'fr' ? "Quitter l'Espace" : 'Exit Workspace'}
                </span>
              </button>
            </div>

            {/* Simulated Live Viewport matching user's screenshot layout */}
            <div 
              className="max-w-7xl w-full rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.12)] relative overflow-hidden flex flex-col pt-4 pb-12 px-4 sm:px-8 text-left"
              id="simulated-fastmovie-viewport"
            >
              {/* Outer Neon Glow Layer */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

              {/* SECTION: 1. Capsule Header */}
              <div 
                className="w-full rounded-2xl border border-blue-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 z-40 relative shadow-[0_0_20px_rgba(37,99,235,0.04)] mb-10"
                id="capsule-hdr"
              >
                {/* Logo with Blue Circle */}
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center font-sans shadow-[0_0_15px_rgba(37,99,235,0.25)] text-lg">
                    F
                  </div>
                  <span className="font-black text-xl tracking-wider text-slate-900 dark:text-slate-100 font-sans sm:text-2xl">
                    FASTMOVIE
                  </span>
                </div>

                {/* Simulated Navigation items with active Pill */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3" id="fastmovie-tabs">
                  {[
                    { id: 'HOME', label: language === 'rw' ? 'AHABANZA' : language === 'fr' ? 'ACCUEIL' : 'HOME' },
                    { id: 'MOVIES', label: language === 'rw' ? 'AMAFILIME' : language === 'fr' ? 'FILMS' : 'MOVIES' },
                    { id: 'SERIES', label: language === 'rw' ? 'URUHEREREKANE' : language === 'fr' ? 'SÉRIES' : 'SERIES' },
                    { id: 'TRENDING', label: language === 'rw' ? 'IGEZEWEHO' : language === 'fr' ? 'TENDANCES' : 'TRENDING' },
                    { id: 'CONTACT', label: language === 'rw' ? 'TWANDIKIRE' : language === 'fr' ? 'CONTACT' : 'CONTACT' }
                  ].map((btn) => {
                    const isTabActive = activeCategory === btn.id;
                    return (
                      <button
                        key={btn.id}
                        onClick={() => setActiveCategory(btn.id)}
                        className={`text-[11px] sm:text-xs font-black tracking-widest px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                          isTabActive
                            ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] font-extrabold scale-105'
                            : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'
                        }`}
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </div>

                {/* Right Area: Search input + Link + grid */}
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 font-sans">
                  <span className="text-[11px] font-black tracking-widest text-blue-600 hover:underline cursor-pointer hidden sm:inline">
                    FASTMOVIE.COM
                  </span>

                  {/* Search bar widget */}
                  <div className="relative" id="fastmovie-search-wrap">
                    <input
                      type="text"
                      placeholder={language === 'rw' ? 'Shaka filime' : language === 'fr' ? 'Chercher un film' : 'Search movie'}
                      value={fastMovieSearch}
                      onChange={(e) => setFastMovieSearch(e.target.value)}
                      className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-3 px-8 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-600 w-36 sm:w-44 transition-all"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-405 absolute left-3 top-2.5" />
                    {fastMovieSearch && (
                      <button 
                        onClick={() => setFastMovieSearch('')}
                        className="text-slate-500 absolute right-2 top-2.5 text-[9px] font-mono hover:text-slate-800 border bg-white dark:bg-slate-900 px-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        CLR
                      </button>
                    )}
                  </div>

                  {/* Icon grid menu */}
                  <div className="p-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-500 transition-all shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                    <Grid className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Category-Specific dynamic text if searched */}
              {fastMovieSearch && (
                <div className="mb-6 p-3 bg-blue-50/80 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 text-xs text-blue-650 dark:text-blue-400 rounded-xl flex items-center justify-between">
                  <span>Filtered FastMovie catalog for keyword: "{fastMovieSearch}"</span>
                  <button onClick={() => setFastMovieSearch('')} className="underline text-slate-700 dark:text-slate-305 hover:text-blue-600 font-bold">Show All</button>
                </div>
              )}

              {/* SECTION: 2. Core Inner Hero Design */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 relative" id="fastmovie-hero-body">
                {/* Space backdrop decor lights */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

                {/* Main description Left Column (7 cols) */}
                <div className="lg:col-span-7 flex flex-col space-y-6 relative z-10" id="fastmovie-hero-text">
                  
                  {/* Tagline */}
                  <div className="flex items-center space-x-2 text-xs font-black tracking-widest text-blue-600 dark:text-blue-450 uppercase">
                    <span className="text-lg font-black leading-none">|</span>
                    <span>
                      {language === 'rw' ? 'IMYIDAGADURO IDAHEZWANWA' : language === 'fr' ? 'DIVERTISSEMENTS SANS LIMITES' : 'LIMITLESS ENTERTAINMENT'}
                    </span>
                  </div>

                  {/* Gigantic Title - Matches screenshot styled elements */}
                  <div className="space-y-1 sm:space-y-2">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-black font-sans leading-none text-slate-900 dark:text-slate-100 block">
                      {language === 'rw' ? 'AMAFILIME' : language === 'fr' ? 'FILMS' : 'UNLIMITED'}{' '}
                      <span className="text-blue-600 drop-shadow-[0_0_20px_rgba(37,99,235,0.15)]">
                        {language === 'rw' ? 'ADAHAGARARA' : language === 'fr' ? 'ILLIMITÉS' : 'MOVIES'}
                      </span>
                    </h1>
                    
                    {/* Highlighter secondary phrase ANYTIME, ANYWHERE */}
                    <div className="inline-block relative">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-sans tracking-wide text-slate-805 dark:text-slate-205 uppercase flex items-center space-x-1">
                        <span>
                          {language === 'rw' ? 'BURI GIHE, HOSE REKERA' : language === 'fr' ? 'À TOUT MOMENT, OU QU’ON SOIT' : 'ANYTIME, ANYWHERE'}
                        </span>
                      </h3>
                      <div className="h-1 bg-gradient-to-r from-blue-500 to-transparent rounded w-full mt-1.5 shadow-[0_2px_10px_rgba(37,99,235,0.2)]" />
                    </div>
                  </div>

                  {/* Paragraph bio */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
                    {language === 'rw' 
                      ? 'Sama neza amashusho agezweho n’uruhererekane rw’amafilime. Injira mu muneshero wa sinema yose hamwe ukoresheje sisitemu inoze.' 
                      : language === 'fr' 
                      ? 'Regardez les derniers grands succès et les séries exclusives. Plongez dans un univers cinématographique unique et réactif.' 
                      : 'Stream the latest blockbusters, cult classics, and exclusive series. Dive into a world of cinematic stories — all in one place.'}
                  </p>

                  {/* Dual pill button rows */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <button 
                      onClick={() => alert('Streaming of "Slaxx (2026)" is initializing securely. Enjoy high-fidelity playback!')}
                      className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center space-x-2 shadow-[0_5px_20px_rgba(37,99,235,0.25)] cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white text-white" />
                      <span>
                        {language === 'rw' ? 'Kugenzura Nonahe' : language === 'fr' ? 'Explorer Maintenant' : 'Explore Now'}
                      </span>
                    </button>

                    <button 
                      onClick={() => alert('FastMovie exclusive trailer initializing... (Cinematic Audio System Booting)')}
                      className="px-8 py-3.5 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 text-slate-800 dark:text-slate-200 border-2 border-blue-600 font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Film className="w-4 h-4 text-blue-600" />
                      <span>
                        {language === 'rw' ? 'Reba Trailer' : language === 'fr' ? 'Bande-Annonce' : 'Watch Trailer'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Cascading Poster Stack (5 cols) */}
                <div className="lg:col-span-5 flex justify-center items-center relative py-6" id="poster-layout-stack">
                  {/* Dynamic Stack representation from snapshot */}
                  <div className="relative w-72 h-96 sm:w-80 sm:h-[420px]" id="poster-stack-container">
                    
                    {/* Background Poster 2: Rocky Series IMAX (shifted, tilted right) */}
                    <div className="absolute top-4 left-10 w-48 h-72 sm:w-56 sm:h-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl rotate-6 transform opacity-40 hover:opacity-100 transition-opacity duration-300 pointer-events-none sm:pointer-events-auto">
                      <div className="absolute top-3 left-3 bg-blue-600 text-white font-mono font-black text-[8px] px-2 py-0.5 rounded uppercase">
                        IMAX Series
                      </div>
                      <img 
                        src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop&q=80" 
                        alt="Rocky poster" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-900/80 to-transparent">
                        <div className="text-[10px] font-mono text-white">ROCKY EXPERIENCE</div>
                      </div>
                    </div>

                    {/* Background Poster 3: Limitless Loop (shifted left, tilted left) */}
                    <div className="absolute top-8 -left-6 w-48 h-72 sm:w-56 sm:h-80 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xl -rotate-12 transform opacity-30 hover:opacity-100 transition-opacity duration-300 pointer-events-none sm:pointer-events-auto">
                      <div className="absolute top-3 right-3 bg-white border border-blue-600 text-blue-600 font-mono text-[8px] px-2 py-0.5 rounded uppercase">
                        PREMIUM
                      </div>
                      <img 
                        src="https://images.unsplash.com/photo-1542204172-e7052809f852?w=400&auto=format&fit=crop&q=80" 
                        alt="Poster 3" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </div>

                    {/* Foregrounds Main Poster Card: Slaxx (Centered, scaled up!) */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="absolute top-12 left-6 w-52 h-[340px] sm:w-[230px] sm:h-[370px] rounded-3xl bg-white border-2 border-blue-600 overflow-hidden shadow-[0_15px_40px_rgba(37,99,235,0.2)] z-30"
                      id="foreground-slaxx-card"
                    >
                      {/* Top stickers from screenshot */}
                      <div className="absolute top-3 left-3 bg-white text-blue-600 font-mono font-black text-[9px] px-2 py-1 rounded border border-blue-300 uppercase tracking-widest">
                        {language === 'rw' ? 'Gaheza' : language === 'fr' ? 'Exclusif' : 'Exclusive'}
                      </div>
                      <div className="absolute top-3 right-3 bg-blue-600 text-white font-mono font-black text-[8px] px-2 py-1 rounded flex items-center space-x-0.5 uppercase tracking-widest shadow-[0_0_10px_rgba(37,99,235,0.3)]">
                        <Video className="w-2.5 h-2.5" />
                        <span>{language === 'rw' ? 'Filime' : language === 'fr' ? 'Film' : 'Movie'}</span>
                      </div>

                      {/* Poster background representation */}
                      <div className="w-full h-2/3 bg-slate-50 relative">
                        <img 
                          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80" 
                          alt="Slaxx pants" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover brightness-95 contrast-110" 
                        />
                        {/* Red stylized title on image - matches the blood SLAXX style */}
                        <div className="absolute inset-x-0 bottom-4 text-center">
                          <span 
                            className="font-extrabold text-3xl font-sans text-red-600 tracking-black select-none uppercase"
                            style={{ textShadow: '0 0 10px rgba(220,38,38,0.8), 0 0 20px rgba(0,0,0,1)' }}
                          >
                            Slaxx
                          </span>
                        </div>
                      </div>

                      {/* Information panel */}
                      <div className="h-1/3 bg-slate-50 p-4 font-sans text-left flex flex-col justify-end space-y-1 border-t border-slate-100">
                        <h4 className="font-extrabold font-sans text-slate-800 text-base leading-none">
                          Slaxx
                        </h4>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono mt-1">
                          <span className="flex items-center space-x-0.5 text-blue-600">
                            <Calendar className="w-3 h-3 text-blue-500" />
                            <span>2026</span>
                          </span>
                          <span>•</span>
                          <span className="text-blue-600 font-bold">{language === 'rw' ? 'Umutekano Muke' : language === 'fr' ? 'Horreur' : 'Horror'}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* SECTION: 3. Recently Added footer with carousel arrows */}
              <div className="mt-6 border-t border-slate-200 pt-10" id="fastmovie-bottom-section">
                
                {/* Header label and Arrows */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2.5 text-xs sm:text-sm font-black text-slate-900 uppercase font-sans">
                    <span className="text-lg font-black text-blue-600">|</span>
                    <Tv className="w-5 h-5 text-blue-600" />
                    <span>
                      {language === 'rw' ? 'AHERUTSE KWONGERWAHO' : language === 'fr' ? 'AJOUTÉS RÉCEMMENT' : 'Recently Added'}
                    </span>
                  </div>

                  {/* Circle outline arrow indicators */}
                  <div className="flex items-center space-x-2.5">
                    <button 
                      onClick={() => setCarouselOffset(prev => Math.max(prev - 220, 0))}
                      className="p-2 sm:p-2.5 rounded-full border border-blue-500/50 text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setCarouselOffset(prev => prev + 220)}
                      className="p-2 sm:p-2.5 rounded-full border border-blue-500/50 text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Horizontal slider list */}
                <div className="overflow-hidden relative" id="carousel-frame">
                  <motion.div 
                    animate={{ x: -carouselOffset }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="flex space-x-5"
                  >
                    {filteredFastMovies.length > 0 ? (
                      filteredFastMovies.map((movie, index) => (
                        <div 
                          key={index}
                          className="w-48 sm:w-56 bg-white border border-slate-200 rounded-2xl overflow-hidden shrink-0 group hover:border-blue-600 transition-all cursor-pointer shadow-sm text-left"
                          onClick={() => alert(`Streaming initialized for "${movie.title}"`)}
                        >
                          <div className="h-32 bg-slate-50 relative overflow-hidden">
                            <img 
                              src={movie.image} 
                              alt={movie.title} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            {/* Sticker Pill */}
                            <span className="absolute top-2.5 left-2.5 bg-white text-blue-600 font-mono text-[7px] font-bold px-1.5 py-0.5 border border-blue-200 rounded uppercase">
                              {movie.tag}
                            </span>
                          </div>
                          <div className="p-3 bg-white font-sans border-t border-slate-100">
                            <h5 className="font-extrabold text-xs text-slate-800 truncate">{movie.title}</h5>
                            <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 mt-1.5">
                              <span>{movie.year}</span>
                              <span className="text-blue-600 font-bold">{movie.genre}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-10 text-center w-full text-xs text-slate-550">
                        {language === 'rw' 
                          ? 'Nta filime ihuje n’ishakisha ryawe ibonetse muri FastMovie cache.' 
                          : language === 'fr' 
                          ? 'Aucun film correspondant ne se trouve dans le cache FastMovie.' 
                          : 'No movie matching search criteria is available in FastMovie cache.'}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Tiny Blue Bottom highlight - LATEST UPDATES banner line */}
                <div className="mt-12 text-center border-t border-blue-500/20 pt-5">
                  <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase hover:underline cursor-pointer">
                    {language === 'rw' ? 'IBYASIGAYE BISHYA' : language === 'fr' ? 'DERNIÈRES MISES À JOUR' : 'LATEST UPDATES'}
                  </span>
                  <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-2" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
