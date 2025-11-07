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
      <DashboardTable />
    </FeatureLayout>
  );
};

export default Dashboard;
