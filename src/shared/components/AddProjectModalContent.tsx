import { useState } from 'react';
import { useProjects } from '../../features/projects/context/useProjects';
interface AddProjectModalContentProps {
  setIsModalOpen: (isOpen: boolean) => void;
}
const AddProjectModalContent = ({
  setIsModalOpen,
}: AddProjectModalContentProps) => {
  const { addProject } = useProjects();
  const [newProject, setNewProject] = useState<string>('');

  return (
    <div className='flex flex-col gap-6 py-3'>
      <input
        type='text'
        className='border rounded border-gray-300 px-2 py-1 '
        value={newProject}
        onChange={(e) => setNewProject(e.target.value)}
      />
      <div className='flex gap-3 '>
        <button
          type='button'
          onClick={() => {
            addProject(newProject);
            setIsModalOpen(false);
          }}
          className='actionButton w-full'
        >
          Save
        </button>
        <button
          type='button'
          onClick={() => {
            setIsModalOpen(false);
          }}
          className='cancelButton w-full'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProjectModalContent;
