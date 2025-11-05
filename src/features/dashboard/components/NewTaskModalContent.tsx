import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { type PriorityType } from '../../../shared/utils/task';
import { useTasks } from '../context/useTasks';
import TaskForm from './TaskForm';

interface NewTaskModalContentProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const NewTaskModalContent = ({ setIsModalOpen }: NewTaskModalContentProps) => {
  const { onCreateTask } = useTasks();
  const [title, setTitle] = useState<string>('');
  const [details, setContent] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [priority, setPriority] = useState<PriorityType | undefined>(undefined);
  const [dueDate, setDueDate] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Reset error message
    setErrors({});

    // Validate all fields
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = '* Title is required';
    if (!details) newErrors.details = '* Details is required';
    if (!project) newErrors.project = '* Project is required';
    if (!priority) newErrors.priority = '* Select priority';
    if (!dueDate) newErrors.dueDate = '* Due date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if all required fields are valid
    if (title && details && project && priority && dueDate) {
      onCreateTask({
        id: '',
        title,
        details,
        project,
        priority,
        dueDate,
        status: 'Todo',
      });
      // Reset form fields
      setTitle('');
      setContent('');
      setProject('');
      setPriority(undefined);
      setDueDate('');
      setIsModalOpen(false); // Close modal
    }
  }
  return (
    <TaskForm
      title={title}
      setTitle={setTitle}
      details={details}
      setContent={setContent}
      project={project}
      setProject={setProject}
      priority={priority!}
      setPriority={setPriority}
      dueDate={dueDate}
      setDueDate={setDueDate}
      handleSubmit={handleSubmit}
      errors={errors}
      handleCancel={() => setIsModalOpen(false)}
    />
  );
};

export default NewTaskModalContent;
