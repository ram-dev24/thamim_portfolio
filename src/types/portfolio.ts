export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location?: string;
  isCurrent?: boolean;
  summary: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  duration: string;
  tags: string[];
  metrics: string;
  description: string;
  highlights: string[];
  category: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  percentage: number;
  category: string;
  description: string;
}

export interface SkillCircle {
  id: string;
  name: string;
  shortName: string;
  percentage: number;
  category: 'core' | 'hard' | 'soft' | 'tech';
  iconType: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    headline: string;
    role: string;
    company: string;
    organizationRole: string;
    location: string;
    phone: string;
    email: string;
    address: string;
    languages: string[];
    bio: string;
    avatarUrl: string;
    linkedin: string;
    availableFor: string;
  };
  metrics: {
    yearsExperience: string;
    denialReduction: string;
    manualWorkloadReduction: string;
    cleanClaimImprovement: string;
    teamSizeManaged: string;
    firstPassResolution: string;
  };
  skills: SkillCircle[];
  hardSkills: string[];
  softSkills: string[];
  services: ServiceItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
}
