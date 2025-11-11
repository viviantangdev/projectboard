import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
const MainLayout = () => {
  return (
    <div className='w-screen h-screen  bg-linear-to-br from-zinc-50 to-sky-500 dark:from-zinc-900 dark:to-sky-950'>
      <div className='flex flex-col w-full lg:absolute lg:inset-0 lg:flex-row lg:w-[1100px] lg:h-[1000px] lg:m-auto lg:shadow-2xl'>
        <Navbar />
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
