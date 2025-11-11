import React from 'react';
import { FaXmark } from 'react-icons/fa6';

interface ModalProps {
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}
const Modal = ({ title, icon, isOpen, setIsOpen, children }: ModalProps) => {
  return (
    isOpen && (
      <div className='fixed inset-0 flex items-center justify-center bg-black/80'>
        <div className='modal p-6 max-w-md w-full relative'>
          <button
            className='absolute top-0 right-0 cursor-pointer  p-4'
            onClick={() => setIsOpen(false)}
          >
            <FaXmark />
            {/* Close button */}
          </button>
          <div className='flex items-center gap-2 text-xl'>
            {icon}
            <h3>{title}</h3>
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
