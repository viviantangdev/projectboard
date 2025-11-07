import { MdDashboard } from 'react-icons/md';
import FeatureLayout from '../../shared/layouts/FeatureLayout';
import DashboardTable from './components/DashboardTable';

const Dashboard = () => {
  return (
    <FeatureLayout
      title='Dashboard'
      icon={<MdDashboard />}
      withCreateButton={true}
    >
      <h3>All tasks</h3>
      <DashboardTable />
    </FeatureLayout>
  );
};

export default Dashboard;
