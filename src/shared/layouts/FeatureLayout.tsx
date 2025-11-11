import React, { useState } from 'react';
import { useProjects } from '../../features/projects/context/useProjects';
import CreateButton from '../components/CreateButton';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import TaskFormSingleInput from '../components/TaskFormSingleInput';

interface FeatureLayoutProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  withCreateButton: boolean;
  actionButton?: React.ReactNode;
}

const FeatureLayout = ({
  title,
  icon,
  children,
  withCreateButton,
  actionButton,
}: FeatureLayoutProps) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectkModalOpen, setIsProjectkModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<string>('');
  const { addProject } = useProjects();
  return (
    <main className='px-5 py-10 min-h-screen lg:p-15 flex flex-col gap-8 lg:min-h-full w-full'>
      <div className='flex justify-between items-end'>
        <div className='flex items-center gap-2 '>
          <div className='text-sky-500 text-2xl'>{icon}</div>
          <h2>{title}</h2>
        </div>
        {withCreateButton && (
          <CreateButton
            setTaskOpen={setIsTaskModalOpen}
            setProjectOpen={setIsProjectkModalOpen}
          />
        )}
        {actionButton}
      </div>
      {children}
      {withCreateButton && isTaskModalOpen && (
        <Modal
          isOpen={isTaskModalOpen}
          setIsOpen={setIsTaskModalOpen}
          title={'New task'}
          children={<TaskForm setIsModalOpen={setIsTaskModalOpen} />}
        />
      )}
      {withCreateButton && isProjectkModalOpen && (
        <Modal
          isOpen={isProjectkModalOpen}
          setIsOpen={setIsProjectkModalOpen}
          title={'Add project'}
          children={
            <TaskFormSingleInput
              value={newProject}
              setValue={setNewProject}
              onSubmit={() => addProject(newProject)}
              setIsModalOpen={setIsProjectkModalOpen}
            />
          }
        />
      )}
    </main>
  );
};

export default FeatureLayout;
