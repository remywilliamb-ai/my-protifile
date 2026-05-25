export type Language = 'en' | 'rw' | 'fr';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.journey': 'Journey',
    'nav.contact': 'Contact',
    'nav.coffee': 'COFFEE',
    'nav.hire': 'HIRE REMY',
    'nav.buy_coffee': 'BUY ME A COFFEE',
    'nav.developer': 'DEVELOPER',
    'nav.language': 'Language',

    // Hero
    'hero.tagline': 'Level 5 Software Developer Student • Rwanda 🇷🇼',
    'hero.hi': 'Hi, I am',
    'hero.typewriter_prefix': 'I am a ',
    'hero.explore': 'Explore Projects',
    'hero.get_in_touch': 'Get in Touch',
    'hero.status_label': 'Status',
    'hero.status_value': 'Ready to Code',

    // About
    'about.tag': 'About Me',
    'about.title': 'Driven by Purpose, Inspired by Technology',
    'about.subtitle': 'My Journey & Vision',
    'about.bio': 'I am a final-year software developer pursuing Level 5 Diploma goals in Rwanda. Our regional tech sphere is growing rapidly, and I aim to contribute high fidelity applications that simplify modern enterprise solutions. I leverage modern frontend architectures, reliable relational systems, and token encryption pipelines.',
    'about.contact_label': 'Direct Developer Contact',
    'about.buy_coffee_btn': 'Buy Me A Coffee',
    'about.support_title': 'Support My Development Journey',
    'about.support_desc': 'Thank you! Your support fuels clean coding and premium responsive layouts.',
    'about.momo_label': 'MOMO PAY (Rwanda):',
    'about.copy_code': 'Copy Code',
    'about.code_copied': 'Code Copied!',
    'about.stat.academics': 'Academics',
    'about.stat.techs': 'Core Techs',
    'about.stat.projects': 'Projects',

    // Highlight Points in About
    'about.point.0.title': 'Frontend UI/UX',
    'about.point.0.desc': 'Developing stunning, eye-catching, and interactive user interfaces utilizing glassmorphic overlays, layout animations, and responsive layouts.',
    'about.point.1.title': 'Backend Engineering',
    'about.point.1.desc': 'Architecting robust database workflows, token protection routes, RESTful endpoints, and logical systems backend designs.',
    'about.point.2.title': 'ICT System Integration',
    'about.point.2.desc': 'Deep core interest in computer networks, hardware diagnostic pipelines, OS configuration, and localized technology solutions.',
    'about.point.3.title': 'Level 5 Core Studies',
    'about.point.3.desc': 'Finalizing an exhaustive Software Development Diploma Curriculum in Rwanda, combining algorithmics with real team projects.',

    // About - Family Sub-section
    'about.family.tag': 'Personal Heritage',
    'about.family.title': 'My Family Pillar',
    'about.family.desc': 'Success is built upon a sturdy foundation of love, core values, and family guidance. Meet the family of Bizimana Ngabo Remy William:',
    
    'family.dad.name': 'Bizimana Felix',
    'family.dad.role': 'Father / Parent',
    'family.dad.desc': 'Guiding our household with wisdom, resourcefulness, and professional integrity.',
    
    'family.mom.name': 'Mukabyiringiro Anee',
    'family.mom.role': 'Mother / Parent',
    'family.mom.desc': 'Providing ultimate care, educational diligence, and warm core principles.',
    
    'family.brother.name': 'Kwizera Edison',
    'family.brother.role': 'Brother / Sibling',
    'family.brother.desc': 'Colleague, companion, and collaborative partner in research and learning.',
    
    'family.self.name': 'Remy William',
    'family.self.role': 'Born 2009 / Developer',
    'family.self.desc': 'Dedicated youngest developer, streamlining cinematic media engines and secure backends.',

    // Skills Section
    'skills.tag': 'Technical Arsenal',
    'skills.title': 'My Professional skills matrix & tools.',
    'skills.category.frontend': 'Frontend Dev',
    'skills.category.backend': 'Backend Core',
    'skills.category.database': 'Databases',
    'skills.category.other': 'Other Tools',

    // Projects Section
    'projects.tag': 'Recent Work',
    'projects.title': 'A selection of my personal projects, fully responsive and interactive.',
    'projects.tab.all': 'All Projects',
    'projects.tab.frontend': 'Frontend Dev',
    'projects.tab.fullstack': 'Full Stack / Secure Servers',
    'projects.live_demo': 'Live Demo',
    'projects.view_github': 'View GitHub',
    'projects.fastmovie_desc': 'Explore the gorgeous interactive FastMovie website demo directly inside your viewport below.',
    'projects.close_selector': 'Close Demo Player',
    'projects.cinematic_title': 'Interactive Cinematic Demo',

    // Journey / Timeline Section
    'journey.tag': 'Journey',
    'journey.header.tag': 'My Milestone Timeline',
    'journey.header.title': 'My Education & Milestones',
    'journey.header.desc': 'Interactive chronological flow displaying my levels, certifications, and academic induction.',
    'journey.skills_acquired': 'Skills Acquired:',

    // Contact Section
    'contact.tag': 'Get in Touch',
    'contact.title': "Let's work together to create something outstanding!",
    'contact.connect_title': 'Connect with Me',
    'contact.details.email': 'Professional Email',
    'contact.details.phone': 'Direct Contact number',
    'contact.details.location': 'Rwandan Technical Hub',
    'contact.form.title': 'Contact Form',
    'contact.form.name_label': 'Full Name',
    'contact.form.email_label': 'Professional Email Address',
    'contact.form.msg_label': 'Custom Inquiry Message',
    'contact.form.msg_placeholder': 'Type your message details here...',
    'contact.form.submit': 'Send Inquiry Message',
    'contact.form.sending': 'Sending...',
    'contact.toast.success': 'Message Sent!',
    'contact.toast.success_desc': 'Thank you for your inquiry, Remy will reach out soon.',
    'contact.toast.err_fields': 'Please fill in all input fields securely.',
    'contact.toast.err_server': 'Internal Server Error. Please contact via phone instead.',

    // Footer
    'footer.brand_title': 'BIZIMANA NGABO REMY WILLIAM',
    'footer.subtitle': 'Level 5 Software Developer Student',
    'footer.desc': 'Crafted to highlight secure backends and high-performance frontend interfaces.',
    'footer.copyright': '© 2026 Remy William Studio. All rights reserved.',

    // Status / Live Indicators
    'status.online': 'Online',
    'status.active': 'Active Now'
  },
  rw: {
    // Navigation
    'nav.home': 'Ahabanza',
    'nav.about': 'Ibyanjye',
    'nav.skills': 'Ubumenyi',
    'nav.projects': 'Imishinga',
    'nav.journey': 'Amateka',
    'nav.contact': 'Twandikire',
    'nav.coffee': 'IKAWA',
    'nav.hire': 'MPA AKAZI',
    'nav.buy_coffee': 'NGURIRA IKAWA',
    'nav.developer': 'UMWANDITSI WA POROGARAMU',
    'nav.language': 'Ururimi',

    // Hero
    'hero.tagline': 'Umunyeshuri wa Level 5 Software Development • U Rwanda 🇷🇼',
    'hero.hi': 'Muraho, Ndi',
    'hero.typewriter_prefix': 'Ndi ',
    'hero.explore': 'Reba Imishinga',
    'hero.get_in_touch': 'Twandikire',
    'hero.status_label': 'Imiterere',
    'hero.status_value': 'Yiteguye Kwandika Code',

    // About
    'about.tag': 'Ndi Muntu Ki',
    'about.title': "Gushishikazwa n'Intego, Gushimishwa n'Ikoranabuhanga",
    'about.subtitle': 'Inzira yanjye n\'Icyerekezo',
    'about.bio': 'Ndi umunyeshuri ugana ku musozo w\'amasomo y’impamyabumenyi ya Level 5 Software Development mu Rwanda. Ikoranabuhanga mu gihugu cyacu ririmo gukura cyane, kandi niteguye gutanga umusaruro binyuze mu gukora porogaramu zishimiwe n\'ingirakamaro zibonwa neza. Mbyaza umusaruro ubumenyi bwa frontend, ububiko bw\'amakuru buhamye, n\'inzira zizewe neza.',
    'about.contact_label': 'Twandikire Umubazi wa Porogaramu',
    'about.buy_coffee_btn': 'Ngurira Ikawa',
    'about.support_title': 'Shyigikira Inzira Yanjye Y\'iterambere',
    'about.support_desc': 'Murakoze cyane! Inkunga yanyu idufasha gukomeza kwandika amakode neza no gushyiraho imbuga nziza kandi zoroshye gukoresha.',
    'about.momo_label': 'MOMO PAY (Rwanda):',
    'about.copy_code': 'Koporora Kode',
    'about.code_copied': 'Kode Yakoporowe!',
    'about.stat.academics': 'Amasomo',
    'about.stat.techs': 'Ikoranabuhanga',
    'about.stat.projects': 'Imishinga',

    // Highlight Points in About
    'about.point.0.title': 'Mbere kuri Web (Frontend)',
    'about.point.0.desc': 'Gukora imbuga zishimishije cyane cyane hakoreshejwe uburyo bwo kuyungurura neza, amashusho meza n’imiterere yoroshye gukoresha kuri terefone.',
    'about.point.1.title': 'Inyuma kuri Server (Backend)',
    'about.point.1.desc': 'Gushyiraho inzira z’amakuru (APIs), gucunga neza database, kurinda umutekano w’amakuru n’ingamba za za token.",',
    'about.point.2.title': 'Ibihuza Ikoranabuhanga ry\'ICT',
    'about.point.2.desc': "Gukusanya ubumenyi mu guhuza imiyoboro ya mudasobwa (networking), gusuzuma hardware, no gufata ingamba ku mutekano w'imikoreshereze.",
    'about.point.3.title': 'Level 5 Masomo Nyayo',
    'about.point.3.desc': 'Gusoza neza amasomo ya Software Development mu Rwanda, nshingira ku gukorera mu matsinda no gukemura ibibazo bifatika.',

    // About - Family Sub-section
    'about.family.tag': 'Uko Nkomoka',
    'about.family.title': 'Inkingi y\'Umuryango Wandy',
    'about.family.desc': 'Gutsinda gushingira ku rukundo rufite ireme gukura mu muryango. Menya umuryango wa Bizimana Ngabo Remy William:',
    
    'family.dad.name': 'Bizimana Felix',
    'family.dad.role': 'Se / Umubyeyi',
    'family.dad.desc': 'Ayoboye umuryango wacu n\'ubwenge, ubushishozi, n\'ubunyangamugayo buzira imbere.',
    
    'family.mom.name': 'Mukabyiringiro Anee',
    'family.mom.role': 'Nyina / Umubyeyi',
    'family.mom.desc': 'Atanga urukundo rusesuye, uburere bwiza mu masomo, n\'ingamba nziza zo mu mutima.',
    
    'family.brother.name': 'Kwizera Edison',
    'family.brother.role': 'Muvandimwe / Sibling',
    'family.brother.desc': 'Shuti yanjye, uwo dufata imigambi mu gushakashaka no kwiga ibintu bishya.',
    
    'family.self.name': 'Remy William',
    'family.self.role': 'Yavutse 2009 / Umudeyiveloperi',
    'family.self.desc': 'Umudeyiveloperi muto utanga umusaruro mu gukora imbuga za sinema na server zizewe.',

    // Skills Section
    'skills.tag': 'Intwaro z\'Ikoranabuhanga',
    'skills.title': 'Urutonde rw\'ubumenyi n\'ibikoresho byanjye by\'akazi.',
    'skills.category.frontend': 'Frontend Dev',
    'skills.category.backend': 'Backend Core',
    'skills.category.database': 'Databases',
    'skills.category.other': 'Ibikoresho Bindi',

    // Projects Section
    'projects.tag': 'Imishinga ya Vuba',
    'projects.title': 'Guhitamo kw\'imishinga yanjye bwite, yose ikora neza kuri terefone na mudasobwa.',
    'projects.tab.all': 'Imishinga Yose',
    'projects.tab.frontend': 'Frontend Dev',
    'projects.tab.fullstack': 'Full Stack / Server Zizewe',
    'projects.live_demo': 'Kureba Demo',
    'projects.view_github': 'Reba GitHub',
    'projects.fastmovie_desc': 'Fungura urebe demo ishimishije cyane ya website ya FastMovie hano munsi imbere muri page.',
    'projects.close_selector': 'Funga Demo',
    'projects.cinematic_title': 'Ishusho ya Demo Ijyanye na Sinema',

    // Journey / Timeline Section
    'journey.tag': 'Amateka',
    'journey.header.tag': 'Urutonde rw\'Inzira Inyuranye',
    'journey.header.title': 'Urutonde rw\'Ibyo Nagezeho mu Masomo',
    'journey.header.desc': 'Inzira y\'ibihe byerekana urugendo rwanjye mu kwiga, kubona certificat, n\'uko ninjiye mu ikoranabuhanga.',
    'journey.skills_acquired': 'Ubumenyi Nabonye:',

    // Contact Section
    'contact.tag': 'Twandikire',
    'contact.title': 'Reka dufatanye gukora ibintu bikomeye cyane!',
    'contact.connect_title': 'Tuvugishe hano',
    'contact.details.email': 'Email y\'Akazi',
    'contact.details.phone': 'Terefone Imbona-nkubone',
    'contact.details.location': 'Rwanda Tech Hub',
    'contact.form.title': 'Andika hano',
    'contact.form.name_label': 'Amazina Yanyu',
    'contact.form.email_label': 'Email Yanyu y\'Akazi',
    'contact.form.msg_label': 'Ubutumwa Bwanyu',
    'contact.form.msg_placeholder': 'Andika ubutumwa bwawe hano neza...',
    'contact.form.submit': 'Yohereza Ubutumwa',
    'contact.form.sending': 'Birimo Koherezwa...',
    'contact.toast.success': 'Ubutumwa Bwoherejwe!',
    'contact.toast.success_desc': 'Ubutumwa bwawe bwoherejwe neza, Remy aragusubiza bidatinze.',
    'contact.toast.err_fields': 'Uzuza neza ibice byose bisabwa bikunogeye.',
    'contact.toast.err_server': 'Habaye ikosa rya server. Twandikire kuri terefone unyuze kuri WhatsApp.',

    // Footer
    'footer.brand_title': 'BIZIMANA NGABO REMY WILLIAM',
    'footer.subtitle': 'Umunyeshuri wa Level 5 Software Development',
    'footer.desc': 'Yubatswe mu rwego rwo kwerekana ubushobozi bwo mu mutima kuri backend na frontend yoroshye.',
    'footer.copyright': '© 2026 Remy William Studio. Uburenganzira bwose burasubizwa.',

    // Status / Live Indicators
    'status.online': 'Kuri Murongo',
    'status.active': 'Ahari Ubu'
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.skills': 'Compétences',
    'nav.projects': 'Projets',
    'nav.journey': 'Parcours',
    'nav.contact': 'Contact',
    'nav.coffee': 'CAFÉ',
    'nav.hire': 'M\'ENGAGER',
    'nav.buy_coffee': 'ACHETER UN CAFÉ',
    'nav.developer': 'DÉVELOPPEUR',
    'nav.language': 'Langue',

    // Hero
    'hero.tagline': 'Étudiant en niveau 5 développement logiciel • Rwanda 🇷🇼',
    'hero.hi': 'Salut, Je suis',
    'hero.typewriter_prefix': 'Je suis ',
    'hero.explore': 'Explorer les Projets',
    'hero.get_in_touch': 'Prendre Contact',
    'hero.status_label': 'Statut',
    'hero.status_value': 'Prêt à Coder',

    // About
    'about.tag': 'À Propos',
    'about.title': 'Guidé par un But, Inspiré par la Technologie',
    'about.subtitle': 'Mon Parcours & ma Vision',
    'about.bio': 'Je suis un développeur de logiciels en dernière année d\'études de niveau 5 au Rwanda. Notre écosystème technologique régional se développe rapidement et mon objectif est de concevoir des applications hautement fluides qui simplifient la gestion des entreprises modernes. J\'associe des architectures frontend raffinées, des bases de données relationnelles stables et une sécurité renforcée.',
    'about.contact_label': 'Contact Direct du Développeur',
    'about.buy_coffee_btn': 'Me Offrir Un Café',
    'about.support_title': 'Soutenir Mon Parcours De Développement',
    'about.support_desc': 'Merci de tout cœur ! Votre soutien motive un codage propre et des conceptions réactives de haute qualité.',
    'about.momo_label': 'MOMO PAY (Rwanda) :',
    'about.copy_code': 'Copier le Code',
    'about.code_copied': 'Code Copié !',
    'about.stat.academics': 'Académique',
    'about.stat.techs': 'Technologies',
    'about.stat.projects': 'Projets',

    // Highlight Points in About
    'about.point.0.title': 'Client UI/UX (Frontend)',
    'about.point.0.desc': 'Développement d\'interfaces utilisateur fluides et captivantes basées sur le glassmorphism, les transitions dynamiques et les affichages adaptables.',
    'about.point.1.title': 'Ingénierie Backend',
    'about.point.1.desc': 'Conception de workflows de base de données stables, routes sécurisées par jetons, API RESTful et systèmes logiques performants.',
    'about.point.2.title': 'Intégration Systèmes TIC',
    'about.point.2.desc': 'Passion profonde pour l\'architecture des réseaux informatiques, les diagnostics matériels et les déploiements logiciels locaux.',
    'about.point.3.title': 'Cursus de Certification',
    'about.point.3.desc': 'Achèvement d\'un programme rigoureux de diplôme en développement logiciel au Rwanda, combinant algorithmes avancés et livrables de groupe.',

    // About - Family Sub-section
    'about.family.tag': 'Héritage Personnel',
    'about.family.title': 'Le Pilier de ma Famille',
    'about.family.desc': 'Le succès repose sur des fondations solides d\'amour, de valeurs d\'intégrité et de soutien permanent. Voici la famille de Bizimana Ngabo Remy William :',
    
    'family.dad.name': 'Bizimana Felix',
    'family.dad.role': 'Père / Parent',
    'family.dad.desc': 'Dirige notre foyer avec beaucoup de sagesse, d\'ingéniosité et de leadership.',
    
    'family.mom.name': 'Mukabyiringiro Anee',
    'family.mom.role': 'Mère / Parent',
    'family.mom.desc': 'Fournit une affection sans fin, une éducation rigoureuse et des valeurs morales pures.',
    
    'family.brother.name': 'Kwizera Edison',
    'family.brother.role': 'Frère / Sibling',
    'family.brother.desc': 'Chercheur à mes côtés, compagnon sincère et partenaire dans l\'acquisition de compétences.',
    
    'family.self.name': 'Remy William',
    'family.self.role': 'Né en 2009 / Développeur',
    'family.self.desc': 'Jeune développeur passionné, spécialisé dans les plateformes de divertissement et les APIs sécurisées.',

    // Skills Section
    'skills.tag': 'Arsenal Technique',
    'skills.title': 'Mes compétences professionnelles et technologies préférées.',
    'skills.category.frontend': 'Partie Client (Frontend)',
    'skills.category.backend': 'Ingénierie Serveur (Backend)',
    'skills.category.database': 'Bases de Données (Databases)',
    'skills.category.other': 'Autres Outils',

    // Projects Section
    'projects.tag': 'Travaux Récents',
    'projects.title': 'Sélection de mes projets les plus récents, entièrement interactifs et réactifs.',
    'projects.tab.all': 'Tous les Projets',
    'projects.tab.frontend': 'Conception Client (Frontend)',
    'projects.tab.fullstack': 'Serveur & API (Full Stack)',
    'projects.live_demo': 'Démo Directe',
    'projects.view_github': 'Voir GitHub',
    'projects.fastmovie_desc': 'Explorez la magnifique réplique interactive de FastMovie directement intégrée à l\'affichage ci-dessous.',
    'projects.close_selector': 'Fermer la Démo',
    'projects.cinematic_title': 'Démonstration Cinématographique',

    // Journey / Timeline Section
    'journey.tag': 'Parcours',
    'journey.header.tag': 'Mon Historique Scolaire',
    'journey.header.title': 'Mon Éducation & Jalons',
    'journey.header.desc': 'Parcours académique interactif affichant mes diplômes, certifications et induction technologique.',
    'journey.skills_acquired': 'Compétences Acquises :',

    // Contact Section
    'contact.tag': 'Prendre Contact',
    'contact.title': 'Travaillons ensemble pour concevoir l’extraordinaire !',
    'contact.connect_title': 'Me Contacter',
    'contact.details.email': 'E-mail Professionnel',
    'contact.details.phone': 'Ligne Directe',
    'contact.details.location': 'Pôle Technique du Rwanda',
    'contact.form.title': 'Formulaire de Message',
    'contact.form.name_label': 'Nom Complet',
    'contact.form.email_label': 'Adresse E-mail',
    'contact.form.msg_label': 'Détails du Message',
    'contact.form.msg_placeholder': 'Saisissez vos explications ou questions ici...',
    'contact.form.submit': 'Envoyer le Message',
    'contact.form.sending': 'Envoi en cours...',
    'contact.toast.success': 'Message Envoyé !',
    'contact.toast.success_desc': 'Merci pour votre intérêt, Remy vous contactera dans les plus brefs délais.',
    'contact.toast.err_fields': 'Veuillez remplir tous les champs de saisie indispensables.',
    'contact.toast.err_server': 'Erreur serveur. Veuillez privilégier un appel direct ou message WhatsApp.',

    // Footer
    'footer.brand_title': 'BIZIMANA NGABO REMY WILLIAM',
    'footer.subtitle': 'Étudiant en Développement Logiciel (Niveau 5)',
    'footer.desc': 'Plateforme développée pour démontrer des compétences complètes en ingénierie logicielle.',
    'footer.copyright': '© 2026 Remy William Studio. Tous droits réservés.',

    // Status / Live Indicators
    'status.online': 'En Ligne',
    'status.active': 'Actif'
  }
};
