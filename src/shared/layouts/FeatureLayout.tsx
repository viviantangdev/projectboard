import React from 'react';

interface FeatureLayoutProps {
  title: string;
  children: React.ReactNode;
}

const FeatureLayout = ({ title, children }: FeatureLayoutProps) => {
  return (
    <main className='p-3 md:p-10 flex flex-col gap-8 w-full'>
      <h2 className='text-xl'>{title}</h2>
      {children}
    </main>
  );
};

export default FeatureLayout;
