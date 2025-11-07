import { useState } from 'react';
import { Outlet } from 'react-router';
import Modal from '../../shared/components/Modal';
import TaskFormSingleInput from '../../shared/components/TaskFormSingleInput';
import { useProjects } from './context/useProjects';

const Projects = () => {
  const { projects, addProject } = useProjects();
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<string>('');

  if (projects.length === 0) {
    return (
      <div className='m-auto flex flex-col items-center gap-3'>
        <p>You dont have any projects.</p>
        <button
          type='button'
          onClick={() => setIsAddProjectModalOpen(true)}
          className='actionButton'
        >
          Create project
        </button>
        {isAddProjectModalOpen && (
          <Modal
            title={'Add project'}
            isOpen={isAddProjectModalOpen}
            setIsOpen={setIsAddProjectModalOpen}
            children={
              <TaskFormSingleInput
                value={newProject}
                setValue={setNewProject}
                onSubmit={() => addProject(newProject)}
                setIsModalOpen={setIsAddProjectModalOpen}
              />
            }
          />
        )}
      </div>
    );
  }

  // Render Outlet for child routes (e.g., /projects/:projectId)
  return <Outlet />;
};

export default Projects;
