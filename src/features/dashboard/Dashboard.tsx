import { useState } from 'react';
import { MdDashboard } from 'react-icons/md';
import Modal from '../../shared/components/Modal';
import { useTasks } from '../../shared/hooks/useTasks';
import FeatureLayout from '../../shared/layouts/FeatureLayout';
import DashboardFilterSection from './components/DashboardFilterSection';
import DashboardStatisticsSection from './components/DashboardStatisticsSection';
import DashboardTable from './components/DashboardTable';
import TaskForm from '../../shared/components/TaskForm';

const Dashboard = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const { tasks } = useTasks();

  return (
    <FeatureLayout
      title='Dashboard'
      icon={<MdDashboard />}
      withCreateButton={true}
    >
      {/* Statistics */}
      <section className='flex flex-col gap-5'>
        {/* Statistic cards */}
        <DashboardStatisticsSection />
      </section>
      {/* Tasks */}
      <section className='flex flex-col gap-5'>
        <h3>All tasks</h3>
        {tasks.length === 0 ? (
          <div className='flex flex-col items-baseline gap-2'>
            <p>No task here yet!</p>
            <p>Add a task to get started.</p>
            <button
              type='button'
              onClick={() => setIsTaskModalOpen(true)}
              className='actionButton'
            >
              Create task
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-5'>
            {/* Filter and Search */}
            <DashboardFilterSection />
            {/* Table */}
            <DashboardTable />
          </div>
        )}
      </section>
      {isTaskModalOpen && (
        <Modal
          title={'New task'}
          isOpen={isTaskModalOpen}
          setIsOpen={setIsTaskModalOpen}
          children={<TaskForm setIsModalOpen={setIsTaskModalOpen} />}
        />
      )}
    </FeatureLayout>
  );
};

export default Dashboard;
