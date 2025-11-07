import { createContext, useContext } from 'react';
import type { ProjectItem } from '../../../shared/utils/task';

type ProjectsContextType = {
  projects: ProjectItem[];
  addProject: (name: string) => void;
  editProject: (id: string, name: string) => void;
  deleteProject: (id: string) => void;
};

export const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be within a ProjectsProvider');
  }
  return context;
};
