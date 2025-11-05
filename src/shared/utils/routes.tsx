interface NavigationItem {
  name: string;
  path: string;
  children?: NavigationItem[];
}

export const navigations: NavigationItem[] = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Notes', path: '/notes' },
  { name: 'Settings', path: '/settings' },

];
