import { Navigate, Route, Routes } from 'react-router';
import Dashboard from './features/dashboard/Dashboard';
import Notes from './features/notes/Notes';
import Projects from './features/projects/Projects';
import ProjectDetail from './features/projects/components/ProjectDetail';
import { Settings } from './features/settings/Settings';
import MainLayout from './shared/layouts/MainLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Navigate to='dashboard' replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='notes' element={<Notes />} />

          <Route path='projects' element={<Projects />}>
            {/* Dynamic child route for individual projects */}

            <Route path=':projectId' element={<ProjectDetail />} />
          </Route>
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
}

export default App;
