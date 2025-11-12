import { useState } from 'react';
import { FaFolderOpen } from 'react-icons/fa6';
import { Outlet, useNavigate, useParams } from 'react-router';
import Modal from '../../shared/components/Modal';
import TaskFormSingleInput from '../../shared/components/TaskFormSingleInput';
import { useProjects } from '../../shared/hooks/useProjects';
import FeatureLayout from '../../shared/layouts/FeatureLayout';

const Projects = () => {
  const { projects, addProject } = useProjects();
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<string>('');
  const navigate = useNavigate();
  const params = useParams();

  function handleAddProject(){
    setIsAddProjectModalOpen(true);
  }

  // Show empty state only when there are no projects and we're not viewing a specific project route.
  if (projects.length === 0 && !params.projectId) {
    return (
      <FeatureLayout
        title={'Projects'}
        icon={<FaFolderOpen />}
        children={
          <div className='flex flex-col items-baseline gap-2'>
            <p>You dont have any projects yet!</p>
            <p>Start by creating your first project.</p>
            <button
              type='button'
              onClick={handleAddProject}
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
                    onSubmit={() => {
                      const createdName = addProject(newProject);
                      setIsAddProjectModalOpen(false);
                      setNewProject('');
                      // navigate to the new project's route (ProjectDetail expects project name in the URL)
                      navigate(`/projects/${encodeURIComponent(createdName)}`);
                    }}
                    setIsModalOpen={setIsAddProjectModalOpen}
                  />
                }
              />
            )}
          </div>
        }
        withCreateButton={true}
      />
    );
  }

  // Render Outlet for child routes (e.g., /projects/:projectId)
  return <Outlet />;
};

export default Projects;
