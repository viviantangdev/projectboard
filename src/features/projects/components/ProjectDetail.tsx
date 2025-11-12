import { useState } from 'react';
import { FaFolderOpen } from 'react-icons/fa6';
import { useParams } from 'react-router';
import Modal from '../../../shared/components/Modal';
import TaskForm from '../../../shared/components/TaskForm';
import { useProjects } from '../../../shared/hooks/useProjects';
import { useTasks } from '../../../shared/hooks/useTasks';
import FeatureLayout from '../../../shared/layouts/FeatureLayout';
import ProjectFilterSection from './ProjectFilterSection';
import ProjectStatisticsSection from './ProjectStatisticsSection';
import ProjectTable from './ProjectTable';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const project = projects.find((p) => p.name === projectId);
  if (!project) {
    return <div>Project not found</div>;
  }

  // Count tasks that belong to this project by matching project id
  const projectTasks = tasks.filter((t) => t.project.id === project.id).length;

  return (
    <FeatureLayout
      title={`Project: ${project.name}`}
      icon={<FaFolderOpen />}
      withCreateButton={true}
    >
      {/* Statistics */}
      <section className='flex flex-col gap-5'>
        {/* Statistic cards */}
        <ProjectStatisticsSection project={project!} />
      </section>
      <section className='flex flex-col gap-5'>
        <h3>Tasks ({projectTasks})</h3>
        {projectTasks === 0 ? (
          <div className='flex flex-col items-baseline gap-2'>
            <p>No task here yet!</p>
            <p>Add a task to get started.</p>
            <button
              type='button'
              onClick={() => setIsTaskModalOpen(true)}
              className='actionButton'
            >
              Create task
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-5'>
            {/* Filter and Search */}
            <ProjectFilterSection project={project!} />
            <ProjectTable project={project!} />
          </div>
        )}
      </section>

      {isTaskModalOpen && (
        <Modal
          title={'New task'}
          isOpen={isTaskModalOpen}
          setIsOpen={setIsTaskModalOpen}
          children={<TaskForm setIsModalOpen={setIsTaskModalOpen} />}
        />
      )}
    </FeatureLayout>
  );
};

export default ProjectDetail;
