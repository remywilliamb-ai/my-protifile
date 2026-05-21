export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  image: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'other';
  level: number; // Percentage
  iconName: string; // Used to dynamic-render Lucide icons
}

export interface TimelineEvent {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  skillsAcquired: string[];
}
