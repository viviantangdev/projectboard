import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { NotesProvider } from './features/notes/context/NotesProvider.tsx';
import './index.css';
import { ThemeProvider } from './shared/context/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NotesProvider>
          <App />
        </NotesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
