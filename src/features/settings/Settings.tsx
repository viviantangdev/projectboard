import { useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { TbEdit, TbTrash } from 'react-icons/tb';
import Modal from '../../shared/components/Modal';
import SingleInputModalContent from '../../shared/components/SingleInputModalContent';
import FeatureLayout from '../../shared/layouts/FeatureLayout';
import { useProjects } from '../projects/context/useProjects';

export const Settings = () => {
  const { projects, addProject, editProject, deleteProject } = useProjects();
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<string>('');
  const [editCurrentProject, setEditCurrentProject] = useState<string>('');
  return (
    <FeatureLayout title='Settings'>
      <div className='flex flex-col gap-5'>
        <h3>Manage projects</h3>

        <div>
          <button
            type='button'
            onClick={() => setIsAddProjectModalOpen(true)}
            className='actionButton'
          >
            + Add project
          </button>
        </div>

        <div className='flex flex-col gap-2 '>
          {projects.map((project, index) => (
            <div className='flex items-center gap-5'>
              <BsDot />
              <span key={index}>{project.name}</span>
              <div className='flex items-center'>
                <button className='iconButton '>
                  <TbEdit
                    onClick={() => {
                      setEditCurrentProject(project.name);
                      setIsEditProjectModalOpen(true);
                    }}
                  />
                </button>
                <button className='iconButton'>
                  <TbTrash onClick={() => deleteProject(project.name)} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {isAddProjectModalOpen && (
          <Modal
            title={'Add project'}
            isOpen={isAddProjectModalOpen}
            setIsOpen={setIsAddProjectModalOpen}
            children={
              <SingleInputModalContent
                value={newProject}
                setValue={setNewProject}
                onSubmit={addProject}
                setIsModalOpen={setIsAddProjectModalOpen}
              />
            }
          />
        )}
        {isEditProjectModalOpen && (
          <Modal
            title={'Edit project'}
            isOpen={isEditProjectModalOpen}
            setIsOpen={setIsEditProjectModalOpen}
            children={
              <SingleInputModalContent
                value={editCurrentProject}
                setValue={setEditCurrentProject}
                onSubmit={editProject}
                setIsModalOpen={setIsEditProjectModalOpen}
              />
            }
          />
        )}
      </div>
    </FeatureLayout>
  );
};
