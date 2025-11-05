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

  const addProject = (name: string) => {
    setProjects((prev) => [...prev, { name: name.trim() }]);
  };

  const editProject = (name: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.name === name ? { ...project, name: name.trim() } : project
      )
    );
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
