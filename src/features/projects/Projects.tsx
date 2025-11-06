import { useState } from 'react';
import { Outlet } from 'react-router';
import Modal from '../../shared/components/Modal';
import SingleInputModalContent from '../../shared/components/SingleInputModalContent';
import { useProjects } from './context/useProjects';

const Projects = () => {
  const { projects, addProject } = useProjects();
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<string>('');

  if (projects.length === 0) {
    return (
      <div className='m-auto flex flex-col gap-3'>
        <span>You dont have any projects.</span>
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
              <SingleInputModalContent
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
