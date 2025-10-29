import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='flex flex-col md:flex-row 2xl:w-[50%] mx-auto shadow-md dark:shadow-zinc-50'>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default MainLayout;
