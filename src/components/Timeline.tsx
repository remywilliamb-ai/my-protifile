import { motion } from 'motion/react';
import { Calendar, Award, Code2, Cpu, CheckCircle2, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../data_context';

export default function Timeline() {
  const { timelineData, language, t } = usePortfolio();
  // Mapping milestones to appropriate status icons
  const iconsList = [Award, Code2, Cpu, CheckCircle2];

  const getLocalizedTimelineNode = (index: number, defTitle: string, defSubtitle: string, defDesc: string, defSkills: string[]) => {
    if (language === 'rw') {
      switch (index) {
        case 0:
          return {
            title: 'Ibyibanze kuri ICT & Hardware',
            subtitle: 'Kwinjira mu masomo n’Ihuza ry’Ibyuma',
            description: 'Ntangira amasomo ya Software Development ku rwego rwa Level 5, niga ibijyanye no guhuza imiyoboro, guteranya ibyuma bya mudasobwa, algorithm zibanze, n\'uburyo bwo kubika amakuru.',
            skills: ['Guhuza Imiyoboro', 'Sizitemu z\'Imikoreshereze', 'Guteranya Mudasobwa', 'Ikorwa rya Algorithm']
          };
        case 1:
          return {
            title: 'Mbere kuri Web (Frontend Engineering)',
            subtitle: 'Impfunguzo n\'Amashusho agezweho ya UX',
            description: 'Ninjiyemo neza nshakashaka imyandikire ya HTML5, CSS3, gushushanya na Tailwind CSS, ndetse no gukoresha JavaScript ifatika.',
            skills: ['Semantic HTML5 / CSS3', 'JavaScript ES6+', 'Tailwind CSS', 'Umutekano kuri Mobile']
          };
        case 2:
          return {
            title: 'Gukora Imbuga na React',
            subtitle: 'Gucunga State, Inzira za Route, n\'Ibice bigize Porogaramu',
            description: 'Nateye imbere mu gukora izi mbuga nshingiye kuri React hooks, gukoresha ama-APIs anyuranye amakuru yinjira, n\'amashusho meza aremwe hagamijwe korohereza abakoresha.',
            skills: ['Gukoresha React.js', 'Context API / State', 'Guhuza Web APIs', 'Amashusho ya motion']
          };
        case 3:
          return {
            title: 'Gushyiraho Inyuma (Backend) na Security',
            subtitle: 'Servers za Node, Express, na Database zo mu bwoko bwa DB',
            description: 'Nasoje neza ikoranabuhanga arebana na server-side akoresha Node.js hamwe na Express.js, kubika neza amakuru kuri MySQL cyangwa MongoDB, ndetse no kurinda umutekano munyuze kuri token za JWT.',
            skills: ['NodeJS / ExpressJS', 'Kurema REST APIs', 'MySQL / MongoDB', 'Gukoresha JWT Token']
          };
      }
    } else if (language === 'fr') {
      switch (index) {
        case 0:
          return {
            title: 'Bases des TIC & Matériel Informatique',
            subtitle: 'Induction Académique & Intégration Systèmes',
            description: 'Début des études de programmation de niveau 5, maîtrise de l\'architecture des réseaux, assemblage de matériel, structure d\'algorithmes et bases de données.',
            skills: ['Réseaux Informatiques', 'Systèmes d\'Exploitation', 'Diagnostics Matériels', 'Conception d\'Algorithmes']
          };
        case 1:
          return {
            title: 'Ingénierie de la Partie Client (Frontend)',
            subtitle: 'Interfaces Adaptatives & Directives UX',
            description: 'Plongée profonde dans les bases du développement web : structuration sémantique HTML5/CSS3, intégration CSS moderne avec Tailwind et dynamisme via JavaScript.',
            skills: ['HTML5 sémantique & CSS3', 'JavaScript ES6+', 'Tailwind CSS', 'Maquettes Réactives']
          };
        case 2:
          return {
            title: 'Applications Dynamiques avec React.js',
            subtitle: 'Gestion d\'État Globale, Routage & Composants',
            description: 'Développement d\'interfaces interactives poussées en implémentant les hooks React, les requêtes asynchrones, et Framer Motion pour des animations captivantes.',
            skills: ['Framework React.js', 'Context API / Gestion d\'État', 'Intégration d\'APIs Web', 'Transitions avec motion']
          };
        case 3:
          return {
            title: 'Serveurs Robustes & Sécurité des APIs',
            subtitle: 'Architectures Node, API Express & Bases de Données SQL/NoSQL',
            description: 'Spécialisation finale de niveau 5 axée sur la logique de serveur en Node.js, la persistance des données avec MySQL ou MongoDB, et l\'implémentation d\'accès sécurisés via JWT.',
            skills: ['Architecture NodeJS / ExpressJS', 'Création d\'APIs REST', 'MySQL & MongoDB', 'Jetons de Sécurité JWT']
          };
      }
    }
    return { title: defTitle, subtitle: defSubtitle, description: defDesc, skills: defSkills };
  };

  return (
    <section
      id="journey"
      className="relative py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden border-t border-slate-100 dark:border-slate-900 transition-colors duration-300"
    >
      {/* Dynamic atmospheric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-blue-500/5 blur-[125px]" />
        <div className="absolute bottom-[10%] right-[3%] w-[32rem] h-[32rem] rounded-full bg-indigo-500/5 blur-[125px]" />
        
        {/* Futuristic circuit trace line */}
        <div className="absolute top-0 bottom-0 left-[50%] -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent hidden md:block" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="timeline-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-20" id="timeline-header">
          <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-500/20">
            {t('journey.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-900 dark:text-slate-100">
            {t('journey.header.title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl text-center text-sm leading-relaxed">
            {t('journey.header.desc')}
          </p>
          <div className="h-1 w-12 bg-blue-600 rounded-full" />
        </div>

        {/* Timeline body wrapper */}
        <div className="relative" id="timeline-body">
          {/* Vertical central spine line for desktop / left margin line for mobile */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 md:-translate-x-1/2" />

          {/* Cards collection */}
          <div className="space-y-12" id="timeline-events-list">
            {timelineData.map((ev, index) => {
              const IconComponent = iconsList[index % iconsList.length];
              const isEven = index % 2 === 0;
              const node = getLocalizedTimelineNode(index, ev.title, ev.subtitle, ev.description, ev.skillsAcquired);

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                  id={`timeline-node-${index}`}
                >
                  {/* Timeline node bullet locator element */}
                  <div className="absolute left-4 md:left-1/2 top-4 md:top-8 -translate-x-[15px] md:-translate-x-1/2 z-20 flex items-center justify-center w-[32px] h-[32px] rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)] text-blue-600 dark:text-blue-405 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>

                  {/* Context Card Box container (alternating side spacing on desktop) */}
                  <div
                    className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                      isEven ? 'md:pr-12 text-left' : 'md:pl-12 text-left'
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group block relative"
                      id={`timeline-card-${index}`}
                    >
                      {/* Period indicator */}
                      <span className="inline-flex items-center space-x-1 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 py-1.5 px-3 rounded-full mb-4 border border-blue-100 dark:border-blue-500/20">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <span>{ev.period}</span>
                      </span>

                      {/* Header content */}
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-250 font-sans leading-tight">
                        {node.title}
                      </h3>
                      <h4 className="text-xs font-mono font-medium tracking-wide text-slate-400 dark:text-slate-500 uppercase mt-1 mb-4 leading-none font-semibold">
                        {node.subtitle}
                      </h4>

                      {/* Description narrative body */}
                      <p className="text-sm text-slate-505 dark:text-slate-400 leading-relaxed mb-6">
                        {node.description}
                      </p>

                      {/* Micro skill bullet highlights */}
                      <div className="border-t border-slate-100 dark:border-slate-800 pt-4" id={`timeline-skills-list-${index}`}>
                        <div className="text-[10px] uppercase font-mono tracking-widest text-slate-404 dark:text-slate-505 mb-2.5 font-bold">
                          {t('journey.skills_acquired')}
                        </div>
                        <div className="flex flex-wrap gap-1.5 text-left">
                          {node.skills.map((skill, subIdx) => (
                            <span
                              key={subIdx}
                              className="inline-flex items-center space-x-1 font-mono text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 px-2.5 py-1 rounded-md"
                            >
                              <ChevronRight className="w-2.5 h-2.5 text-blue-500 shrink-0" />
                              <span>{skill}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
