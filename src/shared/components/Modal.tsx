import React from 'react';
import { FaXmark } from 'react-icons/fa6';

interface ModalProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}
const Modal = ({ title, isOpen, setIsOpen, children }: ModalProps) => {
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
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
