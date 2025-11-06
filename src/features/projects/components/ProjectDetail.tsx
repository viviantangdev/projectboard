import { useParams } from 'react-router';
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
    <div>
      <h1>{project.name}</h1>
      <p>Project ID: {project.id}</p>
      {/* Render additional project details */}
    </div>
  );
};

export default ProjectDetail;
