import React from 'react';
interface StatisticCardProps {
  title: string;
  icon: { component: React.ReactNode; className: string };
  value: number;
  cardLinearBg: string;
}
const StatisticCard = ({
  title,
  icon,
  value,
  cardLinearBg,
}: StatisticCardProps) => {
  const singularOrPlural = value > 1 ? 'tasks' : 'task';
  return (
    <div
      className={`bg-linear-to-r ${cardLinearBg} flex items-center gap-3 p-4 statCard`}
    >
      <div className={`${icon.className} text-xl rounded-full bg-white p-2`}>
        {icon.component}
      </div>
      <div className='flex flex-col items-end text-white'>
        <span className='text-shadow-2xs'>{title}</span>
        <p className='text-shadow-2xs'>
          {value} {singularOrPlural}
        </p>
      </div>
    </div>
  );
};

export default StatisticCard;
