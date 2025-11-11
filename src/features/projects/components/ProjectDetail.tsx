import { FaFolderOpen } from 'react-icons/fa6';
import { useParams } from 'react-router';
import { useProjects } from '../../../shared/hooks/useProjects';
import FeatureLayout from '../../../shared/layouts/FeatureLayout';
import ProjectFilterSection from './ProjectFilterSection';
import ProjectStatisticsSection from './ProjectStatisticsSection';
import ProjectTable from './ProjectTable';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { projects } = useProjects();

  const project = projects.find((p) => p.name === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <FeatureLayout
      title={`Project: ${project.name}`}
      icon={<FaFolderOpen />}
      withCreateButton={true}
    >
      {/* Statistics */}
      <section className='flex flex-col gap-5'>
        {/* Statistic cards */}
        <ProjectStatisticsSection project={project} />
      </section>
      <section className='flex flex-col gap-5'>
        <h3>Tasks</h3>
        <div className='flex flex-col gap-5'>
          {/* Filter and Search */}
          <ProjectFilterSection project={project} />
          <ProjectTable project={project} />
        </div>
      </section>
    </FeatureLayout>
  );
};

export default ProjectDetail;
