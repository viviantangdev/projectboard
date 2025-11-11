import { FaGear, FaFolderOpen } from 'react-icons/fa6';
import { FaNoteSticky } from 'react-icons/fa6';
import { LuDot } from 'react-icons/lu';
import { MdDashboard } from 'react-icons/md';
import { useProjects } from './useProjects';

export interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  children?: NavigationItem[];
}

// Custom hook to generate navigation items
export const useNavigations = (): NavigationItem[] => {
  const { projects } = useProjects();

  // Map project children
  const projectNavItems: NavigationItem[] = projects.map((project) => ({
    name: project.name,
    path: `/projects/${project.name}`,
    icon: <LuDot />,
  }));

  return [
    { name: 'Dashboard', path: '/dashboard', icon: <MdDashboard /> },
    {
      name: 'Projects',
      path: '/projects',
      icon: <FaFolderOpen />,
      // Only include children if there are projects
      ...(projects.length > 0 && { children: projectNavItems }),
    },
    { name: 'Notes', path: '/notes', icon: <FaNoteSticky /> },
    { name: 'Settings', path: '/settings', icon: <FaGear /> },
  ];
};
