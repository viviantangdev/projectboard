import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <div className={`flex flex-col lg:flex-row max-h-screen`}>
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
