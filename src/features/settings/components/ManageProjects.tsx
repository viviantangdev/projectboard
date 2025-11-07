import { useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { TbEdit, TbTrash } from 'react-icons/tb';
import Modal from '../../../shared/components/Modal';
import TaskFormSingleInput from '../../../shared/components/TaskFormSingleInput';
import { useProjects } from '../../projects/context/useProjects';

const ManageProjects = () => {
  const { projects, addProject, editProject, deleteProject } = useProjects();
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<string>('');
  const [editCurrentProject, setEditCurrentProject] = useState({
    id: '',
    name: '',
  });

  return (
    <div className='flex flex-col gap-5 settingsContainer'>
      <div className='flex justify-between items-start'>
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
      </div>
      <p>All projects</p>
      <ul className='flex flex-col gap-2 '>
        {projects.map((project, index) => (
          <li key={index} className='flex items-center gap-5'>
            <BsDot />
            <span>{project.name}</span>
            <div className='flex items-center'>
              <button className='iconButton '>
                <TbEdit
                  onClick={() => {
                    setEditCurrentProject({
                      id: project.id,
                      name: project.name,
                    });
                    setIsEditProjectModalOpen(true);
                  }}
                />
              </button>
              <button className='iconButton'>
                <TbTrash onClick={() => deleteProject(project.id)} />
              </button>
            </div>
          </li>
        ))}
      </ul>
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
      {isEditProjectModalOpen && (
        <Modal
          title={'Edit project'}
          isOpen={isEditProjectModalOpen}
          setIsOpen={setIsEditProjectModalOpen}
          children={
            <TaskFormSingleInput
              value={editCurrentProject.name}
              setValue={(value) =>
                setEditCurrentProject((prev) => ({ ...prev, name: value }))
              }
              onSubmit={() =>
                editProject(editCurrentProject.id, editCurrentProject.name)
              }
              setIsModalOpen={setIsEditProjectModalOpen}
            />
          }
        />
      )}
    </div>
  );
};

export default ManageProjects;
