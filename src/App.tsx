import Dashboard from './features/dashboard/Dashboard';
import MainLayout from './shared/layouts/MainLayout';

function App() {
  return (
    <>
      <MainLayout children={<Dashboard />}></MainLayout>
    </>
  );
}

export default App;
