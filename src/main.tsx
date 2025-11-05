import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { NotesProvider } from './features/notes/context/NotesProvider.tsx';
import './index.css';
import { ThemeProvider } from './shared/context/ThemeContext.tsx';
import { TasksProvider } from './features/dashboard/context/TasksProvider.tsx';
import { ProjectsProvider } from './features/projects/context/ProjectsProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ProjectsProvider>
          <TasksProvider>
            <NotesProvider>
              <App />
            </NotesProvider>
          </TasksProvider>
        </ProjectsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
