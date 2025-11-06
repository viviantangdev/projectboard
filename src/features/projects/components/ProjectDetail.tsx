import { useParams } from 'react-router';
import FeatureLayout from '../../../shared/layouts/FeatureLayout';
import { useProjects } from '../context/useProjects';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { projects } = useProjects();
  const project = projects.find((p) => p.name === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }
  console.log('ProjectDetail rendering for projectId:', projectId);
  console.log('Selected project:', project);
  return (
    <FeatureLayout
      title={`Project: ${project.name}`}
      actionButton={
        <button onClick={() => {}} className='actionButton'>
          + New project
        </button>
      }
    >
      {/* Render additional project details */}
      <></>
    </FeatureLayout>
  );
};

export default ProjectDetail;
