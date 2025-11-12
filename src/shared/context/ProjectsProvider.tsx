import { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ProjectsContext } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import type { ProjectItem } from '../utils/task';

export const ProjectsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useLocalStorage<ProjectItem[]>(
    'PROJECTS',
    []
  );
  const { setTasks } = useTasks();

  useEffect(() => {
    localStorage.setItem('PROJECTS', JSON.stringify(projects));
    console.log('Updated projects:', projects); // Log updated state
  }, [projects]);

  const addProject = (name: string) => {
    const newProject = { id: uuidV4(), name: name.trim() };
    setProjects((prev) => [...prev, newProject]);
    return newProject.name;
  };

  const editProject = (id: string, name: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, name: name.trim() } : project
      )
    );

    // Update tasks with the new project name
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.project.id === id) {
          return {
            ...task,
            project: { id: task.project.id, name: name.trim() },
          };
        }
        return task;
      })
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, editProject, deleteProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
