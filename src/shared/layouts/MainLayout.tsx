import { Outlet } from 'react-router';
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';

const MainLayout = () => {
  return (
    <div className='flex flex-col md:flex-row max-h-screen'>
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
