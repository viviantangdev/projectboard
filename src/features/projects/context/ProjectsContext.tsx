import { createContext } from 'react';
import type { ProjectItem } from '../../../shared/utils/task';

type ProjectsContextType = {
  projects: ProjectItem[];
  addProject: (name: string) => void;
  editProject: (name: string) => void;
  deleteProject: (name: string) => void;
};

export const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);
