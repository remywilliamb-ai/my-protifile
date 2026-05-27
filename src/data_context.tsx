import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { personalInfo as staticPersonalInfo, skillsData as staticSkillsData, projectsData as staticProjectsData, timelineData as staticTimelineData } from './data';
import { Project, Skill, TimelineEvent } from './types';
import { Language, translations } from './translations';

interface PortfolioDataContextType {
  personalInfo: typeof staticPersonalInfo;
  skillsData: Skill[];
  projectsData: Project[];
  timelineData: TimelineEvent[];
  visitorCount: number;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  deferredPrompt: any;
  isStandalone: boolean;
  isIOS: boolean;
  triggerInstallPrompt: () => Promise<void>;
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [personalInfo, setPersonalInfo] = useState(staticPersonalInfo);
  const [skillsData, setSkillsData] = useState<Skill[]>(staticSkillsData);
  const [projectsData, setProjectsData] = useState<Project[]>(staticProjectsData);
  const [timelineData, setTimelineData] = useState<TimelineEvent[]>(staticTimelineData);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'rw' || saved === 'fr') {
      return saved as Language;
    }
    return 'rw';
  });
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const dict = translations[language] || translations['en'];
    return dict[key] || translations['en'][key] || key;
  };

  const refreshData = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        if (data.personalInfo) setPersonalInfo(data.personalInfo);
        if (data.skillsData) setSkillsData(data.skillsData);
        if (data.projectsData) setProjectsData(data.projectsData);
        if (data.timelineData) setTimelineData(data.timelineData);
      }
    } catch (err) {
      console.warn("Failed to fetch dynamic portfolio, using static seeds.", err);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerInstallPrompt = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
  };

  useEffect(() => {
    // 1. Fetch dynamic data
    refreshData();

    // 2. Increment & Fetch visitor counter
    fetch('/api/visitors/increment', { method: 'POST' })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data) => {
        if (data && data.success && data.visitorCount) {
          setVisitorCount(data.visitorCount);
        }
      })
      .catch((err) => console.warn("Visitor analytics tracking skipped.", err));

    // 3. PWA Installation Listeners
    const standaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standaloneMode);

    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <PortfolioDataContext.Provider value={{ personalInfo, skillsData, projectsData, timelineData, visitorCount, isLoading, refreshData, language, setLanguage, t, deferredPrompt, isStandalone, isIOS, triggerInstallPrompt }}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    // Defensive return of statically configured assets if used outside provider
    return {
      personalInfo: staticPersonalInfo,
      skillsData: staticSkillsData,
      projectsData: staticProjectsData,
      timelineData: staticTimelineData,
      visitorCount: 128,
      isLoading: false,
      refreshData: async () => {},
      language: 'rw' as Language,
      setLanguage: () => {},
      t: (key: string) => key,
      deferredPrompt: null,
      isStandalone: false,
      isIOS: false,
      triggerInstallPrompt: async () => {}
    };
  }
  return context;
};
