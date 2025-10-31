import { useState } from 'react';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { FaRegStickyNote } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { MdOutlineAddTask } from 'react-icons/md';
import FloatingActionButton from './FloatingActionButton';

const FloatingMenuButton = () => {
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);

  const handleMenu = () => setIsFloatingMenuOpen(!isFloatingMenuOpen);

  return (
    <div className='relative flex flex-col items-end'>
      <button
        onClick={handleMenu}
        className='bg-sky-500 rounded-full p-2 shadow-2xl hover:scale-[1.1] transition-smooth cursor-pointer'
      >
        <FaPlus className='text-white' />
      </button>
      <div
        className={`floatingMenu ${
          isFloatingMenuOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <FloatingActionButton name='Task' icon={<MdOutlineAddTask />} />
        <FloatingActionButton name='Note' icon={<FaRegStickyNote />} />
        <FloatingActionButton
          name='Project'
          icon={<AiOutlineFundProjectionScreen />}
        />
      </div>
    </div>
  );
};

export default FloatingMenuButton;
