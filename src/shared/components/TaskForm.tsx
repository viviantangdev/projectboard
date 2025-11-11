import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useTasks } from '../../features/dashboard/context/useTasks';
import { useProjects } from '../../features/projects/context/useProjects';
import {
  priorities,
  statuses,
  type PriorityType,
  type ProjectItem,
  type StatusType,
  type TaskItem,
} from '../utils/task';
import Badge from './Badge';
import Input from './Input';
import Modal from './Modal';
import TaskFormSingleInput from './TaskFormSingleInput';

interface TaskFormProps {
  task?: TaskItem; // Optional for edit mode
  setIsModalOpen: (isOpen: boolean) => void;
}

const TaskForm = ({ task, setIsModalOpen }: TaskFormProps) => {
  const { projects, addProject } = useProjects();
  const { onCreateTask, onUpdateTask } = useTasks();

  // Initialize state based on whether task is provided (edit mode) or not (create mode)
  const [title, setTitle] = useState<string>(task?.title || '');
  const [details, setDetails] = useState<string>(task?.details || '');
  const [project, setProject] = useState<ProjectItem>(
    task?.project || { id: '', name: '' }
  );
  const [priority, setPriority] = useState<PriorityType | undefined>(
    task?.priority || undefined
  );
  const [dueDate, setDueDate] = useState<string>(task?.dueDate || '');
  const [status, setStatus] = useState<StatusType>(task?.status || 'Todo');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState<string>('');

  // Update project state when projects list changes (e.g., after adding a new project)
  useEffect(() => {
    if (newProjectName && projects.some((p) => p.name === newProjectName)) {
      const selectedProject = projects.find((p) => p.name === newProjectName);
      if (selectedProject) setProject(selectedProject);
      setNewProjectName('');
    }
  }, [projects, newProjectName]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    // Validate all fields
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = '* Title is required';
    if (!details) newErrors.details = '* Details is required';
    if (!project.name) newErrors.project = '* Project is required';
    if (!priority) newErrors.priority = '* Priority is required';
    if (!dueDate) newErrors.dueDate = '* Due date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const taskData = {
      id: task?.id || '',
      title,
      details,
      project,
      priority: priority!,
      dueDate,
      status,
    };

    // Call appropriate action based on mode
    if (task) {
      onUpdateTask(task.id, taskData);
    } else {
      onCreateTask(taskData);
    }

    // Reset form and close modal
    setTitle('');
    setDetails('');
    setProject({ id: '', name: '' });
    setPriority(undefined);
    setDueDate('');
    setStatus('Todo');
    setIsModalOpen(false);
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-10 py-5'>
      {/* Title & Details */}
      <div className='flex flex-col gap-5'>
        <div>
          <div className='flex justify-end items-center'>
            {errors.title && (
              <span className='text-red-500'>{errors.title}</span>
            )}
          </div>
          <textarea
            className='resize-none h-auto outline-none placeholder:italic'
            placeholder='Title...'
            value={title}
            onChange={(e) => {
              const target = e.target;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
              setTitle(e.target.value);
            }}
          />
          <div className='flex justify-end items-center'>
            {errors.details && (
              <span className=' text-red-500'>{errors.details}</span>
            )}
          </div>
          <textarea
            className='resize-none h-auto outline-none  placeholder:italic'
            placeholder='Details...'
            value={details}
            onChange={(e) => {
              const target = e.target;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
              setDetails(e.target.value);
            }}
          />
        </div>
        {/* Project */}
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <label htmlFor='Project'>Project:</label>
            {errors.project && (
              <span className=' text-red-500'>{errors.project}</span>
            )}
          </div>
          <div className='flex items-center gap-5'>
            <select
              id='project'
              value={project.name}
              onChange={(e) => {
                const selectedProject = projects.find(
                  (p) => p.name === e.target.value
                );
                setProject(selectedProject || { id: '', name: e.target.value });
              }}
              className='select'
            >
              <option value='' disabled>
                Select a project
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>

            <button
              type='button'
              onClick={() => setIsAddProjectModalOpen(true)}
              className='secondaryButton'
            >
              Add project
            </button>
          </div>
        </div>
        {/* Priority */}
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <label htmlFor='Priority'>Priority:</label>
            {errors.priority && (
              <span className=' text-red-500'>{errors.priority}</span>
            )}
          </div>
          <div className='flex gap-2'>
            {priorities.map((value, index) => (
              <Badge
                key={index}
                onClick={() => setPriority(value)}
                value={value}
                colorMap={{
                  High:
                    priority === 'High'
                      ? 'badgeHigh'
                      : 'unSelectedBadge unSelectedBadgeHigh',
                  Medium:
                    priority === 'Medium'
                      ? 'badgeMedium'
                      : 'unSelectedBadge unSelectedBadgeMedium',
                  Low:
                    priority === 'Low'
                      ? 'badgeLow'
                      : 'unSelectedBadge unSelectedBadgeLow',
                }}
              />
            ))}
          </div>
        </div>
        {/* Due Date */}
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <label htmlFor='DueDate'>Due date:</label>
            {errors.dueDate && (
              <span className=' text-red-500'>{errors.dueDate}</span>
            )}
          </div>
          <div>
            <Input
              type='date'
              placeHolder={'YYYY-MM-DD'}
              value={dueDate}
              onChange={setDueDate}
            />
          </div>
        </div>
        {/* Status */}
        <div className='flex flex-col gap-1'>
          <div className='flex'>
            <label htmlFor='Status'>Status:</label>
            {errors.status && (
              <span className=' text-red-500'>{errors.status}</span>
            )}
          </div>
          <div className='flex gap-1'>
            {statuses.map((value, index) => (
              <Badge
                key={index}
                onClick={() => setStatus(value)}
                value={value}
                colorMap={{
                  Done:
                    status === 'Done'
                      ? 'badgeDone'
                      : 'unSelectedBadge unSelectedBadgeDone',
                  Ongoing:
                    status === 'Ongoing'
                      ? 'badgeOngoing'
                      : 'unSelectedBadge unSelectedBadgeOngoing',
                  Todo:
                    status === 'Todo'
                      ? 'badgeTodo'
                      : 'unSelectedBadge unSelectedBadgeTodo',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-3'>
        <button type='submit' className='actionButton'>
          Save
        </button>
        <button
          type='button'
          onClick={() => setIsModalOpen(false)}
          className='cancelButton'
        >
          Cancel
        </button>
      </div>
      {isAddProjectModalOpen && (
        <Modal
          title='Add project'
          isOpen={isAddProjectModalOpen}
          setIsOpen={setIsAddProjectModalOpen}
          children={
            <TaskFormSingleInput
              value={newProjectName}
              setValue={setNewProjectName}
              onSubmit={() => addProject(newProjectName)}
              setIsModalOpen={setIsAddProjectModalOpen}
            />
          }
        />
      )}
    </form>
  );
};

export default TaskForm;
