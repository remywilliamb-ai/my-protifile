import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { personalInfo as staticPersonalInfo, skillsData as staticSkillsData, projectsData as staticProjectsData, timelineData as staticTimelineData } from './data';
import { Project, Skill, TimelineEvent } from './types';

interface PortfolioDataContextType {
  personalInfo: typeof staticPersonalInfo;
  skillsData: Skill[];
  projectsData: Project[];
  timelineData: TimelineEvent[];
  visitorCount: number;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [personalInfo, setPersonalInfo] = useState(staticPersonalInfo);
  const [skillsData, setSkillsData] = useState<Skill[]>(staticSkillsData);
  const [projectsData, setProjectsData] = useState<Project[]>(staticProjectsData);
  const [timelineData, setTimelineData] = useState<TimelineEvent[]>(staticTimelineData);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  }, []);

  return (
    <PortfolioDataContext.Provider value={{ personalInfo, skillsData, projectsData, timelineData, visitorCount, isLoading, refreshData }}>
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
      refreshData: async () => {}
    };
  }
  return context;
};
