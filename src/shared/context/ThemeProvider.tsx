import React, { useEffect, useState } from 'react';
import { ThemeContext } from '../hooks/useTheme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.dataset.agThemeMode = 'dark-table';
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.dataset.agThemeMode = 'light-table';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
