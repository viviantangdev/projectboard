import { MdDashboard } from 'react-icons/md';
import FeatureLayout from '../../shared/layouts/FeatureLayout';
import DashboardFilterSection from './components/DashboardFilterSection';
import DashboardTable from './components/DashboardTable';

const Dashboard = () => {
  return (
    <FeatureLayout
      title='Dashboard'
      icon={<MdDashboard />}
      withCreateButton={true}
    >
      <section className='flex flex-col gap-5'>
        <h3>All tasks</h3>
        <div className='flex flex-col gap-5'>
          {/* Filter and Search */}
          <DashboardFilterSection />
          {/* Table */}
          <DashboardTable />
        </div>
      </section>
    </FeatureLayout>
  );
};

export default Dashboard;
