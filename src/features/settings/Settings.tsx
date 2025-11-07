import { FaGear } from 'react-icons/fa6';
import FeatureLayout from '../../shared/layouts/FeatureLayout';
import ManageProjects from './components/ManageProjects';

export const Settings = () => {
  return (
    <FeatureLayout title='Settings' icon={<FaGear />} withCreateButton={false}>
      <ManageProjects />
    </FeatureLayout>
  );
};
