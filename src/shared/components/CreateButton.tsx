import { useState } from 'react';
import { FaFolderOpen, FaTasks } from 'react-icons/fa';
import { FaMinus, FaPlus } from 'react-icons/fa6';

interface CreateButtonProps {
  setTaskOpen: (isOpen: boolean) => void;
  setProjectOpen: (isOpen: boolean) => void;
}

const CreateButton = ({ setTaskOpen, setProjectOpen }: CreateButtonProps) => {
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

  function handleMenu() {
    setIsCreateMenuOpen(!isCreateMenuOpen);
  }

  return (
    <div className='relative'>
      {/*Create button */}
      <div className=''>
        <button onClick={handleMenu} className='actionButton'>
          {isCreateMenuOpen ? <FaMinus /> : <FaPlus />}
        </button>
      </div>
      {/*Menu */}
      <div
        className={`${
          isCreateMenuOpen ? 'absolute' : 'hidden'
        } right-0 mt-1 flex flex-col createMenu`}
      >
        <span className='text-sm p-2 text-gray-400'>Create</span>
        <div className='h-0.5 bg-gray-200' />
        <button
          onClick={() => {
            handleMenu(); // Close menu
            setTaskOpen(true);
          }}
          className='flex items-center gap-2 createMenuLink'
        >
          <FaTasks />
          <span>Task</span>
        </button>
        <button
          onClick={() => {
            handleMenu(); // Close menu
            setProjectOpen(true);
          }}
          className='flex items-center gap-2 createMenuLink'
        >
          <FaFolderOpen />
          <span>Project</span>
        </button>
      </div>
    </div>
  );
};

export default CreateButton;
