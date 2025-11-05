import { useParams } from 'react-router';
import DashboardTable from '../../dashboard/components/DashboardTable';
import { useProjects } from '../context/useProjects';

const ProjectTasks = () => {
  const { projectName } = useParams();
  const { projects } = useProjects();
  //    const { tasks } = useTasks();

  const project = projects.find(
    (p) => p.name.toLowerCase() === projectName?.toLowerCase()
  );
  if (!project) return <div>Project not found</div>;

  // const projectTasks = tasks.filter(t => t.project === project.id);

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>{project.name} Tasks</h2>
      <DashboardTable />
    </div>
  );
};

export default ProjectTasks;
