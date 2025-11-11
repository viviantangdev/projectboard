import { FaCheck } from 'react-icons/fa6';
import { GrPowerCycle } from 'react-icons/gr';
import { IoMdAlarm } from 'react-icons/io';
import { useParams } from 'react-router';
import StatisticCard from '../../dashboard/components/StatisticCard';
import { useTasks } from '../../dashboard/context/useTasks';

const ProjectStatisticsSection = () => {
  const { tasks } = useTasks();

  const { projectId } = useParams();

  const projectTasks = tasks.filter((item) => item.project.id === projectId);

  const completedTasks = projectTasks.filter(
    (t) => t.status === 'Completed'
  ).length;
  const inProgressTasks = projectTasks.filter(
    (t) => t.status === 'InProgress'
  ).length;
  const notStartedTasks = projectTasks.filter(
    (t) => t.status === 'NotStarted'
  ).length;

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

export default ProjectStatisticsSection;
