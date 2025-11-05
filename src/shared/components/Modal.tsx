import React from 'react';

interface ModalProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}
const Modal = ({ title, isOpen, setIsOpen, children }: ModalProps) => {
  return (
    isOpen && (
      <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
        <div className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative'>
          <button
            className='absolute top-2 right-2 cursor-pointer'
            onClick={()=>setIsOpen(false)}
          >
            &#x2715; {/* Close button */}
          </button>
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
