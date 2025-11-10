import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
const MainLayout = () => {
  return (
    <div className='w-screen h-screen bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500'>
      <div className='flex flex-col w-full lg:absolute lg:inset-0 lg:flex-row lg:w-[1100px] lg:h-[1000px] lg:m-auto'>
        <Navbar />
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
