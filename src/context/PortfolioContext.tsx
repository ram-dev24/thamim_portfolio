import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, ExperienceItem, ProjectItem, SkillCircle, EducationItem, ServiceItem } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultPortfolioData';

interface PortfolioContextType {
  data: PortfolioData;
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (val: boolean) => void;
  isEditorModalOpen: boolean;
  setEditorModalOpen: (val: boolean) => void;
  activeEditorTab: string;
  setActiveEditorTab: (tab: string) => void;
  isPrintView: boolean;
  setIsPrintView: (val: boolean) => void;
  
  // Update functions
  updateProfile: (profile: Partial<PortfolioData['profile']>) => void;
  updateMetrics: (metrics: Partial<PortfolioData['metrics']>) => void;
  updateExperience: (exp: ExperienceItem) => void;
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => void;
  deleteExperience: (id: string) => void;
  
  updateProject: (project: ProjectItem) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  deleteProject: (id: string) => void;
  
  updateSkill: (skill: SkillCircle) => void;
  addSkill: (skill: Omit<SkillCircle, 'id'>) => void;
  deleteSkill: (id: string) => void;
  
  updateEducation: (edu: EducationItem) => void;
  addEducation: (edu: Omit<EducationItem, 'id'>) => void;
  deleteEducation: (id: string) => void;

  updateService: (service: ServiceItem) => void;

  resetToDefaults: () => void;
  exportJSON: () => void;
  importJSON: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'thamim_portfolio_data_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.profile.avatarUrl || parsed.profile.avatarUrl.includes('unsplash.com')) {
          parsed.profile.avatarUrl = '/avatar.jpg';
        }
        parsed.education = [];
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load saved portfolio data', e);
    }
    return defaultPortfolioData;
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isEditorModalOpen, setEditorModalOpen] = useState<boolean>(false);
  const [activeEditorTab, setActiveEditorTab] = useState<string>('profile');
  const [isPrintView, setIsPrintView] = useState<boolean>(false);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data', e);
    }
  }, [data]);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);
  const setEditMode = (val: boolean) => setIsEditMode(val);

  const updateProfile = (profile: Partial<PortfolioData['profile']>) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profile },
    }));
  };

  const updateMetrics = (metrics: Partial<PortfolioData['metrics']>) => {
    setData((prev) => ({
      ...prev,
      metrics: { ...prev.metrics, ...metrics },
    }));
  };

  const updateExperience = (exp: ExperienceItem) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) => (item.id === exp.id ? exp : item)),
    }));
  };

  const addExperience = (exp: Omit<ExperienceItem, 'id'>) => {
    const newId = 'exp-' + Date.now();
    setData((prev) => ({
      ...prev,
      experiences: [
        {
          ...exp,
          id: newId,
        },
        ...prev.experiences,
      ],
    }));
  };

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }));
  };

  const updateProject = (project: ProjectItem) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === project.id ? project : item)),
    }));
  };

  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newId = 'proj-' + Date.now();
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          ...project,
          id: newId,
          number: String(prev.projects.length + 1).padStart(2, '0'),
        },
      ],
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  const updateSkill = (skill: SkillCircle) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => (item.id === skill.id ? skill : item)),
    }));
  };

  const addSkill = (skill: Omit<SkillCircle, 'id'>) => {
    const newId = 'skill-' + Date.now();
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id: newId }],
    }));
  };

  const deleteSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }));
  };

  const updateEducation = (edu: EducationItem) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === edu.id ? edu : item)),
    }));
  };

  const addEducation = (edu: Omit<EducationItem, 'id'>) => {
    const newId = 'edu-' + Date.now();
    setData((prev) => ({
      ...prev,
      education: [...prev.education, { ...edu, id: newId }],
    }));
  };

  const deleteEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  const updateService = (service: ServiceItem) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((item) => (item.id === service.id ? service : item)),
    }));
  };

  const resetToDefaults = () => {
    setData(defaultPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thamim-ansar-portfolio-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile && parsed.experiences && parsed.projects) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON', e);
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isEditMode,
        toggleEditMode,
        setEditMode,
        isEditorModalOpen,
        setEditorModalOpen,
        activeEditorTab,
        setActiveEditorTab,
        isPrintView,
        setIsPrintView,
        updateProfile,
        updateMetrics,
        updateExperience,
        addExperience,
        deleteExperience,
        updateProject,
        addProject,
        deleteProject,
        updateSkill,
        addSkill,
        deleteSkill,
        updateEducation,
        addEducation,
        deleteEducation,
        updateService,
        resetToDefaults,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
