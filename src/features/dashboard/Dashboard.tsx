import { useState } from 'react';
import Modal from '../../shared/components/Modal';
import FeatureLayout from '../../shared/layouts/FeatureLayout';
import DashboardTable from './components/DashboardTable';
import NewTaskModalContent from './components/NewTaskModalContent';

const Dashboard = () => {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  function handleOpenModal() {
    setIsNewTaskModalOpen(true);
  }

  return (
    <FeatureLayout
      title='Dashboard'
      actionButton={
        <button onClick={handleOpenModal} className='actionButton'>
          + New task
        </button>
      }
    >
      <DashboardTable />
      {isNewTaskModalOpen && (
        <Modal
          isOpen={isNewTaskModalOpen}
          setIsOpen={() => setIsNewTaskModalOpen(false)}
          title={'New task'}
          children={<NewTaskModalContent setIsModalOpen={setIsNewTaskModalOpen} />}
        />
      )}
    </FeatureLayout>
  );
};

export default Dashboard;
