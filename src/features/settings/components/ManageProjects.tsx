import { useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { IoWarningOutline } from 'react-icons/io5';
import { TbEdit, TbTrash } from 'react-icons/tb';
import DeleteItem from '../../../shared/components/DeleteItem';
import Modal from '../../../shared/components/Modal';
import TaskFormSingleInput from '../../../shared/components/TaskFormSingleInput';
import type { ProjectItem } from '../../../shared/utils/task';
import { useProjects } from '../../../shared/hooks/useProjects';

const ManageProjects = () => {
  const { projects, addProject, editProject, deleteProject } = useProjects();
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState<string>('');
  const [editCurrentProject, setEditCurrentProject] = useState({
    id: '',
    name: '',
  });

  function handleEditProject(project: ProjectItem) {
    setEditCurrentProject({
      id: project.id,
      name: project.name,
    });
    setIsEditProjectModalOpen(true);
  }

  function handleDeleteProject(projectId: ProjectItem['id']) {
    // delete immediately when asked (modal will call this with the id)
    deleteProject(projectId);
    setDeleteId(null);
  }

  function handleCancelDelete() {
    setDeleteId(null);
  }

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
                <TbEdit onClick={() => handleEditProject(project)} />
              </button>
              <button className='iconButton'>
                <TbTrash onClick={() => setDeleteId(project.id)} />
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

      {/* Delete Modal */}
      {deleteId && (
        <Modal
          isOpen={deleteId !== null}
          setIsOpen={handleCancelDelete}
          title={'Delete project'}
          icon={<IoWarningOutline />}
          children={
            <DeleteItem
              deleteValue={
                projects.find((project) => project.id === deleteId)!.name
              }
              onCancel={handleCancelDelete}
              onDelete={() => handleDeleteProject(deleteId!)}
            />
          }
        />
      )}
    </div>
  );
};

export default ManageProjects;
