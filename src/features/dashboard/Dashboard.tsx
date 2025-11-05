import { useState } from 'react';
import Modal from '../../shared/components/Modal';
import FeatureLayout from '../../shared/layouts/FeatureLayout';
import DashboardTable from './components/DashboardTable';
import NewTaskModalContent from './components/NewTaskModalContent';

const Dashboard = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function handleSumbit() {
    setIsOpen(true);
  }

  return (
    <FeatureLayout
      title='Dashboard'
      actionButton={
        <button onClick={handleSumbit} className='actionButton'>
          + New task
        </button>
      }
    >
      <DashboardTable />
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          setIsOpen={() => setIsOpen(false)}
          title={'New task'}
          children={<NewTaskModalContent setIsModalOpen={setIsOpen} />}
        />
      )}
    </FeatureLayout>
  );
};

export default Dashboard;
