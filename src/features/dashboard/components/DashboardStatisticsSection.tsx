import { FaCheck } from 'react-icons/fa6';
import { GrPowerCycle } from 'react-icons/gr';
import { IoMdAlarm } from 'react-icons/io';
import StatisticCard from '../../../shared/components/StatisticCard';
import { useTasks } from '../../../shared/hooks/useTasks';

const DashboardStatisticsSection = () => {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'InProgress').length;
  const notStartedTasks = tasks.filter((t) => t.status === 'NotStarted').length;

  return (
    <div className='flex gap-3 flex-wrap'>
      <StatisticCard
        title={'Completed'}
        icon={{ component: <FaCheck />, className: 'statIconCompleted' }}
        value={completedTasks}
        cardLinearBg={'statBgCompleted'}
      />
      <StatisticCard
        title={'In progress'}
        icon={{ component: <GrPowerCycle />, className: 'statIconInProgress' }}
        value={inProgressTasks}
        cardLinearBg={'statBgInProgress'}
      />
      <StatisticCard
        title={'Not started'}
        icon={{ component: <IoMdAlarm />, className: 'statIconNotStarted' }}
        value={notStartedTasks}
        cardLinearBg={'statBgNotStarted'}
      />
    </div>
  );
};

export default DashboardStatisticsSection;
