import { FaFolderOpen } from 'react-icons/fa6';
import { useParams } from 'react-router';
import FeatureLayout from '../../../shared/layouts/FeatureLayout';
import { useProjects } from '../context/useProjects';
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
      <h3>Tasks</h3>
      <ProjectTable project={project} />
    </FeatureLayout>
  );
};

export default ProjectDetail;
