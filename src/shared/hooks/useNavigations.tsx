import { useProjects } from '../../features/projects/context/useProjects';

export interface NavigationItem {
  name: string;
  path: string;
  children?: NavigationItem[];
}

// Custom hook to generate navigation items
export const useNavigations = (): NavigationItem[] => {
  const { projects } = useProjects();

  // Map project children
  const projectNavItems: NavigationItem[] = projects.map((project) => ({
    name: project.name,
    path: `/projects/${project.name}`, 
  }));

  return [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Notes', path: '/notes' },
    {
      name: 'Projects',
      path: '/projects',
      // Only include children if there are projects
      ...(projects.length > 0 && { children: projectNavItems }),
    },
    { name: 'Settings', path: '/settings' },
  ];
};
