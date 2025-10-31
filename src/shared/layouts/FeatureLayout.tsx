import React from 'react';
import FloatingMenuButton from '../components/floatingMenu/FloatingMenuButton';

interface FeatureLayoutProps {
  title: string;
  children: React.ReactNode;
}

const FeatureLayout = ({ title, children }: FeatureLayoutProps) => {
  return (
    <main className='p-3 md:p-10 flex flex-col gap-8 w-full'>
      <div className='flex justify-between items-end'>
        <h2 className='text-xl'>{title}</h2>
        <FloatingMenuButton />
      </div>
      {children}
    </main>
  );
};

export default FeatureLayout;
