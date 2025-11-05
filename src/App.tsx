import { Navigate, Route, Routes } from 'react-router';
import Dashboard from './features/dashboard/Dashboard';
import Notes from './features/notes/Notes';
import MainLayout from './shared/layouts/MainLayout';
import { Settings } from './features/settings/Settings';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Navigate to='dashboard' replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='notes' element={<Notes />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace/>} />
      </Routes>
    </>
  );
}

export default App;
