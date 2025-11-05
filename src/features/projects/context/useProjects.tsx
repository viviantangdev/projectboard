import { useContext } from 'react';
import { ProjectsContext } from './ProjectsContext';

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be within a ProjectsProvider');
  }
  return context;
};
