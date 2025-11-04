import React from 'react';

interface FeatureLayoutProps {
  title: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
}

const FeatureLayout = ({
  title,
  children,
  actionButton = <></>,
}: FeatureLayoutProps) => {
  return (
    <main className='p-3 md:p-10 flex flex-col gap-8 w-full'>
      <div className='flex justify-between items-end'>
        <h2 className='text-xl'>{title}</h2>
        {actionButton}
      </div>
      {children}
    </main>
  );
};

export default FeatureLayout;
