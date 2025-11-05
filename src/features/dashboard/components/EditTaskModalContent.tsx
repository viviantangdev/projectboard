import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {
  type PriorityType,
  type StatusType,
  type TaskItem,
} from '../../../shared/utils/task';
import { useTasks } from '../context/useTasks';
import TaskForm from './TaskForm';

interface EditTaskModalContentProps {
  task: TaskItem;
  setIsModalOpen: (isOpen: boolean) => void;
}

const EditTaskModalContent = ({
  task,
  setIsModalOpen,
}: EditTaskModalContentProps) => {
  const { onUpdateTask } = useTasks();
  const [title, setTitle] = useState<string>(task.title);
  const [details, setContent] = useState<string>(task.details);
  const [project, setProject] = useState<string>(task.project);
  const [priority, setPriority] = useState<PriorityType>(task.priority);
  const [dueDate, setDueDate] = useState<string>(task.dueDate);
  const [status, setStatus] = useState<StatusType>(task.status);
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
      // Update task
      onUpdateTask(task.id, {
        id: task.id,
        title,
        details,
        project,
        priority,
        dueDate,
        status,
      });
      setIsModalOpen(false); // Close modal
    }
  }
  return (
    <TaskForm
      title={title!}
      setTitle={setTitle}
      details={details!}
      setContent={setContent}
      project={project!}
      setProject={setProject}
      priority={priority!}
      setPriority={setPriority}
      dueDate={dueDate!}
      setDueDate={setDueDate}
      setStatus={setStatus}
      handleSubmit={handleSubmit}
      errors={errors}
      handleCancel={() => setIsModalOpen(false)}
      status={status}
    />
  );
};

export default EditTaskModalContent;
