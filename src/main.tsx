import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { TasksProvider } from './features/dashboard/context/TasksProvider.tsx';
import { NotesProvider } from './features/notes/context/NotesProvider.tsx';
import { ProjectsProvider } from './features/projects/context/ProjectsProvider.tsx';
import './index.css';
import { ThemeProvider } from './shared/context/ThemeProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TasksProvider>
          <ProjectsProvider>
            <NotesProvider>
              <App />
            </NotesProvider>
          </ProjectsProvider>
        </TasksProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
