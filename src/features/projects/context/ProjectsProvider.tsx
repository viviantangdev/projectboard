import { useEffect } from 'react';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';
import type { ProjectItem } from '../../../shared/utils/task';
import { ProjectsContext } from './ProjectsContext';

export const ProjectsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useLocalStorage<ProjectItem[]>('PROJECTS', [
    { name: 'Home' },
    { name: 'Office' },
  ]);
useEffect(() => {
    localStorage.setItem('PROJECTS', JSON.stringify(projects));
    console.log('Updated projects:', projects); // Log updated state
  }, [projects]);
  const addProject = (name: string) => {
    setProjects((prev) => [...prev, { name: name.trim() }]);
  };

  const editProject = (name: string) => {
    console.log(name);
    setProjects((prev) =>
      prev.map((project) =>
        project.name === name ? { ...project, name: name.trim() } : project
      )
    );
        console.log(projects);

  };

  const deleteProject = (name: string) => {
    setProjects((prev) => prev.filter((project) => project.name !== name));
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, editProject, deleteProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
