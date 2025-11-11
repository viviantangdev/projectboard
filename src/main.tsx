import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { NotesProvider } from './features/notes/context/NotesProvider.tsx';
import './index.css';
import { FilterTasksProvider } from './shared/context/FilterTasksProvider.tsx';
import { ThemeProvider } from './shared/context/ThemeProvider.tsx';
import { TasksProvider } from './shared/context/TasksProvider.tsx';
import { ProjectsProvider } from './shared/context/ProjectsProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TasksProvider>
          <FilterTasksProvider>
            <ProjectsProvider>
              <NotesProvider>
                <App />
              </NotesProvider>
            </ProjectsProvider>
          </FilterTasksProvider>
        </TasksProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
